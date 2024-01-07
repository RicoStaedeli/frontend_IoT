var config_chart = {
    data: {
        labels: [],
        datasets: [
            {
                label: "Poops",
                backgroundColor: "#4c51bf",
                borderColor: "#4c51bf",
                data: [],
                fill: false,
            }
        ],
    },
    options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
            display: false,
            text: "Sales Charts",
            fontColor: "white",
        },
        legend: {
            labels: {
                fontColor: "white",
            },
            align: "end",
            position: "bottom",
        },
        tooltips: {
            mode: "index",
            intersect: false,
        },
        hover: {
            mode: "nearest",
            intersect: true,
        },
        scales: {
            xAxes: [
                {
                    ticks: {
                        fontColor: "rgba(255,255,255,.7)",
                    },
                    display: true,
                    scaleLabel: {
                        display: false,
                        labelString: "Month",
                        fontColor: "white",
                    },
                    gridLines: {
                        display: false,
                        borderDash: [2],
                        borderDashOffset: [2],
                        color: "rgba(33, 37, 41, 0.3)",
                        zeroLineColor: "rgba(0, 0, 0, 0)",
                        zeroLineBorderDash: [2],
                        zeroLineBorderDashOffset: [2],
                    },
                },
            ],
            yAxes: [
                {
                    ticks: {
                        fontColor: "rgba(255,255,255,.7)",
                    },
                    display: true,
                    scaleLabel: {
                        display: false,
                        labelString: "Value",
                        fontColor: "white",
                    },
                    gridLines: {
                        borderDash: [3],
                        borderDashOffset: [3],
                        drawBorder: false,
                        color: "rgba(255, 255, 255, 0.15)",
                        zeroLineColor: "rgba(33, 37, 41, 0)",
                        zeroLineBorderDash: [2],
                        zeroLineBorderDashOffset: [2],
                    },
                },
            ],
        },
    },
};


function aggregatePoopWeightByDay(data) {
    const aggregatedData = {};

    data.forEach(item => {
        const date = item.timestamp.split('T')[0]; // Extract the date part
        if (aggregatedData[date]) {
            aggregatedData[date] += item.weight;
        } else {
            aggregatedData[date] = item.weight;
        }
    });

    return aggregatedData;
}

////////////
//// This function creates an array for eacht cat with one weight per day
////////////
function getOneWeightPerDayAndCat(data) {
    // Create an object to store the cat data
    catData = {};

    // Iterate through the input JSON
    for (const entry of data) {
        catID = entry.cat_ID;
        date = entry.timestamp.split('T')[0];

        // Initialize the cat entry if it doesn't exist
        if (!catData[catID]) {
            catData[catID] = {};
        }

        // Initialize the date entry if it doesn't exist
        if (!catData[catID][date]) {
            catData[catID][date] = [];
            catData[catID][date].push({
                "date": date,
                "weight": entry.weight,
            })
        }
    }

    weightvalues_cat_1 = Object.values(catData)[0]

    timestamps_cat = [];
    weights_cat = [];

    for (date in weightvalues_cat_1) {
        if (weightvalues_cat_1.hasOwnProperty(date)) {
            timestamps_cat.push(date);
            weights_cat.push(weightvalues_cat_1[date][0].weight);
        }
    }
    return { timestamps_cat, weights_cat }
}

////////////
//// This function loads the Data JSON from a given URL
////////////
async function loadData(url) {
    const response = await fetch(url);

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const requested_data = await response.json();
    return requested_data;
}


////////////
//// This function creates an array for all day with the corresponding value
////////////
function createObjectFromDayValueArrays(dayArray, valueArray) {
    var generatedObject = [];

    for (let i = 0; i < dayArray.length; i++) {
        day = dayArray[i];
        value = valueArray[i];

        obj = { "day": day, "value": value }; // Create an object with "day" and "value" properties
        generatedObject.push(obj); // Push the object into the result array
    }

    return generatedObject;
}

////////////
//// This function creates a keyVeluePair for each day
////////////
function creteKeyValuePairForEachDay(allDays, valueArray) {
    keyValueObject = []
    allDays.forEach((day) => {
        foundEntry = valueArray.find(entry => entry.day === day);
        if (foundEntry == null) {
            obj = { "day": day, "value": 0 };
            keyValueObject.push(obj)
        } else {
            obj = { "day": day, "value": foundEntry.value };
            keyValueObject.push(obj)
        }
    })

    return keyValueObject
}

