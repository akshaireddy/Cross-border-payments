// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CrossBorderPayment {
    address public owner;
    mapping(address => uint256) public balances;
    uint256 public exchangeRate; // 1 ETH = exchangeRate USD

    event PaymentSent(address indexed sender, address indexed recipient, uint256 amount);

    constructor(uint256 _initialExchangeRate) {
        owner = msg.sender;
        exchangeRate = _initialExchangeRate;
    }

        // Send payment to a recipient in USD
    function sendPayment(address _recipient, uint256 _amountUSD) external payable {
        require(balances[msg.sender] >= _amountUSD, "Insufficient balance");
        uint256 amountETH = _amountUSD * exchangeRate;
        require(msg.value >= amountETH, "Insufficient ETH sent");

        balances[msg.sender] -= _amountUSD;
        balances[_recipient] += _amountUSD;

        emit PaymentSent(msg.sender, _recipient, _amountUSD);
    }
    // Deposit USD balance into the contract
    function depositUSD(uint256 _amountUSD) external {
        require(_amountUSD > 0, "Deposit amount must be greater than 0");
        balances[msg.sender] += _amountUSD;
    }

    // Withdraw accumulated USD balance from the contract
    function withdrawUSD(uint256 _amountUSD) external {
        require(balances[msg.sender] >= _amountUSD, "Insufficient balance");
        balances[msg.sender] -= _amountUSD;
        // Implement logic to transfer the equivalent amount in ETH to the sender
        // (Ensure proper exchange rate conversion)
    }
    // Update the exchange rate by the contract owner
    function updateExchangeRate(uint256 _newRate) external {
        require(msg.sender == owner, "Only the contract owner can update the exchange rate");
        exchangeRate = _newRate;
    }

}
