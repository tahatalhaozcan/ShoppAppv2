import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
import { Category } from '../models/category';

@Injectable(
  // {
  // providedIn: 'root' //global service
  // }
            )
export class CategoryService {
  private url = "https://ng-app2-a1de5-default-rtdb.firebaseio.com/";
  constructor(private http: HttpClient) {}

  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.url + "categories.json")
    .pipe(
      map(data =>{
        const categories : Category[]=[];

        for(const key in data){
          categories.push({...data[key],id:key})
        }
        return categories;
    }));
  }

  createCategory(category:Category): Observable<Category> {
    return this.http.post<Category>(this.url + "categories.json",category);
  }
}
