'use-strict';
import React, { Component } from 'react';

import WatcherDetail from './containers/WatcherDetail';
import WatcherNav from './containers/WatcherNav';

import './images/plus.svg';
import './scss/main.scss';

export default class App extends Component {
    constructor(){
        super();
        this.state={
            createNewWatcher: false
        };

        this.clickNewWatcherBtn = this.clickNewWatcherBtn.bind(this);
    }

    clickNewWatcherBtn(){
        this.setState( prevState =>{
            const newState = Object.assign({}, prevState);
            newState.createNewWatcher = true;
            return newState;
        });
    }

    render() {
        return (
            <> 
                <WatcherNav
                    create={this.clickNewWatcherBtn}
                />

                <WatcherDetail 
                    create={this.state.createNewWatcher}
                />
            </>
        );
    }
}