import React, {Component} from 'react';
import CreateWatcherLayout from '../components/createWatcherLayout';

export default class WatcherDetails extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="watcher-detail flex-middle">
				{this.props.create && <CreateWatcherLayout/>}
			</div>
		)
	}
}