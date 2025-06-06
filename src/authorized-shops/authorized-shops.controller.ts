// src/authorized-shops/authorized-shop.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from "@nestjs/swagger";

import { AuthorizedShopsService } from "./authorized-shops.service";
import { CreateAuthorizedShopDto } from "./dto/create-authorized-shop.dto";
import { UpdateAuthorizedShopDto } from "./dto/update-authorized-shop.dto";
import { AuthorizedShop } from "./entities/authorized-shop.entity";
import { Public } from "src/auth/strategy/public-strategy";

@Public()
@ApiTags("authorized-shops")
@Controller("authorized-shops")
export class AuthorizedShopsController {
  constructor(private readonly authShopService: AuthorizedShopsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: "Create a new AuthorizedShop" })
  @ApiBody({ type: CreateAuthorizedShopDto })
  @ApiResponse({
    status: 201,
    description: "The created AuthorizedShop object",
    type: AuthorizedShop,
  })
  async create(
    @Body() createDto: CreateAuthorizedShopDto
  ): Promise<AuthorizedShop> {
    return this.authShopService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: "Retrieve all AuthorizedShops" })
  @ApiResponse({
    status: 200,
    description: "Array of AuthorizedShops",
    type: [AuthorizedShop],
  })
  async findAll(): Promise<AuthorizedShop[]> {
    return this.authShopService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a single AuthorizedShop by ID" })
  @ApiParam({ name: "id", type: Number, description: "AuthorizedShop ID" })
  @ApiResponse({
    status: 200,
    description: "The requested AuthorizedShop object",
    type: AuthorizedShop,
  })
  @ApiResponse({ status: 404, description: "Not Found" })
  async findOne(
    @Param("id", ParseIntPipe) id: number
  ): Promise<AuthorizedShop> {
    return this.authShopService.findOne(id);
  }

  @Patch(":id")
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: "Update an existing AuthorizedShop" })
  @ApiParam({ name: "id", type: Number, description: "AuthorizedShop ID" })
  @ApiBody({ type: UpdateAuthorizedShopDto })
  @ApiResponse({
    status: 200,
    description: "The updated AuthorizedShop object",
    type: AuthorizedShop,
  })
  @ApiResponse({ status: 404, description: "Not Found" })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDto: UpdateAuthorizedShopDto
  ): Promise<AuthorizedShop> {
    return this.authShopService.update(id, updateDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete an AuthorizedShop" })
  @ApiParam({ name: "id", type: Number, description: "AuthorizedShop ID" })
  @ApiResponse({ status: 200, description: "Deleted successfully" })
  @ApiResponse({ status: 404, description: "Not Found" })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.authShopService.remove(id);
    return { message: `AuthorizedShop with ID ${id} deleted` };
  }
}
