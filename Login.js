var current = null;
debugger;
document.querySelector('#email').addEventListener('focus', function(e) {
  if (current) current.pause();
  current = anime({
    targets: 'path',
    strokeDashoffset: {
      value: 0,
      duration: 700,
      easing: 'easeOutQuart'
    },
    strokeDasharray: {
      value: '240 1386',
      duration: 700,
      easing: 'easeOutQuart'
    }
  });
});
document.querySelector('#password').addEventListener('focus', function(e) {
  if (current) current.pause();
  current = anime({
    targets: 'path',
    strokeDashoffset: {
      value: -336,
      duration: 700,
      easing: 'easeOutQuart'
    },
    strokeDasharray: {
      value: '240 1386',
      duration: 700,
      easing: 'easeOutQuart'
    }
  });
});
document.querySelector('#submit').addEventListener('focus', function(e) {
  if (current) current.pause();
  current = anime({
    targets: 'path',
    strokeDashoffset: {
      value: -730,
      duration: 700,
      easing: 'easeOutQuart'
    },
    strokeDasharray: {
      value: '530 1386',
      duration: 700,
      easing: 'easeOutQuart'
    }
  });
});
document.querySelector('#submit').addEventListener('click', async function (e) {
  e.preventDefault();

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  try {
    const response = await fetch('https://gestordecasos-edd6a5bma9dha5bv.canadacentral-01.azurewebsites.net/api/Usuarios/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: email,
        password: password
      })
    });

    if (!response.ok) {
      alert('Usuario o contraseña incorrectos');
      return;
    }

    const data = await response.json();
    const token = data.token;

    // Guardar el token en localStorage
    localStorage.setItem('token', token);

    // Redirigir a la página de crear caso
    window.location.href = 'CrearCaso.html';

  } catch (error) {
    console.error('Error al hacer login:', error);
    alert('Hubo un problema al intentar iniciar sesión.');
  }
});
