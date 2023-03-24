//use d3 to read in samples.json
path = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';
// let samples = [];
// var samples = d3.json(path).then(data => {
//     return Object.entries(data);
// });
// console.log(samples);


//function for barPlot on change
var chooser = document.getElementById('selDataset')
var selDataset = d3.select(chooser);

d3.json(path).then(data => {
    // console.log(data);
    

    var options = selDataset.selectAll('option')
        .data(Object.values(data.names))
        .enter()
        .append('option')
        .attr('value', d => { return d; })
        .text(d => { return d; });
    
        

    

    var defaultChoice = data.samples[0];
    console.log(data.samples[5]);
    barPlot(defaultChoice.id);
    bubblePlot(defaultChoice.id);

    
});
function barPlot(sample_id) {
    console.log(sample_id);
    d3.json(path).then(data => {
        var samples = data.samples;
        var selection = samples.filter(sample=> sample.id==sample_id)[0];
        // console.log(selection);
        var y_series = selection.otu_ids.slice(0,10).map(otu_id => "OTU " + otu_id).reverse();
        // console.log(y_series);
        var trace1 = {
            x: selection.sample_values.slice(0,10).reverse(),
            y: y_series,
            text: selection.otu_labels.slice(0,10).reverse(),
            type: 'bar',
            orientation: 'h'
        };
        var layout = {
            title: "Test Subject " + selection.id
        };
        Plotly.newPlot("bar", [trace1], layout)
    });
}

function bubblePlot(sample_id) {
    console.log(sample_id);
    d3.json(path).then(data => {
        var samples = data.samples;
        var selection = samples.filter(sample=> sample.id==sample_id)[0];
        
               
        var trace2 = {
            x: selection.otu_ids,
            y: selection.sample_values,
            marker: {
                color: selection.otu_ids,
                size: selection.sample_values,
            },
            text: selection.otu_labels,
            mode: 'markers'
            
        };
        var layout = {
            title: "Test Subject " + selection.id
        };
        Plotly.newPlot("bubble", [trace2], layout)
    });
}
function bubblePlot(sample_id) {
    console.log(sample_id);
    d3.json(path).then(data => {
        var samples = data.samples;
        var selection = samples.filter(sample=> sample.id==sample_id)[0];
        
               
        var trace2 = {
            x: selection.otu_ids,
            y: selection.sample_values,
            marker: {
                color: selection.otu_ids,
                size: selection.sample_values,
            },
            text: selection.otu_labels,
            mode: 'markers'
            
        };
        var layout = {
            title: "Test Subject " + selection.id
        };
        Plotly.newPlot("bubble", [trace2], layout)
    });
}

function optionChanged(sample_id) {
    barPlot(sample_id);
    bubblePlot(sample_id);
    
}

