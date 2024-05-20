import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            username:'',
            password:'',
            isShowPassword: false,
            errMessage:'',
        }
        
       
    }
    handleOnchangeUsername=(event)=>{
        this.setState({
            username:event.target.value
        })
        
    }
    handleOnchangePassword=(event)=>{
        this.setState({
            password:event.target.value
        })
        
    }
    handleLogin = async () =>{
        this.setState({
            errMessage:'',
        })
        try{
            let data =await handleLoginApi(this.state.username,this.state.password);
            if(data&& data.errCode!==0){
                this.setState({
                    errMessage:data.message
                })
            }
            if(data&& data.errCode===0){
                this.props.userLoginSuccess(data.user)
                console.log('login succeeds')
            }
        }
        catch(error){
            if(error.response){
           if(error.response.data){
            this.setState({
                errMessage:error.response.data.message
            })
           }
        }  
        console.log('duyzz',error.response) 
    }  
    }
    hendleShowHidePassword=()=>{
        this.setState({
            isShowPassword:!this.state.isShowPassword
        })
    }
    handleKeyDown=(event)=>{
        console.log('duy check key', event)
        if(event.key === "Enter" || event.keyCode === 13){
            this.handleLogin();
        }
    }
   

    render() {

        return (
           
                <div className="login-background">
                    <div className="login-container">
                        <div className="login-content row">
                            <div className="col-12 text-login">Đăng Nhập</div>
                            <div className="col-12 from-group login-input">
                                <label>Tài Khoản</label>
                                <input type="text" className="form-control" placeholder="Nhập Tài Khoản" value={this.state.username}
                                onChange={(event)=>this.handleOnchangeUsername(event)}/>
                            </div>
                            <div className="col-12 from-group login-input">
                                <label>Mật Khẩu</label>
                                <div className='custom-input-password'>
                                <input type={this.state.isShowPassword? 'text':'password'} 
                                className="form-control" placeholder="Nhập Mật Khẩu"
                                onChange={(event)=>{this.handleOnchangePassword(event)}}
                                onKeyDown={(event) => this.handleKeyDown(event)}
                                />

                                <span onClick={()=>{this.hendleShowHidePassword()}}>
                                <i className={this.state.isShowPassword?'fa fa-eye':'far fa-eye-slash'}></i>
                                </span>
                               
                                </div>
                               
                            </div>
                            <div className='col-12' style={{color:'red'}}>
                                {this.state.errMessage}
                            </div>
                           <div className="col-12 ">
                           <button className="btn-login" onClick={()=>{this.handleLogin()}}>Đăng Nhập</button>
                           </div>
                            <div className="col-12">
                                <span className="forgot-password">Quên mật khẩu ?</span>
                            </div>
                            <div className="col-12 text-center mt-3" >
                                <span>Đăng Nhập Với:</span>
                            </div>
                            <div className="col-12 social-login">
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>

                            </div>
                        </div>
                    </div>
                </div>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        //userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess:(userInfo)=>dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
