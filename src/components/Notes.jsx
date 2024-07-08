import { useState } from 'react';
import { listIcon, gridIcon } from '../utils/exportImg';
import Note from './Note';
import clsx from 'clsx';

const Notes = ({ notes }) => {
	const [view, setView] = useState(true);
	const btnIcon = view ? listIcon : gridIcon;
	const spanText = view ? 'List' : 'Grid';
	const notesListClass = clsx('notes__list', { active: !view });

	return (
		<div className='notes'>
			<div className='container'>
				<div className='notes__top'>
					<h2 className='notes__top-title'>
						{notes.length ? 'All notes' : 'No notes'}
					</h2>
					<a
						href='#!'
						className='notes__top-btn'
						onClick={() => setView(!view)}
					>
						<img src={btnIcon} alt='' />
						<span>{spanText}</span>
					</a>
				</div>
				<div className={notesListClass}>
					{notes.map(note => (
						<Note
							key={note.id}
							note={note}
							view={view}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Notes;
