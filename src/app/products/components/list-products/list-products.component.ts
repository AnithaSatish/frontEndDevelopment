import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  products:IProduct[]=[]
  errorMessage:string=''
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data)=>{
      this.products=data
      console.log(this.products)
    },(error)=>{
      this.errorMessage=error
    })
  }



  

}
