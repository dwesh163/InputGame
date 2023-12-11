import { useState } from 'react';
import { CardList } from './CardList.jsx';

export function ContainerList({ value, completeList, viewFull, data, isError }) {
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
                    <a href={url} target="_blank">
                        {url}
                    </a>
                    <br />
                    <button className="closeButton" onClick={() => setShowModal(false)}>
                        Close
                    </button>
                </div>
            </article>
        </dialog>
    );

    if (viewFull) {
        for (let DataElement of completeList) {
            if (value.includes(DataElement)) {
                colorClass = 'find';
            } else {
                colorClass = 'unfind';
            }

            let info = data.find(({ element }) => element === DataElement);

            elementList.push(
                <CardList
                    element={DataElement}
                    key={DataElement}
                    colorClass={colorClass}
                    setActiveObject={setActiveObject}
                    setShowModal={setShowModal}
                    className={getClass(DataElement)}
                    info={info}></CardList>
            );
        }
    } else {
        for (let DataElement of value) {
            if (!isError) {
                let info = data.find(({ element }) => element === DataElement);

                elementList.push(
                    <CardList
                        element={DataElement}
                        key={DataElement}
                        colorClass={colorClass}
                        setActiveObject={setActiveObject}
                        setShowModal={setShowModal}
                        className={getClass(DataElement)}
                        info={info}></CardList>
                );
            } else {
                elementList.push(<CardList element={DataElement} key={DataElement} colorClass={'error'} setActiveObject={setActiveObject}></CardList>);
            }
        }
    }

    return (
        <>
            {!isError ? (
                <>
                    <article id="box">
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>{elementList}</div>
                    </article>

                    {showModal ? <Modal object={activeObject} /> : null}
                </>
            ) : (
                <>
                    <article id="errorBox">
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {elementList}
                        </div>
                    </article>
                </>
            )}
        </>
    );
}
