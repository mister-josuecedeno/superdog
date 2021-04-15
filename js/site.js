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

loadEvents();

// This is the parent of all of our operations
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

function saveEvent() {
  // grab the events out of local storage
  let events = JSON.parse(localStorage.getItem('eventArray')) || eventArray;

  let obj = {};
  obj['event'] = document.getElementById('newEvent').value;
  obj['city'] = document.getElementById('newCity').value;
  obj['state'] = document.getElementById('newState').value;
  obj['attendance'] = document.getElementById('newAttendance').value;
  obj['date'] = document.getElementById('newDate').value;

  events.push(obj);

  localStorage.setItem('eventArray', JSON.stringify(events));

  // Access the values from the form by ID and ad an object to the array
  displayData(events);
}

function displayData(events) {
  const myTemplate = document.getElementById('Data-Template');
  const resultsBody = document.getElementById('resultsBody');

  // clear table first
  resultsBody.innerHTML = '';

  for (let i = 0; i <= events.length; i++) {
    const dataRow = document.importNode(myTemplate.content, true);

    dataRow.getElementById('event').textContent = events[i].event;
    dataRow.getElementById('city').textContent = events[i].city;
    dataRow.getElementById('state').textContent = events[i].state;
    dataRow.getElementById('attendance').textContent = events[i].attendance;
    dataRow.getElementById('date').textContent = formatDate(events[i].date);

    resultsBody.appendChild(dataRow);
  }
}

function formatDate(dateString) {
  var cleaned = ('' + dateString).replace(/\D/g, '');
  var match = cleaned.match(/^(\d{1,2})(\d{1,2})(\d{4})$/);
  if (match) {
    return match[1] + '/' + match[2] + '/' + match[3];
  }
  return null;
}
