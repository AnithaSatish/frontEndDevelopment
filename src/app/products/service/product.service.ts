import { Injectable } from '@angular/core';
import {catchError, retry} from 'rxjs/operators';
import {HttpClient,HttpErrorResponse} from '@angular/common/http'
import {Observable, throwError} from 'rxjs';
import { IProduct } from '../models/iproduct';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpclient:HttpClient) { }

  getAllProducts():Observable<IProduct[]>{
  let url='http://127.0.0.1:5000/api/products/'
  return this.httpclient.get<IProduct[]>(url).pipe(
    retry(1),
    catchError(this.handleError)
  )
  }


  public getProduct(productId: any):Observable<IProduct>{
    let url=`http://127.0.0.1:5000/api/products/${productId}`
    return this.httpclient.get<IProduct>(url).pipe(
      retry(1),
      catchError(this.handleError)
    )
    }

    public createProduct(product:IProduct):Observable<IProduct>{
      let url = `http://127.0.0.1:5000/api/products/`;
      return this.httpclient.post<IProduct>(url, product).pipe(
        retry(1),
        catchError(this.handleError)
      )
    }
  
    // Update a Product
    public updateProduct(product:IProduct , productId:string):Observable<IProduct>{
      let url = `http://127.0.0.1:5000/api/products/${productId}`;
      return this.httpclient.put<IProduct>(url, product).pipe(
        retry(1),
        catchError(this.handleError)
      )
    }
  
    // Delete a Product
    public deleteProduct(productId:string):Observable<IProduct>{
      let url = `http://127.0.0.1:5000/api/products/${productId}`;
      return this.httpclient.delete<IProduct>(url).pipe(
        retry(1),
        catchError(this.handleError)
      )
    }

  public handleError(error:HttpErrorResponse){
    let errorMessage:string = '';
    if(error.error instanceof ErrorEvent){
      // client Error
      errorMessage = `Error : ${error.error.message}`
    }
    else{
      // server error
      errorMessage = `Status : ${error.status} \n Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
