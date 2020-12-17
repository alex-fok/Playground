async function toBinary(string) {
    const codeUnits = new Uint16Array(string.length);
    for (let i = 0; i < codeUnits.length; i++) {
      codeUnits[i] = string.charCodeAt(i);
    }
    return String.fromCharCode(...new Uint8Array(codeUnits.buffer));
}

function renderToPageByte(binary) {
    const containerEl = document.getElementById("satelliteImage");
    const imgEl = document.createElement("img");
    imgEl.src = `data:image/png;base64,${btoa(binary)}`;
    containerEl.append(imgEl);
}

function renderToPage(img) {
    const containerEl = document.getElementById("satelliteImage");
    const imgEl = document.createElement("img");
    imgEl.src = img;
    containerEl.appendChild(imgEl);
}

function requestSatelliteImage(city) {
    const endpoint = "https://api.nasa.gov/planetary/earth/imagery";
    const position = cities[city.toLowerCase()];
    if (!position) return;
    // const url = endpoint + "?lon=" + position.lon + "&lan=" + position.lat + "&dim=0.25&api_key=" + config.key
    const url = `${endpoint}?lon=${position.lon}&lat=${position.lat}&dim=0.15&api_key=${config.key}`;

    renderToPage(url);
    // Build up http request
    function makeRequest() {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                console.log("CHECK");
               renderToPageByte(toBinary(xhr.responseText));     
            }
        }
        xhr.open("GET", url, true);
        xhr.send();
    }
    makeRequest();
}

requestSatelliteImage("seattle");