import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  products: Product[] = [];
  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  currentCategoryId: number = 1;
  currentCategoryName: string = "Books";
  searchMode: boolean = false;


  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });

  }
  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }

  }
  handleSearchProducts() {
    
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword') as string; 
    
    //now get the products for given keyword
    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  handleListProducts() {
    //Check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      //get the id and convert it to a number with '+'
      this.currentCategoryId = +(this.route.snapshot.paramMap.get('id') as string);
      this.currentCategoryName = (this.route.snapshot.paramMap.get('name') as string);
    }
    else {
      this.currentCategoryId = 1;
      this.currentCategoryName = "Books";
    }
    //now get the products for given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
