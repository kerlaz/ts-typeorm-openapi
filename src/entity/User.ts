import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany} from "typeorm";
import {Meta} from "./Meta";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Meta, meta => meta.user)
    metas: Meta[]
}
