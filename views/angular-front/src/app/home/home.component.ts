import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private posts:PostService) { }

  ngOnInit(): void {
    let data = {

    }
    this.posts.getPosts().subscribe((res)=>{

      console.log("results",res);

    })
  }

}
