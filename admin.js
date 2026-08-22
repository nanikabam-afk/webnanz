import {
    auth,
    db
} from "./firebase-config.js";


import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";


import {
    collection,
    query,
    orderBy,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";



/* =========================================
   STAFF ACCOUNT
========================================= */

const STAFF_UID =
    "Y0jb2iKrxKMxLbxq36nB72xLrcu2";



/* =========================================
   STATE
========================================= */

let allMessages = [];

let currentFilter = "inbox";

let selectedProjectId = null;

let stopListening = null;



/* =========================================
   DASHBOARD ELEMENTS
========================================= */

const messagesContainer =
    document.getElementById(
        "messagesContainer"
    );


const adminStatus =
    document.getElementById(
        "adminStatus"
    );


const totalMessages =
    document.getElementById(
        "totalMessages"
    );


const newMessages =
    document.getElementById(
        "newMessages"
    );


const activeProjects =
    document.getElementById(
        "activeProjects"
    );


const completedProjects =
    document.getElementById(
        "completedProjects"
    );


const inboxBadge =
    document.getElementById(
        "inboxBadge"
    );


const activeBadge =
    document.getElementById(
        "activeBadge"
    );


const completedBadge =
    document.getElementById(
        "completedBadge"
    );


const sectionTitle =
    document.getElementById(
        "sectionTitle"
    );


const logoutButton =
    document.getElementById(
        "logoutButton"
    );


const refreshMessages =
    document.getElementById(
        "refreshMessages"
    );


const navButtons =
    document.querySelectorAll(
        ".admin-nav-button"
    );



/* =========================================
   PROJECT PROFILE ELEMENTS
========================================= */

const projectProfileModal =
    document.getElementById(
        "projectProfileModal"
    );


const projectProfileBackdrop =
    document.getElementById(
        "projectProfileBackdrop"
    );


const projectProfileClose =
    document.getElementById(
        "projectProfileClose"
    );


const profileCustomerName =
    document.getElementById(
        "profileCustomerName"
    );


const profileService =
    document.getElementById(
        "profileService"
    );


const profileStatusBadge =
    document.getElementById(
        "profileStatusBadge"
    );


const profileEmail =
    document.getElementById(
        "profileEmail"
    );


const profilePhone =
    document.getElementById(
        "profilePhone"
    );


const profileBusiness =
    document.getElementById(
        "profileBusiness"
    );


const profilePreferredContact =
    document.getElementById(
        "profilePreferredContact"
    );


const profileBudget =
    document.getElementById(
        "profileBudget"
    );


const profileDate =
    document.getElementById(
        "profileDate"
    );


const profileMessage =
    document.getElementById(
        "profileMessage"
    );


const profileStatusSelect =
    document.getElementById(
        "profileStatusSelect"
    );


const profilePrivateNotes =
    document.getElementById(
        "profilePrivateNotes"
    );


const saveProfileNotes =
    document.getElementById(
        "saveProfileNotes"
    );


const profileNotesStatus =
    document.getElementById(
        "profileNotesStatus"
    );


const profileContactActions =
    document.getElementById(
        "profileContactActions"
    );


const profileDeleteButton =
    document.getElementById(
        "profileDeleteButton"
    );


const generateInvoiceButton =
    document.getElementById(
        "generateInvoiceButton"
    );



/* =========================================
   FINANCIAL ELEMENTS
========================================= */

const profileQuotedPrice =
    document.getElementById(
        "profileQuotedPrice"
    );


const profileDepositPaid =
    document.getElementById(
        "profileDepositPaid"
    );


const profileBalanceDue =
    document.getElementById(
        "profileBalanceDue"
    );


const profilePaymentStatus =
    document.getElementById(
        "profilePaymentStatus"
    );


const profileDeadline =
    document.getElementById(
        "profileDeadline"
    );


const profilePaymentNotes =
    document.getElementById(
        "profilePaymentNotes"
    );


const saveFinancialsButton =
    document.getElementById(
        "saveFinancialsButton"
    );


const financialStatus =
    document.getElementById(
        "financialStatus"
    );



/* =========================================
   AUTHENTICATION
========================================= */

onAuthStateChanged(

    auth,

    async (user) => {

        if (!user) {

            window.location.href =
                "staff-login.html";

            return;

        }


        if (
            user.uid !== STAFF_UID
        ) {

            await signOut(auth);

            window.location.href =
                "staff-login.html";

            return;

        }


        startLiveMessages();

    }

);



/* =========================================
   FIRESTORE LIVE DATABASE
========================================= */

function startLiveMessages() {

    adminStatus.textContent =
        "Connecting to customer database...";


    const messagesQuery =
        query(

            collection(
                db,
                "customerMessages"
            ),

            orderBy(
                "createdAt",
                "desc"
            )

        );


    if (stopListening) {

        stopListening();

    }


    stopListening =
        onSnapshot(

            messagesQuery,

            (snapshot) => {

                allMessages = [];


                snapshot.forEach(
                    (messageDocument) => {

                        allMessages.push({

                            id:
                                messageDocument.id,

                            ...messageDocument.data()

                        });

                    }
                );


                updateDashboardCounts();

                renderMessages();


                if (selectedProjectId) {

                    const updatedProject =
                        allMessages.find(
                            (project) =>
                                project.id ===
                                selectedProjectId
                        );


                    if (updatedProject) {

                        populateProjectProfile(
                            updatedProject
                        );

                    }

                }

            },


            (error) => {

                console.error(
                    "Firestore error:",
                    error
                );


                adminStatus.textContent =
                    "Unable to connect to customer database.";

            }

        );

}



/* =========================================
   DASHBOARD COUNTERS
========================================= */

function updateDashboardCounts() {

    const newCount =
        allMessages.filter(
            (message) =>

                !message.status ||

                message.status ===
                    "new"

        ).length;



    const activeCount =
        allMessages.filter(
            (message) =>

                message.status ===
                    "contacted"

                ||

                message.status ===
                    "in-progress"

        ).length;



    const completedCount =
        allMessages.filter(
            (message) =>

                message.status ===
                    "completed"

        ).length;



    totalMessages.textContent =
        allMessages.length;


    newMessages.textContent =
        newCount;


    activeProjects.textContent =
        activeCount;


    completedProjects.textContent =
        completedCount;


    inboxBadge.textContent =
        newCount;


    activeBadge.textContent =
        activeCount;


    completedBadge.textContent =
        completedCount;

}



/* =========================================
   ADMIN NAVIGATION
========================================= */

navButtons.forEach(

    (button) => {

        button.addEventListener(

            "click",

            () => {

                navButtons.forEach(

                    (navButton) => {

                        navButton.classList.remove(
                            "active"
                        );

                    }

                );


                button.classList.add(
                    "active"
                );


                currentFilter =
                    button.dataset.filter;


                updateSectionTitle();

                renderMessages();

            }

        );

    }

);



/* =========================================
   SECTION TITLES
========================================= */

function updateSectionTitle() {

    const titles = {

        inbox:
            "New Requests",

        active:
            "Active Projects",

        completed:
            "Completed Projects",

        all:
            "All Customer Requests"

    };


    sectionTitle.textContent =
        titles[currentFilter];

}



/* =========================================
   FILTER PROJECTS
========================================= */

function getFilteredMessages() {

    if (
        currentFilter ===
        "inbox"
    ) {

        return allMessages.filter(
            (message) =>

                !message.status ||

                message.status ===
                    "new"

        );

    }


    if (
        currentFilter ===
        "active"
    ) {

        return allMessages.filter(
            (message) =>

                message.status ===
                    "contacted"

                ||

                message.status ===
                    "in-progress"

        );

    }


    if (
        currentFilter ===
        "completed"
    ) {

        return allMessages.filter(
            (message) =>

                message.status ===
                    "completed"

        );

    }


    return allMessages;

}



/* =========================================
   DISPLAY PROJECTS
========================================= */

function renderMessages() {

    messagesContainer.innerHTML =
        "";


    const messages =
        getFilteredMessages();


    if (
        messages.length === 0
    ) {

        adminStatus.textContent =
            "No projects in this section.";

        return;

    }


    adminStatus.textContent =
        "";


    messages.forEach(

        (message) => {

            messagesContainer
                .appendChild(

                    createMessageCard(
                        message
                    )

                );

        }

    );

}



/* =========================================
   PROJECT CARD
========================================= */

function createMessageCard(
    data
) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "customer-message-card";


    const status =
        data.status ||
        "new";


    if (
        status === "new"
    ) {

        card.classList.add(
            "new-message"
        );

    }


    const dateText =
        getDateText(
            data
        );


    const quotedPrice =
        Number(
            data.quotedPrice
        ) || 0;


    const balanceDue =
        Number(
            data.balanceDue
        ) || 0;


    card.innerHTML = `

        <div class="message-card-header">

            <div>

                <span class="message-status">
                    ${formatStatus(status)}
                </span>


                <h3>
                    ${escapeHTML(
                        data.name ||
                        "Customer"
                    )}
                </h3>


                <p class="message-project-type">
                    ${escapeHTML(
                        data.projectType ||
                        "Project Request"
                    )}
                </p>

            </div>


            <span class="message-date">
                ${escapeHTML(
                    dateText
                )}
            </span>

        </div>


        <div class="customer-contact-grid">

            <div>

                <small>
                    Email
                </small>

                <span>
                    ${escapeHTML(
                        data.email ||
                        "Not provided"
                    )}
                </span>

            </div>


            <div>

                <small>
                    Phone
                </small>

                <span>
                    ${escapeHTML(
                        data.phone ||
                        "Not provided"
                    )}
                </span>

            </div>


            <div>

                <small>
                    Business
                </small>

                <span>
                    ${escapeHTML(
                        data.businessName ||
                        "Not provided"
                    )}
                </span>

            </div>


            <div>

                <small>
                    Customer Budget
                </small>

                <span>
                    ${escapeHTML(
                        data.budget ||
                        "Not specified"
                    )}
                </span>

            </div>


            ${
                quotedPrice > 0
                ? `

                    <div>

                        <small>
                            Quoted Price
                        </small>

                        <span>
                            ${formatMoney(
                                quotedPrice
                            )}
                        </span>

                    </div>

                `
                : ""
            }


            ${
                quotedPrice > 0
                ? `

                    <div>

                        <small>
                            Balance Due
                        </small>

                        <span>
                            ${formatMoney(
                                balanceDue
                            )}
                        </span>

                    </div>

                `
                : ""
            }

        </div>


        <button
            class="view-project-button"
        >
            VIEW PROJECT
        </button>

    `;



    const viewButton =
        card.querySelector(
            ".view-project-button"
        );


    viewButton.addEventListener(

        "click",

        () => {

            openProjectProfile(
                data.id
            );

        }

    );


    return card;

}



