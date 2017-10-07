import { Component, OnInit } from "@angular/core";
import { StatuscakeService } from "../../services/statuscake.service";
import { ActionSheetController, ActionSheet } from "ionic-angular";
import { ConfigService } from "../../services/config.service";

/**
 * Panel that shows all possible bulk actions.
 * @author R. Sonke
 */
@Component({
  templateUrl: 'bulk.component.html'
})
export class BulkActionComponent {

  constructor(private statuscakeService:StatuscakeService, private actionSheetCtrl:ActionSheetController, private configService:ConfigService) { }

  private resumeAll():void {
    this.statuscakeService.pauseTests(false);
  }

  private pauseAll():void {
    this.statuscakeService.pauseTests(true);
  }

  private async presentActionSheet(action:string):Promise<void> {
    let buttons:Array<Object> = new Array<Object>();
    let actionSheet:ActionSheet;
    
    let tags:string = await this.configService.getStatusCakeTags();
    
    if(tags != null) {
      // tags is a comma separated string
      let tagArray = tags.split(',');

      for (let tag of tagArray) {
        tag = tag.trim();
        buttons.push(
          {
            text: action.charAt(0).toUpperCase() + action.slice(1) + ' tag ' + tag,
            handler: () => {
              this.doApiAction(action, tag);
            }
          }
        );
      }
    }
    
    buttons.push(
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {}
      }
    );

    actionSheet = this.actionSheetCtrl.create({
      title: 'Which tag should be ' + action + 'd?',
      buttons: buttons
    });
    actionSheet.present();
  }

  private doApiAction(action:string, tag:string) {
    this.statuscakeService.pauseTestsByTag(tag, action == "pause");
  }

}
