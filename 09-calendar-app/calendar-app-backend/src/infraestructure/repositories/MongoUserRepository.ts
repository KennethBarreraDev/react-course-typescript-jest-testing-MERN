import { error } from 'console';
import { User } from '../../domain/entities/user';
import { NetworkErrors } from '../../domain/errors/network_errors';
import { IUserRepository } from '../../domain/repositories/user_repository';
import { COMMOM_NETWORK_CODES } from '../../domain/core/constants';
import { UserModel } from '../database/mongoose/schemas/user_schema';

export class MongoUserRepository implements IUserRepository {
    createUser = async (user: User): Promise<[NetworkErrors?, User?]> => {
        try {
          const newUser = new UserModel({
            name: user.name,
            email: user.email,
            password: user.password
          })

          newUser.save();

          return [undefined, new User(newUser.id, user.name, user.email, user.password)]

        } catch (error) {
            return [NetworkErrors.httpErrorResponse('Error creating user', COMMOM_NETWORK_CODES.SUCCESS_CREATE), undefined];
        }
    }

    loginUser = async (userCredentials: { email: string; password: string; }): Promise<[NetworkErrors?, User?]> => {
        try {
           const user = await UserModel.findOne({email: userCredentials.email}).exec();
           if(!user){
            return [NetworkErrors.httpErrorResponse('User not found', COMMOM_NETWORK_CODES.SUCCESS_CREATE), undefined];
           }
           else{
            return [undefined, new User(user.id, user.name!, user.email!, user.password!)];
           }
        } catch (error) {
            return [NetworkErrors.httpErrorResponse('Error logging in user', COMMOM_NETWORK_CODES.SUCCESS_CREATE), undefined];
        }
    };
}
