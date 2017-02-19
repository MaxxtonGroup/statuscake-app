import { Component, Input } from "@angular/core";

@Component({
  selector: 'status-header',
  templateUrl: 'status-header.component.html'
})
export class StatusHeaderComponent {
  @Input()
  private title:string;
}