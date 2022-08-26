import {Component, OnDestroy, OnInit} from '@angular/core';
import {OpenFoodFactsService} from '../services/open-food-facts.service';
import {Router} from '@angular/router';
import {BarcodeScanner} from '@capacitor-community/barcode-scanner';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})

/**
 * Module to start the product scan with.
 */
export class ScanPage implements OnInit, OnDestroy {

  /**
   * Result of last scan.
   */
  result = null;

  /**
   * Constructor.
   *
   * @ignore
   * @param openFoodFacts - Dependency injection to scan and process products
   * @param router - Dependency injection to navigate to the result page after scanning
   * @param alertController - Dependency injection to display alert when permissions are missing.
   */
  constructor(public openFoodFacts: OpenFoodFactsService,
              private router: Router,
              private alertController: AlertController) { }

  /**
   * @ignore
   */
  ngOnInit(): void {

  }

  /**
   * Lifecycle hook that stops scan when the module is destroyed.
   *
   * @ignore
   */
  ngOnDestroy(){
    BarcodeScanner.stopScan();
  }

  /**
   * Starts the scan, forwards the result to the service and navigates to the result page.
   */
  async startScan(){
    const allowed = await this.checkPermission();
    if(allowed){
      this.openFoodFacts.scanActive = true;
      document.body.classList.add('scanner');
      await BarcodeScanner.hideBackground();
      const result = await BarcodeScanner.startScan();
      if(result.hasContent){
        this.result = result.content;
        this.openFoodFacts.scanActive = false;
        document.body.classList.remove('scanner');
        await this.openFoodFacts.getIngredients(this.result);
        await this.router.navigate(['/result']);
      }
    }
  }

  /**
   * Check if the app was granted the permission to use the device camera.
   */
  async checkPermission(){
    return new Promise(async (resolve) =>{
      const status = await BarcodeScanner.checkPermission({force: true});
      if(status.granted){
        resolve(true);
      } else if(status.denied){
        const alert = await this.alertController.create({
          header: 'No permission',
          message: 'Please allow camera access in your settings',
          buttons: [{
            text: 'No',
            role: 'cancel'
          },{
            text: 'Open Settings',
            handler: () => {
              resolve(false);
              BarcodeScanner.openAppSettings();
            }
          }]
        });

        await alert.present();
      } else {
        resolve(false);
      }
    });
  }
}
