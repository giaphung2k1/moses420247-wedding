const memoryPhotos = [
    {
        src: 'assets/photo-11.jpg',
        titleEn: 'Candlelight & White Roses',
        titleVi: 'Ánh nến & Hoa hồng trắng',
        captionEn: 'Surrounded by candlelight, white roses, and the quiet certainty of forever.',
        captionVi: 'Giữa ánh nến lung linh, hoa hồng trắng và lời hẹn ước trọn đời.'
    },
    {
        src: 'assets/photo-08.jpg',
        titleEn: 'Sunlit Courtyards',
        titleVi: 'Khoảng sân ngập nắng',
        captionEn: 'Sunlit courtyards & everyday grace.',
        captionVi: 'Khoảng sân ngập nắng & dịu dàng mỗi ngày.'
    },
    {
        src: 'assets/photo-01.jpg',
        titleEn: 'Museum Strolls',
        titleVi: 'Dạo bước bảo tàng',
        captionEn: 'Afternoon strolls & art museum dates.',
        captionVi: 'Dạo bước buổi chiều tại bảo tàng nghệ thuật.'
    },
    {
        src: 'assets/photo-02.jpg',
        titleEn: 'Under Patio Lights',
        titleVi: 'Dưới ánh đèn ấm áp',
        captionEn: 'Stolen kisses under warm patio lights.',
        captionVi: 'Nụ hôn ngọt ngào dưới ánh đèn ấm áp.'
    },
    {
        src: 'assets/photo-04.jpg',
        titleEn: 'Blue Skies Together',
        titleVi: 'Dưới bầu trời xanh',
        captionEn: 'Blue skies & unhurried weekends.',
        captionVi: 'Bầu trời xanh & những ngày cuối tuần bình yên.'
    },
    {
        src: 'assets/photo-06.jpg',
        titleEn: 'An Evening Out',
        titleVi: 'Buổi tối kỷ niệm',
        captionEn: 'Dressed up for an evening of celebration.',
        captionVi: 'Sánh đôi trong một buổi tối kỷ niệm.'
    },
    {
        src: 'assets/photo-10.jpg',
        titleEn: 'Cozy Nights & Dimples',
        titleVi: 'Đêm bình yên & má lúm',
        captionEn: 'Cozy nights, soft lights & double dimples.',
        captionVi: 'Đêm bình yên, ánh đèn dịu & nụ cười má lúm.'
    },
    {
        src: 'assets/photo-13.jpg',
        titleEn: 'Florida Sunshine',
        titleVi: 'Nắng ấm Florida',
        captionEn: 'Palm trees, pink hues & Florida sunshine.',
        captionVi: 'Hàng cọ xanh, sắc hồng & nắng ấm Florida.'
    }
];

const modal = document.querySelector('dialog');
const modalImg = modal.querySelector('img');
const modalCaption = document.querySelector('#dialog-caption');
let currentDialogIndex = 0;

function showDialogPhoto(index) {
    currentDialogIndex = (index + memoryPhotos.length) % memoryPhotos.length;
    const item = memoryPhotos[currentDialogIndex];
    modalImg.style.opacity = '0.25';
    setTimeout(() => {
        modalImg.src = item.src;
        if (modalCaption) modalCaption.textContent = item.captionEn;
        modalImg.style.opacity = '1';
    }, 120);
}

document.querySelectorAll('[data-photo]').forEach(b => {
    b.addEventListener('click', () => {
        const photoSrc = b.dataset.photo;
        const foundIdx = memoryPhotos.findIndex(p => p.src === photoSrc);
        currentDialogIndex = foundIdx >= 0 ? foundIdx : 0;
        const item = memoryPhotos[currentDialogIndex];
        modalImg.src = item.src;
        if (modalCaption) modalCaption.textContent = b.dataset.captionEn || item.captionEn;
        modal.showModal();
    });
});

