import React, { Component } from 'react';
import {graphql,compose} from 'react-apollo';
import {Route,Redirect} from 'react-router';

import { meQuery } from '../../queries/queris';



class GuestRoute extends Component {

    renderRoute=(routeProps)=>{
        
        const {component}=this.props;
        const data=this.props.meQuery;
		if(!data || data.loading){
			// loading screen
			return null;
		}

		if(data.me){
			// User logged in
			return <Redirect to={{pathname: "/"}} />;
		}
		const Component=component;
		return <Component {...routeProps} />
    }

    render(){
		const {data: _, component: __, ...rest}=this.props;
		return(
			<Route {...rest} render={this.renderRoute} />
		);
    }
}

export default compose(
    graphql(meQuery, {name: "meQuery"})
)(GuestRoute);