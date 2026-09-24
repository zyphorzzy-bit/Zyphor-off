document.addEventListener("DOMContentLoaded", () => {

    const createButtons = document.querySelectorAll(
        'a[href="deploy.html"]'
    );

    createButtons.forEach(button => {

        button.addEventListener("click", () => {
            button.style.opacity = "0.7";
        });

    });


    const activity = document.querySelector(".activity-empty");

    if (activity) {
        activity.style.transition = "opacity .3s ease";
    }


    const panels = document.querySelectorAll(".dashboard-panel");

    panels.forEach(panel => {

        panel.addEventListener("mouseenter", () => {
            panel.style.borderColor = "#303030";
        });

        panel.addEventListener("mouseleave", () => {
            panel.style.borderColor = "";
        });

    });

});
