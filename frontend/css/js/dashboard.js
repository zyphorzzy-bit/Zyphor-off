document.addEventListener("DOMContentLoaded", async () => {
    if (!document.querySelector(".dashboard-content")) {
        return;
    }

    await loadDashboard();
});

async function loadDashboard() {
    try {
        const data = await API.get("/dashboard");

        updateElement("user-name", data.user?.name || "Usuário");
        updateElement("bot-count", data.stats?.bots ?? 0);
        updateElement("online-count", data.stats?.online ?? 0);
        updateElement("storage-used", data.stats?.storage ?? "0 MB");
        updateElement("plan-name", data.plan?.name || "Free");

        if (data.bots) {
            renderRecentBots(data.bots);
        }

    } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
    }
}

function updateElement(id, value) {
    const element = document.getElementById(id);

    if (element) {
        element.textContent = value;
    }
}

function renderRecentBots(bots) {
    const container = document.querySelector("#recent-bots");

    if (!container) {
        return;
    }

    if (!bots.length) {
        container.innerHTML = `
            <div class="empty-state">
                <p>Você ainda não possui bots.</p>
                <a href="deploy.html" class="button primary">
                    Criar primeiro bot
                </a>
            </div>
        `;

        return;
    }

    container.innerHTML = bots
        .slice(0, 5)
        .map(bot => `
            <div class="bot-card">
                <div class="bot-header">
                    <div class="bot-name">
                        <div class="bot-icon">🤖</div>

                        <div>
                            <h3>${escapeHtml(bot.name)}</h3>
                            <p>${escapeHtml(bot.id)}</p>
                        </div>
                    </div>

                    <span class="bot-status ${bot.status === "online" ? "online" : "offline"}">
                        ${escapeHtml(bot.status)}
                    </span>
                </div>

                <div class="bot-actions">
                    <a href="bot.html?id=${encodeURIComponent(bot.id)}"
                       class="button secondary">
                        Gerenciar
                    </a>
                </div>
            </div>
        `)
        .join("");
}

function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value ?? "";
    return div.innerHTML;
}
