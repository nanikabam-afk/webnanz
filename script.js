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

        en: {
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

        es: {
            title: "Diseño Web",
            text: "Creamos diseños de sitios web personalizados que representan tu marca, captan la atención y ayudan a que tu negocio tenga una presencia profesional.",
            features: [
                "Diseños personalizados enfocados primero en dispositivos móviles",
                "Diseño moderno y futurista",
                "Colores y estilo enfocados en tu marca",
                "Diseño adaptable para teléfonos, tabletas y computadoras",
                "Secciones interactivas y efectos visuales"
            ]
        }

    },

    "web-development": {

        en: {
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

        es: {
            title: "Desarrollo Web",
            text: "Convertimos los diseños en sitios web funcionales con botones reales, formularios, navegación, animaciones y herramientas para tu negocio.",
            features: [
                "Desarrollo con HTML, CSS y JavaScript",
                "Sitios web adaptables",
                "Funciones interactivas",
                "Formularios y acciones para usuarios",
                "Optimización del rendimiento"
            ]
        }

    },

    "ecommerce": {

        en: {
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

        es: {
            title: "Comercio Electrónico",
            text: "Creamos experiencias de compra en línea que facilitan a tus clientes explorar productos, realizar pedidos y pagar.",
            features: [
                "Catálogos de productos en línea",
                "Sistemas de carrito de compras",
                "Procesos de pago",
                "Integración de pasarelas de pago",
                "Optimización de compras desde dispositivos móviles"
            ]
        }

    },

    "mobile-experiences": {

        en: {
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

        es: {
            title: "Experiencias Móviles",
            text: "Diseñamos tu sitio web para que se sienta rápido, cómodo y natural desde un teléfono, donde muchos clientes interactúan por primera vez con tu negocio.",
            features: [
                "Diseño enfocado primero en móviles",
                "Botones fáciles de usar con pantalla táctil",
                "Navegación rápida",
                "Imágenes y diseños adaptables",
                "Experiencias web similares a una aplicación"
            ]
        }

    },

    "seo": {

        en: {
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

        es: {
            title: "SEO y Rendimiento",
            text: "Mejoramos el rendimiento de tu sitio web y organizamos su estructura para que los motores de búsqueda puedan comprender mejor tu contenido.",
            features: [
                "Estructura optimizada para motores de búsqueda",
                "Mejoras en la velocidad del sitio web",
                "Rendimiento en dispositivos móviles",
                "Optimización de metadatos",
                "Optimización de imágenes"
            ]
        }

    },

    "maintenance": {

        en: {
            title: "Maintenance & Support",
            text: "A website should keep working after launch. We can help maintain, improve, and update your digital presence.",
            features: [
                "Website updates",
                "Content changes",
                "Troubleshooting",
                "Performance monitoring",
                "Future feature additions"
            ]
        },

        es: {
            title: "Mantenimiento y Soporte",
            text: "Un sitio web debe continuar funcionando correctamente después de su lanzamiento. Podemos ayudarte a mantener, mejorar y actualizar tu presencia digital.",
            features: [
                "Actualizaciones del sitio web",
                "Cambios de contenido",
                "Solución de problemas",
                "Monitoreo del rendimiento",
                "Integración de nuevas funciones en el futuro"
            ]
        }

    }

};


const processInfo = {

    consult: {

        en: {
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

        es: {
            title: "01 // Consulta",
            text: "Comenzamos conociendo tu negocio, tu audiencia, tus ideas y lo que quieres lograr con tu sitio web.",
            features: [
                "Metas del negocio",
                "Requisitos del sitio web",
                "Audiencia objetivo",
                "Planificación de funciones",
                "Dirección visual"
            ]
        }

    },

    design: {

        en: {
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

        es: {
            title: "02 // Diseño",
            text: "Creamos la dirección visual y la experiencia del usuario para tu sitio web antes de comenzar el desarrollo completo.",
            features: [
                "Diseño de páginas",
                "Colores e identidad de marca",
                "Interfaz móvil",
                "Botones y navegación",
                "Experiencia visual"
            ]
        }

    },

    build: {

        en: {
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

        es: {
            title: "03 // Desarrollo",
            text: "Convertimos el diseño en un sitio web completamente funcional y conectamos todos los elementos interactivos.",
            features: [
                "Programación del sitio web",
                "Desarrollo adaptable",
                "Botones interactivos",
                "Formularios y funciones",
                "Pruebas"
            ]
        }

    },

    launch: {

        en: {
            title: "04 // Launch",
            text: "Once everything is tested and approved, your website is prepared to go live.",
            features: [
                "Final testing",
                "Mobile testing",
                "Domain connection",
                "Website publishing",
                "Launch support"
            ]
        },

        es: {
            title: "04 // Lanzamiento",
            text: "Una vez que todo esté probado y aprobado, preparamos tu sitio web para publicarlo.",
            features: [
                "Pruebas finales",
                "Pruebas en dispositivos móviles",
                "Conexión del dominio",
                "Publicación del sitio web",
                "Soporte durante el lanzamiento"
            ]
        }

    }

};


let currentPanelType = null;
let currentPanelKey = null;


function getCurrentLanguage() {

    if (
        window.WebNanzLanguage &&
        window.WebNanzLanguage.getLanguage
    ) {

        return window.WebNanzLanguage.getLanguage();

    }

    return "en";

}


function getTranslatedData(data) {

    const language =
        getCurrentLanguage();

    if (data[language]) {

        return data[language];

    }

    return data.en;

}


function openPanel(data) {

    if (!modal) {
        return;
    }

    const translatedData =
        getTranslatedData(data);

    modalTitle.textContent =
        translatedData.title;

    modalText.textContent =
        translatedData.text;

    modalFeatures.innerHTML = "";

    translatedData.features.forEach(
        (feature) => {

            const featureBox =
                document.createElement("div");

            featureBox.textContent =
                "✓ " + feature;

            modalFeatures.appendChild(
                featureBox
            );

        }
    );

    modal.classList.add("active");

    document.body.style.overflow =
        "hidden";

}


function refreshOpenPanel() {

    if (!modal) {
        return;
    }

    if (
        !modal.classList.contains("active")
    ) {
        return;
    }

    if (
        currentPanelType === "service" &&
        currentPanelKey
    ) {

        const data =
            serviceInfo[currentPanelKey];

        if (data) {
            openPanel(data);
        }

    }

    if (
        currentPanelType === "process" &&
        currentPanelKey
    ) {

        const data =
            processInfo[currentPanelKey];

        if (data) {
            openPanel(data);
        }

    }

}


function closePanel() {

    if (!modal) {
        return;
    }

    modal.classList.remove("active");

    document.body.style.overflow = "";

    currentPanelType = null;
    currentPanelKey = null;

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

                    currentPanelType =
                        "service";

                    currentPanelKey =
                        service;

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

                    currentPanelType =
                        "process";

                    currentPanelKey =
                        process;

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
   LANGUAGE CHANGE
========================================= */

window.addEventListener(
    "webnanz-language-change",
    () => {

        refreshOpenPanel();

    }
);


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