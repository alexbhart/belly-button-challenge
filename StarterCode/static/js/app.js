//use d3 to read in samples.json
path = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';
// let samples = [];
var samples = d3.json(path).then(data => {
    return Object.entries(data);
});
console.log(samples);


//check for proper loading
d3.json(path).then(data => {
    // console.log(data);
    var selDataset = d3.select("#selDataset");
    var options = selDataset.selectAll('option')
    .data(Object.values(data.names))
    .enter()
    .append('option')
    .attr('value', d => {return d;})
    .text(d=> {return d;})
});

//selDataset variable

// console.log(selDataset)
// Object.entries(samples.names).forEach(([k, v]) => {
//     selDataset.append('optionChanged').text(k).attr("value", k)
// });
// console.log(samples.otu_ids)
// function init() {
//     let data = [{
//       values: samples.samples.otu_ids,
//       labels: otu_labels,
//       type: "bar"
//     //   orientation: 'h'
//     }];
  
//     let layout = {
//       height: 600,
//       width: 800
//     };
  
//     Plotly.newPlot("col-md-5", data, layout);
//   }


// selDataset.on('change', function () {
//     var dataset = selDataset.property('value');
    


// })

// for (var i = 0; i < samples.names; i++) {
//     selDataset.append('option').text(samples.names[i]).attr('value', samples.names[i])
// };