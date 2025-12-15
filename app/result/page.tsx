'use client';

import Nav from '@/components/Nav'
import Image from "next/image";
import React, { useRef, useState } from 'react'
import styles from './page.module.css'
import { FaPlay } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import WaveDot from '@/components/WaveDot';

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

    const [showModal, setShowModal] = useState(false)

    const [base64Image, setImage] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const router = useRouter();

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

            if(!response.ok) {
                throw new Error(`HTTP error: ${response.status || response.statusText}`)
            }

            const result = await response.json();
            if(result.success === false) {
                throw new Error(result.message)
            }

            const data = await result.data
            sessionStorage.setItem("serverData", JSON.stringify(data))

            console.log("Upload image result is: ", data)
            alert("Image analyzed successfully!")
            router.push('/select')

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


    const handleAllow = () => {
        router.push("/camera")
    }

  return (
    <>
        <Nav />
        <div className={styles.title}>TO START ANALYSIS</div>
        <div className={styles["preview-wrapper"]}>
            <p className={styles["para"]}>Preview</p>
            <div className={styles["preview-box"]}>
                {base64Image && (
                    <img src={base64Image} style={{height: '100%', objectFit:'cover'}} alt='Preview'/>
                )}
            </div>
        </div>

        {loading? 
        (<div className={`${styles.container} ${styles.loading}`}>
            <div className={`${styles.square} ${styles.square_1}`}></div>
            <div className={`${styles.square} ${styles.square_2}`}></div>
            <div className={`${styles.square} ${styles.square_3}`}></div>
            <div className='flex flex-col items-center'>
                <p className="text-lg text-gray-400 mb-6">PREPARING YOUR ANALYSIS...</p>
                <WaveDot />
            </div>
        </div>)
            :
        (<div className={styles.photos}>
            <div className={styles.container}>
                <div className={`${styles.square} ${styles.square_1}`}></div>
                <div className={`${styles.square} ${styles.square_2}`}></div>
                <div className={`${styles.square} ${styles.square_3}`}></div>
                <div className={styles["icon-wrapper"]}>
                    <button onClick={()=>setShowModal(true)}>
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
        </div>)}

        {showModal && 
            <div className={styles["camera_confirmation_modal"]}>
                <p className={styles["confirmation-title"]}>ALLOW A.I. TO ACCESS YOUR CAMERA</p>
                <div className={styles["btn-wrapper"]}>
                    <button className={styles["deny"]} onClick={()=>setShowModal(false)}>DENY</button>
                    <button className={styles["allow"]} onClick={handleAllow}>ALLOW</button>
                </div>
            </div>
        }

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
