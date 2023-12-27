// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "hardhat/console.sol";

contract FamilyWallet{
    struct Member{
        string name;
        bool isParent;
    }

    struct Txn{
        uint8 id;
        address from;
        address to;
        string date;
        string status;
        string purpose;
        uint amount;
    }

    mapping(address => Member) public members;
    mapping(uint8 => Txn) public txns;
    uint8 public txnCount;

    modifier isParent {
      require(members[msg.sender].isParent == true, "Non Parent entity cannot add other members");
      _;
   }

    constructor(){
        members[msg.sender] = Member({
            name: "Head of Family",
            isParent: true});
    }

    function addMember(address _memberAddress, bool _isParent, string memory _name) public isParent {
        console.log("member address string>", _memberAddress);
        // address memberAddressConv = address(bytes20(bytes(memberAddress)));
        // console.log("member address converted>", memberAddressConv);
        members[_memberAddress] = Member({
            name: _name,
            isParent: _isParent});
    }

    function authorizePayment(uint8 _id, bool _authorize) public isParent{
        address recipient = txns[_id].to;
        address sender = txns[_id].from;
        uint amount = txns[_id].amount;

        console.log("speicifc txn>", txns[_id].amount);
        if(_authorize){
            bool success = payable(recipient).send(amount);
            if(success) txns[_id].status = "accepted";
            else console.log("error while sending ether to recipient");

        }else{
            bool success = payable(sender).send(amount);
            if(success) txns[_id].status = "rejected";
            console.log("error while returning ether to sender");
        }
    }

    function newTxn(address _to, string memory _purpose) public payable {
        require(msg.value > 0, "Value sent must be greater than 0");
        console.log("amount>", msg.value);
        console.log("id>", txnCount);
        console.log("to>", _to);
        console.log("from>", msg.sender);
        console.log("purpose>", _purpose);

        txns[txnCount] = Txn({
            id: txnCount,
            from: msg.sender,
            to: _to,
            date: "27th Dec",
            status: "pending approval",
            purpose: _purpose,
            amount: msg.value
        });
        console.log("txn added>", txns[txnCount].amount);
        txnCount ++;
        console.log("contract balance now>", address(this).balance);
    }
 }