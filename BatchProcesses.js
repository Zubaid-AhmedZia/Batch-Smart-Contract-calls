const { ethers } = require("ethers");

const abi = require("./contract");

const provider = new ethers.JsonRpcProvider("https://sepolia.base.org/");
const contractAddress = "";

const privateKey1 = "";
const wallet = new ethers.Wallet(privateKey1, provider);

const contract = new ethers.Contract(contractAddress, abi, provider);
const contractSignerWallet = contract.connect(wallet);

async function main() {
  const batchSize = 4000;

  // Generate an array of 200 NFT IDs
  const batchIds = await generateNFTIds(batchSize);

  const tx = await contractSignerWallet.triggerMetadata(batchIds);

  console.log(`Batch updated - Transaction Hash: ${tx.hash}`);
}

async function generateNFTIds(batchSize) {
  const totalNFTs = 4000;
  const allNFTIds = Array.from({ length: totalNFTs }, (_, index) => index + 1);

  const startIdx = allNFTIds.length - totalNFTs;
  const endIdx = startIdx + batchSize;

  console.log(allNFTIds.slice(startIdx, endIdx).length);

  return allNFTIds.slice(startIdx, endIdx);
}

//batch mint
async function batchMint() {
    const totalNFTs = 5000;
    const batchSize = 200;
  
    // Create an array of 5000 NFT IDs
    const allNFTIds = Array.from({ length: totalNFTs }, (_, index) => index + 1);
  
    // Calculate the number of batches
    const numBatches = Math.ceil(totalNFTs / batchSize);
  
    // Loop through batches and mint 200 NFTs at a time
    for (let i = 0; i < numBatches; i++) {
      const startIdx = i * batchSize;
      const endIdx = Math.min((i + 1) * batchSize, totalNFTs);
  
      const batchIds = allNFTIds.slice(startIdx, endIdx);
      console.log(batchIds);
  
      const tx = await contractSignerWallet.batchSafeMintToSingle(
        "0x767d781d0932b2091121e59F5361ea917009EBDA",
        batchIds
      );
  
      await tx.wait();
  
      console.log(`Batch ${i + 1} minted - Transaction Hash: ${tx.hash}`);
    }
  }

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
