import React, { Component } from 'react'
import {graphql,compose} from 'react-apollo';

import {addBlog} from '../../queries/queris';
import BlogEditor from './BlogEditor';
import Header from '../common/Header';

class Blog extends Component {

    constructor(props){
        super(props);
        this.state={
            title: '',
            error: ''
        }
    }

    submit = (blog) => {
        this.props.addBlog({
            variables:{
                title: this.state.title,
                blog: blog
            }
        })
        .then((data)=>{
            if(data.data.addBlog){
                this.setState({
                    ...this.state,
                    error: data.data.addBlog[0].message
                })
                return false;
            }
            else{
                this.setState({
                    error: '',
                    title: ''
                })
                return true;
                // this.props.history.push('/questions')
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <Header />
                <div className="askCont">
                    {this.state.error === '' ? '' :
                        <div className="alert alert-danger" role="alert">
                            {this.state.error}
                        </div>
                    }
                    <div className="form-group">
                        <input 
                            required
                            type="text" 
                            className={this.state.error === '' ? "form-control" : "form-control error"} 
                            name="title" 
                            placeholder="Title" 
                            onChange={(e)=>{this.setState({title: e.target.value})}} 
                            value={this.state.title} />
                        {this.state.emailError !== '' ? <p className="showError">{this.state.emailError}</p> : ''}
                    </div>
                    <BlogEditor submit = {this.submit.bind(this)} />
                </div>
            </div>
        )
    }
}

export default compose(
    graphql(addBlog, {name: "addBlog"})
)(Blog);
