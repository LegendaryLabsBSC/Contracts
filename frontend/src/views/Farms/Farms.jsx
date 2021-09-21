import { React, useState } from 'react'
import { ethers } from 'ethers'
import axios from 'axios'
import styled from 'styled-components'
import { uniqueNamesGenerator, Config, adjectives, animals } from 'unique-names-generator'
import LegendsNFT from '../../artifacts/contracts/LegendsNFT.sol/LegendsNFT.json'
import LegendsMarketplace from '../../artifacts/contracts/LegendsMarketplace.sol/LegendsMarketplace.json'
import { NftCard } from './components/nftCard'
import gif from '../../eater.gif'

// 0x18d551e95f318955F149A73aEc91B68940312E4a ; 0x0F1aaA64D4A29d6e9165E18e9c7C9852fc92Ff53
// During testing this address will change frequently
const legendsNFTAddress = '0xdA3db45d2A0C0Bd531E719370372c375B50440C1'
const legendsMarketplaceAddress = '0x20e93285b59C8D41233b50c77f5fd9673a798F07'
// const legendAddress = '0x595d855Ba16dE4469Fb5DaA006EB5e7Afc89D4AB' // master

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

const contract = {
  read: new ethers.Contract(legendsNFTAddress, LegendsNFT.abi, provider),
  write: new ethers.Contract(legendsNFTAddress, LegendsNFT.abi, signer),
}

const marketplace = {
  read: new ethers.Contract(legendsMarketplaceAddress, LegendsMarketplace.abi, provider),
  write: new ethers.Contract(legendsMarketplaceAddress, LegendsMarketplace.abi, signer),
}

const prefixConfig = {
  dictionaries: [adjectives],
  length: 1,
}

const postfixConfig = {
  dictionaries: [animals],
  length: 1,
}

