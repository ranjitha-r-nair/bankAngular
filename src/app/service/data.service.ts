import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  currentAcno:any
  currentUname:any

  database:any={
    1000:{acno:1000,uname:"Neer",password:1000,balance:5000,transaction:[]},
    1001:{acno:1001,uname:"Vyom",password:1001,balance:5000,transaction:[]},
    1002:{acno:1002,uname:"Laisha",password:1002,balance:5000,transaction:[]}
  }
  

  constructor() {
    this.getData()
   }

  //to store data in local storage
storeData()
{
  localStorage.setItem("database",JSON.stringify(this.database))
  if(this.currentAcno)
  {
    localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))
  }
  if(this.currentUname)
  {
    localStorage.setItem("currentUname",JSON.stringify(this.currentUname))
  }
}

// to get data from the local storage

getData(){

 if( localStorage.getItem("database")){

this.database=JSON.parse(localStorage.getItem("database") || '')
 }
  if(localStorage.getItem("currentAcno"))
  {
    this.currentAcno=JSON.parse(localStorage.getItem("currentAcno") || '')
  }
  if(localStorage.getItem("currentUname"))
  {
    this.currentUname=JSON.parse(localStorage.getItem("currentUname") || '')
  }

}

  register(acno:any,uname:any,password:any)
  {
    let database = this.database
    if(acno in database)
    {
      return false
    }
    else{
      database[acno]={
        acno,
        uname,
        password,
        balance:0,
        transaction:[]
      }
      console.log(database)
      this.storeData()
      return true
    }
  }

  //login

login(acno:any,password:any){


   let database = this.database

 if(acno in database)
 {
   if(password == database[acno]["password"]){

  this.currentAcno=acno

  this.currentUname=database[acno]["uname"]
//login cheyumbo ulla current usermte acno m uname m eduthu

this.storeData()

     return true

   }
   else
   {
     alert("incorrect password")
     return false
   }
  }
 else {
   alert("user not exist")
   return false
 }
}

//deposit

deposit(acno:any,password:any,amt:any){

  var amount=parseInt(amt)
  

    let database = this.database
  
  if(acno in database)
  {
    if(password == database[acno]["password"])
    {
        database[acno]["balance"]+=amount

        database[acno]["transaction"].push({
          amount:amount,
          type:"credit"
        })
this.storeData()
        return database[acno]["balance"]
  
      }
      
    
    else
    {
      alert("incorrct password")
      return false
    }
   }
  else {
    alert("user not exist")
    return false
  }
  }


//withdraw


withdraw(acno:any,password:any,amt:any)
{

var amount=parseInt(amt)

  let database = this.database

if(acno in database)
{
  if(password == database[acno]["password"])
  {
    if(database[acno]["balance"]>amount)
    {
      database[acno]["balance"]-=amount
      database[acno]["transaction"].push({
        amount:amount,
        type:"Debit"
      })
      this.storeData()
      return database[acno]["balance"]

    }
    else
    {
      alert("insufficient balance")
    return false
    }
  }
  else
  {
    alert("incorrct password")
    return false
  }
 }
else {
  alert("user not exist")
  return false
}
}

//transaction

getTransaction(acno:any)
{
  return this.database[acno]["transaction"]
}
}
