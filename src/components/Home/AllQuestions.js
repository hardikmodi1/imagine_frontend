import React, { Component } from 'react';
import {graphql,compose} from 'react-apollo';
import {Link} from 'react-router-dom';

import {AllQuestionsQuery, searchQuestion} from '../../queries/queris';
import Header from '../common/Header';

const moment=require('moment');


class AllQuestions extends Component {
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
            const data = await this.props.searchQuestion({
                variables:{
                    searchText: e.target.value
                }
            })
            this.setState({
                ...this.state,
                search: data.data.searchQuestion
            })
            // .then(()=>console.log(this.state.search))
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
                {this.props.AllQuestionsQuery.loading ? <div className="loader"></div>:
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
                                    <a key={this.state.search[i]._id} className="list-group-item" href={`/question/${this.state.search[i]._id}`}>{this.state.search[i].Question}</a>    
                                )
                            })}
                            {this.state.search.length !== 0 ? <a className="list-group-item" href='/ask'>+ Ask Question</a> : '' }
                        </div>
                    </div>
                    <Link className="btn btn-danger addQuestion" to="/ask">+ Add Question</Link>
                    {this.props.AllQuestionsQuery.loading ? '' : 
                        <div>
                            {this.props.AllQuestionsQuery.questions.map((question,i)=>{
                                
                                return (
                                    <div className="card questionCont" key={question._id}>
                                        <a className="questionLink" href={`/question/${question._id}`}><h3 className="card-body question">{question.Question}</h3></a>
                                        <p className="owner">{this.convertDate(question.date)}</p>
                                        <p className="owner">{question.user.email}</p>
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
    graphql(AllQuestionsQuery, {name: "AllQuestionsQuery"}),
    graphql(searchQuestion, {name: "searchQuestion"})
)(AllQuestions);