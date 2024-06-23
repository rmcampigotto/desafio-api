import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharactersModule } from './characters/characters.module';

@Module({
  imports: [CharactersModule, MongooseModule.forRoot('mongodb://localhost:27017/rickmorty')],
  controllers: [],
  providers: [],
})

export class AppModule {}

