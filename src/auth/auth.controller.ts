import { Body, Controller, Post, HttpCode, HttpStatus, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { BaseUser } from "src/users/dto/base-user.dto";
import { Public } from "./strategy/public-strategy";
import { SignUpDto } from "./dto/signup.dto";


@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  @ApiOperation({ summary: "User Login" })
  @ApiResponse({
    status: 200,
    description: "The record found",
    type: [BaseUser],
  })
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("signup")
  @ApiOperation({ summary: "User Signup" })
  @ApiResponse({
    status: 200,
    description: "The record found",
    type: [BaseUser],
  })
  signUp(@Body() signUpDto: SignUpDto) {
    const payload = {
      username: signUpDto.username, 
      email: signUpDto.email, 
      password: signUpDto.password,
      createdAt: new Date(),
      name: signUpDto.name
    }
    return this.authService.signUp(payload);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get("me")
  @ApiOperation({ summary: "User By Token" })
  @ApiResponse({
    status: 200,
    description: "The record found",
    type: [BaseUser],
  })
  me(@Body() token: string) {
    return this.authService.me(token);
  }
}