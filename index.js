const blogs = [
  {
      title: "How to store dry red chillies for longer shelf life?",
      description: "Red chillies are essential in Indian cuisine, providing color, flavor, and taste; however, improper storage can lead to spoilage. To extend the shelf life of dry red chillies, it’s crucial to store them in airtight containers in a cool, dark place and to use them within a year. Common causes of spoilage include dehydration, light, oxygen, and temperature fluctuations. Tips for repacking include using vacuum-sealed bags, drying them with a food dehydrator, or storing them in sterilized glass jars. Avoid plastic bags and ensure chillies are completely dry before storage to prevent oxidation. Regularly inspect stored chillies for damage and label containers with packing dates. By following these guidelines, you can effectively prolong the freshness of your dry red chillies, making them last longer for your culinary needs."
  },
  {
      title: "5 Tips for Drying Red Chillies at Home",
      description: "Drying chillies at home is easy with these 5 tips: air dry, use a dehydrator, sun dry, oven dry, and microwave dry. Each method ensures long-lasting flavor and quality."
  },
];


var sannamObj = [];
var tejaObj = [];
var byadgiObj = [];
var threeFourtyOneobj = [];
// var no5Obj = [];
var devanurObj = [];
var rowsToDisplay = 6;
var USDRate = 0;
var rootArray = [];
var rootArrayForCharts = [];

function prepareChartInfo(rowsInput, inputGraphKey, fromHtml) {
  var rows = rowsInput ? rowsInput : rowsToDisplay;
  var consolidatedPrices = [];
  consolidatedPrices = rootArrayForCharts.slice();
  for (var i = 1; i <= rows; i++) {
    var dateInfo = '';
    var tejaIndividual = [],
      sannamIndividual = [],
      byadgiIndividual = [],
      threeFourtyOneIndividual = [],
      // no5Individual = [],
      devanurIndividual = [];
    var tejaBuffer = 1,
      sannamBuffer = 1,
      byadgiBuffer = 1,
      threeFourtyOneBuffer = 1,
      // no5Buffer = 1,
      devanurBuffer = 1;

    consolidatedPrices[consolidatedPrices.length - i].forEach(function (
      val,
      i
    ) {
      // For getting the date
      if (i == 0) {
        dataInfo = val;
      }

      // Teja Logic
      if (i == 1 || (i > 1 && i < 5)) {
        tejaIndividual.push(val);
        tejaBuffer++;
      }

      if (tejaBuffer == 5) {
        tejaIndividual.unshift(dataInfo);
        tejaObj.unshift(tejaIndividual);
        tejaBuffer = 1;
      }

      // Sannam Logic
      if (i == 5 || (i > 5 && i < 9)) {
        sannamIndividual.push(val);
        sannamBuffer++;
      }

      if (sannamBuffer == 5) {
        sannamIndividual.unshift(dataInfo);
        sannamObj.unshift(sannamIndividual);
        sannamBuffer = 1;
      }

      // Byadgi Logic
      if (i == 9 || (i > 9 && i < 13)) {
        byadgiIndividual.push(val);
        byadgiBuffer++;
      }

      if (byadgiBuffer == 5) {
        byadgiIndividual.unshift(dataInfo);
        byadgiObj.unshift(byadgiIndividual);
        byadgiBuffer = 1;
      }

      // 341 Logic
      if (i == 13 || (i > 13 && i < 17)) {
        threeFourtyOneIndividual.push(val);
        threeFourtyOneBuffer++;
      }

      if (threeFourtyOneBuffer == 5) {
        threeFourtyOneIndividual.unshift(dataInfo);
        threeFourtyOneobj.unshift(threeFourtyOneIndividual);
        threeFourtyOneBuffer = 1;
      }

      // No 5 Logic
      // if (i == 17 || (i > 17 && i < 21)) {
      //   no5Individual.push(val);
      //   no5Buffer++;
      // }

      // if (no5Buffer == 5) {
      //   no5Individual.unshift(dataInfo);
      //   no5Obj.unshift(no5Individual);
      //   no5Buffer = 1;
      // }

      // Devanur Logic
      if (i == 17 || (i > 17 && i < 21)) {
        devanurIndividual.push(val);
        devanurBuffer++;
      }

      if (devanurBuffer == 5) {
        devanurIndividual.unshift(dataInfo);
        devanurObj.unshift(devanurIndividual);
        devanurBuffer = 1;
      }
    });
  }

  if (inputGraphKey) {
    if (inputGraphKey === 'sannam') {
      drawChart(sannamObj, '334 S4/Sannam', 'sannam_graph', inputGraphKey);
    }
    if (inputGraphKey === 'teja') {
      drawChart(tejaObj, 'Teja S17', 'teja_graph', inputGraphKey);
    }
    if (inputGraphKey === 'byadgi') {
      drawChart(byadgiObj, 'Byadgi', 'byadgi_graph', inputGraphKey);
    }
    if (inputGraphKey === '341') {
      drawChart(threeFourtyOneobj, '341', '341_graph', inputGraphKey);
    }
    // if (inputGraphKey === 'no5') {
    //   drawChart(no5Obj, 'No 5', 'no5_graph', inputGraphKey);
    // }
    if (inputGraphKey === 'dd') {
      drawChart(devanurObj, 'Devanur Deluxe DD', 'denvar', inputGraphKey);
    }
  } else {
    initializeChart();
  }
}