/* =========================================
   OPEN PROJECT PROFILE
========================================= */

function openProjectProfile(
    projectId
) {

    const project =
        allMessages.find(
            (item) =>
                item.id ===
                projectId
        );


    if (!project) {

        return;

    }


    selectedProjectId =
        projectId;


    populateProjectProfile(
        project
    );


    projectProfileModal
        .classList.add(
            "active"
        );


    document.body.style.overflow =
        "hidden";

}



/* =========================================
   POPULATE PROJECT PROFILE
========================================= */

function populateProjectProfile(
    project
) {

    const status =
        project.status ||
        "new";


    profileCustomerName.textContent =
        project.name ||
        "Customer";


    profileService.textContent =
        project.projectType ||
        "Project Request";


    profileStatusBadge.textContent =
        formatStatus(
            status
        );


    profileEmail.textContent =
        project.email ||
        "Not provided";


    profilePhone.textContent =
        project.phone ||
        "Not provided";


    profileBusiness.textContent =
        project.businessName ||
        "Not provided";


    profilePreferredContact.textContent =
        project.preferredContact ||
        "Not specified";


    profileBudget.textContent =
        project.budget ||
        "Not specified";


    profileDate.textContent =
        getDateText(
            project
        );


    profileMessage.textContent =
        project.message ||
        "";


    profileStatusSelect.value =
        status;


    profilePrivateNotes.value =
        project.privateNotes ||
        "";


    profileNotesStatus.textContent =
        "";


    profileQuotedPrice.value =
        project.quotedPrice ?? "";


    profileDepositPaid.value =
        project.depositPaid ?? "";


    profilePaymentStatus.value =
        project.paymentStatus ||
        "not-started";


    profileDeadline.value =
        project.deadline ||
        "";


    profilePaymentNotes.value =
        project.paymentNotes ||
        "";


    financialStatus.textContent =
        "";


    updateBalanceDue();


    buildContactButtons(
        project
    );

}



