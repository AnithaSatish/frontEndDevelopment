import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
products:any
errorMessage:string=''
  constructor(private productService:ProductService) { }

  ngOnInit(): void {

    this.productService.getAllProducts().subscribe((data)=>{
      this.products=data
    },(error)=>{
      this.errorMessage=error
    })
  }

  deleteProduct(productId:any){
    this.productService.deleteProduct(productId).subscribe((data)=>{
     this.productService.getAllProducts().subscribe((data)=>{
       this.products=data
     },(error)=>{
       this.errorMessage=error
     });
     
    })

  }
}
