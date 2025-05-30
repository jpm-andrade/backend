import { Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from './entities/language.entity';
import { Repository } from 'typeorm';
import { Public } from 'src/auth/strategy/public-strategy';

@Public()
@Injectable()
export class LanguagesService {

  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) { }



  create(createLanguageDto: CreateLanguageDto) {
    const language = new Language()

    language.label= createLanguageDto.label
    language.languageCode = createLanguageDto.language_code

    return this.languageRepository.save(language);
  }

  createBulk(createLanguageDto: CreateLanguageDto[]){
    createLanguageDto.map((dto)=>{
      this.create(dto)
    })
  }

  findAll() {
    return this.languageRepository.find();
  }

  findOne(id: number) {
    return this.languageRepository.findOneBy({id:id});
  }

  findByLanguageCode(languageCode: string) {
    return this.languageRepository.findOneBy({languageCode:languageCode});
  }

  update(id: number, updateLanguageDto: UpdateLanguageDto) {
    return `This action updates a #${id} language`;
  }

  remove(id: number) {
    return `This action removes a #${id} language`;
  }
}
