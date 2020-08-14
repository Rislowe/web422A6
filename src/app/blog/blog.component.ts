import { Component, OnInit } from '@angular/core';
import {BlogPost} from '../BlogPost';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

import {PostService} from '../post.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  page: number = 1;
  tag: string = null;
  category: string = null;
  querySub: any;
  blogPosts: Array <BlogPost>;

  private postSub;

  constructor(private data: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.querySub = this.route.queryParams.subscribe(params => {
      
      if(params['tag']){
        this.tag = params['tag'];
        this.category = null;
      }else{
        this.tag=null;
      }
      
      if(params['category']){
        this.category = params['category'];
        this.tag = null;
      }else{
        this.category = null;
      }
      
      this.getPage(+params['page'] || 1);
    });
  }

  getPage(num)
  {
    this.postSub = this.data.getPosts(num, this.tag, this.category).subscribe(data=> {
      if(data.length > 0)
      {
        this.blogPosts = data;
        this.page = num;
      }
    });

    console.log(this.blogPosts.length);

  }

  ngOnDestroy()
  {
    if(this.querySub) this.querySub.unsubscribe();
  }

}
