const { isValidSolanaAddress, getParsedNftAccountsByOwner } = require("@nfteyez/sol-rayz");
const connection = require("./connection");

const checkIfApeIsInWallet = async ({
  address,
  wallet,
}) => {

  const result = isValidSolanaAddress(wallet);

  if(result) {
    const nfts = await getParsedNftAccountsByOwner({
      publicAddress: wallet,
      serialization: true,
      connection: connection
    });
    const nftAddresses = (nfts || []).map(nft => nft.mint)

    return nftAddresses.includes(address)
  } else {
    return false
  }
}

module.exports = checkIfApeIsInWallet;