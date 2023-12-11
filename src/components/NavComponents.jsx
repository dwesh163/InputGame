export function NavComponents({ onClick, isSettings, isWelcome }) {
    const url = new URL(window.location.href);

    return (
        <nav style={{ padding: '0px 30px', marginTop: '15px' }}>
            <div className="logo" onClick={(e) => (window.location.href = url.origin + url.pathname)}>
                <div style={{ display: 'flex' }}>
                    <img src="./logo.png" alt="" />
                    <h1 className="text-white fw-bold fst-italic">InputGame</h1>
                </div>
            </div>
            {!isWelcome ? (
                <div className="settingLogo" onClick={onClick}>
                    {isSettings ? <img src="./exit.svg" alt="" /> : <img src="./settings.svg" alt="" />}
                </div>
            ) : (
                <></>
            )}
        </nav>
    );
}
