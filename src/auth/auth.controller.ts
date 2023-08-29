import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto ,  LoginUserDto} from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorators';
import { User } from './entities/user.entity';




@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body()  loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }


  @Get('private')
  @UseGuards(AuthGuard() )
  testingPrivateRoute(
    //@Req() request: Express.Request
    //@GetUser(['email','role','fullName']) user: User
    @GetUser() user: User
  ){
    //console.log(user)
    return {
      ok: true,
      user
    }
  }
}
