import { startNewNote, getNotesFromDB, startUpdateNote } from '@/store/journal/journalThunks';
import { addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote } from '@/store/journal/journalSlice';
import { createNewNote, loadingNotes, updateNoteDocument } from '@/firebase/database_provider';
import { store } from '@/store/store';

jest.mock('@/firebase/database_provider');
jest.mock('@/store/store', () => ({
  store: {
    getState: jest.fn(),
  },
}));

const mockedDispatch = jest.fn();

describe('journalThunks tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('startNewNote should create a new note and dispatch actions', async () => {
    const mockState = { auth: { uuid: 'user123' } };
    (store.getState as jest.Mock).mockReturnValue(mockState);

    const mockNoteResponse = { id: 'note1' };
    (createNewNote as jest.Mock).mockResolvedValue(mockNoteResponse);

    await startNewNote()(mockedDispatch);

    expect(mockedDispatch).toHaveBeenCalledWith(setSaving(true));
    expect(createNewNote).toHaveBeenCalledWith('user123', expect.objectContaining({
      title: '',
      body: '',
      date: expect.any(Number),
    }));
    expect(mockedDispatch).toHaveBeenCalledWith(addNewEmptyNote({
      id: 'note1',
      title: '',
      body: '',
      date: expect.any(Number),
    }));
    expect(mockedDispatch).toHaveBeenCalledWith(setActiveNote({
      id: 'note1',
      title: '',
      body: '',
      date: expect.any(Number),
    }));
    expect(mockedDispatch).toHaveBeenCalledWith(setSaving(false));
  });

  test('getNotesFromDB should fetch notes and dispatch setNotes', async () => {
    const mockState = { auth: { uuid: 'user123' } };
    (store.getState as jest.Mock).mockReturnValue(mockState);

    const mockNotesResponse = { notes: [{ id: 'note1', title: 'Note 1', body: 'Body 1', date: 12345 }] };
    (loadingNotes as jest.Mock).mockResolvedValue(mockNotesResponse);

    await getNotesFromDB()(mockedDispatch);

    expect(loadingNotes).toHaveBeenCalledWith('user123');
    expect(mockedDispatch).toHaveBeenCalledWith(setNotes(mockNotesResponse.notes));
  });

  test('startUpdateNote should update the note and dispatch updateNote', async () => {
    const mockState = { auth: { uuid: 'user123' } };
    (store.getState as jest.Mock).mockReturnValue(mockState);

    const mockNote = { id: 'note1', title: 'Updated Note', body: 'Updated Body', date: 12345 };
    (updateNoteDocument as jest.Mock).mockResolvedValue({ status: true });

    await startUpdateNote('note1', mockNote)(mockedDispatch);

    expect(mockedDispatch).toHaveBeenCalledWith(setSaving(true));
    expect(updateNoteDocument).toHaveBeenCalledWith('user123', 'note1', mockNote);
    expect(mockedDispatch).toHaveBeenCalledWith(updateNote(mockNote));
    expect(mockedDispatch).toHaveBeenCalledWith(setSaving(false));
  });
});