const closeBtn = modal.querySelector('.dialog-close') || modal.querySelector('button');
if (closeBtn) closeBtn.addEventListener('click', () => modal.close());
const prevDialogBtn = document.querySelector('#dialog-prev');
const nextDialogBtn = document.querySelector('#dialog-next');
if (prevDialogBtn) prevDialogBtn.addEventListener('click', () => showDialogPhoto(currentDialogIndex - 1));
if (nextDialogBtn) nextDialogBtn.addEventListener('click', () => showDialogPhoto(currentDialogIndex + 1));
modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });

document.querySelector('#calendar').addEventListener('click', () => {
    const ics = 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Monique and Rhonda//Wedding//EN\r\nBEGIN:VEVENT\r\nUID:monique-rhonda-20270207\r\nDTSTAMP:20261105T000000Z\r\nDTSTART:20270207T213000Z\r\nSUMMARY:Monique and Rhonda Wedding Celebration\r\nLOCATION:Private Residence, Royal Palm Beach, Florida\r\nDESCRIPTION:Guest arrival 4:30 PM EST. Symbolic ceremony 5 PM. Cocktail hour 5:30 PM. Party starts 6 PM.\r\nEND:VEVENT\r\nEND:VCALENDAR';
    download(ics, 'monique-rhonda.ics', 'text/calendar');
});

function download(content, name, type) {
    const u = URL.createObjectURL(new Blob([content], { type }));
    const a = document.createElement('a');
    a.href = u;
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(u), 2000);
}

const form = document.querySelector('form');
form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    download(
        'RSVP — Monique & Rhonda\n\n' + Object.entries(data).map(([k, v]) => k + ': ' + v).join('\n'),
        'RSVP-Monique-Rhonda.txt',
        'text/plain;charset=utf-8'
    );
    document.querySelector('.status').textContent = t(
        'Your response file is ready. It has not been sent. Please share the downloaded file with Monique and Rhonda directly.',
        'Tệp phản hồi đã sẵn sàng, chưa được gửi. Vui lòng gửi tệp vừa tải trực tiếp cho Monique và Rhonda.'
    );
});

function t(en, vi) { return en; }

/* Gentle Crossfade on Featured Standout Photo + Interactive 3D Photo Album Flipbook */
const featuredCard = document.querySelector('#featured-memory-card');
const featuredStage = featuredCard ? featuredCard.querySelector('.featured-stage') : null;
const primaryImg = featuredCard ? featuredCard.querySelector('.featured-img--primary') : null;
const secondaryImg = featuredCard ? featuredCard.querySelector('.featured-img--secondary') : null;
const featuredTitle = featuredCard ? featuredCard.querySelector('.featured-caption-title') : null;
const featuredText = featuredCard ? featuredCard.querySelector('.featured-caption-text') : null;
const fadeToggleBtn = document.querySelector('#gentle-fade-toggle');
const fadeLabel = fadeToggleBtn ? fadeToggleBtn.querySelector('.fade-label') : null;

let featuredSpotlightIdx = 0;
let gentleFadeActive = true;
let activeViewMode = 'grid';

function crossfadeFeaturedTo(nextIdx) {
    if (!featuredCard || !featuredStage || !primaryImg || !secondaryImg) return;
    featuredSpotlightIdx = (nextIdx + memoryPhotos.length) % memoryPhotos.length;
    const item = memoryPhotos[featuredSpotlightIdx];

    secondaryImg.src = item.src;
    featuredStage.classList.add('is-crossfading');

    if (featuredTitle) featuredTitle.textContent = item.titleEn;
    if (featuredText) featuredText.textContent = item.captionEn;
    featuredCard.dataset.photo = item.src;
    featuredCard.dataset.captionEn = item.captionEn;

    setTimeout(() => {
        primaryImg.src = item.src;
        featuredStage.classList.remove('is-crossfading');
    }, 1420);
}

