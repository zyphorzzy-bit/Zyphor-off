const API_BASE = "/api";

async function apiRequest(endpoint, options = {}) {
    const config = {
        method: options.method || "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        }
    };

    if (options.body !== undefined) {
        config.body =
            typeof options.body === "string"
                ? options.body
                : JSON.stringify(options.body);
    }

    const response = await fetch(
        `${API_BASE}${endpoint}`,
        config
    );

    let data = null;

    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {
        const message =
            data?.message ||
            data?.error ||
            "Ocorreu um erro na API.";

        const error = new Error(message);
        error.status = response.status;
        error.data = data;

        throw error;
    }

    return data;
}

const api = {
    get(endpoint) {
        return apiRequest(endpoint);
    },

    post(endpoint, body = {}) {
        return apiRequest(endpoint, {
            method: "POST",
            body
        });
    },

    put(endpoint, body = {}) {
        return apiRequest(endpoint, {
            method: "PUT",
            body
        });
    },

    delete(endpoint) {
        return apiRequest(endpoint, {
            method: "DELETE"
        });
    }
};

window.ZyphorAPI = api;
