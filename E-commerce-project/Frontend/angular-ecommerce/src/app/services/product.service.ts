import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId: number): Observable<Product[]> {

    //@TODO: need to build URL based on category id passed in
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    //const searchUrl = this.baseUrl+"products/search/findByCategoryId?id="+theCategoryId;
    return this.getProducts(searchUrl);
  }
  searchProducts(theKeyword: string): Observable<Product[]> {
    //@TODO: need to build URL based on category id passed in
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    
    return this.getProducts(searchUrl);
  }

  //paginated for keyword search result
  searchProductsPaginate(thePage: number, 
                        thePageSize: number,
                        theKeyword: string): Observable<GetResponseProducts> {
    
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`+`&page=`+thePage+`&size=${thePageSize}`;;
    
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }
  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  } 

  getProductsListPaginate(thePage: number, 
                                  thePageSize: number,
                                  theCategoryId: number): Observable<GetResponseProducts> {

      const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`+`&page=`+thePage+`&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  } 

  getProductCategories(): Observable<ProductCategory[]> {
    //const categoryUrl = this.baseUrl+"product-category";
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  getProduct(theProductId: number): Observable<Product>{
    return this.httpClient.get<Product>(this.baseUrl+"/"+theProductId);
  }


}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}