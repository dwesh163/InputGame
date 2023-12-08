export function CardList({ element, colorClass, setActiveObject, setShowModal, info, className}) {

	let tag = info["element"]
	let url = info["url"]
	let description = info["description"]

    return (
        <article
            style={{ borderRadius: '0px' }}
            className={`${className} cardList ${colorClass}`}
            onClick={() => {
                setActiveObject({ tag, description, url });
                setShowModal(true);
            }}>
            {element}
        </article>
    );
}
