'use client';

import Nav from '@/components/Nav'
import React, { useEffect, useRef, useState } from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import { FaPlay } from 'react-icons/fa'

export default function Page() {
    const [percentage, setPercentage] = useState<number>(68);
    const circleRef = useRef<SVGCircleElement>(null);

    // 计算圆的参数
    const containerSize = 384;  // 容器大小
    const strokeWidth = 16;     // 圆环宽度
    const radius = (containerSize - strokeWidth) / 2;  // 半径
    const centerX = containerSize / 2;  // 圆心X坐标
    const centerY = containerSize / 2;  // 圆心Y坐标
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {

        if (!circleRef.current) return;

        // 设置进度百分比
        // const percentage = 68;
        
        // 设置初始状态
        circleRef.current.style.strokeDasharray = `${circumference} ${circumference}`;
        circleRef.current.style.strokeDashoffset = `${circumference}`;
        
        // 动画显示进度
        const timer = setTimeout(() => {
            const offset = circumference - (percentage / 100) * circumference;
            if (circleRef.current) {
                circleRef.current.style.strokeDashoffset = offset.toString();
            }
        }, 500);       
        
        return () => clearTimeout(timer)
    }, [percentage, circumference])

    // 动态更新进度的函数
    const updateProgress = (newPercentage: number) => {
        if (newPercentage >= 0 && newPercentage <= 100) {
            setPercentage(newPercentage);
        }
    };
    
    // 示例：动态更新进度
    // updateProgress(85);


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
            <div className={styles["item"]}>
                <p className={styles["text"]}>East asian</p>
                <p className={styles["text"]}>RACE</p>
            </div>
            <div className={styles["item"]}>
                <p className={styles["text"]}>30-39</p>
                <p className={styles["text"]}>AGE</p>
            </div>
            <div className={styles["item"]}>
                <p className={styles["text"]}>MALE</p>
                <p className={styles["text"]}>SEX</p>
            </div>
        </div>
        <div className={styles["figures"]}>
            <div className={styles["fig_title"]}>MALE</div>
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
                <div className={styles["progress-text"]}>68%</div>
            </div>
        </div>
        <div className={styles["details"]}>
            <div className={styles["details__title"]}>
                <p>SEX</p>
                <p>A.I. CONFIDENCE</p>
            </div>
            <div className={styles["details__row"]}>
                <div className={styles["row__type"]}>
                    <div className={styles["small__square"]}></div><span>MAIL</span>
                </div>
                <div className={styles["row_value"]}>68%</div>
            </div>
            <div className={styles["details__row"]}>
                <div className={styles["row__type"]}>
                    <div className={styles["small__square"]}></div><span>FEMALE</span>
                </div>
                <div className={styles["row_value"]}>31%</div>
            </div>
        </div>
    </main>
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
        <div className={styles["info"]}>If A.I. estimate is wrong, select the correct one.</div>
        <Link href="/summary">
            <div className={styles["right-btn__wrapper"]} >
                <div className={styles["btn-content"]}>GET SUMMARY</div>
                <div className={styles["btn-frame"]}>
                    <FaPlay size={12} className={styles["right-play"]}/>
                    <div className={styles["inner-content"]}>SUM</div>
                </div>
            </div>
        </Link>
    </div>
    </>
  )
}
