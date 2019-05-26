import React, { Component } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {graphql,compose} from 'react-apollo';

import {addQuestion} from '../../queries/queris';
import Header from '../common/Header';

class AskQuestion extends Component {

    constructor(props){
        super(props);
        this.state={
            body: '',
            title: '',
            error: ''
        }
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            body: e
        })
    }

    onClick = (e) => {
        this.props.addQuestion({
            variables:{
                question: this.state.title,
                explanation: this.state.body
            }
        })
        .then((data)=>{
            if(data.data.addQuestion !== null){
                this.setState({
                    ...this.state,
                    error: data.data.addQuestion[0].message
                })
            }
            else{
                this.setState({
                    error: '',
                    body: '',
                    title: ''
                })
                this.props.history.push('/questions')
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
                            placeholder="Enter your problem in short" 
                            onChange={(e)=>{this.setState({title: e.target.value})}} 
                            value={this.state.title} />
                        {this.state.emailError !== '' ? <p className="showError">{this.state.emailError}</p> : ''}
                    </div>
                    <ReactQuill
                        modules = {AskQuestion.modules}
                        formats = {AskQuestion.formats} 
                        value = {this.state.body}
                        placeholder = "Enter detail explanation here"
                        onChange = {this.onChange.bind(this)}
                    />
                    <button onClick={this.onClick.bind(this)} className="btn btn-primary askBtn">Ask</button>
                </div>
            </div>
        )
    }
}

AskQuestion.modules = {
    toolbar: [
        ['link', 'image'],
    ]
}

AskQuestion.formats = [
    'link', 'image'
]

export default compose(
    graphql(addQuestion, {name: "addQuestion"})
)(AskQuestion);
