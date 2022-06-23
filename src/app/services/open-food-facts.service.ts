import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpenFoodFactsService {

  public scanActive;

  public successfulScan;
  public scannedHistamineFreeProduct = false;
  public ingredientsFound;
  private scannedProductName = '';

  private histamineFood = ['bacterial-culture',	'culture-bacterienne',	'bifidobacterium-lactis',
    'yeast-and-bacteria-cultures' ,	'bifidobacterium-bifidum',
    'alcohol',	'alcohol-vinegar', 	'cetearyl-alcohol', 	'sugar-alcohol', 	'grain-alcohol',
    'vinegar',
    'yeast',
    'soy-milk',
    'theobroma-cacao',
    'nettle',
    'cocoa',
    'chocolate',
    'carob-seeds',	'carob-seed-flour', 	'carob-bean',
    'soy-sauce',
    'glutamate-monosodique', 	'flavour-enhancer',
    'strawberry',
    'raspberry',
    'lemon',
    'orange',
    'tangerine',	'clementine',
    'grapefruit',
    'lime',
    'banana',
    'pineapple',
    'kiwi',
    'pear',
    'papaya',
    'guava',
    'nut',
    'sauerkraut',
    'spinach',
    'tomato', 	'ketchup',
    'aubergine',
    'avocado',
    'olives',
    'lentils',
    'beans',
    'soya-lecithin',
    'cep',
    'morels',
    'hard-cheese',
    'soft-cheese',
    'pasteurized-processed-cheese',
    'blue-cheese ',
    'mold-inhibitor',
    'tuna',
    'mackerel',
    'herring',
    'sardine',
    'anchovy',
    'mahi-mahi',
    'mussel',
    'lobster',
    'crab',
    'shrimp', 	'prawn',
    'sausage',
    'salami',
    'liver',
    'tongue',
    'heart',
    'rice-milk',
    'oat-milk',
    'black-tea',
    'coffee',
    'green-tea',
    'espresso',
    'walnut-oil',
    'malt',
    'wheat-germ',
    'mushroom',
    'raw-milk',
    'yogurt',
    'kefir-ferments', 	'kefir',
    'soured-milk ',
    'buttermilk',
    'sour-cream',
    'creme-fraiche',
    'feta',
  ];

  constructor(private httpClient: HttpClient) { }

  public getScannedProductName(){
    return this.scannedProductName === undefined ? '':this.scannedProductName;
  }

  public getHistamineIngredients(){
    return this.histamineFood;
  }

  public addHistamineIngredient(name: string){
    console.log(name);
    this.histamineFood.push(name.replace(' ', '-'));
  }

  public getIngredients(barcode: string){
    // TODO: error handling (http 404)
    return new Promise((resolve) => {
      this.httpClient.get('https://world.openfoodfacts.org/api/v2/product/'+barcode,
        {observe: 'body', responseType: 'text'}).subscribe(result => {
          const response = JSON.parse(result);
          //check if product was found in OpenFoodFacts database
          this.successfulScan = response.status;
          if(!this.successfulScan){
            resolve(1);
            return;
          }

          // get product name
          this.scannedProductName = '';
          this.scannedProductName = response.product.product_name_de;
          if(this.scannedProductName === undefined){
            this.scannedProductName = response.product.product_name;
          }

          // get ingredients
          const ingredients = response.product.ingredients;

          if(ingredients === undefined){
            this.ingredientsFound = false;
            resolve(1);
            return;
          }
          this.ingredientsFound = true;

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
          resolve(0);
      },
        error => {
          console.log(error);
          this.ingredientsFound = false;
          this.successfulScan = false;
          resolve(1);
          return;
        });
    });
  }
}
