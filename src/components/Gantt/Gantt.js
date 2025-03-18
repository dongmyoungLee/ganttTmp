import React, { Component } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'; // dhtmlxGantt CSS 파일 import
import './Gantt.css';

export default class Gantt extends Component {
    componentDidMount() {
        gantt.config.date_format = "%Y-%m-%d %H:%i";  // 날짜 형식 설정
        const { tasks } = this.props;  // 부모 컴포넌트로부터 받은 tasks 데이터

        gantt.init(this.ganttContainer); // Gantt 차트를 해당 컨테이너에 초기화
        gantt.parse(tasks); // 전달된 tasks 데이터를 Gantt에 표시

        gantt.config.columns = [
            { name: 'text', tree: true, label: 'Task name', width: '120' },
            { name: 'start_date', label: 'Start date', width: '120' },
            { name: 'end_date', label: 'End date', width: '120' },
            { name: 'duration', align: 'center', width: '70' }
        ];

        gantt.config.sort = true;
        gantt.config.show_links = false;
        gantt.config.readonly = true;

        gantt.plugins({
            tooltip: true
        })

        // 지연 여부를 판단할 특정 날짜 설정 (예: 2024-12-31)
        const targetDate = new Date('2025-03-20');

        // tooltip_text 템플릿 정의
        gantt.templates.tooltip_text = (start, end, task) => {
            // 비교 대상 날짜가 지연 날짜보다 큰 경우, 지연일수를 계산하여 task 이름에 추가
            let delayMessage = '';
            const taskEndDate = new Date(end);
            console.log(taskEndDate)
            if (taskEndDate > targetDate) {
                const delay = Math.floor((taskEndDate - targetDate) / (1000 * 60 * 60 * 24)); // 지연일 계산
                delayMessage = `<br><b style="color: red">Delay:</b> ${delay}일 지연`;
            }

            return `
        
        <b>Task:</b> ${task.text}${delayMessage}<br>
        <b>Start date:</b> ${gantt.templates.date_grid(start, task)}<br>
        <b>End date:</b> ${gantt.templates.date_grid(end, task)}<br>
        <b>Duration:</b> ${task.duration} days
      `;
        };
    }

    render() {
        return (
            <div
                ref={(input) => { this.ganttContainer = input }} // Gantt 컨테이너에 접근
                style={{ width: '100%', height: '100%' }} // Gantt 차트 크기
            ></div>
        );
    }
}
