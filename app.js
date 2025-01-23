document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu');
    const slide = document.querySelector('.menu .slide');
    const links = document.querySelectorAll('.menu a');
    const sections = document.querySelectorAll('.sections');

    function updateIndicator(target) {
        const { offsetLeft, offsetWidth } = target;
        slide.style.width = `${offsetWidth}px`;
        slide.style.transform = `translateX(${offsetLeft}px)`;
    }

    // Manejar clics en los enlaces
    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Evitar comportamiento predeterminado
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            // Scroll suave hacia la sección correspondiente
            targetSection.scrollIntoView({
                behavior: 'smooth',
            });

            // Actualizar clase activa
            document.querySelector('.menu a.active')?.classList.remove('active');
            link.classList.add('active');

            // Actualizar la posición del indicador
            updateIndicator(link);
        });
    });

    // Configurar IntersectionObserver
    const observerOptions = {
        root: null,
        threshold: 0.5, // Detectar si al menos el 50% de la sección está visible
    };

    const observerCallback = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const activeLink = document.querySelector(`.menu a[href="#${sectionId}"]`);

                // Actualizar clase activa
                document.querySelector('.menu a.active')?.classList.remove('active');
                activeLink.classList.add('active');

                // Actualizar la posición del indicador
                updateIndicator(activeLink);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
        observer.observe(section);
    });

    // Inicializar el indicador en la primera opción activa
    const activeLink = document.querySelector('.menu a.active') || links[0];
    activeLink.classList.add('active');
    updateIndicator(activeLink);
});
