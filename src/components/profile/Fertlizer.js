import React, { Component } from 'react';

import Header from '../common/Header';
import Sidebar from './Sidebar';
import { compose, graphql } from 'react-apollo';
import { meQuery, fertInfo, addFert } from '../../queries/queris';
var moment=require('moment')

class Fertlizer extends Component {

    constructor(props){
        super(props);
        this.state={
            loading: false
        }
    }

    onClick=async (e)=>{
        await this.setState({loading:true})
        await this.props.addFert({
            variables:{
                userid: this.props.match.params.usrid
            }
        })
        await this.props.data.refetch();
        await this.setState({loading:false})
    }

    convertDate(date){
        var dateA = new Date(date);
        dateA=moment(dateA);
        return dateA.fromNow();
    }

    render() {
        return (
            <div>
                <Header />
                <div className="profileCont">
                    <div className="sidebar">
                        <Sidebar userid={this.props.match.params.userid} />
                    </div>
                    <div className="mainCont">
                    
                    
                    <br />
                    <br />
                    {this.state.loading ? <div className="loader"></div> : 
                    <div>
                        {!this.props.meQuery.loading && this.props.meQuery.me.id === this.props.match.params.userid ? 
                        <div>
                            <button className="btn btn-primary btn-lg" onClick={this.onClick.bind(this)}>Add the date of Fertilizing</button>
                            <div>
                                <br />
                                {!this.props.data.loading && this.props.data.fertInfo.length !==0 ?<p>You have fertilized {this.convertDate(this.props.data.fertInfo[0].date)} </p>:''}
                            </div>
                            <h1>Danger of over-fertilization</h1>
                        </div> 
                        : <h2>You are not allowed to access this page</h2>}
                    
                    </div>
                    }
                    </div>
                </div>
            </div>
        )
    }
}

export default compose(
    graphql(addFert, {name: "addFert"}),
    graphql(fertInfo, {
        options: (props) => ({ variables: { userid: props.match.params.userid } })
      },{name: "fertInfo"}),
    graphql(meQuery, {name: "meQuery"})
)(Fertlizer);