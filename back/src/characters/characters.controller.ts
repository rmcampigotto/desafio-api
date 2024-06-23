import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, Put } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { exit } from 'process';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) { }

  @Get('apiSearchInfo')
  async apiSearch() {
    const baseUrl = 'https://rickandmortyapi.com/api';
    const url = '/character';
    let totalCharacters = 0;

    const response = await fetch(`${baseUrl}${url}`);
    const data = await response.json();
    const results = data.results;

    for (const element of results) {
      await this.create(element);
      totalCharacters++;
    }

    let page = 2;
    while (totalCharacters < 50) {
      const response = await fetch(`${baseUrl}${url}?page=${page}`);
      const data = await response.json();
      const nextResults = data.results;

      for (const element of nextResults) {
        await this.create(element);
        totalCharacters++;
        if (totalCharacters >= 50) {
          break;
        }
      }
      page++;
    }
    return { message: `Salvo ${totalCharacters} personagens com sucesso!` };
  }

  // ===== CÓDIGO ABAIXO - PADRÃO GERADO PELO NEST =====
  // OBS: Alterado de acordo com nossa necessidade

  @Post('create')
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.charactersService.create(createCharacterDto);
  }

  @Get('findAll')
  findAll() {
    return this.charactersService.findAll();
  }

  @Get('findById/:id')
  findOne(@Param('id') id: number) {
    return this.charactersService.findOne(id);
  }

  @Put('update/:id')
  update(@Param('id') id: number, @Body() updateCharacterDto: UpdateCharacterDto) {
    return this.charactersService.update(id, updateCharacterDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.charactersService.remove(id);
  }
}
