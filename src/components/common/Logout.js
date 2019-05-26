import React, { Component } from 'react';
import {graphql,compose} from 'react-apollo';
import {logout} from '../../queries/queris';



class Logout extends Component {

    async componentDidMount(){
        await this.props.logout();
        this.props.history.push('/login');
    }

    render() {
        return (
            <div>
                Logging out...
            </div>
        )
    }
}

export default compose(
    graphql(logout, {name: "logout"})
)(Logout);