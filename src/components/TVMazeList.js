import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {retrieveTVMazeData} from '../actions';

class TVMazeList extends Component{

    renderDataList(data){

        const liArr = data.map( d => {
            return (
                <li key={d.show.id}>
                    {d.show.name}
                </li>
            );
        });

        return liArr;

    }

    componentWillMount(){

        this.props.getData();

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