import {Component, Injectable} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';

/**
 * Loading components, based on:
 * http://www.joshmorony.com/how-to-create-a-custom-loading-component-in-ionic-2/
 *
 * @author R. Sonke
 */
@Component({
  selector: 'loading-modal',
  templateUrl: 'build/components/loading/loadingModal.html',
  directives: [IONIC_DIRECTIVES]
})
@Injectable()
export class LoadingModal {
  private isBusy:boolean;

  constructor() {
    this.isBusy = false;
  }

  public show():void {
    this.isBusy = true;
  }

  public hide():void {
    this.isBusy = false;
  }

}