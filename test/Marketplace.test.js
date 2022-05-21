import { assert } from "chai";
require("chai")
  .use(require("chai-as-promised"))
  .should();

const Marketplace = artifacts.require("./Marketplace.sol");

contract("Marketplace", ([deployer, seller, buyer]) => {
  let marketplace;

  // function calls from the blockcahin are asynchronous
  before(async () => {
    marketplace = await Marketplace.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = await marketplace.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("has a name", async () => {
      const name = await marketplace.name();
      assert.equal(name, "first eth marketplace");
    });
  });

  describe("products", async () => {
    let result, productCount;

    before(async () => {
      result = await marketplace.createProduct(
        "iPhone 13",
        web3.utils.toWei("1", "ether"),
        { from: seller }
      );
      productCount = await marketplace.productCount();
    });

    it("creates product", async () => {
      //successfully creates
      assert.equal(productCount, 1);
      const event = result.logs[0].args;
      assert.equal(
        event.id.toNumber(),
        productCount.toNumber(),
        "id is correct"
      );
      assert.equal(event.name, "iPhone 13", "name is correct");
      assert.equal(event.price, "1000000000000000000", "price is correct");
      assert.equal(event.owner, seller, "owner is correct");
      assert.equal(event.purchased, false, "purchased is correct");

      //fails to create product
      // product must have a name
      await marketplace.createProduct("", web3.utils.toWei("1", "ether"), {
        from: seller,
      }).should.be.rejected;

      // product must have a price
      await marketplace.createProduct("iPhone 13", "", {
        from: seller,
      }).should.be.rejected;

      
    });
  });
});
