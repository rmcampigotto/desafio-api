import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) { }

  @Get('apiSearchInfo')
  async apiSearch() {
    try {
      const baseUrl = 'https://rickandmortyapi.com/api';
      const url = '/character';
      let totalCharacters = 0;

      let page = 1;
      while (totalCharacters < 50) {
        const response = await fetch(`${baseUrl}${url}?page=${page}`);
        const data = await response.json();
        const nextResults = data.results;

        for (const element of nextResults) {
          await this.create(element, 2);
          totalCharacters++;
          if (totalCharacters >= 50) {
            break;
          }
        }
        page++;
      }
      return { message: `Salvo ${totalCharacters} personagens com sucesso!` };
    } catch (error) {
      return { message: `Erro ao salvar dados da API: ${error}` };
    }
  }

  @Post('create')
  create(@Body() createCharacterDto: CreateCharacterDto, option = 1) {
    try {
      this.charactersService.create(createCharacterDto);
      if (option == 1) {
        return { message: `Personagem salvo com sucesso!`, charcacter: createCharacterDto };
      }
    } catch (error) {
      return { message: `Erro ao salvar o personagem: ${error}` };
    }
  }

  @Get('findAll')
  findAll() {
    try {
      return this.charactersService.findAll();
    } catch (error) {
      return { message: `Erro ao procurar os personagens: ${error}` };
    }

  }

  @Get('findById/:id')
  findOne(@Param('id') id: number) {
    try {
      return this.charactersService.findOne(id);
    } catch (error) {
      return { message: `Erro ao procurar o personagem com ID: ${id}: ${error}` };
    }
  }

  @Patch('update/:id')
  update(@Param('id') id: number, @Body() updateCharacterDto: UpdateCharacterDto) {
    try {
      this.charactersService.update(id, updateCharacterDto);
      return { message: `Personagem salvo com sucesso!`, charcacter: updateCharacterDto };
    } catch (error) {
      return { message: `Erro ao alterar o personagem com ID: ${id}: ${error}` };
    }
  }

  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    try {
      this.charactersService.remove(id);
      return { message: `Personagem deletado com sucesso!` };
    } catch (error) {
      return { message: `Erro ao deletar o personagem com ID: ${id}: ${error}` };
    }
  }
}