import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from '../../models/iproduct';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
 
public product:IProduct={
  _id:'',
  name:'',
  img:'',
  price:0,
  qty: 0,
  info:''
}

imageFileName:any;
errorMessage:any;
emptyFeilds:boolean=false
  constructor(private productService:ProductService,private router:Router ) { }

  ngOnInit(): void {
  }

  selectProductImage(event:any){
    if(event.target.files && event.target.files.length){
      const[file]=event.target.files
      let reader=new FileReader()
      reader.readAsDataURL(file)
      this.imageFileName=file
      reader.addEventListener('load',()=>{
        return reader.result ? this.product.img=String(reader.result):'';
      });
    }

  }

  submitCreateProduct(){
    if(this.product.name !== '' && this.product.img !== '' && this.product.price !== null &&
    this.product.qty !== null && this.product.info !== ''){
    this.productService.createProduct(this.product).subscribe((data)=>{
      this.router.navigate(['./products/admin'])
      
      },(error)=>{
        this.errorMessage=error;
    });
  }
  }






}
