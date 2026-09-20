// Rolagem suave dos links

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(event) {

        const destino =
            document.querySelector(
                this.getAttribute("href")
            );

        if (!destino) return;

        event.preventDefault();

        destino.scrollIntoView({
            behavior: "smooth"
        });

    });

});


// Animação simples dos cards

const cards =
    document.querySelectorAll(".plan, .feature");

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.1
        }
    );


cards.forEach(card => {

    card.style.opacity = "0";

    card.style.transform =
        "translateY(20px)";

    card.style.transition =
        "opacity .5s ease, transform .5s ease";

    observer.observe(card);

});
