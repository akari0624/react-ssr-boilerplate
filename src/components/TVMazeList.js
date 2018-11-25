import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import Styled from 'styled-components';

import {retrieveTVMazeData} from '../actions';


const Styled_UL = Styled.ul`

list-style-type:none;

`;

class TVMazeList extends Component{

    renderDataList(data){

        const liArr = data.map( d => {
            return (
                <li key={d.show.id}>
                    <Link to={`/page/${d.show.id}`}>  {d.show.name} </Link>
                </li>
            );
        });

        return liArr;

    }

    componentDidMount(){
        if(this.props.tvMazeData.length === 0){
            this.props.getData();
        }
    }



    render(){
        return (
            <div>
                <Styled_UL>
                    {this.renderDataList(this.props.tvMazeData)}
                </Styled_UL>
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