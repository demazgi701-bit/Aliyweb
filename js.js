
// TELEGRAM USERNAME
const telegram = "https://t.me/Ali_dobry17";

// MOBILE MENU
const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

menu.addEventListener("click", () => {
    nav.classList.toggle("active");
});

nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
        nav.classList.remove("active");
    });
});

// TRANSLATIONS
const ru = {
    home: "Главная",
    services: "Услуги",
    portfolio: "Портфолио",
    contact: "Контакты",
    headline: "Создаём будущее<br><span>вместе.</span>",
    intro: "Современные сайты, креативный дизайн и цифровые решения для вашего бизнеса.",
    order: "Заказать →",
    works: "Наши работы",
    ourServices: "Наши услуги",
    web: "Создание сайтов",
    webDesc: "Быстрые и современные адаптивные сайты.",
    shop: "Интернет-магазин",
    shopDesc: "Каталог товаров и удобная система заказов.",
    bot: "Telegram-бот",
    botDesc: "Автоматизация бизнес-процессов.",
    design: "Графический дизайн",
    designDesc: "Логотипы, баннеры и рекламный дизайн.",
    ourWorks: "Концепты проектов",
    concept: "Концепт дизайна сайта",
    contactTitle: "Начнём ваш проект?",
    contactDesc: "Обсудите свою идею с нами.",
    choose: "Выберите услугу",
    send: "Отправить через Telegram ↗"
};

const original = new Map();

document.querySelectorAll("[data-t]").forEach(el => {
    original.set(el, el.innerHTML);
});

let language = "uz";

document.getElementById("lang").addEventListener("click", () => {
    language = language === "uz" ? "ru" : "uz";
    document.documentElement.lang = language;

    document.querySelectorAll("[data-t]").forEach(el => {
        el.innerHTML = language === "ru"
            ? ru[el.dataset.t] || original.get(el)
            : original.get(el);
    });

    document.getElementById("lang").textContent =
        language === "uz" ? "RU" : "UZ";

    document.getElementById("name").placeholder =
        language === "uz" ? "Ismingiz" : "Ваше имя";

    document.getElementById("message").placeholder =
        language === "uz"
        ? "Loyihangiz haqida..."
        : "Расскажите о вашем проекте...";
});

// ORDER FORM
document.getElementById("orderForm").addEventListener("submit", e => {
    e.preventDefault();

    const status = document.getElementById("status");

    if (telegram === "USERNAME") {
        status.textContent = "Telegram username hali sozlanmagan.";
        return;
    }

    const name = document.getElementById("name").value;
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value;

    const text =
        `ALIY.WEB — Yangi buyurtma\n\n` +
        `Ism: ${name}\n` +
        `Xizmat: ${service}\n` +
        `Loyiha: ${message}`;

    window.open(
        `https://t.me/${telegram}?text=${encodeURIComponent(text)}`,
        "_blank",
        "noopener,noreferrer"
    );
});

// BACKGROUND PARTICLES
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const count = window.innerWidth < 768 ? 35 : 80;

    particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4
    }));
}

window.addEventListener("resize", resize);
resize();

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        if (!reducedMotion) {
            p.x += p.vx;
            p.y += p.vy;
        }

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(34,211,238,0.55)";
        ctx.fill();
    });

    if (!reducedMotion) {
        requestAnimationFrame(animate);
    }
}

animate();
