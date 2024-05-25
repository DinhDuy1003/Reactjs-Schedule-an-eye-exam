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
            inputData.map((item, index)=>{
                let object = {};
                let labelvi = type === 'USERS' ? `${item.lastName} ${item.firstName}`:item.valueVI;
                let labelen = type === 'USERS' ? ` ${item.firstName} ${item.lastName}`:item.valueEN;
                object.label= language === LANGUAGES.VI ? labelvi:labelen;
                object.value=item.id;
                result.push(object)
            })
            
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
        if(prevProps.language !== this.props.language){
            let dataSelect =this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors:dataSelect
            })

        }
        if(prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor){
            let {resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;

            let dataSelectPrice= this.buildDataInputSelect(resPrice);
            let dataSelectPayment= this.buildDataInputSelect(resPayment);
            let dataSelectProvince= this.buildDataInputSelect(resProvince);

            console.log('duy check data new:',dataSelectPayment,dataSelectPrice,dataSelectProvince);
            this.setState({
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

      
      handleOnChangeDesc=(event)=>{
        this.setState({
            description:event.target.value
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
                        placeholder={'Chọn bác sĩ'}
                    />

                  
                </div>
                <div className="content-right from-group">
                <label><FormattedMessage  id="admin.manage-doctor.intro"/></label>
                <textarea className="form-control "
                onChange={(event)=>this.handleOnChangeDesc(event)}
                value={this.state.description}
                >
                </textarea>
                </div>  
            </div>
            <div className="more-infor-extra row">
                <div className="col-4 form-group">
                    <label>Chọn giá</label>
                    <Select
                    options={this.state.listPrice}
                    placeholder={'Chọn giá'}
                    />
                </div>
                <div className="col-4 form-group">
                    <label>Chọn phương thức toán</label>
                    <Select
                    options={this.state.listPayment}
                    placeholder={'Chọn phương thức toán'}
                    />
                </div>
                <div className="col-4 form-group">
                    <label>Chọn tỉnh thành</label>
                    <Select
                    options={this.state.listProvince}
                    placeholder={'Chọn tỉnh thành'}
                    />
                </div>
                <div className="col-4 form-group">
                    <label>Tên phòng khám</label>
                    <input className="form-control"/>
                </div>
                <div className="col-4 form-group">
                    <label>Địa chỉ phòng khám</label>
                    <input className="form-control"/>
                </div>
                <div className="col-4 form-group">
                    <label>Note</label>
                    <input className="form-control"/>
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
