import React, {Component} from 'react';

export default class WatcherList extends Component{
	constructor(){
		super()
	}

	render(){
		return(
			<ul className="watcher-list">
				<li className="watcher-list__item"> 
					<span className="name">watcher name</span>
					<span className="price">best price: 177210 Ft</span>
					<button className="link"></button>
				</li>
			</ul>
		)
	}
}