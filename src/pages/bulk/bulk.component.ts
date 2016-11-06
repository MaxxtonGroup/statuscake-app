import { Component, OnInit } from "@angular/core";
import { StatuscakeService } from "../../services/statuscake.service";
import { ActionSheetController } from "ionic-angular";
import { ConfigService } from "../../services/config.service";

/**
 * Panel that shows all possible bulk actions.
 * @author R. Sonke
 */
@Component({
  // templateUrl: 'bulk.component.html'
  template: `
    <ion-header>
      <status-header title="Bulk actions"></status-header>
    </ion-header>
    
    <ion-content class="bulk-action-page" padding>
    
    <ion-list>
      <ion-item (click)="pauseAll()">
        <ion-icon name='pause' item-left></ion-icon>
        Pause all
      </ion-item>
      
      <ion-item (click)="resumeAll()">
        <ion-icon name='play' item-left></ion-icon>
        Resume all
      </ion-item>
      
      <ion-item (click)="presentActionSheet('pause')">
        <ion-icon name='pricetag' item-left></ion-icon>
        Pause per tag
      </ion-item>
      
      <ion-item (click)="presentActionSheet('resume')">
        <ion-icon name='pricetag' item-left></ion-icon>
        Resume per tag
      </ion-item>
    </ion-list>
    
    </ion-content>
  `
})
export class BulkActionComponent implements OnInit {

  constructor(private statuscakeService:StatuscakeService, private actionSheetCtrl:ActionSheetController, private configService:ConfigService) {


  }

  ngOnInit():void {

  }

  private resumeAll():void {
    this.statuscakeService.pauseTests(false);
  }

  private pauseAll():void {
    this.statuscakeService.pauseTests(true);
  }

  private presentActionSheet(action:string):void {
    let buttons:Array<Object> = new Array<Object>();
    this.configService.getStatusCakeTags().then((tags) => {
      // tags is a comma separated string
      let tagArray = tags.split(',');

      for (let tag of tagArray) {
        tag = tag.trim();
        buttons.push(
          {
            text: action.charAt(0).toUpperCase() + action.slice(1) + ' tag ' + tag,
            handler: () => {
              console.log('Pressed tag: '+tag);
              this.doApiAction(action, tag);
            }
          }
        );
      }

      buttons.push(
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // do nothing
          }
        }
      );

      let actionSheet = this.actionSheetCtrl.create({
        title: 'Which tag should be ' + action + 'd?',
        buttons: buttons
      });
      actionSheet.present();
    });
  }

  private doApiAction(action:string, tag:string) {
    this.statuscakeService.pauseTestsByTag(tag, action == "pause");
  }

}
