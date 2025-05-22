import { Injectable } from '@nestjs/common';
import { CreateReferalAgentDto } from './dto/create-referal-agent.dto';
import { UpdateReferalAgentDto } from './dto/update-referal-agent.dto';

@Injectable()
export class ReferalAgentService {
  create(createReferalAgentDto: CreateReferalAgentDto) {
    return 'This action adds a new referalAgent';
  }

  findAll() {
    return `This action returns all referalAgent`;
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
