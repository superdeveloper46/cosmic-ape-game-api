const { Admin_users, sequelize } = require('../../models/index');
const {Op} = require("sequelize");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const shortUniqueId = require('short-unique-id')
const uid = new shortUniqueId({ length: 6 })
const sendMail = require('../../utils/sendmail')


const keys = require('../../config/keys');
const { Data } = require('@nfteyez/sol-rayz/dist/config/metaplex');
const { secret, tokenLife } = keys.jwt;

module.exports = {
  async login(req, res) {
    const {
      email,
      password
    } = req.body;
    if (!email || !password) {
			return res.status(400).json({
				msg: "email or password is invalid"
			})
		}

    try {
      await sequelize.transaction(async (t) => {
        const user = await Admin_users.findOne({
          where: {
            username:email,
            verified: 1,
          }
        }, { transaction: t });
        if (!user) {
          return res.status(400).json({
            success: false,
            error: 'Email Not Registered'
          });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
          return res.status(400).json({
            success: false,
            error: 'Password Incorrect'
          });
        }
        
        const payload = {
          id: user.id
        };
        const token = jwt.sign(payload, secret, { expiresIn: tokenLife });
        if (!token) {
          throw new Error();
        }
        res.status(200).json({
          success: true,
          accessToken: `Bearer ${token}`,
          user: {
            username: user.username
          }
        });
      })
    } catch(err) {
      res.status(400).json({
          error: `Failed to login - ${err.message}`
      })
    }
  },
  async register(req, res) {
    const {
      email,
      password
    } = req.body;
    if (!email) {
			return res.status(400).json({
				msg: "You must enter a email."
			})
		}
    if (!password) {
			return res.status(400).json({
				msg: "You must enter a password."
			})
		}
    try {
      await sequelize.transaction(async (t) => {
        const existingUser = await Admin_users.findOne({
          where: {
            username:email
          }
        }, { transaction: t });
        if (existingUser && existingUser.verified == 1) {
          return res
            .status(400)
            .json({ error: 'That email address is already in use.' });
        }
        if(!existingUser){
            const verificationCode = uid()
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            let addedUser = await Admin_users.create({
              username:email,
              password:hash,
              status:0,
              verified:0,
              verificationCode:verificationCode,
              sentCodeTime: new Date(),
              validCount: 1,
            });
    
            sendMail({
              to: email,
              subject: 'Email verifaction',
              text: `verificationCode`,
              html: `your verficationCode is <b>${verificationCode}</b>`,
            })

            res.status(200).json({
                success: true,
                id: addedUser.id
            });
    
        }else if (existingUser.verified != 1){
            if(existingUser.validCount >= 3){
                sendMail({
                    to: process.env.EMAIL_SUPPORTTEAM,
                    subject: 'Email verifaction',
                    text: `validCount User`,
                    html: `<b>${existingUser.email}</b> has sent worng verificationCode 3 times`,
                })
                return res
                    .status(400)
                    .json({ error: 'Already you typed wrong verificationCode 3 times' });
            }
            await Admin_users.update({
                sentCodeTime: new Date(),
            }, {
                where: {
                    id: existingUser.id
                }
            });

            sendMail({
                to: email,
                subject: 'Email verifaction',
                text: `verificationCode`,
                html: `your verficationCode is <b>${existingUser.verificationCode}</b>`,
            })

            res.status(200).json({
                success: true,
                id: existingUser.id
            });
        }
      })
    } catch(err) {
      res.status(400).json({
          error: `Failed to login - ${err.message}`
      })
    }
  },

  async verify(req, res) {
    const {
      id,
      code
    } = req.body;

    const user = await Admin_users.findOne({
      where: {
        id: id
      }
    });

    validTime = new Date().getTime() - new Date(user.sentCodeTime).getTime();
    validTime = validTime/1000/60;

    if (user.verified == 1) {
      return res
            .status(400)
            .json({ error: 'Email already verified.' });
    }
    else if (user.verificationCode != code){
      return res
            .status(400)
            .json({ error: 'Verification code is wrong.' });
    }else if(validTime > 30){
        return res
            .status(400)
            .json({ error: 'The validity period has passed.' });
    }else {
      const user = await Admin_users.update({
        verified: 1,
        verificationCode: ""
      }, {
        where: {
          id: id
        }
      });      

      const payload = {
        id: user.id
      };
      const token = jwt.sign(payload, secret, { expiresIn: tokenLife });
      if (!token) {
        throw new Error();
      }
      res.status(200).json({
        success: true,
        accessToken: `Bearer ${token}`,
        user: {
          username: user.username
        }
      });
    }
  },

  async resend(req, res) {
    const {
      id,
    } = req.body;

    const verificationCode = uid()   
    
    const existingUser = await Admin_users.findOne({
        where: {
          id:id
        }
      }
    );

    if(existingUser.validCount >= 3){
        sendMail({
            to: process.env.EMAIL_SUPPORTTEAM,
            subject: 'Email verifaction',
            text: `validCount User`,
            html: `<b>${existingUser.email}</b> has sent worng verificationCode 3 times`,
        })

        res.status(200).json({
            success: false,
            msg: `Can't send verificationCode 3 times. Your email has been sent support Team.`
        })
        return;
    }

    const user = await Admin_users.update({
        verificationCode: verificationCode,
        sentCodeTime: new Date(),
        validCount: Number(existingUser.validCount)+1
    }, {
        where: {
            id: id
        }
    });

    sendMail({
        to: existingUser.username,
        subject: 'Email verifaction',
        text: `verificationCode`,
        html: `your verficationCode is <b>${verificationCode}</b>`,
    })
  
    res.status(200).json({
      success: true,
      msg: `VerificationCode was resent successfully`
    })
  },

  async reset_password(req, res) {
    const {
      email,
    } = req.body;

    const verificationCode = uid()   
    
    const existingUser = await Admin_users.findOne({
        where: {
          username: email,
          verified: 1
        }
      }
    );

    if(!existingUser){
        return res.status(200).json({
            success: false,
            msg: `Email is not registered or verified.`
        })
    }

    const user = await Admin_users.update({
        verificationCode: verificationCode,
        sentCodeTime: new Date(),
        validCount: 1
    }, {
        where: {
            username: email,
            verified: 1
        }
    });

    sendMail({
        to: existingUser.username,
        subject: 'Email verifaction',
        text: `verificationCode`,
        html: `your verficationCode is <b>${verificationCode}</b>`,
    })
  
    res.status(200).json({
      success: true,
      msg: `VerificationCode was resent successfully`
    })
  },

  async new_password(req, res) {
    const {
      email,
      code,
      password
    } = req.body;

    const user = await Admin_users.findOne({
      where: {
        username: email,
        verified: 1
      }
    });

    if(!user){
        return res.status(200).json({
            success: false,
            msg: `Email is not registered or verified.`
        })
    }

    if (user.verificationCode != code){
        return res.status(200).json({
            success: false,
            msg: `VerificationCode is wrong.`
        })
    }else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const user = await Admin_users.update({
        password: hash,
      }, {
        where: {
          username: email
        }
      });      

      res.status(200).json({
        success: true,
        msg: `Password has been correctly changed.`
      });
    }
  },
}