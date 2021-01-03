let socket = new WebSocket("ws://" + window.location.host + "/eoloplants");
let secWebsocketKey;

socket.onmessage = function (event) {
  console.log(`[message] Data received from server: ${event.data}`);
  const data = JSON.parse(event.data);
  console.log('sec-websocket-key', data['sec-websocket-key'])
  if (data['sec-websocket-key']) {
    secWebsocketKey = data['sec-websocket-key'];
    return;
  }
  editPlant(data);
};

socket.onopen = function (event) {
  console.log(`[onconnect] event received from server:`, event);
};

socket.onclose = function (event) {
  if (event.wasClean) {
    console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    console.log('[close] Connection died');
  }
};

socket.onerror = function (error) {
  console.log(`[error] ${error.message}`);
};

async function createPlant() {
  const city = document.querySelector('#city').value;
  document.querySelector('#generate').disabled = true;
  const response = await fetch('/api/eoloplants', {
    method: 'POST',
    headers: {
      'user-key': secWebsocketKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({city})
  });
  const plant = await response.json();
  attachPlant(plant);
}

function attachPlant(plant) {
  const htmlContent = `<div id="plant-${plant.id}" class="col"></div>`;
  const current = document.querySelector('#plants').innerHTML;
  document.querySelector('#plants').innerHTML = htmlContent + current;
  editPlant(plant);
}

function editPlant(plant) {
  let weather = '';
  let landscape = '';
  if (plant.completed) {
    [, weather, landscape] = plant.planning.split('-');
    document.querySelector('#generate').disabled = false;
  }

  const htmlContent = `
      <div class="card mb-4 shadow-sm">
        <div class="card-header">
          <h4 class="my-0 fw-normal">${plant.city}</h4>
        </div>
        <div class="card-body px-2">
          <ul class="list-unstyled mt-3 mb-4">
            <li class="weather">Weather: ${weather}</li>
            <li class="landscape">Landscape: ${landscape}</li>
          </ul>
          <div class="progress">
            <div class="progress-bar ${plant.completed ? 'bg-success' : ''}" role="progressbar" style="width: ${plant.progress || 0}%;" aria-valuemin="0" aria-valuemax="100">${plant.created ? 'created!' : plant.progress || 0}%</div>
          </div>
        </div>
      </div>
    `;
  document.querySelector('#plant-' + plant.id).innerHTML = htmlContent;
}