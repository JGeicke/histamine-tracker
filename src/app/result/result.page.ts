import { Component, OnInit } from '@angular/core';
import {OpenFoodFactsService} from '../services/open-food-facts.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {

  constructor(public openFoodFacts: OpenFoodFactsService) { }

  ngOnInit() {
  }

}
