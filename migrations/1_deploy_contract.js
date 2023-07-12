const KingPinNFT = artifacts.require('KingPinNFT')

module.exports = function (deployer) {
  const name = 'KingPinNFT'
  const symbol = 'KNGPN'
  deployer.deploy(KingPinNFT, name, symbol)
}
