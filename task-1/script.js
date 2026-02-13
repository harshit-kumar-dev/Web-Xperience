document.addEventListener("DOMContentLoaded", () => {
    // 1. Entrance Animation
    const sections = document.querySelectorAll(".section");
    const contents = document.querySelectorAll(".content");
    const lines = document.querySelector(".overlay-lines");

    gsap.set(sections, { autoAlpha: 0, scale: 1.1 });
    gsap.set(contents, { autoAlpha: 0, y: 30 });

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
        }, "-=1");

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
