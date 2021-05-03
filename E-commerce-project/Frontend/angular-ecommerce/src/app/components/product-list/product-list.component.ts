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
  previousCategoryId: number = 1;
  currentCategoryName: string = "Books";
  searchMode: boolean = false;

  //new props for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string = "";
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
    //if we have different keyword than the previous keyword 
    //then set the page number to 1
    
    if( this.previousKeyword != theKeyword){
        this.thePageNumber=1;
    }
    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword} , thePageNumber=${this.thePageNumber}`);

    
    
    //now get the products for given keyword
    this.productService.searchProductsPaginate(this.thePageNumber-1,
                                              this.thePageSize,
                                              theKeyword).subscribe(
      this.processResult()
    );
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
      //this.currentCategoryName = "Books";
    }

    //check if we have a different category id then the previous
    // notte: angular will reuse a component if it is currently being viewed

    //if we have a diff category id then prev then reset the page number back to 1
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber=1;
    }
    this.previousCategoryId=this.currentCategoryId;
    console.log(`current category id=${this.currentCategoryId} ::: prev category id=${this.previousCategoryId} ::: current page number=${this.thePageNumber}`);

    console.log(`current page num=${this.thePageNumber} ::: pagesize=${this.thePageSize} ::: tot elem=${this.theTotalElements}`);



    //now get the products for given category id
    this.productService.getProductsListPaginate(this.thePageNumber - 1,
                                                this.thePageSize,
                                                this.currentCategoryId)
                                                .subscribe(
              this.processResult()
    );
  }
  processResult(){
    return (data:any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  updatePageSize(newPageSize: number){
    this.thePageSize=newPageSize;
    this.thePageNumber=1;
    this.listProducts();
  }

}
