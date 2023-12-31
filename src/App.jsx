import { useState, useEffect } from 'react';
import { Input } from './components/forms/Input.jsx';
import { Number } from './components/forms/Number.jsx';
import { ContainerList } from './components/main/ContainerList.jsx';
import { Setting } from './components/Settings/Setting.jsx';
import { NavComponents } from './components/NavComponents.jsx';
import { FooterComponents } from './components/FooterComponents.jsx';
import { Timer } from './components/forms/Timer.jsx';
import { WelcomeCard } from './components/WelcomeCard.jsx';

let currentGame = localStorage.getItem('inputGameCurrent');

const url = new URL(window.location.href);

if (url.searchParams.get('g') != null) {
    localStorage.setItem('inputGameCurrent', url.searchParams.get('g'));
    currentGame = url.searchParams.get('g');
}

if (currentGame == undefined) {
    localStorage.setItem('inputGameCurrent', 'html');
    currentGame = 'html';
}

fetch(`./data/${currentGame}.json`)
    .then((response) => response.json())
    .then((data) => {
        let localData = JSON.parse(localStorage.getItem('inputGameSettings'));
        if (localData == null) {
            localData = {};
        }

        if (localData[currentGame] == null) {
            localData[currentGame] = data['options'];
            localStorage.setItem('inputGameSettings', JSON.stringify(localData));
            localData = JSON.parse(localStorage.getItem('inputGameSettings'));
            location.reload();
        }
    });

