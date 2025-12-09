'use client';

import Nav from '@/components/Nav'
import Image from "next/image";
import React, { useRef, useState } from 'react'
import styles from './page.module.css'
import { FaPlay } from 'react-icons/fa';
import Link from 'next/link';

function convertToBase64(file:File) : Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = error => reject(error)
    })
}

export default function Page() {
    const fileInputRef = useRef<HTMLInputElement | null> (null) //Open local image file

    //Access camera
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [isCameraOpen, setIsCameraOpen] = useState(false)

    const [base64Image, setImage] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const handleButtonClick = () => {
        fileInputRef.current?.click()
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

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please chose image file")
            return;
        }

        const base64 = await convertToBase64(file)
        setImage(base64) // for preview the image

        await uoloadToServer(base64)
    }

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
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if(!video || !canvas) return;

        const ctx = canvas.getContext('2d');
        if(!ctx) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        const base64 = canvas.toDataURL("image/jpeg");
        setImage(base64);

        //stop camera
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop())
        setIsCameraOpen(false)

        // await uoloadToServer(base64)
    }


  return (
    <>
        <Nav />
        <div className={styles.title}>TO START ANALYSIS</div>
        <div className={styles["preview-wrapper"]}>
            <p className={styles["para"]}>Preview</p>
            <div className={styles["preview-box"]}>
                {base64Image && (
                    <img src={base64Image} style={{height: '100%', objectFit:'cover'}} />
                )}
            </div>
        </div>

        <div className="flex flex-row">
            <div className={styles.container}>
                <div className={`${styles.square} ${styles.square_1}`}></div>
                <div className={`${styles.square} ${styles.square_2}`}></div>
                <div className={`${styles.square} ${styles.square_3}`}></div>
                <div className={styles["icon-wrapper"]}>
                    <button onClick={openCamera}>
                        <Image className={styles["icon"]} src="/assets/camera-icon.webp" width={120} height={120} alt="Take photo" />
                    </button>
                    
                    <div className={styles["camera"]}>
                        <Image className={styles.scan_line} src="/assets/ResScanLine.webp" width={66} height={59} alt="Take photo" />
                        <div className={styles["indication"]}>
                            <p>ALLOW A.I.</p>
                            <p>TO SCAN YOUR FACE</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.container}>
                <div className={`${styles.square} ${styles.square_1}`}></div>
                <div className={`${styles.square} ${styles.square_2}`}></div>
                <div className={`${styles.square} ${styles.square_3}`}></div>
                <div className={styles["icon-wrapper"]}>
                    <button onClick={handleButtonClick}>
                        <Image className={styles["icon"]} src="/assets/gallery-icon.webp" width={120} height={120} alt="Take photo" />
                    </button>
                    <input type='file' accept='image/*' ref={fileInputRef} onChange={handleFileChange} style={{display: "none"}}/>
                    <div className={styles["upload"]}>
                        <Image className={styles.scan_line} src="/assets/ResScanLine.webp" width={66} height={59} alt="Take photo" />
                        <div className={styles["indication"]}>
                            <p>ALLOW A.I.</p>
                            <p>ACCESS GALLERY</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.row_wrapper}>
            <Link href="/testing">
                <div className={styles["left-btn__wrapper"]}>
                    <div className={styles["btn-frame"]}>
                        <FaPlay size={12} className={styles["left-play"]}/>
                        <div className={styles["inner-content"]}>BACK</div>
                    </div>
                    <div className={styles["btn-content"]}>BACK</div>
                </div>
            </Link>
        </div>
    </>
  )
}
