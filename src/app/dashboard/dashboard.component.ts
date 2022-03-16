import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // acno = ""
  // pwd = ""
  // amount = ""



  // acno1 = ""
  // pwd1 = ""
  // amount1 = ""

  user:any
  lDate:any
  acno:any
  
  depositForm = this.fb.group({
    //form array creation

    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pwd: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z ]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })

  withdrawForm = this.fb.group({
    //form array creation

    acno1: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pwd1: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z ]*')]],
    amount1: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })



  constructor(private ds: DataService, private fb: FormBuilder,private router:Router) {
    this.user=this.ds.currentUname
   
   this.lDate=new Date()
}
  ngOnInit(): void {

    if(!localStorage.getItem("currentAcno")){
      alert("please log in")
      this.router.navigateByUrl("")
    }
  }


  deposit() {
    var acno = this.depositForm.value.acno
    var pwd = this.depositForm.value.pwd
    var amount = this.depositForm.value.amount

    //calling deposit fun n of database
    if (this.depositForm.valid) {

      const result = this.ds.deposit(acno, pwd, amount)
      if (result) {

        alert(amount + "successfully deposited....and new balance is" + result)
      }
    }
    else {
      alert("invalid form")
    }
  }



  withdraw() {
    var acno1 = this.withdrawForm.value.acno1
    var pwd1 = this.withdrawForm.value.pwd1
    var amount = this.withdrawForm.value.amount1

    if (this.withdrawForm.valid) {

      const result = this.ds.withdraw(acno1, pwd1, amount)
      if (result) {

        alert(amount + "successfully debited....and new balance is" + result)
      }
    }
    else {
      alert("invalid form")
    }

    //alert("withrdrw")
  }

  logout(){
    localStorage.removeItem("currentAcno")
    localStorage.removeItem("currentUname")
    this.router.navigateByUrl("")

  }
  deleteAccount()
  {
    this.acno=JSON.parse(localStorage.getItem("currentAcno") ||"")
  }
  cancel(){
    this.acno=""
  }

  delete(event:any){
    alert("delete account"+event)
this.router.navigateByUrl("")


  }

}

