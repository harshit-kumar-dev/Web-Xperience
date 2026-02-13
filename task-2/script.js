/* ========================================
   FORGE - THE BLUEPRINT
   GSAP Animations: Construction & Sketch
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // 0. Navbar Border Draw
    gsap.from(".navbar", {
        duration: 1.5,
        width: "0%",
        ease: "power2.out",
        delay: 0.5
    });

    // 1. Hero Construction
    const heroTl = gsap.timeline();

    // Draw the graphic blocks
    heroTl.from(".red-block", { duration: 0.8, scaleY: 0, transformOrigin: "top", ease: "power4.out" })
        .from(".blue-block", { duration: 1, rotation: 180, opacity: 0, ease: "back.out(1.7)" }, "-=0.5")
        .from(".yellow-block", { duration: 0.6, scale: 0, ease: "elastic.out(1, 0.5)" }, "-=0.8")
        .from(".hero-content", { duration: 1, y: 50, opacity: 0, ease: "power2.out" }, "-=0.4")
        .from(".sketch-line-1", { duration: 1.5, width: "0%", ease: "power2.inOut" }, "-=1");

    // 2. Product Cards (Blueprint Reveal)
    gsap.utils.toArray(".product-card").forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            duration: 0.8,
            y: 30,
            opacity: 0,
            boxShadow: "0px 0px 0px transparent",
            delay: i * 0.1,
            ease: "power2.out"
        });
    });

    // 3. Categories (Slide In)
    gsap.utils.toArray(".category-card").forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: ".categories-grid",
                start: "top 80%"
            },
            duration: 0.8,
            height: 0,
            transformOrigin: "top",
            stagger: 0.1,
            ease: "power3.inOut"
        });
    });

    // 4. CTA (Danger/Action Zone)
    gsap.from(".cta-content", {
        scrollTrigger: {
            trigger: ".cta",
            start: "top 70%"
        },
        duration: 1,
        scale: 0.8,
        opacity: 0,
        ease: "elastic.out(1, 0.75)"
    });

    // 5. Parallax for Geometric Shapes
    gsap.to(".red-block", {
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        },
        y: -100
    });

    gsap.to(".blue-block", {
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 2
        },
        rotation: 45
    });

    // Mobile Menu
    const hamburger = document.getElementById("nav-hamburger");
    const mobileMenu = document.getElementById("mobile-menu");
    hamburger.addEventListener("click", () => {
        const isOpen = mobileMenu.style.display === "flex";
        mobileMenu.style.display = isOpen ? "none" : "flex";
    });

    // 6. Custom Cursor
    const cursor = document.querySelector(".custom-cursor");

    document.addEventListener("mousemove", (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    // Cursor Effects on Hover
    const hoverTargets = document.querySelectorAll("a, button, .product-card, .category-card");

    hoverTargets.forEach(target => {
        target.addEventListener("mouseenter", () => {
            gsap.to(cursor, { scale: 2, backgroundColor: "rgba(209, 46, 46, 0.1)", duration: 0.3 });
        });
        target.addEventListener("mouseleave", () => {
            gsap.to(cursor, { scale: 1, backgroundColor: "transparent", duration: 0.3 });
        });
    });

    // 7. Text Scramble Effect (Cyberpunk/Blueprint Data)
    const scrambleElements = document.querySelectorAll(".hero-title, .section-title, h3");
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_//";

    scrambleElements.forEach(element => {
        element.dataset.value = element.innerText; // Store original text
        element.classList.add("scramble-hover");

        element.addEventListener("mouseenter", event => {
            let iterations = 0;
            const interval = setInterval(() => {
                event.target.innerText = event.target.innerText
                    .split("")
                    .map((letter, index) => {
                        if (index < iterations) {
                            return event.target.dataset.value[index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("");

                if (iterations >= event.target.dataset.value.length) {
                    clearInterval(interval);
                }

                iterations += 1 / 3;
            }, 30);
        });
    });
});
