import React from 'react';
import './Mission.css';
import waterfall from './../../Images/Waterfall.png'
import livingchars from './../../Images/Living_chars.jpg'
import tech from './../../Images/tech.png'
import tinyplanet from './../../Images/tinyplanet.png'
import interaction from './../../Images/interaction.jpg'

type MissionProps = {
  title: string,
  paragraph: string
}

export interface  MissionSectionState{
  pageNumber: number
}

export interface  MissionSectionProps{

}


class MissionSection extends React.Component<MissionSectionProps, MissionSectionState> {
    private maxPageNumber = 0;

    /**
     * Creates an instance of ThemeCard.
     *
     * @param {CPNIPinCard} props
     */
    constructor(props: MissionSectionProps) {
      super(props);

      this.state = {
          pageNumber: 0
      };
    }

    render() {

      let missionPages = [
        this.renderMissionPage("PUBLIC ART", livingchars, 0),
        this.renderMissionPage("PHOTOGRAPHY", waterfall, 1),
        this.renderMissionPage("TECHNOLOGY", tinyplanet, 2),
        this.renderMissionPage("EDUCATION", tech, 3),
        this.renderMissionPage("INTERACTION", interaction, 4)
      ];
      this.maxPageNumber = missionPages.length - 1;

      return <div className="MissionContainer">
        <div className={"MissionText"}>OUR MISSION</div>
        <div className={"MissionPages"}>
        {this.state.pageNumber > 0 && <div className="ChevronContainerLeft" onClick={this.decrementPage}>
          <i className="fa fa-chevron-left"></i>
        </div>}
        {this.state.pageNumber < this.maxPageNumber && <div className="ChevronContainerRight" onClick={this.incrementPage}>
          <i className="fa fa-chevron-right"></i>
        </div>}
            {
              missionPages
            }
        </div>
        </div>;
    }

    private renderMissionPage = (title: string, imageSrc: string, index: number): JSX.Element => {
      let containerClass
      if (index < this.state.pageNumber) {
        containerClass = "MissionPageHiddenLeft"
      } else if (index === this.state.pageNumber) {
        containerClass = "MissionPage"
      } else {
        containerClass = "MissionPageHiddenRight"
      }

      return <div className={containerClass}>
                <img src={imageSrc} className="MissionImage"></img>
                <div className="Word">
                  {title}
                </div>
              </div>
    }

    private incrementPage = () => {
      //window.scrollTo(0, window.innerHeight);
      this.setState({pageNumber: this.state.pageNumber+1})
    }

    private decrementPage = () => {
      //window.scrollTo(0, window.innerHeight);
      this.setState({pageNumber: this.state.pageNumber-1})
    }
  }


let scrollEventHandler = () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > window.innerHeight-100) {
    (document.querySelector(".MissionText") as HTMLInputElement).style.opacity = `0`;
    (document.querySelector(".MissionPages") as HTMLInputElement).style.opacity = `1`;
    window.removeEventListener("scroll", scrollEventHandler);
  }
}

window.addEventListener("scroll", scrollEventHandler);

export default MissionSection;