import React, { useEffect, useState } from "react";
import Clock from "./components/Clock/Clock";
import Schedule from "./components/Schedule/Schedule";
import { Schedule as ScheduleType } from "./types/schedule";
import { generatePastelColor } from "./utils/colors";
import "./App.css";

function App() {
  const [time, setTime] = useState<Date>(new Date());
  const [schedules, setSchedules] = useState<
    (ScheduleType & { color: string })[]
  >(
    [
      {
        startTime: "23:00",
        endTime: "08:00",
        task: "취침",
        color: generatePastelColor(),
      },
      {
        startTime: "08:30",
        endTime: "09:30",
        task: "아침 회의",
        color: generatePastelColor(),
      },
      {
        startTime: "10:00",
        endTime: "12:00",
        task: "프로젝트 작업",
        color: generatePastelColor(),
      },
      {
        startTime: "12:00",
        endTime: "13:00",
        task: "점심 식사",
        color: generatePastelColor(),
      },
      {
        startTime: "13:30",
        endTime: "17:00",
        task: "팀 프로젝트",
        color: generatePastelColor(),
      },
      {
        startTime: "17:30",
        endTime: "19:00",
        task: "운동",
        color: generatePastelColor(),
      },
    ].sort((a, b) => {
      // 06:00을 기준으로 정렬
      const getMinutesFrom6AM = (time: string) => {
        const [hours, minutes] = time.split(":").map(Number);
        const totalMinutes = hours * 60 + minutes;
        // 06:00 이전의 시간은 24시간을 더해서 계산
        return totalMinutes < 6 * 60 ? totalMinutes + 24 * 60 : totalMinutes;
      };

      return getMinutesFrom6AM(a.startTime) - getMinutesFrom6AM(b.startTime);
    })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAddSchedule = (newSchedule: ScheduleType) => {
    setSchedules((prevSchedules) => {
      const newScheduleWithColor = {
        ...newSchedule,
        color: generatePastelColor(),
      };
      const updatedSchedules = [...prevSchedules, newScheduleWithColor];

      // 새로운 일정 추가 후 다시 정렬
      return updatedSchedules.sort((a, b) => {
        const getMinutesFrom6AM = (time: string) => {
          const [hours, minutes] = time.split(":").map(Number);
          const totalMinutes = hours * 60 + minutes;
          return totalMinutes < 6 * 60 ? totalMinutes + 24 * 60 : totalMinutes;
        };

        return getMinutesFrom6AM(a.startTime) - getMinutesFrom6AM(b.startTime);
      });
    });
  };

  const handleDeleteSchedule = (index: number) => {
    setSchedules((prevSchedules) =>
      prevSchedules.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="App">
      <div className="container">
        <div className="clock-container">
          <Clock time={time} schedules={schedules} />
        </div>
        <Schedule
          schedules={schedules}
          onAddSchedule={handleAddSchedule}
          onDeleteSchedule={handleDeleteSchedule}
        />
      </div>
    </div>
  );
}

export default App;
