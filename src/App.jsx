import { useState, useEffect } from 'react';
import { Input } from './components/forms/Input.jsx';
import { Number } from './components/forms/Number.jsx';
import { CardList } from './components/main/CardList.jsx';

let currentGame = localStorage.getItem('inputGameCurrent');

if (currentGame == undefined) {
    localStorage.setItem('inputGameCurrent', 'html');
    currentGame = 'html';
}

async function fetchJSON() {

    const response = await fetch('./json/' + currentGame + '.json')
    const data = await response.json()
    localStorage.setItem("inputGameData", JSON.stringify(data))
    if (JSON.parse(localStorage.getItem("inputGameData")) != JSON.parse(data)) {
        location.reload()
    }
}

fetchJSON()

function App() {
    const [data, setData] = useState(JSON.parse(localStorage.getItem("inputGameData"))); // Initialize state with null or an appropriate initial value

    const [search, setSearch] = useState('');
    const [viewFull, setViewFull] = useState(false);

    let completeDataList = [];

    for (const element of data['data']) {
        completeDataList.push(element['element']);
    }

    console.log(completeDataList);

    const [list, setList] = useState([]);
    const [completeList, setCompleteList] = useState(completeDataList);

    let isEmpty = false;

    const handleToggle = () => {
        setViewFull(true);
    };

    useEffect(() => {
        const keyDownHandler = (event) => {
            let inputSearch = document.getElementById('input').value.trim();

            if (event.key === 'Enter') {
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
    }, []);

    return (
        <>
            <span role="group" style={{ display: 'flex' }}>
                <Input value={search} onChange={setSearch} placeholder="Rechercher..." empty={isEmpty} />
                <button onClick={handleToggle}>Show answers</button>
                <Number value={list.length} totalValue={completeList.length} />
            </span>
            <ContainerList value={list} completeList={completeList} viewFull={viewFull} data={data['data']} />
        </>
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
            <article>
                <header style={{ padding: '12px 22px' }}>
                    <h2 style={{ marginBottom: '0px' }}>{tag}</h2>
                </header>
                <p>{description}</p>
                <a href={url}>{url}</a>
                <button onClick={() => setShowModal(false)}>Close me</button>
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

    console.log(activeObject);

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