/* =========================================
   BALANCE CALCULATOR
========================================= */

function updateBalanceDue() {

    const quoted =
        Number(
            profileQuotedPrice.value
        ) || 0;


    const deposit =
        Number(
            profileDepositPaid.value
        ) || 0;


    const balance =
        Math.max(
            quoted - deposit,
            0
        );


    profileBalanceDue.value =
        balance.toFixed(2);

}



/* =========================================
   LIVE BALANCE UPDATE
========================================= */

profileQuotedPrice.addEventListener(

    "input",

    updateBalanceDue

);


profileDepositPaid.addEventListener(

    "input",

    updateBalanceDue

);



/* =========================================
   SAVE FINANCIALS
========================================= */

saveFinancialsButton.addEventListener(

    "click",

    async () => {

        if (
            !selectedProjectId
        ) {

            return;

        }


        financialStatus.textContent =
            "Saving...";


        try {

            await updateDoc(

                doc(
                    db,
                    "customerMessages",
                    selectedProjectId
                ),

                {

                    quotedPrice:
                        Number(
                            profileQuotedPrice.value
                        ) || 0,


                    depositPaid:
                        Number(
                            profileDepositPaid.value
                        ) || 0,


                    balanceDue:
                        Number(
                            profileBalanceDue.value
                        ) || 0,


                    paymentStatus:
                        profilePaymentStatus.value,


                    deadline:
                        profileDeadline.value,


                    paymentNotes:
                        profilePaymentNotes
                            .value
                            .trim()

                }

            );


            financialStatus.textContent =
                "✓ Saved";


            setTimeout(

                () => {

                    financialStatus.textContent =
                        "";

                },

                2000

            );


        } catch (error) {

            console.error(
                "Financial save error:",
                error
            );


            financialStatus.textContent =
                "Could not save.";

        }

    }

);



