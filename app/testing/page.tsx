'use client';

import Nav from '@/components/Nav';
import React, { useCallback, useState } from 'react'

import styles from './page.module.css'
import { FaPlay } from 'react-icons/fa';
import Link from 'next/link';
import WaveDot from '@/components/WaveDot';

interface UserData {
    name: string;
    location: string
}

const API_URL = "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne";

enum InputStep {
    NAME = 'name',
    LOCATION = 'location',
    COMPLETED = 'completed',
}

enum ErrCode {
    OK = 0,
    EMPTY = 1,  // only have space
    INVALID_CHARS = 2, //Can't have numbers and specific chars
}

async function submitUserData(data: UserData): Promise<void> {

    const requestBody = JSON.stringify({
        name: data.name,
        location: data.location,
    });

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: requestBody,
        });

        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP Error: ${response.status}`)
        }

        const responseData = await response.json();

        if(responseData.success === false) {
            throw new Error(responseData.message || 'Submission failed due to server error')
        }
    }catch (error) {
        throw error;
    }
}

export default function Page() {
    const [data, setData] = useState<UserData>({name:'', location:''})
    const [step, setStep] = useState<InputStep>(InputStep.NAME)
    const [error, setError] = useState<string>("")
    const [placeholderContent, setPlaceholderContent] = useState<string>('Introduce Yourself')
    const [inputValue, setInputValue] = useState<string>('')
    const [isLoading, setLoading] = useState<boolean>(false) // waiting for server side response after submit data

    const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }, [])

    const checkInputString = (text:string):ErrCode => {
        if(!text.trim()) return ErrCode.EMPTY;

        const validPattern = /^[\u4e00-\u9fa5a-zA-Z\s]+$/;
        if(!validPattern.test(text)) return ErrCode.INVALID_CHARS;

        return ErrCode.OK
    }

     
    const handleKeyDown = useCallback(async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key != 'Enter') return; 

        e.preventDefault();
        const value = e.currentTarget.value

        if(step === InputStep.NAME) {
            const code = checkInputString(value)
            if(code === ErrCode.EMPTY) {
                setError('Please enter your name')
                setPlaceholderContent(placeholderContent)
                setInputValue('')
            }else if(code === ErrCode.INVALID_CHARS) {
                setError('Please enter a valid name without numbers or special characters')
                setPlaceholderContent(placeholderContent)
                setInputValue('')
            }else {
                setData(prev => ({...prev, name:value}))
                setStep(InputStep.LOCATION)
                setError('')
                setPlaceholderContent('your city name')
                setInputValue('')
            }
            // console.log('Step 1 User data: ', data)
            
        }

        if(step === InputStep.LOCATION) {
            const code = checkInputString(value)
            if(code === ErrCode.EMPTY) {
                setError('Please enter your city')
                setPlaceholderContent(placeholderContent)
                setInputValue('')
            }else if(code === ErrCode.INVALID_CHARS) {
                setError('Please enter a valid city without numbers or special characters')
                setPlaceholderContent(placeholderContent)
                setInputValue('')
            }else {
                const finalData = {...data, location: value}

                setData(prev => ({...prev, location:value}))
                // console.log('Step 2 User data: ', data)

                setLoading(true)

                try {
                    await submitUserData(finalData)
                    setStep(InputStep.COMPLETED)

                    setPlaceholderContent('Introduce Yourself')
                    setInputValue('')
                    setError('')
                }catch (error) {
                    setError('Submit data failure, try again!')
                    console.log('submit error: ', error)
                    setStep(InputStep.NAME)
                    setPlaceholderContent('Introduce Yourself')
                    setInputValue('')

                }finally {
                    setLoading(false)
                }
            }

            // console.log('Step 2 User data: ', data)
            
        }
    }, [data, placeholderContent, step])

    // console.log("User Data: ", data)

  return (
    <>
        <Nav />
        <div className={styles.title}>TO START ANALYSIS</div>
        <div className={styles.container}>
            <div className={`${styles.square} ${styles.square_1}`}></div>
            <div className={`${styles.square} ${styles.square_2}`}></div>
            <div className={`${styles.square} ${styles.square_3}`}></div>
            
            {isLoading ? 
                <div className='flex flex-col items-center'>
                    <p className="text-lg text-gray-400 mb-6">Processing submission</p>
                    <WaveDot />
                </div>
                :
                <>
                {step === InputStep.COMPLETED ? 
                    <div className='flex flex-col items-center gap-4 z-10'>
                        <p className='text-2xl font-normal text-[#1A1B1C] tracking-wide'>Thank you!</p>
                        <p className='text-lg text-gray-600'>Proceed for the next step</p>
                    </div> 
                    :
                    <div className='flex flex-col items-center'>
                        <p className="text-sm text-gray-400 uppercase mb-1">CLICK TO TYPE</p>
                        {error && (<p className="text-sm text-red-500 mb-2">{error}</p>)}
                        <input suppressHydrationWarning type='text' className={styles.centerInput} placeholder={placeholderContent}
                        value={inputValue}
                        onChange={handleInput}
                        onKeyDown={handleKeyDown} />
                    </div>
                }
                </>
            }
        </div>
        <div className={styles.row_wrapper}>
            <Link href="/">
                <div className={styles["left-btn__wrapper"]}>
                    <div className={styles["btn-frame"]}>
                        <FaPlay size={12} className={styles["left-play"]}/>
                        <div className={styles["inner-content"]}>BACK</div>
                    </div>
                    <div className={styles["btn-content"]}>BACK</div>
                </div>
            </Link>
            <Link href="/result">
                <div className={`${styles["right-btn__wrapper"]} 
                                ${step === InputStep.COMPLETED ? styles["show_btn"] : ""}`}>
                    <div className={styles["btn-content"]}>PROCEED</div>
                    <div className={styles["btn-frame"]}>
                        <FaPlay size={12} className={styles["right-play"]}/>
                        <div className={styles["inner-content"]}>PROCEED</div>
                    </div>
                </div>
            </Link>
        </div>
    </>
  )
}
