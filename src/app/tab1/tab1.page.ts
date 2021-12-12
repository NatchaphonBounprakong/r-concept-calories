import { Component, ElementRef, ViewChild } from '@angular/core';
import { menus } from '../data/menus';
import { AppService } from '../services/app.service';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  filter = ""
  menus = menus;
  filteredMenus;
  public columns: any;
  public rows: any;

  constructor(public appService: AppService, public popoverController: PopoverController) {
    this.columns = [
      { name: 'Name' },
      { name: 'Unit' },
      { name: 'Cal' }
    ];

  }

  async presentPopover() {
    this.appService.count.next(0);
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      //event: ev,
      translucent: true,
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  ngOnInit() {

    this.filteredMenus = menus
  }

  onChangeFilter() {
    if (this.filter) {
      this.filteredMenus = this.menus.filter(o => o.name.indexOf(this.filter) > -1)
    } else {
      this.filteredMenus = this.menus
    }
  }

  onAddMenus(menu) {
    this.appService.count.next(0);
    if (this.appService.selectedMenus.length === 0) {
      this.appService.selectedMenus.push({ ...menu, ...{ count: 1 } })
    } else {
      let menuExist = this.appService.selectedMenus.find(o => o.name === menu.name && o.unit === menu.unit && o.cal === o.cal)
      if (menuExist) {
        menuExist.count = menuExist.count + 1;
      } else {
        this.appService.selectedMenus.push({ ...menu, ...{ count: 1 } })
      }
    }

  }
}
