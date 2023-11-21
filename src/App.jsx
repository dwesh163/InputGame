import { useState } from 'react';
import { Input } from './components/forms/Input.jsx';

function App() {
	const [search, setSearch] = useState('');

	return (
		<div className="box">
			<div className="top">
				<Input value={search} onChange={setSearch} placeholder="Rechercher..." />
			</div>{' '}
		</div>
	);
}

export default App;
