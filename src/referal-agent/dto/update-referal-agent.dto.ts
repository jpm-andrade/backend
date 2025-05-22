import { PartialType } from '@nestjs/mapped-types';
import { CreateReferalAgentDto } from './create-referal-agent.dto';

export class UpdateReferalAgentDto extends PartialType(CreateReferalAgentDto) {}
