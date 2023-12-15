import { useEffect, useState } from 'react';

export function Timer({ isSettings, handleToggle, setTimer, timer }) {
    const settings = JSON.parse(localStorage.getItem('inputGameSettings'))[localStorage.getItem('inputGameCurrent')];

    const [isRunning, setIsRunning] = useState(false);
    const [isAlert, setIsAlert] = useState(false);

    function toTimeString(totalSeconds) {
        if (totalSeconds === -1 && !isAlert) {
            setIsAlert(true);
            setIsRunning(false);
            setTimer(parseInt(settings['timer-value']) + 1);
            alert('Fin du temps');
            handleToggle();
        }
        const totalMs = totalSeconds * 1000;
        const result = new Date(totalMs).toISOString().slice(11, 19);

        return result;
    }

    useEffect(() => {
        const keyDownHandler = (event) => {
            if (!isRunning) {
                setIsRunning(true);
                setIsAlert(false);
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    });

    useEffect(() => {
        let interval;

        if (isRunning) {
            interval = setInterval(() => {
                setTimer((count) => count - 1);
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isRunning]);

    return <>{!isSettings ? settings['timer'] ? <h1 className="timer">{toTimeString(timer)}</h1> : <></> : <></>}</>;
}
