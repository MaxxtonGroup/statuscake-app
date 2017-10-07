import {Injectable} from "@angular/core";
import {Observable} from 'rxjs/Rx';
import {Test} from "../domain/test";
import {Http, URLSearchParams} from "@angular/http";
import {Response} from "@angular/http";
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import {Headers,RequestOptions} from "@angular/http";
import {TestDetail} from "../domain/testdetail";
import {ConfigService} from "./config.service";
import { TestPerformanceStats } from "../domain/testperformancestats";
import { Platform } from 'ionic-angular';


/**
 * The status cake service which functions as a rest client to the api.
 * @author R. Sonke
 */
@Injectable()
export class StatuscakeService {

  private SC_API_URL:string = "/api";
  private headers:Headers;

  constructor(private http:Http, private configService:ConfigService, private platform: Platform) {
    if(platform.is('ios'))
      this.SC_API_URL = "https://app.statuscake.com/API";

    
    this.headers = new Headers();
    this.configService.getStatusCakeApiKey().then((key) => { this.headers.set('api', key); });
    this.configService.getStatusCakeUsername().then((user) => { this.headers.set('username', user); });
  }

  /**
   * Get all tests
   *
   * @returns {Observable<Array<Test>>}
   */
  public getTests(tag?:string):Observable<Array<Test>> {
    let params = new URLSearchParams();
    if(tag)
      params.set("tags", tag);
    let requestOptions:RequestOptions = new RequestOptions({headers: this.headers, search: params});

    let tests:Observable<Array<Test>> = this.http.get(`${this.SC_API_URL}/Tests`, requestOptions)
      .map((response:Response) => {
        return response.json()
      }).share();

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
      }).share();

    return test;
  }

  /**
   * Pause tests with a specific tag
   *
   * @param tag the name of the tag linked to tests
   * @param pause set to false to resume tests
   */
  public pauseTestsByTag(tag:string, pause:boolean) {
    let setPaused:number = 1;
    if(!pause)
      setPaused = 0;

    // get all tests by tag
    this.getTests(tag).subscribe((tests:Array<Test>) => { for (let test of tests) this.pauseTest(test, setPaused); });
  }

  /**
   * Pause/resume all tests
   *
   * @param pause set to false to resume tests
   */
  public pauseTests(pause:boolean) {
    let setPaused:number = 1;
    if(!pause)
      setPaused = 0;

    // get all tests
    this.getTests().subscribe((tests:Array<Test>) => { for (let test of tests) this.pauseTest(test, setPaused); });
  }

  /**
   * Pause this test, to void push messages
   * @param test
   */
  public togglePauseTest(test:Test) {
    let setPaused:number = 1;
    if(test.Paused)
      setPaused = 0;

    this.pauseTest(test, setPaused);
  }

  private pauseTest(test:Test, paused:number):void {
    let requestOptions:RequestOptions = new RequestOptions({headers: this.headers});
    this.http.put(`${this.SC_API_URL}/Tests/Update`, `TestID=${test.TestID}&Paused=${paused}`, requestOptions)
      .subscribe((response) => { console.log(response.json()); });
  }

  public getPerformanceStats(testId:number):Observable<Array<TestPerformanceStats>> {
    let params = new URLSearchParams();
    params.set('TestID', testId.toString());
    params.set('Fields', 'time,performance,status');

    let requestOptions:RequestOptions = new RequestOptions({headers: this.headers, search: params});

    let stats:Observable<Array<TestPerformanceStats>> = this.http.get(`${this.SC_API_URL}/Tests/Checks`, requestOptions)
      .map((response:Response) => {
        return response.json()
      }).share();

    return stats;
  }
}