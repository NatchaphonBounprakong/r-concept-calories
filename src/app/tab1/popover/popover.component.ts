import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  sum = 0;
  constructor(public appService: AppService) { }

  ngOnInit() {
    this.sum = this.appService.selectedMenus.map(o => o.cal * o.count).reduce((p, n) => p + n)
  }

  onClear(){
    this.appService.selectedMenus = [];
    this.sum = 0;
  }

}
