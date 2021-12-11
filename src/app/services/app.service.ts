import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public count: Subject<any> = new Subject<any>()


  public listWithNoUnit: any[] = [

  ]
  public listWithUnit: any[] = [

  ]
  constructor() { }
}
