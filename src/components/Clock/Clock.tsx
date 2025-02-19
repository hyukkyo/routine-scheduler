import React, { FC } from "react";
import { Schedule as ScheduleType } from "../../types/schedule";
import "./Clock.css";

interface ClockProps {
  time: Date;
  schedules: (ScheduleType & { color: string })[];
}

const Clock: FC<ClockProps> = ({ time, schedules }) => {
  // 48개의 눈금을 생성 (24시간 * 2 = 48개의 30분 간격)
  const timeMarks = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? "00" : "30";
    return `${hour.toString().padStart(2, "0")}:${minute}`;
  });

  const timeToAngle = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return (hours * 2 + minutes / 30) * 7.5;
  };

  // 현재 시간을 각도로 변환
  const getCurrentTimeAngle = () => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    // 1시간은 7.5도 (360/48), 1분은 7.5/30 = 0.25도
    return (hours * 2 + minutes / 30) * 7.5;
  };

  const getCurrentTimeString = () => {
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const getCurrentSchedule = () => {
    const currentTimeStr = getCurrentTimeString();
    return schedules.find((schedule) => {
      const isOvernight = schedule.startTime > schedule.endTime;
      if (isOvernight) {
        return (
          currentTimeStr >= schedule.startTime ||
          currentTimeStr <= schedule.endTime
        );
      }
      return (
        currentTimeStr >= schedule.startTime &&
        currentTimeStr <= schedule.endTime
      );
    });
  };

  const currentSchedule = getCurrentSchedule();

  return (
    <div className="clock-wrapper">
      <div className="clock-container">
        <div className="clock">
          {schedules.map((schedule, index) => {
            const startAngle = timeToAngle(schedule.startTime);
            const endAngle = timeToAngle(schedule.endTime);
            let angle = endAngle - startAngle;

            if (angle < 0) {
              angle += 360;
            }

            return (
              <div
                key={index}
                className="schedule-arc"
                style={{
                  transform: `rotate(${startAngle}deg)`,
                  background: `conic-gradient(
                    ${schedule.color} ${angle}deg,
                    transparent ${angle}deg 360deg
                  )`,
                }}
              />
            );
          })}

          <div
            className="hand second-hand"
            style={{
              transform: `rotate(${getCurrentTimeAngle()}deg)`,
            }}
          />
          {timeMarks.map((mark, i) => {
            const isHourMark = i % 2 === 0;
            const rotation = i * 7.5;

            return (
              <div
                key={i}
                className={`time-mark ${isHourMark ? "hour-mark" : ""}`}
                style={{
                  transform: `rotate(${rotation}deg)`,
                }}
              />
            );
          })}
        </div>
        <div className="clock-numbers">
          {Array.from({ length: 24 }, (_, i) => {
            const hour = (i + 6) % 24;
            const rotation = i * 15;
            return (
              <div
                key={i}
                className="hour-number"
                style={{
                  transform: `rotate(${rotation}deg) translate(180px) rotate(${-rotation}deg)`,
                }}
              >
                {hour}
              </div>
            );
          })}
        </div>
      </div>
      <div className="current-info">
        <div className="current-time">현재 시각: {getCurrentTimeString()}</div>
        <div className="current-schedule">
          현재 일정:{" "}
          {currentSchedule ? (
            <span style={{ color: currentSchedule.color }}>
              {currentSchedule.task}
            </span>
          ) : (
            <span className="no-schedule">일정 없음</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clock;
