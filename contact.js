import {
    db,
    collection,
    addDoc,
    serverTimestamp
} from "./firebase-config.js";


/* =========================================
   EMAILJS SETTINGS
========================================= */

const EMAILJS_SERVICE_ID =
    "service_2xc48c8";

const EMAILJS_ADMIN_TEMPLATE_ID =
    "template_hp14qic";

const EMAILJS_CUSTOMER_TEMPLATE_ID =
    "template_s69x9wc";


/* =========================================
   PAGE ELEMENTS
========================================= */

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

        sending:
            "Sending message...",

        success:
            "✓ Message sent successfully!",

        error:
            "Message could not be sent."

    },


    es: {

        sending:
            "Enviando mensaje...",

        success:
            "✓ ¡Mensaje enviado correctamente!",

        error:
            "No se pudo enviar el mensaje."

    }

};


/* =========================================
   CURRENT LANGUAGE
========================================= */

function getCurrentLanguage() {

    if (
        window.WebNanzLanguage &&
        window.WebNanzLanguage.getLanguage
    ) {

        return (
            window.WebNanzLanguage
                .getLanguage()
        );

    }

    return "en";

}


/* =========================================
   TRANSLATED STATUS MESSAGE
========================================= */

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

        console.error(
            "projectModal was not found."
        );

        return;

    }


    projectModal.classList.add(
        "active"
    );


    document.body.classList.add(
        "project-open"
    );


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


    projectModal.classList.remove(
        "active"
    );


    document.body.classList.remove(
        "project-open"
    );


    document.body.style.overflow =
        "";

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

}

else {

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

        if (
            event.key ===
            "Escape"
        ) {

            closeProjectForm();

        }

    }
);


/* =========================================
   SHORT WAIT
   EmailJS free plan rate protection
========================================= */

function wait(milliseconds) {

    return new Promise(
        (resolve) => {

            setTimeout(
                resolve,
                milliseconds
            );

        }
    );

}


/* =========================================
   SEND EMAILJS NOTIFICATIONS
========================================= */

async function sendEmailNotifications(
    customerData
) {

    if (!window.emailjs) {

        console.error(
            "EmailJS is not loaded."
        );

        return;

    }


    /* =====================================
       EMAIL TO WEBNANZ
    ===================================== */

    try {

        await window.emailjs.send(

            EMAILJS_SERVICE_ID,

            EMAILJS_ADMIN_TEMPLATE_ID,

            {

                customer_name:
                    customerData.name,

                customer_email:
                    customerData.email,

                customer_phone:
                    customerData.phone,

                business_name:
                    customerData.businessName,

                project_type:
                    customerData.projectType,

                budget:
                    customerData.budget,

                preferred_contact:
                    customerData.preferredContact,

                message:
                    customerData.message

            }

        );


        console.log(
            "WebNanz notification email sent."
        );

    }

    catch (error) {

        console.error(
            "WebNanz notification email error:",
            error
        );

    }


    /*
       Wait before sending the second email.
    */

    await wait(
        1200
    );


    /* =====================================
       CONFIRMATION EMAIL TO CUSTOMER
    ===================================== */

    try {

        await window.emailjs.send(

            EMAILJS_SERVICE_ID,

            EMAILJS_CUSTOMER_TEMPLATE_ID,

            {

                customer_name:
                    customerData.name,

                customer_email:
                    customerData.email,

                customer_phone:
                    customerData.phone,

                business_name:
                    customerData.businessName,

                project_type:
                    customerData.projectType,

                budget:
                    customerData.budget,

                preferred_contact:
                    customerData.preferredContact,

                message:
                    customerData.message

            }

        );


        console.log(
            "Customer confirmation email sent."
        );

    }

    catch (error) {

        console.error(
            "Customer confirmation email error:",
            error
        );

    }

}


/* =========================================
   SEND CUSTOMER MESSAGE
========================================= */

if (projectForm) {

    projectForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            /* =================================
               STATUS
            ================================= */

            if (formStatus) {

                formStatus.textContent =
                    getContactMessage(
                        "sending"
                    );

            }


            /* =================================
               COLLECT FORM INFORMATION
            ================================= */

            const customerData = {

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
                        .trim()

            };


            try {

                /* =================================
                   SAVE TO FIREBASE
                ================================= */

                await addDoc(

                    collection(
                        db,
                        "customerMessages"
                    ),

                    {

                        name:
                            customerData.name,

                        email:
                            customerData.email,

                        phone:
                            customerData.phone,

                        businessName:
                            customerData.businessName,

                        projectType:
                            customerData.projectType,

                        budget:
                            customerData.budget,

                        preferredContact:
                            customerData.preferredContact,

                        message:
                            customerData.message,

                        status:
                            "new",

                        createdAt:
                            serverTimestamp()

                    }

                );


                console.log(
                    "Project request saved to Firebase."
                );


                /* =================================
                   SEND EMAIL NOTIFICATIONS
                ================================= */

                await sendEmailNotifications(
                    customerData
                );


                /* =================================
                   SUCCESS MESSAGE
                ================================= */

                if (formStatus) {

                    formStatus.textContent =
                        getContactMessage(
                            "success"
                        );

                }


                /* =================================
                   CLEAR FORM
                ================================= */

                projectForm.reset();


                /* =================================
                   CLOSE AFTER SUCCESS
                ================================= */

                setTimeout(
                    () => {

                        closeProjectForm();


                        if (formStatus) {

                            formStatus.textContent =
                                "";

                        }

                    },

                    2000
                );


            }

            catch (error) {

                console.error(
                    "Message error:",
                    error
                );


                if (formStatus) {

                    formStatus.textContent =
                        getContactMessage(
                            "error"
                        );

                }

            }

        }
    );

}