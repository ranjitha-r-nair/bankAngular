import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  transactions:any
  acno:any
  constructor(private ds:DataService) { 

    // this.acno = this.ds.currentAcno
    //data ini varua local storagen anu

    this.acno =JSON.parse(localStorage.getItem('currentAcno')||'')

    // this.transactions=this.ds.getTransaction(this.acno)

    this.ds.getTransaction(this.acno)

    //asynchonous
.subscribe((result:any)=>{
  if(result)
{
  this.transactions= result.transaction
}
},
result=>{
  alert(result.error.message)
})
    

    // console.log(this.transactions);
    
  }

  ngOnInit(): void {
  }

}
