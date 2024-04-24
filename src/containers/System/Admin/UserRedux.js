import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {getAllCodeService} from "../../../services/userService"
import {LANGUAGES} from "../../../utils";
import * as actions from "../../../store/actions"

class UserRedux extends Component {
     constructor(props){
        super(props);
        this.state={
            genderArr:[]
        }
     }
     async componentDidMount(){
        this.props.getGenderStart();
        // try {
        //   let res =  await getAllCodeService('gender');
        //   if(res && res.errCode === 0){
        //     this.setState({
        //         genderArr: res.data
        //     })
        //   }
        //   console.log("duddddd",res);
        // } 
        
        // catch (e) {
        //     console.log(e)
        // }
     }

     componentDidUpdate(prevProps, prevState, snapshot){

        if(prevProps.genderRedux !== this.props.genderRedux){
            this.setState({
                genderArr: this.props.genderRedux
            })
        }
     }



    render() {
       let genders=this.state.genderArr;
       let language =this.props.language;
      // console.log('duy check props from redux :', this.props.genderArr)
       return(

        <div className="user-redux-UserRedux">
            <div className="title">
                User redux Duy
            </div>
            <div className="user-redux-body">
                <div className="container">
                    <div className="row">
                        <div className="col-12"><FormattedMessage id="manage-user.add" /></div>
                        <div className="col-3">
                            <label><FormattedMessage id="manage-user.Email" /></label>
                            <input className="form-control" type="text"/>
                        </div>
                        <div className="col-3">
                            <label><FormattedMessage id="manage-user.Password" /></label>
                            <input className="form-control" type="Password"/>
                        </div>
                        <div className="col-3">
                            <label><FormattedMessage id="manage-user.Firstname" /></label>
                            <input className="form-control" type="text"/>
                        </div>
                        <div className="col-3">
                            <label><FormattedMessage id="manage-user.Lastname" /></label>
                            <input className="form-control" type="text"/>
                        </div>
                        <div className="col-3">
                            <label><FormattedMessage id="manage-user.Phonenumber" /></label>
                            <input className="form-control" type="text"/>
                        </div>
                        <div className="col-9">
                            <label><FormattedMessage id="manage-user.Address" /></label>
                            <input className="form-control" type="text"/>
                        </div>
                        <div className="col-3">
                            <label><FormattedMessage id="manage-user.Gender" /></label>
                            <select className="form-control">
                                {genders && genders.length > 0 &&
                                genders.map((item, index)=>{
                                    return(
                                        <option key={index}>
                                            {language === LANGUAGES.VI ? item.valueVI :item.valueEN }
                                        </option>
                                    )
                                })
                                }
                              
                            </select>
                        </div>
                        <div className="col-3">
                            <label><FormattedMessage id="manage-user.Position" /></label>
                            <select className="form-control">
                                <option selected>Choose...</option>
                                <option>...</option>
                            </select>
                        </div>
                        <div className="col-3">
                            <label><FormattedMessage id="manage-user.RoleId" /></label>
                            <select className="form-control">
                                <option selected>Choose...</option>
                                <option>...</option>
                            </select>
                        </div>
                        <div className="col-3">
                            <label><FormattedMessage id="manage-user.Image" /></label>
                            <input type="text" className="form-control"/>
                        </div>
                        
                        <div className="col-12">
                            <button className="btn btn-primary"><FormattedMessage id="manage-user.Save" /></button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
      
       );
    }

}

const mapStateToProps = state => {
    return {
       language:  state.app.language,
       genderRedux: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart:() => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
