import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageClinic.scss';
import MdEditor from 'react-markdown-editor-lite';
import {CommonUtils} from '../../../utils';
import { createNewClinic } from '../../../services/userService';
import {toast} from 'react-toastify'
import MarkdownIt from 'markdown-it';


const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageClinic extends Component {  
    constructor(props){
            super(props);
            this.state={
                name:'',
                imageBase64:'',
                address:'',
                descriptionHTML:'',
                descriptionMarkdown:'',
            } 
        }


    async componentDidMount(){
    
   }
   async componentDidUpdate(prevProps,prevState,snapshot){
   
    
   }

   handleOnchangeInput = (event ,id)=>{
    let stateCopy = {...this.state}
    stateCopy[id] = event.target.value;
    this.setState({
        ...stateCopy
    })
   }

   handleEditorchange = ({html ,text})=>{
    this.setState({
       descriptionHTML:html,
       descriptionMarkdown:text,
    })
   }

   handleOnchangeImage= async (event)=>{
    let data = event.target.files;
    let file = data[0];
    if(file){
        let base64= await CommonUtils.getBase64(file)
        this.setState({
            imageBase64: base64
        })
    }
 }


 handleSaveNewSpecialty= async ()=>{
    let res = await createNewClinic(this.state)
    if(res && res.errCode ===0){
        toast.success('Add new specialty succeeds')
        this.setState({
            name:'',
            imageBase64:'',
            address:'',
            descriptionHTML:'',
            descriptionMarkdown:'',
        })
    }else{
        toast.error('Something Wrongs....')
    }
 }

    render() {
        return(
            <div className="manage-specialty-contrainer">
            <div className="ms-title">  Quản Lý cơ sở y tế</div>
                <div className="add-new-specialty-row">
                    <div className="col-6 form-group">
                        <label> Tên cơ sở y tế</label>
                        <input  
                        className="form-control" type="text" value={this.state.name}
                            onChange={(event) =>this.handleOnchangeInput(event,'name')}
                       />
                    </div>
                    <div className="col-6 form-group">
                        <label> Ảnh cơ sơ y tế</label>
                        <input
                        className="form-control-file" type="file" 
                            onChange={(event) =>this.handleOnchangeImage(event)}
                       />
                    </div>
                    <div className="col-6 form-group">
                        <label> Địa chỉ phòng khám</label>
                        <input
                        className="form-control" type="text" value={this.state.address}
                            onChange={(event) =>this.handleOnchangeInput(event,'address')}
                       />
                    </div>
                    <div className="col-12">
                        <MdEditor
                            style={{height:'300px'}}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorchange}
                            value={this.state.descriptionMarkdown}
                        
                        />

                    </div>
                    <div className="col-12">
                        <button className="btn-save-specialty" 
                        onClick={() => this.handleSaveNewSpecialty()}
                        >
                            Save
                        </button>

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
   
export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);

   