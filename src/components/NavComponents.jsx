import { Timer } from './forms/Timer.jsx';

export function NavComponents({ onClick, isSettings }) {
    const settings = JSON.parse(localStorage.getItem('inputGameSettings'))[localStorage.getItem('inputGameCurrent')];

    return (
        <nav style={{ padding: '0px 30px', marginTop: '15px' }}>
            <div className="logo">
                <div style={{ display: 'flex' }}>
                    <img src="./logo.png" alt="" />
                    <h1 className="text-white fw-bold fst-italic">InputGame</h1>
                </div>
            </div>

            {!isSettings ? settings['timer'] ? <Timer /> : <></> : <></>}

            <div className="settingLogo" onClick={onClick}>
                {isSettings ? <img src="./exit.svg" alt="" /> : <img src="./settings.svg" alt="" />}
            </div>
        </nav>
    );
}
