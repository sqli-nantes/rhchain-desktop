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
    var ret = initDataAndSum(labels,results);

    if( ret.sum > 0 ) 
      return <Pie data={ret.data} options={options} height={styles.root.height} width={styles.root.width} redraw />
    else if( ret.sum == 0 ) return <p>Pas de résultats</p>
    else return <p>Résultats masqués</p>
  }

};

function initDataAndSum(labels,data){
  var sum = 0;
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
    sum += data[i].value;
  }
  return {data: ret,sum: sum};
}