'use client';

import Nav from '@/components/Nav'
import React, { useEffect, useRef, useState } from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import { FaPlay } from 'react-icons/fa'
import { useRouter } from 'next/navigation';

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
        const formattedRaceData = sortedRaceData.map(([key, value]) =>  [toSentenceCase(key), (value * 100).toFixed(2)] as [string, string])
        setRaceData(formattedRaceData)
        setActiveRace(formattedRaceData[0][0])

        const sortedAgeData = sortObjectByValue(parsedData.age)
        const formattedAgeData = sortedAgeData.map(([key, value]) => [key, (value * 100).toFixed(2)] as [string, string])
        setAgeData(formattedAgeData)
        setActiveAge(formattedAgeData[0][0])

        const sortedGenderData = sortObjectByValue(parsedData.gender)
        const formattedGenderData = sortedGenderData.map(([key, value]) => [key.toUpperCase(),(value * 100).toFixed(2)] as [string, string])
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

    
    const circleRef = useRef<SVGCircleElement>(null);

    // 计算圆的参数
    const containerSize = 384;  // 容器大小
    const strokeWidth = 16;     // 圆环宽度
    const radius = (containerSize - strokeWidth) / 2;  // 半径
    const centerX = containerSize / 2;  // 圆心X坐标
    const centerY = containerSize / 2;  // 圆心Y坐标
    const circumference = 2 * Math.PI * radius;

    // 记住当前百分比（避免每次从 0 开始）
    const prevPercentRef = useRef<number>(0);

    // 工具：percent -> dashoffset（0% => circumference, 100% => 0）
    const percentToOffset = (p: number) =>
        circumference - (p / 100) * circumference;

    useEffect(() => {
        const circle = circleRef.current;
        if (!circle || !selectedData) return;

        const nextPercent = Math.max(0, Math.min(100, Number(selectedData[1]) || 0));
        const nextOffset = percentToOffset(nextPercent);

        // 只初始化一次（重要：不要每次重置 dashoffset）
        circle.style.strokeDasharray = `${circumference} ${circumference}`;

        // 如果是第一次渲染，直接设置到目标值（避免从 0% 突然动画）
        if (prevPercentRef.current === 0 && circle.style.strokeDashoffset === "") {
            circle.style.strokeDashoffset = `${nextOffset}`;
            circle.style.transition = "stroke-dashoffset 1s ease";
            prevPercentRef.current = nextPercent;
            return;
        }

        // 确保有 transition（你也可以放到 JSX 的 style / CSS 中）
        circle.style.transition = "stroke-dashoffset 1s ease";

        // 从当前值平滑过渡到新值（前进/后退都支持）
        requestAnimationFrame(() => {
            circle.style.strokeDashoffset = `${nextOffset}`;
        });

        prevPercentRef.current = nextPercent;

    }, [selectedData, circumference])   

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

  return (
    <>
    <Nav />
    <div className={styles['title__wrapper']}>
        <div className="text-[#1a1b1c] font-bold">A.I. ANALYSIS</div>
        <div className="text-[70px]">DEMOGRAPHICS</div>
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
            <div className={styles["fig_title"]}>{selectedData[0]}</div>
            <div className={styles["progress-container"]}>
                <svg
                    width={containerSize} 
                    height={containerSize} 
                    viewBox={`0 0 ${containerSize} ${containerSize}`}
                >
                    {/* <!-- 背景圆环 --> */}
                    <circle className={`${styles["progress-circle"]} ${styles["progress-background"]}`} cx={centerX} cy={centerY} r={radius} />
                    {/* <!-- 前景圆环（进度） --> */}
                    <circle ref={circleRef} className={`${styles["progress-circle"]} ${styles["progress-foreground"]}`} cx={centerX} cy={centerY} r={radius} />
                </svg>
                <div className={styles["progress-text"]}>{selectedData[1]}%</div>
            </div>
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
    <div className={styles.row_wrapper}>
        <Link href="/select">
            <div className={styles["left-btn__wrapper"]}>
                <div className={styles["btn-frame"]}>
                    <FaPlay size={12} className={styles["left-play"]}/>
                    <div className={styles["inner-content"]}>BACK</div>
                </div>
                <div className={styles["btn-content"]}>BACK</div>
            </div>
        </Link>
        <div className={styles["info"]}>If A.I. estimate is wrong, select the correct one.</div>
        <Link href="/">
            <div className={styles["right-btn__wrapper"]} >
                <div className={styles["btn-content"]}>HOME</div>
                <div className={styles["btn-frame"]}>
                    <FaPlay size={12} className={styles["right-play"]}/>
                    <div className={styles["inner-content"]}>HOME</div>
                </div>
            </div>
        </Link>
    </div>
    </>
  )
}