/* Interactive Flipbook Logic (4 spreads x 2 pages = 8 photos) */
const albumLeftNum = document.querySelector('#album-left-num');
const albumLeftImg = document.querySelector('#album-left-img');
const albumLeftCaption = document.querySelector('#album-left-caption');
const albumRightNum = document.querySelector('#album-right-num');
const albumRightImg = document.querySelector('#album-right-img');
const albumRightCaption = document.querySelector('#album-right-caption');
const albumTurnLeaf = document.querySelector('#album-turn-leaf');
const leafFrontNum = document.querySelector('#leaf-front-num');
const leafFrontImg = document.querySelector('#leaf-front-img');
const leafFrontCaption = document.querySelector('#leaf-front-caption');
const leafBackNum = document.querySelector('#leaf-back-num');
const leafBackImg = document.querySelector('#leaf-back-img');
const leafBackCaption = document.querySelector('#leaf-back-caption');
const albumDots = document.querySelectorAll('.album-dot');
const totalSpreads = 4;
let currentSpread = 0;
let isTurningPage = false;

function formatPageNumber(n) {
    return String(n).padStart(2, '0');
}

function renderSpreadImmediate(spreadIdx) {
    const leftIdx = (spreadIdx * 2) % memoryPhotos.length;
    const rightIdx = (spreadIdx * 2 + 1) % memoryPhotos.length;
    const leftItem = memoryPhotos[leftIdx];
    const rightItem = memoryPhotos[rightIdx];

    if (albumLeftNum) albumLeftNum.textContent = formatPageNumber(leftIdx + 1);
    if (albumLeftImg) albumLeftImg.src = leftItem.src;
    if (albumLeftCaption) albumLeftCaption.textContent = leftItem.captionEn;

    if (albumRightNum) albumRightNum.textContent = formatPageNumber(rightIdx + 1);
    if (albumRightImg) albumRightImg.src = rightItem.src;
    if (albumRightCaption) albumRightCaption.textContent = rightItem.captionEn;

    albumDots.forEach((dot, idx) => {
        dot.classList.toggle('is-active', idx === spreadIdx);
    });
}

function turnToSpread(targetSpread, direction = 'next') {
    const nextSpread = (targetSpread + totalSpreads) % totalSpreads;
    if (isTurningPage || nextSpread === currentSpread) return;

    if (!albumTurnLeaf || window.innerWidth <= 980) {
        currentSpread = nextSpread;
        renderSpreadImmediate(currentSpread);
        return;
    }

    isTurningPage = true;
    const currRightIdx = (currentSpread * 2 + 1) % memoryPhotos.length;
    const nextLeftIdx = (nextSpread * 2) % memoryPhotos.length;

    if (leafFrontNum) leafFrontNum.textContent = formatPageNumber(currRightIdx + 1);
    if (leafFrontImg) leafFrontImg.src = memoryPhotos[currRightIdx].src;
    if (leafFrontCaption) leafFrontCaption.textContent = memoryPhotos[currRightIdx].captionEn;

    if (leafBackNum) leafBackNum.textContent = formatPageNumber(nextLeftIdx + 1);
    if (leafBackImg) leafBackImg.src = memoryPhotos[nextLeftIdx].src;
    if (leafBackCaption) leafBackCaption.textContent = memoryPhotos[nextLeftIdx].captionEn;

    const animClass = direction === 'prev' ? 'is-turning-prev' : 'is-turning-next';
    albumTurnLeaf.classList.remove('is-turning-next', 'is-turning-prev');
    void albumTurnLeaf.offsetWidth;
    albumTurnLeaf.classList.add(animClass);

    setTimeout(() => {
        currentSpread = nextSpread;
        renderSpreadImmediate(currentSpread);
    }, 380);

    setTimeout(() => {
        albumTurnLeaf.classList.remove('is-turning-next', 'is-turning-prev');
        isTurningPage = false;
    }, 790);
}

const albumPrevBtn = document.querySelector('#album-prev');
const albumNextBtn = document.querySelector('#album-next');
if (albumPrevBtn) albumPrevBtn.addEventListener('click', () => turnToSpread(currentSpread - 1, 'prev'));
if (albumNextBtn) albumNextBtn.addEventListener('click', () => turnToSpread(currentSpread + 1, 'next'));
albumDots.forEach(dot => {
    dot.addEventListener('click', () => {
        const target = Number(dot.dataset.spread || 0);
        turnToSpread(target, target > currentSpread ? 'next' : 'prev');
    });
});

/* View Switcher (Editorial Focal Grid vs Interactive Photo Album) */
const viewTabs = document.querySelectorAll('.view-tab');
const gridPanel = document.querySelector('#memories-grid-view');
const flipbookPanel = document.querySelector('#memories-flipbook-view');

viewTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const mode = tab.dataset.view;
        activeViewMode = mode;
        viewTabs.forEach(tBtn => {
            const active = tBtn === tab;
            tBtn.classList.toggle('is-active', active);
            tBtn.setAttribute('aria-selected', String(active));
        });
        if (gridPanel && flipbookPanel) {
            gridPanel.hidden = mode !== 'grid';
            flipbookPanel.hidden = mode !== 'flipbook';
        }
    });
});

if (fadeToggleBtn) {
    fadeToggleBtn.addEventListener('click', () => {
        gentleFadeActive = !gentleFadeActive;
        fadeToggleBtn.classList.toggle('is-active', gentleFadeActive);
        fadeToggleBtn.setAttribute('aria-pressed', String(gentleFadeActive));
        if (fadeLabel) {
            fadeLabel.textContent = gentleFadeActive ? 'Gentle Crossfade: On' : 'Gentle Crossfade: Paused';
        }
    });
}

setInterval(() => {
    if (!gentleFadeActive || modal.open) return;
    if (activeViewMode === 'grid') {
        crossfadeFeaturedTo(featuredSpotlightIdx + 1);
    } else if (activeViewMode === 'flipbook') {
        turnToSpread(currentSpread + 1, 'next');
    }
}, 5400);

document.addEventListener('keydown', e => {
    if (modal.open) {
        if (e.key === 'ArrowLeft') showDialogPhoto(currentDialogIndex - 1);
        if (e.key === 'ArrowRight') showDialogPhoto(currentDialogIndex + 1);
    } else if (activeViewMode === 'flipbook') {
        if (e.key === 'ArrowLeft') turnToSpread(currentSpread - 1, 'prev');
        if (e.key === 'ArrowRight') turnToSpread(currentSpread + 1, 'next');
    }
});

const weddingAudio = document.querySelector('#wedding-audio');
const musicToggle = document.querySelector('#music-toggle');
const musicLabel = musicToggle.querySelector('.music-label');
function updateMusicButton() {
    const playing = !weddingAudio.paused;
    musicToggle.classList.toggle('is-playing', playing);
    musicToggle.setAttribute('aria-pressed', String(playing));
    musicToggle.setAttribute('aria-label', playing ? 'Pause wedding music' : 'Play wedding music');
    musicLabel.textContent = playing ? 'Pause music' : 'Play music';
}
musicToggle.addEventListener('click', async () => {
    if (weddingAudio.paused) {
        try { await weddingAudio.play(); } catch { musicLabel.textContent = 'Music file unavailable'; }
    } else weddingAudio.pause();
});
weddingAudio.addEventListener('play', updateMusicButton);
weddingAudio.addEventListener('pause', updateMusicButton);
weddingAudio.addEventListener('ended', updateMusicButton);
document.querySelectorAll('video').forEach(v => v.addEventListener('play', () => weddingAudio.pause()));
async function tryAutoplay() {
    try {
        await weddingAudio.play();
    } catch {
        const resumeOnInteraction = e => {
            if (e.target === musicToggle || musicToggle.contains(e.target)) return;
            weddingAudio.play().then(() => {
                document.removeEventListener('pointerdown', resumeOnInteraction, true);
                document.removeEventListener('keydown', resumeOnInteraction, true);
            }).catch(() => {});
        };
        document.addEventListener('pointerdown', resumeOnInteraction, true);
        document.addEventListener('keydown', resumeOnInteraction, true);
    }
}
tryAutoplay();
const motion = matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !motion.matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
        }
    }), { threshold: .06 });
    document.querySelectorAll('.intro h2,.intro p,.story-grid>div,.section-head,.proposal-grid>article,.event-grid,.event-info>div,.gallery>button,.films>div,.gift-card,.gift-moment,.rsvp-wrap>div').forEach((e, i) => {
        e.classList.add('reveal');
        e.style.setProperty('--delay', Math.min(i % 4 * 65, 195) + 'ms');
        observer.observe(e);
    });
    document.body.classList.add('motion-ready');
}

