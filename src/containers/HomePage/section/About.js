import React, { Component } from 'react';
import { connect } from 'react-redux';
import './About.scss'
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";


class About extends Component {
     
    render() {
       
       return(
        <div className="section-share section-about">
        <div class="section-about-header">
    Đặt Lịch Khám Bệnh Tại MedBooking
</div>
<div class="section-about-content">
    <div class="content-left">
        <p>
        MedBooking là nền tảng đặt lịch khám bệnh dành cho mọi người, giúp bạn dễ dàng lựa chọn thời gian và bác sĩ phù hợp.
        </p>
        <p>
            Chúng tôi cam kết mang đến cho bạn trải nghiệm đặt lịch nhanh chóng và thuận tiện, với thông tin chi tiết về các bác sĩ và các dịch vụ khám bệnh.
        </p>
    </div>
    <div class="content-right">
        <p>
        MedBooking cũng cung cấp các tính năng nhắc nhở và thông báo để đảm bảo bạn không bỏ lỡ lịch hẹn quan trọng.
        </p>
        <p>
            Hãy đồng hành cùng MedBooking để chăm sóc sức khỏe một cách thuận tiện và hiệu quả hơn.
        </p>
    </div>
</div>

<div class="contact-info">
    <p>
        <i class="fas fa-map-marker-alt"></i> Địa chỉ: Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam
    </p>
    <p>
        <i class="fas fa-id-card"></i> ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015
    </p>
    <p>
        <i class="fas fa-phone-alt"></i> Điện thoại: <a href="tel:02473012468">024-7301-2468</a> (7h - 18h)
    </p>
    <p>
        <i class="far fa-envelope"></i> Email: <a href="mailto:support@MedBooking.vn">support@MedBooking.vn</a> (7h - 18h)
    </p>
    <p>
        <i class="fas fa-building"></i> Văn phòng tại TP Hồ Chí Minh: Tòa nhà H3, 384 Hoàng Diệu, Phường 6, Quận 4, TP.HCM
    </p>
</div>
    </div>
    
      
       );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
