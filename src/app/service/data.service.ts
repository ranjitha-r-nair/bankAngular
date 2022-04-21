import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//classn pirath global ayi headers ne define cheym 

const options = {
  headers: new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentAcno: any
  currentUname: any


  database: any = {
    1000: { acno: 1000, uname: "Neer", password: 1000, balance: 5000, transaction: [] },
    1001: { acno: 1001, uname: "Vyom", password: 1001, balance: 5000, transaction: [] },
    1002: { acno: 1002, uname: "Laisha", password: 1002, balance: 5000, transaction: [] }
  }


  constructor(private http: HttpClient) {
    // this.getData()
  }

  //to store data in local storage
  storeData() {
    localStorage.setItem("database", JSON.stringify(this.database))
    if (this.currentAcno) {
      localStorage.setItem("currentAcno", JSON.stringify(this.currentAcno))
    }
    if (this.currentUname) {
      localStorage.setItem("currentUname", JSON.stringify(this.currentUname))
    }
  }

  // to get data from the local storage

  getData() {

    if (localStorage.getItem("database")) {

      this.database = JSON.parse(localStorage.getItem("database") || '')
    }
    if (localStorage.getItem("currentAcno")) {
      this.currentAcno = JSON.parse(localStorage.getItem("currentAcno") || '')
    }
    if (localStorage.getItem("currentUname")) {
      this.currentUname = JSON.parse(localStorage.getItem("currentUname") || '')
    }

  }

  register(acno: any, uname: any, password: any) {
    //jsondata //create request  body
    const data = {
      acno, uname, password  //thunderclientnte req  bodyl koduthathum ithm same ayiriknm 
    }
    //register api - serverl koduthitula req url return cheyan//api call

    return this.http.post('http://localhost:3000/register', data) //data koduthath athile content an body ayi pass cheyunath
    // let database = this.database
    // if(acno in database)
    // {
    //   return false
    // }
    // else{
    //   database[acno]={
    //     acno,
    //     uname,
    //     password,
    //     balance:0,
    //     transaction:[]
    //   }
    //   console.log(database)
    //   this.storeData()
    //   return true
    // }
  }

  //login

  login(acno: any, password: any) {

    //request body 

    const data = {
      acno, password
    }
    //login api
    return this.http.post('http://localhost:3000/login', data) //data koduthath athile content an body ayi pass cheyunath//ith kazhinj login component.ts filek pokua asynchrounous ayi kodukuka

    //  let database = this.database

    //  if(acno in database)
    //  {
    //    if(password == database[acno]["password"]){

    //   this.currentAcno=acno

    //   this.currentUname=database[acno]["uname"]
    // //login cheyumbo ulla current usermte acno m uname m eduthu

    // this.storeData()

    //      return true

    //    }
    //    else
    //    {
    //      alert("incorrect password")
    //      return false
    //    }
    //   }
    //  else {
    //    alert("user not exist")
    //    return false
    //  }
 }

  //deposit

  deposit(acno: any, password: any, amt: any) {

    const data = {
      acno, password, amt
    }




    //deposit api
    return this.http.post('http://localhost:3000/deposit', data, this.getOptions()) //data koduthath athile content an body ayi pass cheyunath//ith kazhinj dashboard component.ts filek pokua asynchrounous ayi kodukuka

    //   var amount=parseInt(amt)


    //     let database = this.database

    //   if(acno in database)
    //   {
    //     if(password == database[acno]["password"])
    //     {
    //         database[acno]["balance"]+=amount

    //         database[acno]["transaction"].push({
    //           amount:amount,
    //           type:"credit"
    //         })
    // this.storeData()
    //         return database[acno]["balance"]

    //       }


    //     else
    //     {
    //       alert("incorrct password")
    //       return false
    //     }
    //    }
    //   else {
    //     alert("user not exist")
    //     return false
    //   }
  }

  //to add token in request header

  getOptions() {
    //fetch token from local storage 

    const token = JSON.parse(localStorage.getItem('token') || '')  


  //append this token to the header
//to  create request header

let headers = new HttpHeaders()   

if (token) {
      headers = headers.append('x-access-token', token)
      options.headers = headers
    }
    return options
  }



  //withdraw


  withdraw(acno: any, password: any, amt: any) {

    //rqst body
    const data = {
      acno, password, amt
    }


    return this.http.post('http://localhost:3000/withdraw', data, this.getOptions()) //data koduthath athile content an body ayi pass cheyunath//ith kazhinj dashboard component.ts filek pokua asynchrounous ayi kodukuka

    // var amount = parseInt(amt)

    // let database = this.database

    // if (acno in database) {
    //   if (password == database[acno]["password"]) {
    //     if (database[acno]["balance"] > amount) {
    //       database[acno]["balance"] -= amount
    //       database[acno]["transaction"].push({
    //         amount: amount,
    //         type: "Debit"
    //       })
    //       this.storeData()
    //       return database[acno]["balance"]

    //     }
    //     else {
    //       alert("insufficient balance")
    //       return false
    //     }
    //   }
    //   else {
    //     alert("incorrct password")
    //     return false
    //   }
    // }
    // else {
    //   alert("user not exist")
    //   return false
    // }
  }

  //transaction

  getTransaction(acno: any) {

    const data = {
      acno
    }

    return this.http.post('http://localhost:3000/transaction', data, this.getOptions()) //data koduthath athile content an body ayi pass cheyunath//ith kazhinj dashboard component.ts filek pokua asynchrounous ayi kodukuka

    // return this.database[acno]["transaction"]
  }

  //delete account

  delete(acno:any){
    //delete acc api

   

    return this.http.delete('http://localhost:3000/deleteAcc/'+acno,this.getOptions())
  }

}
