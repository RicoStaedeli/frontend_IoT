/*const jsonData = [
  {
    "ID_poop": 31,
    "weight": 15,
    "timestamp": "2024-01-02T13:11:53.326439",
    "feeding_ID": 1
  },
  {
    "ID_poop": 32,
    "weight": 18,
    "timestamp": "2024-01-03T13:11:53.326439",
    "feeding_ID": 1
  },
  {
    "ID_poop": 33,
    "weight": 18,
    "timestamp": "2024-01-03T18:11:53.326439",
    "feeding_ID": 1
  },
  {
    "ID_poop": 34,
    "weight": 18,
    "timestamp": "2024-01-05T13:11:53.326439",
    "feeding_ID": 1
  }
]*/

const inputJSON = [
  {
    "ID_cat": 1,
    "name": "Charlie",
    "weight": 3.522,
    "timestamp": "2024-01-02T12:04:08.393478"
  },
  {
    "ID_cat": 2,
    "name": "Joe",
    "weight": 1000,
    "timestamp": "2024-01-02T12:42:05.423883"
  },
  {
    "ID_cat": 2,
    "name": "Joe",
    "weight": 1050,
    "timestamp": "2024-01-03T12:42:05.423883"
  },
  {
    "ID_cat": 2,
    "name": "Joe",
    "weight": 1040,
    "timestamp": "2024-01-03T12:42:05.423883"
  },
  {
    "ID_cat": 2,
    "name": "Joe",
    "weight": 1070,
    "timestamp": "2024-01-06T12:42:05.423883"
  }
];

// Create an object to store the cat data
const catData = {};

// Iterate through the input JSON
for (const entry of inputJSON) {
  const catID = entry.cat_ID;
  const date = entry.timestamp.split('T')[0];

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

const weightvalues_cat_1 = Object.values(catData)[1]

const timestamps_cat = [];
const weights_cat = [];

for (date in weightvalues_cat_1) {
  if (weightvalues_cat_1.hasOwnProperty(date)) {
    timestamps_cat.push(date);
    weights_cat.push(weightvalues_cat_1[date][0].weight);
  }
}

async function loadData(url) {
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const requested_data = await response.json();
  return requested_data;
}

function aggregateWeightByDay(data) {
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



/* Chart initialisations */
/* Line Chart */
var config = {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Poops",
        backgroundColor: "#4c51bf",
        borderColor: "#4c51bf",
        data: [],
        fill: false,
      },
      {
        label: new Date().getFullYear() - 1,
        fill: false,
        backgroundColor: "#ed64a6",
        borderColor: "#ed64a6",
        data: [40, 68, 86, 74, 56, 60, 87],
      },
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

var config_poop = {
  type: "bar",
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

var config_cat = {
  type: "line",
  data: {
    labels: timestamps_cat,
    datasets: [
      {
        label: "Joe",
        backgroundColor: "#4c51bf",
        borderColor: "#4c51bf",
        data: weights_cat,
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

function findFirstAndLastDays(inputArray) {
  // Convert the input array to an array of Date objects
  const dateArray = inputArray.map(dateStr => new Date(dateStr));

  // Sort the dateArray in ascending order
  dateArray.sort((a, b) => a - b);

  // Find the first and last dates
  const firstDate = dateArray[0];
  const lastDate = dateArray[dateArray.length - 1];

  // Create a new array with entries for each day between the first and last dates
  const resultArray = [];
  let currentDate = new Date(firstDate);

  while (currentDate <= lastDate) {
    resultArray.push(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return resultArray;
}


poops_values = createObjectFromDayValueArrays(days_poops, weights_poops)
cats_values = createObjectFromDayValueArrays(timestamps_cat, weights_cat)
allDays_Poops_Cats = timestamps_cat.concat(days_poops)
days_overview = findFirstAndLastDays(allDays_Poops_Cats)

dataForChart_poop = creteKeyValuePairForEachDay(days_overview, poops_values)
dataForChart_cats = creteKeyValuePairForEachDay(days_overview, cats_values)

function createArraysForChart(data) {
  valuesArray = [];

  data.forEach(item => {
    valuesArray.push(item.value);
  });
  return valuesArray;
}

owerview_poopsvalues = createArraysForChart(dataForChart_poop)
overview_catsvalues = createArraysForChart(dataForChart_cats)

var config_overview = {
  data: {
    labels: days_overview,
    datasets: [
      {
        type: "bar",
        label: "Poop",
        backgroundColor: "#4c51bf",
        borderColor: "#4c51bf",
        data: owerview_poopsvalues,
        fill: false,
      },
      {
        type: "line",
        label: "Joe",
        fill: false,
        backgroundColor: "#ed64a6",
        borderColor: "#ed64a6",
        data: overview_catsvalues,
      },
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

var ctx_overview = document.getElementById("line-chart-overview").getContext("2d");
new Chart(ctx_overview, config_overview);



var ctx2 = document.getElementById("line-chart-cat").getContext("2d");
new Chart(ctx2, config_cat);

var ctx3 = document.getElementById("line-chart-gas").getContext("2d");
new Chart(ctx3, config);

async function createPoopsGraph() {
  var data_poop = await loadData("https://poop-tracker-48b06530794b.herokuapp.com/poops")

  poop_data_per_day = aggregateWeightByDay(jsonData);

  // Create arrays for days and weights
  days_poops = Object.keys(poop_data_per_day);
  weights_poops = Object.values(poop_data_per_day);

  config_poop.data.labels = days_poops;
  config_poop.data.datasets[0].data = weights_poops;

  var ctx = document.getElementById("line-chart-poop").getContext("2d");
  new Chart(ctx, config_poop);

  console.log(data_poop)
}

createPoopsGraph()