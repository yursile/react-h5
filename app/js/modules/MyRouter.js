import React from "react"

import { Router, Route, Link, browserHistory ,IndexRoute} from 'react-router'

import About from "./page/about.js"
import Index from "./page/index.js"
import Display from "./display.js"
import Users from "./page/user.js"






var MyRoute = React.createClass({
	
	render:function(){
		return (
			<Router history={browserHistory}>
			    <Route path="/" component={Display}>
			      <IndexRoute component={Index} />
			      <Route path="about" component={About}/>
			      <Route path="home" component={Index}/>
			      <Route path="users" component={Users}>
			  
			      </Route>
			      <Route path="*" component={Index}/>
			    </Route>
			</Router>
		)
	}
});

export default MyRoute