// Base data for seeding application
var eventArray = [
  {
    event: 'ComicCon',
    city: 'New York',
    state: 'New York',
    attendance: 240000,
    date: '06/01/2017',
  },
  {
    event: 'ComicCon',
    city: 'New York',
    state: 'New York',
    attendance: 250000,
    date: '06/01/2018',
  },
  {
    event: 'ComicCon',
    city: 'New York',
    state: 'New York',
    attendance: 257000,
    date: '06/01/2019',
  },
  {
    event: 'ComicCon',
    city: 'San Diego',
    state: 'California',
    attendance: 130000,
    date: '06/01/2017',
  },
  {
    event: 'ComicCon',
    city: 'San Diego',
    state: 'California',
    attendance: 140000,
    date: '06/01/2018',
  },
  {
    event: 'ComicCon',
    city: 'San Diego',
    state: 'California',
    attendance: 150000,
    date: '06/01/2019',
  },
  {
    event: 'HeroesCon',
    city: 'Charlotte',
    state: 'North Carolina',
    attendance: 40000,
    date: '06/01/2017',
  },
  {
    event: 'HeroesCon',
    city: 'Charlotte',
    state: 'North Carolina',
    attendance: 45000,
    date: '06/01/2018',
  },
  {
    event: 'HeroesCon',
    city: 'Charlotte',
    state: 'North Carolina',
    attendance: 50000,
    date: '06/01/2019',
  },
];

// Filtered data
var filteredEvents = eventArray;

// CITY STATISTICS -- Functions for City Drop-down and Statistics

// Build drop-down for filtering statistics by city
function buildDropDown() {
  var eventDD = document.getElementById('eventDropDown');

  let distinctEvents = [...new Set(eventArray.map((event) => event.city))];
  let linkHTMLEnd =
    '<div class="dropdown-divider"></div><a class="dropdown-item" onclick="getEvents(this)" data-string="All" >All</a>';
  let resultsHTML = '';

  for (let i = 0; i < distinctEvents.length; i++) {
    resultsHTML += `<a class="dropdown-item" onclick="getEvents(this)" data-string="${distinctEvents[i]}">${distinctEvents[i]}</a>`;
  }

  resultsHTML += linkHTMLEnd;
  eventDD.innerHTML = resultsHTML;
  displayStats();
  // displayData();
}

// Display statistics based on city selection
function displayStats() {
  let total = 0;
  let average = 0;
  let most = 0;
  let least = -1;
  let currentAttendance = 0;

  for (let i = 0; i < filteredEvents.length; i++) {
    currentAttendance = filteredEvents[i].attendance;
    total += currentAttendance;

    if (most < currentAttendance) {
      most = currentAttendance;
    }

    if (least > currentAttendance || least < 0) {
      least = currentAttendance;
    }
  }

  average = total / filteredEvents.length;

  document.getElementById('total').innerHTML = total.toLocaleString();
  document.getElementById('most').innerHTML = most.toLocaleString();
  document.getElementById('least').innerHTML = least.toLocaleString();
  document.getElementById('average').innerHTML = average.toLocaleString(
    undefined,
    {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }
  );
}

// Get the events for the selected city
function getEvents(e) {
  let city = e.getAttribute('data-string');
  curEvents = JSON.parse(localStorage.getItem('eventArray')) || eventArray;
  filteredEvents = curEvents;
  document.getElementById('statsHeader').innerHTML = `Stats for ${city} Events`;

  if (city !== 'All') {
    filteredEvents = curEvents.filter(function (event) {
      if (event.city == city) {
        return event;
      }
    });
  }
  displayStats();
}

// EVENT DATA -- Functions for displaying event data
// Load events (data)
loadEvents();

// Trigger for data load
function loadEvents() {
  let events = [];
  events = getData();
  displayData(events);
}

// Get Data
function getData() {
  // Check local storage
  let events = JSON.parse(localStorage.getItem('eventArray')) || [];

  // if empty, use local array to seed the data
  if (events.length == 0) {
    events = eventArray;
    localStorage.setItem('eventArray', JSON.stringify(events));
  }

  return events;
}

// Save user-provided data
function saveEvent() {
  // grab the events out of local storage
  let events = JSON.parse(localStorage.getItem('eventArray')) || eventArray;

  let obj = {};
  obj['event'] = document.getElementById('newEvent').value;
  obj['city'] = document.getElementById('newCity').value;
  obj['state'] = document.getElementById('newState').value;
  obj['attendance'] = document.getElementById('newAttendance').value;
  obj['date'] = formatDate(document.getElementById('newDate').value);

  events.push(obj);

  localStorage.setItem('eventArray', JSON.stringify(events));

  // Access the values from the form by ID and ad an object to the array
  displayData(events);
}

// Reformat new dates
function formatDate(dateString) {
  let [year, month, day] = dateString.split('-');
  return [month, day, year].join('/');
}

// Display event data
function displayData(events) {
  const myTemplate = document.getElementById('Data-Template');
  const resultsBody = document.getElementById('resultsBody');

  // clear table first
  resultsBody.innerHTML = '';

  for (let i = 0; i < events.length; i++) {
    const dataRow = document.importNode(myTemplate.content, true);

    dataRow.getElementById('event').textContent = events[i].event;
    dataRow.getElementById('city').textContent = events[i].city;
    dataRow.getElementById('state').textContent = events[i].state;
    dataRow.getElementById('attendance').textContent = events[
      i
    ].attendance.toLocaleString();
    // dataRow.getElementById('date').textContent = formatDate(events[i].date);
    dataRow.getElementById('date').textContent = events[i].date;

    resultsBody.appendChild(dataRow);
  }
}

// Format date string (REMOVE)
/* function formatDate(dateString) {
  var cleaned = ('' + dateString).replace(/\D/g, '');
  var match = cleaned.match(/^(\d{1,2})(\d{1,2})(\d{4})$/);
  if (match) {
    return match[1] + '/' + match[2] + '/' + match[3];
  }
  return null;
} */
