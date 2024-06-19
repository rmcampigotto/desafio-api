import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CharactersModule } from './characters/characters.module';
import { CharactersController } from './characters/characters.controller';

@Module({
  imports: [CharactersModule],
  controllers: [],
  providers: [],
})

export class AppModule {}

