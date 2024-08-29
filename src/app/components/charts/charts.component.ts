import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { AgChartOptions, AgCategoryAxisOptions, AgChartLegendOptions, AgNumberAxisOptions, AgChartSubtitleOptions, AgChartCaptionOptions } from 'ag-charts-community';
import { CommonModule } from '@angular/common';
import { AgCharts } from 'ag-charts-angular';
import { isPlatformBrowser } from '@angular/common';

interface IData {
  month: string;
  avgTemp:number;
  iceCreamSales:number;
}

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [AgCharts, CommonModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent {

  public chartOptions!: AgChartOptions;
  public isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object){
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.chartOptions = {
      title: { text: "Ice Cream Sales and Avg Temp" } as AgChartCaptionOptions,
      subtitle: { text: "Data from 2022" } as AgChartSubtitleOptions,
      legend:{
        position: 'right'
      } as AgChartLegendOptions,
      data: [
        { month: 'Jan', avgTemp: 2.3, iceCreamSales: 162000 },
        { month: 'Mar', avgTemp: 6.3, iceCreamSales: 302000 },
        { month: 'May', avgTemp: 16.2, iceCreamSales: 800000 },
        { month: 'Jul', avgTemp: 22.8, iceCreamSales: 1254000 },
        { month: 'Sep', avgTemp: 14.5, iceCreamSales: 950000 },
        { month: 'Nov', avgTemp: 8.9, iceCreamSales: 200000 },
      ] as IData[],
      series:[
        { type:"bar", xKey: 'month', yKey:'iceCreamSales', yName:'Ice Cream Sales'},
        { type: "line", xKey: 'month', yKey: 'avgTemp', yName:'Average Temperature (°C)'}
      ],
      axes: [
        {
          type: 'category',
          position:'bottom'
        } as AgCategoryAxisOptions,
        {
          type: "number",
          position: "left",
          keys: ["iceCreamSales"],
          label: {
            formatter: (params) => {
              return parseFloat(params.value).toLocaleString();
            },
          },
        } as AgNumberAxisOptions,
        {
          type: "number",
          position: "right",
          keys: ["avgTemp"],
          // Format the label applied to this axis (append ' °C')
          label: {
            formatter: (params) => {
              return params.value + " °C";
            },
          },
        } as AgNumberAxisOptions,
      ]
    };
  }

}
