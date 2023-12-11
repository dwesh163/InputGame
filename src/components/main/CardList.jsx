export function CardList({ element, colorClass, setActiveObject, setShowModal, info, className, errorTag }) {
    if (info != undefined) {
        let tag = info['element'];
        let url = info['url'];
        let description = info['description'];
        let isBlinking = ""

        if (tag == errorTag) {
            isBlinking = "blinking"
        }

        return (
            <article
                style={{ borderRadius: '0px' }}
                id={tag}
                className={`${className} ${isBlinking} cardList ${colorClass}`}
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
