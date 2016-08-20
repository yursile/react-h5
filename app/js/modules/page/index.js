import React from "react"
import { Image,Grid,Row,Col } from 'react-bootstrap'
import {Link } from 'react-router'



var App = React.createClass({
	render:function(){
		return (

	        <main id="page-wrap">
	        	<h1>krystal</h1>
	         	<p>There are so many things i want say</p>
	         	<p>and i will always love you</p>


		        <Grid>
		            <Row>
		              <Col xs={12} md={4}>
		                <Image src="./img/krystal.jpg" circle/>
		              </Col>
		              <Col xs={12} md={4}>
		                <Image src="./img/krystal.jpg" circle/>
		              </Col>
		              <Col xs={12} md={4}>
		                <Image src="./img/krystal.jpg" circle/>
		              </Col>
		            </Row>
		        </Grid>


		       

	     	 	{this.props.children}
	        
	        </main>
		)
	}
})

export {App as default}