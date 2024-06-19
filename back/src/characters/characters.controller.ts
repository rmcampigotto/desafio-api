import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get('apiSearchInfo')
  async apiSearch(){
    const base_url = "https://rickandmortyapi.com/api/character" // trocar para global variable
    const url_add = "/characters"

    const response = await fetch(base_url + url_add)
    const data = await response.json()

    data.forEach(element => {
    });

  }

  // ===== CÓDIGO ABAIXO - PADRÃO GERADO PELO NEST =====
  // 1: Adicionado somente o caminho para os decorators

  @Post('create')
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.charactersService.create(createCharacterDto);
  }

  @Get('findAll')
  findAll() {
    return this.charactersService.findAll();
  }

  @Get('findById/:id')
  findOne(@Param('id') id: string) {
    return this.charactersService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateCharacterDto: UpdateCharacterDto) {
    return this.charactersService.update(+id, updateCharacterDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.charactersService.remove(+id);
  }
}
