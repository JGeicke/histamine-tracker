import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpenFoodFactsService {

  public scanActive;

  public successfulScan;
  public scannedHistamineFreeProduct = false;
  private scannedProductName = '';

  private histamineFood = ['strawberries', 'raspberries','acid', 'lemon', 'orange', 'citrus', 'banana',
                          'pineapple', 'kiwi', 'pear', 'papaya', 'guava',];

  constructor(private httpClient: HttpClient) { }

  public getScannedProductName(){
    return this.scannedProductName === undefined ? '':this.scannedProductName;
  }

  public getHistamineIngredients(){
    return this.histamineFood;
  }

  public getIngredients(barcode: string){
    // TODO: error handling
    return new Promise((resolve, reject) => {
      const promise = this.httpClient.get('https://world.openfoodfacts.org/api/v2/product/'+barcode,
        {observe: 'body', responseType: 'text'}).toPromise();
      promise.then((data) => {
        const response = JSON.parse(data);

        //check if product was found in OpenFoodFacts database
        this.successfulScan = response.status;
        if(!this.successfulScan){
          resolve(0);
        }

        const ingredients = response.product.ingredients;

        // get product name
        this.scannedProductName = '';
        this.scannedProductName = response.product.product_name_de;
        if(this.scannedProductName === undefined){
          this.scannedProductName = response.product.product_name;
        }

        // get ingredients
        let histamineHits = 0;
        ingredients.forEach(ingredient => {
          this.histamineFood.forEach((histaminFood) => {
            if(ingredient.id.includes(histaminFood)){
              console.log('ALARM!');
              histamineHits++;
            }
          });
        });

        this.scannedHistamineFreeProduct = histamineHits === 0;
        resolve(1);
      });
    });
  }
}
