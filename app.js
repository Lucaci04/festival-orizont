// ============================================================================
// FESTIVALUL ORIZONT 2026 • PLAJA BELVEDERE, CONSTANȚA
// Retro-Modern Interactive Controller
// ============================================================================

const POSTER_LINEUPS = {
  usoara: {
    venue: '21–23 AUGUST 2026<br /><span>AMFITEATRUL PE NISIP „PLAJA BELVEDERE NORD”, CONSTANȚA</span>',
    orchestra: {
      title: 'Orchestra Reverberații Maritime a Festivalului „Orizont”',
      conductor: 'Dirijor principal: <strong>Maestrul Cezar Vornicu</strong> • Aranjamente simfonice: <strong>Toma Filotti</strong>'
    },
    artists: [
      { name: 'MIRUNA STĂNESCU', role: 'Recital Extraordinar • Șlagăr & Neo-Soul' },
      { name: 'CEZAR VORNICU & ORCHESTRA', role: 'Gala Simfonică de Deschidere' },
      { name: 'VLADIMIR CĂLINESCU', role: 'Vocea de Catifea a Falezei' },
      { name: 'CLARA VÂLCEANU', role: 'Laureata Trofeului Orizont' },
      { name: 'SEXTETUL „DELFINUL DE AUR”', role: 'Jazz-Pop & Bossa Nova de Litoral' },
      { name: 'AURELIA ȘERBAN', role: 'Recital Aniversar 30 de Veri la Mare' },
      { name: 'SORINEL & MAGNETIC BAND', role: 'Disco-Funk Analogic' },
      { name: 'ELENA DOBROGEANU', role: 'Soprană Crossover & Harfă' }
    ]
  },
  alternativ: {
    venue: '21–23 AUGUST 2026<br /><span>DIGUL DE LA FARUL DE CRISTAL • GOLFUL BELVEDERE, CONSTANȚA</span>',
    orchestra: {
      title: 'Ansamblul Electro-Acustic „Sintetizatorul de Seară”',
      conductor: 'Direcție muzicală & sintetizatoare modulare: <strong>Andrei Hanganu</strong>'
    },
    artists: [
      { name: 'SOLARIS ’84', role: 'Synth-Pop & Italo-Disco de Litoral' },
      { name: 'KRONOS RIVIERA', role: 'Live Analogic pe Dig la Miezul Nopții' },
      { name: 'VERA & COMETELE', role: 'Dream-Pop & Indie-Surf Constanța' },
      { name: 'DIANA COMAN & ORIZONT', role: 'Electro-Acustic la Răsărit' },
      { name: 'VICTOR HANGANU TRIO', role: 'Nu-Jazz & Saxofon Bariton pe Plajă' },
      { name: 'MAGDA IONESCU', role: 'New Wave & Balade Electrice' },
      { name: 'FARUL VECHI COLLECTIVE', role: 'Post-Disco & Percuție Marină' }
    ]
  }
};

// ============================================================================
// 1. RENDER POSTER LINEUP
// ============================================================================
function renderLineupSection(key) {
  const data = POSTER_LINEUPS[key] || POSTER_LINEUPS.usoara;
  const venueEl = document.getElementById('lineupVenueHeader');
  const headlinersEl = document.getElementById('lineupHeadliners');
  const orchestraEl = document.getElementById('orchestraCredit');

  if (venueEl) venueEl.innerHTML = data.venue;

  if (headlinersEl) {
    headlinersEl.innerHTML = data.artists
      .map(
        (artist) => `
        <div class="headliner-row">
          ${artist.name}
          <small>${artist.role}</small>
        </div>
      `
      )
      .join('');
  }

  if (orchestraEl) {
    orchestraEl.innerHTML = `
      <h2>${data.orchestra.title}</h2>
      <p>${data.orchestra.conductor}</p>
    `;
  }

  document.querySelectorAll('.lineup-tab').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.tab === key);
  });
}

