import { useState, useEffect } from 'react';
import { Input } from './components/forms/Input.jsx';
import { Number } from './components/forms/Number.jsx';
import { ContainerList } from './components/main/ContainerList.jsx';
import { Setting } from './components/Settings/Setting.jsx';
import { NavComponents } from './components/NavComponents.jsx';
import { FooterComponents } from './components/FooterComponents.jsx';
import { Timer } from './components/forms/Timer.jsx';
import { render } from 'react-dom';
import { WelcomeCard } from "./components/WelcomeCard.jsx"

let currentGame = localStorage.getItem('inputGameCurrent');

if (currentGame == undefined) {
    localStorage.setItem('inputGameCurrent', 'html');
    currentGame = 'html';
}

function App() {
    let completeDataList = [];
    let isEmpty = false;

    const [list, setList] = useState([]);
    const [completeList, setCompleteList] = useState([]);
    const [search, setSearch] = useState('');
    const [viewFull, setViewFull] = useState(false);
    const [data, setData] = useState(null);
    const [optionData, setOptionData] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isSettings, setIsSettings] = useState(false);
    const [isWelcome, setIsWelcome] = useState(true);

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
        fetch('./data/option.json')
            .then((response) => response.json())
            .then((data) => {
                setOptionData(data);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        setIsLoading(true);
    }, []);

    useEffect(() => {
        if (data) {
            for (const element of data['data']) {
                completeDataList.push(element['element']);
            }
            setCompleteList(completeDataList);
        }
    }, [data]);

    useEffect(() => {
        const keyDownHandler = (event) => {
            let inputSearch = document.getElementById('input').value.trim();
            const settings = JSON.parse(localStorage.getItem('inputGameSettings'))[localStorage.getItem('inputGameCurrent')];

            if (event.key === 'Enter') {
                if (settings['case-sensitive']) {
                    if (completeList.includes(inputSearch) && !list.includes(inputSearch)) {
                        list.push(inputSearch);
                        setList(list);
                        isEmpty = true;
                        setSearch('');
                    }
                } else {
                    const lowerCaseCompleteList = completeList.map(item => item.toLowerCase());
                    const upperCaseCompleteList = completeList.map(item => item.toUpperCase());

                    if (upperCaseCompleteList.includes(inputSearch.toUpperCase()) || lowerCaseCompleteList.includes(inputSearch.toLowerCase())) {
                        if (!list.includes(inputSearch.toUpperCase()) && !list.includes(inputSearch.toLowerCase())) {
                            let info = data['data'].find(({ element }) => element.toLowerCase() === inputSearch.toLowerCase());
                            list.push(info["element"]);
                            setList(list);
                            isEmpty = true;
                            setSearch('');
                        }
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
        if(url.searchParams.get('p')  == "game"){
                setIsSettings(false);
                setIsWelcome(false)
        }

    }, [url.searchParams.get('p')])

    const handleToggle = () => {
        setViewFull(true);
    };

    const settingToggle = () => {
        setIsSettings(!isSettings)
    };

    const welcomeToggle = () => {
        if(isWelcome){
            window.location.href="?p=game"
        }
        else {
            history.back()
        }
    };

    return (
        <>
            <NavComponents onClick={settingToggle} isSettings={isSettings} isWelcome={isWelcome} />
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {isWelcome ? (
                        <WelcomeCard optionsData={optionData} onClick={welcomeToggle}/>
                    ) : (
                        <main className="container">
                            <div id="root">
                                <Timer isSettings={isSettings} handleToggle={handleToggle} />
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
                                                            <button onClick={handleToggle}>Show answers</button>
                                                            <Number value={list.length} totalValue={completeList.length} />
                                                        </span>
                                                        <ContainerList value={list} completeList={completeList} viewFull={viewFull} data={data['data']} />
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
