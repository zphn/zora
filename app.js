const ethers = require('ethers')
const fs = require('fs')

const fileName = "./wallets.csv";
const numberOfWallets = getRequiredWalletsNumber();
console.log(`Start generation of ${numberOfWallets} wallets`)
fs.appendFileSync(fileName, 'Address;Private Key; Mnemonic Phrase\n')
for(let i = 0; i < numberOfWallets; i++) {
    let generatedWallet = generateWallet()
    saveToCsv(generatedWallet)
}

function generateWallet() {
    let wallet = ethers.Wallet.createRandom()
    console.log(`Wallet [${wallet.address}] is generated.`)
    return wallet
}

function saveToCsv(wallet) {
    const payload = `${wallet.address};${wallet.privateKey};${wallet.mnemonic.phrase}\n`
    fs.appendFileSync(fileName, payload);
}

function getRequiredWalletsNumber() {
    let walletCount = process.argv[2];
    if(walletCount == null) {
        return 1
    } else {
        return Number(walletCount);
    }
}