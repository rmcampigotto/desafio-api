import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { AuthGuard } from 'src/auth/auth.guard';

// CRIANDO A CLASSE DE ERRO PERSONALIZADO:

class CharacterSaveError extends Error {
  constructor(message: string, public characterId?: number, public errorCode?: string) {
    super(message);
    this.name = 'CharacterSaveError';
  }
}

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) { }

  @UseGuards(AuthGuard)
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
      if (error instanceof CharacterSaveError) {
        console.error('Erro ao salvar personagem:', error.message);
        console.error('ID do personagem:', error.characterId);
        console.error('Código do erro:', error.errorCode);
    
        return { message: `Erro ao salvar personagem com ID = ${error.characterId} : ${error.message }`, error_code: error.errorCode };
      } else {
        return { message: 'Erro inesperado durante a busca de dados: ' + error.message, error_code: error.errorCode };
      }
    }
  }

  @UseGuards(AuthGuard)
  @Post('create')
  create(@Body() createCharacterDto: CreateCharacterDto, option = 1) {
    try {
      this.charactersService.create(createCharacterDto);
      if (option == 1) {
        return { message: `Personagem salvo com sucesso!`, charcacter: createCharacterDto };
      }
    } catch (error) {
      if (error instanceof CharacterSaveError) {
        console.error('Erro ao salvar personagem:', error.message);
        console.error('ID do personagem:', error.characterId);
        console.error('Código do erro:', error.errorCode);
    
        return { message: `Erro ao salvar personagem com ID = ${error.characterId} : ${error.message }`, error_code: error.errorCode };
      } else {
        return { message: 'Erro inesperado durante a busca de dados: ' + error.message, error_code: error.errorCode };
      }
    }
  }

  @UseGuards(AuthGuard)
  @Get('findAll')
  findAll() {
    try {
      return this.charactersService.findAll();
    } catch (error) {
      return { message: `Erro ao procurar os personagens: ${error}` };
    }

  }

  @UseGuards(AuthGuard)
  @Get('findById/:id')
  findOne(@Param('id') id: number) {
    try {
      return this.charactersService.findOne(id);
    } catch (error) {
      return { message: `Erro ao procurar o personagem com ID: ${id}: ${error}` };
    }
  }

  @UseGuards(AuthGuard)
  @Patch('update/:id')
  update(@Param('id') id: number, @Body() updateCharacterDto: UpdateCharacterDto) {
    try {
      this.charactersService.update(id, updateCharacterDto);
      return { message: `Personagem salvo com sucesso!`, charcacter: updateCharacterDto };
    } catch (error) {
      return { message: `Erro ao alterar o personagem com ID: ${id}: ${error}` };
    }
  }

  @UseGuards(AuthGuard)
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