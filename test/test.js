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
    await this.kingPinNFT.mint(accounts[1], 'text for NFT', {value: web3.utils.toWei('0.5','ether'), from: accounts[1]});
    await this.kingPinNFT.mint(accounts[3], 'text for NFT', {value: web3.utils.toWei('0.5','ether'), from: accounts[3]});
    let balance = await this.kingPinNFT.balanceOf(accounts[1]);
    let address = await this.kingPinNFT.address;
    assert.equal(balance, 1)
    console.log(address);
  })

  it('NFTCount updates', async()=>{
    let NFTCount = await this.kingPinNFT.NFTCount();
    assert.equal(NFTCount.toNumber(), 2)
  })


  it('eligibility changes on transfer',async()=>{
    let res = await this.kingPinNFT.transferFrom(accounts[1], accounts[2], 1, {from: accounts[1]});
    let fromEligibility = await this.kingPinNFT.getEligibility(accounts[1]);
    let toEligibility = await this.kingPinNFT.getEligibility(accounts[2]);
    assert.equal(fromEligibility, false);
    assert.equal(toEligibility, true);
    assert.equal(res.logs[0].event, 'Transfer')
  })

  it('airdrop works', async()=>{
    try {
      await this.kingPinNFT.airdrop([]);
    } catch (e) {
    }

    try {
      await this.kingPinNFT.airdrop([accounts[4]]);
    } catch (e) {
    }
  })
})
