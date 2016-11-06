/**
 * Class representing the tests returned by /TestsPanelComponent
 * @author R. Sonke
 *
 * Example json:
 *
 * {
 *  "TestID": 907462,
 *  "Paused": false,
 *  "TestType": "HTTP",
 *  "WebsiteName": "example.com",
 *  "ContactGroup": null,
 *  "ContactID": 0,
 *  "Public": 0,
 *  "Status": "Up",
 *  "NormalisedResponse": 0,
 *  "Uptime": 99.53
 * },
 *
 */
export interface Test {
  TestID:number;
  Paused:boolean;
  TestType:string;
  WebsiteName:string;
  ContactGroup:string;
  ContactID:number;
  Public:number;
  Status:string;
  NormalisedResponse:number;
  Uptime:number;
}