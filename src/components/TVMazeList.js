import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';

import {retrieveTVMazeData} from '../actions';

class TVMazeList extends Component{

    renderDataList(data){

        const liArr = data.map( d => {
            return (
                <li key={d.show.id}>
                    <Link to={`/page/${d.show.id}`}>  {d.show.name+' ABCDE'} </Link>
                </li>
            );
        });

        return liArr;

    }

    componentDidMount(){
        if(this.props.tvMazeData === []){
            this.props.getData();
        }
    }



    render(){
        return (
            <div>
                <ul>
                    {this.renderDataList(this.props.tvMazeData)}
                </ul>
            </div>
        );
    }
}


function mapStateToProps(state){

    return {tvMazeData:state.tvMazeData};

}

function mapDispatchToProps(dispatch){

    return bindActionCreators({
        getData:retrieveTVMazeData
    }, dispatch);

}


export default connect(mapStateToProps, mapDispatchToProps)(TVMazeList);