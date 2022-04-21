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
    if(localStorage.getItem('currentUname')){
      this.user=JSON.parse(localStorage.getItem('currentUname')||'')
    }
  
   
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
      //calling asynchonous
       this.ds.deposit(acno, pwd, amount)

.subscribe((result:any)=>{
  if (result) {

    alert( result.message)
  }
},
(result)=>{
  
    alert(result.error.message)
  })
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

      this.ds.withdraw(acno1, pwd1, amount)

      .subscribe((result:any)=>{

      if (result) {
        
        alert(result.message)

        // alert(amount + "successfully debited....and new balance is" + result)
      }
    },
    (result)=>{
  
      alert(result.error.message)
    })
  }
  else {
    alert("invalid form")
  }
  
    }


  

  logout(){
    localStorage.removeItem("currentAcno")
    localStorage.removeItem("currentUname")
    localStorage.removeItem("token")

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
    this.ds.delete(event)
    .subscribe((result:any)=>{
      if(result){

      alert(result.message)

      localStorage.removeItem("currentAcno")
      localStorage.removeItem("currentUname")
      localStorage.removeItem("token")


      this.router.navigateByUrl("")

      
    }
    },
    (result)=>{
      alert(result.error.message)
    }
    )

//     alert("delete account"+event)
// this.router.navigateByUrl("")


  }

}

