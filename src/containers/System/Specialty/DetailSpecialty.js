
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './DetailSpecialty.scss'
import HomeHeader from '../../HomePage/Homeheader';
import DoctorSchedule from '../../Patient/Doctor/DoctorSchedule';
import DoctorExtrainfor from '../../Patient/Doctor/DoctorExtrainfor';
import ProfileDoctor from '../../Patient/Doctor/ProfileDoctor';
import { getAllDetailSpecialtyById,getAllCodeService } from '../../../services/userService';
import _ from 'lodash'
import { LANGUAGES } from '../../../utils';
class DetailSpecialty extends Component {

    constructor(props){
        super(props);
        this.state={
            arrDoctorId:[],
            dataDetailSpecialty:{},
            listProvince:[]
        }   
    }
   

   async componentDidMount() {
     if(this.props.match && this.props.match.params && this.props.match.params.id){
        let id = this.props.match.params.id;

        let res =await getAllDetailSpecialtyById({
            id:id,
            location:'ALL'
        })
        let resProvince =await getAllCodeService('PROVINCE');
        if(res && res.errCode === 0 && resProvince && resProvince.errCode === 0){
            let data = res.data;
            let arrDoctorId =[];
            if(data && !_.isEmpty(res.data)){
                let arr = data.doctorSpecialty;
                if(arr && arr.length > 0 ){
                    arr.map(item =>{
                        arrDoctorId.push(item.doctorId)
                    })
                }
            }
            let dataProvince = resProvince.data;
            if(dataProvince && dataProvince.length >0){
                dataProvince.unshift({
                    createdAt:null,
                    keyMap:'ALL',
                    type:"PROVINCE",
                    valueEN:"ALL",
                    valueVI:"Toàn Quốc",
                })
            }

            this.setState({
                dataDetailSpecialty:res.data,
                arrDoctorId:arrDoctorId,
                listProvince:dataProvince ? dataProvince: [],
            })

        }
     }
    }

    handleOnchangeSelect = async (event) =>{
        if(this.props.match && this.props.match.params && this.props.match.params.id){
        let id =this.props.match.params.id;
        let location = event.target.value;

        let res = await getAllDetailSpecialtyById({
            id:id,
            location:location
        });
        if(res && res.errCode === 0){
            let data = res.data;
            let arrDoctorId =[];
            if(data && !_.isEmpty(res.data)){
                let arr = data.doctorSpecialty;
                if(arr && arr.length > 0 ){
                    arr.map(item =>{
                        arrDoctorId.push(item.doctorId)
                    })
                }
            }
            this.setState({
                dataDetailSpecialty:res.data,
                arrDoctorId:arrDoctorId,
            })
        }
        
        }
    }

    render() {
       let {arrDoctorId ,dataDetailSpecialty,listProvince} = this.state;
       let {language}= this.props
        return (
           <>
                <div className="detail-specialty-container">
                    <HomeHeader/>
                    <div className="detail-specialty-body">
                        <div className="description-spcialty">
                            {
                                dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)                       
                                &&
                                <div dangerouslySetInnerHTML={{__html:dataDetailSpecialty.descriptionHTML}}>
                                </div>
                            }
                        </div>
                        <div className="search-sp-doctor">
                            <select onChange={(event)=> this.handleOnchangeSelect(event)}>
                                {listProvince && listProvince.length >0 &&
                                    listProvince.map((item,index)=>{
                                        return(
                                            <option key={index} value ={item.keyMap}>
                                                {language === LANGUAGES.VI ? item.valueEN : item.valueVI}
                                            </option>
                                        )
                                    })
                                }

                            </select>

                        </div>
                        {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item,index)=>{
                            return(
                                <div className="each-doctor" key={index}>
                                     <div className="dt-content-left" >
                                        <div className="profile-doctor">
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescriptionDoctor ={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            />
                                        </div>
                                    </div>

                                    <div className="dt-content-right" >
                                        <div className="doctor-schdule">
                                        <DoctorSchedule
                                            dortorIdFromParent ={item}
                                            />
                                        </div>
                                    </div>

                                    <div className="doctor-extra-infor" >
                                            <DoctorExtrainfor
                                                 doctorIdFromParent={item}
                                            />
                                    </div>
                                </div>
                            )
                        })
                        }

                    </div>
                </div>
                
           </>
        )
    }

}

const mapStateToProps = state => {
    return {
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
