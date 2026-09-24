document.addEventListener("DOMContentLoaded", () => {

    const sourceOptions = document.querySelectorAll(".source-option");
    const githubFields = document.querySelector(".github-fields");
    const zipFields = document.querySelector(".zip-fields");

    function updateSource() {

        const selected = document.querySelector(
            'input[name="source"]:checked'
        );

        if (!selected) return;

        if (githubFields) {
            githubFields.style.display =
                selected.value === "github" ? "block" : "none";
        }

        if (zipFields) {
            zipFields.style.display =
                selected.value === "zip" ? "block" : "none";
        }

    }


    sourceOptions.forEach(option => {

        option.addEventListener("click", () => {

            const radio = option.querySelector(
                'input[type="radio"]'
            );

            if (radio) {
                radio.checked = true;
                updateSource();
            }

        });

    });


    document.querySelectorAll(
        'input[name="source"]'
    ).forEach(radio => {

        radio.addEventListener("change", updateSource);

    });


    updateSource();


    const copyButtons = document.querySelectorAll(
        "[data-copy]"
    );

    copyButtons.forEach(button => {

        button.addEventListener("click", async () => {

            const target = document.querySelector(
                button.dataset.copy
            );

            if (!target) return;

            try {

                await navigator.clipboard.writeText(
                    target.textContent.trim()
                );

                const original = button.textContent;

                button.textContent = "Copiado";

                setTimeout(() => {
                    button.textContent = original;
                }, 1500);

            } catch {
                console.log("Não foi possível copiar.");
            }

        });

    });

});
