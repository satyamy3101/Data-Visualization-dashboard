$(document).ready(function() {
    let currentChart;

    $.getJSON('fetch_data.php', function(data) {
        console.log("Fetched data: ", data);
        
        let years = [...new Set(data.map(item => item.end_year))].sort();
        let $yearSelect = $('#year');
        
        years.forEach(year => {
            $yearSelect.append(`<option value="${year}">${year}</option>`);
        });

        function updateChart(year) {
            console.log("Updating chart for year: ", year);
            let filteredData = data.filter(item => item.end_year == year);
            let intensity = filteredData.map(item => item.intensity);
            let likelihood = filteredData.map(item => item.likelihood);
            let topics = filteredData.map(item => item.topic);

            let trace1 = {
                x: topics,
                y: intensity,
                type: 'bar',
                name: 'Intensity'
            };

            let trace2 = {
                x: topics,
                y: likelihood,
                type: 'bar',
                name: 'Likelihood'
            };

            let layout = {
                title: `Intensity and Likelihood by Topic for Year ${year}`,
                barmode: 'group',
                xaxis: { title: 'Topics' },
                yaxis: { title: 'Values' }
            };

            if (currentChart) {
                Plotly.react('chart', [trace1, trace2], layout);
            } else {
                currentChart = Plotly.newPlot('chart', [trace1, trace2], layout);
            }
        }

        $yearSelect.change(function() {
            let selectedYear = $(this).val();
            console.log("Selected year: ", selectedYear);
            if (selectedYear) {
                updateChart(selectedYear);
            }
        });

    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Error fetching data: ", textStatus, errorThrown);
    });
});
