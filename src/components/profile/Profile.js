import React, { Component } from 'react';
import {graphql,compose} from 'react-apollo';
import renderHTML from 'react-render-html';
import {Link} from 'react-router-dom';

import Sidebar from './Sidebar';
import Header from '../common/Header';
import {blogByUser, feedBlog} from '../../queries/queris';
const moment=require('moment');

class Profile extends Component {

    convertDate(date){
        var dateA = new Date(date);
        dateA=moment(dateA);
        return dateA.fromNow();
    }

    removeimg(blog){
        // eslint-disable-next-line
        var pattern = /<img className='blogImg' src\s*=\s*\\*\"(.+?)\\*"\s*>/g;
        blog = blog.replace(pattern,"");
        return blog.substring(0,600);
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
                    {this.props.data.loading ? <div className="loader"></div>:
                <div className="userBlogCont">
                    <Link className="btn btn-danger addQuestion" to="/writeblog">Write New Article</Link>
                    {this.props.data.loading ? <div className="loader"></div> : 
                        <div>
                            {this.props.data.searchBlog.map((blog,i)=>{
                                
                                return (
                                    <div className="card questionCont" key={blog._id} style={{width: "100%"}}>
    
                                        <div className="card-body">
                                        <a className="questionLink" href={`/blog/${blog._id}`}><h3 className="card-title question">{blog.Title}</h3></a>
                                            <p>{blog.user.email}</p>
                                            <p>{this.convertDate(blog.date)}</p>
                                            <div className="card-text grid123">
                                                <div className="card-text topClass">{renderHTML(this.removeimg(blog.Blog))}...</div>
                                                <div className="bottomClass">
                                                    {blog.prefferedImage ? renderHTML(blog.prefferedImage) : ''}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
                }
                    </div>
                </div>
            </div>
        )
    }
}

export default compose(
    graphql(blogByUser, {
        options: (props) => ({ variables: { userid: props.match.params.userid } })
      },{name: "blogByUser"}),
      graphql(feedBlog, {
        options: (props) => ({ variables: { searchText: "kharif" } })
      },{name: "feedBlog"})
)(Profile);