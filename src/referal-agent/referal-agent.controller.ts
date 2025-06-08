import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReferalAgentService } from './referal-agent.service';
import { CreateReferalAgentDto } from './dto/create-referal-agent.dto';
import { UpdateReferalAgentDto } from './dto/update-referal-agent.dto';
import { Public } from 'src/auth/strategy/public-strategy';

@Public()
@Controller('referal-agent')
export class ReferalAgentController {
  constructor(private readonly referalAgentService: ReferalAgentService) {}

  @Post()
  create(@Body() createReferalAgentDto: CreateReferalAgentDto) {
    return this.referalAgentService.create(createReferalAgentDto);
  }

  @Get()
  findAll() {
    return this.referalAgentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.referalAgentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReferalAgentDto: UpdateReferalAgentDto) {
    return this.referalAgentService.update(+id, updateReferalAgentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.referalAgentService.remove(+id);
  }
}
