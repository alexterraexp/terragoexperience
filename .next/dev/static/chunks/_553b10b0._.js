(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/supabase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase,
    "supabaseServer",
    ()=>supabaseServer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
;
const supabaseUrl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://lxlvcwwvnujfbqgcfzze.supabase.co';
const supabaseKey = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'sb_publishable_Mtnk8ImM2KGy4XoLSHPtBg_zULZWV09';
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseKey);
const supabaseServer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseKey, {
    global: {
        fetch: (url, options)=>fetch(url, {
                ...options,
                cache: 'no-store'
            })
    }
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/producerTypes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Types pour les producteurs (app) et mapping depuis les champs Supabase (snake_case).
 * Champs Supabase : id, name, type, location, region, tags, rating, review_count, capacity,
 * cover, avatar, highlight, price, owner, description, hero_badge, certifications,
 * experiences, gallery, bio.
 */ __turbopack_context__.s([
    "fullToProducer",
    ()=>fullToProducer,
    "mapSupabaseRowToFull",
    ()=>mapSupabaseRowToFull
]);
function ensureArray(v) {
    if (Array.isArray(v)) return v;
    return [];
}
function mapSupabaseRowToFull(row) {
    return {
        id: row.id,
        name: row.name,
        type: row.type,
        location: row.location,
        region: row.region,
        tags: ensureArray(row.tags),
        rating: Number(row.rating) || 0,
        reviewCount: Number(row.review_count) ?? 0,
        capacity: row.capacity ?? '',
        cover: row.cover ?? '',
        avatar: row.avatar ?? '',
        highlight: row.highlight ?? '',
        price: row.price ?? '',
        owner: row.owner ?? '',
        description: row.description ?? '',
        heroBadge: row.hero_badge ?? '',
        certifications: ensureArray(row.certifications),
        experiences: ensureArray(row.experiences),
        gallery: ensureArray(row.gallery),
        reviews: ensureArray(row.reviews)
    };
}
function fullToProducer(p) {
    return {
        id: p.id,
        name: p.name,
        type: p.type,
        location: p.location,
        region: p.region,
        tags: p.tags,
        rating: p.rating,
        reviewCount: p.reviewCount,
        capacity: p.capacity,
        cover: p.cover,
        avatar: p.avatar,
        highlight: p.highlight,
        price: p.price
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/views/ProducersPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$producerTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/producerTypes.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
const FILTERS = [
    'Tous',
    'Olives',
    'Huîtres',
    'Vins',
    'Piments',
    'Truffes',
    'Agrumes',
    'Noix',
    'Spiritueux',
    'Élevages'
];
const REGIONS = [
    'Toutes régions',
    'Nouvelle-Aquitaine',
    'Occitanie',
    "Provence-Alpes-Côte-d'Azur",
    'Grand Est'
];
const RegionDropdown = ({ value, onChange })=>{
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [position, setPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        bottom: 0,
        left: 0
    });
    const triggerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const menuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isActive = value !== 'Toutes régions';
    // Mettre à jour la position du menu à l'ouverture et au scroll/resize
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RegionDropdown.useEffect": ()=>{
            if (!open || !triggerRef.current) return;
            const update = {
                "RegionDropdown.useEffect.update": ()=>{
                    if (triggerRef.current) {
                        const rect = triggerRef.current.getBoundingClientRect();
                        setPosition({
                            bottom: window.innerHeight - rect.top + 8,
                            left: rect.left
                        });
                    }
                }
            }["RegionDropdown.useEffect.update"];
            update();
            window.addEventListener('scroll', update, true);
            window.addEventListener('resize', update);
            return ({
                "RegionDropdown.useEffect": ()=>{
                    window.removeEventListener('scroll', update, true);
                    window.removeEventListener('resize', update);
                }
            })["RegionDropdown.useEffect"];
        }
    }["RegionDropdown.useEffect"], [
        open
    ]);
    // Fermer si clic extérieur
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RegionDropdown.useEffect": ()=>{
            const handler = {
                "RegionDropdown.useEffect.handler": (e)=>{
                    const target = e.target;
                    if (open && triggerRef.current && !triggerRef.current.contains(target) && menuRef.current && !menuRef.current.contains(target)) {
                        setOpen(false);
                    }
                }
            }["RegionDropdown.useEffect.handler"];
            document.addEventListener('mousedown', handler);
            return ({
                "RegionDropdown.useEffect": ()=>document.removeEventListener('mousedown', handler)
            })["RegionDropdown.useEffect"];
        }
    }["RegionDropdown.useEffect"], [
        open
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                ref: triggerRef,
                type: "button",
                onClick: ()=>setOpen((o)=>!o),
                style: {
                    padding: '7px 18px',
                    borderRadius: 20,
                    border: isActive ? '1.5px solid #f78d00' : '1.5px solid #e5e0d8',
                    background: isActive ? '#f78d00' : '#fff',
                    color: isActive ? '#fff' : '#6b7280',
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    outline: 'none'
                },
                children: [
                    value,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            display: 'inline-block',
                            transition: 'transform 0.2s',
                            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                            fontSize: 10,
                            lineHeight: 1
                        },
                        children: "▾"
                    }, void 0, false, {
                        fileName: "[project]/views/ProducersPage.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/views/ProducersPage.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: menuRef,
                style: {
                    position: 'fixed',
                    bottom: position.bottom,
                    left: position.left,
                    background: '#fff',
                    border: '1.5px solid #e5e0d8',
                    borderRadius: 16,
                    boxShadow: '0 8px 32px rgba(10,44,52,0.12)',
                    overflow: 'hidden',
                    zIndex: 9999,
                    minWidth: 200
                },
                children: REGIONS.map((r)=>{
                    const selected = r === value;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>{
                            onChange(r);
                            setOpen(false);
                        },
                        style: {
                            display: 'block',
                            width: '100%',
                            textAlign: 'left',
                            padding: '10px 16px',
                            fontSize: 12,
                            fontWeight: selected ? 700 : 500,
                            fontFamily: 'inherit',
                            background: selected ? 'rgba(247,141,0,0.10)' : 'transparent',
                            color: selected ? '#f78d00' : '#1e291a',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'background 0.15s'
                        },
                        onMouseEnter: (e)=>{
                            if (!selected) e.currentTarget.style.background = '#f9f6f2';
                        },
                        onMouseLeave: (e)=>{
                            if (!selected) e.currentTarget.style.background = 'transparent';
                        },
                        children: [
                            selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    marginRight: 8
                                },
                                children: "✓"
                            }, void 0, false, {
                                fileName: "[project]/views/ProducersPage.tsx",
                                lineNumber: 144,
                                columnNumber: 30
                            }, ("TURBOPACK compile-time value", void 0)),
                            r
                        ]
                    }, r, true, {
                        fileName: "[project]/views/ProducersPage.tsx",
                        lineNumber: 123,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0));
                })
            }, void 0, false, {
                fileName: "[project]/views/ProducersPage.tsx",
                lineNumber: 105,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)), document.body)
        ]
    }, void 0, true);
};
_s(RegionDropdown, "ZOCS3DwtiYOLSOakucszUCGciNM=");
_c = RegionDropdown;
const ProducerCard = ({ producer, onClick })=>{
    _s1();
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: ()=>onClick(producer.id),
        onMouseEnter: ()=>setHovered(true),
        onMouseLeave: ()=>setHovered(false),
        style: {
            cursor: 'pointer',
            borderRadius: 20,
            overflow: 'hidden',
            background: '#fff',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: hovered ? '0 20px 60px rgba(10,44,52,0.14)' : '0 4px 24px rgba(10,44,52,0.07)',
            transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
            transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
            border: '1px solid rgba(10,44,52,0.06)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'relative',
                    height: 200,
                    overflow: 'hidden',
                    flexShrink: 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: producer.cover,
                        alt: `${producer.name} – ${producer.type} ${producer.location} – Terrago`,
                        style: {
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transform: hovered ? 'scale(1.06)' : 'scale(1)',
                            transition: 'transform 0.6s ease'
                        }
                    }, void 0, false, {
                        fileName: "[project]/views/ProducersPage.tsx",
                        lineNumber: 183,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(10,44,52,0.5) 0%, transparent 60%)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/views/ProducersPage.tsx",
                        lineNumber: 188,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            top: 14,
                            left: 14,
                            background: 'rgba(255,255,255,0.75)',
                            backdropFilter: 'blur(8px)',
                            borderRadius: 20,
                            padding: '4px 12px',
                            fontSize: 11,
                            fontWeight: 600,
                            color: '#1e291a',
                            letterSpacing: '0.05em'
                        },
                        children: producer.type
                    }, void 0, false, {
                        fileName: "[project]/views/ProducersPage.tsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            top: 14,
                            right: 14,
                            background: 'rgba(255,255,255,0.75)',
                            backdropFilter: 'blur(8px)',
                            borderRadius: 20,
                            padding: '4px 10px',
                            fontSize: 12,
                            fontWeight: 700,
                            color: '#f78d00',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4
                        },
                        children: [
                            "★ ",
                            producer.rating
                        ]
                    }, void 0, true, {
                        fileName: "[project]/views/ProducersPage.tsx",
                        lineNumber: 192,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            bottom: 12,
                            left: 14,
                            fontSize: 11,
                            color: 'rgba(255,255,255,0.9)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 13
                                },
                                children: "📍"
                            }, void 0, false, {
                                fileName: "[project]/views/ProducersPage.tsx",
                                lineNumber: 196,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            " ",
                            producer.location
                        ]
                    }, void 0, true, {
                        fileName: "[project]/views/ProducersPage.tsx",
                        lineNumber: 195,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/views/ProducersPage.tsx",
                lineNumber: 182,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: '18px 20px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            marginBottom: 10
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: producer.avatar,
                                alt: producer.name,
                                style: {
                                    width: 36,
                                    height: 36,
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    border: '2px solid #f0ebe4'
                                }
                            }, void 0, false, {
                                fileName: "[project]/views/ProducersPage.tsx",
                                lineNumber: 202,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontWeight: 700,
                                    fontSize: 15,
                                    color: '#1e291a',
                                    lineHeight: 1.2
                                },
                                children: producer.name
                            }, void 0, false, {
                                fileName: "[project]/views/ProducersPage.tsx",
                                lineNumber: 203,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/views/ProducersPage.tsx",
                        lineNumber: 201,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 12.5,
                            color: '#6b7280',
                            lineHeight: 1.6,
                            marginBottom: 12,
                            fontStyle: 'italic'
                        },
                        children: producer.highlight
                    }, void 0, false, {
                        fileName: "[project]/views/ProducersPage.tsx",
                        lineNumber: 205,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 6,
                            marginBottom: 14
                        },
                        children: producer.tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    background: 'rgba(247,141,0,0.12)',
                                    color: '#f78d00',
                                    fontSize: 10,
                                    fontWeight: 600,
                                    padding: '3px 10px',
                                    borderRadius: 20,
                                    letterSpacing: '0.04em'
                                },
                                children: tag
                            }, tag, false, {
                                fileName: "[project]/views/ProducersPage.tsx",
                                lineNumber: 208,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/views/ProducersPage.tsx",
                        lineNumber: 206,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderTop: '1px solid #f0ebe4',
                            paddingTop: 12
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    color: '#9ca3af'
                                },
                                children: [
                                    "Jusqu'à ",
                                    producer.capacity,
                                    " personnes max."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/views/ProducersPage.tsx",
                                lineNumber: 214,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: '#1e291a',
                                    color: '#fff',
                                    fontSize: 10,
                                    fontWeight: 700,
                                    letterSpacing: '0.1em',
                                    padding: '8px 16px',
                                    borderRadius: 12,
                                    textTransform: 'uppercase'
                                },
                                children: "Découvrir →"
                            }, void 0, false, {
                                fileName: "[project]/views/ProducersPage.tsx",
                                lineNumber: 215,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/views/ProducersPage.tsx",
                        lineNumber: 213,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/views/ProducersPage.tsx",
                lineNumber: 200,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/views/ProducersPage.tsx",
        lineNumber: 165,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(ProducerCard, "V8YbV+gTZxGliGj1g0fftBlvsq4=");
_c1 = ProducerCard;
// Recherche sur tous les champs texte de la carte
function getSearchableText(p) {
    return [
        p.name,
        p.type,
        p.location,
        p.region,
        p.highlight,
        ...p.tags ?? []
    ].filter(Boolean).join(' ').toLowerCase();
}
// ── Page ─────────────────────────────────────────────────────────────────────
const ProducersPage = ()=>{
    _s2();
    const [activeFilter, setActiveFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Tous');
    const [activeRegion, setActiveRegion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Toutes régions');
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [producers, setProducers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProducersPage.useEffect": ()=>{
            const filter = searchParams.get('filter');
            if (filter && FILTERS.includes(filter)) setActiveFilter(filter);
        }
    }["ProducersPage.useEffect"], [
        searchParams
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProducersPage.useEffect": ()=>{
            let cancelled = false;
            async function fetchProducers() {
                setLoading(true);
                setError(null);
                try {
                    const { data, error: err } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('producers').select('*');
                    if (cancelled) return;
                    if (err) {
                        setError(err.message);
                        setProducers([]);
                    } else {
                        const rows = data ?? [];
                        setProducers(rows.map({
                            "ProducersPage.useEffect.fetchProducers": (row)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$producerTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fullToProducer"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$producerTypes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapSupabaseRowToFull"])(row))
                        }["ProducersPage.useEffect.fetchProducers"]));
                    }
                } catch (e) {
                    if (!cancelled) {
                        setError(e instanceof Error ? e.message : 'Erreur lors du chargement des producteurs');
                        setProducers([]);
                    }
                } finally{
                    if (!cancelled) setLoading(false);
                }
            }
            fetchProducers();
            return ({
                "ProducersPage.useEffect": ()=>{
                    cancelled = true;
                }
            })["ProducersPage.useEffect"];
        }
    }["ProducersPage.useEffect"], []);
    const filtered = producers.filter((p)=>{
        const matchType = activeFilter === 'Tous' || p.type === activeFilter;
        const matchRegion = activeRegion === 'Toutes régions' || p.region === activeRegion;
        const matchSearch = search.trim() === '' || getSearchableText(p).includes(search.trim().toLowerCase());
        return matchType && matchRegion && matchSearch;
    });
    const handleSelectProducer = (id)=>router.push(`/partenaires/${id}`);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "overflow-x-hidden bg-beige-bg min-h-screen font-sans",
        style: {
            fontFamily: "'Poppins', sans-serif"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "relative w-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative min-h-[88vh] sm:min-h-[82vh] lg:min-h-[78vh] w-full overflow-hidden flex items-center justify-center group",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-cover bg-center transition-transform duration-[14s] group-hover:scale-[1.03]",
                            style: {
                                backgroundImage: 'url("https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/general/vache2.avif'
                            },
                            role: "img",
                            "aria-label": "Producteurs partenaires agrotourisme terroir français – Terrago"
                        }, void 0, false, {
                            fileName: "[project]/views/ProducersPage.tsx",
                            lineNumber: 291,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                        }, void 0, false, {
                            fileName: "[project]/views/ProducersPage.tsx",
                            lineNumber: 297,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 mt-16 sm:mt-24 lg:mt-32 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-center gap-3 mb-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: 28,
                                                height: 1,
                                                background: 'rgba(255,255,255,0.40)'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/views/ProducersPage.tsx",
                                            lineNumber: 300,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: 'rgba(255,255,255,0.60)',
                                                fontSize: 10,
                                                letterSpacing: '0.28em',
                                                fontWeight: 700,
                                                textTransform: 'uppercase'
                                            },
                                            children: "Le réseau Terrago"
                                        }, void 0, false, {
                                            fileName: "[project]/views/ProducersPage.tsx",
                                            lineNumber: 301,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: 28,
                                                height: 1,
                                                background: 'rgba(255,255,255,0.40)'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/views/ProducersPage.tsx",
                                            lineNumber: 304,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/views/ProducersPage.tsx",
                                    lineNumber: 299,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-white font-semibold leading-[1.06] mb-6 drop-shadow-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-sans text-4xl md:text-4xl lg:text-5xl",
                                            children: "Nos producteurs partenaires & "
                                        }, void 0, false, {
                                            fileName: "[project]/views/ProducersPage.tsx",
                                            lineNumber: 307,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-display italic text-5xl md:text-5xl lg:text-6xl",
                                            children: "hôtes agrotourisme."
                                        }, void 0, false, {
                                            fileName: "[project]/views/ProducersPage.tsx",
                                            lineNumber: 308,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/views/ProducersPage.tsx",
                                    lineNumber: 306,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "sr-only",
                                    children: "Terrago sélectionne des producteurs engagés dans toute la France pour accueillir des groupes en séminaire au vert, team building terroir et séjour immersif. Vignerons, trufficulteurs, oléiculteurs, éleveurs, fromagers — en Provence, Nouvelle-Aquitaine, Occitanie et au-delà."
                                }, void 0, false, {
                                    fileName: "[project]/views/ProducersPage.tsx",
                                    lineNumber: 310,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-white/80 text-ml max-w-xl mx-auto mb-10 leading-relaxed",
                                    children: "Des producteurs, éleveurs, vignerons et artisans soigneusement sélectionnés pour accueillir vos groupes en séminaire nature ou en séjour immersif terroir."
                                }, void 0, false, {
                                    fileName: "[project]/views/ProducersPage.tsx",
                                    lineNumber: 313,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-12 flex flex-wrap items-center justify-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/seminaires-entreprise",
                                            className: "text-white border border-white/100 hover:border-white/70 px-6 py-3 text-[10px] uppercase tracking-[0.22em] font-bold transition-all duration-300 hover:bg-white/10 rounded-full",
                                            children: "Nos séminaires d'entreprise"
                                        }, void 0, false, {
                                            fileName: "[project]/views/ProducersPage.tsx",
                                            lineNumber: 317,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/recommander-un-producteur",
                                            className: "text-white/90 hover:text-white text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300",
                                            children: "Recommander un producteur →"
                                        }, void 0, false, {
                                            fileName: "[project]/views/ProducersPage.tsx",
                                            lineNumber: 320,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/views/ProducersPage.tsx",
                                    lineNumber: 316,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/ProducersPage.tsx",
                            lineNumber: 298,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/views/ProducersPage.tsx",
                    lineNumber: 290,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/views/ProducersPage.tsx",
                lineNumber: 289,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-beige-bg",
                style: {
                    height: 56
                }
            }, void 0, false, {
                fileName: "[project]/views/ProducersPage.tsx",
                lineNumber: 329,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "section-recherche",
                className: "bg-beige-bg",
                style: {
                    position: 'sticky',
                    top: 0,
                    zIndex: 10
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '16px 24px',
                            display: 'flex',
                            justifyContent: 'center'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                background: '#f9f6f2',
                                borderRadius: 24,
                                border: '1.5px solid #e5e0d8',
                                padding: '10px 20px',
                                width: '100%',
                                maxWidth: 500
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: '#9ca3af',
                                        fontSize: 15,
                                        flexShrink: 0
                                    },
                                    children: "🔍"
                                }, void 0, false, {
                                    fileName: "[project]/views/ProducersPage.tsx",
                                    lineNumber: 341,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: search,
                                    onChange: (e)=>setSearch(e.target.value),
                                    placeholder: "Rechercher un producteur, un produit, une région...",
                                    style: {
                                        flex: 1,
                                        background: 'transparent',
                                        border: 'none',
                                        outline: 'none',
                                        fontSize: 13,
                                        color: '#1e291a',
                                        fontFamily: 'inherit'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/views/ProducersPage.tsx",
                                    lineNumber: 342,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                search && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setSearch(''),
                                    style: {
                                        background: '#e5e0d8',
                                        color: '#6b7280',
                                        border: 'none',
                                        borderRadius: 12,
                                        padding: '3px 10px',
                                        fontSize: 11,
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        fontFamily: 'inherit'
                                    },
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/views/ProducersPage.tsx",
                                    lineNumber: 349,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/ProducersPage.tsx",
                            lineNumber: 335,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/views/ProducersPage.tsx",
                        lineNumber: 334,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '12px 24px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                maxWidth: 1200,
                                margin: '0 auto'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: 8,
                                    overflowX: 'auto',
                                    paddingBottom: 4,
                                    flexWrap: 'wrap',
                                    alignItems: 'center'
                                },
                                children: [
                                    FILTERS.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setActiveFilter(f),
                                            style: {
                                                padding: '7px 18px',
                                                borderRadius: 20,
                                                border: activeFilter === f ? '1.5px solid #f78d00' : '1.5px solid #e5e0d8',
                                                background: activeFilter === f ? '#f78d00' : '#fff',
                                                color: activeFilter === f ? '#fff' : '#6b7280',
                                                fontSize: 12,
                                                fontWeight: 600,
                                                fontFamily: 'inherit',
                                                cursor: 'pointer',
                                                whiteSpace: 'nowrap',
                                                transition: 'all 0.2s',
                                                outline: 'none'
                                            },
                                            children: f
                                        }, f, false, {
                                            fileName: "[project]/views/ProducersPage.tsx",
                                            lineNumber: 361,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 1,
                                            background: '#e5e0d8',
                                            alignSelf: 'stretch',
                                            margin: '0 4px'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/views/ProducersPage.tsx",
                                        lineNumber: 378,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RegionDropdown, {
                                        value: activeRegion,
                                        onChange: setActiveRegion
                                    }, void 0, false, {
                                        fileName: "[project]/views/ProducersPage.tsx",
                                        lineNumber: 379,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/views/ProducersPage.tsx",
                                lineNumber: 359,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/views/ProducersPage.tsx",
                            lineNumber: 358,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/views/ProducersPage.tsx",
                        lineNumber: 357,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/views/ProducersPage.tsx",
                lineNumber: 332,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-beige-bg",
                style: {
                    maxWidth: 1200,
                    margin: '0 auto',
                    padding: '48px 24px'
                },
                children: [
                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: 'center',
                            padding: '80px 0',
                            color: '#6b7280'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: 16,
                                fontWeight: 600
                            },
                            children: "Chargement des producteurs..."
                        }, void 0, false, {
                            fileName: "[project]/views/ProducersPage.tsx",
                            lineNumber: 389,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/views/ProducersPage.tsx",
                        lineNumber: 388,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: 'center',
                            padding: '80px 0',
                            color: '#b91c1c'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 16,
                                    fontWeight: 600
                                },
                                children: "Erreur"
                            }, void 0, false, {
                                fileName: "[project]/views/ProducersPage.tsx",
                                lineNumber: 394,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 14,
                                    marginTop: 8
                                },
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/views/ProducersPage.tsx",
                                lineNumber: 395,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/views/ProducersPage.tsx",
                        lineNumber: 393,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    !loading && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 13,
                                    color: '#9ca3af',
                                    marginBottom: 28
                                },
                                children: [
                                    filtered.length,
                                    " producteur",
                                    filtered.length > 1 ? 's' : '',
                                    " trouvé",
                                    filtered.length > 1 ? 's' : ''
                                ]
                            }, void 0, true, {
                                fileName: "[project]/views/ProducersPage.tsx",
                                lineNumber: 400,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                    gap: 28,
                                    alignItems: 'stretch'
                                },
                                children: filtered.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProducerCard, {
                                        producer: p,
                                        onClick: handleSelectProducer
                                    }, p.id, false, {
                                        fileName: "[project]/views/ProducersPage.tsx",
                                        lineNumber: 405,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/views/ProducersPage.tsx",
                                lineNumber: 403,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            filtered.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: 'center',
                                    padding: '80px 0',
                                    color: '#9ca3af'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 48,
                                            marginBottom: 16
                                        },
                                        children: "🌾"
                                    }, void 0, false, {
                                        fileName: "[project]/views/ProducersPage.tsx",
                                        lineNumber: 410,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 16,
                                            fontWeight: 600
                                        },
                                        children: "Aucun producteur trouvé"
                                    }, void 0, false, {
                                        fileName: "[project]/views/ProducersPage.tsx",
                                        lineNumber: 411,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 13,
                                            marginTop: 8
                                        },
                                        children: "Essayez d'autres filtres"
                                    }, void 0, false, {
                                        fileName: "[project]/views/ProducersPage.tsx",
                                        lineNumber: 412,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/views/ProducersPage.tsx",
                                lineNumber: 409,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 96,
                            paddingTop: 48,
                            borderTop: '1px solid #e5e0d8'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                background: '#1e291a',
                                borderRadius: 24,
                                padding: '48px 64px',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: 32,
                                flexWrap: 'wrap'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-white leading-snug font-semibold mb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontFamily: "'Poppins', sans-serif",
                                                        fontStyle: 'normal',
                                                        fontWeight: 700
                                                    },
                                                    className: "text-2xl md:text-3xl",
                                                    children: [
                                                        "Vous êtes un producteur engagé ou",
                                                        " "
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/views/ProducersPage.tsx",
                                                    lineNumber: 423,
                                                    columnNumber: 3
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontFamily: "'Cormorant Garamond', serif",
                                                        fontStyle: 'italic',
                                                        fontWeight: 700
                                                    },
                                                    className: "text-3xl md:text-4xl",
                                                    children: "connaissez un talent du terroir ?"
                                                }, void 0, false, {
                                                    fileName: "[project]/views/ProducersPage.tsx",
                                                    lineNumber: 426,
                                                    columnNumber: 3
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/views/ProducersPage.tsx",
                                            lineNumber: 422,
                                            columnNumber: 11
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                color: 'rgba(255,255,255,0.6)',
                                                fontSize: 13,
                                                margin: 0,
                                                lineHeight: 1.6
                                            },
                                            children: "Rejoignez le réseau Terrago, accueillez des groupes en séminaire engagé ou faites-nous découvrir un producteur exceptionnel du terroir."
                                        }, void 0, false, {
                                            fileName: "[project]/views/ProducersPage.tsx",
                                            lineNumber: 430,
                                            columnNumber: 13
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/views/ProducersPage.tsx",
                                    lineNumber: 421,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: 12,
                                        flexWrap: 'wrap'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/nous-rejoindre",
                                            className: "bg-[#f78d00] text-white px-5 py-3 rounded-xl text-[11px] font-bold uppercase tracking-[0.1em] no-underline hover:opacity-90 transition-opacity",
                                            children: "Devenir partenaire →"
                                        }, void 0, false, {
                                            fileName: "[project]/views/ProducersPage.tsx",
                                            lineNumber: 433,
                                            columnNumber: 13
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/recommander-un-producteur",
                                            className: "bg-white/10 text-white px-5 py-3 rounded-xl text-[11px] font-bold uppercase tracking-[0.1em] border border-white/20 no-underline hover:bg-white/20 transition-colors",
                                            children: "Recommander un producteur →"
                                        }, void 0, false, {
                                            fileName: "[project]/views/ProducersPage.tsx",
                                            lineNumber: 434,
                                            columnNumber: 13
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/views/ProducersPage.tsx",
                                    lineNumber: 432,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/ProducersPage.tsx",
                            lineNumber: 420,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/views/ProducersPage.tsx",
                        lineNumber: 419,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/views/ProducersPage.tsx",
                lineNumber: 386,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/views/ProducersPage.tsx",
        lineNumber: 286,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s2(ProducersPage, "jZPslpMY1pJX1gOOiJ2EJqc94fw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c2 = ProducersPage;
const __TURBOPACK__default__export__ = ProducersPage;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "RegionDropdown");
__turbopack_context__.k.register(_c1, "ProducerCard");
__turbopack_context__.k.register(_c2, "ProducersPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_553b10b0._.js.map