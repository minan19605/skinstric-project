'use client';

import Nav from '@/components/Nav'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'

import { useRouter } from 'next/navigation';
import CircleProgress from './CircleProgress';
import FootNav from '@/components/FootNav';

type NumericDataMap = {
    [key: string]: number;
};

type SortedEntry = [string, number];

const sortObjectByValue = (dataObject: NumericDataMap): SortedEntry[] => {
    const dataArray = Object.entries(dataObject);

    const sortedArray = dataArray.sort((a, b) => {
        return b[1] - a[1];
    }) as SortedEntry[];

    return sortedArray
}

const toSentenceCase = (str:string):string => {
    if (!str) return str;
    
    // 1. 将整个字符串转为小写
    const lowerCaseStr = str.toLowerCase();
    
    // 2. 将第一个字符转为大写
    return lowerCaseStr.charAt(0).toUpperCase() + lowerCaseStr.slice(1);
};

interface UserAnalysisData {
    race: NumericDataMap;
    age: NumericDataMap;
    gender: NumericDataMap;
}

type FormattedDataArray = [string, string][];

export default function Page() {    
    const router = useRouter()
    // const [userData, setUserData] = useState<UserAnalysisData | null>(null)
    const [raceData, setRaceData] = useState<FormattedDataArray | null>(null)
    const [ageData, setAgeData] = useState<FormattedDataArray | null>(null)
    const [genderData, setGenderData] = useState<FormattedDataArray | null>(null)

    // To set the left column, which item is active
    const [active, setActive] = useState<'race' | 'age' | 'gender'>('race')
    // To record the active item's values
    const [choicedArray, setChoicedArray] = useState<FormattedDataArray | null>(null);
    const [activeRace, setActiveRace] = useState<string>('')
    const [activeAge, setActiveAge] = useState<string>('')
    const [activeGender, setActiveGender] = useState<string>('')

    // for the right column, record which row be selected
    const [selectedData, setSelectedData] = useState<[string, string] | null>(null);

    useEffect(() => {
        const saved = sessionStorage.getItem("serverData");

        if (!saved) {
            router.replace("/page1");
            return;
        }
        const parsedData: UserAnalysisData = JSON.parse(saved)
        // console.log(parsedData)
        // setUserData(parsedData);

        const sortedRaceData = sortObjectByValue(parsedData.race)
        const formattedRaceData = sortedRaceData.map(([key, value]) =>  [toSentenceCase(key), Math.floor(value * 100).toString()] as [string, string])
        setRaceData(formattedRaceData)
        setActiveRace(formattedRaceData[0][0])

        const sortedAgeData = sortObjectByValue(parsedData.age)
        const formattedAgeData = sortedAgeData.map(([key, value]) => [key, Math.floor(value * 100).toString()] as [string, string])
        setAgeData(formattedAgeData)
        setActiveAge(formattedAgeData[0][0])

        const sortedGenderData = sortObjectByValue(parsedData.gender)
        const formattedGenderData = sortedGenderData.map(([key, value]) => [key.toUpperCase(),Math.floor(value * 100).toString()] as [string, string])
        setGenderData(formattedGenderData)
        setActiveGender(formattedGenderData[0][0])

    }, [router]);

    useEffect(() => {
        if(!raceData || !ageData || !genderData) return

        let newChoicedArray: FormattedDataArray;
        if(active === 'race') {
            newChoicedArray = raceData;
        }else if(active === 'age') {
            newChoicedArray = ageData;
        }else if(active === 'gender') {
            newChoicedArray = genderData;
        }else {
            newChoicedArray = raceData
        }
        setChoicedArray(newChoicedArray)

        const key = newChoicedArray[0][0]
        const value = newChoicedArray[0][1]
        setSelectedData([key, value])
    },[active, ageData, genderData, raceData])

    const handleSelect = (key:string, value:string) => {
        setSelectedData([key,value])
        if(active === 'race'){
            setActiveRace(key)
        }else if(active === 'age') {
            setActiveAge(key)
        }else if(active === 'gender') {
            setActiveGender(key)
        }else {
            setActiveRace(key)
        }
    }

    if(!raceData || !ageData || !genderData || !choicedArray || !selectedData) {
        console.log("Data empty")
        return
    }
    console.log("selectedData ", selectedData)

    let figTitle:string = selectedData[0]
    if(active === 'age'){
        figTitle += ' y.o.'
    }

  return (
    <>
    <Nav />
    <div className={styles['title__wrapper']}>
        <div className="text-[#1a1b1c] font-bold">A.I. ANALYSIS</div>
        <div className="text-[40px] sm:text-[50px] md:text-[70px]">DEMOGRAPHICS</div>
        <div className="text-sm text-[#1a1b1c]">PREDICTED RACE & AGE</div>
    </div>
    <main className={styles.main_wrapper}>
        <div className={styles["column_items"]}>
            <div className={`${styles["item"]} ${active === 'race' ? styles.activeItem:''}`} onClick={()=>setActive('race')}>
                <p className={styles["text"]}>{activeRace}</p>
                <p className={styles["text"]}>RACE</p>
            </div>
            <div className={`${styles["item"]} ${active === 'age' ? styles.activeItem:''}`} onClick={()=>setActive('age')}>
                <p className={styles["text"]}>{activeAge}</p>
                <p className={styles["text"]}>AGE</p>
            </div>
            <div className={`${styles["item"]} ${active === 'gender' ? styles.activeItem:''}`} onClick={()=>setActive('gender')}>
                <p className={styles["text"]}>{activeGender}</p>
                <p className={styles["text"]}>SEX</p>
            </div>
        </div>
        <div className={styles["figures"]}>
            <div className={styles["fig_title"]}>{figTitle}</div>
            <CircleProgress selectedData={selectedData} />
            <div className={styles["info"]}>If A.I. estimate is wrong, select the correct one.</div>
        </div>
        <div className={styles["details"]}>
            <div className={styles["details__title"]}>
                <p>RACE</p>
                <p>A.I. CONFIDENCE</p>
            </div>
            {choicedArray.map(([key,value])=> {
                if(!selectedData) return(<div key={key}>Loading...</div>)

                const selectedKey = selectedData[0]
                return (selectedKey === key?
                (<div className={`${styles["details__row"]} ${styles.selected}`} onClick={()=>handleSelect(key,value)} key={key}>
                    <div className={styles["row__type"]}>
                        <div className={styles["small__square--white"]}>
                            <div className={styles["selected_dot"]}></div>
                        </div>
                        <span>{key}</span>
                    </div>
                    <div className={styles["row_value"]}>{value}%</div>
                </div>)
                :
                (
                <div className={styles["details__row"]} onClick={()=>handleSelect(key,value)} key={key}>
                    <div className={styles["row__type"]}>
                        <div className={styles["small__square"]}>
                            <div className={styles["selected_dot"]}></div>
                        </div>
                        <span>{key}</span>
                    </div>
                    <div className={styles["row_value"]}>{value}%</div>
                </div>
                )
            )})}
        </div>
    </main>
    <FootNav leftLink="/select" rightLink="/" rightName="HOME"  rightInnerName="HOME" />
    </>
  )
}
