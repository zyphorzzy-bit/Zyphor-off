let currentBotId = null;
let currentFile = null;

document.addEventListener("DOMContentLoaded", async () => {
    const editor = document.querySelector(".code-editor");

    if (!editor) {
        return;
    }

    const params = new URLSearchParams(window.location.search);

    currentBotId = params.get("id");

    if (!currentBotId) {
        notify("Bot não encontrado.", "error");
        return;
    }

    await loadFiles();
});

async function loadFiles() {
    const tree = document.querySelector(".file-tree");

    if (!tree) {
        return;
    }

    try {
        const data = await API.get(
            `/bots/${encodeURIComponent(currentBotId)}/files`
        );

        const files = data.files || [];

        tree.innerHTML = files.map(file => `
            <div
                class="file-item"
                data-path="${escapeHtml(file.path)}"
                onclick="openFile('${escapeJs(file.path)}')"
            >
                ${escapeHtml(file.path)}
            </div>
        `).join("");

    } catch (error) {
        tree.innerHTML = `
            <p class="muted">
                Não foi possível carregar os arquivos.
            </p>
        `;
    }
}

async function openFile(filePath) {
    try {
        const data = await API.get(
            `/bots/${encodeURIComponent(currentBotId)}/files?path=${encodeURIComponent(filePath)}`
        );

        currentFile = filePath;

        const editor = document.querySelector(".code-editor");

        if (editor) {
            editor.value = data.content || "";
        }

        const fileName = document.querySelector(".editor-file-name");

        if (fileName) {
            fileName.textContent = filePath;
        }

        document
            .querySelectorAll(".file-item")
            .forEach(item => item.classList.remove("active"));

        const active = document.querySelector(
            `.file-item[data-path="${CSS.escape(filePath)}"]`
        );

        active?.classList.add("active");

    } catch (error) {
        notify(error.message, "error");
    }
}

async function saveFile() {
    if (!currentFile || !currentBotId) {
        notify("Nenhum arquivo selecionado.", "error");
        return;
    }

    const editor = document.querySelector(".code-editor");

    try {
        await API.put(
            `/bots/${encodeURIComponent(currentBotId)}/files`,
            {
                path: currentFile,
                content: editor.value
            }
        );

        notify("Arquivo salvo.", "success");

    } catch (error) {
        notify(error.message, "error");
    }
}

async function deleteFile() {
    if (!currentFile || !currentBotId) {
        return;
    }

    if (!confirm(`Excluir ${currentFile}?`)) {
        return;
    }

    try {
        await API.delete(
            `/bots/${encodeURIComponent(currentBotId)}/files?path=${encodeURIComponent(currentFile)}`
        );

        currentFile = null;

        document.querySelector(".code-editor").value = "";

        await loadFiles();

        notify("Arquivo excluído.", "success");

    } catch (error) {
        notify(error.message, "error");
    }
}

function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value ?? "";
    return div.innerHTML;
}

function escapeJs(value) {
    return String(value ?? "")
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'");
}
