import React, { Component } from 'react';
import {graphql,compose} from 'react-apollo';
import {Link} from 'react-router-dom';

import {questionByUser} from '../../queries/queris';
import Header from '../common/Header';
import Sidebar from './Sidebar';

const moment=require('moment');


class Userquestion extends Component {

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
        console.log(this.props)
        return (
            <div>
                <Header />
                <div className="profileCont">
                    <div className="sidebar">
                        <Sidebar userid={this.props.match.params.userid} />
                    </div>
                {this.props.data.loading ? <div className="loader"></div>:
                <div className="userBlogCont mainCont">
                    <Link className="btn btn-danger addQuestion" to="/ask">+ Add Question</Link>
                    {this.props.data.loading ? '' : 
                        <div>
                            {this.props.data.questionByUser.map((question,i)=>{
                                
                                return (
                                    <div className="card questionCont" key={question._id}>
                                        <a className="questionLink" href={`/question/${question._id}`}><h3 className="card-body question">{question.Question}</h3></a>
                                        <p className="owner">{this.convertDate(question.date)}</p>
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
                }
                </div>
            </div>
        )
    }
}

export default compose(
    graphql(questionByUser, {
        options: (props) => ({ variables: { userid: props.match.params.userid } })
      },{name: "questionByUser"})
)(Userquestion);