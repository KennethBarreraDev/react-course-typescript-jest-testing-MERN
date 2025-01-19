import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

interface AuthResponse {
    status: boolean,
    displayName: string | null,
    email: string | null,
    photoURL: string | null,
    uuid: string | null
}

export const signInWithGoogle = async (): Promise<AuthResponse> => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(FirebaseAuth, provider);

        return {
            status: true,
            displayName: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL,
            uuid: result.user.uid
        }
    } catch (error) {
        console.error("Error during Google sign-in:", error);
        return {
            status: false,
            displayName: null,
            email: null,
            photoURL: null,
            uuid: null
        }
    }
};

export const signInWithEmail = async (email: string, password: string, displayName: string): Promise<AuthResponse> => {
    try {
        const result = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        await updateProfile(FirebaseAuth.currentUser!, {
            displayName: displayName
        })
        return {
            status: true,
            displayName: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL,
            uuid: result.user.uid
        }
    } catch (error) {
        console.error("Error during email sign-in:", error);
        return {
            status: false,
            displayName: null,
            email: null,
            photoURL: null,
            uuid: null
        }
    }
}


export const loginWithEmail = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        return {
            status: true,
            displayName: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL,
            uuid: result.user.uid
        }
    } catch (error) {
        console.error("Error: incorrect password or email", error);
        return {
            status: false,
            displayName: null,
            email: null,
            photoURL: null,
            uuid: null
        }
    }
}

export const getUserSession = async () => {
    try {
        return new Promise<AuthResponse>((resolve, reject) => {
            onAuthStateChanged(FirebaseAuth, (user) => {
                if (user) {
                    resolve({
                        status: true,
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        uuid: user.uid,
                    });
                } else {
                    resolve({
                        status: false,
                        displayName: null,
                        email: null,
                        photoURL: null,
                        uuid: null,
                    });
                }
            }, reject);
        });
    } catch (error) {
        console.error("Error: unable to retrieve user session", error);
        return {
            status: false,
            displayName: null,
            email: null,
            photoURL: null,
            uuid: null,
        };
    }
};


export const logoutUser = async (): Promise<AuthResponse> => {
    try {
        await signOut(FirebaseAuth);
        return {
            status: true,
            displayName: null,
            email: null,
            photoURL: null,
            uuid: null
        }
    } catch (error) {
        console.error("Error: incorrect password or email", error);
        return {
            status: false,
            displayName: null,
            email: null,
            photoURL: null,
            uuid: null
        }
    }





    
}