// ============================================================================
// 2. RETRO-MODERN KINETIC SWIRLS CANVAS (PURPLE-BLUE-GOLD SILK WAVES)
// ============================================================================
function initSwirlsCanvas() {
  const canvas = document.getElementById('swirlsCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  let phase = 0;

  const ribbons = [
    { color: 'rgba(168, 85, 247, 0.22)', amp: 55, freq: 0.0022, speed: 0.012, yOffset: 0.25, width: 2.5 },
    { color: 'rgba(56, 189, 248, 0.20)', amp: 70, freq: 0.0018, speed: 0.016, yOffset: 0.48, width: 2.0 },
    { color: 'rgba(245, 194, 107, 0.16)', amp: 45, freq: 0.0026, speed: 0.010, yOffset: 0.72, width: 1.5 },
    { color: 'rgba(240, 78, 86, 0.14)', amp: 60, freq: 0.0020, speed: 0.014, yOffset: 0.85, width: 2.0 }
  ];

  function draw() {
    ctx.clearRect(0, 0, width, height);
    phase += 1;

    ribbons.forEach((r, idx) => {
      ctx.beginPath();
      const baseY = height * r.yOffset;
      for (let x = 0; x <= width; x += 16) {
        const y =
          baseY +
          Math.sin(x * r.freq + phase * r.speed + idx) * r.amp +
          Math.cos(x * r.freq * 0.5 - phase * r.speed * 0.7) * (r.amp * 0.4);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.strokeStyle = r.color;
      ctx.lineWidth = r.width;
      ctx.stroke();
    });

    requestAnimationFrame(draw);
  }

  draw();
}

// ============================================================================
// 3. INTERACTIVE CONTEST VOTING & MODALS
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  renderLineupSection('usoara');
  initSwirlsCanvas();

  // Switch lineup via tabs
  document.querySelectorAll('.lineup-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      renderLineupSection(tab.dataset.tab);
    });
  });

  // Switch lineup when clicking one of the 2 hero posters
  document.querySelectorAll('[data-select-tab]').forEach((link) => {
    link.addEventListener('click', () => {
      renderLineupSection(link.dataset.selectTab);
    });
  });

  // Custom checkbox vote styling & submission
  const voteLabels = document.querySelectorAll('.custom-checkbox-vote');
  voteLabels.forEach((label) => {
    const input = label.querySelector('input');
    input.addEventListener('change', () => {
      voteLabels.forEach((l) => l.classList.remove('checked'));
      if (input.checked) {
        label.classList.add('checked');
      }
    });
  });

  const voteForm = document.getElementById('publicVoteForm');
  if (voteForm) {
    voteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const checkedLabel = voteForm.querySelector('.custom-checkbox-vote.checked');
      if (!checkedLabel) return;

      const countEl = checkedLabel.querySelector('.vote-count');
      const currentVotes = Number(countEl.dataset.votes || 400) + 1;
      countEl.dataset.votes = String(currentVotes);
      countEl.textContent = `${currentVotes} voturi`;

      const songTitle = checkedLabel.querySelector('input').value;
      document.getElementById('voteConfirmation').textContent =
        `Votul tău pentru piesa „${songTitle}” a fost înregistrat în clasamentul publicului!`;
    });
  }

  // Modal helpers
  function openModal(id) {
    const m = document.getElementById(id);
    if (m) {
      m.classList.add('open');
      m.setAttribute('aria-hidden', 'false');
    }
  }

  function closeModal(id) {
    const m = document.getElementById(id);
    if (m) {
      m.classList.remove('open');
      m.setAttribute('aria-hidden', 'true');
    }
  }

  document.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', () => closeModal(btn.dataset.closeModal));
  });

  document.querySelectorAll('.modal-overlay').forEach((overlay) => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden', 'true');
      }
    });
  });

  // Ticket Modal triggers
  const tZone = document.getElementById('tZone');
  const tCount = document.getElementById('tCount');
  const tTotalDisplay = document.getElementById('tTotalDisplay');
  const ticketStubResult = document.getElementById('ticketStubResult');

  function updateTicketPrice() {
    const price = Number(tZone.value) || 390;
    const qty = Number(tCount.value) || 1;
    tTotalDisplay.textContent = `${price * qty} RON`;
  }

  document.querySelectorAll('[data-open-ticket]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.getElementById('ticketModalCategory').textContent = btn.dataset.openTicket;
      ticketStubResult.hidden = true;
      updateTicketPrice();
      openModal('ticketModal');
    });
  });

  tZone.addEventListener('change', updateTicketPrice);
  tCount.addEventListener('change', updateTicketPrice);

  document.getElementById('ticketForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const holder = document.getElementById('tName').value.trim() || 'INVITAT FESTIVAL';
    const zoneText = tZone.options[tZone.selectedIndex].text.split('—')[0].trim();
    document.getElementById('stubHolder').textContent = holder.toUpperCase();
    document.getElementById('stubZoneText').textContent = `${zoneText} • Plaja Belvedere`;
    document.getElementById('stubSerial').textContent = `#ALB-${Math.floor(1000 + Math.random() * 9000)}`;
    ticketStubResult.hidden = false;
  });

  // Press Accreditation Modal triggers
  document.getElementById('openPressBtn').addEventListener('click', () => openModal('pressModal'));
  document.querySelectorAll('[data-open-press]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.getElementById('pressModalSection').textContent =
        `Secțiunea: ${btn.dataset.openPress} • 21–23 August 2026`;
      openModal('pressModal');
    });
  });

  document.getElementById('pressForm').addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('pressFeedback').textContent =
      'Cererea de acreditare a fost înregistrată la Biroul de Presă Belvedere Constanța.';
  });

  // Official Rules Modal
  document.getElementById('openRulesBtn').addEventListener('click', () => openModal('rulesModal'));
});
