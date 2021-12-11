import { Component, ElementRef, ViewChild } from '@angular/core';
import * as _ from "lodash"
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  result = "A"
  resultHistory = []
  disable
  constructor() { }
  onRandom() {
    this.disable = true;
    let interval = setInterval(o => {
      this.result = _.sample(this.alphabet)
    }, 100)
    setTimeout(() => {
      this.disable = false;
      this.resultHistory.push({ result: this.result, date: new Date() })
      try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch (err) { }
      clearInterval(interval);
    }, 700);
  }

}
