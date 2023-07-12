const KingPinNFT = artifacts.require('KingPinNFT')

contract('KingPinNFT', accounts => {
  before(async () => {
    this.kingPinNFT = await KingPinNFT.deployed()
  })

  it('symbol and name is set', async () => {
    const name = await this.kingPinNFT.name()
    const symbol = await this.kingPinNFT.symbol();
    assert.equal(name, 'KingPinNFT');
    assert.equal(symbol, 'KNGPN');
  })

  it('mint function test', async()=>{
    const reciever = '0x4166198139e260a0404334C1BF1b559B3bd1BEB4';
    await this.kingPinNFT.mint(reciever, 50);
    await this.kingPinNFT.mint(reciever, 51);
    let balance = await this.kingPinNFT.balanceOf(reciever);
    let address = await this.kingPinNFT.address;
    assert.equal(balance, 2)
  })
})
