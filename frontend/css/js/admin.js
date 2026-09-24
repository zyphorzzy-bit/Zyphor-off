document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       NOTIFICAÇÕES
       ===================================================== */

    const notificationButton = document.querySelector("#notificationButton");

    let notificationPanel = document.querySelector(
        ".admin-notification-panel"
    );

    if (!notificationPanel) {
        notificationPanel = document.createElement("div");

        notificationPanel.className =
            "admin-notification-panel";

        notificationPanel.innerHTML = `
            <div class="admin-notification-panel-header">
                <strong>Notificações</strong>
                <button type="button" data-close-notifications>×</button>
            </div>

            <div class="admin-notification-item">
                <strong>Novo pagamento pendente</strong>
                <small>João Silva enviou um comprovante.</small>
            </div>

            <div class="admin-notification-item">
                <strong>Novo ticket</strong>
                <small>Existe um novo ticket aguardando atendimento.</small>
            </div>

            <div class="admin-notification-item">
                <strong>Novo usuário</strong>
                <small>Uma nova conta foi criada no Zyphor Cloud.</small>
            </div>
        `;

        document.body.appendChild(notificationPanel);
    }


    if (notificationButton) {

        notificationButton.addEventListener("click", (event) => {

            event.stopPropagation();

            notificationPanel.classList.toggle("open");

        });

    }


    const closeNotifications =
        document.querySelector("[data-close-notifications]");

    if (closeNotifications) {

        closeNotifications.addEventListener("click", () => {

            notificationPanel.classList.remove("open");

        });

    }


    document.addEventListener("click", (event) => {

        if (
            notificationPanel.classList.contains("open") &&
            !notificationPanel.contains(event.target) &&
            !notificationButton?.contains(event.target)
        ) {
            notificationPanel.classList.remove("open");
        }

    });


    /* =====================================================
       BOTÕES DE PAGAMENTO
       ===================================================== */

    const approveButtons =
        document.querySelectorAll(".approve-button");

    const rejectButtons =
        document.querySelectorAll(".reject-button");


    approveButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const row = button.closest("tr");

            if (!row) return;

            const statusCell =
                row.querySelector(".table-actions");

            if (!statusCell) return;

            statusCell.innerHTML = `
                <span class="status-badge active">
                    Aprovado
                </span>
            `;

            row.style.opacity = "0.55";

        });

    });


    rejectButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const row = button.closest("tr");

            if (!row) return;

            const statusCell =
                row.querySelector(".table-actions");

            if (!statusCell) return;

            statusCell.innerHTML = `
                <span
                    class="status-badge"
                    style="
                        color:#ff6b6b;
                        background:rgba(255,95,95,.08);
                    "
                >
                    Rejeitado
                </span>
            `;

            row.style.opacity = "0.55";

        });

    });


    /* =====================================================
       COMPROVANTE
       ===================================================== */

    const proofButtons =
        document.querySelectorAll(".proof-button");

    proofButtons.forEach((button) => {

        button.addEventListener("click", () => {

            alert(
                "Visualização do comprovante será conectada ao backend posteriormente."
            );

        });

    });


    /* =====================================================
       FILTRO DE ESTATÍSTICAS
       ===================================================== */

    const periodButtons =
        document.querySelectorAll(".stats-period button");

    periodButtons.forEach((button) => {

        button.addEventListener("click", () => {

            periodButtons.forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");

        });

    });


    /* =====================================================
       AÇÕES RÁPIDAS
       ===================================================== */

    const quickActions =
        document.querySelectorAll(".quick-actions button");

    quickActions.forEach((button) => {

        button.addEventListener("click", () => {

            const title =
                button.querySelector("strong")?.textContent;

            if (!title) return;

            console.log(
                `Ação administrativa selecionada: ${title}`
            );

        });

    });


    /* =====================================================
       BOTÃO EDITAR PIX
       ===================================================== */

    const editPixButton =
        document.querySelector(".admin-edit-button");

    if (editPixButton) {

        editPixButton.addEventListener("click", () => {

            alert(
                "A edição dos dados PIX será conectada ao backend posteriormente."
            );

        });

    }


    /* =====================================================
       EFEITO NOS CARDS
       ===================================================== */

    const statCards =
        document.querySelectorAll(".admin-stat-card");

    statCards.forEach((card) => {

        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-2px)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });

    });


    /* =====================================================
       LOG
       ===================================================== */

    console.log(
        "Zyphor Cloud Admin Panel carregado."
    );

});
