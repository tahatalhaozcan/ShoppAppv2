import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ProductRepository } from '../models/product.repository';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers:[ProductService]
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  loading = false;
  constructor(private route: ActivatedRoute, private productService : ProductService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loading = true;
      this.productService.getProducts(params["categoryId"]).subscribe(data => {
        this.products = data;
        this.loading = false;
      });

    });
  }

}
