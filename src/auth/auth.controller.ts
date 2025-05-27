import { Body, Controller, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { BaseUser } from "src/users/dto/base-user.dto";
import { Public } from "./strategy/public-strategy";
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
  signUp(@Body() signUpDto: Record<string, any>) {
    const payload = {
      username: signUpDto.username, 
      email: signUpDto.email, 
      password: signUpDto.password,
      createdAt: new Date()
    }
    return this.authService.signUp(payload);
  }
}