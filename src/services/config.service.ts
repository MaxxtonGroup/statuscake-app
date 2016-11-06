import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';


/**
 * The config service which serves settings.
 * Uses the websql local db.
 *
 * @author R. Sonke
 */
@Injectable()
export class ConfigService {
  public static STATUSCAKE_APIKEY:string = "sc_apikey";
  public static STATUSCAKE_USERNAME:string = "sc_username";

  constructor(private storage:Storage) { }

  public getStatusCakeApiKey():Promise<string> {
    return this.storage.get(ConfigService.STATUSCAKE_APIKEY);
  }

  public setStatusCakeApiKey(key:string) {
    this.storage.set(ConfigService.STATUSCAKE_APIKEY, key);
  }

  public getStatusCakeUsername():Promise<string> {
    return this.storage.get(ConfigService.STATUSCAKE_USERNAME);
  }

  public setStatusCakeUsername(username:string) {
    this.storage.set(ConfigService.STATUSCAKE_USERNAME, username);
  }

}