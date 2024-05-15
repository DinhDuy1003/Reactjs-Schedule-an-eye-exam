import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import './manageDoctor.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props){
        super(props);
        this.state={
            contentMardown:'',
            contentHTML:'',
            selectedOption:'',
            description:'',
            listDoctors:[]
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
        this.props.saveDetaiDoctors({
            contentHTML:this.state.contentHTML,
            contentMardown:this.state.contentMardown,
            description:this.state.description,
            doctorId:this.state.selectedOption.value,
        })
        console.log('duy check markdowssssn', this.state)
        
    }
   
     handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMardown:text,
            contentHTML:html,
        })
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
      };
      handleOnChangeDesc=(event)=>{
        this.setState({
            description:event.target.value
        })
      }
    render() {     
        console.log('abcc',this.state) 
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
            <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} 
            onChange={this.handleEditorChange} />

            </div>
            <button onClick={()=>this.handleSaveContentMarkdown()}
            className="save-content-doctor">Lưu Thông Tin</button>
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
