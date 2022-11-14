import ApexCharts from "apexcharts";
import { setChartSpecificOptions, handleClick, saveImage } from "./utils";
let chart;
window.loadChart = function (json) {
  const obj = JSON.parse(json);
  const { series, type, callback, title } = obj;
  console.log(obj);
  console.log(obj.title);


  function replacer(key, value) {
    if (value === 0) {
      return null;
    }
    return value;
  }
  const fixed = JSON.stringify(obj.series, replacer);
  const fixed2 = JSON.parse(fixed);
  console.log(fixed2);
  


  //GLOBAL OPTIONS!!!!

  const options = {

    plotOptions: {
      bar: {
          horizontal: false,
          columnWidth: '90%',
          borderRadius: 9,
          dataLabels: { position: "center" }
      },    
  },
  grid:{show:true, borderColor: '#90A4AE'},
    stroke: {
      show: true,
      colors: ["#000"],
      curve: "smooth",
      width: 1,
      dashArray: 0,
    },
    
    dataLabels: {
      enabled: true,
      style:{fontSize:'24px'},
      
      background: { enabled: true, foreColor: "black" },
      // offsetX: 20,
    },
    chart: {
      
      animations:{enabled: false},
      toolbar: { show: false },
      type: type,
      width: 800,
      height: 800,
      zoom: { enabled: false },
      stacked: false,
      
      dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        blur: 4,
        opacity: 0.7
      },
      
      noData: {
        text: undefined,
        align: 'center',
        verticalAlign: 'middle',
        offsetX: 0,
        offsetY: 0,
        style: {
          color: undefined,
          fontSize: '14px',
          fontFamily: undefined
        }
      },
      
      events: {
        click: function (event, chartContext, config) {
          console.log("config");
          handleClick(config, fixed2, callback);
        },
      },
    },
    
    xaxis: {
      axisBorder: {
        show: true,
        height: 1,
        color: '#000000',
        offsetX: 0,
        offsetY: 0
      },
      
      
      type: "category",
    },
    yaxis: {
      labels:{style:{fontSize: '24px'}},
      title:{text:'Area (ha)', style:{fontSize: '24px'}},
      showAlways: true,
      opposite: false,
      axisBorder: {
        show: true,
        color: '#000000',
        offsetX: 0,
        offsetY: 0,
      }}};
      
      //OPTIONS FOR XY Charts
      const dataXYOptions = {
        series: fixed2,
        legend: {
          showForSingleSeries: true,
          show: true,
          width: 550,
          height: 60,
          position: 'top',
          horizontalAlign: 'center',
          offsetX: 120,
          offsetY: -20,
          fontSize: '20px',
          customLegendItems: ['Exceedingly Low', 'Excessively Low', 'Extremely Low', 'Very Very Low', 'Very Low', 'Low', 'Medium', 'High'],
          markers: {
            fillColors: ['#007D57', '#628605', '#9FFF6D', '#CA6207', '#FF2C11', '#FF2C11', '#FF2C11', '#FF2C11']},
            
          },
        title: {
          text: title,
            align: 'middle',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize:  '24px',
              fontWeight:  'bold',
              fontFamily:  undefined,
              color:  'black'
            },
        },
          xaxis: {
            type: "category",
            //categories: ['L', 'M', 'H', 'VH', 'E'],
            labels:{
              rotate: -90,
                show: false,
                rotateAlways: false, 
                trim: true, 
                hideOverlappingLabels: false, 
                style:{fontSize: '24px'},
                minHeight: 120,
                offsetY: 0
              },
              
            },
           
  };


  chart = new ApexCharts(document.querySelector("#chart"), {
    ...options,
    ...setChartSpecificOptions(dataXYOptions, type, fixed2),
  });

  chart.render();
};

//function to save the chart back to FileMaker.
window.saveImage = saveImage;
