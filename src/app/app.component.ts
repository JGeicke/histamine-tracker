import { Component } from '@angular/core';
import {OpenFoodFactsService} from './services/open-food-facts.service';
import {BarcodeScanner} from '@capacitor-community/barcode-scanner';
import {LanguageService} from './services/language.service';
import {StorageService} from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
/**
 * Base module.
 */
export class AppComponent {
  constructor(public openFoodFacts: OpenFoodFactsService,
              private storageService: StorageService,
              private languageService: LanguageService) {
    this.languageService.setInitialAppLanguage();
  }

  /**
   * Stop the scan process after pressing the button.
   */
  public stopScanner(){
    BarcodeScanner.stopScan();
    this.openFoodFacts.scanActive = false;
    document.body.classList.remove('scanner');
  }
}
