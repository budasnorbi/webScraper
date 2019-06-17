import React from 'react';

const CreateWatcherLayout = props => {

	const addOffer = () => {
		navigator.clipboard.readText()
			.then(text => {
				console.log('Pasted content: ', text);
			})
			.catch(err => {
				console.error('Failed to read clipboard contents: ', err);
			});
	}

	return(
		<div className="watcher-wrapper">
			<h1 className="watcher-heading">Creating a new watcher</h1>
			<div className="create-watcher">
			
				<input type="text" className="watcher-name" placeholder="Watcher name"/>

				<div className="offer-list">
					<div className="offer-list__item">asdasdsads</div>
					<div onClick={addOffer} className="offer-list__add">paste offer</div>
				</div>

				<button className="watcher-save" type="submit">Save</button>
			</div>		
		</div>
	)
}

export default CreateWatcherLayout;