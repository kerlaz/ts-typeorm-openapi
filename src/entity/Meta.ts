import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class Meta {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fileDate: string;

    @Column()
    fileName: string;

    @Column()
    size: number;

    @Column()
    type: "photo" | "video";

    @ManyToOne(
        () => User,
        (user) => user.metas,
        { onDelete: "CASCADE", onUpdate: "CASCADE" }
    )
    user: User;

}