import React, { Component } from 'react'
import axios from 'axios';

import Header from '../common/Header';

export default class Price extends Component {

    constructor(props){
        super(props);
        this.state={
            records: [],
            loading: true,
            page: parseInt(this.props.match.params.page)
        }
    }

    async componentDidMount(){
        console.log(this.state.page);
        const  url='https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&offset='+(this.state.page-1)+'&limit=10'
        const response = await axios.get(url);
        this.setState({
            ...this.state,
            records: response.data.records,
            loading:false
        })
    }

    render() {
        return (
            <div>
                <Header />
                {this.state.loading ? <div className="loader"></div> :
                <div>
                    <div className="btnDiv">
                        {this.state.page === 0 ? '' : <a className="btn btn-primary justify-content-md-center priceLink btn1" href={`/price/${this.state.page-1}`}>Previous</a> }
                        <a className="btn btn-primary justify-content-md-center priceLink btn2" href={`/price/${this.state.page+1}`}>Next</a>
                    </div>
                    <div className="row justify-content-md-center">
                        {this.state.records.map((i,ind)=>{
                            return (
                            <div key={ind} className="col-4 price" style={{marginLeft:"3px"}}>
                                <h3>{i.district}, {i.state}</h3>
                                <div className="pricediv">Market: {i.market}</div>
                                <div className="pricediv">Commodity: {i.commodity}</div>
                                <div className="pricediv">Max Price: <span className="badge badge-info">{i.max_price}</span></div>
                                <div className="pricediv">Min Price: <span className="badge badge-info">{i.min_price}</span></div>
                                <div className="pricediv">Modal Price: <span className="badge badge-primary">{i.modal_price}</span></div>
                                <br />
                                <br />
                            </div>)
                        })}
                    </div>
                </div>
                }
            </div>
        )
    }
}
