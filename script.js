document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     PERSONALIZAÇÃO DO NOME
  ========================================= */

  const welcomeScreen = document.getElementById("welcomeScreen");
  const nameForm = document.getElementById("nameForm");
  const visitorName = document.getElementById("visitorName");
  const personalGreeting = document.getElementById("personalGreeting");

  const savedName = localStorage.getItem("dentistaVisitorName");


  function setGreeting(name) {

    const cleanName = name.trim();

    if (!cleanName) {
      personalGreeting.textContent = "Olá!";
      return;
    }

    const formattedName =
      cleanName.charAt(0).toUpperCase() +
      cleanName.slice(1).toLowerCase();

    personalGreeting.textContent = `Olá, ${formattedName}!`;
  }


  if (savedName) {

    setGreeting(savedName);

    setTimeout(() => {
      welcomeScreen.classList.add("hide");
    }, 500);

  } else {

    setTimeout(() => {
      visitorName.focus();
    }, 700);

  }


  nameForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = visitorName.value.trim();

    if (!name) {
      visitorName.focus();
      return;
    }

    localStorage.setItem("dentistaVisitorName", name);

    setGreeting(name);

    welcomeScreen.classList.add("hide");

  });


  /* =========================================
     HEADER AO ROLAR
  ========================================= */

  const header = document.getElementById("header");

  function updateHeader() {

    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  }

  window.addEventListener("scroll", updateHeader);

  updateHeader();


  /* =========================================
     MENU MOBILE
  ========================================= */

  const menuButton = document.getElementById("menuButton");
  const nav = document.getElementById("nav");

  menuButton.addEventListener("click", () => {

    nav.classList.toggle("active");

  });


  document.querySelectorAll(".nav a").forEach((link) => {

    link.addEventListener("click", () => {

      nav.classList.remove("active");

    });

  });


  /* =========================================
     ANIMAÇÕES REVEAL
  ========================================= */

  const revealElements =
    document.querySelectorAll(".reveal");


  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("show");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );


  revealElements.forEach((element) => {

    revealObserver.observe(element);

  });


  /* =========================================
     FAQ
  ========================================= */

  const faqItems =
    document.querySelectorAll(".faq-item");


  faqItems.forEach((item) => {

    const question =
      item.querySelector(".faq-question");

    const answer =
      item.querySelector(".faq-answer");


    question.addEventListener("click", () => {

      const isActive =
        item.classList.contains("active");


      faqItems.forEach((otherItem) => {

        otherItem.classList.remove("active");

        otherItem.querySelector(
          ".faq-answer"
        ).style.maxHeight = null;

      });


      if (!isActive) {

        item.classList.add("active");

        answer.style.maxHeight =
          answer.scrollHeight + "px";

      }

    });

  });


  /* =========================================
     ANO AUTOMÁTICO
  ========================================= */

  const currentYear =
    document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent =
      new Date().getFullYear();
  }


  /* =========================================
     SMOOTH SCROLL
  ========================================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId =
        link.getAttribute("href");

      const target =
        document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* =========================================
     PARALLAX SUTIL NO HERO
  ========================================= */

  const doctorCard =
    document.querySelector(".doctor-card");


  window.addEventListener("scroll", () => {

    if (!doctorCard) return;

    if (window.innerWidth <= 950) return;

    const scroll =
      window.scrollY;

    if (scroll < 700) {

      doctorCard.style.transform =
        `translateY(${scroll * 0.035}px) rotate(2deg)`;

    }

  });

});
