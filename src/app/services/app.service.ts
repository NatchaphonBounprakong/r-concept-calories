import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public count: Subject<any> = new Subject<any>()


  selectedMenus = [
    // {
    //   name: 'แกงส้มผักกระเฉดปลา',
    //   unit: '1 ชาม',
    //   cal: 110
    // }
  ]
  constructor() { }
}
