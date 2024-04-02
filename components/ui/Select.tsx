'use client'
/**
 * @name Select
 * @description A select component
 * @param {JSX.Element} - React component
 * @param {React.FC} - React functional component
 * @returns {JSX.Element} - React component
*/
import React, { useState } from 'react';
import { LuChevronsUpDown } from 'react-icons/lu';

const Select: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="relative inline-block w-64">

            <select
                className="block appearance-none w-full bg-slate-700/40 border border-slate-700/40 hover:border-red-500 px-4 py-2 text-slate-100 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                value={selectedOption}
                onChange={handleSelectChange}
                style={{ backgroundColor: 'black' }}
            >
                <option value="">Select an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
                <option value="option4">Option 4</option>
                <option value="option5">Option 5</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-100">
                <LuChevronsUpDown size={16} color='white' />
            </div>
        </div>);
};

export default Select;