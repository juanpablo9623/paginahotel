const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");
menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");
  const isOpen = navLinks.classList.contains("open");
  
  menuBtnIcon.style.transform = isOpen ? "rotate(90deg)" : "rotate(0deg)";
  setTimeout(() => {
    menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
  }, 300);
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
  menuBtnIcon.style.transform = "rotate(0deg)";
});

#ScrollReveal
const scrollRevealOption = {
  distance: "50px",
  origin: "bottom", // Puede variar por sección
  duration: 1000,
  easing: "ease-out", // Añadí un efecto de easing más suave
  scale: 1, // No cambiar el tamaño, pero se puede experimentar con valores diferentes
  reset: true, // Permite que las animaciones se reproduzcan cada vez que se vea el elemento
};

##edicion de revelacion seccion
ScrollReveal().reveal(".header__container .section__subheader", {
  ...scrollRevealOption,
  origin: "left", // Viene desde la izquierda
  distance: "80px",
});

ScrollReveal().reveal(".header__container h1", {
  ...scrollRevealOption,
  origin: "right",##derecha
  distance: "100px",
  easing: "ease-in-out", // Un easing más lento para el título
});

ScrollReveal().reveal(".header__container .btn", {
  ...scrollRevealOption,
  delay: 1000,
  scale: 1.1, // Efecto de escala para la revelación del botón
  easing: "cubic-bezier(0.68, -0.55, 0.27, 1.55)", // Añadí una animación elástica para hacerla más dinámica
});

// Tarjetas de habitaciones (room__card)
ScrollReveal().reveal(".room__card", {
  ...scrollRevealOption,
  origin: "top", // Viene desde arriba
  distance: "50px",
  interval: 300, // Reducí el intervalo para hacer las revelaciones más rápidas
  scale: 1.05, // Pequeña escala para dar efecto de entrada
});

// Tarjetas de características (feature__card)
ScrollReveal().reveal(".feature__card", {
  ...scrollRevealOption,
  origin: "bottom", // Mantengo la entrada desde abajo
  interval: 400,
  scale: 1.02, // Ligero aumento en escala
  distance: "60px",
});

// Tarjetas de noticias (news__card)
ScrollReveal().reveal(".news__card", {
  ...scrollRevealOption,
  origin: "left", // Viene desde la izquierda
  interval: 500,
  scale: 1.03,
  distance: "70px",
});
