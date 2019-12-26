import React from 'react';
import './Footer.css';

class Footer extends React.Component {
    render() {
      return <div className="Footer">
          <div className="LiaText">Founded by Lia Coleman </div>
          <a className="IconLink" href="http://liacoleman.com"><i className="fas fa-globe"></i></a>
          <a className="IconLink" href="https://www.instagram.com/liacole7/"><i className="fab fa-instagram"></i></a>
          <div className="BrookeText">and Brooke Cheng</div>
          <a className="IconLink" href="https://www.instagram.com/brooke.cheng.photography/"><i className="fab fa-instagram"></i></a>
        </div>
    }
}

export default Footer;