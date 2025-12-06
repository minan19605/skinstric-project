'use client';

import Nav from "@/components/Nav";
import Link from "next/link";
import { useEffect } from "react";
// import Image from "next/image";
import { FaPlay } from "react-icons/fa";

const LEFT_HOVER_CLASS = 'hover-left';
const RIGHT_HOVER_CLASS = 'hover-right';

export default function Home() {
  useEffect(() => {
    const container = document.getElementById('animation-container');
    const leftBtn = document.getElementById('left-btn');
    const rightBtn = document.getElementById('right-btn');

    // handle hover events
    const handleLeftEnter = () => container?.classList.add(LEFT_HOVER_CLASS)
    const handleLeftLeave = () => container?.classList.remove(LEFT_HOVER_CLASS)

    const handleRightEnter = () => container?.classList.add(RIGHT_HOVER_CLASS)
    const handleRightLeave = () => container?.classList.remove(RIGHT_HOVER_CLASS)

    leftBtn?.addEventListener('mouseenter', handleLeftEnter)
    leftBtn?.addEventListener('mouseleave', handleLeftLeave)
    rightBtn?.addEventListener('mouseenter', handleRightEnter)
    rightBtn?.addEventListener('mouseleave', handleRightLeave)

    // clean event listeners
    return () => {
      leftBtn?.removeEventListener('mouseenter', handleLeftEnter)
      leftBtn?.removeEventListener('mouseleave', handleLeftLeave)
      rightBtn?.removeEventListener('mouseenter', handleRightEnter)
      rightBtn?.removeEventListener('mouseleave', handleRightLeave)
    }
  }, []);
  
  return (
    <>
    <Nav />
    <div id="animation-container">
      <div id="left-frame" className="left_part"></div>
      <div id="right-frame" className="right_part"></div>
      <div className="outside_frame"></div>
      <div className="inner_frame"></div>
      <div id="left-btn" className="left-btn__wrapper">
        <div className="btn-frame">
          <FaPlay size={12} className="left-play"/>
        </div>
        <div className="btn-content">DISCOVER A.I.</div>
      </div>
      <div id="right-btn" className="right-btn__wrapper">
        <div className="btn-content">TAKE TEST</div>
        <Link href="/testing">
          <div className="btn-frame">
            <FaPlay size={12} className="right-play"/>
          </div>
        </Link>
      </div>
      
      <div id="middle-text" className="title__wrapper">
        <p className="top">Sophisticated</p>
        <p className="second">skincare</p>
      </div>
    </div>
    <div className="description">
      Skinstric developed an A.I. that creates a<br/>
      highly-personalized routine tailored to<br/>
      what your skin needs.
    </div>
    <Link href="/testing">
    <button className="enter">
      <span>ENTER EXPERIENCE</span>
      <div className="btn-frame">
        <FaPlay size={12} className="right-play"/>
      </div>
    </button>
    </Link>
    </>
  );
}
