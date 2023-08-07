const { Account,Currency, sequelize } = require('../../models/index')
const Redis = require('ioredis')
const request = require('request')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const getCurrenciesByAccounts = require('../../utils/currencies/get-currencies-by-accounts')
const getLevel = require('../../utils/levels/get-level')
const getOrCreateAccountIfNeeded = require('../../utils/accounts/get-or-create-account-if-needed')

const { base58_to_binary } = require('base58-js')
const nacl = require('tweetnacl')
const generateMFAToken = require('../../utils/accounts/generate-mfa-token')
const fetchAccountLevels = require("../../utils/info/fetch-account-levels");
const {getAccountCharacterBalanceByAllCurrencies,getAllCharacterBalanceByCharacter_Currency,getAccountCharacterBalanceByCurrency} = require("../../utils/currencies/get-character-currrencies-by-account")
const { WHITELIST_LEVEL_HOLDERS_ALL, WHITELIST_LEVEL_TEAM_AND_DEV, WHITELIST_LEVEL_ALLOWED_ONLY } = require('../../config/whitelist-levels')
const { WHITELIST_TEAM_AND_DEV, WHITELIST_ALLOWED_ALL } = require('../../config/whitelists')
const redis = new Redis({
  port: process.env.REDIS_PORT, // Redis port
  host: process.env.REDIS_HOST, // Redis host
})

const CLIENT_URL = process.env.COSMIC_CLIENT_URL
const JWT_SECRET = process.env.JWTSECRET
const COOKIE_NAME = 'oauth2_token'
const TWITTER_OAUTH_CLIENT_ID = process.env.COSMIC_TWITTER_CLIENT_ID
const TWITTER_OAUTH_CLIENT_SECRET = process.env.COSMIC_TWITTER_CLIENT_SECRETE
const TWITTER_OAUTH_TOKEN_URL = 'https://api.twitter.com/2/oauth2/token'

const cookieOptions = {
  httpOnly: true,
  sameSite: 'strict',
}

const BasicAuthToken = Buffer.from(
  `${TWITTER_OAUTH_CLIENT_ID}:${TWITTER_OAUTH_CLIENT_SECRET}`,
  'utf8',
).toString('base64')

const twitterOauthTokenParams = {
  client_id: TWITTER_OAUTH_CLIENT_ID,
  code_verifier: 'challenge',
  redirect_uri: `http://localhost:3000/settings/account`,
  grant_type: 'authorization_code',
}

