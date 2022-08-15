import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {StorageService} from './storage.service';

const LNG_KEY = 'SELECTED_LANGUAGE';

@Injectable({
  providedIn: 'root'
})

export class LanguageService {

  selected = '';

  constructor(private translate: TranslateService, private storageService: StorageService) { }

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

  getSelectedLanguage(){
    return this.selected;
  }

  setLanguage(lng){
    this.translate.use(lng);
    this.selected = lng;
    this.storageService.set(LNG_KEY, lng);
  }
}
