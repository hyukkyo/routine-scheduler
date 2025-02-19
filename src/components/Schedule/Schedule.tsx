import React, { FC, useState } from "react";
import { Schedule as ScheduleType } from "../../types/schedule";
import "./Schedule.css";

interface ScheduleProps {
  schedules: (ScheduleType & { color: string })[];
  onAddSchedule: (schedule: ScheduleType) => void;
  onDeleteSchedule: (index: number) => void;
}

const Schedule: FC<ScheduleProps> = ({
  schedules,
  onAddSchedule,
  onDeleteSchedule,
}) => {
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");
  const [newTask, setNewTask] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 시간 형식 검증 (HH:MM)
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(newStartTime) || !timeRegex.test(newEndTime)) {
      alert("시간을 HH:MM 형식으로 입력해주세요. (예: 09:30)");
      return;
    }

    if (newStartTime && newEndTime && newTask) {
      onAddSchedule({
        startTime: newStartTime,
        endTime: newEndTime,
        task: newTask,
      });
      // 입력 필드 초기화
      setNewStartTime("");
      setNewEndTime("");
      setNewTask("");
    }
  };

  return (
    <div className="schedule-container">
      <h2>루틴 계획표</h2>
      <div className="schedule-list">
        {schedules.map((schedule, index) => (
          <div
            key={index}
            className="schedule-item"
            style={{
              borderLeft: `4px solid ${schedule.color}`,
            }}
          >
            <div className="schedule-content">
              <span className="time">
                {schedule.startTime}~{schedule.endTime}
              </span>
              <span className="task">{schedule.task}</span>
            </div>
            <button
              className="delete-button"
              onClick={() => onDeleteSchedule(index)}
              aria-label="삭제"
            >
              ×
            </button>
          </div>
        ))}

        {/* 새로운 일정 입력 폼 */}
        <form className="schedule-item new-schedule" onSubmit={handleSubmit}>
          <span className="time">
            <input
              type="text"
              value={newStartTime}
              onChange={(e) => setNewStartTime(e.target.value)}
              placeholder="00:00"
              required
            />
            ~
            <input
              type="text"
              value={newEndTime}
              onChange={(e) => setNewEndTime(e.target.value)}
              placeholder="00:00"
              required
            />
          </span>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="할 일을 입력하세요"
            className="task-input"
            required
          />
          <button type="submit" className="add-button">
            추가
          </button>
        </form>
      </div>
    </div>
  );
};

export default Schedule;
