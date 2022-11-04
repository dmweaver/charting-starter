import ApexCharts from "apexcharts";
import { setChartSpecificOptions, handleClick, saveImage } from "./utils";
let chart;
window.loadChart = function (json) {
  const obj = JSON.parse(json);
  const { series, type, callback } = obj;
  console.log(obj);
  console.log(obj.series);

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
      style:{fontSize:'16px'},
      
      background: { enabled: true, foreColor: "black" },
      // offsetX: 20,
    },
    legend: {
      show: false,
      position: "left",
      horizontalAlign: "right",
    },
    chart: {
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
          handleClick(config, series, callback);
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
    labels:{style:{fontSize: '18px'}},
    title:{text:'Area (ha)', style:{fontSize: '20px'}},
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
    series: series,
    xaxis: {
      type: "category",
      labels:{rotate: -90,
        rotateAlways: false, 
        trim: true, 
        hideOverlappingLabels: false, 
        style:{fontSize: '18px'},
        minHeight: 120,
        offsetY: 0
      },
      // title: {text: 'Phosphorus Status', 
      //   style:{fontSize: '20px'}, 
      //   align: 'left', 
      //   offsetY: -700},
      //   floating: true
      // eslint-disable-next-line no-dupe-keys
      
    },
  };


  chart = new ApexCharts(document.querySelector("#chart"), {
    ...options,
    ...setChartSpecificOptions(dataXYOptions, type, series),
  });

  chart.render();
};

//function to save the chart back to FIleMaker.
window.saveImage = saveImage;
