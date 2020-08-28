import React from 'react';
import './Gallery.css';
import GalleryItem from './GalleryItem'

class GallerySection extends React.Component {
    render() {
      return <div className="GalleryContainer">
          <div className="GalleryTitle">PROJECTS </div>
          <GalleryItem></GalleryItem>
        </div>;
    }
}

export default GallerySection;