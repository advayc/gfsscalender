'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, CalendarDays, ChevronDown, MoveRight } from 'lucide-react';

function MountainMark() {
  return (
    <svg
      className="landing-mountain"
      viewBox="0 0 1600 520"
      role="img"
      aria-label="Layered mountain landscape"
      preserveAspectRatio="none"
    >
      <path className="mountain-line mountain-line-back" d="M0 382 L170 260 L260 318 L440 116 L555 235 L720 54 L895 276 L1080 128 L1240 256 L1408 74 L1600 228" />
      <path className="mountain-fill mountain-fill-back" d="M0 382 L170 260 L260 318 L440 116 L555 235 L720 54 L895 276 L1080 128 L1240 256 L1408 74 L1600 228 V520 H0 Z" />
      <path className="mountain-line mountain-line-mid" d="M0 438 L214 310 L370 390 L560 206 L702 302 L868 178 L1026 344 L1228 206 L1398 334 L1600 224" />
      <path className="mountain-fill mountain-fill-mid" d="M0 438 L214 310 L370 390 L560 206 L702 302 L868 178 L1026 344 L1228 206 L1398 334 L1600 224 V520 H0 Z" />
      <path className="mountain-line mountain-line-front" d="M0 480 L156 408 L312 454 L496 326 L660 420 L838 300 L1000 430 L1176 326 L1350 414 L1600 332" />
      <path className="mountain-fill mountain-fill-front" d="M0 480 L156 408 L312 454 L496 326 L660 420 L838 300 L1000 430 L1176 326 L1350 414 L1600 332 V520 H0 Z" />
      <path className="mountain-snow" d="M690 94 L720 54 L752 94 L735 87 L720 112 L706 88 Z M413 153 L440 116 L468 153 L450 145 L440 165 L428 146 Z M1384 108 L1408 74 L1438 112 L1416 101 L1406 122 Z" />
    </svg>
  );
}

export default function LandingPage() {
  return (
    <main className="landing-shell">
      <nav className="landing-nav" aria-label="Main navigation">
        <Link className="landing-brand" href="/">
          <span className="brand-symbol"><CalendarDays size={18} strokeWidth={2.5} /></span>
          <span>GFSS Calendar</span>
        </Link>
        <div className="landing-nav-meta">
          <span>For Glenforest students</span>
          <Link className="nav-link" href="/calendar">Open calendar <ArrowUpRight size={15} /></Link>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="hero-kicker"><span>One shared schedule</span><span>Glenforest Secondary School</span></div>
        <div className="hero-copy">
          <h1>Everything happening<br /><em>at GFSS.</em></h1>
          <p className="hero-description">One clear place for every club, meeting, and school event. Find your next thing without digging through scattered posts.</p>
          <div className="hero-actions">
            <Link className="primary-action" href="/calendar">Get started <MoveRight size={18} /></Link>
            <a className="text-action" href="#about">See how it works <ChevronDown size={17} /></a>
          </div>
        </div>
        <CalendarPreview />
      </section>

      <section className="landing-specs" id="about">
        <div className="spec-grid">
          <article><span className="spec-number">The week</span><h2>See what&apos;s ahead.</h2><p>Move from a full month to the details of a single day and keep every commitment in view.</p></article>
          <article><span className="spec-number">Your clubs</span><h2>Find your people.</h2><p>Filter the calendar by the groups you care about, with colors that make scanning effortless.</p></article>
          <article><span className="spec-number">Your plans</span><h2>Show up ready.</h2><p>Open an event for the time, place, and notes you need before you head out.</p></article>
        </div>
      </section>

      <section className="mountain-section" aria-label="A clear view of what's ahead">
        <div className="mountain-heading"><span>The view ahead</span><p>A shared calendar of<br /><strong>what&apos;s next.</strong></p></div>
        <div className="mountain-frame"><MountainMark /></div>
      </section>

    </main>
  );
}

function CalendarPreview() {
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  return (
    <div className="calendar-preview" aria-label="Interactive preview of the GFSS calendar">
      <div className="preview-toolbar">
        <div className="preview-topbar"><span>September 2026</span><span>GFSS Calendar</span></div>
        <div className="preview-modes" role="group" aria-label="Calendar view">
          {(['month', 'week', 'day'] as const).map((mode) => (
            <button key={mode} className={view === mode ? 'preview-mode active' : 'preview-mode'} onClick={() => setView(mode)}>{mode}</button>
          ))}
        </div>
      </div>
      {view === 'month' && <MonthPreview />}
      {view === 'week' && <WeekPreview />}
      {view === 'day' && <DayPreview />}
    </div>
  );
}

function MonthPreview() {
  return (
    <div className="preview-view">
      <div className="preview-month-title">September 2026</div>
      <div className="preview-weekdays"><span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span></div>
      <div className="preview-month-grid">
        {['30', '31', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'].map((date, index) => <span key={`${date}-${index}`} className={date === '14' ? 'preview-date today' : 'preview-date'}>{date}{date === '16' && <i className="mini-event art" />} {date === '17' && <i className="mini-event sac" />}</span>)}
      </div>
      <div className="preview-event-list"><div><i className="event-dot event-dot-orange" />Robotics club<span>3:30 PM</span></div><div><i className="event-dot event-dot-blue" />SAC meeting<span>Lunch</span></div></div>
    </div>
  );
}

function WeekPreview() {
  return (
    <div className="preview-view preview-schedule">
      <div className="preview-month-title">Sep 13 - Sep 19, 2026</div>
      <div className="schedule-grid"><div className="time-column"><span>9 AM</span><span>10 AM</span><span>11 AM</span><span>12 PM</span><span>1 PM</span><span>2 PM</span><span>3 PM</span></div><div className="schedule-days"><span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><i className="schedule-event art-event">Art Guild GM <small>11:07 AM</small></i><i className="schedule-event athletic-event">Athletic Council <small>8:30 AM</small></i><i className="schedule-event medlife-event">MEDLIFE meeting <small>2:40 PM</small></i></div></div>
    </div>
  );
}

function DayPreview() {
  return (
    <div className="preview-view preview-schedule">
      <div className="preview-month-title">Wednesday, September 16, 2026</div>
      <div className="day-schedule"><span>9 AM</span><span>10 AM</span><span>11 AM</span><span>12 PM</span><span>1 PM</span><span>2 PM</span><span>3 PM</span><i className="day-event art-event">Art Guild GM <small>11:07 AM</small></i><i className="day-event medlife-event">MEDLIFE General Meeting <small>2:40 PM</small></i></div>
    </div>
  );
}