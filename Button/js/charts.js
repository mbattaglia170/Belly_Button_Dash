function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultsArray = samples.filter(obj => obj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var result = resultsArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = result.otu_ids;
    var otuLabs = result.otu_labels;
    var sampleVals = result.sample_values;

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = otuIds.slice(0,10).reverse().map(function (elem) {return `OTU ${elem}`});
    var xticks = sampleVals.slice(0,10).reverse();
    var labels = otuLabs.slice(0,10).reverse();

    // 8. Create the trace for the bar chart. 
    //horz bar chart orientation as shown in the module link returned deprecated
    //found the new way for a horz bar chart shown below from apexcharts
    var barData = {
      x: xticks,
      y: yticks,
      type: 'bar',
      text: labels,
      horizontal: true
    };
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
     
    };
    // 10. Use Plotly to plot the data with the layout. 
    //bar is the div
    Plotly.newPlot("bar",barData,barLayout);
  });
}
// Bar and Bubble charts
// Create the buildCharts function.
function buildCharts(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {

    // 1. Create the trace for the bubble chart.
    var bubbleData = [
      x: otuIds,
      y: sampleVals,
      text: otuLabs,
      mode: 'markers',
      marker: {
        color: otuIds,
        size: sampleVals
      }
    ];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: "OTU ID"
    };

    // 3. Use Plotly to plot the data with the layout.
    //bubble div
    Plotly.newPlot("bubble",bubbleData,bubbleLayout); 
  });
}

// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    //already did
    // Create a variable that filters the samples for the object with the desired sample number.
    //already did
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    var metadataArray = metadata.filter(sampleObj => sampleObj.id == sample);
    // Create a variable that holds the first sample in the array.
    //already did

    // 2. Create a variable that holds the first sample in the metadata array.
    var metaResult = metadataArray[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    //already did

    // 3. Create a variable that holds the washing frequency.
    var washingFrequency = parseInt(metaResult.wfreq);
    // Create the yticks for the bar chart.

    // Use Plotly to plot the bar data and layout.
    //Plotly.newPlot();
    
    // Use Plotly to plot the bubble data and layout.
    //Plotly.newPlot();
   
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
      value: washingFrequency,
      type: "indicator",
      mode: "gauge+number",
      title: {text: "Belly Button Washing Frequency<br>Scrubs per Week"},
      bar: {color:"black"},
      gauge: {
        axis: {range:[0,10]},
        steps:[
          {range: [0,2], color:"red"},
          {range: [2,4], color:"darkorange"},
          {range: [4,6], color:"yellow"},
          {range: [6,8], color:"lawngreen"},
          {range: [8,10], color:"darkgreen"}
        ]
      }
    ]
      
    
     
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { width: 600, height: 450, margin: { t: 0, b: 0 }
     
    };

    // 6. Use Plotly to plot the gauge data and layout.
    //gauge div
    Plotly.newPlot("gauge",gaugeData,gaugeLayout);
  });
}