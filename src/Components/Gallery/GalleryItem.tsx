import React from 'react';
import './GalleryItem.css';
import onTheRecord from './../../Images/ontherecord.png'

class GalleryItem extends React.Component {
    render() {
      return <div className="GalleryItem">
          <img src={onTheRecord} className="GalleryImage"></img>
        </div>;
    }
}

export default GalleryItem;