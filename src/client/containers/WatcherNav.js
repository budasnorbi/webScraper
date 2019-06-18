import React,{Component} from 'react';

import WatcherList from '../containers/WatcherList';

export default class WatcherNav extends Component{
	constructor(props){
		super(props);
	}

	onNewWatcher = () =>{
		this.props.create();
	}

	render(){
		return(
			<div className="watcher-navigation flex-middle">
				<div className="watcher-wrapper">
					<h1 className="watcher-logo">Price Watcher</h1>
					<WatcherList/>
					<button className="new-watcher" onClick={this.onNewWatcher}></button>		
				</div>
			</div>
		)
	}
}