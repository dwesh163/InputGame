export function CardList({ element, colorClass, setActiveObject, setShowModal, info, className }) {
    if (info != undefined) {
        let tag = info['element'];
        let url = info['url'];
        let description = info['description'];

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
    } else {
        return (
            <article style={{ borderRadius: '0px' }} className={`${className} cardList ${colorClass}`}>
                {element}
            </article>
        );
    }
}
