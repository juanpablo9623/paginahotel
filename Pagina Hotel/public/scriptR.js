function checkAvailability() {
    const arrivalDate = document.getElementById('arrival').value;
    const departureDate = document.getElementById('departure').value;
    const roomType = document.getElementById('room-type').value;
  
    if (!arrivalDate || !departureDate || !roomType) {
      alert("Por favor, completa todos los campos.");
      return;
    }
  
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3007/check-availability');
    xhr.setRequestHeader('Content-Type', 'application/json');
  
    xhr.onload = function() {
        const response = JSON.parse(xhr.responseText);
        if (xhr.status === 200 && response.available) {
            document.getElementById('result').textContent = '¡Habitación disponible! Puedes continuar con la reserva.';
            document.getElementById('reserveBtn').disabled = false;
            document.getElementById('reserveBtn').classList.remove('hidden');
        } else {
            document.getElementById('result').textContent = response.message;
            document.getElementById('reserveBtn').disabled = true;
            document.getElementById('reserveBtn').classList.add('hidden');
        }
    };
  
    xhr.send(JSON.stringify({ arrivalDate, departureDate, roomType }));
  }
  
  function makeReservation() {
    const arrivalDate = document.getElementById('arrival').value;
    const departureDate = document.getElementById('departure').value;
    const roomType = document.getElementById('room-type').value;
    const guests = document.getElementById('guests').value;
    const nombreHuesped = prompt("Ingresa el nombre del huésped:");
    const emailHuesped = prompt("Ingresa el email del huésped:");
  
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3007/make-reservation');
    xhr.setRequestHeader('Content-Type', 'application/json');
  
    xhr.onload = function() {
        const response = JSON.parse(xhr.responseText);
        document.getElementById('result').textContent = response.message;
        document.getElementById('reserveBtn').disabled = true;
        document.getElementById('reserveBtn').classList.add('hidden');
    };
  
    xhr.send(JSON.stringify({ arrivalDate, departureDate, roomType, guests, nombreHuesped, emailHuesped }));
  }
  