function makeApiCallForCharts(val) {
  var rows = val ? val : rowsToDisplay;
  var params = {
    spreadsheetId: '1dwhlEIQ_H0NcAIT-SSg1sM_ZpsT2KZNUvc2fqWI9lYU',
    API_KEY: 'AIzaSyBshQgbcousVir0__rUic0Bj1Ei6XYuKrE',
    majorDimension: 'ROWS',
    range: 'Consolidated Prices',
  };

  var request =
    fetch(`https://content-sheets.googleapis.com/v4/spreadsheets/${params.spreadsheetId}/values:batchGet?ranges=Consolidated%20Prices&majorDimension=${params.majorDimension}&key=${params.API_KEY}
  `);
  request
    .then(function (response) {
      return response.json();
    })
    .then(
      function (response) {
        rootArrayForCharts = response.valueRanges[0].values;
        prepareChartInfo();
      },
      function (reason) {
        console.error('error: ' + reason.error.message);
      }
    );
}

function updateDailyArrivalsIndividualFieldsStemBasis(fields) {
  var dateArray = fields[0].slice();

  var index = dateArray.length - 1;

  var table = document.getElementById('dailyRatesTable1');

  document.getElementById(
    'dateOfFlow1'
  ).innerHTML = `Our Offer prices on Date: ${dateArray[index]}`;

  var tailoredData = fields.slice();

  if (index) {
    var cellBuffer = 1;
    var rowBuffer = 1;

    tailoredData.forEach((value, i) => {
      if (i == 0) {
        return;
      }

      value.forEach((val, i) => {
        if (rowBuffer == 9) {
          rowBuffer = 1;
          cellBuffer++;
        }
        if (i == index) {
          table.rows[rowBuffer].cells[cellBuffer].innerHTML = val;
          rowBuffer++;
        }
      });
    });
  }
}

