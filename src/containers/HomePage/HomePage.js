import React, { Component } from 'react';
import { connect } from 'react-redux';
import Homeheader from './Homeheader';
import Specialty from './section/Specialty';


class HomePage extends Component {

    render() {
       
        return (
            <div>
            <Homeheader />
            <Specialty />
            <div style={{height:'300px'}}></div>
            </div>
            
           
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
