import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {fetchOneShowDataById} from '../APICall/TVMazeApi';

export default class TVShowPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            data:this.props.data || {}
        };
    }

    
  

    render(){

        if(Object.keys(this.state.data).length === 0){
            return(
                // make loading animation here
                <main></main>
            );
        } else{
            return (

                <main>
                    <button><Link to="/">back</Link></button>
                    <h1>{this.state.data.name}</h1>
                    <img src={this.state.data.image.medium} alt={this.state.data.name}/>
                    <article>{this.state.data.summary}</article>
                </main>
            );
        }
    }

    componentDidMount(){

        if(this.props.match){
            const id = this.props.match.params.id;

            fetchOneShowDataById(id)
                .then(d => this.setState({data:d}))
                .catch(e => console.log(`netWork error! ${e}`));

        }
        

    }
}