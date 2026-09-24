document.addEventListener("DOMContentLoaded", () => {

    const notificationButtons =
        document.querySelectorAll("[data-notifications]");

    notificationButtons.forEach(button => {

        button.addEventListener("click", event => {
            event.stopPropagation();

            const panel =
                document.querySelector(".notification-panel");

            if (!panel) return;

            panel.classList.toggle("open");
        });

    });

    document.addEventListener("click", event => {

        const panel =
            document.querySelector(".notification-panel");

        if (!panel) return;

        if (
            !panel.contains(event.target) &&
