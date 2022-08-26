import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StorageService} from './storage.service';

/**
 * Key in the local storage.
 */
const STORAGE_KEY = 'CUSTOM_INGREDIENTS';

@Injectable({
  providedIn: 'root'
})

/**
 * Service to handle the histamine ingredients and communicate with the open food facts database.
 */
export class OpenFoodFactsService {

  /**
   * Whether a scan is currently in progress.
   *
   * @type boolean
   */
  public scanActive: boolean;

  /**
   * Whether the scan was successful
   *
   * @type boolean
   */
  public successfulScan: boolean;

  /**
   * Whether the scanned product is histamine free
   *
   * @type boolean
   */
  public scannedHistamineFreeProduct = false;

  /**
   * Whether the ingredients of the scanned product were found in the database.
   */
  public ingredientsFound: boolean;

  /**
   * Name of the recently scanned product.
   *
   * @private
   */
  private scannedProductName = '';

  // TODO: outsource the default histamine ingredients.

  /**
   * Temporary histamine ingredients list.
   *
   * @private
   */
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

  /**
   * Custom histamine ingredients added in settings.
   *
   * @private
   */
  private customIngredients = [];

  /**
   * Matching histamine ingredients found in the recently scanned product.
   *
   * @private
   */
  private matchingIngredients = [];

  /**
   * Constructor
   *
   * @ignore
   * @param httpClient - Dependency injection to access open food facts database.
   * @param storage - Dependency injection to access local storage.
   */
  constructor(private httpClient: HttpClient,
              private storage: StorageService) {
    this.loadCustomIngredients();
  }

  /**
   * Gets the name of the scanned product.
   */
  public getScannedProductName(){
    return this.scannedProductName === undefined ? '':this.scannedProductName;
  }

  /**
   * Gets the default histamine ingredients.
   */
  public getHistamineIngredients(){
    return this.histamineFood;
  }

  /**
   * Gets the custom histamin ingredients.
   */
  public getCustomIngredients(){
    return this.customIngredients;
  }

  /**
   * Gets the matching ingredients of the last scan.
   */
  public getMatchingIngredients(){
    return this.matchingIngredients;
  }

  /**
   * Adds a custom histamine ingredient.
   *
   * @param name - Name of the ingredient
   */
  public addCustomIngredient(name: string){
    this.customIngredients.push(name.replace(' ', '-'));
    this.storage.set(STORAGE_KEY, this.customIngredients);
  }

  /**
   * Deletes a custom histamine ingredient.
   *
   * @param name - Name of the custom ingredient to be deleted.
   */
  public deleteCustomIngredient(name: string){
    const index = this.customIngredients.indexOf(name);
    if(index > -1){
      this.customIngredients.splice(index, 1);
    }
  }

  /**
   * Gets the ingredients of the scanned product from the database.
   *
   * @param barcode -  Barcode of the scanned product
   */
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

          // reset matching ingredients
          this.matchingIngredients = [];

          // get ingredients
          let histamineHits = 0;
          ingredients.forEach(ingredient => {
            // check base ingredients
            this.histamineFood.forEach((histamineFood) => {
              if(ingredient.id.includes(histamineFood)){
                histamineHits++;
                this.matchingIngredients.push(histamineFood);
              }
            });

            // check custom ingredients
            this.customIngredients.forEach((customHistamineFood) => {
              if(ingredient.id.includes(customHistamineFood)){
                histamineHits++;
                this.matchingIngredients.push(customHistamineFood);
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

  /**
   * Loads the custom ingredients from the local storage.
   *
   * @private
   */
  private loadCustomIngredients(){
    this.storage.get(STORAGE_KEY).then(val => {
      if(val){
        this.customIngredients = val;
      }
    });
  }
}
