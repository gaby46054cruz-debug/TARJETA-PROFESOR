document.addEventListener('DOMContentLoaded', () => {
  // Secuencia de mensajes completa
  const messages = [
    "¡Feliz Día del Profesor! 💡",
    "A quienes forman a los futuros profesionales de la ciencia y la tecnología.",
    "A nuestros docentes de Computación y redes, que interconectan ideas y abren nuevos caminos. 🌐",
    "A nuestros docentes de automatización y robótica industrial, que dan vida al diseño, la automatización y el futuro. ⚙️🤖",
    "Gracias por guiar cada proyecto con dedicación, paciencia y verdadera pasión.",
    "Su enseñanza trasciende las aulas y deja una huella imborrable en todos nosotros. ✨",
    "¡Gracias por todo lo que nos brindan día a día! ¡Feliz Día del Profesor a todos!"
  ];

  const typedTextElement = document.getElementById('typedText');
  const progressBar = document.getElementById('progressBar');
  const cursorElement = document.getElementById('cursor');
  
  const totalDuration = 28000; // 28 segundos aprox. para dar lectura pausada
  let currentMessageIndex = 0;
  let charIndex = 0;
  const typingSpeed = 45; // Velocidad de escritura más pausada
  const startTime = Date.now();

  // Actualización de la barra de progreso
  function updateProgress() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min((elapsed / totalDuration) * 100, 100);
    progressBar.style.width = `${progress}%`;

    if (elapsed < totalDuration) {
      requestAnimationFrame(updateProgress);
    } else {
      progressBar.style.width = '100%';
    }
  }

  // Animación de escritura
  function typeMessage() {
    const currentMessage = messages[currentMessageIndex];
    const isLastMessage = currentMessageIndex === messages.length - 1;

    if (charIndex < currentMessage.length) {
      typedTextElement.textContent += currentMessage.charAt(charIndex);
      charIndex++;
      setTimeout(typeMessage, typingSpeed);
    } else {
      // Si es el último mensaje, NO se borra y queda fijo
      if (isLastMessage) {
        typedTextElement.classList.add('final-highlight');
        // Ocultar el cursor para dar un acabado limpio
        setTimeout(() => {
          cursorElement.style.display = 'none';
        }, 1500);
        return; 
      }

      // Tiempo de pausa de lectura antes de pasar al siguiente mensaje
      const displayTime = Math.max(2200, currentMessage.length * 40);
      setTimeout(eraseMessage, displayTime);
    }
  }

  // Transición para cambiar de mensaje
  function eraseMessage() {
    typedTextElement.classList.add('fade-out');

    setTimeout(() => {
      typedTextElement.textContent = '';
      typedTextElement.classList.remove('fade-out');
      charIndex = 0;
      currentMessageIndex++;

      if (currentMessageIndex < messages.length) {
        typeMessage();
      }
    }, 500);
  }

  // Iniciar presentación
  requestAnimationFrame(updateProgress);
  typeMessage();
});
