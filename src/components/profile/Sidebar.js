import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {graphql,compose} from 'react-apollo';

import {meQuery} from '../../queries/queris';

class Sidebar extends Component {
    render() {
        return (
            <div>
                {!this.props.meQuery.loading && this.props.meQuery.me!==null && this.props.meQuery.me.id === this.props.userid ? <Link to={`/profile/${this.props.userid}`}>Feed</Link>: ''}
                <br />
                <Link to={`/profile/${this.props.userid}/articles`}>Articles</Link>
                <br />
                <Link to={`/profile/${this.props.userid}/questions`}>Questions</Link>
                <br />
                <Link to={`/profile/${this.props.userid}/shc`}>Soil Health Card</Link>
                <br />
                {!this.props.meQuery.loading && this.props.meQuery.me!==null && this.props.meQuery.me.id === this.props.userid ? <Link to={`/profile/${this.props.userid}/fertilizer`}>Add Fertilizer</Link>: ''}
            </div>
        )
    }
}

export default compose(
    graphql(meQuery, {name: "meQuery"})
)(Sidebar);