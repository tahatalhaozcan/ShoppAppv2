import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
  providers :[CategoryService]
})
export class ProductCreateComponent implements OnInit {
  categories: Category[]=[];
  error:string="";
  model:any = {
    name: "iPhone 17"
  };

  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data =>{
      this.categories = data;

    })
  }

  saveProduct(form:NgForm){

    if(this.model.categoryId =="")
    {
      this.error ="Kategori Seçiniz.";
      return;
    }




    const p = {
      id:1,
      name: this.model.name,
      price: this.model.price,
      imageUrl :this.model.price,
      description: this.model.description,
      isActive:this.model.isActive,
      categoryId:this.model.categoryId
    }
    if(form.valid){
      this.productService.createProduct(p).subscribe(data => {this.router.navigate(['/products']);


      });
    }
    else{
      this.error ="Formu kontrol ediniz.";
    }


    console.log(this.model)
  }

}
