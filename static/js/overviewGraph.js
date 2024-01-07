
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


poops_values = createObjectFromDayValueArrays(days_poops, weights_poops)
cats_values = createObjectFromDayValueArrays(timestamps_cat, weights_cat)
allDays_Poops_Cats = timestamps_cat.concat(days_poops)
days_overview = findFirstAndLastDays(allDays_Poops_Cats)

dataForChart_poop = creteKeyValuePairForEachDay(days_overview, poops_values)
dataForChart_cats = creteKeyValuePairForEachDay(days_overview, cats_values)



owerview_poopsvalues = createArraysForOverviewChart(dataForChart_poop)
overview_catsvalues = createArraysForOverviewChart(dataForChart_cats)