import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import { Modal } from 'reactstrap';

class BookingModal extends Component {  

    constructor(props){
            super(props);
            this.state={

            }
        }


    async componentDidMount(){
    
   }
   async componentDidUpdate(prevProps,prevState,snapshot){
   
    
   }

    render() {
        let {isOpenModal ,closeBookingClose, dataTime}= this.props;
        return(
            <Modal
            isOpen={isOpenModal}
            className={'booking-modal-container'}
            size="lg"
            centered
            >
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="left"> Thong Tin Dat Lich Kham Benh</span>
                        <span className="right"
                        onClick={closeBookingClose}
                        ><i className="fas fa-times"></i></span>
                    </div>
                    <div className="booking-modal-body">
                        <div className="doctor-infor">

                        </div>
                        <div className="price">
                                Gia kham benh 500.000d
                        </div>
                        <div className="row">
                            <div className="col-6 form-group" >
                                <label>Ho Ten </label>
                                <input className="form-control"/>
                            </div>
                            <div className="col-6 form-group" >
                                <label>so Dien Thoai </label>
                                <input className="form-control"/>
                            </div>
                            <div className="col-6 form-group" >
                                <label>Dia chi Email </label>
                                <input className="form-control"/>
                            </div>
                            <div className="col-6 form-group" >
                                <label>Dia Chi Lien he</label>
                                <input className="form-control"/>
                            </div>
                            <div className="col-6 form-group" >
                                <label>Ly Do Kham</label>
                                <input className="form-control"/>
                            </div>
                            <div className="col-6 form-group" >
                                <label>Dat Cho Ai</label>
                                <input className="form-control"/>
                            </div>
                            <div className="col-6 form-group" >
                                <label>Gioi Tinh</label>
                                <input className="form-control"/>
                            </div>
                        </div>
                    </div>
                    <div className="booking-modal-footer">
                        <button className="btn-booking-confirm" onClick={closeBookingClose}>
                            Xac Nhan
                        </button>
                        <button className="btn-booking-cancel" onClick={closeBookingClose}>
                            Cancel
                        </button>

                    </div>

                </div>

            </Modal>
        );
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
   
export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);

   