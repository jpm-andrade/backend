import { Injectable } from '@nestjs/common';
import { CreateReferalAgentDto } from './dto/create-referal-agent.dto';
import { UpdateReferalAgentDto } from './dto/update-referal-agent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReferalAgent } from './entities/referal-agent.entity';

@Injectable()
export class ReferalAgentService {

  constructor(
    @InjectRepository(ReferalAgent)
    private readonly userRepository: Repository<ReferalAgent>,
  ) {}

  create(createReferalAgentDto: CreateReferalAgentDto) {
    return 'This action adds a new referalAgent';
  }

  findAll() {
    return [];
  }

  findOne(id: number) {
    return `This action returns a #${id} referalAgent`;
  }

  update(id: number, updateReferalAgentDto: UpdateReferalAgentDto) {
    return `This action updates a #${id} referalAgent`;
  }

  remove(id: number) {
    return `This action removes a #${id} referalAgent`;
  }
}
