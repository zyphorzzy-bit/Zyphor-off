document.addEventListener("DOMContentLoaded", async () => {
    if (!document.querySelector(".bot-grid")) {
        return;
    }

    await loadBots();
});

async function loadBots() {
    const container = document.querySelector(".bot-grid");

    try {
        const data = await API.get("/bots");

        const bots = data.bots || data || [];

        if (!bots.length) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>Nenhum bot encontrado</h3>
                    <p>Crie seu primeiro bot para começar.</p>

                    <a href="deploy.html" class="button primary">
                        Criar bot
                    </a>
                </div>
            `;

            return;
        }

        container.innerHTML = bots.map(renderBotCard).join("");

    } catch (error) {
        console.error(error);

        container.innerHTML = `
            <div class="empty-state">
                <p>Não foi possível carregar seus bots.</p>
            </div>
        `;
    }
}

function renderBotCard(bot) {
    const online = bot.status === "online";

    return `
        <article class="bot-card">

            <div class="bot-header">

                <div class="bot-name">

                    <div class="bot-icon">
                        🤖
                    </div>

                    <div>
                        <h3>${escapeHtml(bot.name)}</h3>
                        <p>${escapeHtml(bot.id)}</p>
                    </div>

                </div>

                <span class="bot-status ${online ? "online" : "offline"}">
                    ${online ? "Online" : "Offline"}
                </span>

            </div>

            <div class="bot-stats">

                <div class="bot-stat">
                    <span>CPU</span>
                    <strong>${bot.cpu ?? "0"}%</strong>
                </div>

                <div class="bot-stat">
                    <span>RAM</span>
                    <strong>${bot.memory ?? "0 MB"}</strong>
                </div>

            </div>

            <div class="bot-actions">

                <a
                    href="bot.html?id=${encodeURIComponent(bot.id)}"
                    class="button secondary"
                >
                    Gerenciar
                </a>

            </div>

        </article>
    `;
}

async function startBot(botId) {
    try {
        await API.post(`/bots/${encodeURIComponent(botId)}/start`);

        notify("Bot iniciado.", "success");

        await loadBots();

    } catch (error) {
        notify(error.message, "error");
    }
}

async function stopBot(botId) {
    try {
        await API.post(`/bots/${encodeURIComponent(botId)}/stop`);

        notify("Bot parado.", "success");

        await loadBots();

    } catch (error) {
        notify(error.message, "error");
    }
}

async function restartBot(botId) {
    try {
        await API.post(`/bots/${encodeURIComponent(botId)}/restart`);

        notify("Bot reiniciado.", "success");

        await loadBots();

    } catch (error) {
        notify(error.message, "error");
    }
}

function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value ?? "";
    return div.innerHTML;
}
