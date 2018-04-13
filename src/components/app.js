import React, { Component } from 'react';
import Header from './header';
import TVMazeList from './TVMazeList';

export default class App extends Component {
    render() {
        return (
            <div>
                <Header />
                {this.props.children}
                <TVMazeList />
            </div>  
        );
    }
}
