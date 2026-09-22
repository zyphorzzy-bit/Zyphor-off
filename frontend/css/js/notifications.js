function notify(message, type = "info") {
    let container = document.querySelector(".notification-container");

    if (!container) {
        container = document.createElement("div");

        container.className = "notification-container";

        Object.assign(container.style, {
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: "99999",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "350px"
        });

        document.body.appendChild(container);
    }

    const notification = document.createElement("div");

    notification.textContent = message;

    Object.assign(notification.style, {
        padding: "13px 16px",
        background: "#111",
        color: "#fff",
        border: "1px solid #292929",
        borderRadius: "10px",
        fontSize: "13px",
        boxShadow: "0 10px 30px rgba(0,0,0,.4)",
        transition: "opacity .2s ease"
    });

    if (type === "success") {
        notification.style.borderColor = "#315e45";
    }

    if (type === "error") {
        notification.style.borderColor = "#713838";
    }

    if (type === "warning") {
        notification.style.borderColor = "#66542d";
    }

    container.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = "0";

        setTimeout(() => {
            notification.remove();
        }, 250);
    }, 3500);
}

window.notify = notify;
