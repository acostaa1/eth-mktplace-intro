pragma solidity ^0.5.0;

// acts as the backend for our markletplace
contract Marketplace {
  string public name;
  uint public productCount = 0;
  mapping(uint => Product) public products;

  struct Product {
    uint id;
    string name;
    uint price;
    address owner;
    bool purchased;
  }

  event ProductCreated(
    uint id,
    string name,
    uint price,
    address owner,
    bool purchased
    );

  constructor() public {
    name = "first eth marketplace";
  }


  function createProduct(string memory _name, uint _price) public {
    //require a name -- bytes checks to see if there is data present
    require(bytes(_name).length > 0);
    //require a valid price
    require(_price > 0);
    //increment product count
    productCount ++;
    //create the product
    products[productCount] = Product(productCount, _name, _price, msg.sender, false);
    //trigger an event
    emit ProductCreated(productCount, _name, _price, msg.sender, false);

  }
}