import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JWTGuard } from 'src/auth/guard';
import { EditUserDTO } from './dto';
import { UserService } from './user.service';

@UseGuards(JWTGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@GetUser('id') userId: string, @Body() dto: EditUserDTO) {
    return this.userService.editUser(userId, dto);
  }
}
