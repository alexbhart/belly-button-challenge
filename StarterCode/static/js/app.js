//use d3 to read in samples.json
path = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';
let samples = d3.json(path);

//check for proper loading
console.log(samples);

//selDataset variable
var selDataset = d3.select("#selDataset");

Object.entries(samples).forEach(([k, v]) => {
    selDataset.append('option').text(k).attr("value", k)
});



selDataset.on('change', function () {
    var dataset = selDataset.property('value');
    console.log(dataset);
    console.log(samples[dataset]);
    // createPlot(samples[dataset]);

})