import React, { FC, useState } from "react";
import { Schedule } from "../../types/schedule";
import "./ScheduleForm.css";

interface ScheduleFormProps {
  onAddSchedule: (schedule: Schedule) => void;
}

const ScheduleForm: FC<ScheduleFormProps> = ({ onAddSchedule }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [task, setTask] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!startTime || !endTime || !task) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    onAddSchedule({
      startTime,
      endTime,
      task,
    });

    // 폼 초기화
    setStartTime("");
    setEndTime("");
    setTask("");
  };

  return (
    <form className="schedule-form" onSubmit={handleSubmit}>
      <h3>새 일정 추가</h3>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="startTime">시작 시간</label>
          <input
            type="time"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endTime">종료 시간</label>
          <input
            type="time"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="task">할 일</label>
        <input
          type="text"
          id="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="할 일을 입력하세요"
        />
      </div>
      <button type="submit">일정 추가</button>
    </form>
  );
};

export default ScheduleForm;
