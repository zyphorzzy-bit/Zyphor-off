document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.querySelector("#bot-search");
    const filter = document.querySelector("#bot-filter");
    const botCards = document.querySelectorAll(".bot-card");

    function filterBots() {

        const search = searchInput
            ? searchInput.value.toLowerCase()
            : "";

        const status = filter
            ? filter.value
            : "all";

        botCards.forEach(card => {

            const name = card.dataset.name
                ? card.dataset.name.toLowerCase()
                : "";

            const cardStatus = card.dataset.status || "";

            const matchesSearch = name.includes(search);

            const matchesStatus =
                status === "all" ||
                cardStatus === status;

            card.style.display =
                matchesSearch && matchesStatus
                    ? ""
                    : "none";

        });

    }

    if (searchInput) {
        searchInput.addEventListener("input", filterBots);
    }

    if (filter) {
        filter.addEventListener("change", filterBots);
    }

});
