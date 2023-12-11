export function WelcomeCard({ optionsData, onClick }) {
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

    return (
        <section className="welcomeBox">
            <h3>Welcome to InputGame</h3>
            <h5>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus quisquam distinctio voluptatum atque voluptatem error, nobis eos ut maiores perspiciatis? Maiores, eligendi eos!
                Delectus expedita iusto voluptatibus et numquam unde.
            </h5>
            <div className="choiceBox" onClick={onClick}>{cardList}</div>
        </section>
    );
}
