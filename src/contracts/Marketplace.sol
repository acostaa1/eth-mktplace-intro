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
    address payable owner;
    bool purchased;
  }

  event ProductCreated(
    uint id,
    string name,
    uint price,
    address payable owner,
    bool purchased
    );

  event ProductPurchased(
    uint id,
    string name,
    uint price,
    address payable owner,
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

  function purchaseProduct(uint _id) public payable {
    //get product
    Product memory _product = products[_id];
    //get owner
    address payable _seller = _product.owner;
    // make sure product has a valid id
    require(_product.id > 0 && _product.id <= productCount);

    //make sure there is enough ether to completee transaction
    require(msg.value >= _product.price);

    //make sure product has nbot already been purchased
    require(!_product.purchased);

    //make sure buyer is not seller 
    require(_seller != msg.sender);


    //purchase product (transfer ownership, mark as purchased, and update product)
    _product.owner = msg.sender;
    _product.purchased = true;
    products[_id] = _product;

    //pay the seller with ether
    address(_seller).transfer(msg.value);

    //trigger an event
    emit ProductPurchased(productCount, _product.name, _product.price, msg.sender, true);
  }
}