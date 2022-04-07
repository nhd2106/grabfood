import React, { Component } from "react";
class Header extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-light bg-light mb-4">
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          />
          <div
            className="collapse navbar-collapse justify-content-end"
            id="collapsibleNavId"
          >
            <ul className="navbar-nav mt-2 mt-lg-0">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home</a>
              </li>
              <li className="nav-item">
                {/* <a className="nav-link" href="#"></a>               */}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default Header;
