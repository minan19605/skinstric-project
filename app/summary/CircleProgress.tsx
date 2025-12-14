import { useEffect, useRef } from "react";
import styles from './CircleProgress.module.css'

type SelectedData = [string, string]; // e.g. ["AGE", "35.00"]

type Props = {
  selectedData: SelectedData | null;
};

export default function CircleProgress({ selectedData }: Props) {
  const circleRef = useRef<SVGCircleElement>(null);

  // ===== 逻辑坐标系参数（与像素无关）=====
  const CENTER = 50;
  const RADIUS = 49;               // 逻辑半径
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  // 把百分比转换为 dashoffset
  const percentToOffset = (p: number) =>
    CIRCUMFERENCE - (p / 100) * CIRCUMFERENCE;

  useEffect(() => {
    const circle = circleRef.current;
    if (!circle || !selectedData) return;

    const percent = Math.max(
      0,
      Math.min(100, Number(selectedData[1]) || 0)
    );

    const targetOffset = percentToOffset(percent);

    // 只初始化一次 dasharray
    circle.style.strokeDasharray = `${CIRCUMFERENCE} ${CIRCUMFERENCE}`;

    // 确保有过渡动画
    circle.style.transition = "stroke-dashoffset 1s ease";

    // 下一帧再更新，确保 transition 生效
    requestAnimationFrame(() => {
      circle.style.strokeDashoffset = `${targetOffset}`;
    });
  }, [selectedData, CIRCUMFERENCE]);

  return (
    <div className={styles["progress-container"]}>
      <svg
        viewBox="0 0 100 100"
        className={styles["circle-svg"]}
      >
        {/* <!-- 背景圆环 --> */}
        <circle className={`${styles["progress-circle"]} ${styles["progress-background"]}`} cx={CENTER} cy={CENTER} r={RADIUS} />
        {/* <!-- 前景圆环（进度） --> */}
        <circle ref={circleRef} className={`${styles["progress-circle"]} ${styles["progress-foreground"]}`} cx={CENTER} cy={CENTER} r={RADIUS} />
      </svg>

      {/* 中心文字（示例） */}
      {selectedData && <div className={styles["progress-text"]}>{selectedData[1]}%</div>}
    </div>
  );
}
