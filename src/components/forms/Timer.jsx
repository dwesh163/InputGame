import { useEffect, useState } from 'react';

export function Timer({ isSettings }) {
    const settings = JSON.parse(localStorage.getItem('inputGameSettings'))[localStorage.getItem('inputGameCurrent')];

    const [timer, settimer] = useState(settings['timer-value']);
    const [isRunning, setIsRunning] = useState(false);

    function toTimeString(totalSeconds) {
        const totalMs = totalSeconds * 1000;
        const result = new Date(totalMs).toISOString().slice(11, 19);

        return result;
    }

    useEffect(() => {
        const keyDownHandler = (event) => {
            setIsRunning(true);
        };
        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    });

    useEffect(() => {
        if (isRunning) {
            setInterval(() => {
                settimer(count => count - 1)
            }, 1000);
        }
    }, [isRunning]);

    return <>{!isSettings ? settings['timer'] ? <h1 className="timer">{toTimeString(timer)}</h1> : <></> : <></>}</>;
}
