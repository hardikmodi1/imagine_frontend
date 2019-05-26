import React, { Component } from 'react';
import {graphql,compose} from 'react-apollo';
import {Link} from 'react-router-dom';

import {addUserMutation} from '../../queries/queris';
import twitter from '../../images/twitter.jpg';

class Signup extends Component {
    constructor(props){
        super(props);
        this.state={
            email: '',
            password: '',
            emailError: '',
            passwordError: ''
        };
    }

    

    submit=(e)=>{
        e.preventDefault();
        this.props.addUserMutation({
            variables:{
                email: this.state.email,
                password: this.state.password
            }
        })
        .then((data)=>{
            if(data.data.register ){
                if(data.data.register[0].path === "email"){
                    this.setState({
                        ...this.state,
                        emailError: data.data.register[0].message
                    })
                }
                else{
                    this.setState({
                        ...this.state,
                        emailError: ''
                    })
                }
                if(data.data.register[0].path === "password"){
                    this.setState({
                        ...this.state,
                        passwordError: data.data.register[0].message
                    })
                }
                else{
                    this.setState({
                        ...this.state,
                        passwordError: ''
                    })
                }
            }
            else{
                this.props.history.push('/login')
            }
        })
    }

    onChange=(e)=>{
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div className="container">
                <h1 className="form-heading">login Form</h1>
                <div className="login-form">
                    <div className="main-div">
                        <div className="panel">
                            <h1>Signup</h1>
                        </div>
                        <form onSubmit={this.submit.bind(this)}>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    className={this.state.emailError === '' ? "form-control" : "form-control error"} 
                                    name="email" 
                                    placeholder="Email Address" 
                                    onChange={this.onChange.bind(this)} 
                                    value={this.state.email} />
                                {this.state.emailError !== '' ? <p className="showError">{this.state.emailError}</p> : ''}
                            </div>

                            <div className="form-group">
                                <input 
                                    type="password" 
                                    className={this.state.passwordError === '' ? "form-control" : "form-control error"}
                                    name="password" 
                                    placeholder="Password"
                                    onChange={this.onChange.bind(this)} 
                                    value={this.state.password} />
                                {this.state.passwordError !== '' ? <p className="showError">{this.state.passwordError}</p> : ''}
                            </div>
                            <button type="submit" className="btn btn-primary">Signup</button>
                            <p>Already have an account? <Link to="/login">Login</Link></p>
                            <hr />
                            <p> OR </p>
                            <a href="http://localhost:4000/auth/twitter"><img className="img-responsive btn" src={twitter} alt="twitter login" /></a>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default compose(
    graphql(addUserMutation, {name: "addUserMutation"})
)(Signup);