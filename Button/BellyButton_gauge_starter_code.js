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