/* =========================================
   CONTACT BUTTONS
========================================= */

function buildContactButtons(
    project
) {

    profileContactActions.innerHTML =
        "";


    if (
        project.email
    ) {

        const email =
            document.createElement(
                "a"
            );


        email.className =
            "profile-contact-button";


        email.href =
            `mailto:${project.email}`;


        email.textContent =
            "EMAIL";


        profileContactActions
            .appendChild(
                email
            );

    }



    if (
        project.phone
    ) {

        const cleanPhone =
            project.phone.replace(
                /[^\d+]/g,
                ""
            );



        const call =
            document.createElement(
                "a"
            );


        call.className =
            "profile-contact-button";


        call.href =
            `tel:${cleanPhone}`;


        call.textContent =
            "CALL";


        profileContactActions
            .appendChild(
                call
            );



        const whatsapp =
            document.createElement(
                "a"
            );


        whatsapp.className =
            "profile-contact-button";


        whatsapp.href =
            `https://wa.me/${cleanPhone.replace(
                "+",
                ""
            )}`;


        whatsapp.target =
            "_blank";


        whatsapp.textContent =
            "WHATSAPP";


        profileContactActions
            .appendChild(
                whatsapp
            );

    }

}



/* =========================================
   UPDATE PROJECT STATUS
========================================= */

