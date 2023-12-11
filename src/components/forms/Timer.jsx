import { useEffect, useState } from 'react';

export function Timer({ isSettings, handleToggle }) {
    const settings = JSON.parse(localStorage.getItem('inputGameSettings'))[localStorage.getItem('inputGameCurrent')];

    const [timer, setTimer] = useState(settings['timer-value']);
    const [isRunning, setIsRunning] = useState(false);
    const [isAlert, setIsAlert] = useState(false);

    function toTimeString(totalSeconds) {
        if (totalSeconds === -1 && !isAlert) {
            setIsAlert(true)
            setIsRunning(false);
            setTimer(parseInt(settings['timer-value']));
            alert('Fin du temps');
            handleToggle()
        }
        const totalMs = totalSeconds * 1000;
        const result = new Date(totalMs).toISOString().slice(11, 19);

        return result;
    }

    useEffect(() => {
        const keyDownHandler = (event) => {
            if (!isRunning) {
                setIsRunning(true);
                setIsAlert(false)
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [isRunning]);

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

    return (
        <>
            {!isSettings ? (settings['timer'] ? <h1 className="timer">{toTimeString(timer)}</h1> : <></>) : <></>}
        </>
    );
}
