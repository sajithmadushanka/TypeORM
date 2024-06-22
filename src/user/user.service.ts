import {  Injectable } from '@nestjs/common';
import { CreateUserDto } from './DTOs/CreateUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from 'src/TypeORM/User';
import { Repository } from 'typeorm';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>){}

   async createUser(useCreateDto:CreateUserDto){
        const hashPassword = await encodePassword(useCreateDto.password);
        console.log(hashPassword)
      try {
        const newUser =  this.userRepository.create({...useCreateDto, password:hashPassword});
        return  this.userRepository.save(newUser);
        }catch(err){
            console.log('Error:', err.message);
        }
      
    }

    getAllUsers(){
        return this.userRepository.find();
    }

   async updateUser(id:number, user:CreateUserDto){
       await this.userRepository.update({_id:id}, user);
       const existingUser = await this.userRepository.findOne({ where: { _id:id} });
            return existingUser;
    }

    findUserByEmail(email:string){
        return this.userRepository.findOne({where: {email}});
    }

}
