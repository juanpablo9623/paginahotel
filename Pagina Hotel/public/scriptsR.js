document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const message = document.getElementById('message');

  // Manejar el registro de usuario
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre = document.getElementById('nombre').value;
      const cedula = document.getElementById('cedula').value;
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const email = document.getElementById('email').value;

      fetch('http://localhost:3007/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, cedula, username, password, email })
      })
        .then(response => response.json())
        .then(data => {
          message.textContent = data.message || data.error;
        })
        .catch(error => {
          message.textContent = 'Error de servidor';
        });
    });
  }
});
