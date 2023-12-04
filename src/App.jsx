import { useState } from 'react';
import { useEffect } from 'react';
import { Input } from './components/forms/Input.jsx';
import { Number } from './components/forms/Number.jsx';
import { CardList } from './components/main/CardList.jsx';

const color = '#00895A';

function App() {
	const [search, setSearch] = useState('');

	const [completeList, setCompleteList] = useState(['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'command', 'datalist', 'dd', 'del', 'details', 'dfn', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'map', 'mark', 'menu', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr']);
	const [list, setList] = useState([]);

	let isEmpty = false;

	useEffect(() => {
		const keyDownHandler = (event) => {
			let inputSearch = document.getElementById('input').value.trim();

			if (event.key === 'Enter') {
				if (completeList.includes(inputSearch)) {
					if (!list.includes(inputSearch)) {
						list.push(inputSearch);
						setList(list);
						isEmpty = true;
						setSearch('');
					}
				}
			}
		};

		document.addEventListener('keydown', keyDownHandler);

		return () => {
			document.removeEventListener('keydown', keyDownHandler);
		};
	}, []);

	return (
		<>
			<span role="group" style={{ display: 'flex' }}>
				<Input value={search} onChange={setSearch} placeholder="Rechercher..." empty={isEmpty} />
				<Number value={list.length} totalValue={completeList.length} />
			</span>
			<ContainerList value={list} />
		</>
	);
}

function ContainerList({ value }) {
	let elementList = [];

	for (let element of value) {
		elementList.push(<CardList element={element} key={element} color={color} />);
	}

	return (
		<article id="box">
			<div style={{ display: 'flex', flexWrap: 'wrap' }}>{elementList}</div>
		</article>
	);
}

export default App;
