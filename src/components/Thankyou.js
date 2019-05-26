import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Thankyou extends Component {
  render() {
    return (
        <main role="main">

        <div class="jumbotron">
          <div class="container" style={{textAlign: "center"}}>
            <h1 class="display-3">Thank You!</h1>
            <p>Please check your email for further instructions on how to complete your account setup.</p>
            <hr />
            Having trouble ? Contact US
            <br />
            <br />
            <p><Link class="btn btn-primary btn-lg" to="/" role="button">Continue to home page</Link></p>
          </div>
        </div>
      </main>
    )
  }
}
