import { UserService } from 'src/user/user.service';
import { PassportSerializer } from "@nestjs/passport";
import { User } from "src/TypeORM/User";
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private  userService:UserService) {
        super();
    }
    serializeUser(user:User, done:(err:Error, user:User)=>void) {
        console.log('serializeUser:', user);
        done(null, user);
    }
    async deserializeUser(user: User, done: (err: Error, user: User) => void) {
    
        try {
          const userResult = await this.userService.findUserById(2);
      
          if (!userResult) {
            return done(new Error('User not found'), null);
          }
          // User object retrieved from database
          done(null, userResult);
        } catch (error) {
          done(error, null);
        }
      }
    }      