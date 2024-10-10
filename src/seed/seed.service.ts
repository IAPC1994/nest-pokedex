import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  constructor( 
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>
  ){}

  async executeSeed() {
    await this.pokemonModel.deleteMany();

    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    
    // Option #2
    // const insertPromisesArray = [];

    // Option #3 (Best)
    const pokemonToInsert: { name: string, no: number }[] = [];


    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no:number = +segments[ segments.length - 2 ];
      // Option #1
      // const pokemon = await this.pokemonModel.create({ name, no });
      
      // Option #2
      // insertPromisesArray.push(this.pokemonModel.create({ name, no }));

      // Option #3 (Best)
      pokemonToInsert.push({ name, no });
    });

    //Option #2
    // await Promise.all(insertPromisesArray);

    // Option #3 (Best)
    await this.pokemonModel.insertMany(pokemonToInsert);
    
    return "Seed Executed";
  }

}
