import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Signup from './components/register/Signup';
import Login from './components/login/Login';
import Thankyou from './components/Thankyou';
import Home from './components/Home/Home';
import Predictinfo from './components/Home/Predictinfo';
import Predict from './components/Home/Predict';
import News from './components/Home/News';
import Price from './components/Home/Price';
import AllQuestions from './components/Home/AllQuestions';
import AskQuestion from './components/Home/AskQuestion';
import QuestionDetail from './components/Home/QuestionDetail';
import Blog from './components/blog/Blog';
import Allblogs from './components/blog/AllBlogs';
import SingleBlog from './components/blog/SingleBlog';
import Logout from './components/common/Logout';
import Profile from './components/profile/Profile';
import Userblog from './components/profile/Userblog';
import Userquestion from './components/profile/Userquestion';
import SHC from './components/profile/SHC';
import Fertlizer from './components/profile/Fertlizer';
import AuthRoute from './components/common/AuthRoute';
import GuestRoute from './components/common/GuestRoute';

class App extends Component {
  	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Switch>
						<Route exact path='/' component={Home} />
						<GuestRoute exact path='/signup' component={Signup} />
						<GuestRoute exact path='/login' component={Login} />
						<Route exact path='/thankyou' component={Thankyou} />
						<Route exact path='/predictinfo' component={Predictinfo} />
						<Route exact path='/predict' component={Predict} />
						<Route exact path='/news' component={News} />
						<Route exact path='/price/:page' component={Price} />
						<Route exact path='/questions' component={AllQuestions} />
						<Route exact path='/ask' component={AskQuestion} />
						<Route exact path='/question/:questionid' component={QuestionDetail} />
						<Route exact path='/blog/:blogid' component={SingleBlog} />
						<Route exact path='/writeblog' component={Blog} />
						<Route exact path='/blogs' component={Allblogs} />
						<Route exact path='/logout' component={Logout} />
						<AuthRoute exact path='/profile/:userid' component={Profile} />
						<Route exact path='/profile/:userid/articles' component={Userblog} />
						<Route exact path='/profile/:userid/questions' component={Userquestion} />
						<Route exact path='/profile/:userid/shc' component={SHC} />
						<Route exact path='/profile/:userid/fertilizer' component={Fertlizer} />
					</Switch>
				</div>
			</BrowserRouter>
		);
 	}
}

export default App;
