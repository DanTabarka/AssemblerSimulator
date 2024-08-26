import './style.css';
import { useEffect, useState } from 'react';

function LineNumbers({ code, scrollTop }) {

    const [counting, setCounting] = useState("1.\n");

    useEffect(() => {
        updateLineNumbers(code);
    }, [code]);

    function updateLineNumbers(code) {
        const linesCount = code.split("\n").length;

        let newCounting = "";
        for (let i = 1; i <= linesCount; i++) {
            newCounting += i + ".\n";
        }

        setCounting(newCounting);
    }

    

    return (
        <>
            <div className="line-numbers" style={{ transform: `translateY(-${scrollTop}px)` }}>
                {counting.split('\n').map((line, index) => (
                    <div key={index}>{line}</div>
                ))}
            </div>
        </>
    );
}

export default LineNumbers;
