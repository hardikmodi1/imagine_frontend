import React, { Component } from 'react';
import axios from 'axios';
import {graphql,compose} from 'react-apollo';
import {Pie} from 'react-chartjs-2';

import {youtubeQuery} from '../../queries/queris';
import Header from '../common/Header';

class Predict extends Component {

	constructor(props){
		super(props);
		this.state={
			selectedFile: '',
			preview: '',
			chartData:{},
			image:[],
			link:[],
			text:[]
		};	
	}

	fileSelectHandler=async function(event){
		console.log(event.target.files[0].type.includes('image'));
		if(event.target.files[0].type.includes('image')){
			this.setState({
				...this.state,
				selectedFile:event.target.files[0]
			});
			let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({
                	...this.state,
                	preview: e.target.result
                });
            };
			reader.readAsDataURL(event.target.files[0]);
			// sending image to cloudinary
			var formData=new FormData();
			formData.append('file',event.target.files[0]);
			formData.append('upload_preset','partq0ax');
			var headers = {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
			const response = await axios.post('https://api.cloudinary.com/v1_1/vizack/upload',formData,{headers:headers})
			console.log(response.data.url);
			// sending image for predictions
			var img_url=response.data.url;
			headers = {
				'Content-Type': 'application/json',
				'Prediction-Key':'acc1e913db2940a081e10c1af5d0814d'
			}
			var obj = {
				"Url": img_url
			}
			const res = await axios.post('https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/9c3d8458-0f72-4d39-9066-5abf03c04b42/url?iterationId=65716d47-0a12-4a0a-b547-70ed909a6aa4', obj, {headers: headers})
			
			var chartData = {};
			var labels = [];
			var queryString = res.data.predictions[0].tagName.replace(' ','+');
			queryString = "how+to+cure+"+queryString;
			this.props.youtubeQuery({
				variables:{
					query: queryString
					// query: "how+to+cure+apple+scab"
				}
			})
			.then((data)=>{
				console.log(data);
				this.setState({
					...this.state,
					link: data.data.youtubesearch[0].link,
					image: data.data.youtubesearch[0].image,
					text: data.data.youtubesearch[0].text
				})
			})
			.catch((err)=>{
				console.log(err);
			})
			labels[0]=res.data.predictions[0].tagName;
			labels[1]=res.data.predictions[1].tagName;
			labels[2]=res.data.predictions[2].tagName;
			chartData.labels=labels;
			var datasets=[];
			var data=[];
			data[0]=res.data.predictions[0].probability;
			data[1]=res.data.predictions[1].probability;
			data[2]=res.data.predictions[2].probability;
			datasets[0]={
				label: 'Predictions',
				data: data,
				backgroundColor:[
					'rgba(255,99,132,0.6)',
					'rgba(54,162,235,0.6)',
					'rgba(255,206,86,0.6)'
				]
			};
			chartData.datasets=datasets;
			console.log(chartData);
			this.setState({
				...this.state,
				chartData:chartData
			})
			if(event.target)
				event.target.value='';
		}	
		else{
			event.target.value='';
			console.log("File format not supported");
		}
		
	}



	render() {
		return (
		<div>
			<Header />
			<div className="info">
				<form>
					<div className="form-group">
						<label htmlFor="image">Upload the image</label>
						<input type="file" className="form-control-file" name="image" id="image" onChange={this.fileSelectHandler.bind(this)} />
					</div>
				</form>
				{this.state.preview ? (
					<div id="target">
						<img
							src={this.state.preview} 
							className="original img-responsive img-thumbnail" 
							alt="profile" 
						/>
					</div>
				):
				''}
				<Pie data={this.state.chartData} options={{}} />
				{this.state.image.length === 0 ? '' : <h1>Videos you might need to look at</h1>}
				{this.state.image.map((im,i)=>{
					return (
						<div key={i} className="vidCont">
							<img src={im} alt={im} className="im" />
							<a href={this.state.link[i]} className="vidlink"><p>{this.state.text[i]}</p></a>
							<br />
							<br />
							<hr />
						</div>
					)
				})}
			</div>
		</div>
		)
	}
}

export default compose(
    graphql(youtubeQuery, {name: "youtubeQuery"})
)(Predict);