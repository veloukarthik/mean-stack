import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private posts: PostService) { }

  postsData:any = [];

  ngOnInit(): void {
    let data = {

    }
    this.posts.getPosts().subscribe((res) => {

      if (res.status == true) {

        this.postsData = res.data;
      }
      

    })
  }

}
