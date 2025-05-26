import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService, 
        private jwtService: JwtService
    ) { }

    async login(username: string, password: string): Promise<any> {
        const user = await this.usersService.findByUsername(username);

        // If no user is found, throw an error
        if (!user) {
            throw new NotFoundException(`No user found for username: ${username}`);
        }

        // Step 2: Check if the password is correct
        const isPasswordValid = user.password === password;

        // If password does not match, throw an error
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password');
        }

        // Step 3: Generate a JWT containing the user's ID and return it
        return {
            accessToken: this.jwtService.sign({ userId: user.id }),
        };
    }
}