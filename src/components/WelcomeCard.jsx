export function WelcomeCard({ optionsData }) {
    let cardList = [];

    for (const iterator of optionsData['choiceList']) {
        const setCurrent = () => {
            localStorage.setItem('inputGameCurrent', iterator['json']);
        };

        cardList.push(
            <section onClick={setCurrent} className={`choiceCard ${iterator['json']}`} key={iterator['json']}>
                <span>{iterator['name']}</span>
                <img src={iterator['img']} alt="" />
            </section>
        );
    }

    return <div className="choiceBox">{cardList}</div>;
}
