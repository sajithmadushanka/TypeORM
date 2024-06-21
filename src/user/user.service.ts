import {  Injectable } from '@nestjs/common';
import { CreateUserDto } from './DTOs/CreateUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from 'src/TypeORM/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>){}

    createUser(useCreateDto:CreateUserDto){
       const newUser =  this.userRepository.create(useCreateDto);
      return  this.userRepository.save(newUser);
    }

    getAllUsers(){
        return this.userRepository.find();
    }

   async updateUser(id:number, user:CreateUserDto){
       await this.userRepository.update({_id:id}, user);
       const existingUser = await this.userRepository.findOne({ where: { _id:id} });
            return existingUser;
    }
}
