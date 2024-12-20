
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal, Button,ModalFooter, ModalHeader, ModalBody } from 'reactstrap';
import {emitter} from "../../utils/emitter";
class ModalUser extends Component {

    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            firstName:'',
            lastName:'',
            address:'',
        }
        this.listenToEmiiter();
        
    }
    listenToEmiiter(){
        emitter.on('EVEN_CLEAR_MODAL_DATA',()=>{
            this.setState({
                email:'',
                password:'',
                firstName:'',
                lastName:'',
                address:'',
            })
        })
    }

    componentDidMount() {
        console.log('mouting')
    }

    toggle=()=>{
        this.props.toggleFromParent();
    }
    handleOnchageInput=(event,id)=>{
        let copyState={ ...this.state};
        copyState[id]=event.target.value;
        this.setState({
            ...copyState
        })
    }
    checkValideInput=()=>{
        let isValid =true;
        let arrInput=['email','password','firstName','lastName','address'];
        for(let i=0;i<arrInput.length;i++){
            if(!this.state[arrInput[i]]){
                isValid=false;
                alert('Missing parameter' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleAddNewUser=()=>{
        let isValid=this.checkValideInput();
        if(isValid===true){
            this.props.createNewuser(this.state,'abc');
        }
    }

    render() {
       
        return (
            <Modal 
            isOpen={this.props.isOpen} 
            toggle={()=>{this.toggle()}} 
            className={'modal-user-container'}
            size="lg"
            >
                <ModalHeader toggle={()=>{this.toggle()}} >Thêm Mới Người Dùng</ModalHeader>
                <ModalBody>
                        <div className="modal-user-body">
                            <div className="input-container">
                                <label>Email</label>
                                <input type="text "
                                    onChange={(event)=>{this.handleOnchageInput(event,"email")}}
                                    value={this.state.email}
                                />
                            </div>
                            <div className="input-container">
                                <label>Password</label>
                                <input type="password"
                                onChange={(event)=>{this.handleOnchageInput(event,"password")}}
                                value={this.state.password}
                                />
                            </div>
                            <div className="input-container">
                                <label>First name</label>
                                <input type="text "
                                onChange={(event)=>{this.handleOnchageInput(event,"firstName")}}
                                value={this.state.firstName}
                                />
                            </div>
                            <div className="input-container">
                                <label>Lats name</label>
                                <input type="text"
                                onChange={(event)=>{this.handleOnchageInput(event,"lastName")}}
                                value={this.state.lastName}
                                />
                            </div>
                            <div className="input-container max-width-input">
                                <label>Address</label>
                                <input type="text"
                                 onChange={(event)=>{this.handleOnchageInput(event,"address")}}
                                 value={this.state.address}
                                />
                            </div>
                        </div>

                </ModalBody>
                <ModalFooter>
                    <Button 
                    color="primary" 
                    className="px-3" 
                    onClick={()=>{this.handleAddNewUser()}}>Lưu</Button>
                    <Button color="secondary" className="px-3" onClick={()=>{this.toggle()}}>Thoát</Button>
                </ModalFooter>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
