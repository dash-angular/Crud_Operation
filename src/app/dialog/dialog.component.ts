import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Apiservice } from '../service/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
 // [x: string]: any;
  productForm!: FormGroup;
  actionBtn: string = "Save";

  freshnesslist = ['Brand New', 'Second Hand', 'Refubrish'];
  
  constructor(
    private formBuilder: FormBuilder,
    private api: Apiservice,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialog: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      productFressness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
    });
     console.log(this.editData);

    if (this.editData) {
      this.actionBtn = "Update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['productFressness'].setValue(this.editData.productFressness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
    }
  }

  addProduct() {
  if(!this.editData){
    if (this.productForm.valid) {
      this.api.postProduct(this.productForm.value).subscribe({
        next: (res) => {
          alert('product added successfully');
          this.productForm.reset();
          this.dialog.close('Save');
        },
        error: () => {
          alert('product not added');
        },
      });
    }
  }else{
    this.updateProduct();
      }
  }
  updateProduct(){
    this.api.putProduct(this.productForm.value,this.editData.id).subscribe({
      next:(res)=>{
        alert("Data updated successfully");
        this.productForm.reset();
        this.dialog.close('update');
      },
      error:()=> {
        alert("error");
      }
    })
  }
}




  

