import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {StorageService} from './storage.service';

/**
 * Key in the local storage.
 */
const LNG_KEY = 'SELECTED_LANGUAGE';

@Injectable({
  providedIn: 'root'
})

/**
 * Language service that controlls the current localization of displayed text.
 */
export class LanguageService {

  /**
   * Selected localization.
   */
  selected = '';

  /**
   * Constructor.
   *
   * @ignore
   * @param translate - Dependency injection to translate displayed text according to localization
   * @param storageService - Dependency injection to access local storage
   */
  constructor(private translate: TranslateService, private storageService: StorageService) { }

  /**
   * Sets the initial localization language based on the device language or the local storage.
   */
  setInitialAppLanguage(){
    const language = this.translate.getBrowserLang();

    this.selected = language;
    this.translate.setDefaultLang(language);

    this.storageService.get(LNG_KEY).then(val => {
      if(val){
        this.setLanguage(val);
        this.selected = val;
      }
    });
  }

  /**
   * Gets the selected localization language.
   */
  getSelectedLanguage(){
    return this.selected;
  }

  /**
   * Sets the localization language.
   *
   * @param lng - Localization language to select
   */
  setLanguage(lng){
    this.translate.use(lng);
    this.selected = lng;
    this.storageService.set(LNG_KEY, lng);
  }
}
