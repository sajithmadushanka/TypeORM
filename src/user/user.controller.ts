import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './DTOs/CreateUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}
    @Get()
    test()
    {
        return "Hello World!";
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createUser(@Body() createUserDto: CreateUserDto){
          return  this.userService.createUser(createUserDto);
    }

    @Get('all')
    getAllUsers(){
        return this.userService.getAllUsers();
    }

    @Put('update/:id')
    @UsePipes(ValidationPipe)
    updateUser(@Body() user:CreateUserDto, @Param('id') id:number){
        return this.userService.updateUser(id, user);
    }
}
