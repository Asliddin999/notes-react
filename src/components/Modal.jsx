import { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoContext } from '../context/Context';

const Modal = ({ isEdit, editNote }) => {
	const { addOrChangeNoteHandler, closeModalHandler } = useContext(TodoContext);
	const [title, setTitle] = useState(editNote?.title ?? '');
	const [text, setText] = useState(editNote?.text ?? '');

	const addOrChange = () => {
		if (title.length > 2 && text.length > 2) {
			const note = {
				id: editNote?.id ?? uuidv4(),
				title: title,
				text: text,
				date: new Date().toLocaleDateString(),
			};
			addOrChangeNoteHandler(note);
			closeModalHandler();
		}
	};

	return (
		<div className='modal' onClick={closeModalHandler}>
			<div className='modal__block' onClick={event => event.stopPropagation()}>
				<h2 className='modal__title'>{isEdit ? 'Edit note' : 'Add note'}</h2>
				<div className='modal__inputs'>
					<label>
						<input
							type='text'
							placeholder='Title'
							value={title}
							onChange={event => setTitle(event.target.value)}
						/>
						<span>Title</span>
					</label>
					<label>
						<input
							type='text'
							placeholder='Content'
							value={text}
							onChange={event => setText(event.target.value)}
						/>
						<span>Content</span>
					</label>
				</div>
				<div className='modal__btns'>
					<a href='#' className='modal__btn red' onClick={closeModalHandler}>
						Cancel
					</a>
					<a href='#' className='modal__btn purple' onClick={addOrChange}>
						{isEdit ? 'Edit' : 'Add'}
					</a>
				</div>
			</div>
		</div>
	);
};

export default Modal;
