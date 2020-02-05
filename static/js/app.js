function changePlots(patientID){
    d3.json('../samples.json').then((data) =>{
        var tests = data.samples.filter(test => test.id == patientID);
        var ids = tests[0].otu_ids;
        var otu = ids.map(id => `OTU ${id}`);
        var vals = tests[0].sample_values;
        var labels = tests[0].otu_labels;
        var table = d3.select("#meta-table");
        var tbody = table.select("tbody");


        var trace1 = {
            x: vals,
            y: otu,
            type: "bar",
            orientation: "h"
        };
        var bar = [trace1];
        Plotly.newPlot("bar",bar)

        var trace2 = {
            x: ids,
            y: vals,
            mode: 'markers',
            marker:{
                size: vals,
            }
        };

        var bubble = [trace2]
        var layout2 = {
            xaxis:{
                title: "OTU ID"
            }
        };
        Plotly.newPlot("bubble",bubble,layout2);


        var meta = data.metadata.filter(test => test.id == patientID);
        var metaData = meta[0];
        tbody.html("");
        Object.entries(metaData).forEach(([key,value])=>{
            var tablerow = tbody.append("tr");
            var cell = tablerow.append("td").text(`${key}: ${value}`);

        });
        
    });  

    
};

function options(){
    d3.json("../samples.json").then((data) =>{
    var menu = data.names;
    var defaultid = menu[0];
    var dropDown = d3.select("#selDataset");

    dropDown.append("option").text("Select ID");
    menu.forEach(patient => {
        dropDown.append("option").text(patient);
    });
    changePlots(defaultid);
    });
};
options();