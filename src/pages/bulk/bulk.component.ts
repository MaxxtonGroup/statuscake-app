import { Component, OnInit } from "@angular/core";
import { StatuscakeService } from "../../services/statuscake.service";
import { ActionSheetController } from "ionic-angular";
import { ConfigService } from "../../services/config.service";

/**
 * Panel that shows all possible bulk actions.
 * @author R. Sonke
 */
@Component({
  templateUrl: 'bulk.component.html'
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
