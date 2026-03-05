import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";

@Entity({ name: 'tb_temas' })
export class Tema {

    @PrimaryGeneratedColumn()
    id:number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty({ message: 'A Descrição é Obrigatória. '})
    @Length(10, 1000, { message: "A Descrição deve ter entre 10 e 1000 caracteres" })
    @Column({ length: 1000, nullable: false })
    descricao: string;

    @OneToMany( () => Postagem, (postagem) => postagem.tema)
    postagem: Postagem[]; // Array de retorno

}