import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtrainfor.scss';
import { LANGUAGES } from '../../../utils';
import { getExraInforDoctorByid } from '../../../services/userService';
import NumberFormat from 'react-number-format';
import { FormattedMessage } from 'react-intl';
class DoctorExtrainfor extends Component {  
    constructor(props){
            super(props);
            this.state={
               isShowDetaiInfor : false,
               extraInfor:{}
            } 
        }


    async componentDidMount(){
    if(this.props.doctorIdFromParent){
        let res =await getExraInforDoctorByid(this.props.doctorIdFromParent);
        if(res && res.errCode === 0){
            this.setState({
                extraInfor: res.data
            })
        }
    }
   }
   async componentDidUpdate(prevProps,prevState,snapshot){
    if(this.props.language !== prevProps.language){
  
    }  
    if(this.props.doctorIdFromParent !== prevProps.doctorIdFromParent){
        let res =await getExraInforDoctorByid(this.props.doctorIdFromParent);
        if(res && res.errCode === 0){
            this.setState({
                extraInfor:res.data
            })
        }
    }
    
   }

   showHideDetaiInfor= (status) =>{
    this.setState({
        isShowDetaiInfor:status
    })
   }
    render() {
        let {isShowDetaiInfor, extraInfor}= this.state;
        let {language}= this.props;
        return(
            <div className="doctor-extra-infor-cotainer">   
                <div className="content-up">
                    <div className="text-address" >
                    <i class="fas fa-map-marker-alt"></i>
                        <FormattedMessage id="patient.extra-infor-doctor.text-address"/>
                    </div>
                    <div className="name-clinic"> 
                    <i class="fas fa-hospital"></i>
                    {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic :''}
                    </div>
                    <div className="detail-address">
                    <i class="fas fa-home"></i>
                        {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic :''}</div>
                </div>
                <div className="content-down">

                    
                {isShowDetaiInfor === false && 
                
                <div className="short-infor">  
                <i class="fas fa-dollar-sign"></i>
                <FormattedMessage id="patient.extra-infor-doctor.price"/>
                {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                && <NumberFormat
                        className="currency"
                        value={extraInfor.priceTypeData.valueVi}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix ={'VND'}
                />
                }
                {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                && <NumberFormat
                        className="currency"
                        value={extraInfor.priceTypeData.valueEn}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix ={'$'}
                />
                }
                <span onClick={()=>this.showHideDetaiInfor(true)}>
                <FormattedMessage id="patient.extra-infor-doctor.detail"/>
                </span>
                </div>
                }
                
                {isShowDetaiInfor === true &&
                <>
                <div className="title-price">
                    
                    <FormattedMessage id="patient.extra-infor-doctor.price"/></div>
                <div className="detail-infor">
                    <div className="price">
                        <span className="left">
                        <FormattedMessage id="patient.extra-infor-doctor.price"/>
                        </span>
                        <span className="right">
                        {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                            && <NumberFormat
                                    className="currency"
                                    value={extraInfor.priceTypeData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix ={'VND'}
                            />
                            }
                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                            && <NumberFormat
                                    className="currency"
                                    value={extraInfor.priceTypeData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix ={'$'}
                            />
                            }
                        </span>
                    </div>
                    <div className="note">
                        {extraInfor && extraInfor.note ? extraInfor.note :''}
                    </div>  
                </div>
                <div className="payment">
                <FormattedMessage id="patient.extra-infor-doctor.payment"/>

                    {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.VI
                     ? extraInfor.paymentTypeData.valueVi :''
                    }
                     {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.EN
                     ? extraInfor.paymentTypeData.valueEn :''
                    }
                </div>
                <div className="hide-price">
                    <span onClick={() =>this.showHideDetaiInfor(false)}>
                    <FormattedMessage id="patient.extra-infor-doctor.hide-price"/>

                    </span>
                </div>
                </>
                }
                </div>
               
            </div>
        )
     
    
    }
   
}

const mapStateToProps = state => {
    return {
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};
   
export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtrainfor);

   