import { useEffect, useState, useRef, useContext } from 'react';
import { closeIcon, searchIcon, backIcon } from '../utils/exportImg';
import { TodoContext } from '../context/Context';

const Navbar = () => {
	const { setSearchingHandler } = useContext(TodoContext);

	const [search, setSearch] = useState('');
	const [nav, setNav] = useState(true);
	const isMounted = useRef(false);

	useEffect(() => {
		if (isMounted.current) {
			setSearchingHandler(search);
		}
		isMounted.current = true;
	}, [search]);

	const reset = () => {
		setNav(!nav);
		setSearch('');
	};

	return (
		<header className='header'>
			{nav ? (
				<nav className='header__nav'>
					<select className='header__nav-lang'>
						<option value='ru'>RU</option>
						<option value='en'>EN</option>
					</select>
					<div className='header__nav-title'>Заметки</div>
					<a className='header__nav-search' onClick={() => setNav(!nav)}>
						<img src={searchIcon} alt='' />
					</a>
				</nav>
			) : (
				<nav className='header__search'>
					<a href='#!' className='header__back' onClick={reset}>
						<img src={backIcon} alt='' />
					</a>
					<input
						value={search}
						onChange={event => setSearch(event.target.value)}
						placeholder='Search...'
						type='text'
						className='header__input'
					/>
					<a href='#!' className='header__clear' onClick={() => setSearch('')}>
						<img src={closeIcon} alt='' />
					</a>
				</nav>
			)}
		</header>
	);
};

export default Navbar;
