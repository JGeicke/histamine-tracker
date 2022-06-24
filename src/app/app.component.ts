import { Component } from '@angular/core';
import {OpenFoodFactsService} from './services/open-food-facts.service';
import {BarcodeScanner} from '@capacitor-community/barcode-scanner';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public openFoodFacts: OpenFoodFactsService) {}

  public stopScanner(){
    BarcodeScanner.stopScan();
    this.openFoodFacts.scanActive = false;
    document.body.classList.remove('scanner');
  }
}
