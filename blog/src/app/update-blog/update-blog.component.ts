import { Component,OnInit } from '@angular/core';
import { FormGroup,Validators,FormControl } from '@angular/forms';
import { BlogService } from '../services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.css']
})
export class UpdateBlogComponent implements OnInit {
  blogid:any;
  blogObj:any;

  form=new FormGroup({
    title:new FormControl(null,[Validators.required]),
    body:new FormControl(null,[Validators.required])
  })

  constructor(private blogService:BlogService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {

    this.blogid=this.route.snapshot.paramMap.get('blogid');
    this.blogService.getPost(this.blogid).subscribe((res)=>{
      this.blogObj=res;
      this.form.patchValue({
        title:this.blogObj.title,
        body:this.blogObj.body,

      })
    })
  }
  onSubmit()
  {
    const request={
      title:this.form.get('title')?.value,
      body:this.form.get('body')?.value,
      imageId:this.blogObj.imageId,
      userId:this.blogObj.userId,
    }
    this.blogService.updatePosts(this.blogObj.id,request).subscribe(res=>{
      this.router.navigateByUrl('home');
    })
  }
}
