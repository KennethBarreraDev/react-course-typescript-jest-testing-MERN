import bcrypt from 'bcrypt';
import { log } from 'console';

export class EncrytpPasswordService{
     encryptPassword = async (password: string): Promise<string> => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            return hash;
        } catch (error) {
            throw new Error('Error encrypting password');
        }
    };
    
     comparePassword = async (myPlaintextPassword: string, hash: string): Promise<boolean> => {
        try { 
            const result = await bcrypt.compare(myPlaintextPassword, hash); 
            return result; 
        }
         catch (error) { 
            throw new Error('Error comparing passwords'); 
        }
    };
    
}