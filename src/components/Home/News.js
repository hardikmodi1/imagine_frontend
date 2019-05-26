import React, { Component } from 'react';
import {graphql,compose} from 'react-apollo';

import {newsQuery} from '../../queries/queris';
import Header from '../common/Header';

class News extends Component {
    constructor(props){
        super(props);
        this.state={
            thumbnail: [],
            link: [],
            heading: [],
            para: []
        }
    }

    // componentDidMount(){
    //     this.props.newsQuery()
    //     .then((data)=>{
    //         this.setState({
    //             ...this.state,
    //             thumbnail: data.data.news[0].thumbnail,
    //             link: data.data.news[0].link,
    //             heading: data.data.news[0].heading,
    //             para: data.data.news[0].para
    //         })
    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //     })
    // }

    render() {
        return (
            <div>
                <Header />
                <h1 className="headIm">Breaking NEWS</h1>
                {this.props.newsQuery.loading ? <div className="loader"></div> : 
                    this.props.newsQuery.news[0].link.map((ln,i)=>{
                        return(
                            <div key={i} className="newsCont">
                                <div className="newsim">
                                    {this.props.newsQuery.news[0].thumbnail[i]==="null" ? '': <img src={this.props.newsQuery.news[0].thumbnail[i]} alt={this.props.newsQuery.news[0].thumbnail[i]} />}
                                </div>
                                <div className="newslink">
                                    <a className="paraa" href={this.props.newsQuery.news[0].link[i]} ><h3>{this.props.newsQuery.news[0].heading[i]}</h3></a>
                                    <p className="parap">{this.props.newsQuery.news[0].para[i]}</p>
                                </div>
                                <hr />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default compose(
    graphql(newsQuery, {name: "newsQuery"})
)(News);