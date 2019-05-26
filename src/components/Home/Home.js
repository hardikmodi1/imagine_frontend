import React, { Component } from 'react';
import {graphql,compose} from 'react-apollo';
import {Link} from 'react-router-dom';

import {meQuery} from '../../queries/queris';
import news from '../../images/news.jpg';
import doubts from '../../images/doubts.jpg';
import price from '../../images/price.jpg';
import predict from '../../images/predict.jpg';
import Header from '../common/Header';

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            
        };
    }
    render() {
        return (
            <div>
                <Header />
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100 img-responsive" src={predict} alt="First slide" />
                        <div className="carousel-caption d-none d-md-block caption"> 
                            <h5>Plant disease prediction</h5>
                            <Link to="/predictinfo" className="btn btn-primary">Learn More</Link>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={price} alt="Second slide" />
                        <div className="carousel-caption d-none d-md-block caption"> 
                            <h5>Check the latest prices</h5>
                            <Link to="/predictinfo" className="btn btn-primary">Learn More</Link>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={news} alt="Third slide" /> 
                        <div className="carousel-caption d-none d-md-block caption"> 
                            <h5>NEWS</h5>
                            <Link to="/news" className="btn btn-primary">Check out</Link>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={doubts} alt="Third slide" /> 
                        <div className="carousel-caption d-none d-md-block caption"> 
                            <h5>Questions?</h5>
                            <Link to="/questions" className="btn btn-primary">Explore</Link>
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
            </div>
        )
    }
}

export default compose(
    graphql(meQuery, {name: "meQuery"})
)(Home);