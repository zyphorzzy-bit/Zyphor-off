document.addEventListener("DOMContentLoaded", () => {

    const loginForm =
        document.querySelector("#login-form");

    const registerForm =
        document.querySelector("#register-form");

    const logoutButtons =
        document.querySelectorAll("[data-logout]");

    async function login(email, password) {

        return await ZyphorAPI.post(
            "/auth/login",
            {
                email,
                password
            }
        );

    }

    async function register(name, email, password) {

        return await ZyphorAPI.post(
            "/auth/register",
            {
                name,
                email,
                password
            }
        );

    }

    async function logout() {

        try {
            await ZyphorAPI.post("/auth/logout");
        } finally {
            window.location.href = "login.html";
        }

    }

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();

                const email =
                    loginForm.querySelector(
                        'input[name="email"]'
                    )?.value.trim();

                const password =
                    loginForm.querySelector(
                        'input[name="password"]'
                    )?.value;

                if (!email || !password) {
                    alert("Preencha seu e-mail e sua senha.");
                    return;
                }

                const button =
                    loginForm.querySelector(
                        'button[type="submit"]'
                    );

                const originalText =
                    button?.textContent;

                if (button) {
                    button.disabled = true;
                    button.textContent = "Entrando...";
                }

                try {

                    await login(
                        email,
                        password
                    );

                    window.location.href =
                        "dashboard.html";

                } catch (error) {

                    alert(
                        error.message ||
                        "Não foi possível entrar."
                    );

                    if (button) {
                        button.disabled = false;
                        button.textContent = originalText;
                    }

                }

            }
        );

    }

    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();

                const name =
                    registerForm.querySelector(
                        'input[name="name"]'
                    )?.value.trim();

                const email =
                    registerForm.querySelector(
                        'input[name="email"]'
                    )?.value.trim();

                const password =
                    registerForm.querySelector(
                        'input[name="password"]'
                    )?.value;

                const confirmPassword =
                    registerForm.querySelector(
                        'input[name="confirmPassword"]'
                    )?.value ||
                    registerForm.querySelector(
                        'input[name="password_confirm"]'
                    )?.value;

                if (!name || !email || !password) {
                    alert("Preencha todos os campos.");
                    return;
                }

                if (
                    confirmPassword !== undefined &&
                    password !== confirmPassword
                ) {
                    alert("As senhas não são iguais.");
                    return;
                }

                const button =
                    registerForm.querySelector(
                        'button[type="submit"]'
                    );

                const originalText =
                    button?.textContent;

                if (button) {
                    button.disabled = true;
                    button.textContent = "Criando...";
                }

                try {

                    await register(
                        name,
                        email,
                        password
                    );

                    window.location.href =
                        "dashboard.html";

                } catch (error) {

                    alert(
                        error.message ||
                        "Não foi possível criar sua conta."
                    );

                    if (button) {
                        button.disabled = false;
                        button.textContent = originalText;
                    }

                }

            }
        );

    }

    logoutButtons.forEach(button => {

        button.addEventListener(
            "click",
            event => {
                event.preventDefault();
                logout();
            }
        );

    });

});
