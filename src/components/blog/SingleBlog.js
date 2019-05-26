import React, { Component } from 'react';
import {graphql,compose} from 'react-apollo';
import renderHTML from 'react-render-html';

import {singleBlog} from '../../queries/queris';
import Header from '../common/Header';

const moment=require('moment');

class SingleBlog extends Component {

    constructor(props){
        super(props);
        this.state = {
            blogid: this.props.match.params.blogid
        }
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
                <div className="detailCont">
                    {this.props.data.loading ? 'Loading' : 
                        <div>
                            <div className="card">
                                <div className="card-body queCon">
                                    <h1 className="question blogTitle">{this.props.data.singleBlog.Title}</h1>
                                    <hr />
                                    <p className="ansCount ownerEmail">-By {this.props.data.singleBlog.user.email}</p>
                                    <br />
                                    {renderHTML(this.props.data.singleBlog.Blog)}
                                </div>
                            </div>
                        
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default compose(
    graphql(singleBlog, {
        options: (props) => ({ variables: { blogid: props.match.params.blogid } })
      },{name: "singleBlog"})
)(SingleBlog);