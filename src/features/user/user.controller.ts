import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse } from '../../utils/api-response';
import { SignInDto } from './dto/sign-in.dto';
import { JwtAuthGuard } from './guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('sign-up')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.signup(createUserDto);

    return new ApiResponse(200, 'Successfully registered.', { id: user.id });
  }

  @Post('sign-in')
  async signin(@Body() signInDto: SignInDto) {
    const tokens = await this.userService.signin(signInDto);

    return new ApiResponse(200, 'Successfully logged in.', tokens);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
