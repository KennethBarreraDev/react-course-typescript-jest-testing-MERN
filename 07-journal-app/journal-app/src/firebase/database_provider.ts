import { collection, doc, getDocs, query, setDoc, updateDoc } from "firebase/firestore/lite";
import { FirebaseDb } from "./config";
import { Note } from "../store/journal/journalSlice";

interface NoteResponse {
    status: boolean,
    id: string | null
}

interface NotesResponse {
    status: boolean,
    notes: Note[]
}

export const createNewNote = async (uid: string, note: Note): Promise<NoteResponse> => {
    try {
        const newDoc = doc(collection(FirebaseDb, `${uid}/journal/notes`))
        const documentResponse = await setDoc(newDoc, note);

        console.log({ newDoc, documentResponse });

        return {
            status: true,
            id: newDoc.id
        }
    } catch (error) {
        console.error("Error during Google sign-in:", error);
        return {
            status: false,
            id: null
        }
    }
};


export const loadingNotes = async (uid: string): Promise<NotesResponse> => {
    try {
        const documentsList: Note[] = [];
        const q = query(collection(FirebaseDb, `${uid}/journal/notes`));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            documentsList.push({
                id: doc.id,
                title: data.title || "",
                body: data.body || "",
                date: data.date || 0,
                images:Array.isArray(data.images) ? data.images : Object.values(data.images || {})
            });
        });

        return {
            status: true,
            notes: documentsList,
        };
    } catch (error) {
        console.error("Error loading notes:", error);
        return {
            status: false,
            notes: [],
        };
    }
};

export const updateNoteDocument = async (
    uid: string,
    noteId: string,
    note: Note
): Promise<NoteResponse> => {
    try {

        const documentRef = doc(FirebaseDb, `${uid}/journal/notes`, noteId);

        await updateDoc(documentRef, { ...note });

        return {
            status: true,
            id: noteId
        };
    } catch (error) {
        console.error("Error updating document:", error);
        return {
            status: false,
            id: noteId
        };
    }
};
