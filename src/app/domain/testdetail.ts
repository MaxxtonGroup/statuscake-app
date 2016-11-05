/**
 * Class representing the test details returned by /TestsPanel/Details?TestID=123
 * @author R. Sonke
 *
 * Example json:
 * {
 *   "Method": "GET",
 *   "TestID": 907463,
 *   "TestType": "HTTP",
 *   "Paused": false,
 *   "WebsiteName": "example.com",
 *   "URI": "http://www.example.com",
 *   "ContactGroup": null,
 *   "ContactID": 0,
 *   "Status": "Up",
 *   "Uptime": 100,
 *   "CheckRate": 60,
 *   "Timeout": 20,
 *   "LogoImage": "",
 *   "Confirmation": "2",
 *   "WebsiteHost": "",
 *   "NodeLocations": [
 *     ""
 *   ],
 *   "FindString": "",
 *   "DoNotFind": false,
 *   "LastTested": "2016-02-21 10:24:07",
 *   "NextLocation": "UNSET",
 *   "Processing": false,
 *   "ProcessingState": "Complete",
 *   "ProcessingOn": "EC1",
 *   "DownTimes": "0",
 *   "Sensitive": false
 * }
 */
export interface TestDetail {
  Method: string;
  TestID: number;
  TestType: string;
  Paused: boolean;
  WebsiteName: string;
  URI: string;
  ContactGroup?: any;
  ContactID: number;
  Status: string;
  Uptime: number;
  CheckRate: number;
  Timeout: number;
  LogoImage: string;
  Confirmation: string;
  WebsiteHost: string;
  NodeLocations: string[];
  FindString: string;
  DoNotFind: boolean;
  LastTested: string;
  NextLocation: string;
  Processing: boolean;
  ProcessingState: string;
  ProcessingOn: string;
  DownTimes: string;
  Sensitive: boolean;
}