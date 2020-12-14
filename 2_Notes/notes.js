const getNotes = () => {
	let notes = [];
	const localNotes = localStorage.getItem('notes');
	if (localNotes) {
		notes = JSON.parse(localNotes);
	}
	return notes;
};

const saveNotes = () => {
	localStorage.setItem('notes', JSON.stringify(notes));
};

const notes = getNotes();

const createNote = () => {
	const title = document.getElementById('new-note-title').value;
	const body = document.getElementById('new-note-body').value;
	const color = document.getElementById('new-note-color').value;
	const note = {
		title,
		body,
		color,
		created: new Date(),
		pinned: false,
	};
	notes.push(note);
	saveNotes();
	drawNotes();
};

const deleteNote = (noteIndex) => {
	notes.splice(noteIndex, 1);
	saveNotes();
	drawNotes();
};

const togglePinNote = (noteIndex) => {
	notes[noteIndex].pinned = !notes[noteIndex].pinned;
	saveNotes();
	drawNotes();
};

const drawNotes = () => {
	const notesElement = document.getElementById('notes');
	notesElement.innerHTML = '';
	const notesPinnedElement = document.getElementById('notes-pinned');
	notesPinnedElement.innerHTML = '';

	notes.forEach((note, index) => {
		const noteElement = document.createElement('div');
		noteElement.innerHTML += `
      <div class="note" style="background-color: ${note.color}">
        <span class="pin" onclick="togglePinNote(${index})">pin</span>
        <span class="delete" onclick="deleteNote(${index})">delete</span>
        <p class="date">${note.created}</p>
        <h2 class="title">${note.title}</h2>
        <p class="body">${note.body}</p>
      </div>
    `;
		if (note.pinned) notesPinnedElement.appendChild(noteElement);
		else notesElement.appendChild(noteElement);
	});
};

drawNotes();
