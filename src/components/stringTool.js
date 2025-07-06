'use client';

import React, { useState } from 'react';
import styles from './stringTool.module.css';

export default function StringTool() {
    const [inputText, setInputText] = useState('');
    const [operation, setOperation] = useState('');
    const [param1, setParam1] = useState('');
    const [param2, setParam2] = useState('');
    const [output, setOutput] = useState('');

    const handleRun = () => {
        let result = '';
        try {
            switch (operation) {
                case 'replaceAll':
                    result = inputText.replaceAll(param1, param2);
                    break;
                case 'match':
                    result = inputText.match(new RegExp(param1, 'g'))?.join(', ') || 'No match';
                    break;
                case 'padStart':
                    result = inputText.padStart(Number(param1), param2);
                    break;
                case 'padEnd':
                    result = inputText.padEnd(Number(param1), param2);
                    break;
                case 'repeat':
                    result = inputText.repeat(Number(param1));
                    break;
                case 'localeCompare':
                    result = inputText.localeCompare(param1).toString();
                    break;
                default:
                    result = 'Select a valid operation.';
            }
        } catch (err) {
            result = `Error: ${err.message}`;
        }
        setOutput(result);
    };

    const showSecondParam = ['replaceAll', 'padStart', 'padEnd'].includes(operation);
    const showFirstParam = operation !== '';

    return (
        <div className={styles.container}>
            <h2>🔡 String Utilities Tool – Part 2</h2>
            <textarea
                className={styles.input}
                rows={4}
                placeholder="Enter a string to manipulate"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
            />

            <div className={styles.selectRow}>
                <select value={operation} onChange={(e) => setOperation(e.target.value)}>
                    <option value="">-- Select Operation --</option>
                    <option value="replaceAll">replaceAll(sub, new)</option>
                    <option value="match">match(regex)</option>
                    <option value="padStart">padStart(len, fill)</option>
                    <option value="padEnd">padEnd(len, fill)</option>
                    <option value="repeat">repeat(n)</option>
                    <option value="localeCompare">localeCompare(str)</option>
                </select>

                {showFirstParam && (
                    <input
                        type="text"
                        placeholder="Param 1"
                        value={param1}
                        onChange={(e) => setParam1(e.target.value)}
                        className={styles.paramInput}
                    />
                )}

                {showSecondParam && (
                    <input
                        type="text"
                        placeholder="Param 2"
                        value={param2}
                        onChange={(e) => setParam2(e.target.value)}
                        className={styles.paramInput}
                    />
                )}
            </div>

            <button className={styles.btn} onClick={handleRun}>
                Run
            </button>

            <div className={styles.output}>
                <strong>Output:</strong> {output}
            </div>
        </div>
    );
}
