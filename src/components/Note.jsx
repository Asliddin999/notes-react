import { useContext } from 'react';
import { deleteIcon, editIcon } from '../utils/exportImg';
import clsx from 'clsx';
import { TodoContext } from '../context/Context';

const Note = ({ note, view }) => {
	const { changeHandler, deleteNoteHandler } = useContext(TodoContext);

	const notesTopClass = clsx('note__top', { active: !view });
	return (
		<div className='note'>
			<div className={notesTopClass}>
				<h2 className='note__top-title'>{note.title}</h2>
				<span className='note__top-date'>{note.date}</span>
			</div>
			<p className='note__text'>{note.text}</p>
			<div className='note__btns'>
				<div className='note__btn purple' onClick={() => changeHandler(note)}>
					<img src={editIcon} alt='' />
					<span>Edit</span>
				</div>
				<div
					className='note__btn red'
					onClick={() => deleteNoteHandler(note.id)}
				>
					<img src={deleteIcon} alt='' />
					<span>Delete</span>
				</div>
			</div>
		</div>
	);
};

export default Note;
