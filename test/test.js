const KingPinNFT = artifacts.require('KingPinNFT')

contract('KingPinNFT', accounts => {
  before(async () => {
    this.kingPinNFT = await KingPinNFT.deployed()
  })

  it('symbol and name is set', async () => {
    const name = await this.kingPinNFT.name()
    const symbol = await this.kingPinNFT.symbol()
    assert.equal(name, 'KingPinNFT')
    assert.equal(symbol, 'KNGPN')
  })

  it('mint function test', async () => {
    await this.kingPinNFT.mint(accounts[1], 'text for NFT 1', {
      value: web3.utils.toWei('0.5', 'ether'),
      from: accounts[1]
    })
    // id=>1

    await this.kingPinNFT.mint(accounts[3], 'text for NFT 2', {
      value: web3.utils.toWei('0.5', 'ether'),
      from: accounts[3]
    })
    //id=>2
    let balance = await this.kingPinNFT.balanceOf(accounts[1])
    let address = await this.kingPinNFT.address
    assert.equal(balance, 1)
    console.log(address)
  })

  it('NFTCount updates', async () => {
    let NFTCount = await this.kingPinNFT.NFTCount()
    assert.equal(NFTCount.toNumber(), 2)
  })

  it('eligibility changes on transfer', async () => {
    let res = await this.kingPinNFT.transferFrom(accounts[1], accounts[2], 1, {
      from: accounts[1]
    })
    let fromEligibility = await this.kingPinNFT.getEligibility(accounts[1])
    let toEligibility = await this.kingPinNFT.getEligibility(accounts[2])
    assert.equal(fromEligibility, false)
    assert.equal(toEligibility, true)
    assert.equal(res.logs[0].event, 'Transfer')
  })

  it('airdrop works', async () => {
    try {
      await this.kingPinNFT.airdrop([])
    } catch (e) {}

    try {
      await this.kingPinNFT.airdrop([accounts[4]])
    } catch (e) {}

    await this.kingPinNFT.airdrop([accounts[2]/* id=>3 */, accounts[3]/* id=>4 */],['id of this nft is 3','id of this nft is 4'])
    let lastAirdroppedNFTID = await this.kingPinNFT.NFTCount()
    let owner = await this.kingPinNFT.ownerOf(lastAirdroppedNFTID)
    assert.equal(owner, accounts[3])
  })

  it('eligibility changes after airdrop', async () => {
    let one = await this.kingPinNFT.getEligibility(accounts[2])
    let two = await this.kingPinNFT.getEligibility(accounts[3])
    assert.equal(one, false)
    assert.equal(two, false)
  })

  it('getting owned NFTs', async()=>{
    let ownedNFTs = await this.kingPinNFT.getOwnedNFTs(accounts[3]);
    // [
    //   [ '2', 'text for NFT 2', id: '2', data: 'text for NFT 2' ],
    //   [ '4', 'id of this nft is 4', id: '4', data: 'id of this nft is 4' ]
    // ]
    assert.equal(ownedNFTs[0].id, '2')
    assert.equal(ownedNFTs[1].id, '4')
    try {
      const invalidAddress = '0x5765765';
      await this.kingPinNFT.getOwnedNFTs(invalidAddress);
    } catch (e) {
      assert.equal(e.code, "INVALID_ARGUMENT")
    }
  })

  it('ownedtokens mapping change on transfer', async()=>{
    await this.kingPinNFT.transferFrom(accounts[3], accounts[2], 2, {
      from: accounts[3]
    })

    let ownedNFTs = await this.kingPinNFT.getOwnedNFTs(accounts[3]);
    console.log(ownedNFTs);
    ownedNFTs = await this.kingPinNFT.getOwnedNFTs(accounts[2]);
    console.log(ownedNFTs);
  })

})
