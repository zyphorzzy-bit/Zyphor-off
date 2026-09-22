const API_BASE = window.API_BASE || "http://localhost:3000/api";

async function apiRequest(endpoint, options = {}) {
    const config = {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        },
        credentials: "include"
    };

    const response = await fetch(`${API_BASE}${endpoint}`, config);

    let data = null;

    try {
        data = await response.json();
    } catch {
        data = {};
    }

    if (!response.ok) {
        throw new Error(data.message || "Erro na comunicação com o servidor.");
    }

    return data;
}

const API = {
    get(endpoint) {
        return apiRequest(endpoint);
    },

    post(endpoint, body = {}) {
        return apiRequest(endpoint, {
            method: "POST",
            body: JSON.stringify(body)
        });
    },

    put(endpoint, body = {}) {
        return apiRequest(endpoint, {
            method: "PUT",
            body: JSON.stringify(body)
        });
    },

    delete(endpoint) {
        return apiRequest(endpoint, {
            method: "DELETE"
        });
    }
};

window.API = API;
