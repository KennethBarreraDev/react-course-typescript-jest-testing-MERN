import jwt from 'jsonwebtoken';

export class JWTService {
    constructor(private readonly secretKey: string) {

    }


    signToken = (payload: any): string => {
        try {
            var token = jwt.sign(payload, this.secretKey);
            return token;
        } catch (error) {
            throw error;
        }
    }

    verifyToken = (token: string): boolean => {
        try {
            const decoded = jwt.verify(token, this.secretKey);
            return true;
        } catch (err) {
            return false;
        }
    }
}