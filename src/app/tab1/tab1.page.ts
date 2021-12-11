import { Component, ElementRef, ViewChild } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  day = 1;
  month = 1
  year = 2564;
  a = "asdasd"
  solitary = 0;
  under1 = 0;
  under2 = 0;
  three = [];
  two = []
  isLoading = false
  interval1 = null;
  interval2 = null

  thmonth = ""
  selected
  loadingNumText = 123;
  loadingText = "";
  round = []
  monthth = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ]
  constructor(private appService: AppService) { }

  ngOnInit() {
    const d = new Date();
    this.day = d.getDate()
    this.month = d.getMonth() + 1
    this.thmonth = this.monthth[d.getMonth()]
    this.year = d.getFullYear();


    for (let i = d.getMonth(); i < 12; i++) {
      let item1 = {
        value: "01" + this.pad(i, 2) + this.year,
        day: 1,
        month: i + 1,
        thmonth: this.monthth[i],
        year: this.year,
      }
      let item16 = {
        value: "16" + this.pad(i, 2) + this.year,
        day: 16,
        month: i + 1,
        thmonth: this.monthth[i],
        year: this.year,
      }
      this.round.push(item1)
      this.round.push(item16)
    }
    if (this.day > 16) {
      this.day = 1;
      this.selected = "01" + this.pad(this.month, 2) + this.year
      this.month += 1
    } else {
      this.day = 16;
      this.selected = "16" + this.pad(this.month - 1, 2) + this.year
    }
    this.aiCalculator()


  }

  aiCalculator() {
    this.three = []
    this.two = []


    this.solitary = (this.day * 1 + this.month * 2 + this.year * 3) % 10
    this.under1 = (this.day * 3 + this.month * 2 + this.year * 1) % 10
    if (this.under1 === this.solitary) {
      this.under1 = (this.under1 + 2) % 10
    }
    this.under2 = (this.day * 2 + this.month * 1 + this.year * 3) % 10
    if (this.under2 === this.solitary || this.under2 === this.under1) {
      this.under2 = (this.under2 + 5) % 10
    }

    for (let i = 0; i < 3; i++) {
      let first = this.solitary.toString();
      let tt = ((this.day * this.month * 2 + this.year * 3) + i * this.month) % 100
      this.three.push(first + ("0" + tt).slice(-2))
    }

    for (let i = 0; i < 2; i++) {
      let index = (this.day * 1 + this.month * 2 + this.year * 3 + i) % 2
      let tt = ((this.day * 2 + this.month * 1 + this.year * 3) + i * this.month) % 100


      if (index === 0) {
        this.three.push(("0" + tt).slice(-2) + this.under1.toString())
      } else {
        this.three.push(this.under1.toString() + ("0" + tt).slice(-2))
      }
    }

    for (let i = 0; i < 2; i++) {
      let index = (this.day * this.month * 2 + this.year * 3 + i) % 2
      let tt = ((this.day * this.month * 1 + this.year * 3) + i * this.month) % 100

      if (index === 0) {
        this.three.push(("0" + tt).slice(-2) + this.under2.toString())
      } else {
        this.three.push(this.under2.toString() + ("0" + tt).slice(-2))
      }
    }


    for (let i = 0; i < 3; i++) {
      let first = this.solitary.toString();
      let index = (this.day * this.month * 2 + this.year * 3 + i) % 2
      let tt = ((this.day * this.month * 2 + this.year * 3) + i * this.month) % 10
      if (index === 0) {
        this.two.push(first + tt.toString())
      } else {
        this.two.push(tt.toString() + first)
      }
    }

    for (let i = 0; i < 2; i++) {
      let first = this.under1.toString();
      let index = (this.day * this.month * 2 + this.year * 3 + i) % 2
      let tt = ((this.day * this.month * 2 + this.year * 3) + i * this.month) % 10
      if (index === 0) {
        this.two.push(first + tt.toString())
      } else {
        this.two.push(tt.toString() + first)
      }
    }

    for (let i = 0; i < 2; i++) {
      let first = this.under2.toString();
      let index = (this.day * this.month + this.year * 3 + i) % 2
      let tt = ((this.day * 5 * this.month * 2 + this.year * 3) + i * this.month) % 10
      if (index === 0) {
        this.two.push(first + tt.toString())
      } else {
        this.two.push(tt.toString() + first)
      }
    }
  }
  pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  }
  changeDate($event) {
    var result = this.round.find(o => o.value === this.selected)
    this.day = result.day
    this.month = result.month + 1
    this.year = result.year
    this.calculating()
    this.aiCalculator()
    this.appService.count.next(0)
  }
  calculating() {
    this.isLoading = true;
    let i = 0;
    let step = ["#ประวัติออกหวย", "#กำลังคำนวณ", "#จำลองระบบ", "#พิสูจน์ผลลัพท์", "#แปรผลลัพท์", "#ลบข้อผิดพลาด", "#กำลังแสดงผลลัพท์"]
    if(this.interval1 !== null){
      clearInterval(this.interval1)
      clearInterval(this.interval2)
    }

    this.interval1 = setInterval(() => {
      this.loadingNumText = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    }, 100)
    this.interval2 = setInterval(() => {
      this.loadingText = step[i];
      i++
      if (i > step.length) {
        i = 0;
      }
    }, 500)
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }
}
