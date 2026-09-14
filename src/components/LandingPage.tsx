import Link from 'next/link';
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
          <span>GFSS / CALENDAR</span>
        </Link>
        <div className="landing-nav-meta">
          <span className="status-dot" aria-hidden="true" />
          <span>STUDENT ACTIVITY COUNCIL</span>
          <Link className="nav-link" href="/calendar">OPEN CALENDAR <ArrowUpRight size={15} /></Link>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="hero-kicker"><span>01</span><span>ONE SHARED SCHEDULE</span><span>GFSS / MISSISSAUGA</span></div>
        <div className="hero-copy">
          <p className="hero-index">[ CLUBS / EVENTS / MEETINGS ]</p>
          <h1>Everything happening<br /><em>at GFSS.</em></h1>
          <p className="hero-description">One clear place for every club, meeting, and school event. Find your next thing without digging through scattered posts.</p>
          <div className="hero-actions">
            <Link className="primary-action" href="/calendar">Get started <MoveRight size={18} /></Link>
            <a className="text-action" href="#about">See how it works <ChevronDown size={17} /></a>
          </div>
        </div>
        <div className="hero-stamp" aria-hidden="true">
          <span>FIELD</span><strong>01</strong><span>ACTIVE</span>
        </div>
      </section>

      <section className="landing-specs" id="about">
        <div className="section-label"><span>02</span><span>BUILT FOR GFSS</span></div>
        <div className="spec-grid">
          <article><span className="spec-number">A / 01</span><h2>See the whole week.</h2><p>Switch from a full month to the details of a single day and keep every commitment in view.</p></article>
          <article><span className="spec-number">B / 02</span><h2>Find your clubs.</h2><p>Filter the calendar by the groups you care about, with colors that make scanning effortless.</p></article>
          <article><span className="spec-number">C / 03</span><h2>Show up ready.</h2><p>Open an event for the time, place, and notes you need before you head out.</p></article>
        </div>
      </section>

      <section className="mountain-section" aria-label="A clear view of what's ahead">
        <div className="mountain-heading"><span>03 / THE VIEW AHEAD</span><p>A shared map of<br /><strong>what&apos;s next.</strong></p></div>
        <div className="mountain-frame"><MountainMark /><span className="mountain-caption">Glenforest Secondary School<br />Student life, in one view.</span><span className="mountain-coordinate">43°35&apos;N / 79°38&apos;W</span></div>
      </section>

      <footer className="landing-footer"><span>GFSS CALENDAR</span><span>MADE FOR THE PEOPLE WHO MAKE SCHOOL HAPPEN</span><Link href="/calendar">VIEW CALENDAR <ArrowUpRight size={15} /></Link></footer>
    </main>
  );
}