////////////
//// This function finds the firs and las date in an array and creates a new array with all days between
////////////
function findFirstAndLastDays(inputArray) {
    // Convert the input array to an array of Date objects
    dateArray = inputArray.map(dateStr => new Date(dateStr));

    // Sort the dateArray in ascending order
    dateArray.sort((a, b) => a - b);

    // Find the first and last dates
    firstDate = dateArray[0];
    lastDate = dateArray[dateArray.length - 1];

    // Create a new array with entries for each day between the first and last dates
    resultArray = [];
    let currentDate = new Date(firstDate);

    while (currentDate <= lastDate) {
        resultArray.push(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return resultArray;
}

////////////
//// This function creates the array for the chart
////////////
function createArraysForOverviewChart(data) {
    valuesArray = [];

    data.forEach(item => {
        valuesArray.push(item.value);
    });
    return valuesArray;
}

////////////
//// Create Chart for Weights
////////////
async function createWeightGraph(baseConfigChart) {
    var dataCatWeights = await loadData("https://poop-tracker-48b06530794b.herokuapp.com/weights")
    let config_weights = JSON.parse(JSON.stringify(baseConfigChart));

    chartData = getOneWeightPerDayAndCat(dataCatWeights)

    config_weights.data.labels = chartData.timestamps_cat;
    config_weights.data.datasets[0].data = chartData.weights_cat;
    config_weights.data.datasets[0].label = "Joe";
    config_weights.data.datasets[0].type = "line";


    var ctx2 = document.getElementById("line-chart-cat").getContext("2d");
    new Chart(ctx2, config_weights);

}

////////////
//// Create Chart for Poops
////////////
async function createPoopsGraph(baseConfigChart) {
    var data_poop = await loadData("https://poop-tracker-48b06530794b.herokuapp.com/poops")

    let config_poops = JSON.parse(JSON.stringify(baseConfigChart));

    poop_data_per_day = aggregatePoopWeightByDay(data_poop);

    days_poops = Object.keys(poop_data_per_day);
    weights_poops = Object.values(poop_data_per_day);

    config_poops.data.labels = days_poops;
    config_poops.data.datasets[0].data = weights_poops;

    config_poops.data.datasets[0].type = "bar";

    console.log(baseConfigChart)
    console.log(config_poops)

    var ctx = document.getElementById("line-chart-poop").getContext("2d");
    new Chart(ctx, config_poops);
}

////////////
//// Create Chart for Overview
////////////
async function createOverviewGraph(baseConfigChart) {
    var data_poop = await loadData("https://poop-tracker-48b06530794b.herokuapp.com/poops")
    var dataCatWeights = await loadData("https://poop-tracker-48b06530794b.herokuapp.com/weights")
    let config_overview = JSON.parse(JSON.stringify(baseConfigChart));

    //create Poops data
    poop_data_per_day = aggregatePoopWeightByDay(data_poop);
    days_poops = Object.keys(poop_data_per_day);
    weights_poops = Object.values(poop_data_per_day);

    chartDataWeights = getOneWeightPerDayAndCat(dataCatWeights)
    timestampWeights = chartDataWeights.timestamps_cat
    weightsCats = chartDataWeights.weights_cat

    poops_values = createObjectFromDayValueArrays(days_poops, weights_poops)
    cats_values = createObjectFromDayValueArrays(timestampWeights, weightsCats)
    allDays_Poops_Cats = timestampWeights.concat(days_poops)
    days_overview = findFirstAndLastDays(allDays_Poops_Cats)

    dataForChart_poop = creteKeyValuePairForEachDay(days_overview, poops_values)
    dataForChart_cats = creteKeyValuePairForEachDay(days_overview, cats_values)

    owerview_poopsvalues = createArraysForOverviewChart(dataForChart_poop)
    overview_catsvalues = createArraysForOverviewChart(dataForChart_cats)
    
    //set chart config cat
    config_overview.data.labels = days_overview;
    config_overview.data.datasets[0].data = overview_catsvalues;
    config_overview.data.datasets[0].label = "Joe";
    config_overview.data.datasets[0].type = "line";

    //set chart config poops
    config_overview.data.datasets.push({
        label: "Poops",
        type: "bar",
        fill: false,
        backgroundColor: "#ed64a6",
        borderColor: "#ed64a6",
        data: owerview_poopsvalues,
      })


    var ctx2 = document.getElementById("line-chart-overview").getContext("2d");
    new Chart(ctx2, config_overview);

}

createPoopsGraph(config_chart)
createWeightGraph(config_chart)
createOverviewGraph(config_chart)