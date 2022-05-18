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
export class ScanPage implements OnInit, OnDestroy {

  result = null;

  constructor(public openFoodFacts: OpenFoodFactsService,
              private router: Router,
              private alertController: AlertController) { }

  ngOnInit(): void {

  }

  ngOnDestroy(){
    BarcodeScanner.stopScan();
  }

  async startScan(){
    console.log('Start');
    const allowed = await this.checkPermission();
    if(allowed){
      this.openFoodFacts.scanActive = true;
      const result = await BarcodeScanner.startScan();
      if(result.hasContent){
        this.result = result.content;
        this.openFoodFacts.scanActive = false;
        await this.openFoodFacts.getIngredients(this.result);
        await this.router.navigate(['/result']);
      }
    }
  }

  async checkPermission(){
    return new Promise(async (resolve, reject) =>{
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

  stopScanner(){
    BarcodeScanner.stopScan();
    this.openFoodFacts.scanActive = false;
  }
}
