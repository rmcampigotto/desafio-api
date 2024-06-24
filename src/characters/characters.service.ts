import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Character } from './schemas/character.schema';
import { Model } from 'mongoose';

@Injectable()
export class CharactersService {
  constructor(@InjectModel(Character.name) private characterModel: Model<Character>) {}

  async create(createCharacterDto: CreateCharacterDto): Promise<Character> {
    const createdCharacter = new this.characterModel(createCharacterDto)
    return createdCharacter.save()
  }

  async findAll(): Promise<Character[]> {
    return this.characterModel.find().exec()
  }

  async findOne(id: number): Promise<Character> {
    return this.characterModel.findOne({id: id}).exec()
  }

  async update(id: number, updateCharacterDto: UpdateCharacterDto): Promise<Character> {
    return this.characterModel.findOneAndUpdate({id: id}, updateCharacterDto).exec()
  }

  async remove(id: number): Promise<Character> {
    return this.characterModel.findOneAndDelete({id: id}).exec()
  }
}
