document.addEventListener('DOMContentLoaded', () => {
  const backToHomeButton = document.getElementById('backToHome');

  // Remova a classe preload e adicione a classe fade-in
  document.body.classList.remove('preload');
  document.body.classList.add('fade-in');

  // Adiciona a classe de fade-out antes de mudar de página
  backToHomeButton.addEventListener('click', (event) => {
      event.preventDefault(); // Previna o comportamento padrão do link
      document.body.classList.add('fade-out');

      setTimeout(() => {
          window.location.href = backToHomeButton.href;
      }, 1400); // Tempo da animação em milissegundos
  });
});
  
  