import packageJson from '/package.json';

export function FooterComponents() {
    return (
        <>
            <hr style={{ margin: '0px' }} />
            <footer>
                <a href="https://github.com/dwesh163/InputGame/" target="_blank">
                    InputGame
                </a>{' '}
                by{' '}
                <a href="https://github.com/dwesh163" target="_blank">
                    dwesh163
                </a>
                {' ― '}
                <a href={`https://github.com/dwesh163/InputGame/releases/tag/v${ packageJson.version }`} target="_blank">
                    version { packageJson.version }
                </a>
                {' ― '}
                <a href="https://github.com/dwesh163/InputGame/issues" target="_blank">
                    contribute
                </a>
            </footer>
        </>
    );
}
