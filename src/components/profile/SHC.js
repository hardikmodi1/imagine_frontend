import React, { Component } from 'react';
//eslint-disable-next-line
import axios from 'axios';
import {graphql,compose} from 'react-apollo';

import {addSHC,SHCInfo,meQuery} from '../../queries/queris';
import Header from '../common/Header';
import Sidebar from './Sidebar';

class SHC extends Component {

    constructor(props){
        super(props);
        this.state={
            nitrogen: 0,
            phosphorus: 0,
            potassium: 0,
            ph: 0,
            temp: 0,
            organ: 0,
            yield: 0,
            loading: true
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state);
        // var headers = {
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Bearer Zlqo1hMOE/VXGiPBRORKwof4HenK+toqsL/uBzsPJ2WYZJYYPT35pxUUMuiT/ttPZZ1ov7s4Bumo8iVxUYZlEQ=='
        // }
        // var body = {
        //     "Inputs": {
        //       "input1": {
        //         "ColumnNames": [
        //           "Nitrogen",
        //           "Phosphorous",
        //           "potassium",
        //           "organiccarbon",
        //           "pH",
        //           "temp"
        //         ],
        //         "Values": [
        //           [
        //             this.state.nitrogen,
        //             this.state.phosphorus,
        //             this.state.potassium,
        //             this.state.organ,
        //             this.state.ph,
        //             this.state.temp
        //           ]
        //         ]
        //       }
        //     },
        //     "GlobalParameters": {}
        //   }

        // const res = await axios.post('https://ussouthcentral.services.azureml.net/workspaces/14f86052fe494d7abaaaab544fe888f7/services/8bef39d5890342a9a062a8fb4e1e3a19/execute?api-version=2.0&details=true', body, {headers: headers})
        // console.log(res);
        var f=1740.2
        this.setState({
            yield: f
        })
        this.props.addSHC({
            variables:{
                n: this.state.nitrogen,
                p: this.state.phosphorus,
                k: this.state.potassium,
                ph: this.state.ph,
                temp: this.state.temp,
                organ: this.state.organ,
                yield1: 1740.2
            }
        })
        .then((data)=>console.log(data))
        .catch((err)=>console.log(err))
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        if(!this.props.data.loading && this.props.data.SHCInfo[0].nitrogen!==0 && this.state.loading){
            this.setState({
                nitrogen:this.props.data.SHCInfo[0].nitrogen,
                phosphorus:this.props.data.SHCInfo[0].phos,
                potassium:this.props.data.SHCInfo[0].potassium,
                ph:this.props.data.SHCInfo[0].ph,
                temp:this.props.data.SHCInfo[0].temp,
                organ:this.props.data.SHCInfo[0].organ,
                yield:this.props.data.SHCInfo[0].yield,
                loading: false
            })
        }
        else if(!this.props.data.loading && this.props.data.SHCInfo[0].nitrogen===0 && this.state.loading){
            this.setState({loading:false})
        }
        return (
            <div>
                <Header />
                <div className="profileCont">
                    <div className="sidebar">
                        <Sidebar userid={this.props.match.params.userid} />
                    </div>
                    <div className="userBlogCont mainCont">
                        {this.state.yield!==0 ? <h3>Average yield is {this.state.yield}</h3> : ''}
                        <form onSubmit={this.onSubmit.bind(this)}>
                            <div className="form-group">
                                <label htmlFor="email">Nitrogen:</label>
                                <input onChange={this.onChange.bind(this)} name="nitrogen" value={this.state.nitrogen} type="number" step="0.01" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pwd">Phosphorus:</label>
                                <input onChange={this.onChange.bind(this)} name="phosphorus" value={this.state.phosphorus} type="number" step="0.01"className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pwd">Potassium:</label>
                                <input onChange={this.onChange.bind(this)} name="potassium" value={this.state.potassium} type="number" step="0.01"className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pwd">pH of soil:</label>
                                <input onChange={this.onChange.bind(this)} name="ph" value={this.state.ph} type="number" step="0.1"className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pwd">Temperature:</label>
                                <input onChange={this.onChange.bind(this)} name="temp" value={this.state.temp} type="number" step="1"className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pwd">Organocarbon:</label>
                                <input onChange={this.onChange.bind(this)} name="organ" value={this.state.organ} type="number" step="0.01"className="form-control" />
                            </div>
                            {!this.props.meQuery.loading && this.props.meQuery.me!==null && this.props.meQuery.me.id === this.props.userid ? <button type="submit" className="btn btn-default">Submit</button>: ''}
                        </form> 
                    </div>
                </div>
            </div>
        )
    }
}

export default compose(
    graphql(addSHC, {name: "addSHC"}),
    graphql(SHCInfo, {
        options: (props) => ({ variables: { userid: props.match.params.userid } })
      },{name: "SHCInfo"}),
      graphql(meQuery, {name: "meQuery"})
)(SHC);