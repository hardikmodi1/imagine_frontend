import React, { Component } from 'react';
import {graphql, compose} from 'react-apollo';
import {Link} from 'react-router-dom';

import {loginUserMutation} from '../../queries/queris';
import twitter from '../../images/twitter.jpg';

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            email: '',
            password: '',
            emailError: '',
            passwordError: ''
        };
    }
    
    
    
    submit=async(e)=>{
        e.preventDefault();
        const data = await this.props.loginUserMutation({
            variables:{
                email: this.state.email,
                password: this.state.password
            }
        })
        if(data.data.login !== null ){
            if(data.data.login[0].path === "email"){
                this.setState({
                    ...this.state,
                    emailError: data.data.login[0].message
                })
            }
            else{
                this.setState({
                    ...this.state,
                    emailError: ''
                })
            }
            if(data.data.login[0].path === "password"){
                this.setState({
                    ...this.state,
                    passwordError: data.data.login[0].message
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
            // await this.props.client.resetStore();
            // if(this.props.location.state !== undefined){
            //     this.props.history.push(this.props.location.state.next)
            //     console.log(this.props.location.state.next)
            // }
            // else{
            //     this.props.history.push('/')
            // }
            this.props.history.push('/')
        }
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
                            <h1>Login</h1>
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
                            <button type="submit" className="btn btn-primary">Login</button>
                            <p>Don't have an account? <Link to="/login">Signup</Link></p>
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
    graphql(loginUserMutation, {name: "loginUserMutation"})
)(Login);