import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { CommentService } from '../services/comment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent implements OnInit {
  blogid:any;
  blogObj:any;
  commentData:any;
  constructor(private blogService:BlogService,private commentService:CommentService,
    private route:ActivatedRoute){}

  ngOnInit():void {
    this.blogid=this.route.snapshot.paramMap.get('blogid');
    this.blogService.getPost(this.blogid).subscribe((res)=>{
      this.blogObj=res;
    })

    this.commentService.getComments().subscribe((res)=>{
      this.commentData=res.filter((x: { postId: any; })=>x.postId==this.blogid)
    })
  }
}
