import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':id')
    getUserById(@Param('id') id: string) {
        return this.usersService.findOne({ id: String(id) });
    }

    @Get()
    getUsers() {
        return this.usersService.findAll();
    }
}