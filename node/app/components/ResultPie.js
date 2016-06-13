import React from 'react';
import Color from 'color';
import {Pie} from 'react-chartjs';

const options = {
  segmentShowStroke : true,
  segmentStrokeColor : "#fff",
  segmentStrokeWidth : 2,
  animation: false,
  percentageInnerCutout: 50,
  tooltipTemplate: "<%if (label){%><%=label %>: <%}%><%= value + ' %' %>"
};

const styles = {

  root: {
    height: "100",
    width: "200"
  }

};

export default class ResultPie extends React.Component {

  render(){

    const { labels, results } = this.props;
    var data = initData(labels,results);
    return(
      <Pie data={data} options={options} height={styles.root.height} width={styles.root.width} redraw generateLegend/>
    );
  }

};

function initData(labels,data){
  var ret  = [];
  var slices = data.length;
  var step = (90.0/ slices);
  for(var i=0;i<data.length;i++){
    if( data[i].value > 0){
      var label = labels.find((l)=>{return l.id == data[i].answer})
      ret.push({
        label: label.value,
        value: data[i].value,
        color: label.color,
        highlight: Color(label.color).whiten(1.5).hexString()
      });
    }
  }
  return ret;
}