import React, { Component } from 'react';
import {graphql,compose} from 'react-apollo';
import {AllBlogs, searchBlog} from '../../queries/queris';
import renderHTML from 'react-render-html';
import {Link} from 'react-router-dom';

import Header from '../common/Header';

const moment=require('moment');


class Allblogs extends Component {
    constructor(props){
        super(props);
        this.state={
            searchText: '',
            search: []
        }
    }

    onChange=async(e)=>{
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
        if(e.target.value !== ""){
            const data = await this.props.searchBlog({
                variables:{
                    searchText: e.target.value
                }
            })
            this.setState({
                ...this.state,
                search: data.data.searchBlog
            })
            // .then(()=>console.log(this.state.search))
        }

        
    }

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
                {this.props.AllBlogs.loading ? <div className="loader"></div>:
                <div className="allquestCont">
                    <div>
                        <div className="input-group md-form form-sm form-1 pl-0">
                            <div className="input-group-prepend">
                                <span className="input-group-text lighten-3" id="basic-text1"><i className="fa fa-search"
                                aria-hidden="true"></i></span>
                            </div>
                            <input name="searchText" value={this.state.searchText} onChange={this.onChange.bind(this)} className="form-control my-0 py-1" type="text" placeholder="Search" aria-label="Search" />
                        </div>
                        <div className="list-group searchResult">
                            {this.state.search.map((el,i)=>{
                                return (
                                    <a key={this.state.search[i]._id} className="list-group-item" href={`/blog/${this.state.search[i]._id}`}>{this.state.search[i].Title}</a>    
                                )
                            })}
                        </div>
                    </div>
                    <Link className="btn btn-danger addQuestion" to="/writeblog">Write New Article</Link>
                    {this.props.AllBlogs.loading ? '' : 
                        <div>
                            {this.props.AllBlogs.blogs.map((blog,i)=>{
                                
                                return (
                                    <div className="card questionCont" key={blog._id} style={{width: "100%"}}>
    
                                        <div className="card-body">
                                        <a className="questionLink" href={`/blog/${blog._id}`}><h3 className="card-title question">{blog.Title}</h3></a>
                                            <p>{this.convertDate(blog.date)}</p>
                                            <p>{blog.user.email}</p>
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
        )
    }
}

export default compose(
    graphql(AllBlogs, {name: "AllBlogs"}),
    graphql(searchBlog, {name: "searchBlog"})
)(Allblogs);