import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import {LANGUAGES ,CRUD_ACTIONS,CommonUtils} from "../../../utils";
import * as actions from "../../../store/actions";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './UserRedux.scss';
import TableManageUser from './TableManageUser'


class UserRedux extends Component {
     constructor(props){
        super(props);
        this.state={
            genderArr:[],
            positionArr:[],
            roleArr:[],
            previewImgURL:'',
            isOpen:false,

            email:'',
            password:'',
            firstName:'',
            lastName:'',
            address: '',
            phonenumber:'',
            gender:'',
            role:'',
            position:'',
            avatar:'',

            action:'',
            userEditId:'',
        }
     }
     async componentDidMount(){
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
     }

     componentDidUpdate(prevProps, prevState, snapshot){

        if(prevProps.genderRedux !== this.props.genderRedux){
            let arrGenders=this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap:''
            })
        }
        if(prevProps.roleRedux !== this.props.roleRedux){
            let arrRoles=this.props.roleRedux
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap :''
            })
        }
        if(prevProps.positionRedux !== this.props.positionRedux){
            let arrPositions =this.props.positionRedux;

            this.setState({
                positionArr: arrPositions,
                position:arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap :''
            })
        }
        if(prevProps.listUsers !== this.props.listUsers){
            let arrGenders =this.props.genderRedux;
            let arrRoles = this.props.roleRedux;
            let arrPositions = this.props.positionRedux;
            this.setState({
            email:'',
            password:'',
            firstName:'',
            lastName:'',
            address: '',
            phonenumber:'',
            gender:arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap:'',
            role:arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap:'',
            position:arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap:'',
            avatar:'',
            action: CRUD_ACTIONS.CREATE,
            previewImgURL:''
            
            })
        }
     }
     handleOnchangeImage= async (event)=>{
        let data = event.target.files;
        let file = data[0];
        if(file){
            let base64= await CommonUtils.getBase64(file)
            let objectUrl= URL.createObjectURL(file);
            this.setState({
                previewImgURL:objectUrl,           
                avatar :base64
            })
        }
     }
     openPreviewImage=()=>{
        if(!this.state.previewImgURL)return;
        this.setState({
            isOpen:true
        })
     }

     handleSaveUser = () =>{
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let {action} = this.state;
        
        if (action === CRUD_ACTIONS.CREATE){
            this.props.createNewUser({
                email:this.state.email,
                password:this.state.password,
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                address: this.state.address,
                phonenumber:this.state.phonenumber,
                gender:this.state.gender,
                roleId:this.state.role,
                positionId:this.state.position,
                avatar :this.state.avatar
                
            })
        }
        if (action === CRUD_ACTIONS.EDIT){
            this.props.editAUserRedux({
                id:this.state.userEditId,
                email:this.state.email,
                password:this.state.password,
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                address: this.state.address,
                phonenumber:this.state.phonenumber,
                gender:this.state.gender,
                roleId:this.state.role,
                positionId:this.state.position,
                avatar :this.state.avatar
                
            })
        }
       
        
     }

     checkValidateInput=()=>{
        let isValid=true;
        let arrCheck =['email','password','firstName','lastName',
        'phonenumber','address']
        for (let i=0; i<arrCheck.length; i++){
            if(!this.state[arrCheck[i]]){
                isValid=false;
                alert('this input is required :' + arrCheck[1])
                break;
            }
        }
        return isValid;
     }
     onChangeInput =(event ,id)=>{
        let copyState={...this.state}
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
     }

     handleEditUserFromParent = (user) =>{
        let imageBase64='';
        if(user.image){
            imageBase64 = new Buffer (user.image , 'base64').toString('binary');
        }
       
        this.setState({
            email:user.email,
            password:'HARDCODE',
            firstName:user.firstName,
            lastName:user.lastName,
            address: user.address,
            phonenumber:user.phonenumber,
            gender:user.gender,
            role:user.roleId,
            position:user.positionId,
            avatar:'',
            previewImgURL:imageBase64,
            action:CRUD_ACTIONS.EDIT,
            userEditId: user.id

        })
     }

    render() {
       let genders=this.state.genderArr;
       let Roles=this.state.roleArr;
       let positions=this.state.positionArr;
       let isGetGenders = this.props.isLoadingGetGender;
       let language =this.props.language;

       let {email,password,firstName,lastName,phonenumber,address,gender,position,role,avatar} = this.state;
       return(

        <div className="user-redux-UserRedux">
            <div className="title">
                User redux Duy
            </div>
            <div className="user-redux-body">
                <div className="container">
                    <div className="row">
                        <div className="col-12"><FormattedMessage id="manage-user.add" /></div>
                        <div className="col-12">{isGetGenders === true ? 'loading genders' :''}</div>
                        <div className="col-3">
                            <label><FormattedMessage id="manage-user.Email" /></label>
                            <input className="form-control" type="email"
                            value={email}
                            onChange={(event)=>{this.onChangeInput(event,'email')}}
                            disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                            />
                        </div>
                        <div className="col-3">
                            <label><FormattedMessage id="manage-user.Password" /></label>
                            <input className="form-control" type="Password"
                            value={password}
                            onChange={(event)=>{this.onChangeInput(event,'password')}}
                            disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                            />
                        </div>
                        <div className="col-3">
                            <label><FormattedMessage id="manage-user.Firstname" /></label>
                            <input className="form-control" type="text"
                            value={firstName}
                            onChange={(event)=>{this.onChangeInput(event,'firstName')}}
                            />
                        </div>
                        <div className="col-3">
                            <label><FormattedMessage id="manage-user.Lastname" /></label>
                            <input className="form-control" type="text"
                            value={lastName}
                            onChange={(event)=>{this.onChangeInput(event,'lastName')}}
                            />
                        </div>
                        <div className="col-3">
                            <label><FormattedMessage id="manage-user.Phonenumber" /></label>
                            <input className="form-control" type="text"
                             value={phonenumber}
                             onChange={(event)=>{this.onChangeInput(event,'phonenumber')}}
                            />
                        </div>
                        <div className="col-9">
                            <label><FormattedMessage id="manage-user.Address" /></label>
                            <input className="form-control" type="text"
                             value={address}
                             onChange={(event)=>{this.onChangeInput(event,'address')}}
                            />
                        </div>
                        <div className="col-3">
                            <label><FormattedMessage id="manage-user.Gender" /></label>
                            <select className="form-control"
                            value ={gender}
                             onChange={(event)=>{this.onChangeInput(event, 'gender')}}
                             
                            >
                                {genders && genders.length > 0 &&
                                genders.map((item, index)=>{
                                    return(
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI ? item.valueVI :item.valueEN }
                                        </option>
                                    )
                                })
                                }
                              
                            </select>
                        </div>
                        <div className="col-3">
                            <label><FormattedMessage id="manage-user.Position" /></label>
                            <select className="form-control"
                            value={position}
                            onChange={(event)=>{this.onChangeInput(event, 'position')}}
                            >
                            {positions && positions.length > 0
                               && positions.map((item,index)=>{
                                return(
                                    <option key={index} value={item.keyMap} >
                                        {language === LANGUAGES.VI ? item.valueVI :item.valueEN }
                                    </option>
                                )
                               })
                               
                               }
                            </select>
                        </div>
                        <div className="col-3">
                            <label><FormattedMessage id="manage-user.role" /></label>
                            <select className="form-control"
                            value ={role}
                            onChange={(event)=>{this.onChangeInput(event, 'role')}}
                            
                            >
                               {Roles && Roles.length > 0
                               && Roles.map((item,index)=>{
                                return(
                                    <option key={index} value={item.keyMap} >
                                        {language === LANGUAGES.VI ? item.valueVI :item.valueEN }
                                    </option>
                                )
                               })
                               
                               }
                            </select>
                        </div>
                        <div className="col-3">
                            <label><FormattedMessage id="manage-user.Image" /></label>
                            <div className="preview-img-container">
                                <input id="previewImg" type="file" hidden
                                onChange={(event) => this.handleOnchangeImage(event)}                              
                                />
                                <label className="label-upload" htmlFor="previewImg">Tải Ảnh <i className="fas fa-upload"></i></label>
                                    <div className="preview-image"
                                    style ={{ backgroundImage: `url(${this.state.previewImgURL})`}}
                                    onClick={()=>this.openPreviewImage()}
                                    >

                                    </div>
                            </div>
                        </div>
                        
                        <div className="col-12 my-3">
                            <button className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary" }
                            onClick={() => this.handleSaveUser()} > 
                           
                            {this.state.action === CRUD_ACTIONS.EDIT ? 
                            <FormattedMessage id="manage-user.edit" />
                            :
                            <FormattedMessage id="manage-user.Save" />
                            }
                            
                            
                            </button>
                        </div>
                        <div className="col-12 mb-5">
                            <TableManageUser
                            handleEditUserFromParentKey = {this.handleEditUserFromParent}
                            action= {this.state.action}
                            />
                        </div>
                    </div>
                </div>

            </div>
                    {
                        this.state.isOpen === true &&
                        <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({isOpen:false})}
                        />
                    }            
        </div>
      
       );
    }

}

const mapStateToProps = state => {
    return {
       language:  state.app.language,
       genderRedux: state.admin.genders,
       roleRedux: state.admin.roles,
       positionRedux: state.admin.positions,
       isLoadingGetGender: state.admin.isLoadingGetGender,
       listUsers:state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart:() => dispatch(actions.fetchGenderStart()),
        getPositionStart:() => dispatch(actions.fetchPositionStart()),
        getRoleStart:() => dispatch(actions.fetchRoleStart()),
        createNewUser :(data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux:() =>dispatch(actions.fetchAllUsersStart()),
        editAUserRedux :(data) => dispatch(actions.editAUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
