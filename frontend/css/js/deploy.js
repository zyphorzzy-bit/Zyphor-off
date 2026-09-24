document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("#deploy-form");

    const sourceRadios = document.querySelectorAll(
        'input[name="source"]'
    );

    const githubFields = document.querySelector("#github-fields");
    const zipFields = document.querySelector("#zip-fields");

    const fileInput = document.querySelector(
        'input[type="file"]'
    );

    function updateSource() {

        const selected = document.querySelector(
            'input[name="source"]:checked'
        );

        if (!selected) return;

        if (githubFields) {
            githubFields.style.display =
                selected.value === "github"
                    ? "block"
                    : "none";
        }

        if (zipFields) {
            zipFields.style.display =
                selected.value === "zip"
                    ? "block"
                    : "none";
        }

    }


    sourceRadios.forEach(radio => {

        radio.addEventListener(
            "change",
            updateSource
        );

    });


    if (fileInput) {

        fileInput.addEventListener(
            "change",
            () => {

                const file = fileInput.files[0];

                if (!file) return;

                const label =
                    document.querySelector(
                        ".file-name"
                    );

                if (label) {
                    label.textContent =
                        file.name;
                }

            }
        );

    }


    if (form) {

        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const button =
                    form.querySelector(
                        'button[type="submit"]'
                    );

                if (!button) return;

                const original =
                    button.textContent;

                button.disabled = true;
                button.textContent =
                    "Preparando...";

                setTimeout(() => {

                    button.disabled = false;
                    button.textContent =
                        original;

                }, 1200);

            }
        );

    }


    updateSource();

});
