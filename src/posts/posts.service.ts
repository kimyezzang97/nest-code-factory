import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';

/**
 * author: string;
 * title: string;
 * content: string;
 * likeContent: number;
 * commentCount: number;
 */

export interface PostModel {
    id: number;
    author: string;
    title: string;
    content: string;
    likeCount: number;
    commentCount: number;
  }
  
  let posts : PostModel[] = [
    {
      id: 1,
      author: 'newjeans_offical',
      title: '뉴진스 민지',
      content: '메이크업 고치고 있는 민지',
      likeCount: 1000000,
      commentCount: 999999
    },
    {
      id: 2,
      author: 'newjeans_offical',
      title: '뉴진스 해린',
      content: '노래 연습 하고 있는 민지',
      likeCount: 1000000,
      commentCount: 999999
    },
    {
      id: 3,
      author: 'blackpink_offical',
      title: '블랙핑크 로제',
      content: '공연하고 있는 민지',
      likeCount: 1000000,
      commentCount: 999999
    }
  ]

@Injectable() // 주입할 수 있다.
export class PostsService {
    constructor(
      @InjectRepository(PostsModel)
      private readonly postsRepository: Repository<PostsModel>
    ){}

    async getAllPosts(){
        return this.postsRepository.find(); // find() : 모든 데이터 가져오기
    }

    async getPostById(postId: number){
        const post = await this.postsRepository.findOne({
          where:{
            id:postId,
          }
        });

        if(!post){
          throw new NotFoundException();
        }

        return post;
    }

    async createPost(author: string, title: string, content: string){
      // 1) create -> 저장할 객체를 생성한다.
      // 2) save -> 객체를 저장한다. (create 메서드에서 생성한 객체로)

      const post = this.postsRepository.create({
        author, // author: author랑 똑같음
        title,
        content,
        likeCount: 0,
        commentCount: 0,
      });
       
      const newPost = await this.postsRepository.save(post);

      return newPost;
    }

    async updatePost(postId: number, author: string, title: string, content: string){
      // save 의 기능
      // 1) 만약에 데이터가 존재하지 않는다면 (id 기준으로) 새로 생성한다.
      // 2) 만약에 데이터가 존재한다면 (같은 id의 값이 존재한다면) 존재하던 값을 업데이트한다.

        const post = await this.postsRepository.findOne({
          where:{
            id: postId,
          }
        });

        if(!post){
            throw new NotFoundException();
        }

        if(author) {
            post.author = author;
        }

        if(title) {
            post.title = title;
        }

        if(content) {
            post.content = content;
        }

        const newPost = await this.postsRepository.save(post);

      return newPost;
    }

    async deletePost(postId: number){
        const post = await this.postsRepository.findOne({
          where:{
            id: postId,
          }
        });
    
        if(!post){
          throw new NotFoundException();
        }
    
        await this.postsRepository.delete(postId);
    
        return postId;
    }
}
