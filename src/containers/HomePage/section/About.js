import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";


class About extends Component {
     
    render() {
       
       return(
        <div className="section-share section-about">
           <div className="section-about-header">
                Dinh Duy

           </div>
           <div className="section-about-content">
                <div className="content-left">
                <iframe width="100%" height="400px" 
                src="https://www.youtube.com/embed/knEj2upThgE"
                 title="TRANG - &#39;Chưa Được Yêu Như Thế&#39; (OFFICIAL MUSIC VIDEO)" 
                 frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                 referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                <div className="content-right">
                    <p>
                    Người ta bảo mối tình đầu thường dở dang, rất khó để có một 
                    cái kết viên mãn. Điều này hoàn toàn phù hợp với thực tế. 
                    Chúng ta có những rung động đầu đời khi tâm hồn còn ngây thơ, 
                    trong trẻo. Không ai có thể khẳng định rằng trải qua một thanh 
                    xuân vật vã để lớn lên, 
                    chúng ta vẫn còn giữ được tình yêu thuở đôi mươi thanh thuần.
                    </p>
                </div>

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
