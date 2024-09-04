const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

const network = bitcoin.networks.testnet;

// derivação de carteiras deterministica.
const path = `m/49'/1'/0'/0`;

//criando o mnemoci para a seed(palavras da senha)
let menemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(menemonic);

//criando a raiz da caretira 
let root = bip32.fromSeed(seed, network);

// criando uma conta - par de keys, privada e publica
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

let btcAdress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address;

console.log("Carteira Gerada");
console.log("Endereço: ", btcAdress);
console.log("Chave Privada: ", node.toWIF());
console.log("Seed ", menemonic);

