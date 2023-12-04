export function CardList({ element, color }) {
    return (
        <article style={{ borderRadius: '0px', backgroundColor: color }} className="cardList">
            {element}
        </article>
    );
}
