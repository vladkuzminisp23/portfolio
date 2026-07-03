// ==========================
// TAB (вкладки)
// ==========================
function openTab(id) {
    document.querySelectorAll('.section').forEach(s => {
        s.classList.remove('active');
    });

    const section = document.getElementById(id);
    if (section) {
        section.classList.add('active');
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// ==========================
// ТЕМА (светлая / тёмная)
// ==========================
function toggleTheme() {
    const body = document.body;
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    }
}

// При загрузке применяем сохранённую тему
(function applyStoredTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
        document.body.classList.add('light-theme');
    }
})();

// ==========================
// КОНТАКТЫ
// ==========================
function openContacts() {
    const modal = document.getElementById("contactModal");
    if (modal) modal.style.display = "flex";
}

function closeContacts() {
    const modal = document.getElementById("contactModal");
    if (modal) modal.style.display = "none";
}

function showContact(type) {
    const box = document.getElementById("contactInfo");
    if (!box) return;

    if (type === "phone") {
        box.innerHTML = `
            <p>📞 +7 999 410 16 33</p>
            <a href="tel:+79994101633" class="action-btn">Позвонить</a>
        `;
    }

    if (type === "email") {
        box.innerHTML = `
            <p>📧 kvlad4789@gmail.com</p>
            <a href="mailto:kvlad4789@gmail.com" class="action-btn">Написать</a>
        `;
    }

    if (type === "tg") {
        box.innerHTML = `
            <p>💬 @ZELLOIN</p>
            <a href="https://t.me/ZELLOIN" target="_blank" class="action-btn">Написать</a>
        `;
    }
}

// ==========================
// СЕРТИФИКАТЫ
// ==========================
function openCert(src, pdf) {
    const modal = document.getElementById("certModal");
    const img = document.getElementById("certImg");
    const btn = document.getElementById("downloadCert");

    if (img) img.src = src;
    if (modal) modal.style.display = "flex";

    if (btn && pdf) {
        btn.onclick = () => {
            window.open(pdf, "_blank");
        };
    }
}

function closeCert(e) {
    if (e.target.id === "certModal") {
        document.getElementById("certModal").style.display = "none";
    }
}

// ==========================
// ПРАКТИКА (ФОТО) – если нужна модалка для фото
// ==========================
function openPractice(src) {
    const modal = document.getElementById("practiceModal");
    const img = document.getElementById("practiceImg");

    if (!modal || !img) return;

    img.src = src;
    modal.style.display = "flex";
}

function closePractice(e) {
    if (e.target.id === "practiceModal") {
        document.getElementById("practiceModal").style.display = "none";
    }
}

// ==========================
// PARALLAX КОТИК
// ==========================
document.addEventListener("mousemove", (e) => {
    const cat = document.querySelector(".hero-cat");
    if (!cat) return;

    const x = (window.innerWidth / 2 - e.clientX) / 40;
    const y = (window.innerHeight / 2 - e.clientY) / 40;

    cat.style.transform = `translate(${x}px, ${y}px)`;
});

// ==========================
// GLOW HOVER
// ==========================
document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--x", x + "px");
        card.style.setProperty("--y", y + "px");
    });
});

// ==========================
// ГЕНЕРАЦИЯ ТОЧЕК УРОВНЯ
// ==========================
document.querySelectorAll('.dots').forEach(dots => {
    const level = parseInt(dots.dataset.level) || 0;
    dots.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i < level ? ' active' : '');
        dots.appendChild(dot);
    }
});

// ==========================
// ПРАКТИКА — ПОДРОБНОСТИ
// ==========================
const practiceData = {
    mvd: {
        title: 'Миграционный пункт №3',
        description: `
            <p>Выполняла работу в отделе по вопросам миграции. Занималась актуализацией базы данных, обработкой запросов граждан, формированием отчётов.</p>
            <p><b>Чему научилась:</b></p>
            <ul>
                <li>работа с большими массивами данных в SQL</li>
                <li>составление сложных запросов с JOIN и GROUP BY</li>
                <li>оптимизация выборок для ускорения отчётов</li>
                <li>оформление служебной документации</li>
            </ul>
        `,
        photos: [
            'assets/practice/mvd_desk.jpg',
            'assets/practice/mvd_screen.jpg',
            'assets/practice/mvd_team.jpg'
        ]
    },
    cdek: {
        title: 'СДЭК',
        description: `
            <p>Стажировалась в IT-отделе логистической компании. Тестировала внутренние системы, анализировала логи, работала с базой данных заказов.</p>
            <p><b>Задачи:</b></p>
            <ul>
                <li>ручное и автоматизированное тестирование веб-интерфейса</li>
                <li>написание скриптов на Python для парсинга логов</li>
                <li>участие в рефакторинге SQL-запросов</li>
                <li>подготовка тестовой документации</li>
            </ul>
            <p>Освоила инструменты: Jira, Confluence, DBeaver.</p>
        `,
        photos: [
            'assets/practice/cdek_1.jpg',
            'assets/practice/cdek_2.jpg',
            'assets/practice/cdek_3.jpg'
        ]
    }
};

