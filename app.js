// Connect to Ethereum network
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

// ABI (Application Binary Interface) of your smart contract
const abi = [
    // Include ABI of your contract functions
];

// Address of your deployed smart contract
const address = '0x123456789...'; // Replace with your contract address

// Create contract instance
const contract = new web3.eth.Contract(abi, address);

// Function to deposit funds into the smart contract
function deposit() {
    const amount = document.getElementById("inputAmount").value;
    
    // Convert amount to Wei (1 Ether = 10^18 Wei)
    const amountWei = web3.utils.toWei(amount, 'ether');
    
    // Send transaction to smart contract
    contract.methods.deposit().send({ from: web3.eth.defaultAccount, value: amountWei })
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
