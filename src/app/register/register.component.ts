import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  uname = ""
  acno = ""
  pwd = ""


  //Register model creation 


  registerForm = this.fb.group({
    //form array creation

    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pwd: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z ]*')]],
    uname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]]
  })
  constructor(private ds: DataService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void { }


  register() {
    //alert("register clicked")


    var acno = this.registerForm.value.acno
    var uname = this.registerForm.value.uname
    var pwd = this.registerForm.value.pwd

    console.log(this.registerForm);

    //ithoru synchronous event anu 
    //register  forml koduthe valid ano nokan valid 
    if (this.registerForm.valid) {


       this.ds.register(acno, uname, pwd)
        //resolve cheyndath subscribel kodukm-subscribe rxjs nte resolved state an to solve asynchronous event
        .subscribe ((result: any) => {
          if (result) {
            alert(result.message)  //serverl message l koduthath kitan 
            this.router.navigateByUrl("")
          }
        },
          (result) => {
            alert(result.error.message)
          }
        )
      //  if(result){

      //   alert("added successfully")
      //    this.router.navigateByUrl("")
      //  }
      //  else
      //  {
      // alert("user already exist.......please login")
      //  }
    }
    else {
      alert("invalid form")
    }
  }
}
