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
    console.log(data);
    

    var options = selDataset.selectAll('option')
        .data(Object.values(data.names))
        .enter()
        .append('option')
        .attr('value', d => { return d; })
        .text(d => { return d; });
    
        

    

    var defaultChoice = data.samples[0];
    // console.log(data.samples[5]);
    barPlot(defaultChoice.id);
    bubblePlot(defaultChoice.id);
    gaugePlot(defaultChoice.id);
    demoData(defaultChoice.id);

    
});

function demoData(sample_id) {
    d3.json(path).then(data => {
        var samples = data.metadata;
        var selection = samples.filter(sample => sample.id == sample_id)[0];

        var sampleMeta = d3.select("#sample-metadata");
        var list = d3.select('.list-group')
                
        for (var key in selection) {
            if (selection.hasOwnProperty(key)) {
              var li = sampleMeta.append("panel-body")
                           .attr("class", "panel-body")
                           .text(key + ": " + selection[key]); }}
       

    })
}
function barPlot(sample_id) {
    // console.log(sample_id);
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
    // console.log(sample_id);
    d3.json(path).then(data => {
        var samples = data.samples;
        var selection = samples.filter(sample=> sample.id==sample_id)[0];
        
               
        var trace2 = {
            x: selection.otu_ids.slice(0,25),
            y: selection.sample_values.slice(0,25),
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
function gaugePlot(sample_id) {
    // console.log(sample_id);
    d3.json(path).then(data => {
        var samples = data.metadata;
        var selection = samples.filter(sample => sample.id == sample_id)[0];


        var trace3 = {
            domain: {
                x: [0,1],
                y: [0,1]
            },
            value: selection.wfreq,
            type: 'indicator',
            mode: 'gauge+number',
            gauge: {
                axis: {range: [0,10]},
                steps: [
                    {
                        range: [0,1], color: 'gray',
                        range: [1,2], color: 'lightgray',
                        range: [2,3], color: 'green',
                        range: [3,4], color: 'lilac',
                        range: [4,5], color: 'olive',
                        range: [5,6], color: 'cerulean',
                        range: [6,7], color: 'mauve',
                        range: [7,8], color: 'purple',
                        range: [8,9], color: 'lightpink',
                        range: [9,10], color: 'lightgreen',
                    }
                ]
            }

        };
        var layout = {
            title: "Wash Frequency"
        };
        Plotly.newPlot("gauge", [trace3], layout)
    });
}

function optionChanged(sample_id) {
    barPlot(sample_id);
    bubblePlot(sample_id);
    gaugePlot(sample_id);
    demoData(sample_id);
}

