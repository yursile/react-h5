import "babel-polyfill";

import React from 'react';
import ReactDOM from 'react-dom';
import BurgerMenu from 'react-burger-menu';
import classNames from 'classnames';
import MenuWrap from './modules/MenuWrap.js';
import MyRoute from "./modules/MyRouter.js";


let Demo = React.createClass({


  getItems() {
    let items;
    items = [
      <a key="0" href=""><i className="fa fa-fw fa-star-o"></i><span>Favorites</span></a>,
      <a key="1" href=""><i className="fa fa-fw fa-bell-o"></i><span>Alerts</span></a>,
      <a key="2" href=""><i className="fa fa-fw fa-envelope-o"></i><span>Messages</span></a>,
      <a key="3" href=""><i className="fa fa-fw fa-comment-o"></i><span>Comments</span></a>,
      <a key="4" href=""><i className="fa fa-fw fa-bar-chart-o"></i><span>Analytics</span></a>,
      <a key="5" href=""><i className="fa fa-fw fa-newspaper-o"></i><span>Reading List</span></a>
    ];

    return items;
  },

  getMenu() {
    const Menu = BurgerMenu[this.state.currentMenu];
    const items = this.getItems();
    let jsx;

    if (this.state.side === 'right') {
      jsx = (
        <MenuWrap wait={20} side={this.state.side}>
          <Menu id={this.state.currentMenu} pageWrapId={"page-wrap"} outerContainerId={"outer-container"} right>
            {items}
          </Menu>
        </MenuWrap>
      );
    } else {
      jsx = (
        <MenuWrap wait={20}>
          <Menu id={this.state.currentMenu} pageWrapId={"page-wrap"} outerContainerId={"outer-container"}>
            {items}
          </Menu>
        </MenuWrap>
      );
    }

    return jsx;
  },

  getInitialState() {
    // let o = {
    //   name:"d",
    //   age:"3",
    //   sex:"1"
    // }

    // let {name,...l} = o;
    // console.log(l)



    return {
      currentMenu: 'scaleDown',
      side: 'left'
    };
  },



  render() {

    return (

      <div id="outer-container" style={{height: '100%'}}>
        {this.getMenu()}
         <MyRoute />
        


      </div>
    );
  }
});







ReactDOM.render(<Demo />, document.getElementById('all'));












