# Family Wallet

**Family Wallet** is an ERC20-based expense management tool designed for families. It ensures secure, authenticated interactions between family members within the app. A designated "parent" has the authority to approve or reject transactions and add other family members. Members can initiate payments, but funds are transferred only after parental approval. The project includes server-side interaction with the smart contract for enhanced security.

## Features

- **Parental Controls**  
  - Add new members or additional parents to the family.  
  - Authorize or reject transactions initiated by members.

- **Make Payments**  
  - Initiate payments by providing the recipient's wallet address and purpose. Transactions are processed only after approval from a parent.

- **Authenticated Routes**  
  - Ensure only family members have access to the app's features.

## Demo Images

View screenshots and images [here](https://drive.google.com/drive/folders/1wjm50TAUEFbyFIAVi6vw5xfhSLp8kvP-?usp=sharing).

---

## Run Locally

Follow the steps below to run the Family Wallet project locally.

### Prerequisites
- Clone this repository and the [Family Wallet Backend](https://github.com/ritvikPuranik/Family-Wallet-Backend) repository.

### Client Setup
1. Navigate to the client directory and install dependencies:
    ```bash
    cd Family-Wallet/client
    npm i
    npm start
    ```

### Server & Smart Contract Setup
1. Clone the backend repository:
    ```bash
    git clone https://github.com/ritvikPuranik/Family-Wallet-Backend.git
    ```
2. Launch the local blockchain and server:
   - Open two terminal windows and navigate to the backend directory:
     ```bash
     cd Family-Wallet-Backend/hardhat
     ```
   - In the first terminal, start the local blockchain:
     ```bash
     npx hardhat node
     ```
   - In the second terminal, compile the smart contract and start the server:
     ```bash
     npm i
     npx hardhat compile
     npm start
     ```

---

## Getting Started

Once the app is running, you'll be greeted by the login page. Here's how to begin:  
1. The smart contract is pre-configured with a master account using the 10th wallet address from Hardhat's local blockchain.  
2. Connect the 10th wallet address in MetaMask.  
3. Log in as the master by entering the password: `password`.  

### Create New Accounts  
- Register new accounts through the home page (one account can be created per wallet address).  
- Log back in as the master and add the newly created accounts as members of your family.

Explore all the features using the master and member accounts!

---

## Author

- [@ritvikPuranik](https://github.com/ritvikPuranik)
