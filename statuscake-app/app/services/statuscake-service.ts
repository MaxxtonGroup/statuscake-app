import {Injectable} from "angular2/core";
import {Inject} from "angular2/core";
import {Observable} from 'rxjs/Rx';
import {Test} from "../domain/test";
import {Http} from "angular2/http";
import {Response} from "angular2/http";
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import {Headers} from "angular2/http";
import {TestDetail} from "../domain/testdetail";
import {RequestOptions} from "angular2/http";
import {URLSearchParams} from "angular2/http";
import {ConfigService} from "./config-service";


/**
 * The status cake service which functions as a rest client to the api.
 * @author R. Sonke
 */
@Injectable()
export class StatuscakeService {

  private SC_API_URL:string = "https://www.statuscake.com/API";
  private headers:Headers;
  private requestOptions:RequestOptions;

  constructor(private http:Http, private configService:ConfigService) {
    this.headers = new Headers();
    this.configService.getStatusCakeApiKey().then((key) => { this.headers.set('api', key); });
    this.configService.getStatusCakeUsername().then((user) => { this.headers.set('username', user); });
    this.requestOptions = new RequestOptions({headers: this.headers});
  }

  /**
   * Get all tests
   *
   * @returns {Observable<Array<Test>>}
   */
  public getTests():Observable<Array<Test>> {

    let tests:Observable<Array<Test>> = this.http.get(`${this.SC_API_URL}/Tests`, this.requestOptions)
      .map((response:Response) => {
        return response.json()
      });
    return tests;
  }

  /**
   * Get one specific test with all details
   * @param testId
   * @returns {Observable<TestDetail>}
   */
  public getTest(testId:number):Observable<TestDetail> {
    let params = new URLSearchParams();
    params.set('TestID', testId.toString());
    let requestOptions:RequestOptions = new RequestOptions({headers: this.headers, search: params});

    let test:Observable<TestDetail> = this.http.get(`${this.SC_API_URL}/Tests/Details`, requestOptions)
      .map((response:Response) => {
        return response.json()
      });

    return test;
  }

  /**
   * Pause this test, to void push messages
   * @param test
   */
  public togglePauseTest(test:Test) {
    let setPaused:number = 1;
    if(test.Paused)
      setPaused = 0;

    this.http.put(`${this.SC_API_URL}/Tests/Update`, `TestID=${test.TestID}&Paused=${setPaused}`, this.requestOptions)
      .subscribe((response) => { console.log(response.json()); });
  }
}