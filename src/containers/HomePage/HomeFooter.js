import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";


class HomeFooter extends Component {
     
    render() {
       
       return(
        <div class="home-footer">
        <p>&copy; 2024 MedBooking</p>
        <p>
            <a href="#" target="_blank" class="footer-link" data-text="New Tab → Click Here ←">New Tab → Click Here ←</a>
        </p>
    </div>
    
      
       );
       
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
