import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  aim=" your perfect banking partner"
  accno="account no please"
  acno=""
  pwd=""

  // database:any={
  //   1000:{acno:1000,uname:"Neer",password:1000,balance:5000},
  //   1001:{acno:1001,uname:"Vyom",password:1001,balance:5000},
  //   1002:{acno:1002,uname:"Laisha",password:1002,balance:5000}
  // }

  loginForm=this.fb.group({
    //form array creation

    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pwd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z ]*')]],
  })


  constructor(private rout:Router,private ds:DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
// //accno change
//   acnoChange(event:any)
//   {
//     this.acno=event.target.value
//     console.log(this.acno);
//   }

//   //passwrd change  
//   pwdChange(event:any)
//   {
//     this.pwd=event.target.value
//     console.log(this.pwd);
//   }

//   login(a:any,p:any)   //template referencing variable
// {
//  console.log(a)

//  var acno=a.value
//  var pwd=p.value

//  let database=this.database
//  if(acno in database)
//  {
//    if(pwd == database[acno]["password"]){
//      alert("login successful")
//    }
//    else{
//      alert("incorrect password")
//    }
//  }
//  else{
//    alert("user not exist")
//  }

  
//login

login()
{
 // alert("login clicked!!!!!!!!!!!")

 var acno=this.loginForm.value.acno
 var pwd=this.loginForm.value.pwd

 
//  let database=this.ds.database
//  if(acno in database)
//  {
//    if(pwd == database[acno]["password"]){
//      alert("login successful")
//      this.rout.navigateByUrl("dashboard")
//    }
//    else
//    {
//      alert("incorrect password")
//    }
//   }
//  else {
//    alert("user not exist")
//  }

if(this.loginForm.valid){

const result=this.ds.login(acno,pwd)
if(result){
  alert("login successful")
  this.rout.navigateByUrl("dashboard")
}
}
else{
  alert("invalid form")
}
}
}

