import { useState, useEffect } from 'react';
import { Input } from './components/forms/Input.jsx';
import { Number } from './components/forms/Number.jsx';
import { ContainerList } from './components/main/ContainerList.jsx';
import { Setting } from './components/Settings/Setting.jsx';

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

            if (event.key === 'Enter') {
                if (completeList.includes(inputSearch)) {
                    if (!list.includes(inputSearch)) {
                        list.push(inputSearch);
                        setList(list);
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

    const handleToggle = () => {
        setViewFull(true);
    };

    const settingToggle = () => {
        setIsSettings(!isSettings);
    };

    return (
        <>
            <nav style={{ padding: '0px 30px', marginTop: '15px' }}>
                <div className="logo">
                    <div style={{ display: 'flex' }}>
                        <img src="./logo.png" alt="" />
                        <h1 className="text-white fw-bold fst-italic">InputGame</h1>
                    </div>
                </div>
                <div className="settingLogo" onClick={settingToggle}>
                    {isSettings ? <img src="./exit.svg" alt="" /> : <img src="./settings.svg" alt="" />}
                </div>
            </nav>
            <main className="container">
                <div id="root">
                    <div>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
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
                        )}
                    </div>
                </div>
            </main>
            <hr style={{ margin: '0px' }} />
            <footer style={{ color: '#c7c7c7' }}>
                <a style={{ textDecoration: 'none', color: '#c7c7c7' }} href="https://github.com/dwesh163/InputGameReact/issues" target="_blank">
                    feature/request
                </a>{' '}
                -
                <a style={{ textDecoration: 'none' }} target="_blank" href="https://github.com/dwesh163">
                    @dwesh163
                </a>{' '}
                - v2.0.3
            </footer>
        </>
    );
}

export default App;
