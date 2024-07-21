import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class PostModel {
    
    @PrimaryColumn()
    id: number;

    @Column()
    author: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    likeCount: number;

    @Column()
    commentCount: number;
}