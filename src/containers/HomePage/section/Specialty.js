import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss'
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"

class Specialty extends Component {
     
    render() {
       let settings={
        dots:false,
        infinite: true,
        speed:500,
        slidesToShow:4,
        slidesToScroll:1,
       };
       return(
        <div className="section-Specialty">
            <div className="specialty-container">
                <div className="specialty-header">
                        <span className="title-section"> Chuyên Khoa Phổ Biến</span>
                        <button className="btn-section"> Xem Thêm</button>
                </div>
                <div className="specialty-body"> 
                    <Slider {...settings}>
                        <div className="spcialty-customize">
                            <div  className="bg-image"/>
                            <div>Cơ Xương 1</div>
                        </div>
                        <div className="spcialty-customize">
                            <div  className="bg-image"/>
                            <div>Cơ Xương 2</div>
                        </div>
                        <div className="spcialty-customize">
                             <div  className="bg-image"/>
                            <div>Cơ Xương 3</div>
                        </div>
                        <div className="spcialty-customize">
                            <div  className="bg-image"/>
                            <div>Cơ Xương 4</div>
                        </div>
                        <div className="spcialty-customize">
                            <div  className="bg-image"/>
                            <div>Cơ Xương 5</div>
                        </div>
                        <div className="spcialty-customize">
                            <div  className="bg-image"/>
                            <div>Cơ Xương 6</div>
                        </div>

                    </Slider>
                
                </div>
                

            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
