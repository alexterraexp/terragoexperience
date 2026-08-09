'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ProducerFull } from '../lib/producerTypes';
import { HOME_COLORS } from './home/homeStyles';

const INK = HOME_COLORS.primary;
const ORANGE = HOME_COLORS.orange;

type ProducerDetailModalProps = {
  isOpen: boolean;
  producer: ProducerFull | null;
  onClose: () => void;
};

/** Drag horizontal (touch + souris) pour carrousel — snap à la paire la plus proche. */
function attachHorizontalDrag(el: HTMLElement) {
  let pointerId: number | null = null;
  let startX = 0;
  let startScroll = 0;
  let moved = false;

  const snap = () => {
    const w = el.clientWidth || 1;
    const index = Math.round(el.scrollLeft / w);
    el.scrollTo({ left: index * w, behavior: 'smooth' });
  };

  const onDown = (e: PointerEvent) => {
    // Ne pas capturer si on vise un bouton (flèches / pastilles sont hors track)
    if ((e.target as HTMLElement | null)?.closest?.('button')) return;
    pointerId = e.pointerId;
    startX = e.clientX;
    startScroll = el.scrollLeft;
    moved = false;
    el.style.scrollSnapType = 'none';
    el.setPointerCapture(e.pointerId);
  };
  const onMove = (e: PointerEvent) => {
    if (pointerId !== e.pointerId) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 4) moved = true;
    el.scrollLeft = startScroll - dx;
  };
  const onUp = (e: PointerEvent) => {
    if (pointerId !== e.pointerId) return;
    pointerId = null;
    el.style.scrollSnapType = '';
    snap();
    if (moved) {
      const block = (ev: Event) => {
        ev.preventDefault();
        ev.stopPropagation();
        el.removeEventListener('click', block, true);
      };
      el.addEventListener('click', block, true);
    }
  };

  el.addEventListener('pointerdown', onDown);
  el.addEventListener('pointermove', onMove);
  el.addEventListener('pointerup', onUp);
  el.addEventListener('pointercancel', onUp);
  return () => {
    el.removeEventListener('pointerdown', onDown);
    el.removeEventListener('pointermove', onMove);
    el.removeEventListener('pointerup', onUp);
    el.removeEventListener('pointercancel', onUp);
  };
}

