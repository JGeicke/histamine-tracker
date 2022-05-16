import { Component, OnInit } from '@angular/core';
import {BarcodeScanner} from '@capacitor-community/barcode-scanner';
import {OpenFoodFactsService} from '../services/open-food-facts.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  constructor(private openFoodFacts: OpenFoodFactsService,
              private router: Router) { }

  ngOnInit() {
  }

  async startScan(){
    /*
    const startScan = async () =>{
      await BarcodeScanner.hideBackground();

      const result = await BarcodeScanner.startScan();

      if(result.hasContent){
        console.log(result.content);
      }
    };
     */
    await this.openFoodFacts.getIngridients();
    await this.router.navigate(['/result']);
  }

}
