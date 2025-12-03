document.addEventListener("DOMContentLoaded", () => {
  const CLOSE_BTN = document.querySelector("#closeBtn");
  const LINKS = document.querySelectorAll("a");

  CLOSE_BTN.addEventListener("click", () => {
    if (
      window.electronAPI &&
      typeof window.electronAPI.closeWindow === "function"
    ) {
      window.electronAPI.closeWindow();
    } else {
      window.close();
    }
  });

  let DEG = 135;
  function animateBackground() {
    if (DEG >= 360) {
      DEG = 0;
    } else {
      DEG += 0.25;
    }
    document.querySelector(".about-window").style.backgroundImage =
      `linear-gradient(${DEG}deg, rgb(58, 37, 97), rgb(25, 22, 32)`;

    // Запрашиваем следующий кадр анимации
    requestAnimationFrame(animateBackground);
  }

  // Начинаем анимацию
  animateBackground();

  LINKS.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.electronAPI.openLink(e.target.href);
    });
  });
});
