import { journalSlice, addNewEmptyNote, setActiveNote, setActiveNoteById, setNotes, setSaving, updateNote, changeMessageSaved, setPhotosToActiveNote, resetState } from '@/store/journal/journalSlice';
import { Note } from '@/store/journal/journalSlice';

describe('journalSlice.test.ts', () => {
  const initialState = journalSlice.getInitialState();

  test('should return the initial state', () => {
    expect(initialState).toEqual({
      isSaving: false,
      messageSaved: '',
      notes: [],
      active: null,
    });
  });

  test('addNewEmptyNote should add a new note and reset saving state', () => {
    const newNote: Note = {
      id: '1',
      title: 'New Note',
      body: 'This is a new note',
      date: Date.now(),
    };

    const state = journalSlice.reducer(initialState, addNewEmptyNote(newNote));

    expect(state.notes).toHaveLength(1);
    expect(state.notes[0]).toEqual(newNote);
    expect(state.isSaving).toBe(false);
    expect(state.messageSaved).toBe('');
  });

  test('setActiveNote should set the active note and reset the messageSaved', () => {
    const activeNote: Note = {
      id: '2',
      title: 'Active Note',
      body: 'This is an active note',
      date: Date.now(),
    };

    const state = journalSlice.reducer(initialState, setActiveNote(activeNote));

    expect(state.active).toEqual(activeNote);
    expect(state.messageSaved).toBe('');
  });

  test('setActiveNoteById should set the active note by its ID', () => {
    const existingNotes: Note[] = [
      { id: '1', title: 'Note 1', body: 'Body 1', date: Date.now() },
      { id: '2', title: 'Note 2', body: 'Body 2', date: Date.now() },
    ];

    const stateWithNotes = { ...initialState, notes: existingNotes };

    const state = journalSlice.reducer(stateWithNotes, setActiveNoteById('2'));

    expect(state.active).toEqual(existingNotes[1]);
    expect(state.messageSaved).toBe('');
  });

  test('setNotes should update the notes array', () => {
    const newNotes: Note[] = [
      { id: '3', title: 'Note 3', body: 'Body 3', date: Date.now() },
      { id: '4', title: 'Note 4', body: 'Body 4', date: Date.now() },
    ];

    const state = journalSlice.reducer(initialState, setNotes(newNotes));

    expect(state.notes).toEqual(newNotes);
    expect(state.messageSaved).toBe('');
  });

  test('setSaving should update the isSaving state', () => {
    const state = journalSlice.reducer(initialState, setSaving(true));
    expect(state.isSaving).toBe(true);

    const stateFalse = journalSlice.reducer(state, setSaving(false));
    expect(stateFalse.isSaving).toBe(false);
  });

  test('updateNote should update an existing note and set a success message', () => {
    const existingNotes: Note[] = [
      { id: '5', title: 'Note 5', body: 'Body 5', date: Date.now() },
    ];
    const updatedNote: Note = { id: '5', title: 'Updated Note 5', body: 'Updated Body 5', date: Date.now() };

    const stateWithNotes = { ...initialState, notes: existingNotes };
    const state = journalSlice.reducer(stateWithNotes, updateNote(updatedNote));

    expect(state.notes[0]).toEqual(updatedNote);
    expect(state.messageSaved).toBe('Updated Note 5, actualizado correctamente');
  });

  test('changeMessageSaved should update the messageSaved state', () => {
    const newMessage = 'New message saved';

    const state = journalSlice.reducer(initialState, changeMessageSaved(newMessage));

    expect(state.messageSaved).toBe(newMessage);
  });

  test('setPhotosToActiveNote should add photos to the active note', () => {
    const activeNote: Note = {
      id: '6',
      title: 'Active Note',
      body: 'Body',
      date: Date.now(),
      images: [],
    };
    const photos = ['photo1.jpg', 'photo2.jpg'];

    const stateWithActiveNote = { ...initialState, active: activeNote };
    const state = journalSlice.reducer(stateWithActiveNote, setPhotosToActiveNote(photos));

    expect(state.active?.images).toEqual(photos);
  });

  test('resetState should reset the state to its initial values', () => {
    const modifiedState = {
      isSaving: true,
      messageSaved: 'Modified message',
      notes: [{ id: '7', title: 'Modified Note', body: 'Body', date: Date.now() }],
      active: { id: '7', title: 'Modified Note', body: 'Body', date: Date.now() },
    };

    const state = journalSlice.reducer(modifiedState, resetState());

    expect(state).toEqual(initialState);
  });
});
