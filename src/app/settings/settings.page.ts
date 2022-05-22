import { Component, OnInit } from '@angular/core';
import {OpenFoodFactsService} from '../services/open-food-facts.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public isModalShowing = false;
  public input = '';
  public ionicForm;

  constructor(public openFoodFacts: OpenFoodFactsService,
              public formBuilder: FormBuilder,
              public platform: Platform) { }

  ngOnInit() {
    // handle user pressing back button
    this.platform.backButton.subscribeWithPriority(9999, () => {
      this.toggleModal();
    });

    // form check
    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2)]],
    });
  }

  addIngredient(name: string){
    if(!this.ionicForm.valid){
      // TODO: handle invalid input
      console.log('nope');
    } else {
      this.ionicForm.reset();
      this.openFoodFacts.addHistamineIngredient(name);
      this.toggleModal();
    }
  }

  toggleModal(){
    if(this.isModalShowing){
      this.input = '';
    }
    this.isModalShowing = !this.isModalShowing;
  }

}
