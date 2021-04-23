import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IProduct } from '../../models/iproduct';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
public productId:any='';
public selectedProduct:any;
errorMessage:any=''
  constructor(private activateRoute:ActivatedRoute,
    private productService:ProductService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((param:ParamMap)=>{
      this.productId=param.get('id')
    })

    this.productService.getProduct(this.productId).subscribe((data)=>{
      this.selectedProduct=data
    })
  }

  submitUpdate(event:any){
    if(this.selectedProduct.name !== '' && this.selectedProduct.img !== '' && this.selectedProduct.price !== null &&
    this.selectedProduct.qty !== null && this.selectedProduct.info !== ''){
    this.productService.updateProduct(this.selectedProduct,this.productId).subscribe((data)=>{
      this.router.navigate(['./products/admin'])
      
      },(error)=>{
        this.errorMessage=error;
    });
  }
  }

}
