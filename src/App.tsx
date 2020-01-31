import React from 'react';
import './App.css';
import Homepage from './Components/Homepage/Homepage';
import Footer from './Components/Footer/Footer';
import MainContainer from './Components/MainContainer/MainContainer'
import MissionSection from './Components/Mission/Mission'
import GallerySection from './Components/Gallery/Gallery';
import AboutSection from './Components/About/About';

function App() {
  return (
    <div className="App">
      <div className="App-Container">
        <MainContainer>
          <Homepage></Homepage>
          <MissionSection></MissionSection>
          <GallerySection></GallerySection>
          <AboutSection></AboutSection>
          <Footer></Footer>
        </MainContainer>
      </div>
    </div>
  );
}

export default App;
