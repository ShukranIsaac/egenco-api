import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'posts' })
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    imageUrl: string

    @Column()
    summary: string
}