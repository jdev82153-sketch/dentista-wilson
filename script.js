document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       BOAS-VINDAS / NOME DO VISITANTE
       ===================================================== */

    const welcomeScreen =
        document.getElementById("welcomeScreen");

    const nameForm =
        document.getElementById("nameForm");

    const visitorName =
        document.getElementById("visitorName");

    const welcomeTitle =
        document.getElementById("welcomeTitle");

    const welcomeSubtitle =
        document.getElementById("welcomeSubtitle");

    const personalGreeting =
        document.getElementById("personalGreeting");


    /*
     * Se a pessoa já visitou o site antes,
     * usamos o nome salvo para não pedir novamente.
     */

    const savedName =
        localStorage.getItem("dentistaVisitorName");


    const finishWelcome = (name) => {

        const cleanName =
            name.trim()
                .replace(/\s+/g, " ")
                .slice(0, 30);


        if (!cleanName) {
            return;
        }


        localStorage.setItem(
            "dentistaVisitorName",
            cleanName
        );


        welcomeTitle.textContent =
            `Olá, ${cleanName}! 👋`;

        welcomeSubtitle.textContent =
            "Seja muito bem-vindo(a).";


        if (personalGreeting) {

            personalGreeting.textContent =
                `Olá, ${cleanName}. Seja bem-vindo(a).`;

        }


        setTimeout(() => {

            welcomeScreen.classList.add("hidden");

        }, 900);

    };


    /*
     * Caso já exista nome salvo,
     * mostramos uma saudação rápida.
     */

    if (savedName) {

        const cleanSavedName =
            savedName.trim();


        welcomeTitle.textContent =
            `Olá, ${cleanSavedName}! 👋`;

        welcomeSubtitle.textContent =
            "Que bom ter você por aqui.";

        personalGreeting.textContent =
            `Olá, ${cleanSavedName}. Seja bem-vindo(a).`;


        setTimeout(() => {

            welcomeScreen.classList.add("hidden");

        }, 1200);

    }


    if (nameForm) {

        nameForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                finishWelcome(
                    visitorName.value
                );

            }
        );

    }


    /* =====================================================
       HEADER AO ROLAR
       ===================================================== */

    const header =
        document.getElementById("header");


    const handleHeader = () => {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };


    window.addEventListener(
        "scroll",
        handleHeader
    );


    handleHeader();


    /* =====================================================
       MENU MOBILE
       ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const navMenu =
        document.getElementById("navMenu");


    if (menuToggle && navMenu) {

        menuToggle.addEventListener(
            "click",
            () => {

                const active =
                    navMenu.classList.toggle("active");


                menuToggle.setAttribute(
                    "aria-expanded",
                    active ? "true" : "false"
                );

            }
        );


        const navLinks =
            navMenu.querySelectorAll("a");


        navLinks.forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navMenu.classList.remove(
                        "active"
                    );


                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });

    }


    /* =====================================================
       FADE-IN / REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       FAQ
       ===================================================== */

    const faqItems =
        document.querySelectorAll(".faq-item");


    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");

        const answer =
            item.querySelector(".faq-answer");


        question.addEventListener(
            "click",
            () => {

                const isActive =
                    item.classList.contains("active");


                faqItems.forEach(otherItem => {

                    otherItem.classList.remove(
                        "active"
                    );


                    const otherAnswer =
                        otherItem.querySelector(
                            ".faq-answer"
                        );


                    otherAnswer.style.maxHeight =
                        null;

                });


                if (!isActive) {

                    item.classList.add("active");

                    answer.style.maxHeight =
                        answer.scrollHeight + "px";

                }

            }
        );

    });


    /* =====================================================
       ANO AUTOMÁTICO
       ===================================================== */

    const currentYear =
        document.getElementById("currentYear");


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#" ||
                    targetId.length < 2
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });


    /* =====================================================
       PARALLAX SUTIL
       ===================================================== */

    const heroBackground =
        document.querySelector(
            ".hero-background"
        );


    if (heroBackground) {

        window.addEventListener(
            "scroll",
            () => {

                const scroll =
                    window.scrollY;


                if (scroll < 800) {

                    heroBackground.style.transform =
                        `translateY(${scroll * 0.12}px)`;

                }

            },
            {
                passive: true
            }
        );

    }

});
