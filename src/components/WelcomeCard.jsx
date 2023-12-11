export function WelcomeCard({ optionsData, onClick }) {
    let cardList = [];

    for (const iterator of optionsData['choiceList']) {
        const setCurrent = () => {
            localStorage.setItem('inputGameCurrent', iterator['json']);
            onClick();
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
            <h3>
                Welcome to InputGame
            </h3>
            <h5>
                Your interactive platform dedicated to learning through play, highlighting subjects such as HTML. Explore customizable features, discover one-click answers, and enjoy an immersive
                experience with options tailored to your learning or entertainment preferences.
            </h5>
            <div className="choiceBox">{cardList}</div>
        </section>
    );
}
