import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from "src/users/dto/create-user.dto";
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    saltOrRounds: number = 10;

    async signIn(email: string, pass: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException();
        }

        const isMatch = await bcrypt.compare(pass, user?.password);

        if (!isMatch) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signUp(payload: CreateUserDto) {

        const hashPass = await bcrypt.hash(payload.password, this.saltOrRounds)

        let data = {
            ...payload,
            password: hashPass
        }

        const user = await this.usersService.create(data);
        return user;
    }
}