const getTwitterOAuthToken = async (code) => {
  try {
    const res = await axios.post(
      TWITTER_OAUTH_TOKEN_URL,
      new URLSearchParams({ ...twitterOauthTokenParams, code }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${BasicAuthToken}`,
        },
      },
    )

    console.log('authtoken=====================', res)

    return res.data
  } catch (err) {
    return null
  }
}

const addCookieToRes = async (res, user, accessToken) => {
  const { id, type } = user
  const token = jwt.sign(
    {
      id,
      accessToken,
      type,
    },
    JWT_SECRET,
  )
  res.cookie(COOKIE_NAME, token, {
    ...cookieOptions,
    expires: new Date(Date.now() + 7200 * 1000),
  })
}

const getTwitterUser = async (accessToken) => {
  try {
    const res = await axios.get('https://api.twitter.com/2/users/me', {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })

    console.log('userTwitter=====================', res)

    return res.data.data ?? null
  } catch (err) {
    return null
  }
}

module.exports = {
  async getInfo(req, res) {
    const { address } = req.query

    if (!address) {
      return res.status(400).json({
        msg: 'Address is required',
      })
    }

    const searchTerm = `Account_${address}`

    try {
      console.log(`Getting account from cache - Address(${address})`)
      const account = await redis.get(searchTerm)

      if (!!account) {
        console.log(`Account retrieved from cache - ${account}`)
        return res.json(JSON.parse(account))
      }
    } catch (err) {
      console.log(`Failed to get account from cache - ${err}`)
    }

    try {
      console.log(`Getting account from DB - Address(${address})`)

      let accountWithCurrencies;
      await sequelize.transaction(async (transaction) => {
        let account = await Account.findOne(
          {
            where: {
              address,
            },
          },
          { transaction:transaction },
        )

        if (!account) {
          console.log(`This address is unavailable - Address(${address})`)
          console.log(
            `Creating a new account for this address - Address(${address})`,
          )

          account = await Account.create(
            {
              address,
              experience: 0,
              level:1,
              username: address,
            },
            { transaction:transaction },
          )
          console.log(
            `Created a new account for this address - Address(${address})`,
          )
        }

        console.log(`Got account from DB - ${account}`)

        const accountApes = await account.getApes({ transaction:transaction })

        const maxApeStaminas = await Promise.all(
          (accountApes || []).map(async (ape) => {
            const level = await getLevel(ape)
            const apeStamina = level?.stamina || 0

            return apeStamina
          }),
        )
        const maxStamina = maxApeStaminas.reduce(
          (a, b) => a + b,
          account.stamina || 0,
        )
        const accountStamina = (accountApes || []).map(ape => ape.stamina).reduce((a,b) => a+b, 0)

        let ascensionCurrency = await Currency.findOne({
          where :{
            name: 'Ascension'
          }
        })
        let ascensionBalance = await getAccountCharacterBalanceByCurrency(address,ascensionCurrency.id,transaction)
        if (!!ascensionBalance[0]) {
          ascensionBalance[0]['currency'] = ascensionCurrency
        }

        accountWithCurrencies = {
          ...account.dataValues,
          currencies: await getCurrenciesByAccounts({
            accounts: [account],
            transaction,
          }),
          character_currencies:ascensionBalance,
          maxStamina,
          stamina: accountStamina,

        }
        console.log(
          `Setting account with currencies to Cache - ${accountWithCurrencies}`,
        )
        redis.set(searchTerm, JSON.stringify(accountWithCurrencies), 'EX', 600)

      })
      return res.json({
        account: accountWithCurrencies,
      })
    } catch (err) {
      console.log(`Failed to get an account ${err}`)

      return res.status(500).json({
        msg: 'Something went wrong.',
      })
    }
  },

  async updateAccountInfo(req, res) {
    const { address } = req.query

    const body = req.body
    console.log(body)

    if (!address) {
      return res.status(400).json({
        msg: 'Address is required',
      })
    }

    const searchTerm = `Account_${address}`
    redis.del(searchTerm)

    try {
      sequelize.transaction(async (transaction) => {
        let account = await Account.findOne(
          {
            where: {
              address,
            },
          },
          { transaction },
        )

        if (account) {
          account = await Account.update(
            body,
            {
              where: {
                address,
              },
            },
            { transaction },
          )
          return res.json({
            msg: 'Success',
          })
        } else {
          return res.status(400).json({
            msg: 'Cannot find account info',
          })
        }
      })
    } catch (error) {
      return res.status(500).json({
        msg: 'Something went wrong.',
      })
    }
  },

  async twitterReverse(req, res) {
    try {
      request.post(
        {
          url: 'https://api.twitter.com/oauth/request_token',
          oauth: {
            oauth_callback: 'http://localhost:3000/settings/account',
            consumer_key: process.env.COSMIC_TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.COSMIC_TWITTER_CONSUMER_SECRET,
          },
        },
        function (err, r, body) {
          if (err) {
            return res.send(500, { message: err.message })
          }

          const jsonStr =
            '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}'
          res.send(JSON.parse(jsonStr))
        },
      )
    } catch (error) {
      return res.status(500).json({
        msg: 'Something went wrong.',
      })
    }
  },

  async twitterAuth(req, res) {
    try {
      const code = req.query.code
      const twitterOAuthToken = await getTwitterOAuthToken(code)

      if (!twitterOAuthToken) {
        return res.status(500).json({
          msg: 'Something went wrong.',
        })
      }

      const twitterUser = await getTwitterUser(twitterOAuthToken.access_token)

      if (!twitterUser) {
        return res.status(500).json({
          msg: 'Something went wrong.',
        })
      }

      addCookieToRes(
        res,
        { id: twitterUser.id, type: 'twitter' },
        twitterOAuthToken.access_token,
      )

      return res.status(200).json({
        msg: 'Success',
        user: twitterUser
      })
    } catch (error) {
      return res.status(500).json({
        msg: 'Something went wrong.',
      })
    }
  },

  async getMe(req, res) {
    try {
      const token = req.cookies[COOKIE_NAME]
      if (!token) {
        throw new Error('Not Authenticated')
      }
      const payload = await jwt.verify(token, JWT_SECRET)
      const twUser = await getTwitterUser(payload.accessToken)
      res.json(twUser)
    } catch (error) {
      return res.status(500).json({
        msg: 'Something went wrong.',
      })
    }
  },

  async getMFA(req, res) {
    const { address } = req.query

    const account = await getOrCreateAccountIfNeeded({ address })

    const mfa = generateMFAToken()
    account.set({
      mfa,
    })
    await account.save()

    return res.status(200).json(mfa)
  },

  async verifyWallet(req, res) {
    const { mfa, signedMFA, publicKey } = req.body

    const account = await getOrCreateAccountIfNeeded({ address: publicKey })

    console.log(mfa, account)
    if (account.mfa !== mfa) {
      return res.json(false)
    }

    // const encodedMessage = new TextEncoder().encode(mfa, 'utf8')
    // const u8arrSignature = Uint8Array.from(signedMFA.data)
    // const b58PublicKey = base58_to_binary(publicKey)

    try {
      // const verify = nacl.sign.detached.verify(
      //   encodedMessage,
      //   u8arrSignature,
      //   b58PublicKey,
      // )

      const WHITELIST_LEVEL = process.env.WHITELIST_LEVEL || WHITELIST_LEVEL_HOLDERS_ALL
      const whitelist = WHITELIST_LEVEL === WHITELIST_LEVEL_TEAM_AND_DEV
                        ? WHITELIST_TEAM_AND_DEV
                        : WHITELIST_LEVEL === WHITELIST_LEVEL_ALLOWED_ONLY
                        ? WHITELIST_ALLOWED_ALL
                        : []

      let whitelisted = true
      if (WHITELIST_LEVEL !== WHITELIST_LEVEL_HOLDERS_ALL) {
        if (!whitelist.includes(publicKey)) {
          whitelisted = false
        }
      }

      return res.status(200).json({
        mfa,
        signedMFA,
        publicKey,
        verify: true,
        whitelisted,
      })
    } catch (e) {
      console.log(e)

      return res.json({
        mfa,
        signedMFA,
        publicKey,
        verify: false,
      })
    }
  },

  async account_levels(req, res) {

    const account_levels = await fetchAccountLevels({
      redis,
    })

    res.json({
      account_levels:account_levels
    })

  },

  async character_currencies_balances_for_account(req, res){
    const {wallet} = req.query

    try {
      let currencies = await getAccountCharacterBalanceByAllCurrencies(wallet)
      res.json(currencies);
    } catch(err){
      console.log(err)
      res.status(400)
    }
  },

  async character_currency_balances_per_character(req, res){
    const {wallet,currency_id} = req.query

    try {
      let currencies = await getAllCharacterBalanceByCharacter_Currency(wallet,currency_id)
      res.json(currencies);
    } catch(err){
      console.log(err)
      res.status(400)
    }
  },
  async character_currency_balances_for_account(req, res){
    const {wallet,currency_id} = req.query

    try {
      let currencies = await getAccountCharacterBalanceByCurrency(wallet,currency_id)
      res.json(currencies);
    } catch(err){
      console.log(err)
      res.status(400)
    }
  }
}
