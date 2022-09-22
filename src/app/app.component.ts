import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { Apiservice } from './service/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'category', 'date', 'productFressness','price','comment','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private dialog:MatDialog,private api:Apiservice){}

  ngOnInit(): void {
    this.getData();
  }

  openDialog() {
     this.dialog.open(DialogComponent,{
      width:'40%'
     }).afterClosed().subscribe(val=>{
      if(val==='Save'){
        
        console.log(this.getData());
      }
     })
  }
  getData(){
    this.api.getProduct().subscribe({
      next:(res:any)=>{
        this.dataSource=new MatTableDataSource(res)
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;

        // console.log(res)
      },
      error:()=>{
        console.log("error")

      }
    })
  }
  editProduct(row:any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getData();
      }
    })
  }
  deleteProduct(id:number){
 // console.log(this.api.deleteProduct(id));

  this.api.deleteProduct(id).subscribe({
    next:(res)=>{
      alert('Deleted successfully');
      this.getData();
      //console.log(res);
    },
    error:()=>{
      alert("Error showing during deleted times");
    }
  })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
