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

  /**
   * Constructor.
   *
   * @ignore
   * @param openFoodFacts - Dependency injection to stop mid scan.
   * @param storageService - Dependency injection to store and access data in local storage
   * @param languageService - Dependency injection to access localization.
   */
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
