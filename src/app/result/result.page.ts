import { Component, OnInit } from '@angular/core';
import {OpenFoodFactsService} from '../services/open-food-facts.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})

/**
 * Module to display the results regarding the scanned product.
 */
export class ResultPage implements OnInit {

  /**
   * Constructor.
   *
   * @ignore
   * @param openFoodFacts - Dependency injection to display results of scan
   */
  constructor(public openFoodFacts: OpenFoodFactsService) { }

  /**
   * @ignore
   */
  ngOnInit() {
  }

}
