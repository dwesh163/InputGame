import { useState } from 'react';

export function WelcomeCard({ optionsData, onClick }) {
    let cardList = [];
    const [showModal, setShowModal] = useState(false);
    const [activeObject, setActiveObject] = useState(null);

    function getClass(index) {
        return index === activeObject?.id ? 'active' : 'inactive';
    }

    const Modal = ({ object: { name, description, img, setCurrent } }) => (
        <dialog open id="productModal" className="active">
            <article style={{ paddingBottom: '20px', width: '100%', overflow: 'hidden' }}>
                <header style={{ padding: '0px', height: '167px', width: '700px', overflow: 'hidden', marginBottom: '20px' }}>
                    <img src={img} alt="" style={{ width: '800px' }} />
                </header>
                <div className="modalMain">
                    <h1 style={{ marginBottom: '2px', verticalAlign: 'baseline' }}>{name}</h1>
                    <p>{description}</p>
                    <br />
                    <button className="closeButton" onClick={() => setCurrent()}>
                        Play
                    </button>
                    <button style={{ marginLeft: '12px' }} className="closeButton" onClick={() => setShowModal(false)}>
                        Close
                    </button>
                </div>
            </article>
        </dialog>
    );

    for (const iterator of optionsData['choiceList']) {
        let name = iterator['name'];
        let description = iterator['description'];
        let img = iterator['img'];

        const setCurrent = () => {
            localStorage.setItem('inputGameCurrent', iterator['json']);
            onClick();
        };

        cardList.push(
            <section
                onClick={() => {
                    setActiveObject({ name, description, img, setCurrent });
                    setShowModal(true);
                }}
                className={`choiceCard ${getClass(name)} ${iterator['json']}`}
                key={iterator['json']}>
                <span>{iterator['name']}</span>
                <img src={iterator['img']} alt="" />
            </section>
        );
    }

    // onClick={setCurrent}

    return (
        <>
            <section className="welcomeBox">
                <h3>Welcome to InputGame</h3>
                <h5>Your interactive platform dedicated to learning through play, highlighting subjects such as HTML. Explore customizable features, discover one-click answers, and enjoy an immersive experience with options tailored to your learning or entertainment preferences.</h5>
                <div className="choiceBox">{cardList}</div>
            </section>
            {showModal ? <Modal object={activeObject} /> : null}
        </>
    );
}
