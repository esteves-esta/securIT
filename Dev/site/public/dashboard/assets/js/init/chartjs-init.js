( function ( $ ) {
    "use strict";

    // single bar chart
    var ctx = document.getElementById( "singelBarChart" );
    ctx.width = 500;
    ctx.height = 500;
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: [ "21:00", "21:10", "21:20", "21:30", "21:40", "21:50", "22:00" ],
            datasets: [
                {
                    label: "My First dataset",
                    data: [ 10, 20, 45, 80, 56, 55, 60 ],
                    borderColor: "#fdb416",
                    borderWidth: "2",
                    backgroundColor: "rgba(253, 180, 22, 0.27)",
                    
                            }
                        ]
        },
        options: {
            scales: {
                yAxes: [ {
                    ticks: {
                        beginAtZero: true
                    }
                                } ]
            }
        }
    } );




} )( jQuery );