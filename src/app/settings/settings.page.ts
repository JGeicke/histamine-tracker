import {Component, OnInit} from '@angular/core';
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

/**
 * Module to customize the app and choose the localization.
 */
export class SettingsPage implements OnInit {

  /**
   * Whether the modal window is currently shown.
   *
   * @type boolean
   */
  public isModalShowing = false;

  /**
   * Current input
   *
   * @type string
   */
  public input = '';

  /**
   * Reference to the modal form group.
   */
  public ionicForm;

  /**
   * Validation error messages displayed to the user.
   */
  validationMessages = {
    name: [
      { type: 'required', message: this.translateService.instant('SETTINGS.validation-required') },
      {type: 'pattern', message: this.translateService.instant('SETTINGS.validation-pattern')},
      {type:'minlength', message: this.translateService.instant('SETTINGS.validation-minlength')}
    ]
  };

  /**
   * Currently selected localization language.
   *
   * @private
   */
  private currentLanguage;

  /**
   * Constructor.
   *
   * @ignore
   * @param openFoodFacts - Dependency injection to be able to add custom ingredients and display default ingredients.
   * @param formBuilder - Dependency injection to controll the form to add custom ingredients
   * @param platform - Dependency injection needed for modal windows
   * @param alertController - Dependency injection to control alerts
   * @param toastController - Dependency injection to control toasts
   * @param languageService - Dependency injection to access language service for localization
   * @param translateService - Dependency injection to translate displayed text according to localization
   */
  constructor(public openFoodFacts: OpenFoodFactsService,
              public formBuilder: FormBuilder,
              public platform: Platform,
              public alertController: AlertController,
              public toastController: ToastController,
              public languageService: LanguageService,
              private translateService: TranslateService) {
  }

  /**
   * Lifecycle that sets modal back button behaviour and builds the form.
   *
   * @ignore
   */
  ngOnInit() {
    // handle user pressing back button
    this.platform.backButton.subscribeWithPriority(9999, () => {
      this.toggleModal();
    });

    // form check
    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]+'), Validators.minLength(2)]],
    });

    // set current language
    this.currentLanguage = this.languageService.getSelectedLanguage();
  }

  /**
   * Adds a custom ingredient to the histamine ingredient list.
   *
   * @param name - Name of the custom ingredient
   */
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

  /**
   * Deletes a custom ingredient from the histamine ingredient list.
   *
   * @param name - Name of the custom ingredient to be deleted.
   */
  deleteIngredient(name: string){
    this.openFoodFacts.deleteCustomIngredient(name);
    const toast = this.translateService.instant('SETTINGS.toast-delete');
    this.showSuccessfulToast(toast);
  }

  /**
   * Toggles the modal window to add custom ingredients.
   */
  toggleModal(){
    if(this.isModalShowing){
      this.input = '';
    }
    this.isModalShowing = !this.isModalShowing;

    this.translateValidationMessages();
  }

  /**
   * Shows delete confirmation alert.
   *
   * @param name - Name of the custom ingredient to be deleted
   */
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

  /**
   * Displays the successful toast.
   *
   * @param text - Toast message to be displayed
   */
  async showSuccessfulToast(text: string){
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      color: 'success'
    });

    await toast.present();
  }

  /**
   * Translates the validation messages to the currently selected localization language if needed.
   *
   * @private
   */
  private translateValidationMessages(){
    if(this.currentLanguage !== this.languageService.getSelectedLanguage()){
      this.validationMessages.name[0].message = this.translateService.instant('SETTINGS.validation-required');
      this.validationMessages.name[1].message = this.translateService.instant('SETTINGS.validation-pattern');
      this.validationMessages.name[2].message = this.translateService.instant('SETTINGS.validation-minlength');
    }
  }
}
