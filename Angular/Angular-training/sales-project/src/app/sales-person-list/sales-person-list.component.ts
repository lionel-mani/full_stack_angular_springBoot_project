import { Component, OnInit } from '@angular/core';
import { SalesPerson } from './sales-person';

@Component({
  selector: 'app-sales-person-list',
  templateUrl: './sales-person-list.component.html',
  styleUrls: ['./sales-person-list.component.css']
})
export class SalesPersonListComponent implements OnInit {
  //create an array of sales person objects
  salesPersonList: SalesPerson[] = [
    new SalesPerson("Anup", "kumar", "anup@gmail.com", 100),
    new SalesPerson("banup", "kumar", "banup@gmail.com", 200),
    new SalesPerson("sonup", "kumar", "sonup@gmail.com", 300),
    new SalesPerson("kanup", "kumar", "kanup@gmail.com", 400)
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
