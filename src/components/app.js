import React, { Component } from 'react';
import TVMazeList from './TVMazeList';





export default class App extends Component {
    render() {
        return (
            <div>
                <TVMazeList/> 
                {this.props.children}      
            </div>  
        );
    }
}

