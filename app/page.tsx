// import Image from "next/image";
import { FaPlay } from "react-icons/fa";


export default function Home() {
  return (
    <>
    <nav className="nav__wrapper">
      <div className="name__wrapper">
        <div className="name">SKINSTRIC</div>
        <div className="intro">[ INTRO ]</div>
      </div>
      <button className="code">
        ENTER CODE
      </button>
    </nav>
    <div className="left_part"></div>
    <div className="right_part"></div>
    <div className="left-btn__wrapper">
      <div className="btn-frame">
        <FaPlay size={12} className="left-play"/>
      </div>
      <div className="btn-content">DISCOVER A.I.</div>
    </div>
    <div className="right-btn__wrapper">
      <div className="btn-content">TAKE TEST</div>
      <div className="btn-frame">
        <FaPlay size={12} className="right-play"/>
      </div>
    </div>

    <div className="title__wrapper">
      <p className="top">Sophisticated</p>
      <p className="second">skincare</p>
    </div>
    <div className="description">
      Skinstric developed an A.I. that creates a<br/>
      highly-personalized routine tailored to<br/>
      what your skin needs.
    </div>
    </>
  );
}
