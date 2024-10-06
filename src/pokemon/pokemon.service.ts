import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { isValidObjectId, Model } from 'mongoose';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>
  ){}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;

    } catch (error) {
      if( error.code === 11000 ){
        throw new BadRequestException(`Pokemon already exist in db ${ JSON.stringify(error.keyValue)}`)
      }
      console.log(error);
      throw new InternalServerErrorException(`Can not create Pokemon - Check server logs`);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    // By number (no)
    if( !isNaN(+term) ){
      pokemon = await this.pokemonModel.findOne({ no: term });
    }
    // By MongoID
    if( !pokemon && isValidObjectId( term ) ){
      pokemon = await this.pokemonModel.findById( term );
    }

    //By Name
    if( !pokemon ){
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() });
    }

    if( !pokemon ) throw new NotFoundException(`Pokemon with id, name or no "${ term }" not found`);

    return pokemon;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
