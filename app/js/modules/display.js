import React from 'react';
import Index from "./page/index.js"
import Nav from "./Nav.js"


var Display = React.createClass({
	

	
	render:function(){

	

		return(
			<div>
				<Nav>

				</Nav>
				{this.props.children}
			</div>	
		)

	}
});

export default Display