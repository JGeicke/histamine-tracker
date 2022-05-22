import { Component, OnInit } from '@angular/core';
import {OpenFoodFactsService} from '../services/open-food-facts.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Platform, AlertController} from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public isModalShowing = false;
  public input = '';
  public ionicForm;

  validationMessages = {
    name: [
      { type: 'required', message: 'Name is required.' },
      {type: 'pattern', message: 'Name can contain only letters and whitespace.'},
      {type:'minlength', message: 'Name is too short.'}
    ]
  };

  constructor(public openFoodFacts: OpenFoodFactsService,
              public formBuilder: FormBuilder,
              public platform: Platform,
              public alertController: AlertController) { }

  ngOnInit() {
    // handle user pressing back button
    this.platform.backButton.subscribeWithPriority(9999, () => {
      this.toggleModal();
    });

    // form check
    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]+'), Validators.minLength(2)]],
    });
  }

  addIngredient(name: string){
    if(!this.ionicForm.valid){
      return;
    } else {
      this.ionicForm.reset();

      // remove multiple whitespaces from string before adding it
      this.openFoodFacts.addHistamineIngredient(name.replace(/\s+/g, ' '));
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