function App() {
    let completeDataList = [];
    let isEmpty = false;

    const [list, setList] = useState([]);
    const [completeList, setCompleteList] = useState([]);
    const [search, setSearch] = useState('');
    const [viewFull, setViewFull] = useState(false);
    const [data, setData] = useState(null);
    const [optionData, setOptionData] = useState(null);

    const [errorList, setErrorList] = useState([]);
    const [error, setError] = useState([]);

    const [errorTag, setErrorTag] = useState('');

    const [isLoading, setIsLoading] = useState(true);
    const [isSettings, setIsSettings] = useState(false);
    const [isWelcome, setIsWelcome] = useState(true);

    const [buttonText, setButtonText] = useState('Show answers');

    useEffect(() => {
        setIsLoading(true);
        fetch(`./data/${currentGame}.json`)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                let localData = JSON.parse(localStorage.getItem('inputGameSettings'));
                if (localData == null) {
                    localData = {};
                }

                if (localData[currentGame] == null) {
                    localData[currentGame] = data['options'];
                    localStorage.setItem('inputGameSettings', JSON.stringify(localData));
                    localData = JSON.parse(localStorage.getItem('inputGameSettings'));
                }
            });
        fetch('./data/options.json')
            .then((response) => response.json())
            .then((data) => {
                setOptionData(data);
                setIsLoading(false);
            });
    }, []);

    const [timer, setTimer] = useState(0);
    useEffect(() => {
        try {
            setTimer(JSON.parse(localStorage.getItem('inputGameSettings'))[currentGame]['timer-value']);
        } catch (error) {}
    }, [data]);

    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        setIsLoading(true);
    }, []);

    useEffect(() => {
        if (data) {
            for (const element of data['data']) {
                try {
                    if (Array.isArray(element['type'])) {
                        for (const type of element['type']) {
                            if (JSON.parse(localStorage.getItem('inputGameSettings'))[localStorage.getItem('inputGameCurrent')]['type']['select'].includes(type) && !completeDataList.includes(element['element'])) {
                                completeDataList.push(element['element']);
                            }
                        }
                    } else {
                        if (JSON.parse(localStorage.getItem('inputGameSettings'))[localStorage.getItem('inputGameCurrent')]['type']['select'].includes(element['type']) && !completeDataList.includes(element['element'])) {
                            completeDataList.push(element['element']);
                        }
                    }
                } catch (error) {
                    let localData = JSON.parse(localStorage.getItem('inputGameSettings'));

                    localData[currentGame] = data['options'];
                    localStorage.setItem('inputGameSettings', JSON.stringify(localData));
                    localData = JSON.parse(localStorage.getItem('inputGameSettings'));
                }
            }
            setCompleteList(completeDataList);
        }
    }, [data, localStorage.getItem('inputGameSettings')]);

    useEffect(() => {
        const keyDownHandler = (event) => {
            let inputSearch = document.getElementById('input').value.trim();
            const settings = JSON.parse(localStorage.getItem('inputGameSettings'))[localStorage.getItem('inputGameCurrent')];

            if (event.key === 'Enter') {
                if (settings['case-sensitive']) {
                    if (completeList.includes(inputSearch) && !list.includes(inputSearch)) {
                        if (settings['answers-sort'] == 3) {
                            list.unshift(inputSearch);
                        } else {
                            list.push(inputSearch);
                        }
                        setList(list);
                        isEmpty = true;
                        setSearch('');
                    } else if (list.includes(inputSearch)) {
                        window.location.href = `#${inputSearch}`;
                        setErrorTag(inputSearch);
                        isEmpty = true;
                        setSearch('');
                    } else if (!error.includes(inputSearch) && inputSearch != '') {
                        error.push(inputSearch);
                        setErrorList(error);
                        isEmpty = true;
                        setSearch('');
                    }
                } else {
                    const lowerCaseCompleteList = completeList.map((item) => item.toLowerCase());
                    const upperCaseCompleteList = completeList.map((item) => item.toUpperCase());

                    const lowerCaseList = list.map((item) => item.toLowerCase());
                    const upperCaseList = list.map((item) => item.toUpperCase());

                    if (upperCaseCompleteList.includes(inputSearch.toUpperCase()) || lowerCaseCompleteList.includes(inputSearch.toLowerCase())) {
                        if (!upperCaseList.includes(inputSearch.toUpperCase()) && !lowerCaseList.includes(inputSearch.toLowerCase())) {
                            let info = data['data'].find(({ element }) => element.toLowerCase() === inputSearch.toLowerCase());
                            if (settings['answers-sort'] == 3) {
                                list.unshift(info['element']);
                            } else {
                                list.push(info['element']);
                            }
                            setList(list);
                            isEmpty = true;
                            setSearch('');
                        } else {
                            let info = data['data'].find(({ element }) => element.toLowerCase() === inputSearch.toLowerCase());
                            window.location.href = `#${info['element']}`;
                            setErrorTag(info['element']);
                            isEmpty = true;
                            setSearch('');
                        }
                    } else {
                        if (!error.includes(inputSearch) && inputSearch != '') {
                            error.push(inputSearch);
                            setErrorList(error);
                        }
                        isEmpty = true;
                        setSearch('');
                    }
                }
            }
        };
        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [completeList]);

    const url = new URL(window.location.href);

    useEffect(() => {
        if (url.searchParams.get('g') != null) {
            localStorage.setItem('inputGameCurrent', url.searchParams.get('g'));
            setIsSettings(false);
            setIsWelcome(false);
        }
    }, [url.searchParams.get('g')]);

    const handleToggle = () => {
        setViewFull(!viewFull);
        if (!viewFull) {
            setButtonText('restart');
        } else {
            setButtonText('Show answers');
        }
    };

    useEffect(() => {
        if (!viewFull) {
            setList([]);
            setErrorTag('');
            setErrorList([]);
            setIsSettings(false);
            setError([]);
            setTimer(JSON.parse(localStorage.getItem('inputGameSettings'))[currentGame]['timer-value']);
            setIsRunning(false);
        }
    }, [viewFull]);

    const settingToggle = () => {
        setIsSettings(!isSettings);
    };

    const welcomeToggle = () => {
        if (isWelcome) {
            window.location.href = `?g=${localStorage.getItem('inputGameCurrent')}`;
        } else {
            history.back();
        }
    };

    useEffect(() => {
        if (list.length == completeList.length && !isWelcome && !isSettings && !isLoading) {
            alert("Well done you've found them all");
            setList([]);
            setErrorTag('');
            setErrorList([]);
            setIsSettings(false);
            setError([]);
            setViewFull(false);
            setTimer(JSON.parse(localStorage.getItem('inputGameSettings'))[currentGame]['timer-value'] + 1);
            setIsRunning(false);
        }
    }, [search]);

    let settings = JSON.parse(localStorage.getItem('inputGameSettings'))[currentGame];

    let displayList = [];
    displayList = list;

    if (settings['answers-sort'] == 0) {
        displayList.sort();
    } else if (settings['answers-sort'] == 1) {
        displayList.sort();
        displayList.reverse();
    }

    return (
        <>
            <NavComponents onClick={settingToggle} isSettings={isSettings} isWelcome={isWelcome} />

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {isWelcome ? (
                        <WelcomeCard optionsData={optionData} onClick={welcomeToggle} />
                    ) : (
                        <main className="container">
                            <div id="root">
                                <Timer isSettings={isSettings} handleToggle={handleToggle} timer={timer} setTimer={setTimer} isRunning={isRunning} setIsRunning={setIsRunning} />
                                <div>
                                    <>
                                        {isSettings ? (
                                            <Setting options={data['options']} optionsData={optionData} />
                                        ) : (
                                            <>
                                                {data && (
                                                    <>
                                                        <span role="group" style={{ display: 'flex' }}>
                                                            <Input value={search} onChange={setSearch} placeholder="Rechercher..." empty={isEmpty} />
                                                            <button style={{ width: '300px' }} onClick={handleToggle}>
                                                                {buttonText}
                                                            </button>
                                                            <Number value={list.length} totalValue={completeList.length} />
                                                        </span>
                                                        <ContainerList value={displayList} completeList={completeList} viewFull={viewFull} data={data['data']} errorTag={errorTag} />
                                                        <ContainerList value={errorList} viewFull={false} data={data['data']} isError={true} />
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </>
                                </div>
                            </div>
                        </main>
                    )}
                </>
            )}
            <FooterComponents />
        </>
    );
}

export default App;
