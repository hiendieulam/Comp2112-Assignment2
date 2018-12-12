let votes=[];
async function getVotes() {
  const response = await fetch('http://aws.computerstudi.es/~gcc200381290/Javascript%20Comp2112/get.php');
  votes = await response.json();
  console.log(votes);
  drawChart(); 
}

setTimeout(() => {getVotes(); }, 500);


function drawChart() {
    var chartData = {
      type: 'bar',  // Specify your chart type here.
      title: {
        text: 'My First Chart' // Adds a title to your chart
      },
      legend: {}, // Creates an interactive legend
      series: [  // Insert your series data here.
          { values: [parseInt(votes[0].tally), parseInt(votes[1].tally), parseInt(votes[2].tally), parseInt(votes[3].tally)]}
      ],
      'scale-x': {
        labels: ['A', 'B', 'C', 'D'],
        item: {
        'font-color': '#000',
        'font-size': '40px',
        },
      },
      plot: {
        animation:{
          effect: 4,
          method: 5,
          speed: 700,
          sequence: 1
        }
      }
    };
    zingchart.render({ // Render Method[3]
      id: 'chartDiv',
      data: chartData,
      height: 400,
      width: 600
    });
}