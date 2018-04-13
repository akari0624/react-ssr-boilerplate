import React, {Component} from 'react';
import {reduxForm} from 'redux-form';

class Signin extends Component{
    constructor(props){
        super(props);
        
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit ({ email, password }) {
      console.log(email, password);
    }

    render(){
        const {handleSubmit, 
            fields:{
                email,
                password
            }
        } = this.props;

        return(
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <fieldset className="form-group">
                    <label>Email:</label>
                    <input {...email} className="form-control"></input>
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <input {...password} type="password" className="form-control"></input>
                </fieldset>
                <button action="submit" className="btn btn-primary">Sign in</button>
            </form>
        );
    }

}

export default reduxForm({
    form:'signin',
    fields:['email','password']
})(Signin); 
