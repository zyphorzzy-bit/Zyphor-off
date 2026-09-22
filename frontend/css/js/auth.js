document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login-form");
    const registerForm = document.querySelector("#register-form");

    if (loginForm) {
        loginForm.addEventListener("submit", handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener("submit", handleRegister);
    }
});

async function handleLogin(event) {
    event.preventDefault();

    const email = document.querySelector("#email")?.value.trim();
    const password = document.querySelector("#password")?.value;

    if (!email || !password) {
        showAuthMessage("Preencha todos os campos.", "error");
        return;
    }

    try {
        setAuthLoading(true);

        const result = await API.post("/auth/login", {
            email,
            password
        });

        showAuthMessage("Login realizado com sucesso.", "success");

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 500);

        return result;

    } catch (error) {
        showAuthMessage(error.message, "error");
    } finally {
        setAuthLoading(false);
    }
}

async function handleRegister(event) {
    event.preventDefault();

    const name = document.querySelector("#name")?.value.trim();
    const email = document.querySelector("#email")?.value.trim();
    const password = document.querySelector("#password")?.value;

    if (!name || !email || !password) {
        showAuthMessage("Preencha todos os campos.", "error");
        return;
    }

    if (password.length < 8) {
        showAuthMessage(
            "A senha precisa ter pelo menos 8 caracteres.",
            "error"
        );
        return;
    }

    try {
        setAuthLoading(true);

        await API.post("/auth/register", {
            name,
            email,
            password
        });

        showAuthMessage("Conta criada com sucesso.", "success");

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 700);

    } catch (error) {
        showAuthMessage(error.message, "error");
    } finally {
        setAuthLoading(false);
    }
}

function setAuthLoading(loading) {
    const buttons = document.querySelectorAll(
        "#login-form button, #register-form button"
    );

    buttons.forEach(button => {
        button.disabled = loading;

        if (loading) {
            button.dataset.originalText = button.textContent;
            button.textContent = "Aguarde...";
        } else if (button.dataset.originalText) {
            button.textContent = button.dataset.originalText;
        }
    });
}

function showAuthMessage(message, type = "error") {
    let element = document.querySelector(".auth-message");

    if (!element) {
        element = document.createElement("div");
        element.className = "auth-message";

        const form =
            document.querySelector("#login-form") ||
            document.querySelector("#register-form");

        if (form) {
            form.prepend(element);
        }
    }

    element.textContent = message;
    element.className = `auth-message ${type}`;

    setTimeout(() => {
        element.remove();
    }, 5000);
}
