import { SerializedUserDto } from './../user/DTOs/SerializedUser.dto';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { comparePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService:UserService) { }

   async validateUser(email: string, password: string): Promise<any> {
            const user = await this.userService.findUserByEmail(email);
            if(!user){
                return null;
            }
            const hashPassword = user.password;
            const rawPassword = password;
            const isMath = await comparePassword(rawPassword, hashPassword);
            if(isMath){
                
                return new SerializedUserDto(user);
            }
            return null;
            
        }
}
