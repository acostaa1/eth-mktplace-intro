import React, { Component } from "react";
import "./App.css";
import Web3 from "web3";
import Marketplace from "../abis/Marketplace.json";
import Nav from "./Nav"

class App extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      account: "",
      products: [],
      productCount: 0,
      loading: true,
    };
  }

  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        //request account access if needed
        await window.ethereum.enable();
      } catch (error) {
        //user deined account access
        console.log(error);
      }
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log(
        "Non-ether broser detected. You should consider trying MetaMask! "
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    this.setState({ account });

    const networkId = await web3.eth.net.getId();
    const networkData = Marketplace.networks[networkId];
    if (networkData) {
      const abi = Marketplace.abi;
      const address = networkData.address;
      const marketplace = web3.eth.Contract(abi, address);
      console.log(marketplace);
    } else {
      console.log("Marketplace contract not deployed");
    }
  }
  render() {
    const { account } = this.state;
    return (
      <div>
        <Nav account = {account} />

        {/* body */}
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">Hello</div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
