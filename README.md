# Blockchain Calculator

This is a simple blockchain calculator that uses the [Shunting Yard Algorithm](https://en.wikipedia.org/wiki/Shunting_yard_algorithm) to parse mathematical expressions and then evaluate it on Ethereum network, contract is deployed on sepolia testnet, see [contract](https://sepolia.etherscan.io/address/0x8c6f4f57f268750aC1E6EA6e1223695F127D7392)
<p align="center"><img src="https://github.com/user-attachments/assets/35719066-baf1-43a1-a9cf-fbb3c7f11cd3"></p>

## Installation

To run the project follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/zakne/blockchain-calculator.git
    ```
2. Set up environment variables:

    modify `.env` with your infura url

    ```env
    HTTP_PROVIDER_URL=https://sepolia.infura.io/v3/<YOUR-ID>
    ```

3. Install and start the application:

    ```bash
    npm install
    npm start
    ```

The application will be running on `http://localhost:5000`.