profileStatusSelect.addEventListener(

    "change",

    async () => {

        if (
            !selectedProjectId
        ) {

            return;

        }


        try {

            await updateDoc(

                doc(
                    db,
                    "customerMessages",
                    selectedProjectId
                ),

                {

                    status:
                        profileStatusSelect.value

                }

            );


        } catch (error) {

            console.error(
                "Status update error:",
                error
            );

        }

    }

);



/* =========================================
   SAVE PRIVATE NOTES
========================================= */

saveProfileNotes.addEventListener(

    "click",

    async () => {

        if (
            !selectedProjectId
        ) {

            return;

        }


        profileNotesStatus.textContent =
            "Saving...";


        try {

            await updateDoc(

                doc(
                    db,
                    "customerMessages",
                    selectedProjectId
                ),

                {

                    privateNotes:
                        profilePrivateNotes
                            .value
                            .trim()

                }

            );


            profileNotesStatus.textContent =
                "✓ Saved";


            setTimeout(

                () => {

                    profileNotesStatus.textContent =
                        "";

                },

                2000

            );


        } catch (error) {

            console.error(
                "Notes save error:",
                error
            );


            profileNotesStatus.textContent =
                "Could not save.";

        }

    }

);



/* =========================================
   GENERATE INVOICE
========================================= */

if (generateInvoiceButton) {

    generateInvoiceButton.addEventListener(

        "click",

        () => {

            if (
                !selectedProjectId
            ) {

                return;

            }


            window.open(
                `invoice.html?id=${selectedProjectId}`,
                "_blank"
            );

        }

    );

}



/* =========================================
   DELETE PROJECT
========================================= */

profileDeleteButton.addEventListener(

    "click",

    async () => {

        if (
            !selectedProjectId
        ) {

            return;

        }


        const confirmDelete =
            window.confirm(
                "Delete this project request permanently?"
            );


        if (
            !confirmDelete
        ) {

            return;

        }


        try {

            await deleteDoc(

                doc(
                    db,
                    "customerMessages",
                    selectedProjectId
                )

            );


            closeProjectProfile();


        } catch (error) {

            console.error(
                "Delete error:",
                error
            );

        }

    }

);



/* =========================================
   CLOSE PROJECT PROFILE
========================================= */

function closeProjectProfile() {

    projectProfileModal
        .classList.remove(
            "active"
        );


    selectedProjectId =
        null;


    document.body.style.overflow =
        "";

}



projectProfileClose.addEventListener(

    "click",

    closeProjectProfile

);



projectProfileBackdrop.addEventListener(

    "click",

    closeProjectProfile

);



/* =========================================
   DATE HELPER
========================================= */

function getDateText(
    data
) {

    if (
        data.createdAt &&
        data.createdAt.toDate
    ) {

        return data.createdAt
            .toDate()
            .toLocaleString();

    }


    return "Date unavailable";

}



/* =========================================
   STATUS HELPER
========================================= */

function formatStatus(
    status
) {

    if (
        status ===
        "in-progress"
    ) {

        return "IN PROGRESS";

    }


    return String(
        status
    )
        .replace(
            "-",
            " "
        )
        .toUpperCase();

}



/* =========================================
   MONEY HELPER
========================================= */

function formatMoney(
    amount
) {

    return Number(
        amount
    ).toLocaleString(

        "en-US",

        {

            style:
                "currency",

            currency:
                "USD"

        }

    );

}



/* =========================================
   HTML SECURITY HELPER
========================================= */

function escapeHTML(
    value
) {

    return String(
        value
    )

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}



/* =========================================
   LOGOUT
========================================= */

logoutButton.addEventListener(

    "click",

    async () => {

        if (
            stopListening
        ) {

            stopListening();

        }


        await signOut(
            auth
        );


        window.location.href =
            "staff-login.html";

    }

);



/* =========================================
   REFRESH
========================================= */

refreshMessages.addEventListener(

    "click",

    startLiveMessages

);



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

            closeProjectProfile();

        }

    }

);