function openPracticeDetail(key) {
    const data = practiceData[key];
    if (!data) return;

    document.getElementById('practiceTitle').innerHTML = data.title;
    document.getElementById('practiceDescription').innerHTML = data.description;

    const photosContainer = document.getElementById('practicePhotos');
    photosContainer.innerHTML = '';
    if (data.photos && data.photos.length > 0) {
        data.photos.forEach(photo => {
            const img = document.createElement('img');
            img.src = photo;
            img.className = 'practice-detail-img';
            img.alt = 'Фото';
            photosContainer.appendChild(img);
        });
    } else {
        photosContainer.innerHTML = '<p>Фотографии скоро появятся</p>';
    }

    document.getElementById('practiceDetailModal').style.display = 'flex';
}

function closePracticeDetail(e) {
    if (e && e.target.id !== 'practiceDetailModal') return;
    document.getElementById('practiceDetailModal').style.display = 'none';
}

// ==========================
// SDLC КАРТА (с фильтрацией сертификатов)
// ==========================
function initSdlcMap() {
    const steps = document.querySelectorAll('.sdlc-step');
    const detailBox = document.getElementById('sdlcDetail');
    const certs = document.querySelectorAll('.cert-item');
    let activeStep = document.querySelector('.sdlc-step.active');

    function filterCerts(stepKey) {
        certs.forEach(cert => {
            if (!stepKey) {
                cert.classList.remove('hidden');
            } else {
                const certStep = cert.dataset.step;
                if (certStep === stepKey) {
                    cert.classList.remove('hidden');
                } else {
                    cert.classList.add('hidden');
                }
            }
        });
    }

    function updateActive(step) {
        steps.forEach(s => s.classList.remove('active'));
        step.classList.add('active');
        activeStep = step;

        if (window.innerWidth >= 768 && detailBox) {
            const hiddenDetail = step.querySelector('.step-detail');
            detailBox.innerHTML = hiddenDetail ? hiddenDetail.innerHTML : '';
            detailBox.style.display = 'block';
        } else {
            if (detailBox) detailBox.style.display = 'none';
        }

        const stepKey = step.dataset.step;
        filterCerts(stepKey);
    }

    function resetFilter() {
        steps.forEach(s => s.classList.remove('active'));
        activeStep = null;
        if (detailBox) {
            detailBox.innerHTML = '';
            detailBox.style.display = 'none';
        }
        filterCerts(null);
    }

    steps.forEach(step => {
        step.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                if (step.classList.contains('expanded')) {
                    step.classList.remove('expanded');
                    if (!document.querySelector('.sdlc-step.expanded')) {
                        resetFilter();
                    }
                    return;
                }
                steps.forEach(s => s.classList.remove('expanded'));
                step.classList.add('expanded');
                filterCerts(step.dataset.step);
                return;
            }

            if (step.classList.contains('active')) {
                resetFilter();
                return;
            }
            updateActive(step);
        });
    });

    if (activeStep && window.innerWidth >= 768) {
        updateActive(activeStep);
    } else {
        resetFilter();
    }
}

document.addEventListener('DOMContentLoaded', initSdlcMap);

window.addEventListener('resize', () => {
    const active = document.querySelector('.sdlc-step.active');
    if (active && window.innerWidth >= 768) {
        const detailBox = document.getElementById('sdlcDetail');
        const hiddenDetail = active.querySelector('.step-detail');
        if (detailBox && hiddenDetail) {
            detailBox.innerHTML = hiddenDetail.innerHTML;
            detailBox.style.display = 'block';
        }
    }
});
// ==========================
// ФИЛЬТРАЦИЯ КУРСОВ
// ==========================
function filterCourses(category) {
    // Обновляем активную кнопку
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(category) ||
            (category === 'all' && btn.textContent === 'Все')) {
            btn.classList.add('active');
        }
    });

    // Показываем/скрываем карточки
    const cards = document.querySelectorAll('.course-card');
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// ==========================
// ПРОЕКТЫ — МОДАЛКИ
// ==========================
function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal_' + projectId);
    if (modal) modal.style.display = 'flex';
}

function closeProjectModal(modalId) {
    const modal = document.getElementById('projectModal_' + modalId);
    if (modal) modal.style.display = 'none';
}

function closeProjectModalOutside(e, modalId) {
    if (e.target.id === 'projectModal_' + modalId) {
        closeProjectModal(modalId);
    }
}