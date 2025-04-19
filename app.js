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
        threshold: 0.5,
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


// Controlar el desplazamiento del carrusel de los proyectos
const cardsContainer = document.querySelector('.cardscontainer'); 
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

prevBtn.addEventListener('click', () => {
  const cardWidth = document.querySelector('.cards').offsetWidth + 20;
  currentIndex = Math.max(currentIndex - 1, 0);
  cardsContainer.scrollLeft -= cardWidth; 
});

nextBtn.addEventListener('click', () => {
  const cardWidth = document.querySelector('.cards').offsetWidth + 20; 
  const maxScrollLeft = cardsContainer.scrollWidth - cardsContainer.clientWidth; 
  currentIndex = Math.min(currentIndex + 1, maxScrollLeft / cardWidth);
  cardsContainer.scrollLeft += cardWidth;
});

