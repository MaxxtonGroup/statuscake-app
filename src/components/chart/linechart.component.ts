import { Component, ViewChild, OnInit, Input } from "@angular/core";
import { Chart } from 'chart.js';
import { NavParams, NavController } from "ionic-angular";
import { Observable } from "rxjs";
import { TestPerformanceStats } from "../../domain/testperformancestats";
import * as chartzoom from "chartjs-plugin-zoom";

/**
 * Line chart component, using charts.js
 * @author R. Sonke
 */
@Component({
  selector: 'line-chart',
  templateUrl: 'linechart.component.html'
})
export class LineChartComponent implements OnInit {

  @ViewChild('lineCanvas')
  private lineCanvas;
  private lineChart: any;

  @Input()
  private statsData:Observable<Array<TestPerformanceStats>>;


  constructor(private navParams: NavParams, public navCtrl: NavController) {

  }

  ngOnInit() {
    this.statsData.subscribe((response) => {
      let stats: Array<TestPerformanceStats> = response;
      let values = (<any>Object).values(stats);
      let dataArray = values.map( item => item.Performance );
      let labelArray =  values.map( item => item.Time );

      this.lineChart = new Chart(this.lineCanvas.nativeElement, {

        type: 'line',
        data: {
          labels: labelArray,
          datasets: [ {
            label: '# of ms',
            data: dataArray
          } ]
        },
        options: [ {
          elements: { point: { hitRadius: 10, hoverRadius: 10 } },
          scales: {
            yAxes: [ {
              ticks: {
                beginAtZero: true
              }
            } ]
          },
          pan: {
            enabled: true,
            mode: 'xy'
          },
          zoom: {
            enabled: true,
            mode: 'xy'
          }
        } ]
      });
    });
  }
}

