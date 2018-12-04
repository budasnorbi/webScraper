import React from 'react';

const CreateWatcherLayout = props => {
	return(
		<div className="watcher-wrapper">
			<h1 className="watcher-heading">Creating a new watcher</h1>
			<div className="create-watcher">
				<div className="input-field">
					<input id="watcher-name" type="text" className="validate"/>
					<label htmlFor="watcher-name">Watcher name</label>
				</div>

				<div className="offer-list">
					<div className="offer-list__item">asdasdsads</div>
					<div className="offer-list__add">paste offer</div>
				</div>

				<button className="watcher-save" type="submit">Save</button>
			</div>		
		</div>
	)
}

export default CreateWatcherLayout;