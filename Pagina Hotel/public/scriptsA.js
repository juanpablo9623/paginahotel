document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const logoutButton = document.getElementById('logoutButton');
  const message = document.getElementById('message');

  // Manejar inicio de sesión
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      fetch('http://localhost:3007/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.message === 'Inicio de sesión exitoso, continúe por favor') {
            console.log("redireccionando");
            window.location.href = '/views/reserva.html';
          } else {
            message.textContent = data.message || 'Error de autenticación';
          }
        })
        .catch(error => {
          message.textContent = 'Error de servidor';
        });
    });
  }

  // Manejar cierre de sesión
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      fetch('http://localhost:3007/users/logout', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
          alert(data.message);
          window.location.href = '/views/index.html';
        });
    });
  }
});
