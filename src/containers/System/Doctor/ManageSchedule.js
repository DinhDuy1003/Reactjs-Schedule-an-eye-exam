import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { LANGUAGES ,dateFormat} from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import {toast} from "react-toastify";
import _ from 'lodash';
import { saveBulksScheduledoctor } from '../../../services/userService';




class ManageSchedule extends Component {
    constructor(props){
        super(props);
      
        this.state ={
            listDoctors:[],
            selectedDoctor:{},
            currrntDate:'',
            rangeTime:[],
        }
    }
    componentDidMount(){
        this.props.fetchAllDoctor();
        this.props.fetchAllScheduleHours();
    }
    
    componentDidUpdate(prevProps,prevState,snapshot){
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect =this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors:dataSelect
            })

        }
        if(prevProps.allScheduleHours !== this.props.allScheduleHours){
       
            let data= this.props.allScheduleHours;
            if(data && data.length > 0){
                data =  data.map(item => ({...item, isSelected: false }))
            }

            this.setState({
                rangeTime : data
            })
        }


        // if(prevProps.language !== this.props.language){
        //     let dataSelect =this.buildDataInputSelect(this.props.allDoctors)
        //     this.setState({
        //         listDoctors:dataSelect
        //     })

        // }
    }
     
    buildDataInputSelect = (inputData)=>{
        let result= [];
        let {language} = this.props;
        if(inputData && inputData.length > 0){
            inputData.map((item, index)=>{
                let object = {};
                let labelvi =`${item.lastName} ${item.firstName}`;
                let labelen =` ${item.firstName} ${item.lastName}`;
                object.label= language === LANGUAGES.VI ? labelvi:labelen;
                object.value=item.id;
                result.push(object)
            })
            
        }
        return result;
    }

    handleChange = async (selectedOption)  => {
        this.setState({ selectedDoctor:selectedOption });
       
      };
    
    handleOnChangeDate = (date) =>{
        this.setState({
            currrntDate:date[0]
        })
      }

    handleClickBtnTime =(time) =>{
        let {rangeTime} = this.state;
        if(rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if(item.id === time.id) item.isSelected = !item.isSelected;
                return item ;
            })
            this.setState({
                rangeTime:rangeTime
            })
        }
    }

    handleSaveSchedule = async () =>{
        let {rangeTime, selectedDoctor,currrntDate} = this.state;
        let result =[]
        if(!currrntDate){
            toast.error("invalid date")
            return;
        }
        if(selectedDoctor && _.isEmpty(selectedDoctor)){
            toast.error("invalid selected doctor");
            return;
        }
        //let formatedDate= moment(currrntDate).format(dateFormat.SEND_TO_SERVER)
        let formatedDate= new Date(currrntDate).getTime();


         if(rangeTime && rangeTime.length > 0){
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            if(selectedTime && selectedTime.length >0){
                selectedTime.map((schedule,index) =>{
                    let object = {}
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                })
               
            }else{
                toast.error(" Invalid selected time!");
                return;
            }
          
         }
         let res = await saveBulksScheduledoctor({
            arrSchedule : result,
            doctorId: selectedDoctor.value,
            formatedDate: formatedDate
         })
         if(res && res.arrCode === 0){
            toast.success("Save Infor succeed!");
         }else{
            toast.success("Save Infor succeed!");
            console.log("error saveBulkScheduleDoctor >>> res:", res)
         }
         
    }

    render() {
       
        let {rangeTime}= this.state;
        let {language} = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate() -1));
        return (
            <div className="manage-schedule-container">
                <div className="m-s-title">
                    <FormattedMessage id="manage-shedule.title"/>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-6 form-group" >
                           <FormattedMessage id="manage-shedule.choose-doctor"/>
                            <Select
                        value={this.state.selectedDoctor}
                        onChange={this.handleChange}
                        options={this.state.listDoctors}
                        
                      
                    />
                        </div>
                        <div className="col-6 form-group">
                            <FormattedMessage id="manage-shedule.choose-date"/> 
                            <DatePicker
                                onChange={this.handleOnChangeDate}
                                className ="form-control"
                               value = {this.state.currrntDate}
                               minDate={yesterday}
                            />
                        </div>
                        <div className="col-12 pick-hour-contrainer">
                            { rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index)=>{
                            return(
                                <button 
                               className={item.isSelected === true ?"btn btn-schedule active" : "btn btn btn-schedule"}
                                onClick={() => this.handleClickBtnTime(item)}
                                key= {index}>
                                {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                </button>
                                )
                            })
                            }
                        </div>
                        <div className="col-12">

                        <button className="btn btn-primary btn-save-schedule"
                        onClick={() => this.handleSaveSchedule()}
                        >
                            <FormattedMessage id="manage-shedule.save"/> 
                        </button>
                        </div>
                        
                    </div>

                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn:state.user.isLoggedIn,
        language:state.app.language,
        allDoctors:state.admin.allDoctors,
        allScheduleHours: state.admin.allScheduleHours,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor:() =>dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleHours:() =>dispatch(actions.fetchAllScheduleHours()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);

