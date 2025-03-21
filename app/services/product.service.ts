import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../models/product";
import { delay, map, Observable } from "rxjs";

//local service
@Injectable()
export class ProductService {
  private url = "https://ng-app2-a1de5-default-rtdb.firebaseio.com/"
  constructor(private http: HttpClient) {

  }

  getProducts(categoryId: number): Observable<Product[]>{
    return this.http
    .get<Product[]>(this.url +"products.json")
    .pipe(map(result =>{
                          const products: Product[] = [];
                          for(const key in result)
                          {
                            if(categoryId)
                            {
                                if (categoryId == result[key].categoryId)
                                {
                                  products.push({...result[key], id:key});
                                }
                            }
                            else
                            {
                              products.push({...result[key], id:key});
                            }
                          }
                          return products;
                        }
              ),
              delay(500)
            );
  }

  getProductById(id : string) : Observable<Product> {
    return this.http.get<Product>(this.url +  "products/" + id + ".json").pipe(delay(250))
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.url}/products.json`, product);
  }

}