function App() {
  const [id, setID] = useState(0)
  const [sellPrice, setPrice] = useState(0)
  const [parent1, setParent1] = useState(0)
  const [parent2, setParent2] = useState(0)
  const [value, setValue] = useState(0)
  const [season, setSeasonValue] = useState('')
  const [newURI, setURI] = useState('')
  const [legends, setLegends] = useState([])
  const [gettingLegends, setGettingLegends] = useState(false)

  async function setIncubationDuration() {
    if (typeof window.ethereum !== 'undefined') {
      // const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const unixTime = value * 86400
      await contract.write.setIncubationDuration(unixTime)
    }
  }
  async function setBreedingCooldown() {
    if (typeof window.ethereum !== 'undefined') {
      // const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      await contract.write.setBreedingCooldown(value)
    }
  }
  async function setOffspringLimit() {
    if (typeof window.ethereum !== 'undefined') {
      // const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      await contract.write.setOffspringLimit(value)
    }
  }
  async function setBaseBreedingCost() {
    if (typeof window.ethereum !== 'undefined') {
      // const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      await contract.write.setBaseBreedingCost(value)
    }
  }
  async function setBaseHealth() {
    if (typeof window.ethereum !== 'undefined') {
      // const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      await contract.write.setBaseHealth(value)
    }
  }
  async function setSeason() {
    if (typeof window.ethereum !== 'undefined') {
      // const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      await contract.write.setSeason(season)
    }
  }

  async function fetchURI() {
    if (typeof window.ethereum !== 'undefined') {
      const legendURI = await contract.read.tokenURI(id)
      console.log('IPFS URI: ', legendURI)
    }
  }
  async function fetchLegendComposition() {
    if (typeof window.ethereum !== 'undefined') {
      // const legendMeta = await contract.read.legendData(id) // doesn't return parents for some reason
      const legendMeta = await contract.read.tokenMeta(id)
      const legendGenetics = await contract.read.legendGenetics(id)
      const legendStats = await contract.read.legendStats(id)
      console.log('META:')
      console.log(`id: ${legendMeta.id}`)
      console.log(`prefix: ${legendMeta.prefix}`)
      console.log(`postfix: ${legendMeta.postfix}`)
      console.log(`parents: ${legendMeta.parents}`)
      console.log(`birthday: ${legendMeta.birthDay}`)
      console.log(`incubation duration: ${legendMeta.incubationDuration}`)
      console.log(`breeding cooldown: ${legendMeta.breedingCooldown}`)
      console.log(`breeding cost: ${legendMeta.breedingCost}`)
      console.log(`offspring limit: ${legendMeta.offspringLimit}`)
      console.log(`season: ${legendMeta.season}`)
      console.log(`is legendary: ${legendMeta.isLegendary}`)
      console.log(`is hatched: ${legendMeta.isHatched}`)
      console.log(`is destroyed: ${legendMeta.isDestroyed}`)
      console.log('GENES:')
      console.log(`CdR1: ${legendGenetics.CdR1}`)
      console.log(`CdG1: ${legendGenetics.CdG1}`)
      console.log(`CdB1: ${legendGenetics.CdB1}`)
      console.log(`CdR2: ${legendGenetics.CdR2}`)
      console.log(`CdG2: ${legendGenetics.CdG2}`)
      console.log(`CdB2: ${legendGenetics.CdB2}`)
      console.log(`CdR3: ${legendGenetics.CdR3}`)
      console.log(`CdG3: ${legendGenetics.CdG3}`)
      console.log(`CdB3: ${legendGenetics.CdB3}`)
      console.log('STATS:')
      console.log(`level: ${legendStats.level}`)
      console.log(`health: ${legendStats.health}`)
      console.log(`strength: ${legendStats.strength}`)
      console.log(`defense: ${legendStats.defense}`)
      console.log(`agility: ${legendStats.agility}`)
      console.log(`speed: ${legendStats.speed}`)
      console.log(`accuracy: ${legendStats.accuracy}`)
      console.log(`destruction: ${legendStats.destruction}`)
    }
  }
  async function fetchMeta() {
    if (typeof window.ethereum !== 'undefined') {
      // const legendMeta = await contract.read.legendData(id) // doesn't return parents for some reason
      const legendMeta = await contract.read.tokenMeta(id)
      console.log(`Meta: ${legendMeta}`)
    }
  }
  async function fetchGenetics() {
    if (typeof window.ethereum !== 'undefined') {
      const legendGenetics = await contract.read.legendGenetics(id)
      console.log(`Genetics: ${legendGenetics}`)
    }
  }
  async function fetchStats() {
    if (typeof window.ethereum !== 'undefined') {
      const legendStats = await contract.read.legendStats(id)
      console.log(`Stats: ${legendStats}`)
    }
  }

  async function isHatchable() {
    if (typeof window.ethereum !== 'undefined') {
      legends.forEach((legend) => {
        contract.read.legendData(legend.tokenID).then((legendMeta) => {
          if (!legendMeta.isHatched) {
            const testToggle = true // hatching test toggle
            contract.read.isHatchable(legendMeta.id, testToggle).then((res) => {
              console.log(res.toString())
            })
            console.log(`Legend ${legendMeta.id} is hatched: ${legendMeta.isHatched}`)
          }
        })
      })
    }
  }

  async function hatch() {
    await axios.post('http://localhost:3001/api/retrieve', { id }).then((res) => {
      console.log(res.data)
      const hatchedURI = res.data
      contract.write.hatch(id, hatchedURI)
    })
  }

  async function getAllLegends() {
    setGettingLegends(true)
    if (typeof window.ethereum !== 'undefined') {
      const totalLegends = await contract.read.totalSupply()
      for (let i = 1; i <= totalLegends; i++) {
        contract.read.legendData(i).then((legendMeta) => {
          if (!legendMeta.isDestroyed) {
            loadLegends(legendMeta.id.toString())
          }
        })
      }
    }
  }

  async function getTokensByOwner() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      await contract.read.balanceOf(account).then((balance) => {
        if (balance > 0) {
          setGettingLegends(true)
          const legendsData = []
          for (let i = 0; i < balance; i++) {
            contract.read.tokenOfOwnerByIndex(account, i).then((token) => {
              const ownedToken = token.toString()
              loadLegends(ownedToken).then((res) => {
                legendsData.push(res)
              })
            })
          }
          setLegends(legendsData)
        } else {
          console.log('Account does not own any Legend Tokens')
        }
      })
    }
  }

  async function loadLegends(tokenID) {
    const imgURL = await contract.read.tokenURI(tokenID)
    console.log(`Legend ID: ${tokenID} Image URL: ${imgURL}`)
    return { tokenID, imgURL }
    // Logic for rendering Legend Card Component here from pinata ?
  }

  // Send new NFT Genetics to API/Generator
  async function generateImage(newItemId) {
    if (typeof window.ethereum !== 'undefined') {
      const legend = await contract.read.tokenMeta(newItemId)
      const legendGenetics = await contract.read.legendGenetics(newItemId)
      // TODO: Make into interface(convert js -> ts)
      const legendInterface = {
        id: `${legend.id}`,
        prefix: legend.prefix,
        postfix: legend.postfix,
        genetics: `${legendGenetics}`,
        parents: `${legend.parents}`,
        birthDay: `${legend.birthDay}`,
        incubationDuration: `${legend.incubationDuration}`,
        breedingCooldown: `${legend.breedingCooldown}`,
        breedingCost: `${legend.breedingCost}`,
        offspringLimit: `${legend.offspringLimit}`,
        season: legend.season,
        isLegendary: legend.isLegendary,
        isDestroyed: legend.isDestroyed,
      }

      // ! recieveing multiple responses in the console
      // console.log('test', legendInterface)
      // console.log('test1', legend)

      await axios
        .post('http://localhost:3001/api/mint', { legendInterface }) // Use this if your main host is Windows
        // .post('http://192.168.1.157:3001/api/mint', { legendInterface }) // using my laptop to run the generator API
        .then((res) => {
          const url = res.data
          console.log('New NFT IPFS URL:', url)
        })
      // .finally(() => {
      //   document.location.reload()
      // })
    }
  }

  async function breed() {
    if (typeof window.ethereum !== 'undefined') {
      const skipIncubation = false // for testing ; will be linked to accessories from game
      await contract.write.breed(parent1, parent2, skipIncubation).then(
        contract.write.once('NewLegend', (data, event) => {
          const newItemId = data.toString()
          console.log('New Token Created:', newItemId) // Debug logging
          generateImage(newItemId)
        }),
      )
    }
  }

  async function destroy() {
    if (typeof window.ethereum !== 'undefined') {
      await contract.write.immolate(id)
    }
  }

  // Mints Legend with "random" Genetics
  async function mintPromo() {
    if (typeof window.ethereum !== 'undefined') {
      const prefix = uniqueNamesGenerator(prefixConfig) // for testing
      const postfix = uniqueNamesGenerator(postfixConfig) // for testing
      // const level = 1 // for testing
      const isLegendary = false // for testing
      const skipIncubation = false // for testing

      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      await contract.write.mintPromo(account, prefix, postfix, isLegendary, skipIncubation).then(
        // ! receiving multiple responses ?
        // ? is .then even needed
        contract.write.once('NewLegend', (data, event) => {
          console.log('New Token Created:', data.toString())
          const newItemId = data.toString()
          generateImage(newItemId)
        }),
      )
    }
  }

  async function approveTransaction() {
    if (typeof window.ethereum !== 'undefined') {
      await contract.write.approve(legendsMarketplaceAddress, id)
    }
  }

  //TODO: control aution/non-auction with toggle
  async function createMarketListing() {
    if (typeof window.ethereum !== 'undefined') {
      // const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const price = ethers.utils.parseUnits(sellPrice, 'ether')
      const transaction = await marketplace.write.createMarketListing(legendsNFTAddress, id, price)
      await transaction.wait
      // await marketplace.write.createMarketListing(legendsNFTAddress, id, price).then(
      marketplace.write.once('ListingStatusChanged', (data, event) => {
        console.log(`data: ${data[0]} ${data[1]}`)
        console.log(`event: ${event[0]} ${event[1]}`)
      })
    }
  }
  async function createAuctionListing() {
    if (typeof window.ethereum !== 'undefined') {
      // const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const price = ethers.utils.parseUnits(sellPrice, 'ether')
      const transaction = await marketplace.write.createMarketListing(legendsNFTAddress, id, price)
      await transaction.wait
      // await marketplace.write.createMarketListing(legendsNFTAddress, id, price).then(
      marketplace.write.once('ListingStatusChanged', (data, event) => {
        console.log(`data: ${data[0]} ${data[1]}`)
        console.log(`event: ${event[0]} ${event[1]}`)
      })
    }
  }
  async function buyMarketListing() {
    if (typeof window.ethereum !== 'undefined') {
      const t = await marketplace.read.legendListing(id)
      // const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      // const price = ethers.utils.parseUnits(t.price.toString(), 'ether')
      // const price = t.price.toString()
      // console.log(price)
      const transaction = await marketplace.write.buyMarketListing(legendsNFTAddress, id, {
        value: t.price,
      })
      await transaction.wait()
      // .then(
      marketplace.write.once('ListingStatusChanged', (data, event) => {
        console.log(`data: ${data[0]} ${data[1]}`)
        console.log(`event: ${event[0]} ${event[1]}`)
      })
    }
  }
  async function cancelMarketListing() {
    if (typeof window.ethereum !== 'undefined') {
      // const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      await marketplace.write.cancelMarketListing(legendsNFTAddress, id).then(
        marketplace.write.once('ListingStatusChanged', (data, event) => {
          console.log(`data: ${data[0]} ${data[1]}`)
          console.log(`event: ${event[0]} ${event[1]}`)
        }),
      )
    }
  }
  async function fetchListingData() {
    if (typeof window.ethereum !== 'undefined') {
      const itemData = await marketplace.read.fetchItemData()
      const itemCount = itemData[0]
      const unsoldItemCount = itemData[0] - itemData[1]
      const currentIndex = 0
      const l = await marketplace.read.legendListing(id)
      //
      for (let i = 0; i < itemCount; i++) {
        console.log(`Listing ID: ${l.listingId}`)
        console.log(`Contract: ${l.nftContract}`)
        console.log(`Token ID: ${l.tokenId}`)
        console.log(`Seller: ${l.seller}`)
        console.log(`Buyer: ${l.buyer}`)
        console.log(`Price: ${l.price}`)
        console.log(`Status: ${l.status}`)
        console.log('')
        // console.log(legendListing.buyer)
        // if (legendListing(i+1).buyer == )
      }
    }
  }
  async function fetchItemData() {
    if (typeof window.ethereum !== 'undefined') {
      const t = await marketplace.read.fetchItemData()
      console.log(`itemcount: ${t[0]}`)
      console.log(`soldcount: ${t[1]}`)
      console.log(`unsolditemcount: ${t[2]}`)
    }
  }
  async function fetchMarketListings() {
    if (typeof window.ethereum !== 'undefined') {
      const marketContract = new ethers.Contract(legendsMarketplaceAddress, LegendsMarketplace.abi, provider)
      const totalListings = await marketContract.fetchMarketListings()
      totalListings.forEach((l) => {
        console.log(`Listing ID: ${l.listingId}`)
        console.log(`Contract: ${l.nftContract}`)
        console.log(`Token ID: ${l.tokenId}`)
        console.log(`Seller: ${l.seller}`)
        console.log(`Buyer: ${l.buyer}`)
        console.log(`Price: ${l.price}`)
        console.log(`Status: ${l.status}`)
        console.log('')
      })
    }
  }

  // const NftContainer = styled.div`
  //   & {
  //     padding: 25px;
  //     display: inline-flex;
  //     flex-wrap: wrap;
  //     width: 100%;
  //     justify-content: center;
  //     div {
  //       margin: 25px;
  //     }
  //   }
  // `

  // const pinataGeteway = 'https://gateway.pinata.cloud/ipfs/'

  // const cidToUrl = (cid) => {
  //   return pinataGeteway + cid.split('//')[1]
  // }

  return (
    <div>
      <header>
        <div>
          <input type="number" placeholder="Token ID" onChange={(e) => setID(e.target.value)} />
          <button type="submit" onClick={fetchURI}>
            Fetch URI
          </button>
          <button type="submit" onClick={fetchLegendComposition}>
            Fetch Legend Composition
          </button>
          <button type="submit" onClick={fetchMeta}>
            Fetch Legend Metadata
          </button>
          <button type="submit" onClick={fetchGenetics}>
            Fetch IPFS Genetics
          </button>
          <button type="submit" onClick={fetchStats}>
            Fetch Legend Stats
          </button>
          <button type="submit" onClick={isHatchable}>
            is Hatchable ?
          </button>
          <br /> <br /> <br />
          <input type="number" placeholder="Value" onChange={(e) => setValue(e.target.value)} />
          <button type="submit" onClick={setIncubationDuration}>
            Set Base Incubation Duration
          </button>
          <button type="submit" onClick={setBreedingCooldown}>
            Set Base Breeding Cooldown
          </button>
          <button type="submit" onClick={setOffspringLimit}>
            Set Offspring Limit
          </button>
          <button type="submit" onClick={setBaseBreedingCost}>
            Set Base Breeding Cost
          </button>
          <button type="submit" onClick={setBaseHealth}>
            Set Base Health
          </button>
          <br />
          <input type="text" placeholder="Season" onChange={(e) => setSeasonValue(e.target.value)} />
          <button type="submit" onClick={setSeason}>
            Set Season
          </button>
          <br /> <br /> <br />
          <button type="submit" onClick={getTokensByOwner}>
            Print Owned Legend IDs
          </button>
          <button type="submit" onClick={getAllLegends}>
            Print All Legend Ids
          </button>
          <br /> <br />
          <button type="submit" onClick={mintPromo}>
            Mint Promotional NFT
          </button>
          <br /> <br />
          <input type="number" placeholder="Parent 1 Token ID" onChange={(e) => setParent1(e.target.value)} />
          <input type="number" placeholder="Parent 2 Token ID" onChange={(e) => setParent2(e.target.value)} />
          <button type="submit" onClick={breed}>
            Breed
          </button>
          <br /> <br />
          <input type="number" placeholder="Token ID" onChange={(e) => setID(e.target.value)} />
          <button type="submit" onClick={destroy}>
            Destroy Legend
          </button>
          <br />
          <input type="number" placeholder="Token ID" onChange={(e) => setID(e.target.value)} />
          <button type="submit" onClick={hatch}>
            Hatch Legend
          </button>
        </div>
        <br />
        <br />
        <br />
        <div>
          <button type="submit" onClick={approveTransaction}>
            Approve Transaction
          </button>
          <br />
          <input type="number" placeholder="Token ID" onChange={(e) => setID(e.target.value)} />
          <input type="number" placeholder="Sell Price(BSC)" onChange={(e) => setPrice(e.target.value)} />
          <button type="submit" onClick={createMarketListing}>
            Sell Legend
          </button>
          <br />
          <input type="number" placeholder="Listing ID" onChange={(e) => setID(e.target.value)} />
          <button type="submit" onClick={buyMarketListing}>
            Buy Legend
          </button>
          <button type="submit" onClick={cancelMarketListing}>
            Cancel Listing
          </button>
          <br />
          <button type="submit" onClick={fetchMarketListings}>
            Fetch Market Listings
          </button>
          <button type="submit" onClick={fetchListingData}>
            Fetch Listing Data
          </button>
          <button type="submit" onClick={fetchItemData}>
            Fetch Item Data
          </button>
        </div>
      </header>
      {/* <NftContainer>
        {gettingLegends &&
          (legends.length > 0 ? (
            legends.map((legend) => {
              console.log(legends)
              return (
                <NftCard>
                  <h3>Legend ID: {legend.tokenID}</h3>
                  <img alt="legend" src={cidToUrl(legend.imgURL)} />
                </NftCard>
              )
            })
          ) : (
            <img alt="eater" src={gif} />
          ))}
      </NftContainer> */}
    </div>
  )
}

export default App
