import { Controller, Get, Post, Put, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { CertificationsService } from './certifications.service';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
import { Public } from 'src/auth/strategy/public-strategy';
import { Certification } from './entities/certification.entity'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger'


@ApiTags('certifications')
@Controller('certifications')
export class CertificationsController {
  constructor(private readonly certificationsService: CertificationsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new certification for a shop' })
  @ApiBody({ type: CreateCertificationDto })
  @ApiResponse({ status: 201, description: 'Certification created', type: Certification })
  async create(@Body() dto: CreateCertificationDto): Promise<Certification> {
    return this.certificationsService.create(dto);
  }

  @Get()
  findAll() {
    return this.certificationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.certificationsService.findOne(+id);
  }

  @Get('/shop/:id')
  findByShop(@Param('id') id: string) {
    return this.certificationsService.findBasedOnShop(+id);
  }


  @Put(':id')
  @ApiOperation({ summary: 'Update an existing certification' })
  @ApiParam({ name: 'id', description: 'Certification ID', example: 7 })
  @ApiBody({ type: UpdateCertificationDto })
  @ApiResponse({ status: 200, description: 'Certification updated', type: Certification })
  @ApiResponse({ status: 404, description: 'Certification not found' })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateCertificationDto,
  ): Promise<Certification> {
    const cert = await this.certificationsService.update(id, dto)
    if (!cert) {
      throw new NotFoundException('Certification not found')
    }
    return cert
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.certificationsService.remove(+id);
  }
}