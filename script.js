const modal = document.getElementById("infoModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const closeModal = document.getElementById("closeModal");

const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalFeatures = document.getElementById("modalFeatures");
const modalProjectButton = document.getElementById("modalProjectButton");

const projectModal = document.getElementById("projectModal");


const serviceInfo = {

    "web-design": {
        title: "Web Design",
        text: "We create custom website designs that match your brand, attract attention, and make your business feel professional.",
        features: [
            "Custom mobile-first layouts",
            "Modern futuristic design",
            "Brand-focused colors and style",
            "Responsive design for phones, tablets, and computers",
            "Interactive sections and visual effects"
        ]
    },

    "web-development": {
        title: "Web Development",
        text: "We turn designs into working websites with real buttons, forms, navigation, animations, and business functionality.",
        features: [
            "HTML, CSS, and JavaScript development",
            "Responsive website builds",
            "Interactive features",
            "Forms and user actions",
            "Performance optimization"
        ]
    },

    "ecommerce": {
        title: "E-Commerce",
        text: "We build online shopping experiences that make it easier for customers to browse products, order, and pay.",
        features: [
            "Online product catalogs",
            "Shopping cart systems",
            "Checkout experiences",
            "Payment gateway integration",
            "Mobile shopping optimization"
        ]
    },

    "mobile-experiences": {
        title: "Mobile Experiences",
        text: "Your website is designed to feel smooth and natural on a phone, where many customers interact with your business first.",
        features: [
            "Mobile-first design",
            "Touch-friendly buttons",
            "Fast navigation",
            "Responsive images and layouts",
            "App-like website experiences"
        ]
    },

    "seo": {
        title: "SEO & Performance",
        text: "We improve how your website performs and structure it so search engines can better understand your content.",
        features: [
            "Search-friendly page structure",
            "Website speed improvements",
            "Mobile performance",
            "Metadata optimization",
            "Image optimization"
        ]
    },

    "maintenance": {
        title: "Maintenance & Support",
        text: "A website should keep working after launch. We can help maintain, improve, and update your digital presence.",
        features: [
            "Website updates",
            "Content changes",
            "Troubleshooting",
            "Performance monitoring",
            "Future feature additions"
        ]
    }

};


const processInfo = {

    consult: {
        title: "01 // Consult",
        text: "We start by learning about your business, your audience, your ideas, and what you want the website to accomplish.",
        features: [
            "Business goals",
            "Website requirements",
            "Target audience",
            "Feature planning",
            "Visual direction"
        ]
    },

    design: {
        title: "02 // Design",
        text: "We create the visual direction and user experience for your website before moving into the full build.",
        features: [
            "Page layout",
            "Colors and branding",
            "Mobile interface",
            "Buttons and navigation",
            "Visual experience"
        ]
    },

    build: {
        title: "03 // Build",
        text: "We turn the design into a real functioning website and connect the interactive pieces.",
        features: [
            "Website coding",
            "Responsive development",
            "Interactive buttons",
            "Forms and features",
            "Testing"
        ]
    },

    launch: {
        title: "04 // Launch",
        text: "Once everything is tested and approved, your website is prepared to go live.",
        features: [
            "Final testing",
            "Mobile testing",
            "Domain connection",
            "Website publishing",
            "Launch support"
        ]
    }

};


function openPanel(data) {

    if (!modal) {
        return;
    }

    modalTitle.textContent = data.title;
    modalText.textContent = data.text;

    modalFeatures.innerHTML = "";

    data.features.forEach((feature) => {

        const featureBox =
            document.createElement("div");

        featureBox.textContent =
            "✓ " + feature;

        modalFeatures.appendChild(featureBox);

    });

    modal.classList.add("active");

    document.body.style.overflow =
        "hidden";

}


function closePanel() {

    if (!modal) {
        return;
    }

    modal.classList.remove("active");

    document.body.style.overflow = "";

}


function openProjectForm() {

    if (!projectModal) {
        return;
    }

    projectModal.classList.add("active");

    document.body.style.overflow =
        "hidden";

}


/* =========================================
   SERVICE BUTTONS
========================================= */

document
    .querySelectorAll("[data-service]")
    .forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const service =
                    button.dataset.service;

                const data =
                    serviceInfo[service];

                if (data) {
                    openPanel(data);
                }

            }
        );

    });


/* =========================================
   PROCESS BUTTONS
========================================= */

document
    .querySelectorAll("[data-process]")
    .forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const process =
                    button.dataset.process;

                const data =
                    processInfo[process];

                if (data) {
                    openPanel(data);
                }

            }
        );

    });


/* =========================================
   START PROJECT INSIDE SERVICE POPUP
========================================= */

if (modalProjectButton) {

    modalProjectButton.addEventListener(
        "click",
        () => {

            closePanel();

            openProjectForm();

        }
    );

}


/* =========================================
   CLOSE INFORMATION POPUP
========================================= */

if (closeModal) {

    closeModal.addEventListener(
        "click",
        closePanel
    );

}


if (modalBackdrop) {

    modalBackdrop.addEventListener(
        "click",
        closePanel
    );

}


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            closePanel();

        }

    }
);