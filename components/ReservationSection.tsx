"use client";

import { useEffect, useMemo, useState } from "react";
import { reservationConfig, tables, timeGroups } from "@/lib/content";
import { submitReservation } from "@/lib/reservations";
import Photo from "./Photo";

type Day = { iso: string; top: string; day: string; month: string };

const WEEKDAYS = ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"];
const MONTHS = ["led", "úno", "bře", "dub", "kvě", "čvn", "čvc", "srp", "zář", "říj", "lis", "pro"];

const pad = (n: number) => String(n).padStart(2, "0");
const toIso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const toMinutes = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));

function buildDays(): Day[] {
  const now = new Date();
  return Array.from({ length: reservationConfig.daysAhead }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    return {
      iso: toIso(d),
      top: i === 0 ? "Dnes" : i === 1 ? "Zítra" : WEEKDAYS[d.getDay()],
      day: String(d.getDate()),
      month: MONTHS[d.getMonth()],
    };
  });
}

function buildSlots(): string[] {
  const { open, close, stepMinutes } = reservationConfig;
  const out: string[] = [];
  for (let m = toMinutes(open); m <= toMinutes(close); m += stepMinutes) {
    out.push(`${pad(Math.floor(m / 60))}:${pad(m % 60)}`);
  }
  return out;
}

export default function ReservationSection() {
  const [days, setDays] = useState<Day[]>([]);
  const [now, setNow] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [step, setStep] = useState<"date" | "time">("date");
  const [leaving, setLeaving] = useState(false);

  // Data závisí na aktuálním čase, proto až po mountu (bez hydratačního rozdílu).
  useEffect(() => {
    const id = setTimeout(() => {
      setDays(buildDays());
      setNow(new Date());
    }, 0);
    return () => clearTimeout(id);
  }, []);

  const slots = useMemo(() => {
    const all = buildSlots();
    if (!now || date !== toIso(now)) return all;
    const limit = now.getHours() * 60 + now.getMinutes() + 30;
    return all.filter((t) => toMinutes(t) > limit);
  }, [date, now]);

  const activeTable = tables.find((t) => guests <= t.max) ?? tables[tables.length - 1];
  const selectedDay = days.find((d) => d.iso === date);
  const ready = Boolean(date && time && name.trim() && phone.trim() && email.trim());

  function goTo(next: "date" | "time") {
    setLeaving(true);
    setTimeout(() => {
      setStep(next);
      setLeaving(false);
    }, 200);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ready || !date || !time) return;
    setStatus("sending");
    await submitReservation({ guests, date, time, name, phone, email, note });
    setStatus("done");
  }

  function reset() {
    setStatus("idle");
    setDate(null);
    setTime(null);
    setNote("");
    setStep("date");
  }

  const whenLabel =
    selectedDay && (selectedDay.top === "Dnes" || selectedDay.top === "Zítra")
      ? selectedDay.top.toLowerCase()
      : selectedDay
        ? `${selectedDay.top} ${selectedDay.day}. ${selectedDay.month}`
        : "";

  return (
    <section id="kontakt" className="section section--contact">
      <h2 className="display display--offer">Dáme <em className="serif">kafe?</em></h2>

      <div className="reserve">
        <div className="reserve__visual">
          {tables.map((t) => (
            <div key={t.max} className="reserve__photo" data-active={t === activeTable} aria-hidden={t !== activeTable}>
              <Photo photo={t.photo} />
            </div>
          ))}
          <div className="reserve__tab">
            <span>Rezervace</span>
          </div>
        </div>

        <div className="reserve__panel">
          {status === "done" ? (
            <div className="reserve__done" role="status">
              <p className="reserve__done-title">
                Máme to, <em className="serif">{name.trim().split(" ")[0]}.</em>
              </p>
              <p className="reserve__done-text">Stůl pro {guests} · {whenLabel} · {time}</p>
              <button type="button" className="textlink" onClick={reset}>Nová rezervace</button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <fieldset className="reserve__group">
                <legend>Počet hostů</legend>
                <div className="chips">
                  {Array.from({ length: reservationConfig.maxGuests }, (_, i) => i + 1).map((n) => (
                    <button key={n} type="button" className="chip chip--round" aria-pressed={guests === n} onClick={() => setGuests(n)}>
                      {n === reservationConfig.maxGuests ? `${n}+` : n}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="reserve__slot">
                {step === "date" ? (
                  <fieldset className="reserve__group reserve__step" data-leaving={leaving}>
                    <legend>Datum</legend>
                    <div className="days">
                      {days.map((d) => (
                        <button
                          key={d.iso}
                          type="button"
                          className="chip chip--day"
                          aria-pressed={date === d.iso}
                          onClick={() => {
                            if (date !== d.iso) setTime(null);
                            setDate(d.iso);
                            goTo("time");
                          }}
                        >
                          <span className="chip__top">{d.top}</span>
                          <span className="chip__day">{d.day}</span>
                          <span className="chip__top">{d.month}</span>
                        </button>
                      ))}
                    </div>
                  </fieldset>
                ) : (
                  <fieldset className="reserve__group reserve__step" data-leaving={leaving}>
                    <legend>Čas</legend>
                    <button type="button" className="reserve__change" onClick={() => goTo("date")}>
                      {whenLabel} · změnit
                    </button>
                    {slots.length === 0 ? (
                      <p className="reserve__hint">Na dnes už nemáme volné časy, zkuste jiný den.</p>
                    ) : (
                      <div className="times">
                        {timeGroups.map((g) => {
                          const items = slots.filter((t) => t >= g.from && t <= g.to);
                          if (items.length === 0) return null;
                          return (
                            <div key={g.label} className="times__group">
                              <span className="times__label">{g.label}</span>
                              <div className="chips chips--grid">
                                {items.map((t) => (
                                  <button key={t} type="button" className="chip" aria-pressed={time === t} onClick={() => setTime(t)}>
                                    {t}
                                  </button>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </fieldset>
                )}
              </div>

              <div className="reserve__fields">
                <label className="field">
                  <span>Jméno a příjmení</span>
                  <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
                </label>
                <label className="field">
                  <span>Telefon</span>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" autoComplete="tel" required />
                </label>
                <label className="field">
                  <span>E-mail</span>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" required />
                </label>
                <label className="field">
                  <span>Poznámka (nepovinné)</span>
                  <input value={note} onChange={(e) => setNote(e.target.value)} />
                </label>
              </div>

              <button type="submit" className="btn-cta btn-cta--wide" disabled={!ready || status === "sending"}>
                {status === "sending" ? "Odesílám…" : "Odeslat rezervaci"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
