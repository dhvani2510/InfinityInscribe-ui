import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { FormBuilder } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { AuthenticationService } from 'src/app/authentication.service';
import { UserService } from 'src/app/user.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  search1: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private service: AppService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUser();
    this.getBlogs();
    this.getPopular();
    this.getFollowerBlog();
    this.getCategory();
  }
  url = "http://localhost:10083/user/getMyProfile";
  id:any;
  getUser()
  {
    this.userService.getUser().subscribe(
      (res:any ) => {
        if(res.status == 200) {
          console.log(res.data);
        }
        else {
          console.log(res.message);
        }
      },
      (error:any) => {
        console.log(error);
      });
  }
  sendId()
  {
      this.router.navigate(["/profile/"+this.id]);
  }
  blogpage()
    {
      this.router.navigate(["/createBlog"]);
    }

    logoutUrl = "http://localhost:10083/login/logout";
    logout()
    {
  
      if(confirm("you want to logout??"))
      { if(this.service.checkLogin())
        {
          this.authService.logoutService();
          this.httpClient.get(this.logoutUrl).subscribe(res=>
            {
                alert("Logout successful");
            });
         
          this.router.navigate(["/home"]);
        }}
        else{
          alert("ohk");
        }
     
    }
  checkLogin(){
    return this.service.checkLogin();
  }
  blog:any[]=[];
  popularBlog:any[]=[];
  followerBlogs:any[]=[];
  getBlogs(){
    let url="http://localhost:10083/blog/recent";
    let headers=this.authService.addHeaders();

    this.httpClient.get(url,{headers}).subscribe((res:any)=>{
      this.blog=res;
      console.log(this.blog);
    });
  }


  getPopular(){
    let url="http://localhost:10083/blog/popular";
    let headers=this.authService.addHeaders();

    this.httpClient.get(url,{headers}).subscribe((res:any)=>{
      this.popularBlog=res;
      console.log(this.blog);
    });
  }

  getFollowerBlog(){
    let url="http://localhost:10083/blog/followerBlogs";
    let headers=this.authService.addHeaders();

    this.httpClient.get(url,{headers}).subscribe((res:any)=>{
      this.followerBlogs=res;
      console.log(this.blog);
    });
  }

  search(i:string)
  {
    let categoryUrl="http://localhost:10083/blog/search/category/"+i;
    let headers=this.authService.addHeaders();

    this.httpClient.get(categoryUrl,{headers}).subscribe((res:any)=>{
      this.blog=res;
      this.followerBlogs =res;
      console.log(this.blog);
    });
  }

  searchinput()
  {
    let categoryUrl="http://localhost:10083/blog/search/"+this.search1;
    let headers=this.authService.addHeaders();

    this.httpClient.get(categoryUrl,{headers}).subscribe((res:any)=>{
      this.blog=res;
      this.followerBlogs =res;
      console.log(this.blog);
    });
  }
  categoriess=[];

  getCategory()
  {
    let url = "http://localhost:10083/blog/getCategory";
    let headers=this.authService.addHeaders();

    this.httpClient.get(url,{headers}).subscribe((res:any)=>
    {
      this.categoriess=res;
      console.log(this.categoriess);
    }
    );
  }

  showUsers()
  {
    this.router.navigate(["/userList"]);

  }
}

