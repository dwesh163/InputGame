export function CardList({ element, colorClass }) {

    return (
        <article style={{ borderRadius: '0px'}} className={"cardList " + colorClass}>
            {element}
        </article>
    );
}
