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
    await this.kingPinNFT.mint(accounts[1], 50,'text for #50 NFT', {value: web3.utils.toWei('1','ether')});
    await this.kingPinNFT.mint(accounts[1], 51, 'text for #51 NFT', {value: web3.utils.toWei('1','ether')});
    let balance = await this.kingPinNFT.balanceOf(accounts[1]);
    let address = await this.kingPinNFT.address;
    assert.equal(balance, 2)
    console.log(address);
  })

  it('airdrop eligibility updates', async()=>{
    let res = await this.kingPinNFT.updateAirdropEligibility(accounts[1], true);
    let event = res.logs[0].args;
    assert.equal(event.owner, accounts[1]);
    assert.equal(event.eligibility, true);
  })

  // it('eligibility changes on transfer',async()=>{
  //   let res = await this.kingPinNFT.transfer(accounts[1],accounts[2],50);
  //   console.log(res.logs[0].args);
  // })
})
