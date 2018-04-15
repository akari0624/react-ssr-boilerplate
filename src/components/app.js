import React, { Component } from 'react';
import TVMazeList from './TVMazeList';

export default class App extends Component {
    render() {
        return (
            <div>
                {this.props.children}
                <TVMazeList /> 
            </div>  
        );
    }
}
