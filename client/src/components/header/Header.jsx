import "./header.css";
import BGImage from "./../../images/homebg.jpg";

export default function Header() {

  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Share your life with the world...</span>
        <span className="headerTitleLg">Blogability</span>
      </div>
      <img className="headerImg" src={BGImage} alt=""/>
    </div>
  );
}
