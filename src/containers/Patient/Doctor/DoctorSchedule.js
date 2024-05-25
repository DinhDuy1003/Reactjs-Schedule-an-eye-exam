import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorBydate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';

class DoctorSchedule extends Component {  
    constructor(props){
            super(props);
            this.state={
                allDays:[],
                allAvalableTime:[]
            } 
        }


    async componentDidMount(){
    let {language} = this.props;
    
    let allDays= this.getArrDays(language);
    console.log('duy check daty',allDays)
    this.setState({
        allDays:allDays,
    })
    
   }

   capitallizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
   }


   getArrDays = (language) =>{
    let allDays =[]
    for (let i= 0; i < 7 ; i++){
        let object = {};
        if(language === LANGUAGES.VI){
            if(i === 0){
                let ddMM = moment(new Date()).format('DD/MM');
                let today = `Hôm nay - ${ddMM}`;
                object.label = today;
            }
            else{
                let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label=this.capitallizeFirstLetter(labelVi);
                 }
        }else{
            if(i === 0){
                let ddMM = moment(new Date()).format('DD/MM');
                let today = `Today - ${ddMM}`;
                object.label = today;
            }else{
                object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
            }
        }
        object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
        allDays.push(object)
    }
    return allDays;
   }


    async componentDidUpdate(prevProps, prevState,snapshot){
    if(this.props.language !== prevProps.language){
        let allDays = this.getArrDays(this.props.language);
        this.setState({
            allDays:allDays
        })
     }
     if(this.props.dortorIdFromParent !== prevProps.dortorIdFromParent){
        let allDays= this.getArrDays(this.props.language);
        let res =await getScheduleDoctorBydate(this.props.dortorIdFromParent,allDays[0].value);
        this.setState({
            allAvalableTime: res.data ? res.data:[]
        })
     }

     }

    handleOnChageSelect = async (event) =>{
        if(this.props.dortorIdFromParent && this.props.dortorIdFromParent !== -1){
            let doctorId =this.props.dortorIdFromParent;
            let date =event.target.value;
            let res = await getScheduleDoctorBydate(doctorId,date);
            if(res && res.errCode === 0){
                this.setState({
                    allAvalableTime: res.data ? res.data :[]
                })
            }
            console.log('check res schedule from react',res);
            
        }
    }
  

   
    render() {
      let {allDays ,allAvalableTime}=this.state;
      let {language} = this.props;
      return(
        <div className= "doctor-shedule-container">
            <div className="all-schedule">
                <select onChange={(event)=> this.handleOnChageSelect(event)}>
                    {allDays && allDays.length > 0 &&
                    allDays.map((item, index)=>{
                        return(<option value={item.value} key={index}>
                            {item.label}
                        </option>);
                        
                    })
                    }
                </select>
            </div>
            <div className="all-available-time">
                    <div className="text-calendar">
                        <i className="fas fa-calendar-alt"> <span>
                            <FormattedMessage id="patient.detail-doctor.schedule"/>
                            </span></i>
                    </div>
                        <div className="time-content">
                            {allAvalableTime && allAvalableTime.length > 0 ? 
                            <>
                            <div className="time-content-btns">
                            {allAvalableTime.map((item, index) => {
                                let timeDisplay = language === LANGUAGES.VI ?
                                item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                return(
                                    <button key={index}
                                     className={language === LANGUAGES.VI ? 'btn-vie' :'btn-en'}>                                       
                                    {timeDisplay}</button>
                                )
                            })
                             }
                            </div>   
                            
                            <div className="book-free">   
                             <span>
                                <FormattedMessage id="patient.detail-doctor.choose"/>
                                <i className=" far fa-hand-point-up"></i>
                                <FormattedMessage id="patient.detail-doctor.book-free"/>
                             </span>
                            </div>  
                            </>:<div className="no-schedule"> 
                                <FormattedMessage id="patient.detail-doctor.no-schedule"/>
                            </div>             
                             }
                        </div>
                      
                            
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
   
export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);

   