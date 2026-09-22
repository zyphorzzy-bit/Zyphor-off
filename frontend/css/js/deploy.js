document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#deploy-form");

    if (!form) {
        return;
    }

    form.addEventListener("submit", deployBot);

    const sourceSelect = document.querySelector("#deploy-source");

    if (sourceSelect) {
        sourceSelect.addEventListener("change", updateDeployFields);
        updateDeployFields();
    }
});

function updateDeployFields() {
    const source = document.querySelector("#deploy-source")?.value;

    document.querySelectorAll("[data-source]").forEach(element => {
        element.style.display =
            element.dataset.source === source ? "block" : "none";
    });
}

async function deployBot(event) {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);

    const source = formData.get("source");

    const payload = {
        name: formData.get("name"),
        source
    };

    if (source === "github") {
        payload.repository = formData.get("repository");
        payload.branch = formData.get("branch") || "main";
    }

    try {
        setDeployLoading(true);

        const result = await API.post("/bots/deploy", payload);

        notify("Deploy iniciado.", "success");

        if (result.botId) {
            setTimeout(() => {
                window.location.href =
                    `bot.html?id=${encodeURIComponent(result.botId)}`;
            }, 800);
        }

    } catch (error) {
        notify(error.message, "error");
    } finally {
        setDeployLoading(false);
    }
}

function setDeployLoading(loading) {
    const button = document.querySelector(
        "#deploy-form button[type='submit']"
    );

    if (!button) {
        return;
    }

    if (loading) {
        button.disabled = true;
        button.dataset.originalText = button.textContent;
        button.textContent = "Preparando...";
    } else {
        button.disabled = false;

        if (button.dataset.originalText) {
            button.textContent = button.dataset.originalText;
        }
    }
}
