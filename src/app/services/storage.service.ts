import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
/**
 * Storage service to store custom data and settings in the local storage.
 */
export class StorageService {

  constructor(private storage: Storage) {
    this.init();
  }

  /**
   * Initializes the storage service.
   */
  async init(){
    this.storage = await this.storage.create();
  }

  /**
   * Stores data as a key-value pair in the local storage.
   *
   * @param key - Key of the pair
   * @param value - Data to be stored
   */
  public set(key: string, value: any){
    this.storage.set(key, value);
  }

  /**
   * Access the data of a certain key.
   *
   * @param key - Key to access the data of.
   */
  public get(key: string){
    return this.storage.get(key);
  }

}
