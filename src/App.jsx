import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Modal from './components/Modal';
import Notes from './components/Notes';
import { editIcon } from './utils/exportImg';
import './assets/styles/main.scss';
import { TodoContext } from './context/Context';

function App() {
	const setLS = () => (localStorage.notes = JSON.stringify(notes));
	const getLS = () =>
		localStorage.notes ? JSON.parse(localStorage.notes) : [];

	const [notes, setNotes] = useState(getLS);
	const [isModalOpen, setModalOpen] = useState(false);
	const [isEdit, setEdit] = useState(false);
	const [editNote, setEditNote] = useState(null);
	const [searching, setSearching] = useState('');
	const filteredNotes = notes.filter(note =>
		note.title.toLowerCase().includes(searching.toLowerCase())
	);

	const openModalHandler = () => {
		setModalOpen(true);
		setEdit(false);
		setEditNote(null);
	};
	const closeModalHandler = () => {
		setModalOpen(false);
	};
	const addOrChangeNoteHandler = note => {
		if (editNote?.id) {
			notes.forEach((item, i) => {
				if (item.id == note.id) {
					notes.splice(i, 1, note);
				}
			});
			setLS();
		} else {
			setNotes([...notes, note]);
		}
	};
	const deleteNoteHandler = id => {
		setNotes(notes.filter(item => item.id != id));
	};
	const changeHandler = note => {
		setEditNote(note);
		setEdit(true);
		setModalOpen(true);
	};
	const setSearchingHandler = value => {
		setSearching(value);
	};

	useEffect(() => {
		setLS();
	}, [notes]);

	return (
		<TodoContext.Provider
			value={{
				setSearchingHandler,
				deleteNoteHandler,
				changeHandler,
				addOrChangeNoteHandler,
				closeModalHandler,
			}}
		>
			<div className='wrapper'>
				<Navbar />
				{isModalOpen && <Modal editNote={editNote} isEdit={isEdit} />}
				<Notes notes={filteredNotes} />
				{!isModalOpen && (
					<div className='add' onClick={() => openModalHandler()}>
						<img src={editIcon} alt='' />
					</div>
				)}
			</div>
		</TodoContext.Provider>
	);
}
export default App;
