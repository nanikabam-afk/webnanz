import {
    auth
} from "./firebase-config.js";

import {
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";


const STAFF_UID = "Y0jb2iKrxKMxLbxq36nB72xLrcu2";

const loginForm =
    document.getElementById("staffLoginForm");

const emailInput =
    document.getElementById("staffEmail");

const passwordInput =
    document.getElementById("staffPassword");

const statusMessage =
    document.getElementById("staffLoginStatus");


onAuthStateChanged(auth, (user) => {

    if (user && user.uid === STAFF_UID) {
        window.location.href = "admin.html";
    }

});


loginForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        statusMessage.textContent =
            "Authenticating...";

        try {

            const credential =
                await signInWithEmailAndPassword(
                    auth,
                    emailInput.value.trim(),
                    passwordInput.value
                );

            if (
                credential.user.uid !== STAFF_UID
            ) {

                await auth.signOut();

                statusMessage.textContent =
                    "Access denied.";

                return;
            }

            statusMessage.textContent =
                "Access granted.";

            window.location.href =
                "admin.html";


        } catch (error) {

            console.error(error);

            statusMessage.textContent =
                "Invalid email or password.";

        }

    }
);