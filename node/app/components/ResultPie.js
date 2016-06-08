import React from 'react';
import Color from 'color';
import {Pie} from 'react-chartjs';

const options = {
  segmentShowStroke : true,
  segmentStrokeColor : "#fff",
  segmentStrokeWidth : 2,
  percentageInnerCutout : 20,
  animation: false
};

const styles = {

  root: {
    height: "100",
    width: "200"
  },
  pieColor: "#e74c3c"

};

export default class ResultPie extends React.Component {

  render(){

    const { labels, results } = this.props;
    var data = initData(labels,results);
    return(
      <Pie data={data} height={styles.root.height} width={styles.root.width} />
    );
  }

};

function initData(labels,data){
  var ret  = [];
  var slices = data.length;
  var step = (90.0/ slices);
  for(var i=0;i<data.length;i++){
    if( data[i] > 0){
      var currentColor = Color(styles.pieColor).hsl();
      currentColor.l = (currentColor.l + step*i) % 90.0;
      var finalColor = Color(currentColor);
      ret.push({
        label: labels[i],
        value: data[i],
        color: finalColor.hexString(),
        highlight: finalColor.whiten(1.5).hexString()
      });
    }
  }
  return ret;
}