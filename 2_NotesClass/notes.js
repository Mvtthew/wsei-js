class Note {
	title = '';
	body = '';
	bg = '';
	pinned = false;

	constructor(title, body, bg, pinned = false) {
		this.title = title;
		this.body = body;
		this.bg = bg;
		this.pinned = pinned;
	}

	deleteNote() {
		notes.renderNotes();
	}

	togglePin() {
		this.pinned = !this.pinned;
		notes.saveNotesToLocalStorage();
		notes.renderNotes();
	}

	createNoteElement() {
		const noteElement = document.createElement('div');
		noteElement.classList.add('note');
		noteElement.style.backgroundColor = this.bg;
		noteElement.innerHTML = `
    <p class="title">${this.title}</p>
      <p class="body">${this.body}</p>
      <div class="options">
        <button class="delete">🧺</button>
        <button class="pin">📌</button>
      </div>
      `;
		this.initEvents(noteElement);
		return noteElement;
	}

	initEvents(noteElement) {
		noteElement.querySelector('.delete').addEventListener('click', () => {
			this.deleteNote();
		});
		noteElement.querySelector('.pin').addEventListener('click', () => {
			this.togglePin();
		});
	}

	renderNote() {
		const pinnedParent = document.getElementById('pinned');
		const otherParent = document.getElementById('other');

		if (this.pinned) {
			pinnedParent.appendChild(this.createNoteElement());
		} else {
			otherParent.appendChild(this.createNoteElement());
		}
	}
}

class NotesList {
	notes = [];

	constructor() {
		this.notes = this.getNotesFromLocalStorage();
		this.initCreateNoteForm();
		this.renderNotes();
	}

	getNotesFromLocalStorage() {
		let notes = [];
		const notesSchemasString = localStorage.getItem('notes');
		if (notesSchemasString) {
			const notesSchemas = JSON.parse(notesSchemasString);
			notesSchemas.forEach((noteSchema) => {
				notes.push(new Note(noteSchema.title, noteSchema.body, noteSchema.bg, noteSchema.pinned));
			});
		}
		return notes;
	}

	saveNotesToLocalStorage() {
		let notesSchemas = [];
		this.notes.forEach((note) => {
			notesSchemas.push({
				title: note.title,
				body: note.body,
				bg: note.bg,
				pinned: note.pinned,
			});
		});
		localStorage.setItem('notes', JSON.stringify(notesSchemas));
	}

	initCreateNoteForm() {
		document.getElementById('create-note').addEventListener('click', () => {
			this.createNewNote();
		});
	}

	createNewNote() {
		const title = document.getElementById('new-note-title').value;
		const body = document.getElementById('new-note-body').value;
		const bg = document.getElementById('new-note-bg').value;

		this.notes.push(new Note(title, body, bg));
		this.saveNotesToLocalStorage();
		this.renderNotes();
	}

	renderNotes() {
		const pinnedParent = document.getElementById('pinned');
		pinnedParent.innerHTML = '';
		const otherParent = document.getElementById('other');
		otherParent.innerHTML = '';
		this.notes.forEach((note) => {
			note.renderNote();
		});
	}
}

const notes = new NotesList();
