import React from "react";

class Nav extends React.Component {
  render() {
    const { account } = this.props;
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <div className="navbar-brand col-sm-3 col-md-2 mr-0">
            Eth Marketplace
          </div>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-non d-sm-none d-sm-block">
              <small className="text-white">
                <span id="account">{account}</span>
              </small>
            </li>
          </ul>
        </nav>
        ;
      </div>
    );
  }
}

export default Nav;
