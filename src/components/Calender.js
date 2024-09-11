import React, { useState } from 'react';
import './Calender.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const Calender = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleMonthChange = (e) => {
        const newDate = new Date(selectedDate.setMonth(parseInt(e.target.value)));
        setSelectedDate(new Date(newDate));
    };

    const handleYearChange = (e) => {
        const newDate = new Date(selectedDate.setFullYear(parseInt(e.target.value)));
        setSelectedDate(new Date(newDate));
    };

    const daysInMonth = () => {
        const daysArray = [];
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();

        // Fill the array with empty slots until the first day of the month
        for (let i = 0; i < firstDay; i++) {
            daysArray.push(null);
        }

        // Fill the array with the days of the month as Date objects
        for (let day = 1; day <= lastDay; day++) {
            daysArray.push(new Date(year, month, day));
        }

        return daysArray;
    };

    const isSameDay = (date1, date2) => {
        return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();
    };

    return (
        <div className='calender_container'>
            <div className='header'>
                <button onClick={() => {
                    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
                }}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <select value={selectedDate.getMonth()} onChange={handleMonthChange}>
                    {months.map((month, index) => (
                        <option key={index} value={index}>
                            {month}
                        </option>
                    ))}
                </select>
                <select value={selectedDate.getFullYear()} onChange={handleYearChange}>
                    {Array.from({ length: 10 }, (_, i) => selectedDate.getFullYear() - 5 + i).map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
                <button onClick={() => {
                    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
                }}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
            <div className='daysOfweek'>
                {weekDays.map((day) => (
                    <div key={day} className='weekday'>{day}</div>
                ))}
            </div>
            <div className='daysOfMonth'>
                {daysInMonth().map((day, index) => (
                    <div key={index} className={day ? (isSameDay(day, new Date()) ? "day current" : "day") : "empty"}>
                        {day ? day.getDate() : ''}
                    </div>
                ))}
            </div>
        </div>
    );
};
