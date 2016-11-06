import { Component, Input } from "@angular/core";

@Component({
  selector: 'status-header',
  template: `
    
      <ion-navbar>
        <ion-title>
          {{title}}
        </ion-title>
        <ion-buttons right>
          <img width="50px" src="https://newyse-res.cloudinary.com/image/upload/maxxton2/logo.png" />
        </ion-buttons>
        
        <ion-buttons left>
            
          <button ion-button menuToggle icon-only>
            <ion-icon name='menu'></ion-icon>
          </button>
        </ion-buttons>
      </ion-navbar>
    
  `
})
export class StatusHeaderComponent {
  @Input()
  private title:string;
}