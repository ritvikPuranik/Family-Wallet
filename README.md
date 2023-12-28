# Family Wallet

An expense management tool coupled with a wallet, for the family. An authenticated session ensures only members of a family are interacting with the app. A "parent" has the authority to accept/ reject any transaction, as well as add other members to the family. A member can initiate payment but funds are only going to be transferred once approved(they're stored in the smart contract until then). If a transaction gets rejected, the funds are returned to the sender.
Transactions are made by uploading a QR code, which is then decoded on the backend.

## Features
- Parental Controls - 
  - Can add another parent or even a member of the family
  - Authorize transactions initiated by members
- Make Payment - Upload a QR code which is then decoded and then can be used to make a payment. Eventually can be scanned from device camera.
- Authenticated Routes - Can only be accessed by family members


## How to launch
- Clone this repo, as well as the "Family-Wallet-Backend" repo.
- Install Dependencies
```sh
cd Family-Wallet/client
npm i
cd Family-Wallet/truffle
npm i
```
- Deploy the smart contract(ensure that ganache is running and metamask is setup to interact with local blockchain)
```sh
cd truffle
truffle migrate --reset
```
- Launch the server in and the frontend - 
```sh
cd client
npm start
```
For the Server(in the Family-Wallet-Backend repo) - 
```sh
npm i
npm start
```
- Once the app is up and running, you will be greeted with a login page. Type anything you wish and press submit to start interacting with the app.