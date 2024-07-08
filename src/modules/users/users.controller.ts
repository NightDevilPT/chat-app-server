import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateUserPasswordRequestDto } from './dto/update-password-request.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiConsumes('application/x-www-form-urlencoded')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('/login')
  @ApiConsumes('application/x-www-form-urlencoded')
  login(@Body() loginDto: LoginUserDto) {
    return this.usersService.login(loginDto);
  }

  @Put('/verify/:token')
  @ApiParam({ name: 'token', required: true })
  verify(@Param('token') token: string) {
    return this.usersService.verify(token);
  }

  @Put('/update-password/request')
  @ApiConsumes('application/x-www-form-urlencoded')
  requestPasswordUpdate(
    @Body() updateUserPasswordRequestDto: UpdateUserPasswordRequestDto,
  ) {
    return this.usersService.updatePasswordRequest(
      updateUserPasswordRequestDto,
    );
  }

  @Put('/update-password/update/:token')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiParam({ name: 'token', required: true })
  updatePassword(
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
    @Param('token') token: string,
  ) {
    return this.usersService.updatePassword(updateUserPasswordDto, token);
  }
}
