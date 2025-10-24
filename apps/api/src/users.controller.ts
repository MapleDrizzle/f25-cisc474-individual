import { Controller, Get, Param, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtUser } from 'src/auth/jwt.strategy';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async me(@CurrentUser() auth: JwtUser) {
    console.log(auth);
    if (!auth || !auth.userId) {
      throw new UnauthorizedException();
    }
    const user = await this.usersService.findOne(auth.userId); // SIR: MAKE SURE TO ADD AUTHENTICATION MODEL IN SCHEMA
    if (!user) {
      throw new Error('User not found');
    }
    // Return only what your client needs (include the DB id!)
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      // optionally roles, picture, etc.
    };
  }

    @Get(':id')
    getUserById(@Param('id') id: string) {
        return this.usersService.findOne({ id: String(id) });
    }

    @Get()
    getUsers() {
        return this.usersService.findAll();
    }

    @Get('by-email/:email') // SIR: ADD THIS TO DATABASE SCHEMA
    findByEmail(email: string) {
        return this.usersService.findByEmail(email);
    }
}