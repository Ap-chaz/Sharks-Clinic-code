/* ============================================================
   SHARKS Clinic Management System — Admin Dashboard
   Script: sidebar navigation, nav menu, calendar, tabs
   ============================================================ */

function toggleSidebar() {
  const s = document.getElementById('sidebar');
  const o = document.getElementById('sidebarOverlay');
  s.classList.toggle('open');
  o.classList.toggle('open');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
}

function toggleNav(el) {
  const sub = el.nextElementSibling;
  const wasOpen = el.classList.contains('open');
  document.querySelectorAll('.nav-parent.open').forEach(p => {
    p.classList.remove('open');
    p.setAttribute('aria-expanded', 'false');
    p.nextElementSibling.classList.remove('open');
  });
  if (!wasOpen) {
    el.classList.add('open');
    el.setAttribute('aria-expanded', 'true');
    sub.classList.add('open');
  }
}

function setPage(el) {
  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.remove('active');
    n.removeAttribute('aria-current');
  });
  el.classList.add('active');
  el.setAttribute('aria-current', 'page');
}

// Allow keyboard activation (Enter / Space) for div-based nav controls
document.querySelectorAll('[role="button"]').forEach(el => {
  el.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      el.click();
    }
  });
});

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
let calViewYear = 2025;
let calViewMonth = 5; // 0-indexed: June
const todayDate = { year: 2025, month: 5, day: 12 };
const apptDaysByMonth = { 5: [2,5,7,9,11,12,14,16,18,21,23,25,28] };

function buildCalendar() {
  const grid = document.getElementById('calGrid');
  const monthLabel = document.getElementById('calMonth');
  if (!grid || !monthLabel) return;

  monthLabel.textContent = `${MONTH_NAMES[calViewMonth]} ${calViewYear}`;

  const apptDays = apptDaysByMonth[calViewMonth] || [];
  const firstDay = new Date(calViewYear, calViewMonth, 1).getDay();
  const daysInMonth = new Date(calViewYear, calViewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(calViewYear, calViewMonth, 0).getDate();

  let html = '<div class="cal-day-name">Su</div><div class="cal-day-name">Mo</div><div class="cal-day-name">Tu</div><div class="cal-day-name">We</div><div class="cal-day-name">Th</div><div class="cal-day-name">Fr</div><div class="cal-day-name">Sa</div>';

  for (let i = 0; i < firstDay; i++) {
    html += `<div class="cal-day other">${daysInPrevMonth - firstDay + i + 1}</div>`;
  }

  for (let d = 1; d <= daysInMonth; d++) {
    let cls = 'cal-day';
    const isToday = calViewYear === todayDate.year && calViewMonth === todayDate.month && d === todayDate.day;
    if (isToday) cls += ' today';
    if (apptDays.includes(d)) cls += ' has-appt';
    html += `<div class="${cls}" tabindex="0" role="button" aria-label="${MONTH_NAMES[calViewMonth]} ${d}, ${calViewYear}${isToday ? ' (today)' : ''}${apptDays.includes(d) ? ' — has appointment' : ''}">${d}</div>`;
  }

  const remaining = (firstDay + daysInMonth) % 7;
  if (remaining > 0) {
    for (let i = 1; i <= 7 - remaining; i++) {
      html += `<div class="cal-day other">${i}</div>`;
    }
  }

  grid.innerHTML = html;
}

buildCalendar();

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', function() {
    this.closest('.tabs').querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
  });
});

const calPrev = document.getElementById('calPrev');
const calNext = document.getElementById('calNext');

if (calPrev) {
  calPrev.addEventListener('click', function() {
    calViewMonth--;
    if (calViewMonth < 0) { calViewMonth = 11; calViewYear--; }
    buildCalendar();
  });
}

if (calNext) {
  calNext.addEventListener('click', function() {
    calViewMonth++;
    if (calViewMonth > 11) { calViewMonth = 0; calViewYear++; }
    buildCalendar();
  });
}
