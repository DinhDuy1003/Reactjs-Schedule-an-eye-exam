import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import Booking from'../../assets/Booking.png';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import {changeLanguageApp} from "../../store/actions";
import { withRouter } from 'react-router';

class Homeheader extends Component {
     changeLanguage=(language)=>{
        this.props.changeLanguageAppRedux(language)
     }
     returnTohome = () =>{
        if(this.props.history) {
            this.props.history.push(`/home`) 
                }  
     }
    render() {
       let language=this.props.language;
      
        return (
            <React.Fragment>
            <div className="home-header-container">
               <div className="home-header-content">
                <div className="left-content">
                    {/* <label>BookingCare .</label> */}
                    <i className="fas fa-bars"></i>
                    {/* <img className="header-logo" src={Booking} onClick={()=>this.returnTohome()}></img> */}
                    <text className="header-logo" src={Booking} onClick={()=>this.returnTohome()}>MedBooking.</text>

                </div>
                <div className="center-content">
                    <div className="child-content1">
                        <div><b><FormattedMessage id="homeheader.speciality"/></b></div>
                        <div className="subs-title"><FormattedMessage id="homeheader.searchdoctor"/></div>
                    </div>
                    <div className="child-content">
                    <div><b><FormattedMessage id="homeheader.health-facility"/></b></div>
                    <div className="subs-title"><FormattedMessage id="homeheader.select-room"/></div>
                    </div>
                    <div className="child-content">
                    <div><b><FormattedMessage id="homeheader.doctor"/></b></div>
                    <div className="subs-title"><FormattedMessage id="homeheader.select-doctor"/></div>
                    </div>
                    <div className="child-content">
                    <div><b><FormattedMessage id="homeheader.fee"/></b></div>
                    <div className="subs-title"><FormattedMessage id="homeheader.check-health"/></div>
                    </div>
                    
                </div>
                <div className="right-content">
                    <div className="support"><i className="fas fa-question-circle"></i>
                    <FormattedMessage id="homeheader.support"/>
                    </div>
                    <div className={language === LANGUAGES.VI ? 'language-vi active':'language-vi active'}>
                        <span onClick={()=> this.changeLanguage(LANGUAGES.VI)}>VN</span>
                        </div>
                    <div className={language === LANGUAGES.EN ? 'language-en active':'language-en active'}>
                        <span onClick={()=> this.changeLanguage(LANGUAGES.EN)}>EN</span>
                        </div>
                    </div>
                </div> 
            </div>
            {this.props.isShowBanner === true &&
            <div className="home-header-banner">
                
                <div className="content-up">
                    <div className="title">
                    <div className="title1"><FormattedMessage id="banner.title1"/> </div>
                    <div className="title2"><FormattedMessage id="banner.title2"/></div>
                    </div>
                
                {/* <div className="search">
                    <i className='fas fa-search'></i>
                    <input type="text" placeholder='Tìm Chuyên Khoa Khám Bệnh'></input>
                </div>    */}
                     <div class="search-bar">
                    <h2>Tìm sự chăm sóc bạn cần.</h2>
                    <div class="search-container">
                        <input type="text" placeholder="Bác sĩ, tình trạng hoặc thủ tục..." class="search-input" />
                        <div class="location-input">
                        <span>Vị trí</span>
                        <input type="text" value="Thủ Đức, Hồ Chí Minh" />
                        </div>
                        <button class="search-btn">
                        <i class="fa fa-search"></i>
                        </button>
                    </div>

                    </div>
                </div>
           
                    
                    <div className="conten-down">
                <div className="options">
                    <div className="options-child">
                    <div className="icon-child"><img src="https://bcare.vn/version2/pc/images/icons/ico-cate-1.png"/></div>
                    <div className="text-child"><FormattedMessage id="banner.child1"/></div>
                    </div>
                    </div>

                    <div className="options">
                    <div className="options-child">
                    <div className="icon-child"><img src="https://bcare.vn/version2/pc/images/icons/ico-cate-2.png"/></div>
                    <div className="text-child"><FormattedMessage id="banner.child2"/></div>
                    </div>
                     </div>

                <div className="options">
                    <div className="options-child">
                    <div className="icon-child"><img src="https://bcare.vn/version2/pc/images/icons/ico-cate-3.png"/></div>
                    <div className="text-child"><FormattedMessage id="banner.child3"/></div>
                    
                    </div>
                    
                </div>
                <div className="options">
                    <div className="options-child">
                    <div className="icon-child"><img src="https://bcare.vn/version2/pc/images/icons/ico-cate-4.png"/></div>
                    <div className="text-child"><FormattedMessage id="banner.child4"/></div>
                    
                    </div>
                    
                </div>
                <div className="options">
                    <div className="options-child">
                    <div className="icon-child"><img src="https://bcare.vn/version2/pc/images/icons/ico-cate-5.png"/></div>
                    <div className="text-child"><FormattedMessage id="banner.child5"/></div>
                    
                    </div>
                    
                </div>
                <div className="options">
                    <div className="options-child">
                    <div className="icon-child"><img src="https://bcare.vn/version2/pc/images/icons/ico-cate-6.png"/></div>
                    <div className="text-child"><FormattedMessage id="banner.child6"/></div>
                    
                </div>
                </div>
                <div className="options">
                    <div className="options-child">
                    <div className="icon-child"><img src="https://bcare.vn/version2/pc/images/icons/ico-cate-7.png"/></div>
                    <div className="text-child"><FormattedMessage id="banner.child7"/></div>
                    
                </div>
                </div>
                <div className="options">
                    <div className="options-child">
                    <div className="icon-child"><img src="https://bcare.vn/version2/pc/images/icons/ico-cate-8.png"/></div>
                    <div className="text-child"><FormattedMessage id="banner.child8"/></div>
                    
                </div>
                </div>
                </div>

                 
            </div>
            }
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo:state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux:(language)=> dispatch(changeLanguageApp(language))
    };
};

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Homeheader));