function convertDate(date) {
  var date = new Date(date);
  console.log(date.getMonth());

  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return `${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
}

function updateDailyArrivalsIndividualFieldsForFatki(fields) {
  console.log(fields);
  var dateArray = fields[0].slice();

  var index = dateArray.length - 1;

  document.getElementById(
    'dateForFatkiTable'
  ).innerHTML = `<h4 style="font-size: 1.2rem">Fatki Table Prices per quintal on Date: ${convertDate(
    dateArray[index]
  )}</h4>`;

  var table = document.getElementById('dailyRatesForFatkiTable');
  if (index) {
    var cellBuffer = 1;
    var rowBuffer = 1;

    var tailoredData = fields.slice();

    tailoredData.forEach((value, i) => {
      if (i == 0) {
        return;
      }

      value.forEach((val, i) => {
        if (rowBuffer == 3) {
          rowBuffer = 1;
          cellBuffer++;
        }
        if (i == index) {
          table.rows[rowBuffer].cells[cellBuffer].innerHTML = val;
          rowBuffer++;
        }
      });
    });
  }
}

function updateDailyArrivalsIndividualFields(fields) {
  var dateArray = fields[0].slice();

  var index = dateArray.length - 1;

  document.getElementById(
    'dateOfFlow'
  ).innerHTML = `<h4>Farmer Prices per quintal on Date: ${convertDate(
    dateArray[index]
  )}</h4>`;
  // convertDate(dateArray[index]);
  var table = document.getElementById('dailyRatesTable');
  if (index) {
    var cellBuffer = 1;
    var rowBuffer = 1;

    var tailoredData = fields.slice();

    tailoredData.forEach((value, i) => {
      if (i == 0) {
        return;
      }

      value.forEach((val, i) => {
        if (rowBuffer == 5) {
          rowBuffer = 1;
          cellBuffer++;
        }
        if (i == index) {
          table.rows[rowBuffer].cells[cellBuffer].innerHTML = val;
          rowBuffer++;
        }
      });
    });
  }
}

function updateDailyInFlow(fields) {
  var dateArray = fields[0];

  var index = dateArray.length - 1;

  var table = document.getElementById('OverAllInFlow');
  if (index) {
    var rowBuffer = 0;
    fields.forEach((value, i) => {
      value.forEach((val, i) => {
        if (i == index) {
          table.rows[rowBuffer].cells[1].innerHTML = val;
          rowBuffer++;
        }
      });
    });
  }
}

function initializeChart() {
  google.charts.load('current', { packages: ['corechart'] });
  google.charts.setOnLoadCallback(drawCharts);
}

function getModifiedArray(fields) {
  var values = fields;

  var modifiedArray = [];
  modifiedArray.push(['Date', 'Medium', 'Medium Best', 'Best', 'Deluxe']);

  var arr = [];

  values.forEach(function (value, index) {
    var arr = [];
    value.forEach(function (val, i) {
      if (i == 0) {
        arr.push(val);
        return;
      }
      arr.push(parseInt(val));
    });
    modifiedArray.push(arr);
  });

  return modifiedArray;
}

function drawCharts() {
  drawChart(sannamObj, '334 S4/Sannam', 'sannam_graph');
  drawChart(tejaObj, 'Teja S17', 'teja_graph');
  drawChart(byadgiObj, 'Byadgi', 'byadgi_graph');
  drawChart(threeFourtyOneobj, '341', '341_graph');
  // drawChart(no5Obj, 'No 5', 'no5_graph');
  drawChart(devanurObj, 'Devanur Deluxe DD', 'denvar');
}

function drawChart(fields, title, id, objectToModify) {
  // Create the data table.
  var slicedField = fields.slice();
  var getUpdatedInfo = getModifiedArray(slicedField);
  var data = google.visualization.arrayToDataTable(getUpdatedInfo);

  var options = {
    title: title + ' Dried Red Chilli Farmer Live Rates',
    legend: {
      position: 'bottom',
    },
    backgroundColor: '#f3f3f3',
    width: '800',
    height: '450',
    vAxis: {
      ticks: [
        7500, 10000, 12500, 15000, 17500, 20000, 22500, 25000, 27500, 30000,
      ],
    },
    lineSmoothing: false,
    focusTarget: 'category',
  };

  var chart = new google.visualization.LineChart(document.getElementById(id));
  chart.draw(data, options);

  if (objectToModify) {
    if (objectToModify === 'sannam') sannamObj = [];
    if (objectToModify === 'teja') tejaObj = [];
    if (objectToModify === '341') threeFourtyOneobj = [];
    // if (objectToModify === 'no5') no5Obj = [];
    if (objectToModify === 'byadgi') byadgiObj = [];
    if (objectToModify === 'dd') devanurObj = [];
  } else {
    setTimeout(function () {
      sannamObj = [];
      tejaObj = [];
      byadgiObj = [];
      threeFourtyOneobj = [];
      // no5Obj = [];
      devanurObj = [];
    }, 1000);
  }
}

function convertUSD(farmerValues) {
  var farmersArrayConverted = [];

  farmerValues.forEach(function (value, index) {
    var arr = [];

    if (index == 0) {
      farmersArrayConverted.push(value);
      return;
    }

    value.forEach(function (childValue, childIndex) {
      if (childIndex == 0) {
        arr.push(childValue);
        return;
      }

      arr.push(Math.ceil(childValue / USDRate));
    });

    farmersArrayConverted.push(arr);
  });

  return farmersArrayConverted;
}

function modifyFarmerTableToUSD(farmerValues) {
  updateDailyArrivalsIndividualFields(convertUSD(farmerValues));
}

function modifiedOfferTableToUSD(offerValues) {
  updateDailyArrivalsIndividualFieldsStemBasis(convertUSD(offerValues));
}

var farmerClicked = false;

var offerClicked = false;

var currentCurrencyForFarmer = 'INR';

var currentCurrencyForoffer = 'INR';

var farmerButton = document.getElementById('FarmerRateConverterButton');

var offerButton = document.getElementById('OfferRateConverterButton');

var modifyArrayForUSDRates = [];
function modifyRatesToUSD(incomingBuffer) {
  var modifiedArray = [];
  var arrayToBeShipped = [];
  var rootArrayDummy = rootArray.slice();

  if (!farmerClicked || !offerClicked) {
    rootArrayDummy.forEach(function (individualArray, i) {
      var arr = [];

      if (i == 0) {
        modifiedArray.push(individualArray);
        return;
      }

      individualArray.forEach(function (val, childIndex) {
        if (childIndex == 0) {
          arr.push(val);
        } else {
          arr.push(parseInt(val));
        }
      });

      modifiedArray.push(arr);
    });
    modifyArrayForUSDRates = modifiedArray.slice();
  }

  if (incomingBuffer == 'farmer') {
    if (!farmerClicked || currentCurrencyForFarmer !== 'USD') {
      modifyFarmerTableToUSD(modifyArrayForUSDRates.slice(0, 25));
      farmerClicked = true;
      currentCurrencyForFarmer = 'USD';
      farmerButton.innerText = 'Convert to INR';
    } else {
      updateDailyArrivalsIndividualFields(rootArray.slice(0, 25));
      currentCurrencyForFarmer = 'INR';
      farmerButton.innerText = 'Convert to USD';
    }
  }
  if (incomingBuffer == 'offer') {
    if (!offerClicked || currentCurrencyForoffer !== 'USD') {
      var tailoredArray = [];
      tailoredArray = modifyArrayForUSDRates.slice(25, 73);
      tailoredArray.unshift(modifyArrayForUSDRates[0]);
      modifiedOfferTableToUSD(tailoredArray.slice());
      offerClicked = true;
      currentCurrencyForoffer = 'USD';
      offerButton.innerText = 'Convert to INR';
    } else {
      var tailoredArrayforINR = [];
      var rootArrayForTemp = rootArray.slice();
      tailoredArrayforINR = rootArrayForTemp.slice(25, 73);
      tailoredArrayforINR.unshift(rootArrayForTemp.slice(0, 1)[0]);
      updateDailyArrivalsIndividualFieldsStemBasis(tailoredArrayforINR);
      currentCurrencyForoffer = 'INR';
      offerButton.innerText = 'Convert to USD';
    }
  }
}

// gst image
function toggleImage() {
  var imageSection = document.getElementById("image-section");
  var arrow = document.getElementById("arrow");

  // Toggle display of image section
  if (imageSection.style.display === "none") {
      imageSection.style.display = "block"; // Show the image
      arrow.className = "arrow-down"; // Change arrow to downward
  } else {
      imageSection.style.display = "none"; // Hide the image
      arrow.className = "arrow-up"; // Change arrow to upward
  }
}

// blogs



// Function to generate the blog sections dynamically
function generateBlogs() {
  const blogContainer = document.getElementById('blog-sections'); // Parent container to hold all blogs
  blogs.forEach((blog, index) => {
      // Create a new div for each blog
      const blogHTML = `
          <div class="blog-section" data-blog-id="${index + 1}">
              <div class="banner-container" onclick="toggleBlogPost(this)">
                  <div class="banner-content">
                      <h2>${blog.title}</h2>
                      <span class="arrow-up"></span>
                  </div>
              </div>
              <div class="b-container" style="display: none;">
                  <p>${blog.description}</p>
              </div>
          </div>
      `;
      // Append the HTML to the container
      blogContainer.innerHTML += blogHTML;
  });
}

// Call the function to generate the blogs on page load
document.addEventListener('DOMContentLoaded', generateBlogs);



function toggleBlogPost(element) {
  // Find the blog container (b-container) related to the clicked banner
  const blogContainer = element.nextElementSibling;

  // Toggle the display of the blog post
  if (blogContainer.style.display === "none") {
      blogContainer.style.display = "block";
      element.querySelector('.arrow-up').classList.add('arrow-down');
      element.querySelector('.arrow-up').classList.remove('arrow-up')
  } else {
      blogContainer.style.display = "none";
      element.querySelector('.arrow-down').classList.add('arrow-up')
      element.querySelector('.arrow-down').classList.remove('arrow-down');
  }
}


// google sheets - price table
const API_KEY = 'AIzaSyDTNXpn-TFWhInawEkrm94tp7wSVDIG9T0';
const SPREADSHEET_ID = '1ntdLZUDLOj8cAfd6vessJ8-ENsbOBu05KuVtiELkq0Y';
const RANGE = 'chilli_prices!A1:C18'; // Adjust this range based on your data structure

// Function to fetch data from Google Sheets
async function fetchDailyPrices() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    
    displayPrices(data.values);
}

// Function to display prices on the webpage
function displayPrices(prices) {
  const pricesContainer = document.getElementById('daily-prices');
  let html = '<table class="prices-table">';
  
  html += '<thead><tr><th>Chilli Type</th><th>Variety</th><th>Price per Qtl</th></tr></thead>'; // Add table headers
  html += '<tbody>';

  prices.forEach(row => {
      html += `<tr class="price-row"><td class="price-type">${row[0]}</td><td class="price-variety">${row[1]}</td><td class="price-price">${row[2]}</td></tr>`;
  });

  html += '</tbody></table>';
  pricesContainer.innerHTML = html;
}

// Fetch prices when the page loads
window.onload = fetchDailyPrices;