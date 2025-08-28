document.addEventListener('DOMContentLoaded', () => {
    const homePage = document.getElementById('home-page');
    const projectsPage = document.getElementById('projects-page');
    const aboutPage = document.getElementById('about-page');
    const reachUsPage = document.getElementById('reach-us-page');
    const projectCard = document.getElementById('project-card');
    const reachUsBtn = document.getElementById('reach-us-btn');
    const backToHomeBtns = document.querySelectorAll('.back-to-home');
    const homeLinks = document.querySelectorAll('.home-link');
    const aboutLinks = document.querySelectorAll('.about-link');
    const typingTextElement = document.getElementById('typing-text');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    const aboutMeText = "I'm Monisha S, a passionate learner and Data Science student with a strong interest in technology and problem-solving. I enjoy working with data, exploring patterns, and applying analytical skills to find meaningful insights. Currently, I'm building my knowledge in Python, statistics, html, UI/UX and machine learning while pursuing my studies. My goal is to grow into a skilled Data Scientist and contribute to impactful projects in AI and data-driven decision-making. Beyond academics, I enjoy creative activities, learning new skills, and continuously improving myself. I believe consistency and curiosity are the keys to growth.";
    let typeTimeout;

    function showPage(pageToShow) {
        homePage.classList.add('hidden');
        projectsPage.classList.add('hidden');
        aboutPage.classList.add('hidden');
        reachUsPage.classList.add('hidden');
        pageToShow.classList.remove('hidden');
        window.scrollTo(0, 0);
    }

    function startTypingAnimation(text, element, speed) {
        clearTimeout(typeTimeout);
        element.innerHTML = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                typeTimeout = setTimeout(typeWriter, speed);
            }
        }
        typeWriter();
    }

    projectCard.addEventListener('click', () => showPage(projectsPage));
    reachUsBtn.addEventListener('click', () => showPage(reachUsPage));

    backToHomeBtns.forEach(btn => {
        btn.addEventListener('click', () => showPage(homePage));
    });

    homeLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showPage(homePage);
        });
    });

    aboutLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showPage(aboutPage);
            startTypingAnimation(aboutMeText, typingTextElement, 50);
        });
    });

    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        
        formStatus.textContent = 'Sending...';
        formStatus.style.color = 'white';

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.textContent = "Thanks for your submission!";
                formStatus.style.color = '#34D399'; // Green color
                form.reset();
            } else {
                const responseData = await response.json();
                if (Object.hasOwn(responseData, 'errors')) {
                    formStatus.textContent = responseData["errors"].map(error => error["message"]).join(", ");
                } else {
                    formStatus.textContent = "Oops! There was a problem submitting your form";
                }
                 formStatus.style.color = '#F87171'; // Red color
            }
        } catch (error) {
            formStatus.textContent = "Oops! There was a problem submitting your form";
            formStatus.style.color = '#F87171'; // Red color
        }
    });

    // Show the home page by default when the script loads
    showPage(homePage);
});