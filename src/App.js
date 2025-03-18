// src/App.js
import React, { Component } from 'react';
import Gantt from './components/Gantt/Gantt';  // 경로 수정

import './App.css';


const data = {
    data: [
        {
            id: 1,
            text: 'Task #1',
            start_date: '2025-04-15',
            end_date: '2025-04-20',
            parent: 0,  // 큰 태스크는 parent가 0
            open: true  // 하위 태스크가 기본적으로 열리게 설정
        },
        {
            id: 2,
            text: 'Task #2',
            start_date: '2025-04-30',
            end_date: '2025-04-31',
            parent: 0,  // 또 다른 큰 태스크
            open: true  // 하위 태스크가 기본적으로 열리게 설정
        },
        {
            id: 3,
            text: 'Subtask #1 of Task #1',
            start_date: '2025-04-15',
            end_date: '2025-04-17',
            parent: 1,  // Task #1의 하위 태스크
            progress: 0.5
        },
        {
            id: 4,
            text: 'Subtask #2 of Task #1',
            start_date: '2025-04-18',
            end_date: '2025-04-20',
            parent: 1,  // Task #1의 하위 태스크
            progress: 0.2
        }
    ],
    links: [
        { id: 1, source: 1, target: 2, type: '0' },  // 태스크 간 의존 관계
        { id: 2, source: 3, target: 4, type: '0' }  // Subtask 간 의존 관계
    ]
};

class App extends Component {
    render() {
        return (
            <div>
                <div className="gantt-container">
                    <Gantt tasks={data} /> {/* Gantt 컴포넌트에 tasks 데이터 전달 */}
                </div>
            </div>
        );
    }
}

export default App;
