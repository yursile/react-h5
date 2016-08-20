import React from 'react';
import {Nav,NavItem,Navbar,Row,Col} from "react-bootstrap"
import {Link } from 'react-router'
import classNames from 'classnames';


var MyNav = React.createClass({
	render:function(){

		return(
			<nav className="navbar navbar-default navbar-fixed-bottom">
				<ul className="nav nav-pills">
					<li role="presentation" onClick={this.handleSelect.bind(this,1)} className={classNames({"active":this.state.activeKey==1})} style={{"textAlign":"center","width":"30%"}}>
						<Link to="/about">about</Link>
					</li>
					<li role="presentation" onClick={this.handleSelect.bind(this,2)} className={classNames({"active":this.state.activeKey==2})} style={{"textAlign":"center","width":"30%"}}>
						<Link to="/users">users</Link>
					</li>
					<li role="presentation" onClick={this.handleSelect.bind(this,3)} className={classNames({"active":this.state.activeKey==3})} style={{"textAlign":"center","width":"30%"}}>
						<Link to="/">home</Link>
					</li>
				</ul>
            </nav>
		)
		

	},
	handleSelect:function(selectedKey) {
		
		this.setState({
			activeKey:selectedKey
		});
	},
	getInitialState:function(){
		return {activeKey:1}
	}
});



export default MyNav 