const ProducerDetailModal: React.FC<ProducerDetailModalProps> = ({ isOpen, producer, onClose }) => {
  const [closing, setClosing] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const images = useMemo(() => {
    if (!producer) return [] as string[];
    const fromGallery = producer.gallery.filter(Boolean);
    if (fromGallery.length > 0) return fromGallery;
    return producer.cover ? [producer.cover] : [];
  }, [producer]);

  /** Paires de photos — swipe 2 par 2 */
  const pairs = useMemo(() => {
    const chunks: string[][] = [];
    for (let i = 0; i < images.length; i += 2) {
      chunks.push(images.slice(i, i + 2));
    }
    return chunks;
  }, [images]);

  const histoire = producer
    ? (producer.description?.trim() || producer.highlight?.trim() || '')
    : '';

  const typeLabel = producer?.type?.trim() ?? '';
  const showType = Boolean(typeLabel) && !/^à\s*définir$/i.test(typeLabel);

  const goTo = useCallback((index: number) => {
    const el = trackRef.current;
    if (!el || pairs.length === 0) return;
    const next = ((index % pairs.length) + pairs.length) % pairs.length;
    const slide = el.children[next] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    setImgIndex(next);
  }, [pairs.length]);

  useEffect(() => {
    if (!isOpen) return;
    setImgIndex(0);
    setClosing(false);
    requestAnimationFrame(() => {
      trackRef.current?.scrollTo({ left: 0 });
    });
  }, [isOpen, producer?.id]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || !isOpen || pairs.length < 2) return;
    return attachHorizontalDrag(el);
  }, [isOpen, pairs.length, producer?.id]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || !isOpen) return;
    const onScroll = () => {
      const w = el.clientWidth || 1;
      setImgIndex(Math.round(el.scrollLeft / w));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [isOpen, producer?.id]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 240);
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') goTo(imgIndex - 1);
      if (e.key === 'ArrowRight') goTo(imgIndex + 1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, imgIndex, goTo]);

  if (!isOpen || !producer) return null;

  return (
    <>
      <style>{`
        @keyframes pdmIn  { from { opacity:0; transform:translateY(16px) scale(.985) } to { opacity:1; transform:none } }
        @keyframes pdmOut { from { opacity:1; transform:none } to { opacity:0; transform:translateY(16px) scale(.985) } }
        .pdm-scroll::-webkit-scrollbar { width:0 }
        .pdm-scroll { scrollbar-width:none }
        .pdm-track {
          display: flex;
          width: 100%;
          height: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          cursor: grab;
          touch-action: pan-x;
        }
        .pdm-track::-webkit-scrollbar { display: none }
        .pdm-track:active { cursor: grabbing }
        .pdm-slide {
          flex: 0 0 100%;
          width: 100%;
          height: 100%;
          scroll-snap-align: start;
          scroll-snap-stop: always;
          display: flex;
          gap: 4px;
        }
        .pdm-slide-cell {
          flex: 1 1 50%;
          min-width: 0;
          height: 100%;
          overflow: hidden;
          background: #e8e8e8;
        }
        .pdm-slide-cell img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          pointer-events: none;
          user-select: none;
        }
        @media (max-width: 860px) {
          .pdm-wrapper { padding: 0 !important }
          .pdm-panel { width: 100% !important; max-width: none !important; height: 100dvh !important; border-radius: 0 !important }
          .pdm-scroll { padding-left: 40px !important; padding-right: 40px !important }
        }
      `}</style>

      <div
        onClick={handleClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1200,
          background: 'rgba(12,29,34,0.55)',
          backdropFilter: 'blur(6px)',
          opacity: closing ? 0 : 1,
          transition: 'opacity .24s ease',
        }}
      />

      <div
        className="pdm-wrapper"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1201,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          pointerEvents: 'none',
        }}
      >
        <div
          className="pdm-panel"
          role="dialog"
          aria-modal="true"
          aria-label={producer.name}
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: 920,
            height: 'min(780px, 92vh)',
            background: '#fff',
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 24px 70px rgba(12,29,34,.28)',
            fontFamily: "'Poppins', sans-serif",
            animation: `${closing ? 'pdmOut' : 'pdmIn'} .28s cubic-bezier(.22,1,.36,1) both`,
          }}
        >
          {/* ── Haut : carrousel swipable pleine largeur ── */}
          <div
            style={{
              position: 'relative',
              flex: '0 0 36%',
              minHeight: 0,
              background: '#e8e8e8',
              overflow: 'hidden',
            }}
          >
            {pairs.length > 0 ? (
              <div ref={trackRef} className="pdm-track" aria-label="Galerie photos">
                {pairs.map((pair, pairIndex) => (
                  <div key={`pair-${pairIndex}`} className="pdm-slide">
                    {pair.map((src, i) => (
                      <div
                        key={`${src}-${i}`}
                        className="pdm-slide-cell"
                        style={pair.length === 1 ? { flex: '1 1 100%' } : undefined}
                      >
                        <img
                          src={src}
                          alt={`${producer.name} — photo ${pairIndex * 2 + i + 1}`}
                          draggable={false}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 48,
                }}
                aria-hidden
              >
                🌿
              </div>
            )}

            <button
              type="button"
              onClick={handleClose}
              aria-label="Fermer"
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                zIndex: 2,
                width: 36,
                height: 36,
                border: 'none',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.92)',
                cursor: 'pointer',
                color: INK,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 10px rgba(12,29,34,0.12)',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 17 17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M2 2 15 15M15 2 2 15" />
              </svg>
            </button>

            {pairs.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => goTo(imgIndex - 1)}
                  aria-label="Paire précédente"
                  style={{
                    position: 'absolute',
                    left: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 36,
                    height: 36,
                    border: 'none',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.92)',
                    cursor: 'pointer',
                    color: INK,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 10px rgba(12,29,34,0.12)',
                  }}
                >
                  <ChevronLeft size={18} strokeWidth={1.8} />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(imgIndex + 1)}
                  aria-label="Paire suivante"
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 36,
                    height: 36,
                    border: 'none',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.92)',
                    cursor: 'pointer',
                    color: INK,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 10px rgba(12,29,34,0.12)',
                  }}
                >
                  <ChevronRight size={18} strokeWidth={1.8} />
                </button>
                <div
                  style={{
                    position: 'absolute',
                    bottom: 14,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: 6,
                    padding: '6px 10px',
                    borderRadius: 9999,
                    background: 'rgba(12,29,34,0.35)',
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  {pairs.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Groupe de photos ${i + 1}`}
                      onClick={() => goTo(i)}
                      style={{
                        width: i === imgIndex ? 16 : 6,
                        height: 6,
                        borderRadius: 9999,
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        background: i === imgIndex ? '#fff' : 'rgba(255,255,255,0.45)',
                        transition: 'width .2s ease, background .2s ease',
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* ── Bas : histoire + expériences ── */}
          <div
            className="pdm-scroll"
            style={{
              flex: '1 1 50%',
              minHeight: 0,
              overflowY: 'auto',
              padding: '28px 56px 40px',
            }}
          >
            {showType ? (
              <p
                style={{
                  margin: '0 0 10px',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: ORANGE,
                }}
              >
                {typeLabel}
              </p>
            ) : null}

            <h2
              style={{
                margin: '0 0 10px',
                fontFamily: "'Poppins', sans-serif",
                fontSize: 34,
                fontWeight: 700,
                letterSpacing: '-0.06em',
                lineHeight: 1.1,
                color: INK,
              }}
            >
              {producer.name}
            </h2>

            {producer.location ? (
              <p
                style={{
                  margin: '0 0 26px',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 16,
                  fontWeight: 500,
                  color: 'rgba(12,29,34,0.55)',
                }}
              >
                {producer.location}
              </p>
            ) : null}

            {histoire ? (
              <section style={{ marginBottom: 28 }}>
                <h3
                  style={{
                    margin: '0 0 12px',
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 18,
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    color: INK,
                  }}
                >
                  Leur histoire
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 16,
                    fontWeight: 400,
                    lineHeight: 1.65,
                    letterSpacing: '-0.02em',
                    color: 'rgba(12,29,34,0.68)',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {histoire}
                </p>
                {producer.tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
                    {producer.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: 'rgba(12,29,34,0.06)',
                          color: 'rgba(12,29,34,0.60)',
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: 13,
                          fontWeight: 600,
                          padding: '6px 12px',
                          borderRadius: 9999,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </section>
            ) : null}

            {producer.experiences.length > 0 && (
              <section>
                <h3
                  style={{
                    margin: '0 0 14px',
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 18,
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    color: INK,
                  }}
                >
                  Expériences proposées
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {producer.experiences.map((exp) => (
                    <div
                      key={exp.id}
                      style={{
                        background: '#fff',
                        borderRadius: 12,
                        padding: '16px 18px',
                        border: '1px solid rgba(12,29,34,0.10)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 14,
                      }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 10,
                          background: HOME_COLORS.gray,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 18,
                          flexShrink: 0,
                        }}
                        aria-hidden
                      >
                        {exp.icon || '🌿'}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            gap: 8,
                            flexWrap: 'wrap',
                          }}
                        >
                          <p
                            style={{
                              margin: 0,
                              fontFamily: "'Poppins', sans-serif",
                              fontSize: 16,
                              fontWeight: 700,
                              letterSpacing: '-0.03em',
                              color: INK,
                            }}
                          >
                            {exp.title}
                          </p>
                          {exp.price ? (
                            <span
                              style={{
                                fontFamily: "'Poppins', sans-serif",
                                fontSize: 14,
                                fontWeight: 700,
                                color: ORANGE,
                              }}
                            >
                              {exp.price}
                            </span>
                          ) : null}
                        </div>
                        {exp.duration ? (
                          <p
                            style={{
                              margin: '4px 0 6px',
                              fontFamily: "'Poppins', sans-serif",
                              fontSize: 13,
                              color: 'rgba(12,29,34,0.45)',
                            }}
                          >
                            {exp.duration}
                          </p>
                        ) : null}
                        {exp.desc ? (
                          <p
                            style={{
                              margin: 0,
                              fontFamily: "'Poppins', sans-serif",
                              fontSize: 15,
                              lineHeight: 1.55,
                              color: 'rgba(12,29,34,0.60)',
                            }}
                          >
                            {exp.desc}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProducerDetailModal;
