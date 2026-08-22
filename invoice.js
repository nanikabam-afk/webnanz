import {
    auth,
    db
} from "./firebase-config.js";


import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";


import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


const STAFF_UID =
    "Y0jb2iKrxKMxLbxq36nB72xLrcu2";


const loadingMessage =
    document.getElementById(
        "loadingMessage"
    );


const invoiceDocument =
    document.getElementById(
        "invoiceDocument"
    );


const printInvoiceButton =
    document.getElementById(
        "printInvoiceButton"
    );


const urlParameters =
    new URLSearchParams(
        window.location.search
    );


const projectId =
    urlParameters.get(
        "id"
    );


onAuthStateChanged(
    auth,
    async (user) => {

        if (!user) {

            window.location.href =
                "staff-login.html";

            return;
        }


        if (
            user.uid !==
            STAFF_UID
        ) {

            await signOut(auth);

            window.location.href =
                "staff-login.html";

            return;
        }


        if (!projectId) {

            loadingMessage.textContent =
                "No project was selected.";

            return;
        }


        loadInvoice();

    }
);


async function loadInvoice() {

    try {

        const projectReference =
            doc(
                db,
                "customerMessages",
                projectId
            );


        const projectSnapshot =
            await getDoc(
                projectReference
            );


        if (
            !projectSnapshot.exists()
        ) {

            loadingMessage.textContent =
                "Project not found.";

            return;
        }


        const project =
            projectSnapshot.data();


        populateInvoice(
            project
        );


        loadingMessage.hidden =
            true;


        invoiceDocument.hidden =
            false;


    } catch (error) {

        console.error(error);


        loadingMessage.textContent =
            "Unable to load invoice.";

    }

}


function populateInvoice(
    project
) {

    const quotedPrice =
        Number(
            project.quotedPrice
        ) || 0;


    const depositPaid =
        Number(
            project.depositPaid
        ) || 0;


    const balanceDue =
        Math.max(
            quotedPrice -
            depositPaid,
            0
        );


    document
        .getElementById(
            "invoiceNumber"
        )
        .textContent =
            generateInvoiceNumber();


    document
        .getElementById(
            "invoiceCustomerName"
        )
        .textContent =
            project.name ||
            "Customer";


    document
        .getElementById(
            "invoiceBusiness"
        )
        .textContent =
            project.businessName ||
            "";


    document
        .getElementById(
            "invoiceEmail"
        )
        .textContent =
            project.email ||
            "";


    document
        .getElementById(
            "invoicePhone"
        )
        .textContent =
            project.phone ||
            "";


    document
        .getElementById(
            "invoiceProjectType"
        )
        .textContent =
            project.projectType ||
            "WebNanz Project";


    document
        .getElementById(
            "invoiceDate"
        )
        .textContent =
            getProjectDate(
                project
            );


    document
        .getElementById(
            "invoiceDeadline"
        )
        .textContent =
            formatDeadline(
                project.deadline
            );


    document
        .getElementById(
            "invoicePaymentStatus"
        )
        .textContent =
            formatPaymentStatus(
                project.paymentStatus
            );


    document
        .getElementById(
            "invoiceProjectDescription"
        )
        .textContent =
            project.message ||
            "WebNanz website project.";


    document
        .getElementById(
            "invoiceQuotedPrice"
        )
        .textContent =
            formatMoney(
                quotedPrice
            );


    document
        .getElementById(
            "invoiceDeposit"
        )
        .textContent =
            formatMoney(
                depositPaid
            );


    document
        .getElementById(
            "invoiceTotal"
        )
        .textContent =
            formatMoney(
                quotedPrice
            );


    document
        .getElementById(
            "invoicePaid"
        )
        .textContent =
            formatMoney(
                depositPaid
            );


    document
        .getElementById(
            "invoiceBalance"
        )
        .textContent =
            formatMoney(
                balanceDue
            );


    const paymentNotes =
        project.paymentNotes ||
        "";


    document
        .getElementById(
            "invoicePaymentNotes"
        )
        .textContent =
            paymentNotes;


    if (!paymentNotes) {

        document
            .getElementById(
                "invoiceNotesSection"
            )
            .style.display =
                "none";

    }

}


function generateInvoiceNumber() {

    const today =
        new Date();


    const year =
        today
            .getFullYear();


    const month =
        String(
            today.getMonth() + 1
        )
        .padStart(
            2,
            "0"
        );


    const day =
        String(
            today.getDate()
        )
        .padStart(
            2,
            "0"
        );


    const projectCode =
        projectId
            .substring(
                0,
                6
            )
            .toUpperCase();


    return `WN-${year}${month}${day}-${projectCode}`;

}


function formatMoney(
    amount
) {

    return Number(
        amount
    )
    .toLocaleString(
        "en-US",
        {
            style:
                "currency",

            currency:
                "USD"
        }
    );

}


function getProjectDate(
    project
) {

    if (
        project.createdAt &&
        project.createdAt.toDate
    ) {

        return project.createdAt
            .toDate()
            .toLocaleDateString();

    }


    return new Date()
        .toLocaleDateString();

}


function formatDeadline(
    deadline
) {

    if (!deadline) {

        return "Not set";

    }


    const parts =
        deadline.split(
            "-"
        );


    if (
        parts.length !== 3
    ) {

        return deadline;

    }


    return `${parts[1]}/${parts[2]}/${parts[0]}`;

}


function formatPaymentStatus(
    status
) {

    const names = {

        "not-started":
            "Not Started",

        "deposit-paid":
            "Deposit Paid",

        "partial":
            "Partial Payment",

        "paid":
            "Paid in Full"

    };


    return names[status] ||
        "Not Started";

}


printInvoiceButton.addEventListener(
    "click",
    () => {

        window.print();

    }
);