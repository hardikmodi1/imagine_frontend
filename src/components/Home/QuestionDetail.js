import React, { Component } from 'react';
import {graphql,compose} from 'react-apollo';
import renderHTML from 'react-render-html';
import {gql} from 'apollo-boost';

import {searchQuestionWithAnswer, addAnswer} from '../../queries/queris';
import Editor from './Editor';
const moment=require('moment');

const newAnswerSubscription = gql`
    subscription newAnswer($questionid: String!){
        newAnswer(questionid: $questionid){
            Answer
            _id
            date
            user{
                email
            }
        }
    }
`;

class QuestionDetail extends Component {

    constructor(props){
        super(props);
        this.state = {
            answers: undefined,
            questionid: this.props.match.params.questionid,
            showEditor: false,
        }
    }

    unsubscribe: () => void;

    componentWillMount(){
        if(!this.unsubscribe){
            this.unsubscribe=this.props.data.subscribeToMore({
                document: newAnswerSubscription,
                variables: {
                    questionid: this.props.match.params.questionid
                },
                updateQuery: (prev, {subscriptionData})=>{
                    // if (!subscriptionData.data) {
                    //     return prev;
                    // }
                
                    // const newAnswer = subscriptionData.data.newAnswer;
                    // // don't double add the message
                    // if (!prev.channel.messages.find((msg) => msg.id === newMessage.id)) {
                    //     return Object.assign({}, prev, {
                    //         channel: Object.assign({}, prev.channel, {
                    //             messages: [...prev.channel.messages, newMessage],
                    //         })
                    //     });
                    // } 
                    // else{
                    //     return prev;
                    // }
                    var base = {
                        ...prev.searchQuestionWithAnswer,
                        answers:[
                            subscriptionData.data.newAnswer,
                            ...prev.searchQuestionWithAnswer.answers
                        ]
                    }
                    Object.assign(this.props.data.searchQuestionWithAnswer,base);
                    return prev;
                    
                }
            })
        }
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    onClick = () => {
        this.setState({
            showEditor: !this.state.showEditor
        })
    }

    submit = (body) => {
        var stripedHtml = body.replace(/<[^>]+>/g, '');
        stripedHtml=stripedHtml.replace(/\s\s+/g, ' ');
        if(stripedHtml !== '' && stripedHtml !== ' '){
            this.props.addAnswer({
                variables:{
                    questionid: this.state.questionid,
                    answer: body
                }
            })
            .then((data)=>{
                this.setState({
                    showEditor: false
                })
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }

    convertDate(date){
        var dateA = new Date(date);
        dateA=moment(dateA);
        return dateA.fromNow();
    }

    render() {
        return (
            <div className="detailCont">
            {this.props.data.loading ? 'Loading' : 
            <div>
                <div className="card">
                    <div className="card-body queCon">
                        <h2 className="question">{this.props.data.searchQuestionWithAnswer.Question}</h2>
                        <h6>{this.props.data.searchQuestionWithAnswer.Explanation ? renderHTML(this.props.data.searchQuestionWithAnswer.Explanation) : '' }</h6>
                        <h6 className="ansCount"><span className="countAns">{this.props.data.searchQuestionWithAnswer.answers.length}</span>  Answer</h6>
                        <p className="ansCount ownerEmail">-By {this.props.data.searchQuestionWithAnswer.user.email}</p>
                        <p onClick={this.onClick.bind(this)} className="answerWriteLink"><i className="fas fa-edit answerWriteLink" aria-hidden="true">Answer</i></p>
                        {this.state.showEditor===true ? <Editor submit={this.submit.bind(this)} /> : ''}
                    </div>
                </div>
                
                
                    {this.props.data.searchQuestionWithAnswer.answers.map((answer,i)=>{
                        return (
                            <div className="card ansBody" key={answer._id}>
                                <div className="card-body">
                                    {renderHTML(answer.Answer)}
                                    <p className="ansCount ownerEmail">-By {this.props.data.searchQuestionWithAnswer.user.email}</p>
                                    <p className="ansCount ownerEmail">{this.convertDate(answer.date)}</p>
                                </div>
                            </div>  
                        )
                    })}
                </div>
            }
                
            </div>
        )
    }
}

export default compose(
    graphql(searchQuestionWithAnswer, {
        options: (props) => ({ variables: { questionid: props.match.params.questionid } })
      },{name: "searchQuestionWithAnswer"}),
    graphql(addAnswer, {name: "addAnswer"})
)(QuestionDetail);