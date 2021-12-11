import { Component, ElementRef, ViewChild } from '@angular/core';
import * as _ from "lodash"
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  alphabet = ["ก", "ข", "ฃ", "ค", "ฅ", "ฆ", "ง", "จ", "ฉ", "ช", "ซ", "ฌ", "ญ", "ฎ", "ฏ", "ฐ", "ฑ", "ฒ", "ณ", "ด", "ต", "ถ", "ท", "ธ", "น", "บ", "ป", "ผ", "ฝ", "พ", "ฟ", "ภ", "ม", "ย", "ร", "ล", "ว", "ศ", "ษ", "ส", "ห", "ฬ", "อ", "ฮ"]
  result = "ก"
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
