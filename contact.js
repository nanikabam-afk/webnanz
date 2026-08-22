import {
    db,
    collection,
    addDoc,
    serverTimestamp
} from "./firebase-config.js";


const projectModal =
    document.getElementById("projectModal");

const projectBackdrop =
    document.getElementById("projectBackdrop");

const projectClose =
    document.getElementById("projectClose");

const startProjectButton =
    document.getElementById("startProjectButton");

const messageButton =
    document.getElementById("messageButton");

const projectForm =
    document.getElementById("projectForm");

const formStatus =
    document.getElementById("formStatus");


/* =========================================
   LANGUAGE MESSAGES
========================================= */

const contactMessages = {

    en: {
        sending: "Sending message...",
        success: "✓ Message sent successfully!",
        error: "Message could not be sent."
    },

    es: {
        sending: "Enviando mensaje...",
        success: "✓ ¡Mensaje enviado correctamente!",
        error: "No se pudo enviar el mensaje."
    }

};


function getCurrentLanguage() {

    if (
        window.WebNanzLanguage &&
        window.WebNanzLanguage.getLanguage
    ) {

        return window.WebNanzLanguage.getLanguage();

    }

    return "en";

}


function getContactMessage(type) {

    const language =
        getCurrentLanguage();

    const messages =
        contactMessages[language] ||
        contactMessages.en;

    return messages[type];

}


/* =========================================
   OPEN PROJECT FORM
========================================= */

function openProjectForm() {

    if (!projectModal) {
        console.error("projectModal was not found.");
        return;
    }

    projectModal.classList.add("active");

    document.body.style.overflow =
        "hidden";
}


/* =========================================
   CLOSE PROJECT FORM
========================================= */

function closeProjectForm() {

    if (!projectModal) {
        return;
    }

    projectModal.classList.remove("active");

    document.body.style.overflow = "";
}


/* =========================================
   MAIN START PROJECT BUTTON
========================================= */

if (startProjectButton) {

    startProjectButton.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            openProjectForm();

        }
    );

} else {

    console.error(
        "START PROJECT button was not found."
    );

}


/* =========================================
   ENVELOPE / MESSAGE BUTTON
========================================= */

if (messageButton) {

    messageButton.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            openProjectForm();

        }
    );

}


/* =========================================
   CLOSE X
========================================= */

if (projectClose) {

    projectClose.addEventListener(
        "click",
        closeProjectForm
    );

}


/* =========================================
   CLICK OUTSIDE FORM
========================================= */

if (projectBackdrop) {

    projectBackdrop.addEventListener(
        "click",
        closeProjectForm
    );

}


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {
            closeProjectForm();
        }

    }
);


/* =========================================
   SEND CUSTOMER MESSAGE
========================================= */

if (projectForm) {

    projectForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            if (formStatus) {

                formStatus.textContent =
                    getContactMessage("sending");

            }


            try {

                await addDoc(
                    collection(
                        db,
                        "customerMessages"
                    ),
                    {

                        name:
                            document
                                .getElementById(
                                    "customerName"
                                )
                                .value
                                .trim(),

                        email:
                            document
                                .getElementById(
                                    "customerEmail"
                                )
                                .value
                                .trim(),

                        phone:
                            document
                                .getElementById(
                                    "customerPhone"
                                )
                                .value
                                .trim(),

                        businessName:
                            document
                                .getElementById(
                                    "businessName"
                                )
                                .value
                                .trim(),

                        projectType:
                            document
                                .getElementById(
                                    "projectType"
                                )
                                .value,

                        budget:
                            document
                                .getElementById(
                                    "budget"
                                )
                                .value,

                        preferredContact:
                            document
                                .getElementById(
                                    "preferredContact"
                                )
                                .value,

                        message:
                            document
                                .getElementById(
                                    "customerMessage"
                                )
                                .value
                                .trim(),

                        status: "new",

                        createdAt:
                            serverTimestamp()

                    }
                );


                if (formStatus) {

                    formStatus.textContent =
                        getContactMessage("success");

                }


                projectForm.reset();


                setTimeout(
                    () => {

                        closeProjectForm();

                        if (formStatus) {
                            formStatus.textContent = "";
                        }

                    },
                    2000
                );


            } catch (error) {

                console.error(
                    "Message error:",
                    error
                );


                if (formStatus) {

                    formStatus.textContent =
                        getContactMessage("error");

                }

            }

        }
    );

}