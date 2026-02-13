/* =========================================
   AURA PRO - 3D Scroll Logic
   Uses GSAP to animate CSS 3D Transforms
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const loader = document.getElementById("loader");
    const led = document.querySelector(".led-light");

    // Hide loader
    setTimeout(() => {
        loader.style.opacity = 0;
        loader.style.pointerEvents = "none";
        // Turn on LED
        led.classList.add("active");
    }, 1000);

    // === MAIN 3D TIMELINE ===
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".scroll-container",
            start: "top top",
            end: "bottom bottom",
            scrub: 1, // Smooth scrolling
        }
    });

    // --- PHASE 1: ROTATE CASE TO FRONT ---
    // From initial angled view to flat front view
    tl.to(".case-group", {
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        duration: 2,
        ease: "power1.inOut"
    }, "start");

    // Fade in intro text manually if needed, or let scrollTrigger handle it via opacity
    tl.to(".intro .content-wrapper", { opacity: 1, y: 0, duration: 1 }, "start");
    tl.to(".intro .content-wrapper", { opacity: 0, y: -50, duration: 1 }, "mid-start");


    // --- PHASE 2: OPEN LID ---
    // Triggered around section 2
    tl.to(".case-lid", {
        rotationX: -100, // Open 100 degrees
        duration: 2,
        ease: "power2.inOut"
    }, "open");

    // Tilt case slightly up to see inside
    tl.to(".case-group", {
        rotationX: 20,
        duration: 2,
    }, "open");

    // Reveal Section 2 Text
    tl.to(".open-trigger .content-wrapper", { opacity: 1, y: 0, duration: 1 }, "open+=0.5");
    tl.to(".open-trigger .content-wrapper", { opacity: 0, y: -50, duration: 1 }, "open-end");


    // --- PHASE 3: REVEAL BUDS (FLOAT OUT) ---
    // Move earbuds up out of the wells
    tl.to(".bud", {
        y: -120,
        z: 50,
        duration: 2,
        ease: "back.out(1.2)"
    }, "reveal");

    // Reveal Section 3 Text
    tl.to(".reveal-trigger .content-wrapper", { opacity: 1, y: 0, duration: 1 }, "reveal+=0.5");
    tl.to(".reveal-trigger .content-wrapper", { opacity: 0, y: -50, duration: 1 }, "reveal-end");


    // --- PHASE 4: SEPARATION (IMMERSION) ---
    // Rotate and separate buds
    tl.to(".bud-left", {
        x: -40,
        rotationY: -30,
        rotationZ: -10,
        duration: 2
    }, "immersion");

    tl.to(".bud-right", {
        x: 40,
        rotationY: 30,
        rotationZ: 10,
        duration: 2
    }, "immersion");

    tl.to(".case-group", {
        scale: 1.2,
        y: 50,
        duration: 2
    }, "immersion");

    // Reveal Final Text
    tl.to(".immersion-trigger .content-wrapper", { opacity: 1, y: 0, duration: 1 }, "immersion+=1");

});
