import { Component, OnInit } from '@angular/core';
import {OpenFoodFactsService} from '../services/open-food-facts.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Platform, AlertController, ToastController} from '@ionic/angular';
import {LanguageService} from '../services/language.service';
import {TranslateService} from '@ngx-translate/core';

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
              public alertController: AlertController,
              public toastController: ToastController,
              public languageService: LanguageService,
              private translateService: TranslateService) {
  }

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
      this.openFoodFacts.addCustomIngredient(name.replace(/\s+/g, ' '));
      this.toggleModal();
      const part1 = this.translateService.instant('SETTINGS.toast-add-1');
      const part2 = this.translateService.instant('SETTINGS.toast-add-2');
      this.showSuccessfulToast(part1+name+part2);
    }
  }

  deleteIngredient(name: string){
    this.openFoodFacts.deleteCustomIngredient(name);
    const toast = this.translateService.instant('SETTINGS.toast-delete');
    this.showSuccessfulToast(toast);
  }

  toggleModal(){
    if(this.isModalShowing){
      this.input = '';
    }
    this.isModalShowing = !this.isModalShowing;
  }

  async showDeleteAlert(name: string){
    const alert = await this.alertController.create({
      header: this.translateService.instant('SETTINGS.warning'),
      message: this.translateService.instant('SETTINGS.warning-message-1')
        + name + this.translateService.instant('SETTINGS.warning-message-2'),
      buttons: [{
        text: this.translateService.instant('SETTINGS.warning-cancel'),
        role: 'cancel',
      },
      {
        text: this.translateService.instant('SETTINGS.warning-confirm'),
        role: 'confirm',
        cssClass: 'c-alert-button-delete',
        handler: () => this.deleteIngredient(name)
      }]
    });
    await alert.present();
  }

  async showSuccessfulToast(text: string){
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      color: 'success'
    });

    await toast.present();
  }
}
