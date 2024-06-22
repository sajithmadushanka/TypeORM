import { Controller, Get, Post, Query, Req, Request, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {  AuthenticatedGaurd, LocalAuthGuard } from './utils/LocalGuard';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(private userService:UserService){}
    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req){
        return req.user;
    }

    @Get()
    async getAuthSession(@Session() session: any){
        console.log(session.id)
        session.authenticated = true;
        return session;
    }


    @Get('status')
    async getAuthStatus(@Request() req,){
        return req.isAuthenticated();
    }
    @UseGuards(AuthenticatedGaurd)
    @Get('test')
    async test()
    {
       const user = await this.userService.findUserById(1);
       if(!user) return "User not found";
         return user;
    }
}
