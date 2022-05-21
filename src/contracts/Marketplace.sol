pragma solidity ^0.5.0;

// acts as the backend for our markletplace
contract Marketplace {
  string public name;

  constructor() public {
    name = "first eth marketplace";
  }
}