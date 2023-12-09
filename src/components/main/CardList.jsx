export function CardList({ element, colorClass, setActiveObject, setShowModal, info, className}) {

	let tag = info["element"]
	let url = info["url"]
	let description = info["description"]

    let type = info["type"]

    return (
        <article
            style={{ borderRadius: '0px' }}
            className={`${className} cardList ${colorClass} ${type}`}
            onClick={() => {
                setActiveObject({ tag, description, url });
                setShowModal(true);
            }}>
            {element}
        </article>
    );
}
