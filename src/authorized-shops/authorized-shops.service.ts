// src/authorized-shops/authorized-shop.service.ts
import {
  Injectable,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { AuthorizedShop } from "./entities/authorized-shop.entity";
import { CreateAuthorizedShopDto } from "./dto/create-authorized-shop.dto";
import { UpdateAuthorizedShopDto } from "./dto/update-authorized-shop.dto";

@Injectable()
export class AuthorizedShopsService {
  constructor(
    @InjectRepository(AuthorizedShop)
    private readonly authorizedShopRepository: Repository<AuthorizedShop>,
  ) {}

  /**
   * Create a new AuthorizedShop record.
   */
  async create(createDto: CreateAuthorizedShopDto): Promise<AuthorizedShop> {
    const {isActive = true, shopId, organizationId, userId } = createDto;

    // Build a new entity instance
    const authShop = new AuthorizedShop();
    authShop.isActive = isActive;
    authShop.shops = { id: shopId } as any; // Link by ID
    authShop.organization = organizationId ? ({ id: organizationId } as any) : null;
    authShop.user = { id: userId } as any;

    return this.authorizedShopRepository.save(authShop);
  }

  /**
   * Update an existing AuthorizedShop by its ID.
   */
  async update(
    id: number,
    updateDto: UpdateAuthorizedShopDto,
  ): Promise<AuthorizedShop> {
    // 1) Find existing record or throw 404
    let authShop: AuthorizedShop;
    try {
      authShop = await this.authorizedShopRepository.findOneByOrFail({ id });
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `AuthorizedShop with ID ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
        { cause: err },
      );
    }

    // 2) Apply updates if provided
    if (updateDto.isActive !== undefined) {
      authShop.isActive = updateDto.isActive;
    }
    if (updateDto.shopId !== undefined) {
      authShop.shops = { id: updateDto.shopId } as any;
    }
    if (updateDto.organizationId !== undefined) {
      authShop.organization = updateDto.organizationId
        ? ({ id: updateDto.organizationId } as any)
        : null;
    }
    if (updateDto.userId !== undefined) {
      authShop.user = { id: updateDto.userId } as any;
    }

    return this.authorizedShopRepository.save(authShop);
  }

  /**
   * Find all AuthorizedShop records.
   */
  findAll(): Promise<AuthorizedShop[]> {
    return this.authorizedShopRepository.find({
      relations: ["shops", "organization", "user"],
    });
  }

  /**
   * Find one AuthorizedShop by its ID.
   */
  async findOne(id: number): Promise<AuthorizedShop> {
    try {
      return await this.authorizedShopRepository.findOneOrFail({
        where: { id },
        relations: ["shops", "organization", "user"],
      });
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `AuthorizedShop with ID ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
        { cause: err },
      );
    }
  }

  /**
   * Remove (delete) an AuthorizedShop by its ID.
   */
  async remove(id: number): Promise<void> {
    const result = await this.authorizedShopRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `AuthorizedShop with ID ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
