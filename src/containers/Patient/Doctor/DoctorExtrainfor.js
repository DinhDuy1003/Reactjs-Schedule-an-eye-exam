import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtrainfor.scss';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorBydate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';

class DoctorExtrainfor extends Component {  
    constructor(props){
            super(props);
            this.state={
               isShowDetaiInfor : false
            } 
        }


    async componentDidMount(){
    
   }

   showHideDetaiInfor= (status) =>{
    this.setState({
        isShowDetaiInfor:status
    })
   }
    render() {
        let {isShowDetaiInfor}= this.state;
        return(
            <div className="doctor-extra-infor-cotainer">
                <div className="content-up">
                    <div className="text-address"> Dia chi Kham</div>
                    <div className="name-clinic"> Phong kham chuyen khoa da lieu</div>
                    <div className="detail-address"> 9c/22. KP4 Ho Nai</div>
                </div>
                <div className="content-down">
                {isShowDetaiInfor === false && 
                <div className="short-infor">Gia Kham :250.000D
                <span onClick={()=>this.showHideDetaiInfor(true)}>Xem chi tiet</span>
                </div>
                }
                
                {isShowDetaiInfor === true &&
                <>
                <div className="title-price">Gia Kham</div>
                <div className="detail-infor">
                    <div className="price">
                        <span className="left">gia kham</span>
                        <span className="right">250.000D</span>
                    </div>
                    <div className="note">
                        Duoc uu tien kham truoc khi dat qua bookingCare
                    </div>  
                </div>
                <div className="payment">
                    nguoi benh co the thanh toan chi phi bang hinh thuc tien mat va quet the
                </div>
                <div className="hide-price">
                    <span onClick={() =>this.showHideDetaiInfor(false)}>An bang Gia</span>
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

   