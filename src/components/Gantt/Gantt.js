// src/components/Gantt/Gantt.js
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
            { name: 'text',tree: true, label: 'Task name', width: '120' },
            { name: 'start_date', label: 'Start date', width: '120' },
            { name: 'end_date', label: 'End date', width: '120' },
            // {name: 'add', width: 44, min_width: 44, max_width: 44}
        ]

        gantt.config.show_links = false;
        gantt.config.readonly = true;

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
