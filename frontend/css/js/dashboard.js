document.addEventListener("DOMContentLoaded", () => {

    const panels = document.querySelectorAll(".dashboard-panel");

    panels.forEach(panel => {

        panel.addEventListener("mouseenter", () => {
            panel.style.borderColor = "#303030";
        });

        panel.addEventListener("mouseleave", () => {
            panel.style.borderColor = "";
        });

    });


    const buttons = document.querySelectorAll(".button");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            button.style.opacity = "0.7";

            setTimeout(() => {
                button.style.opacity = "";
            }, 250);

        });

    });

});
