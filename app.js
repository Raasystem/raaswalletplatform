// Import the Web3 library
const Web3 = require('web3');

// Connect to the Ethereum network
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

// Define the ABI (Application Binary Interface) of your smart contract
const abi = [
    // Include ABI of your contract functions
];

// Specify the address of your deployed smart contract
const contractAddress = '0x2a4147A4C4Ff0197018938539928f18dAD5643C9'; // Replace with your contract address

// Create a contract instance using the ABI and contract address
const contract = new web3.eth.Contract(abi, contractAddress);

// Function to deposit funds into the smart contract
function deposit() {
    // Retrieve the amount from the input field
    const amount = document.getElementById("inputAmount").value;
    
    // Convert the amount to Wei (1 Ether = 10^18 Wei)
    const amountWei = web3.utils.toWei(amount, 'ether');
    
    // Send a transaction to the smart contract to execute the deposit function
    contract.methods.deposit().send({ 
        from: web3.eth.defaultAccount,  // Specify the sender's address
        value: amountWei                 // Specify the amount to send (in Wei)
    })
    .on('transactionHash', function(hash){
        console.log('Transaction Hash:', hash);
    })
    .on('confirmation', function(confirmationNumber, receipt){
        console.log('Confirmation Number:', confirmationNumber);
        console.log('Receipt:', receipt);
        document.getElementById("output").innerText = 'Transaction confirmed!';
    })
    .on('error', function(error){
        console.error('Error:', error);
        document.getElementById("output").innerText = 'Error: ' + error.message;
    });
}

