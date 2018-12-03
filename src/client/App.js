'use-strict';
import React, { Component } from 'react';
import './images/plus.svg';
import './scss/main.scss';

export default class App extends Component {
    constructor(){
        super();
    }

    render() {
        return (
            <> 
                <div className="left">
                    <h1 className="app-name">Price Watcher</h1>
                    <nav className="watcher-nav">
                        <ul className="watcher-nav__list">
                            <li className="watcher-nav__item"> 
                                <span className="name">watcher name</span>
                                <span className="price">best price: 177210 Ft</span>
                                <button className="link"></button>
                            </li>
                        </ul>
                        <button className="new-watcher"></button>
                    </nav>
                </div>
                <div className="right">asd</div>
            </>
        );
    }
}