import { Component, OnInit } from '@angular/core';
import {PostService} from '../post.service';
import {Router, ActivatedRoute} from '@angular/router';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  blogPost: BlogPost;
  tags: string;
  private sub;
  id = this.route.params['id'];

  constructor(private data: PostService, private router: Router, private route: ActivatedRoute) { }

  onSubmit(): void {

    this.blogPost.tags = this.tags.split(',').map(tag => tag.trim());
    this.data.updatePostById(this.blogPost._id, this.blogPost).subscribe( () => this.router.navigate(['/admin']));

  }
  
  deletePost(id) {

    this.data.deletePostById(id).subscribe( () => this.router.navigate(['/admin'])
    );

  }

  ngOnInit(): void {
    this.sub = this.data.getPostById(this.route.snapshot.params['id']).subscribe(data => {

      this.blogPost = data; 
      this.tags = data.tags.toString();

    })
  }

  ngOnDestroy(): void{
    if(this.sub){this.sub.unsubscribe();}
  }

}
