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
        }
    }
    componentDidMount(){
        this.props.fetchAllDoctor()
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

    componentDidUpdate(prevProps,prevState,snapshot){
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect =this.buildDataInputSelect(this.props.allDoctors)
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
            Tao Thong Tin Bac Si
            </div>  
            <div className="more-infor">
                <div className="content-left from-group">
                <label>Chọn Bác Sĩ</label>
                    <Select
                        value={this.state.selectedOption}
                        onChange={this.handleChange}
                        options={this.state.listDoctors}
                      
                    />

                  
                </div>
                <div className="content-right from-group">
                <label>Thông Tin Giới Thiệu:</label>
                <textarea className="form-control " rows="4"
                onChange={(event)=>this.handleOnChangeDesc(event)}
                value={this.state.description}
                >
                    ádfgasdfgadf
                </textarea>
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
              <span>Lưu Thông Tin</span> : <span>Tạo Thông Tin</span>
            }  
            
             </button>
         </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language:state.app.language,
        allDoctors:state.admin.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
  
        fetchAllDoctor:() =>dispatch(actions.fetchAllDoctor()),
        saveDetaiDoctors:(data)=>dispatch(actions.saveDetaiDoctors(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
