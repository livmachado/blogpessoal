import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tema } from "../entities/tema.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class TemaService {
  constructor(
    @InjectRepository(Tema)
    private temaRepository: Repository<Tema>,
  ) {}

  async findAll(): Promise<Tema[]> {
    return await this.temaRepository.find();
  }

  async findById(id: number): Promise<Tema>{
    const tema = await this.temaRepository.findOne({
      where: {
        id
      }
    })

    if(!tema)
      throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND)

    return tema;
  }

  async findAllByDescricao(descricao: string): Promise<Tema[]>{
    return this.temaRepository.find({
      where: {
        descricao: ILike(`%${descricao}%`)
      }
    })
  }
  async create(tema: Tema): Promise<Tema>{
    return await this.temaRepository.save(tema);
  }

  async update(tema: Tema): Promise<Tema>{
    if(!tema.id || tema.id <=0){
      throw new HttpException("O ID do tema é inválido!",HttpStatus.BAD_REQUEST);
    } 

    await this.findById(tema.id)
    return await this.temaRepository.save(tema);
  }

  async delete(id: number) : Promise<DeleteResult>{
    await this.findById(id);

    return this.temaRepository.delete(id);
  }
}
