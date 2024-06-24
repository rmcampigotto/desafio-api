import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CharacterDocument = HydratedDocument<Character>;

@Schema()
export class Character {
    @Prop({ required: true, unique: true })
    id: Number;

    @Prop({ required: true })
    name: String;

    @Prop({ required: true })
    status: String;

    @Prop({ required: true })
    species: String;

    @Prop({ required: false })
    type: String

    @Prop({ required: true })
    gender: String;

    @Prop({ type: Object, required: true })
    origin: {
        name: String;
        url: String;
    }

    @Prop({ type: Object, required: true })
    location: {
        name: String;
        url: String;
    }

    @Prop({ required: true })
    image: String;

    @Prop({ required: true })
    episode: Array<String>
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
