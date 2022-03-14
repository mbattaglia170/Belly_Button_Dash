// Bar and Bubble charts
// Create the buildCharts function.
function buildCharts(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    

    // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot(); 

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
