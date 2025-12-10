'use client';

import Nav from '@/components/Nav'
import Image from "next/image";
import React, { useEffect, useRef, useState } from 'react'
import styles from './page.module.css'
import Link from 'next/link';
import { FaPlay } from 'react-icons/fa';

export default function Page() {
  //Access camera
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isCameraOpen, setIsCameraOpen] = useState(false)

  const [base64Image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const openCamera = async () => {
    setIsCameraOpen(true)
    
    const stream = await navigator.mediaDevices.getUserMedia(
      {
        video: {facingMode: "user"},
        audio: false
      }
    );

    if (videoRef.current){
      videoRef.current.srcObject = stream;
    }
  };

  const takePhoto = () => {
    console.log(" Push the button")
      const video = videoRef.current;
      const canvas = canvasRef.current;
      console.log(canvas)

      if(!video || !canvas) return;

      const ctx = canvas.getContext('2d');
      if(!ctx) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      const base64 = canvas.toDataURL("image/jpeg");
      setImage(base64);

      //stop camera
      stopAllCameras()
      setIsCameraOpen(false)
      console.log("In take photo, video is: ", video.srcObject)

      // console.log("Got the Base 64 image is: ", base64)
  }

  const uoloadToServer = async (base64: string) => {
        setLoading(true) 
        try {
            const response = await fetch(
                "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ image: base64.split(',')[1] }), // EXACT format required
                }
            )

            const result = await response.json();
            console.log("Upload image result is: ", result)
            alert("Upload the Image success!")

        }catch(err) {
            console.log("Upload image error ", err)
            alert("Upload the Image failed!")
        }

        setLoading(false)
    }

    const stopAllCameras = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach((t) => t.stop());
      } catch (e) {
        // ignore
      }
    };

  useEffect(() => {

    const start = async () => {  
      await stopAllCameras()
      await  openCamera()
    }

    start()

    return () => {
      stopAllCameras()
    }

  },[])

  const retakePhoto = async () => {
    setImage(null);
    await openCamera();
  }

  return (
    <>
    <Nav />
    <div className={styles["wrapper"]}>
      {base64Image ? (
        <>
          {/* for show preview photo at same location */}
          <img src={base64Image} className={styles["video_area"]} />
          <div className={styles["retake__title"]}>GREATE SHOT!</div>
          <div className={styles["retake__wrapper"]}>
            <p className={styles["preview__para"]}>Preview</p>
            <div className={styles["btn__wrapper"]}>
              <button className={styles["retake"]} onClick={retakePhoto}>Retake</button>
              <button className={styles["UseThisPhoto"]} onClick={() => uoloadToServer(base64Image)}>Use This Photo</button>
            </div>
          </div>
        </>
      ):
      (<>
      <video ref={videoRef} autoPlay playsInline className={styles["video_area"]}/>
      <div className={styles["discriptions"]}>
        <p>TO GET BETTER RESULTS MAKE SURE TO HAVE</p>
        <div className={styles["methods__wrapper"]}>
            <div className={styles["method"]}>
                <div className={styles["small__square"]}></div><span>NEURAL EXPRESSION</span>
            </div>
            <div className={styles["method"]}>
                <div className={styles["small__square"]}></div><span>FRONTAL POSE</span>
            </div>
            <div className={styles["method"]}>
                <div className={styles["small__square"]}></div><span>ADEQUATE LIGHTING</span>
            </div>
        </div>
      </div>
      <button className={styles["take__photo"]} onClick={takePhoto}>
        <p className={styles["para"]}>TAKE PICTURE</p>
        <Image className={styles.takePhotoIcon} src="/assets/takePictureIcon.webp" width={80} height={80} alt="Take photo" />
      </button>
      </>)
      }
      {/* Hidden canvas (used for capturing) */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      <div className={styles.row_wrapper}>
        <Link href="/result">
          <div className={styles["left-btn__wrapper"]}>
            <div className={styles["btn-frame"]}>
              <FaPlay size={12} className={styles["left-play"]}/>
              <div className={styles["inner-content"]}>BACK</div>
            </div>
            <div className={styles["btn-content"]}>BACK</div>
          </div>
        </Link>
      </div>
    </div>
    </>
  )
}
