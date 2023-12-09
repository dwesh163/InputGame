import { useState, useEffect } from 'react';
import { Input } from './components/forms/Input.jsx';
import { Number } from './components/forms/Number.jsx';
import { ContainerList } from './components/main/ContainerList.jsx';
import { Setting } from './components/Settings/Setting.jsx';
import { NavComponents } from './components/NavComponents.jsx';
import { FooterComponents } from './components/FooterComponents.jsx';
import { Timer } from './components/forms/Timer.jsx';
import { render } from 'react-dom';

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
                    localData[currentGame] = data["options"];
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
                if (JSON.parse(localStorage.getItem("inputGameSettings"))[localStorage.getItem("inputGameCurrent")]["type"]["select"].includes(element['type'])) {
                    
                    completeDataList.push(element['element']);
                }
            }
            setCompleteList(completeDataList);
        }

    }, [data, localStorage.getItem("inputGameSettings")]);

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
                    if (completeList.includes(inputSearch.toUpperCase()) || completeList.includes(inputSearch.toLowerCase())) {
                        if (!list.includes(inputSearch.toUpperCase()) && !list.includes(inputSearch.toLowerCase())) {
                            list.push(inputSearch.toLowerCase());
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

    const handleToggle = () => {
        setViewFull(true);
    };

    const settingToggle = () => {
        setIsSettings(!isSettings);
    };

return (
    <>
        <NavComponents onClick={settingToggle} isSettings={isSettings} />
        {isLoading ? (
            <p>Loading...</p>
        ) : (
            <main className="container">
                <div id="root">
                    {isSettings ? (
                        <Setting options={data['options']} optionsData={optionData} />
                    ) : (
                        <>
                            <Timer isSettings={isSettings} />
                            <div>
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
                            </div>
                        </>
                    )}
                </div>
            </main>
        )}
        <FooterComponents />
    </>
);

}

export default App;
