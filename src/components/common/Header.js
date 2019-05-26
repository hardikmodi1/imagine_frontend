import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {graphql,compose} from 'react-apollo';
import {meQuery} from '../../queries/queris';

var moment = require('moment');

class Header extends Component {

    constructor(props){
        super(props);
        this.state={
            show:false
        }
    }

    convertDate(date){
        var dateA = new Date(date);
        dateA=moment(dateA);
        return dateA.fromNow();
    }

    componentDidMount(){
        this.props.meQuery.refetch();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <Link to="/" className="navbar-brand" href="#">Farmer Mitra</Link>
                    <ul className="navbar-nav navbar-right">
                        {this.props.meQuery.me ? 
                            <li className="nav-item float-md-right">
                                <Link className="nav-link" to={`/profile/${this.props.meQuery.me.id}`}>Profile <span className="sr-only">(current)</span></Link>
                            </li>
                        :
                            ''
                        }   
                        <li className="nav-item">
                            <Link className="nav-link" to="/news">News <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/predictinfo">Predict <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/price/1">Price <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/questions">Questions <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/blogs">Articles <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link navNot" onClick={(e)=>{this.setState({show:!this.state.show})}} to="/blogs">Notifications <span className="sr-only">(current)</span></div>
                            {this.state.show ? 
                            <div className="notCont">
                                <p className="notTitle">Notifications</p>
                                <ul className="list-group">
                                    {this.props.meQuery.loading ? <div class="loader"></div>:
                                    this.props.meQuery.me!==null && this.props.meQuery.me.nots.map((not,i)=>{
                                        return (
                                            <li key={not._id} className="list-group-item">{not.notification}<br /><span className="notTIme">{this.convertDate(not.date)}</span></li>
                                        )
                                    })
                                    }    
                                </ul>
                            </div>: ''}
                        </li>
                        {this.props.meQuery.me ? 
                            <li className="nav-item float-md-right">
                                <a className="nav-link btn btn-danger" href="/logout">Logout <span className="sr-only">(current)</span></a>
                            </li>
                        :
                            ''
                        }
                    </ul>
                </div>
            </nav>
        )
    }
}

export default compose(
    graphql(meQuery, {name: "meQuery"})
)(Header);