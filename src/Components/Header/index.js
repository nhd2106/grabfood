import React, { Component } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

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
              {/* <li className="nav-item active"> */}
                {/* <a className="nav-link" href="#">Home</a> */}
                
                <IconButton onClick={() => this.props.clickCart()} aria-label="ShoppingCartOutlinedIcon" color="primary">
                  <Badge color="primary" badgeContent={this.props.badgeContent}>
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                </IconButton>
                
                <IconButton  onClick = {() => this.props.clickAddFood()} aria-label="AddIcon" color="primary">
                    <AddIcon/>
                </IconButton>

                

              {/* </li> */}
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
