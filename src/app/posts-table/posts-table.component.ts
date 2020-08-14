import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {PostService} from '../post.service';
import {Router} from '@angular/router';
import { BlogPost } from '../BlogPost';
import { PostDataComponent } from '../post-data/post-data.component';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.css']
})
export class PostsTableComponent implements OnInit {

  blogPosts: Array<BlogPost> = [];
  private subquery;

  rowClicked(e, id)
  {
      this.router.navigate(['/admin/post', id]);
  };

  constructor(private router: Router, private postData: PostService) { }

  ngOnInit(): void {
    this.subquery = this.postData.getAllPosts().subscribe(data => this.blogPosts=data);
  }

  ngOnDestroy(): void {
    if (this.subquery) this.subquery.unsubscribe();
  }

}
