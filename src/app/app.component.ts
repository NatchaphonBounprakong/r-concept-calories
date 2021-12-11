import { Component, OnInit } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free/ngx';
import { Platform } from '@ionic/angular';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  start = 0;
  constructor(private admobFree: AdMobFree, private platform: Platform, private appService: AppService) { }
  ngOnInit(): void {
    this.platform.ready().then(() => {
      this.showBannerAd();
      //this.showInterstitialAds()
      this.appService.count.subscribe(o => {
        this.start = this.start + 1
        if (this.start % 4 === 0) {
          this.showInterstitialAds()
        }
      })
    })
  }


  showBannerAd() {
    let bannerConfig: AdMobFreeBannerConfig = {
      //isTesting: true, // Remove in production
      autoShow: true,
      id: "ca-app-pub-3914038868721011/8347392837"
    };
    this.admobFree.banner.config(bannerConfig);
    this.admobFree.banner.prepare().then(() => {
    }).catch(e => console.log(e));
  }


  showInterstitialAds() {
    let interstitialConfig: AdMobFreeInterstitialConfig = {
      //isTesting: true, // Remove in production
      autoShow: true,
      id: "ca-app-pub-3914038868721011/3095066158"
    };
    this.admobFree.interstitial.config(interstitialConfig);
    this.admobFree.interstitial.prepare().then(() => {
    }).catch(e => console.log(e));
  }

}
