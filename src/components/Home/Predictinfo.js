import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import importance from '../../images/importance.jpg';
import Header from '../common/Header';

export default class Predictinfo extends Component {
  	render() {
    	return (
     		<div>
				<Header />
				<div className="info">
					<h1>Why farmers should know the disease of thier crops</h1> 
					<div>As agriculture struggles to support the rapidly growing global population, plant disease reduces the production and quality of food, fibre and biofuel crops. Losses may be catastrophic or chronic, but on average account for 42% of the production of the six most important food crops. Losses due to postharvest disease can be disastrous, especially when farms are a long way from markets and infrastructure and supply chain practices are poor. Many postharvest pathogens also produce toxins that create serious health problems for consumers.
	Farmers spend billions of dollars are on disease management, often without adequate technical support, resulting in poor disease control, pollution and harmful results. In addition, plant disease can devastate natural ecosystems, compounding environmental problems caused by habitat loss and poor land management.
						<hr /><img src={importance} alt="importance" /><hr />
	Crop losses tend to be greatest in tropical countries where environmental conditions are particularly favourable, incomes are low and knowledge and investments in crop health management are minimal. Disease losses can mean that communities become dependent on imported foods, often replacing a balanced diet with processed foods that create further health problems.
	Plant breeders have very successfully increased potential crop yields, however the impacts of crop breeding for resource-poor farmers have been disappointing. Much greater emphasis is required to address reasons for the gap between potential and actual yields achieved by farmers, and research that is focussed on narrowing this gap.
	This issue is focused on research aimed at improving food security by reducing crop losses, particularly for low-income farmers. Manuscripts are invited that describe research into improving food security by reducing yield losses. Such research may include plant pathology, agronomy, entomology, weed science, farm management, improving resilience to abiotic constraints, postharvest handling, food safety, improved market access, the role of biotechnology, technology transfer, extension, education, policy and any other related topics.
					</div>

					<h2>How this platform will help you</h2>
					<p>Agriculture is a difficult industry. It’s not just early starts and physical labor; it’s also the unpredictability. One bad frost or outbreak of disease, and the profits are gone. So while we might harbor images of rustic farmhouses and rural landscapes, farmers eagerly embrace any technology that gives them more control.</p>
					<p>The biggest threat these farmers face is crop disease. For example, tomatoes are prone to various infections, among which fungal diseases are the most common. Fighting these is challenging, because often farmers do not know there is an issue until it is too late.</p>
					<p>This is where this platform will help you out. You just need to take a photo of your plant and it will give you the disease it is suffering from, incase you need then it also provide how to cure it. You can always ask your doubts to the agriculture scientist who may help you out of the situation. This will definately allow farmers to cure the disesase as well as prevent it in future.</p>
					<Link className="btn btn-lg btn-success" to="/predict">Predict</Link>
				</div>
      		</div>
    	)
  	}
}
