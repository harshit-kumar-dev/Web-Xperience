document.addEventListener("DOMContentLoaded", () => {
    // 0. Elements
    const welcomeScreen = document.querySelector(".welcome-screen");
    const welcomeTitle = document.querySelector(".welcome-title");
    const enterBtn = document.querySelector(".enter-btn");
    const sections = document.querySelectorAll(".section");
    const contents = document.querySelectorAll(".content");
    const clippedTexts = document.querySelectorAll(".clipped-text"); // Select clipped texts
    const navLeft = document.querySelector(".nav-left");
    const lines = document.querySelector(".overlay-lines");

    // Initial States
    gsap.set(sections, { autoAlpha: 0, scale: 1.1 });
    gsap.set(contents, { autoAlpha: 0, y: 30 });
    gsap.set(clippedTexts, { autoAlpha: 0, scale: 1.2 }); // Prepare clipped text
    gsap.set(navLeft, { autoAlpha: 0, x: -20 });

    // 1. Welcome Screen Animation
    const welcomeTl = gsap.timeline();
    welcomeTl.to(welcomeTitle, {
        duration: 1.5,
        autoAlpha: 1,
        y: 0,
        ease: "power3.out"
    })
        .to(enterBtn, {
            duration: 1,
            autoAlpha: 1,
            y: 0,
            ease: "power3.out"
        }, "-=0.5");

    // 2. Main Entrance Function
    const playMainEntrance = () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(sections, {
            duration: 1.5,
            autoAlpha: 1,
            scale: 1,
            stagger: 0.1,
            ease: "expo.out"
        })
            .to(contents, {
                duration: 1,
                autoAlpha: 1,
                y: 0,
                stagger: 0.1
            }, "-=1")
            .to(clippedTexts, { // Animate clipped texts
                duration: 1.5,
                autoAlpha: 1,
                scale: 1,
                ease: "power2.out"
            }, "-=1.5")
            .to(navLeft, {
                duration: 1,
                autoAlpha: 1,
                x: 0,
                ease: "power2.out"
            }, "-=1.5");
    };

    // 3. Interaction
    enterBtn.addEventListener("click", () => {
        // Fade out welcome
        gsap.to(welcomeScreen, {
            duration: 1,
            autoAlpha: 0,
            ease: "power2.inOut",
            onComplete: () => {
                welcomeScreen.classList.add("hidden");
                playMainEntrance();
            }
        });
    });

    // 2. Mouse Move Parallax (Subtle)
    // 2. Mouse Move Parallax (Subtle)
    document.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20; // -10 to 10
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        gsap.to(".image-wrapper", {
            duration: 1,
            x: x,
            y: y,
            ease: "power1.out"
        });

        // Text parallax removed as per user request
        /*
        gsap.to(contents, {
            duration: 1,
            x: x * 1.5, // Move text slightly faster for depth
            y: y * 1.5,
            ease: "power1.out"
        });
        */
    });

    // 3. Hover Interaction Specifics
    sections.forEach(section => {
        section.addEventListener("mouseenter", () => {
            // Optional: Bring the text into sharper focus or scale it
            const h2 = section.querySelector("h2");
            gsap.to(h2, {
                scale: 1.1,
                color: "#d4af37", // Gold accent
                duration: 0.3
            });
        });

        section.addEventListener("mouseleave", () => {
            const h2 = section.querySelector("h2");
            gsap.to(h2, {
                scale: 1,
                color: "#ffffff",
                duration: 0.3
            });
        });
    });
});
