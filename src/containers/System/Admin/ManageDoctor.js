import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import './manageDoctor.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import {getDetailInforDoctor} from "../../../services/userService"

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props){
        super(props);
        this.state={
            contentMardown:'',
            contentHTML:'',
            selectedOption:'',
            description:'',
            listDoctors:[],
            hasOldData: false,

            //save infor doctor
            listPrice :[],
            listPayment:[],
            listProvince:[],
            selectedPrice:'',
            selectedPayment:'',
            selectProvince:'',
            nameClinic:'',
            addressClinic:'',
            note:''
        }
    }
    componentDidMount(){
        this.props.fetchAllDoctor();
        this.props.getAllRequiredDoctorInfor();
    }

    buildDataInputSelect = (inputData,type)=>{
        let result= [];
        let {language} = this.props;
        if(inputData && inputData.length > 0){
            if( type === 'USERS'){
                inputData.map((item, index)=>{
                    let object = {};
                    let labelvi =  `${item.lastName} ${item.firstName}`;
                    let labelen =  ` ${item.firstName} ${item.lastName}`;
                    object.label= language === LANGUAGES.VI ? labelvi:labelen;
                    object.value=item.id;
                    result.push(object)
                })
            } 
            
            if( type === 'PRICE'){
                inputData.map((item, index)=>{
                    let object = {};
                    let labelvi =  `${item.valueVI}`;
                    let labelen =  ` ${item.valueEN} USD `;
                    object.label= language === LANGUAGES.VI ? labelvi:labelen;
                    object.value=item.keyMap;
                    result.push(object)
                })
            }  
            if( type === 'PAYMENT'|| type === 'PROVINCE'){
                inputData.map((item, index)=>{
                    let object = {};
                    let labelvi =  `${item.valueVI}`;
                    let labelen =  ` ${item.valueEN} `;
                    object.label= language === LANGUAGES.VI ? labelvi:labelen;
                    object.value=item.keyMap;
                    result.push(object)
                })
            }  


        }
        return result;
    }

    componentDidUpdate(prevProps,prevState,snapshot){
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect =this.buildDataInputSelect(this.props.allDoctors,'USERS')
            this.setState({
                listDoctors:dataSelect
            })

        }
       
        if(prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor){
            let {resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;

            let dataSelectPrice= this.buildDataInputSelect(resPrice,'PRICE');
            let dataSelectPayment= this.buildDataInputSelect(resPayment,'PAYMENT');
            let dataSelectProvince= this.buildDataInputSelect(resProvince,'PROVINCE');

            console.log('duy check data new:',dataSelectPayment,dataSelectPrice,dataSelectProvince);
            this.setState({
                listPrice:dataSelectPrice,
                listPayment:dataSelectPayment,
                listProvince:dataSelectProvince
            })
        }

         if(prevProps.language !== this.props.language){
            let dataSelect =this.buildDataInputSelect(this.props.allDoctors,'USERS');
            let {resPayment,resPrice,resProvince} = this.props.allRequiredDoctorInfor;

            let dataSelectPrice= this.buildDataInputSelect(resPrice,'PRICE');
            let dataSelectPayment= this.buildDataInputSelect(resPayment,'PAYMENT');
            let dataSelectProvince= this.buildDataInputSelect(resProvince,'PROVINCE');
            this.setState({
                listDoctors:dataSelect,
                listPrice:dataSelectPrice,
                listPayment:dataSelectPayment,
                listProvince:dataSelectProvince
            })
        }

        }
    

    handleSaveContentMarkdown=()=>{
        let {hasOldData} = this.state
        this.props.saveDetaiDoctors({
            contentHTML:this.state.contentHTML,
            contentMardown:this.state.contentMardown,
            description:this.state.description,
            doctorId:this.state.selectedOption.value,
            action:hasOldData == true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice:this.state.selectedPrice.value,
            selectedPayment:this.state.selectedPayment.value,
            selectProvince:this.state.selectProvince.value,
            nameClinic:this.state.nameClinic,
            addressClinic:this.state.addressClinic,
            note:this.state.note,

           
        })
        console.log('duy check markdowssssn', this.state)
        
    }
   
     handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMardown:text,
            contentHTML:html,
        })
    }

    handleChange = async (selectedOption)  => {
        this.setState({ selectedOption });
       let res= await getDetailInforDoctor(selectedOption.value);
        if(res && res.errCode === 0 && res.data && res.data.Markdown){
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML:markdown.contentHTML,
                contentMardown:markdown.contentMardown,
                description:markdown.description,
                hasOldData : true,
            })
        }else{
            this.setState({
                contentHTML:'',
                contentMardown:'',
                description:'',
                hasOldData : false,
            })
        }
      };

      
      handleOnChangeSelectDoctorInfor=async (selectedOption,name)=>{
        let stateName= name.name;
        let stateCopy= {...this.state};
        stateCopy[stateName]= selectedOption;
        this.setState({
            ...stateCopy
        })
      }


      handleOnChangeText=async (event,id)=>{
        let stateCopy= {...this.state};
        stateCopy[id]= event.target.value;
        this.setState({
            ...stateCopy
        })
      }

    render() {     
    let {hasOldData}= this.state;
        return (
            <div className="manage-doctor-container">
           
            <div className="manage-doctor-title">
            <FormattedMessage  id="admin.manage-doctor.title"/>
            </div>  
            <div className="more-infor">
                <div className="content-left from-group">
                    <label><FormattedMessage  id="admin.manage-doctor.select-doctor"/></label>
                
                    <Select
                        value={this.state.selectedOption}
                        onChange={this.handleChange}
                        options={this.state.listDoctors}
                        placeholder={<FormattedMessage  id="admin.manage-doctor.select-doctor"/>}
                    />

                  
                </div>
                <div className="content-right ">
                <label><FormattedMessage  id="admin.manage-doctor.intro"/></label>
                <textarea className="form-control "
                onChange={(event)=>this.handleOnChangeText(event,'description')}
                value={this.state.description}
                >
                </textarea>
                </div>  
            </div>
            <div className="more-infor-extra row">
                <div className="col-4 form-group">
                    <label><FormattedMessage  id="admin.manage-doctor.price"/></label>
                    <Select
                    value ={this.state.selectedPrice}
                    onChange={this.handleOnChangeSelectDoctorInfor}
                    options ={this.state.listPrice}
                    placeholder={<FormattedMessage  id="admin.manage-doctor.price"/>}
                    name="selectedPrice"
                    />
                </div>
                <div className="col-4 form-group">
                <label><FormattedMessage  id="admin.manage-doctor.payment"/></label>
                    <Select
                    value ={this.state.selectedPayment}
                    onChange={this.handleOnChangeSelectDoctorInfor}
                    options ={this.state.listPayment}
                    placeholder={<FormattedMessage  id="admin.manage-doctor.payment"/>}
                    name="selectedPayment"
                    />
                </div>
                <div className="col-4 form-group">
                <label><FormattedMessage  id="admin.manage-doctor.province"/></label>
                    <Select
                    value ={this.state.selectProvince}
                    onChange={this.handleOnChangeSelectDoctorInfor}
                    options ={this.state.listProvince}
                    placeholder={<FormattedMessage  id="admin.manage-doctor.province"/>}
                    name="selectProvince"
                    />
                </div>
                <div className="col-4 form-group">
                    <label><FormattedMessage  id="admin.manage-doctor.nameClinic"/></label>
                    <input className="form-control"
                    onChange={(event)=>this.handleOnChangeText(event,'nameClinic')}
                    value={this.state.nameClinic}
                    />
                </div>
                <div className="col-4 form-group">
                     <label><FormattedMessage  id="admin.manage-doctor.addressClinic"/></label>
                    <input className="form-control"
                    onChange={(event)=>this.handleOnChangeText(event,'addressClinic')}
                    value={this.state.addressClinic}
                    />
                </div>
                <div className="col-4 form-group">
                <label><FormattedMessage  id="admin.manage-doctor.note"/></label>
                    <input className="form-control"
                    onChange={(event)=>this.handleOnChangeText(event,'note')}
                    value={this.state.note}
                    />
                </div>

            </div>
            <div className="manage-doctor-editor">
            <MdEditor style={{ height: '500px' }}
             renderHTML={text => mdParser.render(text)} 
            onChange={this.handleEditorChange} 
            value={this.state.contentMardown}
            />

            </div>
            <button onClick={()=>this.handleSaveContentMarkdown()}
            className={hasOldData === true ? "save-content-doctor" : "create-content-doctor"}>
            {hasOldData === true ?
              <span><FormattedMessage  id="admin.manage-doctor.add"/></span> 
              : 
              <span><FormattedMessage  id="admin.manage-doctor.save"/></span>
            }  
            
             </button>
         </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language:state.app.language,
        allDoctors:state.admin.allDoctors,
        allRequiredDoctorInfor:state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
  
        fetchAllDoctor:() =>dispatch(actions.fetchAllDoctor()),
        getAllRequiredDoctorInfor: ()=> dispatch(actions.getAllRequiredDoctorInfor()),
        saveDetaiDoctors:(data)=>dispatch(actions.saveDetaiDoctors(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
