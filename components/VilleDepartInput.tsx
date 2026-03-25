'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

type VilleDepartInputProps = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
};

export function VilleDepartInput({ value, onChange, placeholder = 'Ex. Paris, Lyon…', className, style }: VilleDepartInputProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{ id?: string; place_name: string }>>([]);
  const debounceRef = useRef<number | null>(null);

  const hasSuggestions = useMemo(() => open && suggestions.length > 0, [open, suggestions.length]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  useEffect(() => {
    const q = value.trim();
    if (!open) return;
    if (q.length < 2) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    setLoading(true);
    debounceRef.current = window.setTimeout(async () => {
      try {
        const res = await fetch(`/api/ville-autocomplete?q=${encodeURIComponent(q)}`, {
          headers: { Accept: 'application/json' },
        });
        const data = (await res.json().catch(() => ({}))) as {
          suggestions?: Array<{ id?: string; place_name: string }>;
        };
        const next = Array.isArray(data.suggestions) ? data.suggestions : [];
        setSuggestions(next);
      } catch {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [value, open]);

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      <input
        className={className}
        style={style}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        autoComplete="off"
        aria-autocomplete="list"
        aria-expanded={hasSuggestions}
      />
      {hasSuggestions && (
        <ul
          role="listbox"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '100%',
            margin: '4px 0 0',
            padding: '6px 0',
            listStyle: 'none',
            background: '#fff',
            border: '1px solid rgba(10,44,52,0.1)',
            borderRadius: 12,
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            maxHeight: 220,
            overflowY: 'auto',
            zIndex: 40,
          }}
        >
          {suggestions.map((s) => (
            <li key={s.id ?? s.place_name}>
              <button
                type="button"
                role="option"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onChange(s.place_name);
                  setOpen(false);
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '10px 14px',
                  border: 'none',
                  background: 'transparent',
                  fontFamily: 'inherit',
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#1a2e1a',
                  cursor: 'pointer',
                }}
              >
                {s.place_name}
              </button>
            </li>
          ))}
        </ul>
      )}
      {loading && (
        <div
          style={{
            position: 'absolute',
            right: 12,
            top: 12,
            fontSize: 12,
            color: '#b0a89e',
            pointerEvents: 'none',
          }}
        >
          Chargement...
        </div>
      )}
    </div>
  );
}
