import { useState, useEffect } from 'react';
import { Input } from './components/forms/Input.jsx';
import { Number } from './components/forms/Number.jsx';
import { CardList } from './components/main/CardList.jsx';

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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch('./json/html.json')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setIsLoading(false);
            });
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

            console.log(inputSearch);
            if (event.key === 'Enter') {
                console.log(completeList);

                if (completeList.includes(inputSearch)) {
                    if (true) {
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
    }, [data]);
    

    const handleToggle = () => {
        setViewFull(true);
    };

    return (
        <div>
            {isLoading && <p>Loading...</p>}
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
    );
}

function ContainerList({ value, completeList, viewFull, data }) {
    let elementList = [];
    let colorClass = 'find';

    const [showModal, setShowModal] = useState(false);
    const [activeObject, setActiveObject] = useState(null);

    function getClass(index) {
        return index === activeObject?.id ? 'active' : 'inactive';
    }

    const Modal = ({ object: { tag, description, url } }) => (
        <dialog open id="productModal" className="active">
            <article style={{ paddingBottom: '20px' }}>
                <header style={{ padding: '12px 22px', marginBottom: '6%' }}>
                    <h1 style={{ marginBottom: '8px', textAlign: 'center', verticalAlign: 'baseline' }}>{tag}</h1>
                </header>
                <div className="modalMain">
                    <p>{description}</p>
                    <a href={url}>{url}</a>
                    <br />
                    <button className="closeButton" onClick={() => setShowModal(false)}>
                        Close
                    </button>
                </div>
            </article>
        </dialog>
    );

    if (viewFull) {
        for (let htmlElement of completeList) {
            if (value.includes(htmlElement)) {
                colorClass = 'find';
            } else {
                colorClass = 'unfind';
            }

            let info = data.find(({ element }) => element === htmlElement);

            elementList.push(
                <CardList element={htmlElement} key={htmlElement} colorClass={colorClass} setActiveObject={setActiveObject} setShowModal={setShowModal} className={getClass(htmlElement)} info={info}>
                    {' '}
                </CardList>
            );
        }
    } else {
        for (let htmlElement of value) {
            let info = data.find(({ element }) => element === htmlElement);

            elementList.push(
                <CardList element={htmlElement} key={htmlElement} colorClass={colorClass} setActiveObject={setActiveObject} setShowModal={setShowModal} className={getClass(htmlElement)} info={info}>
                    {' '}
                </CardList>
            );
        }
    }

    return (
        <>
            <article id="box">
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>{elementList}</div>
            </article>

            {showModal ? <Modal object={activeObject} /> : null}
        </>
    );
}

export default App;
