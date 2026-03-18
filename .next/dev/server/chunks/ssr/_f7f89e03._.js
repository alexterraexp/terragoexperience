module.exports = [
"[project]/lib/supabase.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase,
    "supabaseServer",
    ()=>supabaseServer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-ssr] (ecmascript) <locals>");
;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://lxlvcwwvnujfbqgcfzze.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'sb_publishable_Mtnk8ImM2KGy4XoLSHPtBg_zULZWV09';
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseKey);
const supabaseServer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseKey, {
    global: {
        fetch: (url, options)=>fetch(url, {
                ...options,
                cache: 'no-store'
            })
    }
});
}),
"[project]/views/Seminaires-pack.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SeminairesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
// ─── Constantes ────────────────────────────────────────────────────────────────
const PRODUITS = [
    {
        id: 'all',
        label: 'Tous'
    },
    {
        id: 'truffes',
        label: 'Truffes'
    },
    {
        id: 'olives',
        label: 'Olives'
    },
    {
        id: 'noix',
        label: 'Noix'
    },
    {
        id: 'piments',
        label: 'Piments'
    },
    {
        id: 'spiritueux',
        label: 'Spiritueux'
    },
    {
        id: 'vins',
        label: 'Vins'
    },
    {
        id: 'huitres',
        label: 'Huîtres',
        comingSoon: true
    },
    {
        id: 'fromage',
        label: 'Fromage',
        comingSoon: true
    }
];
// Mapping univers (page Séminaires) → filtre + mots-clés pour mettre en avant la bonne offre packagée
const UNIVERS_TO_PACK = {
    cognac: {
        produitId: 'spiritueux',
        keywords: [
            'cognac',
            'pineau'
        ]
    },
    olive: {
        produitId: 'olives',
        keywords: [
            'olive',
            'lavande'
        ]
    },
    noix: {
        produitId: 'noix',
        keywords: [
            'noix'
        ]
    },
    truffe: {
        produitId: 'truffes',
        keywords: [
            'truffe'
        ]
    },
    fromage: {
        produitId: 'fromage',
        keywords: [
            'fromage',
            'chèvre',
            'chevre'
        ]
    },
    vin: {
        produitId: 'vins',
        keywords: [
            'vin',
            'vign',
            'ventoux'
        ]
    },
    piment: {
        produitId: 'piments',
        keywords: [
            'piment'
        ]
    },
    noisette: {
        produitId: 'noix',
        keywords: [
            'noisette'
        ]
    }
};
const FORMATS = [
    {
        id: '1jour',
        label: '1 journée'
    },
    {
        id: '2jours',
        label: '2 jours'
    },
    {
        id: 'mesure',
        label: 'Sur mesure'
    }
];
const MONTHS = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
];
const PARTICIPANTS_OPTIONS = [
    'Moins de 10',
    '10 – 20',
    '20 – 40',
    '40 – 80',
    '80 – 150',
    '150+'
];
const STEPS = [
    {
        label: 'Sélection'
    },
    {
        label: 'Coordonnées'
    },
    {
        label: 'Logistique'
    },
    {
        label: 'Récapitulatif'
    }
];
// ─── Styles communs ────────────────────────────────────────────────────────────
const inputStyle = {
    width: '100%',
    background: '#faf8f5',
    border: '1px solid rgba(10,44,52,0.08)',
    borderRadius: 12,
    padding: '12px 16px',
    fontFamily: 'inherit',
    fontSize: 14,
    color: '#1a2e1a',
    outline: 'none',
    transition: 'all 0.18s ease',
    boxSizing: 'border-box'
};
// ─── FieldBlock ────────────────────────────────────────────────────────────────
const FieldBlock = ({ label, required, children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'flex',
            flexDirection: 'column',
            gap: 0
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                style: {
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#b0a89e',
                    display: 'block',
                    marginBottom: 8
                },
                children: [
                    label,
                    required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: '#e67e22',
                            marginLeft: 4
                        },
                        children: "*"
                    }, void 0, false, {
                        fileName: "[project]/views/Seminaires-pack.tsx",
                        lineNumber: 73,
                        columnNumber: 27
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/views/Seminaires-pack.tsx",
                lineNumber: 72,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/views/Seminaires-pack.tsx",
        lineNumber: 71,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
// ─── TagBtn ────────────────────────────────────────────────────────────────────
const TagBtn = ({ active, onClick, children, small })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        style: {
            padding: small ? '5px 12px' : '7px 14px',
            borderRadius: 9999,
            border: `1.5px solid ${active ? '#1a2e1a' : 'rgba(10,44,52,0.1)'}`,
            background: active ? '#1a2e1a' : '#faf8f5',
            color: active ? '#fff' : '#7a7060',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontFamily: 'inherit',
            boxShadow: active ? '0 2px 10px rgba(26,46,26,0.15)' : 'none',
            transition: 'all 0.15s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5
        },
        children: [
            active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontSize: 9
                },
                children: "✓"
            }, void 0, false, {
                fileName: "[project]/views/Seminaires-pack.tsx",
                lineNumber: 92,
                columnNumber: 16
            }, ("TURBOPACK compile-time value", void 0)),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/views/Seminaires-pack.tsx",
        lineNumber: 82,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
// ─── ModeBtn ──────────────────────────────────────────────────────────────────
const ModeBtn = ({ active, onClick, children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        style: {
            padding: '7px 16px',
            borderRadius: 9999,
            border: `1.5px solid ${active ? '#e67e22' : 'rgba(10,44,52,0.1)'}`,
            background: active ? '#e67e22' : '#faf8f5',
            color: active ? '#fff' : '#b0a89e',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'all 0.15s ease'
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/views/Seminaires-pack.tsx",
        lineNumber: 100,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
// ─── ToggleCard ────────────────────────────────────────────────────────────────
const ToggleCard = ({ icon, label, active, onToggle, children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: '18px',
            borderRadius: 16,
            border: `1.5px solid ${active ? '#1a2e1a' : 'rgba(10,44,52,0.08)'}`,
            background: active ? 'rgba(26,46,26,0.03)' : '#faf8f5',
            transition: 'all 0.2s ease'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 18
                                },
                                children: icon
                            }, void 0, false, {
                                fileName: "[project]/views/Seminaires-pack.tsx",
                                lineNumber: 118,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: '#1a2e1a',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.12em'
                                },
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/views/Seminaires-pack.tsx",
                                lineNumber: 119,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/views/Seminaires-pack.tsx",
                        lineNumber: 117,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        style: {
                            position: 'relative',
                            display: 'inline-flex',
                            alignItems: 'center',
                            cursor: 'pointer'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: active,
                                onChange: onToggle,
                                style: {
                                    position: 'absolute',
                                    opacity: 0,
                                    width: 0,
                                    height: 0
                                }
                            }, void 0, false, {
                                fileName: "[project]/views/Seminaires-pack.tsx",
                                lineNumber: 122,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 40,
                                    height: 22,
                                    background: active ? '#1a2e1a' : '#d4cec8',
                                    borderRadius: 11,
                                    position: 'relative',
                                    transition: 'background 0.2s ease'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        position: 'absolute',
                                        top: 3,
                                        left: active ? 21 : 3,
                                        width: 16,
                                        height: 16,
                                        borderRadius: '50%',
                                        background: '#fff',
                                        boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                                        transition: 'left 0.2s ease'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                    lineNumber: 124,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/views/Seminaires-pack.tsx",
                                lineNumber: 123,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/views/Seminaires-pack.tsx",
                        lineNumber: 121,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/views/Seminaires-pack.tsx",
                lineNumber: 116,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/views/Seminaires-pack.tsx",
        lineNumber: 115,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
// ─── CustomSelect ──────────────────────────────────────────────────────────────
const CustomSelect = ({ value, onChange, options, placeholder })=>{
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const selectedLabel = options.find((o)=>o.value === value)?.label ?? '';
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handler = (e)=>{
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return ()=>document.removeEventListener('mousedown', handler);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        style: {
            position: 'relative'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setOpen((v)=>!v),
                style: {
                    ...inputStyle,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    textAlign: 'left',
                    border: `1px solid ${open ? '#1a2e1a' : 'rgba(10,44,52,0.08)'}`,
                    boxShadow: open ? '0 0 0 3px rgba(26,46,26,0.08)' : 'none'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: value ? '#1a2e1a' : '#b0a89e',
                            fontSize: 14,
                            fontWeight: value ? 500 : 400
                        },
                        children: value ? selectedLabel : placeholder ?? '— Choisir —'
                    }, void 0, false, {
                        fileName: "[project]/views/Seminaires-pack.tsx",
                        lineNumber: 165,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        width: "12",
                        height: "12",
                        viewBox: "0 0 12 12",
                        fill: "none",
                        style: {
                            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease',
                            flexShrink: 0,
                            marginLeft: 8
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M2.5 4.5L6 8L9.5 4.5",
                            stroke: "#1a2e1a",
                            strokeWidth: "1.6",
                            strokeLinecap: "round",
                            strokeLinejoin: "round"
                        }, void 0, false, {
                            fileName: "[project]/views/Seminaires-pack.tsx",
                            lineNumber: 170,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/views/Seminaires-pack.tsx",
                        lineNumber: 168,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/views/Seminaires-pack.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    top: 'calc(100% + 6px)',
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    background: '#fff',
                    borderRadius: 14,
                    border: '1px solid rgba(10,44,52,0.1)',
                    boxShadow: '0 8px 32px rgba(26,46,26,0.12)',
                    overflow: 'hidden',
                    maxHeight: 'min(320px, 70vh)',
                    display: 'flex',
                    flexDirection: 'column'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>{
                            onChange('');
                            setOpen(false);
                        },
                        style: {
                            width: '100%',
                            padding: '11px 16px',
                            background: 'none',
                            border: 'none',
                            textAlign: 'left',
                            cursor: 'pointer',
                            fontSize: 13,
                            color: '#b0a89e',
                            fontFamily: 'inherit',
                            borderBottom: '1px solid rgba(10,44,52,0.05)',
                            flexShrink: 0
                        },
                        children: "— Choisir un produit —"
                    }, void 0, false, {
                        fileName: "[project]/views/Seminaires-pack.tsx",
                        lineNumber: 181,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            flex: 1,
                            minHeight: 0
                        },
                        children: options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>{
                                    onChange(opt.value);
                                    setOpen(false);
                                },
                                style: {
                                    width: '100%',
                                    padding: '11px 16px',
                                    background: opt.value === value ? 'rgba(26,46,26,0.04)' : 'none',
                                    border: 'none',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    fontSize: 14,
                                    color: opt.value === value ? '#1a2e1a' : '#4a4540',
                                    fontWeight: opt.value === value ? 700 : 400,
                                    fontFamily: 'inherit',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10,
                                    transition: 'background 0.12s ease'
                                },
                                onMouseEnter: (e)=>{
                                    if (opt.value !== value) e.currentTarget.style.background = 'rgba(26,46,26,0.03)';
                                },
                                onMouseLeave: (e)=>{
                                    if (opt.value !== value) e.currentTarget.style.background = 'none';
                                },
                                children: [
                                    opt.value === value && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            width: 16,
                                            height: 16,
                                            borderRadius: '50%',
                                            background: '#1a2e1a',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "8",
                                            height: "8",
                                            viewBox: "0 0 10 10",
                                            fill: "none",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M2 5.5L4.2 7.5L8 3",
                                                stroke: "#fff",
                                                strokeWidth: "1.5",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round"
                                            }, void 0, false, {
                                                fileName: "[project]/views/Seminaires-pack.tsx",
                                                lineNumber: 202,
                                                columnNumber: 77
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                            lineNumber: 202,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                        lineNumber: 201,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    opt.value !== value && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            width: 16,
                                            flexShrink: 0
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                        lineNumber: 205,
                                        columnNumber: 39
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    opt.label
                                ]
                            }, opt.value, true, {
                                fileName: "[project]/views/Seminaires-pack.tsx",
                                lineNumber: 187,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/views/Seminaires-pack.tsx",
                        lineNumber: 185,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/views/Seminaires-pack.tsx",
                lineNumber: 175,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/views/Seminaires-pack.tsx",
        lineNumber: 153,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
// ─── DateRangePicker ───────────────────────────────────────────────────────────
const DAYS_FR = [
    'L',
    'M',
    'M',
    'J',
    'V',
    'S',
    'D'
];
const MONTHS_FR = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
];
const DateRangePicker = ({ startDate, endDate, onStartChange, onEndChange })=>{
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [viewYear, setViewYear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(today.getFullYear());
    const [viewMonth, setViewMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(today.getMonth());
    const [selecting, setSelecting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('start');
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const toStr = (d)=>d.toISOString().split('T')[0];
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const offset = firstDay === 0 ? 6 : firstDay - 1;
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells = [];
    for(let i = 0; i < offset; i++)cells.push(null);
    for(let i = 1; i <= daysInMonth; i++)cells.push(new Date(viewYear, viewMonth, i));
    const prevMonth = ()=>{
        if (viewMonth === 0) {
            setViewMonth(11);
            setViewYear((y)=>y - 1);
        } else setViewMonth((m)=>m - 1);
    };
    const nextMonth = ()=>{
        if (viewMonth === 11) {
            setViewMonth(0);
            setViewYear((y)=>y + 1);
        } else setViewMonth((m)=>m + 1);
    };
    const handleDayClick = (d)=>{
        const s = toStr(d);
        if (selecting === 'start') {
            onStartChange(s);
            if (endDate && s > endDate) onEndChange('');
            setSelecting('end');
        } else {
            if (startDate && s < startDate) {
                onStartChange(s);
                setSelecting('end');
            } else {
                onEndChange(s);
                setSelecting('start');
            }
        }
    };
    const isInRange = (d)=>{
        const s = toStr(d);
        const rangeEnd = hovered && selecting === 'end' && startDate ? hovered : endDate;
        if (!startDate || !rangeEnd) return false;
        return s > startDate && s < rangeEnd;
    };
    const isStart = (d)=>!!startDate && toStr(d) === startDate;
    const isEnd = (d)=>!!endDate && toStr(d) === endDate;
    const isPast = (d)=>d < today;
    const fmtDisplay = (s)=>s ? new Date(s + 'T00:00:00').toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }) : '—';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: '#faf8f5',
            borderRadius: 16,
            border: '1px solid rgba(10,44,52,0.08)',
            overflow: 'hidden'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    borderBottom: '1px solid rgba(10,44,52,0.06)'
                },
                children: [
                    'start',
                    'end'
                ].map((key)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setSelecting(key),
                        style: {
                            padding: '12px 16px',
                            background: selecting === key ? '#fff' : 'transparent',
                            border: 'none',
                            borderBottom: `2px solid ${selecting === key ? '#1a2e1a' : 'transparent'}`,
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all .15s ease',
                            borderRight: key === 'start' ? '1px solid rgba(10,44,52,0.06)' : 'none'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 8,
                                    fontWeight: 700,
                                    letterSpacing: '0.18em',
                                    textTransform: 'uppercase',
                                    color: selecting === key ? '#e67e22' : '#b0a89e',
                                    marginBottom: 3
                                },
                                children: key === 'start' ? 'Arrivée' : 'Départ'
                            }, void 0, false, {
                                fileName: "[project]/views/Seminaires-pack.tsx",
                                lineNumber: 261,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 12,
                                    fontWeight: 600,
                                    color: (key === 'start' ? startDate : endDate) ? '#1a2e1a' : '#c4bdb4'
                                },
                                children: fmtDisplay(key === 'start' ? startDate : endDate)
                            }, void 0, false, {
                                fileName: "[project]/views/Seminaires-pack.tsx",
                                lineNumber: 262,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, key, true, {
                        fileName: "[project]/views/Seminaires-pack.tsx",
                        lineNumber: 259,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/views/Seminaires-pack.tsx",
                lineNumber: 257,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px 8px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: prevMonth,
                        style: {
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            border: 'none',
                            background: 'rgba(10,44,52,0.06)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#1a2e1a',
                            fontSize: 12
                        },
                        children: "‹"
                    }, void 0, false, {
                        fileName: "[project]/views/Seminaires-pack.tsx",
                        lineNumber: 267,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 11,
                            fontWeight: 700,
                            color: '#1a2e1a',
                            textTransform: 'capitalize',
                            letterSpacing: '0.05em'
                        },
                        children: [
                            MONTHS_FR[viewMonth],
                            " ",
                            viewYear
                        ]
                    }, void 0, true, {
                        fileName: "[project]/views/Seminaires-pack.tsx",
                        lineNumber: 268,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: nextMonth,
                        style: {
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            border: 'none',
                            background: 'rgba(10,44,52,0.06)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#1a2e1a',
                            fontSize: 12
                        },
                        children: "›"
                    }, void 0, false, {
                        fileName: "[project]/views/Seminaires-pack.tsx",
                        lineNumber: 269,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/views/Seminaires-pack.tsx",
                lineNumber: 266,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7,1fr)',
                    padding: '0 12px',
                    marginBottom: 4
                },
                children: DAYS_FR.map((d, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: 'center',
                            fontSize: 9,
                            fontWeight: 700,
                            color: '#b0a89e',
                            letterSpacing: '0.1em',
                            padding: '4px 0'
                        },
                        children: d
                    }, i, false, {
                        fileName: "[project]/views/Seminaires-pack.tsx",
                        lineNumber: 272,
                        columnNumber: 32
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/views/Seminaires-pack.tsx",
                lineNumber: 271,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7,1fr)',
                    padding: '0 12px 14px',
                    gap: 2
                },
                children: cells.map((d, i)=>{
                    if (!d) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, i, false, {
                        fileName: "[project]/views/Seminaires-pack.tsx",
                        lineNumber: 276,
                        columnNumber: 26
                    }, ("TURBOPACK compile-time value", void 0));
                    const start = isStart(d), end = isEnd(d), inRange = isInRange(d), past = isPast(d);
                    const isToday = toStr(d) === toStr(today);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        disabled: past,
                        onClick: ()=>!past && handleDayClick(d),
                        onMouseEnter: ()=>setHovered(toStr(d)),
                        onMouseLeave: ()=>setHovered(null),
                        style: {
                            height: 32,
                            borderRadius: start || end ? 9999 : inRange ? 0 : 9999,
                            border: isToday && !start && !end ? '1.5px solid rgba(230,126,34,0.4)' : 'none',
                            background: start || end ? '#1a2e1a' : inRange ? 'rgba(26,46,26,0.08)' : 'transparent',
                            color: start || end ? '#fff' : past ? '#d5cfc7' : '#1a2e1a',
                            fontSize: 11,
                            fontWeight: start || end ? 700 : isToday ? 700 : 400,
                            cursor: past ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        },
                        children: d.getDate()
                    }, i, false, {
                        fileName: "[project]/views/Seminaires-pack.tsx",
                        lineNumber: 280,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0));
                })
            }, void 0, false, {
                fileName: "[project]/views/Seminaires-pack.tsx",
                lineNumber: 274,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: '8px 16px 12px',
                    borderTop: '1px solid rgba(10,44,52,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: '#e67e22',
                            flexShrink: 0
                        }
                    }, void 0, false, {
                        fileName: "[project]/views/Seminaires-pack.tsx",
                        lineNumber: 289,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 9,
                            color: '#b0a89e',
                            fontWeight: 600,
                            letterSpacing: '0.08em'
                        },
                        children: selecting === 'start' ? "Sélectionnez la date d'arrivée" : "Sélectionnez la date de départ"
                    }, void 0, false, {
                        fileName: "[project]/views/Seminaires-pack.tsx",
                        lineNumber: 290,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/views/Seminaires-pack.tsx",
                lineNumber: 288,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/views/Seminaires-pack.tsx",
        lineNumber: 256,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
// ─── RecapRow ──────────────────────────────────────────────────────────────────
const RecapRow = ({ label, value })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 12,
            padding: '10px 0',
            borderBottom: '1px solid rgba(10,44,52,0.05)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#b0a89e',
                    flexShrink: 0
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/views/Seminaires-pack.tsx",
                lineNumber: 300,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#1a2e1a',
                    textAlign: 'right'
                },
                children: value || '—'
            }, void 0, false, {
                fileName: "[project]/views/Seminaires-pack.tsx",
                lineNumber: 301,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/views/Seminaires-pack.tsx",
        lineNumber: 299,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
// ─── ProgrammeAccordion ────────────────────────────────────────────────────────
function ProgrammeAccordion({ programme, couleur, triggerKey }) {
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const prev = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    if (prev.current !== triggerKey) {
        prev.current = triggerKey;
        if (expanded) setExpanded(false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            borderTop: '1px solid rgba(26,46,26,0.06)',
            paddingTop: 14
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setExpanded((v)=>!v),
                style: {
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    marginBottom: expanded ? 14 : 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 9,
                            fontWeight: 700,
                            letterSpacing: '0.22em',
                            textTransform: 'uppercase',
                            color: '#1a2e1a'
                        },
                        children: "Exemple de programme"
                    }, void 0, false, {
                        fileName: "[project]/views/Seminaires-pack.tsx",
                        lineNumber: 314,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 30,
                            height: 30,
                            borderRadius: '50%',
                            background: 'rgba(26,46,26,0.05)',
                            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease',
                            flexShrink: 0
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "12",
                            height: "12",
                            viewBox: "0 0 14 14",
                            fill: "none",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M2.5 5L7 9.5L11.5 5",
                                stroke: "#b0a89e",
                                strokeWidth: "1.8",
                                strokeLinecap: "round",
                                strokeLinejoin: "round"
                            }, void 0, false, {
                                fileName: "[project]/views/Seminaires-pack.tsx",
                                lineNumber: 316,
                                columnNumber: 71
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/views/Seminaires-pack.tsx",
                            lineNumber: 316,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/views/Seminaires-pack.tsx",
                        lineNumber: 315,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/views/Seminaires-pack.tsx",
                lineNumber: 313,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxHeight: expanded ? '500px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                        paddingBottom: 4
                    },
                    children: programme.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                gap: 12,
                                alignItems: 'flex-start'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: couleur,
                                        fontSize: 10,
                                        fontWeight: 700,
                                        letterSpacing: '0.06em',
                                        textTransform: 'uppercase',
                                        flexShrink: 0,
                                        width: 60,
                                        paddingTop: 2
                                    },
                                    children: p.heure
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                    lineNumber: 323,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: '#7a7060',
                                        fontSize: 12,
                                        lineHeight: 1.6
                                    },
                                    children: p.action
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                    lineNumber: 324,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/views/Seminaires-pack.tsx",
                            lineNumber: 322,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/views/Seminaires-pack.tsx",
                    lineNumber: 320,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/views/Seminaires-pack.tsx",
                lineNumber: 319,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/views/Seminaires-pack.tsx",
        lineNumber: 312,
        columnNumber: 5
    }, this);
}
// ─── ImageCarousel ─────────────────────────────────────────────────────────────
function ImageCarousel({ images, titre, region, bestseller, resetKey }) {
    const [photoIndex, setPhotoIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [photoDir, setPhotoDir] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('right');
    const [photoKey, setPhotoKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const touchStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const autoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setPhotoIndex(0);
        setPhotoKey((k)=>k + 1);
    }, [
        resetKey
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (images.length <= 1) return;
        autoRef.current = setInterval(()=>{
            setPhotoDir('right');
            setPhotoIndex((i)=>(i + 1) % images.length);
            setPhotoKey((k)=>k + 1);
        }, 4000);
        return ()=>{
            if (autoRef.current) clearInterval(autoRef.current);
        };
    }, [
        images.length,
        resetKey
    ]);
    const goPhoto = (dir)=>{
        if (autoRef.current) clearInterval(autoRef.current);
        setPhotoDir(dir === 'next' ? 'right' : 'left');
        setPhotoIndex((i)=>dir === 'next' ? (i + 1) % images.length : (i - 1 + images.length) % images.length);
        setPhotoKey((k)=>k + 1);
    };
    const currentImg = images[photoIndex] ?? '';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "sem-img-wrap",
        onTouchStart: (e)=>{
            touchStart.current = e.touches[0].clientX;
        },
        onTouchEnd: (e)=>{
            if (touchStart.current === null) return;
            const dx = e.changedTouches[0].clientX - touchStart.current;
            if (Math.abs(dx) > 44) goPhoto(dx < 0 ? 'next' : 'prev');
            touchStart.current = null;
        },
        style: {
            position: 'relative',
            height: 280,
            overflow: 'hidden',
            borderRadius: '24px 24px 0 0'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    inset: 0,
                    animation: `photoSlideIn${photoDir === 'right' ? 'Right' : 'Left'} 0.45s cubic-bezier(0.22,1,0.36,1) both`
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: currentImg,
                    alt: `Séminaire ${titre} – ${region} – Terrago`,
                    style: {
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        pointerEvents: 'none',
                        userSelect: 'none'
                    }
                }, void 0, false, {
                    fileName: "[project]/views/Seminaires-pack.tsx",
                    lineNumber: 372,
                    columnNumber: 9
                }, this)
            }, photoKey, false, {
                fileName: "[project]/views/Seminaires-pack.tsx",
                lineNumber: 371,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(26,46,26,0.65) 0%, transparent 55%)',
                    pointerEvents: 'none'
                }
            }, void 0, false, {
                fileName: "[project]/views/Seminaires-pack.tsx",
                lineNumber: 374,
                columnNumber: 7
            }, this),
            images.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "sem-img-arrow",
                        onClick: ()=>goPhoto('prev'),
                        style: {
                            position: 'absolute',
                            left: 14,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: 34,
                            height: 34,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.12)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.25)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            zIndex: 2
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "11",
                            height: "11",
                            viewBox: "0 0 12 12",
                            fill: "none",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M7.5 2L3.5 6L7.5 10",
                                stroke: "white",
                                strokeWidth: "1.8",
                                strokeLinecap: "round",
                                strokeLinejoin: "round"
                            }, void 0, false, {
                                fileName: "[project]/views/Seminaires-pack.tsx",
                                lineNumber: 378,
                                columnNumber: 73
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/views/Seminaires-pack.tsx",
                            lineNumber: 378,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/views/Seminaires-pack.tsx",
                        lineNumber: 377,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "sem-img-arrow",
                        onClick: ()=>goPhoto('next'),
                        style: {
                            position: 'absolute',
                            right: 14,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: 34,
                            height: 34,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.12)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.25)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            zIndex: 2
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "11",
                            height: "11",
                            viewBox: "0 0 12 12",
                            fill: "none",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M4.5 2L8.5 6L4.5 10",
                                stroke: "white",
                                strokeWidth: "1.8",
                                strokeLinecap: "round",
                                strokeLinejoin: "round"
                            }, void 0, false, {
                                fileName: "[project]/views/Seminaires-pack.tsx",
                                lineNumber: 381,
                                columnNumber: 73
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/views/Seminaires-pack.tsx",
                            lineNumber: 381,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/views/Seminaires-pack.tsx",
                        lineNumber: 380,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            bottom: 46,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            gap: 5,
                            zIndex: 2
                        },
                        children: images.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    if (autoRef.current) clearInterval(autoRef.current);
                                    setPhotoDir(i > photoIndex ? 'right' : 'left');
                                    setPhotoIndex(i);
                                    setPhotoKey((k)=>k + 1);
                                },
                                style: {
                                    width: i === photoIndex ? 16 : 5,
                                    height: 5,
                                    borderRadius: 3,
                                    background: i === photoIndex ? '#fff' : 'rgba(255,255,255,0.4)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 0,
                                    transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)'
                                }
                            }, i, false, {
                                fileName: "[project]/views/Seminaires-pack.tsx",
                                lineNumber: 385,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/views/Seminaires-pack.tsx",
                        lineNumber: 383,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            top: 14,
                            left: 14,
                            background: 'rgba(0,0,0,0.35)',
                            backdropFilter: 'blur(8px)',
                            borderRadius: 9999,
                            padding: '4px 10px',
                            fontSize: 9,
                            fontWeight: 700,
                            color: 'rgba(255,255,255,0.9)',
                            letterSpacing: '0.08em',
                            zIndex: 2
                        },
                        children: [
                            photoIndex + 1,
                            " / ",
                            images.length
                        ]
                    }, void 0, true, {
                        fileName: "[project]/views/Seminaires-pack.tsx",
                        lineNumber: 389,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            bestseller && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    top: 14,
                    right: 14,
                    background: 'rgba(100,100,100,0.35)',
                    borderRadius: 9999,
                    padding: '4px 12px',
                    fontSize: 9,
                    fontWeight: 700,
                    color: '#fff',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    zIndex: 2
                },
                children: "★ Populaire"
            }, void 0, false, {
                fileName: "[project]/views/Seminaires-pack.tsx",
                lineNumber: 395,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    bottom: 14,
                    left: 16,
                    fontSize: 11,
                    color: 'rgba(255,255,255,0.85)',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    zIndex: 2
                },
                children: region
            }, void 0, false, {
                fileName: "[project]/views/Seminaires-pack.tsx",
                lineNumber: 397,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/views/Seminaires-pack.tsx",
        lineNumber: 362,
        columnNumber: 5
    }, this);
}
// ─── SeminaireModal ────────────────────────────────────────────────────────────
function SeminaireModal({ isOpen, onClose, seminaires, initialSeminaire, initialFormatId }) {
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [closing, setClosing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [transitioning, setTrans] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submitting, setSubmit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        prenom: '',
        nom: '',
        email: '',
        entreprise: '',
        participants: '',
        message: ''
    });
    const [selectedSeminaireId, setSelectedSeminaireId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedFormatId, setSelectedFormatId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('1jour');
    const [accTypes, setAccTypes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [transport, setTransport] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [months, setMonths] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [periodMode, setPeriod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('dates');
    const [startDate, setStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [endDate, setEnd] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [hebergement, setHeberg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [withTransport, setWithT] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [villeDepart, setVilleDepart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [distanceHours, setDistanceHours] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const scrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isOpen && initialSeminaire) {
            setSelectedSeminaireId(initialSeminaire.id);
            setSelectedFormatId(initialFormatId in (initialSeminaire.formats || {}) ? initialFormatId : '1jour');
        }
    }, [
        isOpen,
        initialSeminaire,
        initialFormatId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (scrollRef.current) scrollRef.current.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [
        step
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const h = (e)=>{
            if (e.key === 'Escape') handleClose();
        };
        document.addEventListener('keydown', h);
        return ()=>document.removeEventListener('keydown', h);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return ()=>{
            document.body.style.overflow = '';
        };
    }, [
        isOpen
    ]);
    const handleClose = ()=>{
        setClosing(true);
        setTimeout(()=>{
            setClosing(false);
            setStep(1);
            setSuccess(false);
            setError('');
            setForm({
                prenom: '',
                nom: '',
                email: '',
                entreprise: '',
                participants: '',
                message: ''
            });
            setSelectedSeminaireId(null);
            setSelectedFormatId('1jour');
            setAccTypes([]);
            setTransport('');
            setMonths([]);
            setStart('');
            setEnd('');
            setHeberg(false);
            setWithT(false);
            setVilleDepart('');
            setDistanceHours(1);
            onClose();
        }, 280);
    };
    const toggle = (list, setList, item)=>setList(list.includes(item) ? list.filter((i)=>i !== item) : [
            ...list,
            item
        ]);
    const selectedSeminaire = seminaires.find((s)=>s.id === selectedSeminaireId) ?? seminaires[0] ?? null;
    const selectedFormat = selectedSeminaire && selectedFormatId in selectedSeminaire.formats ? selectedSeminaire.formats[selectedFormatId] : null;
    const formatLabel = FORMATS.find((f)=>f.id === selectedFormatId)?.label ?? selectedFormatId;
    const goNext = ()=>{
        setError('');
        if (step === 1 && (!selectedSeminaireId || !selectedFormatId)) {
            setError('Veuillez sélectionner une offre.');
            return;
        }
        if (step === 2) {
            const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
            const periodOk = periodMode === 'months' ? months.length > 0 : !!startDate && !!endDate;
            if (!form.prenom || !form.nom || !form.email || !emailOk || !form.entreprise || !form.participants || !periodOk) {
                setError('Certains champs obligatoires sont manquants ou invalides.');
                return;
            }
        }
        setTrans(true);
        setTimeout(()=>{
            setStep((s)=>Math.min(s + 1, 4));
            setTrans(false);
        }, 180);
    };
    const goPrev = ()=>{
        setTrans(true);
        setTimeout(()=>{
            setStep((s)=>Math.max(s - 1, 1));
            setTrans(false);
        }, 180);
    };
    const periodStr = periodMode === 'dates' ? startDate && endDate ? `${new Date(startDate).toLocaleDateString('fr-FR')} → ${new Date(endDate).toLocaleDateString('fr-FR')}` : '' : months.length > 0 ? months.join(', ') : '';
    const handleSubmit = async ()=>{
        setSubmit(true);
        const selectionLine = selectedSeminaire && selectedFormat ? `${selectedSeminaire.producteur} — ${formatLabel} (${selectedFormat.titre})` : 'Non renseigné';
        try {
            const res = await fetch('https://formsubmit.co/ajax/alexso.terrago@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    name: `${form.prenom} ${form.nom}`,
                    email: form.email,
                    subject: `Nouvelle demande séminaire pack - ${form.entreprise}`,
                    message: `SÉLECTION\n${selectionLine}\n\nCOORDONNÉES\nPrénom: ${form.prenom} | Nom: ${form.nom}\nEmail: ${form.email} | Entreprise: ${form.entreprise}\nParticipants: ${form.participants}\nPériode: ${periodStr}\n\nLOGISTIQUE\nVille de départ: ${villeDepart || '—'}\nDistance max: ${distanceHours} h\nHébergement: ${hebergement ? accTypes.join(', ') || 'Oui' : 'Non'}\nTransport: ${withTransport ? transport || 'Oui' : 'Non'}\n\nMessage: ${form.message || '—'}`,
                    _captcha: false
                })
            });
            if (res.ok) {
                setSuccess(true);
                setTimeout(handleClose, 2200);
            } else throw new Error();
        } catch  {
            alert('Erreur lors de l\'envoi. Veuillez réessayer.');
        } finally{
            setSubmit(false);
        }
    };
    if (!isOpen) return null;
    const selectOptions = seminaires.map((s)=>({
            value: s.id,
            label: `${s.label} — ${s.producteur}`
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: handleClose,
                style: {
                    position: 'fixed',
                    inset: 0,
                    zIndex: 999,
                    background: 'rgba(10,20,10,0.65)',
                    backdropFilter: 'blur(6px)',
                    opacity: closing ? 0 : 1,
                    transition: 'opacity 0.28s ease'
                }
            }, void 0, false, {
                fileName: "[project]/views/Seminaires-pack.tsx",
                lineNumber: 512,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'fixed',
                    inset: 0,
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 16,
                    pointerEvents: 'none'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: (e)=>e.stopPropagation(),
                    style: {
                        pointerEvents: 'auto',
                        width: '100%',
                        maxWidth: 860,
                        maxHeight: '96vh',
                        minHeight: step === 1 ? '75vh' : undefined,
                        background: '#fff',
                        borderRadius: 28,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        boxShadow: '0 8px 48px rgba(0,0,0,0.14)',
                        animation: `${closing ? 'semModalOut' : 'semModalIn'} 0.32s cubic-bezier(0.22,1,0.36,1) both`,
                        fontFamily: 'inherit',
                        position: 'relative',
                        transition: 'min-height 0.25s ease'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: '20px 24px 0',
                                background: '#fff',
                                flexShrink: 0,
                                borderBottom: '1px solid rgba(10,44,52,0.06)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginBottom: 16
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 8
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        width: 16,
                                                        height: 1,
                                                        background: '#e67e22'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                                    lineNumber: 520,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 11,
                                                        fontWeight: 700,
                                                        letterSpacing: '0.28em',
                                                        textTransform: 'uppercase',
                                                        color: '#e67e22'
                                                    },
                                                    children: "Votre projet de séminaire"
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                                    lineNumber: 521,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                            lineNumber: 519,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleClose,
                                            style: {
                                                width: 32,
                                                height: 32,
                                                borderRadius: '50%',
                                                flexShrink: 0,
                                                background: '#f4f1ec',
                                                border: 'none',
                                                color: '#6b7280',
                                                fontSize: 18,
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            },
                                            children: "×"
                                        }, void 0, false, {
                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                            lineNumber: 523,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                    lineNumber: 518,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: 6,
                                        paddingBottom: 14
                                    },
                                    children: STEPS.map((st, i)=>{
                                        const idx = i + 1;
                                        const done = step > idx;
                                        const active = step === idx;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                flex: 1,
                                                minWidth: 0
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        height: 2,
                                                        borderRadius: 2,
                                                        background: done ? '#e67e22' : active ? '#1a2e1a' : 'rgba(10,44,52,0.08)',
                                                        transition: 'background 0.4s ease',
                                                        marginBottom: 5
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                                    lineNumber: 530,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 10,
                                                        fontWeight: 700,
                                                        letterSpacing: '0.08em',
                                                        textTransform: 'uppercase',
                                                        color: active ? '#1a2e1a' : done ? '#e67e22' : 'rgba(10,44,52,0.28)',
                                                        display: 'block',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    },
                                                    children: [
                                                        idx,
                                                        ". ",
                                                        st.label
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                                    lineNumber: 531,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, st.label, true, {
                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                            lineNumber: 529,
                                            columnNumber: 19
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                    lineNumber: 525,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/Seminaires-pack.tsx",
                            lineNumber: 517,
                            columnNumber: 11
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                background: 'rgba(230,126,34,0.07)',
                                borderBottom: '1px solid rgba(230,126,34,0.2)',
                                padding: '10px 24px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                flexShrink: 0
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 14
                                    },
                                    children: "⚠️"
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                    lineNumber: 541,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 13,
                                        color: '#c0620a',
                                        fontWeight: 600,
                                        margin: 0,
                                        flex: 1
                                    },
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                    lineNumber: 542,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setError(''),
                                    style: {
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#c0620a',
                                        fontSize: 16,
                                        fontFamily: 'inherit'
                                    },
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                    lineNumber: 543,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/Seminaires-pack.tsx",
                            lineNumber: 540,
                            columnNumber: 13
                        }, this),
                        success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: 'absolute',
                                inset: 0,
                                zIndex: 20,
                                background: 'rgba(255,255,255,0.96)',
                                backdropFilter: 'blur(4px)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 24
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: 60,
                                        height: 60,
                                        borderRadius: '50%',
                                        background: '#1a2e1a',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: 20,
                                        boxShadow: '0 8px 24px rgba(26,46,26,0.2)'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "24",
                                        height: "24",
                                        viewBox: "0 0 34 34",
                                        fill: "none",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M8 17.5L14 23.5L26 11",
                                            stroke: "#fff",
                                            strokeWidth: "2.5",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round"
                                        }, void 0, false, {
                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                            lineNumber: 551,
                                            columnNumber: 77
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                        lineNumber: 551,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                    lineNumber: 550,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    style: {
                                        fontStyle: 'italic',
                                        fontSize: 28,
                                        fontWeight: 700,
                                        color: '#1a2e1a',
                                        margin: '0 0 8px',
                                        fontFamily: 'inherit'
                                    },
                                    children: "Demande envoyée !"
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                    lineNumber: 553,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        color: '#9a9080',
                                        fontSize: 15,
                                        margin: 0
                                    },
                                    children: "Nous vous recontacterons sous 48h."
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                    lineNumber: 554,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/Seminaires-pack.tsx",
                            lineNumber: 549,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: scrollRef,
                            style: {
                                flex: 1,
                                overflowY: 'auto',
                                padding: '28px 24px 0',
                                scrollbarWidth: 'none'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    opacity: transitioning ? 0 : 1,
                                    transform: transitioning ? 'translateY(6px)' : 'translateY(0)',
                                    transition: 'all 0.18s ease'
                                },
                                children: [
                                    step === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 22
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        style: {
                                                            fontStyle: 'italic',
                                                            fontSize: 24,
                                                            fontWeight: 700,
                                                            color: '#1a2e1a',
                                                            margin: '0 0 4px',
                                                            fontFamily: 'inherit'
                                                        },
                                                        children: "Votre sélection."
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                                        lineNumber: 566,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            color: '#b0a89e',
                                                            fontSize: 14,
                                                            margin: 0
                                                        },
                                                        children: "Récapitulatif de l'offre choisie. Vous pouvez en sélectionner une autre."
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                                        lineNumber: 567,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/views/Seminaires-pack.tsx",
                                                lineNumber: 565,
                                                columnNumber: 19
                                            }, this),
                                            selectedSeminaire && selectedFormat && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    background: '#faf8f5',
                                                    borderRadius: 16,
                                                    padding: '16px 18px',
                                                    border: '1px solid rgba(10,44,52,0.08)'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: 11,
                                                            fontWeight: 700,
                                                            letterSpacing: '0.18em',
                                                            textTransform: 'uppercase',
                                                            color: '#e67e22',
                                                            marginBottom: 8
                                                        },
                                                        children: "Actuellement sélectionné"
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                                        lineNumber: 571,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: 16,
                                                            fontWeight: 700,
                                                            color: '#1a2e1a',
                                                            marginBottom: 4
                                                        },
                                                        children: selectedSeminaire.producteur
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                                        lineNumber: 572,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: 14,
                                                            color: '#7a7060'
                                                        },
                                                        children: [
                                                            formatLabel,
                                                            " — ",
                                                            selectedFormat.titre
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                                        lineNumber: 573,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/views/Seminaires-pack.tsx",
                                                lineNumber: 570,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldBlock, {
                                                label: "Changer de produit",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomSelect, {
                                                    value: selectedSeminaireId ?? '',
                                                    onChange: (val)=>setSelectedSeminaireId(val || null),
                                                    options: selectOptions,
                                                    placeholder: "— Choisir un produit —"
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                                    lineNumber: 577,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/views/Seminaires-pack.tsx",
                                                lineNumber: 576,
                                                columnNumber: 19
                                            }, this),
                                            selectedSeminaire && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldBlock, {
                                                label: "Changer d'offre (format)",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        flexWrap: 'wrap',
                                                        gap: 8
                                                    },
                                                    children: FORMATS.filter((f)=>f.id in (selectedSeminaire.formats || {})).map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TagBtn, {
                                                            active: selectedFormatId === f.id,
                                                            onClick: ()=>setSelectedFormatId(f.id),
                                                            children: f.label
                                                        }, f.id, false, {
                                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                                            lineNumber: 588,
                                                            columnNumber: 27
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                                    lineNumber: 586,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/views/Seminaires-pack.tsx",
                                                lineNumber: 585,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                        lineNumber: 564,
                                        columnNumber: 17
                                    }, this),
                                    step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 22
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        style: {
                                                            fontStyle: 'italic',
                                                            fontSize: 24,
                                                            fontWeight: 700,
                                                            color: '#1a2e1a',
                                                            margin: '0 0 4px',
                                                            fontFamily: 'inherit'
                                                        },
                                                        children: "Informations & coordonnées."
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                                        lineNumber: 600,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            color: '#b0a89e',
                                                            fontSize: 14,
                                                            margin: 0
                                                        },
                                                        children: "Qui vous êtes et quand vous souhaitez partir."
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                                        lineNumber: 601,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/views/Seminaires-pack.tsx",
                                                lineNumber: 599,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'grid',
                                                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                                    gap: 14
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldBlock, {
                                                        label: "Prénom",
                                                        required: true,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            style: inputStyle,
                                                            placeholder: "Jean",
                                                            value: form.prenom,
                                                            onChange: (e)=>setForm({
                                                                    ...form,
                                                                    prenom: e.target.value
                                                                })
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                                            lineNumber: 604,
                                                            columnNumber: 57
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                                        lineNumber: 604,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldBlock, {
                                                        label: "Nom",
                                                        required: true,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            style: inputStyle,
                                                            placeholder: "Dupont",
                                                            value: form.nom,
                                                            onChange: (e)=>setForm({
                                                                    ...form,
                                                                    nom: e.target.value
                                                                })
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                                            lineNumber: 605,
                                                            columnNumber: 54
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                                        lineNumber: 605,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldBlock, {
                                                        label: "Email professionnel",
                                                        required: true,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            style: inputStyle,
                                                            type: "email",
                                                            placeholder: "contact@entreprise.fr",
                                                            value: form.email,
                                                            onChange: (e)=>setForm({
                                                                    ...form,
                                                                    email: e.target.value
                                                                })
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                                            lineNumber: 606,
                                                            columnNumber: 70
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                                        lineNumber: 606,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldBlock, {
                                                        label: "Entreprise",
                                                        required: true,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            style: inputStyle,
                                                            placeholder: "Terroir SAS",
                                                            value: form.entreprise,
                                                            onChange: (e)=>setForm({
                                                                    ...form,
                                                                    entreprise: e.target.value
                                                                })
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                                            lineNumber: 607,
                                                            columnNumber: 61
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                                        lineNumber: 607,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/views/Seminaires-pack.tsx",
                                                lineNumber: 603,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldBlock, {
                                                label: "Nombre de participants",
                                                required: true,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        flexWrap: 'wrap',
                                                        gap: 8
                                                    },
                                                    children: PARTICIPANTS_OPTIONS.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TagBtn, {
                                                            active: form.participants === p,
                                                            onClick: ()=>setForm({
                                                                    ...form,
                                                                    participants: p
                                                                }),
                                                            children: p
                                                        }, p, false, {
                                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                                            lineNumber: 611,
                                                            columnNumber: 54
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                                    lineNumber: 610,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/views/Seminaires-pack.tsx",
                                                lineNumber: 609,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldBlock, {
                                                label: "Période souhaitée",
                                                required: true,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            gap: 8,
                                                            marginBottom: 12,
                                                            flexWrap: 'wrap'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ModeBtn, {
                                                                active: periodMode === 'dates',
                                                                onClick: ()=>{
                                                                    setPeriod('dates');
                                                                    setMonths([]);
                                                                },
                                                                children: "Dates précises"
                                                            }, void 0, false, {
                                                                fileName: "[project]/views/Seminaires-pack.tsx",
                                                                lineNumber: 616,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ModeBtn, {
                                                                active: periodMode === 'months',
                                                                onClick: ()=>{
                                                                    setPeriod('months');
                                                                    setStart('');
                                                                    setEnd('');
                                                                },
                                                                children: "Choisir des mois"
                                                            }, void 0, false, {
                                                                fileName: "[project]/views/Seminaires-pack.tsx",
                                                                lineNumber: 617,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                                        lineNumber: 615,
                                                        columnNumber: 21
                                                    }, this),
                                                    periodMode === 'dates' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DateRangePicker, {
                                                        startDate: startDate,
                                                        endDate: endDate,
                                                        onStartChange: setStart,
                                                        onEndChange: setEnd
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                                        lineNumber: 620,
                                                        columnNumber: 25
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            flexWrap: 'wrap',
                                                            gap: 7
                                                        },
                                                        children: MONTHS.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TagBtn, {
                                                                active: months.includes(m),
                                                                onClick: ()=>toggle(months, setMonths, m),
                                                                children: m
                                                            }, m, false, {
                                                                fileName: "[project]/views/Seminaires-pack.tsx",
                                                                lineNumber: 621,
                                                                columnNumber: 101
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                                        lineNumber: 621,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/views/Seminaires-pack.tsx",
                                                lineNumber: 614,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                        lineNumber: 598,
                                        columnNumber: 17
                                    }, this),
                                    step === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 22
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        style: {
                                                            fontStyle: 'italic',
                                                            fontSize: 24,
                                                            fontWeight: 700,
                                                            color: '#1a2e1a',
                                                            margin: '0 0 4px',
                                                            fontFamily: 'inherit'
                                                        },
                                                        children: "Logistique."
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                                        lineNumber: 630,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            color: '#b0a89e',
                                                            fontSize: 14,
                                                            margin: 0
                                                        },
                                                        children: "Ville de départ, distance, hébergement et transport."
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                                        lineNumber: 631,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/views/Seminaires-pack.tsx",
                                                lineNumber: 629,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldBlock, {
                                                label: "Votre ville de départ",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    style: inputStyle,
                                                    placeholder: "Ex : Paris, Lyon, Bordeaux…",
                                                    value: villeDepart,
                                                    onChange: (e)=>setVilleDepart(e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                                    lineNumber: 634,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/views/Seminaires-pack.tsx",
                                                lineNumber: 633,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldBlock, {
                                                label: "Distance max souhaitée",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 12
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>setDistanceHours((h)=>Math.max(1, h - 1)),
                                                            style: {
                                                                width: 36,
                                                                height: 36,
                                                                borderRadius: '50%',
                                                                border: '1px solid rgba(10,44,52,0.15)',
                                                                background: '#fff',
                                                                cursor: 'pointer',
                                                                fontSize: 18,
                                                                fontWeight: 700,
                                                                color: '#1a2e1a',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center'
                                                            },
                                                            children: "−"
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                                            lineNumber: 638,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: 16,
                                                                fontWeight: 700,
                                                                color: '#1a2e1a',
                                                                minWidth: 80,
                                                                textAlign: 'center'
                                                            },
                                                            children: [
                                                                distanceHours,
                                                                " heure",
                                                                distanceHours > 1 ? 's' : ''
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                                            lineNumber: 639,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>setDistanceHours((h)=>Math.min(6, h + 1)),
                                                            style: {
                                                                width: 36,
                                                                height: 36,
                                                                borderRadius: '50%',
                                                                border: '1px solid rgba(10,44,52,0.15)',
                                                                background: '#fff',
                                                                cursor: 'pointer',
                                                                fontSize: 18,
                                                                fontWeight: 700,
                                                                color: '#1a2e1a',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center'
                                                            },
                                                            children: "+"
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                                            lineNumber: 640,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                                    lineNumber: 637,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/views/Seminaires-pack.tsx",
                                                lineNumber: 636,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'grid',
                                                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                                    gap: 12
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToggleCard, {
                                                        icon: "🏠",
                                                        label: "Hébergement",
                                                        active: hebergement,
                                                        onToggle: ()=>setHeberg((v)=>!v),
                                                        children: hebergement && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'flex',
                                                                flexWrap: 'wrap',
                                                                gap: 8,
                                                                marginTop: 12
                                                            },
                                                            children: [
                                                                'Chambres seules',
                                                                'Chambres partagées'
                                                            ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TagBtn, {
                                                                    active: accTypes.includes(t),
                                                                    onClick: ()=>toggle(accTypes, setAccTypes, t),
                                                                    small: true,
                                                                    children: t
                                                                }, t, false, {
                                                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                                                    lineNumber: 645,
                                                                    columnNumber: 165
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                                            lineNumber: 645,
                                                            columnNumber: 39
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                                        lineNumber: 644,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToggleCard, {
                                                        icon: "🚗",
                                                        label: "Transport",
                                                        active: withTransport,
                                                        onToggle: ()=>setWithT((v)=>!v),
                                                        children: withTransport && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                gap: 8,
                                                                marginTop: 12
                                                            },
                                                            children: [
                                                                'De porte à porte',
                                                                'Depuis gare SNCF proche'
                                                            ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TagBtn, {
                                                                    active: transport === t,
                                                                    onClick: ()=>setTransport(t),
                                                                    small: true,
                                                                    children: t
                                                                }, t, false, {
                                                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                                                    lineNumber: 648,
                                                                    columnNumber: 180
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                                            lineNumber: 648,
                                                            columnNumber: 41
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                                        lineNumber: 647,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/views/Seminaires-pack.tsx",
                                                lineNumber: 643,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldBlock, {
                                                label: "Un message particulier ?",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                    rows: 4,
                                                    style: {
                                                        ...inputStyle,
                                                        resize: 'none',
                                                        lineHeight: 1.6
                                                    },
                                                    placeholder: "Salles de réunion, pauses gourmandes, team building…",
                                                    value: form.message,
                                                    onChange: (e)=>setForm({
                                                            ...form,
                                                            message: e.target.value
                                                        })
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                                    lineNumber: 652,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/views/Seminaires-pack.tsx",
                                                lineNumber: 651,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                        lineNumber: 628,
                                        columnNumber: 17
                                    }, this),
                                    step === 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 14
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    color: '#b0a89e',
                                                    fontSize: 14,
                                                    margin: '0 0 4px'
                                                },
                                                children: "Vérifiez vos informations avant d'envoyer."
                                            }, void 0, false, {
                                                fileName: "[project]/views/Seminaires-pack.tsx",
                                                lineNumber: 660,
                                                columnNumber: 19
                                            }, this),
                                            [
                                                {
                                                    num: 1,
                                                    title: 'Sélection',
                                                    rows: [
                                                        {
                                                            label: 'Produit / offre',
                                                            value: selectedSeminaire && selectedFormat ? `${selectedSeminaire.producteur} — ${formatLabel} (${selectedFormat.titre})` : '—'
                                                        }
                                                    ]
                                                },
                                                {
                                                    num: 2,
                                                    title: 'Coordonnées',
                                                    rows: [
                                                        {
                                                            label: 'Nom',
                                                            value: `${form.prenom} ${form.nom}`
                                                        },
                                                        {
                                                            label: 'Email',
                                                            value: form.email
                                                        },
                                                        {
                                                            label: 'Entreprise',
                                                            value: form.entreprise
                                                        },
                                                        {
                                                            label: 'Participants',
                                                            value: form.participants
                                                        },
                                                        {
                                                            label: 'Période',
                                                            value: periodStr || '—'
                                                        }
                                                    ]
                                                },
                                                {
                                                    num: 3,
                                                    title: 'Logistique',
                                                    rows: [
                                                        {
                                                            label: 'Ville de départ',
                                                            value: villeDepart || '—'
                                                        },
                                                        {
                                                            label: 'Distance max',
                                                            value: `${distanceHours} h`
                                                        },
                                                        {
                                                            label: 'Hébergement',
                                                            value: hebergement ? accTypes.length > 0 ? accTypes.join(', ') : 'Oui' : 'Non'
                                                        },
                                                        {
                                                            label: 'Transport',
                                                            value: withTransport ? transport || 'Oui' : 'Non'
                                                        },
                                                        ...form.message ? [
                                                            {
                                                                label: 'Message',
                                                                value: form.message
                                                            }
                                                        ] : []
                                                    ]
                                                }
                                            ].map((block)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        background: '#faf8f5',
                                                        borderRadius: 16,
                                                        padding: '14px 18px',
                                                        border: '1px solid rgba(10,44,52,0.06)'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: 11,
                                                                fontWeight: 700,
                                                                letterSpacing: '0.18em',
                                                                textTransform: 'uppercase',
                                                                color: '#e67e22',
                                                                marginBottom: 10
                                                            },
                                                            children: [
                                                                block.num,
                                                                " — ",
                                                                block.title
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                                            lineNumber: 667,
                                                            columnNumber: 23
                                                        }, this),
                                                        block.rows.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RecapRow, {
                                                                label: r.label,
                                                                value: typeof r.value === 'string' ? r.value : ''
                                                            }, r.label, false, {
                                                                fileName: "[project]/views/Seminaires-pack.tsx",
                                                                lineNumber: 668,
                                                                columnNumber: 44
                                                            }, this))
                                                    ]
                                                }, block.num, true, {
                                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                                    lineNumber: 666,
                                                    columnNumber: 21
                                                }, this)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 13,
                                                    color: '#b0a89e',
                                                    textAlign: 'center',
                                                    margin: '4px 0 0'
                                                },
                                                children: [
                                                    "Tout est correct ? Cliquez sur ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        style: {
                                                            color: '#1a2e1a'
                                                        },
                                                        children: "Demander un devis"
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                                        lineNumber: 671,
                                                        columnNumber: 136
                                                    }, this),
                                                    "."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/views/Seminaires-pack.tsx",
                                                lineNumber: 671,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                        lineNumber: 659,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/views/Seminaires-pack.tsx",
                                lineNumber: 560,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/views/Seminaires-pack.tsx",
                            lineNumber: 559,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: '20px 24px',
                                borderTop: '1px solid rgba(26,46,26,0.06)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: 12,
                                flexShrink: 0,
                                flexWrap: 'wrap'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: goPrev,
                                    disabled: step === 1,
                                    style: {
                                        fontSize: 11,
                                        fontWeight: 700,
                                        letterSpacing: '0.15em',
                                        textTransform: 'uppercase',
                                        color: step === 1 ? 'transparent' : '#b0a89e',
                                        background: 'none',
                                        border: 'none',
                                        cursor: step === 1 ? 'default' : 'pointer',
                                        fontFamily: 'inherit',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6,
                                        transition: 'color .2s',
                                        pointerEvents: step === 1 ? 'none' : 'auto'
                                    },
                                    children: "← Précédent"
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                    lineNumber: 679,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: 10
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleClose,
                                            style: {
                                                padding: '11px 20px',
                                                borderRadius: 9999,
                                                border: '1px solid rgba(26,46,26,0.1)',
                                                background: '#faf8f5',
                                                fontFamily: 'inherit',
                                                fontSize: 11,
                                                fontWeight: 700,
                                                letterSpacing: '0.1em',
                                                textTransform: 'uppercase',
                                                color: '#b0a89e',
                                                cursor: 'pointer'
                                            },
                                            children: "Annuler"
                                        }, void 0, false, {
                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                            lineNumber: 684,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: step < 4 ? goNext : handleSubmit,
                                            disabled: submitting,
                                            style: {
                                                padding: '11px 24px',
                                                borderRadius: 9999,
                                                background: '#1a2e1a',
                                                color: '#fff',
                                                border: 'none',
                                                fontFamily: 'inherit',
                                                fontSize: 11,
                                                fontWeight: 700,
                                                letterSpacing: '0.12em',
                                                textTransform: 'uppercase',
                                                cursor: submitting ? 'not-allowed' : 'pointer',
                                                opacity: submitting ? 0.7 : 1,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 8,
                                                minWidth: 150,
                                                justifyContent: 'center',
                                                transition: 'background .2s'
                                            },
                                            children: submitting ? 'Envoi…' : step < 4 ? 'Continuer →' : 'Demander un devis'
                                        }, void 0, false, {
                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                            lineNumber: 685,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                    lineNumber: 683,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/Seminaires-pack.tsx",
                            lineNumber: 678,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/views/Seminaires-pack.tsx",
                    lineNumber: 514,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/views/Seminaires-pack.tsx",
                lineNumber: 513,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
// ─── Page principale ───────────────────────────────────────────────────────────
function cardSearchableText(s) {
    const parts = [
        s.label,
        s.producteur,
        s.region
    ];
    Object.values(s.formats || {}).forEach((f)=>{
        parts.push(f.titre, f.sous_titre);
    });
    return parts.filter(Boolean).join(' ').toLowerCase();
}
function SeminairesPage() {
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const [seminaires, setSeminaires] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [fetchError, setFetchError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeProduit, setActiveProduit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('all');
    const [activeFormat, setActiveFormat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('1jour');
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [direction, setDirection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('Right');
    const [animKey, setAnimKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [modalOpen, setModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        async function fetchData() {
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('seminaires').select(`*, seminaire_formats (*, seminaire_programme (heure, action, ordre))`).order('ordre');
            if (error) {
                setFetchError(error.message || 'Impossible de charger les offres.');
                setLoading(false);
                return;
            }
            const formatted = (data ?? []).map((s)=>{
                const formats = {};
                (s.seminaire_formats ?? []).forEach((f)=>{
                    formats[f.type] = {
                        titre: f.titre,
                        sous_titre: f.sous_titre,
                        participants: f.participants,
                        duree: f.duree,
                        prix: f.prix,
                        inclus: f.inclus ?? [],
                        programme: [
                            ...f.seminaire_programme ?? []
                        ].sort((a, b)=>a.ordre - b.ordre).map((p)=>({
                                heure: p.heure,
                                action: p.action
                            }))
                    };
                });
                return {
                    id: s.id,
                    label: s.label,
                    producteur: s.producteur,
                    region: s.region,
                    couleur: s.couleur,
                    couleurLight: s.couleur_light,
                    bestseller: s.bestseller,
                    image: s.image,
                    images: s.images?.length > 0 ? s.images : s.image ? [
                        s.image
                    ] : [],
                    formats
                };
            });
            setSeminaires(formatted);
            setLoading(false);
        }
        fetchData();
    }, []);
    const appliedUniversRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const univers = searchParams.get('univers');
        if (!univers || seminaires.length === 0 || appliedUniversRef.current) return;
        const config = UNIVERS_TO_PACK[univers];
        if (!config || !PRODUITS.some((p)=>p.id === config.produitId)) return;
        appliedUniversRef.current = true;
        setActiveProduit(config.produitId);
        const filteredByProduit = config.produitId === 'all' ? seminaires : seminaires.filter((s)=>s.id === config.produitId);
        const matchIndex = filteredByProduit.findIndex((s)=>config.keywords.some((kw)=>cardSearchableText(s).includes(kw.toLowerCase())));
        if (matchIndex >= 0) {
            setCurrentIndex(matchIndex);
            setAnimKey((k)=>k + 1);
        }
    }, [
        seminaires,
        searchParams
    ]);
    const filtered = activeProduit === 'all' ? seminaires : seminaires.filter((s)=>s.id === activeProduit).length ? seminaires.filter((s)=>s.id === activeProduit) : seminaires;
    const safeIndex = Math.min(currentIndex, Math.max(filtered.length - 1, 0));
    const s = filtered[safeIndex] || filtered[0];
    const fmt = s?.formats[activeFormat];
    const navigate = (dir)=>{
        const next = dir === 'next' ? Math.min(safeIndex + 1, filtered.length - 1) : Math.max(safeIndex - 1, 0);
        if (next === safeIndex) return;
        setDirection(dir === 'next' ? 'Right' : 'Left');
        setCurrentIndex(next);
        setAnimKey((k)=>k + 1);
    };
    const changeProduit = (p)=>{
        setActiveProduit(p);
        setCurrentIndex(0);
        setDirection('Right');
        setAnimKey((k)=>k + 1);
    };
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#faf8f5'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                textAlign: 'center'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        width: 32,
                        height: 32,
                        border: '2px solid rgba(26,46,26,0.1)',
                        borderTop: '2px solid #1a2e1a',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite',
                        margin: '0 auto 16px'
                    }
                }, void 0, false, {
                    fileName: "[project]/views/Seminaires-pack.tsx",
                    lineNumber: 775,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        color: '#b0a89e',
                        fontSize: 11,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        margin: 0
                    },
                    children: "Chargement…"
                }, void 0, false, {
                    fileName: "[project]/views/Seminaires-pack.tsx",
                    lineNumber: 776,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/views/Seminaires-pack.tsx",
            lineNumber: 774,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/views/Seminaires-pack.tsx",
        lineNumber: 773,
        columnNumber: 5
    }, this);
    const hasData = s && fmt;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: '#faf8f5',
            minHeight: '100vh',
            fontFamily: 'inherit'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes semSlideInRight  { from{opacity:0;transform:translateX(28px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes semSlideInLeft   { from{opacity:0;transform:translateX(-28px)} to{opacity:1;transform:translateX(0)} }
        @keyframes photoSlideInRight{ from{opacity:0;transform:translateX(40px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes photoSlideInLeft { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes semModalIn  { from{opacity:0;transform:translateY(24px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes semModalOut { from{opacity:1;transform:translateY(0) scale(1)} to{opacity:0;transform:translateY(24px) scale(0.97)} }
        @keyframes spin { to { transform: rotate(360deg); } }
        ::-webkit-scrollbar { display:none; }
        .sem-img-arrow { opacity:0; transition:opacity 0.2s ease; }
        .sem-img-wrap:hover .sem-img-arrow { opacity:1; }

        /* ── Layout ── */
        .sem-page { max-width:1200px; margin:0 auto; padding:0 clamp(1rem,3vw,1.75rem) 80px; }
        .sem-header { padding-top:calc(84px + 4rem); padding-bottom:2.5rem; }
        .sem-layout { display:grid; grid-template-columns:180px 1fr; gap:0; align-items:start; }

        /* ── Sidebar ── */
        .sem-sidebar { position:sticky; top:100px; padding-right:28px; padding-top:4px; }
        .sem-filter-btn { display:flex; align-items:center; width:100%; text-align:left; padding:8px 12px; border-radius:10px; border:none; background:transparent; font-family:inherit; font-size:12px; font-weight:600; cursor:pointer; color:#b0a89e; transition:all 0.15s ease; margin-bottom:2px; letter-spacing:0.02em; }
        .sem-filter-btn:hover { background:rgba(26,46,26,0.04); color:#1a2e1a; }
        .sem-filter-btn.active { color:#fff; }
        .sem-format-tab { flex:1; padding:8px 4px; border-radius:8px; border:none; font-family:inherit; font-size:10px; font-weight:700; letter-spacing:0.06em; cursor:pointer; transition:all 0.18s ease; white-space:nowrap; text-transform:uppercase; }

        /* ── CTA band ── */
        .sem-cta-band { display:flex; flex-direction:row; align-items:center; justify-content:space-between; gap:32px; flex-wrap:wrap; background:#1e291a; border-radius:24px; padding:48px 64px; }
        .sem-cta-band-btns { display:flex; gap:12px; flex-wrap:wrap; }

        /* ── Responsive ── */
        @media (max-width:900px) {
          .sem-layout { grid-template-columns:160px 1fr; }
        }
        @media (max-width:640px) {
          .sem-layout { grid-template-columns:1fr; }
          .sem-sidebar { position:static; padding-right:0; padding-bottom:20px; border-bottom:1px solid rgba(26,46,26,0.07); margin-bottom:24px; }
          .sem-filters-wrap { display:flex !important; flex-direction:row !important; flex-wrap:wrap; gap:6px; }
          .sem-filter-btn { width:auto !important; display:inline-flex !important; padding:5px 12px !important; border-radius:20px !important; margin-bottom:0 !important; }
          .sem-header { padding-top:calc(64px + 2rem); padding-bottom:1.5rem; }
        }
        @media (max-width:768px) {
          .sem-cta-band { flex-direction:column; text-align:center; padding:32px 24px; gap:24px; }
          .sem-cta-band-btns { flex-direction:column; width:100%; }
          .sem-cta-band-btns a, .sem-cta-band-btns button { width:100%; display:flex !important; align-items:center; justify-content:center; }
        }
        @media (max-width:480px) {
          .sem-cta-band { padding:24px 16px; border-radius:20px; }
        }
      `
            }, void 0, false, {
                fileName: "[project]/views/Seminaires-pack.tsx",
                lineNumber: 785,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SeminaireModal, {
                isOpen: modalOpen,
                onClose: ()=>setModalOpen(false),
                seminaires: seminaires,
                initialSeminaire: hasData && s ? s : null,
                initialFormatId: activeFormat
            }, void 0, false, {
                fileName: "[project]/views/Seminaires-pack.tsx",
                lineNumber: 834,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sem-page",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sem-header",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12,
                                    marginBottom: 20
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 20,
                                            height: 1,
                                            background: '#e67e22'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                        lineNumber: 845,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 9,
                                            letterSpacing: '0.28em',
                                            fontWeight: 700,
                                            textTransform: 'uppercase',
                                            color: '#e67e22'
                                        },
                                        children: "Offres packagées"
                                    }, void 0, false, {
                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                        lineNumber: 846,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/views/Seminaires-pack.tsx",
                                lineNumber: 844,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-primary leading-[1.06]",
                                style: {
                                    letterSpacing: '-0.01em',
                                    margin: '0 0 16px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-sans font-bold text-3xl sm:text-4xl",
                                        children: "Nos offres séminaires nature & "
                                    }, void 0, false, {
                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                        lineNumber: 849,
                                        columnNumber: 3
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-display italic font-bold text-4xl sm:text-5xl",
                                        children: "team building terroir."
                                    }, void 0, false, {
                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                        lineNumber: 850,
                                        columnNumber: 3
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/views/Seminaires-pack.tsx",
                                lineNumber: 848,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "sr-only",
                                children: "Terrago propose des séminaires immersifs chez des producteurs du terroir français : vins, truffes, olives, cognac, piments et plus encore. Formats 1 journée, 2 jours ou sur mesure, de 6 à 150 participants. Team building nature, incentive terroir et séminaire engagé clé en main."
                            }, void 0, false, {
                                fileName: "[project]/views/Seminaires-pack.tsx",
                                lineNumber: 852,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: '#9a9080',
                                    fontSize: 13,
                                    maxWidth: 660,
                                    lineHeight: 1.75,
                                    margin: 0
                                },
                                children: "Séminaires au coeur des terroirs, 1 journée, 2 jours ou sur mesure — des team-buildings humains chez des producteurs français, authentiques et adaptés à vos équipes."
                            }, void 0, false, {
                                fileName: "[project]/views/Seminaires-pack.tsx",
                                lineNumber: 855,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/views/Seminaires-pack.tsx",
                        lineNumber: 843,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sem-layout",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                                className: "sem-sidebar",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 9,
                                            fontWeight: 700,
                                            letterSpacing: '0.22em',
                                            textTransform: 'uppercase',
                                            color: '#d4cec8',
                                            marginBottom: 12
                                        },
                                        children: "Filtrer"
                                    }, void 0, false, {
                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                        lineNumber: 863,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "sem-filters-wrap",
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column'
                                        },
                                        children: PRODUITS.map((p)=>{
                                            const active = activeProduit === p.id;
                                            const activeBg = active && s?.couleur ? s.couleur : '#1a2e1a';
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 6
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>!p.comingSoon && changeProduit(p.id),
                                                        className: `sem-filter-btn${active ? ' active' : ''}`,
                                                        style: {
                                                            ...active ? {
                                                                background: activeBg
                                                            } : {},
                                                            ...p.comingSoon ? {
                                                                opacity: 0.4,
                                                                cursor: 'default'
                                                            } : {}
                                                        },
                                                        children: [
                                                            active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    display: 'inline-block',
                                                                    width: 4,
                                                                    height: 4,
                                                                    borderRadius: '50%',
                                                                    background: 'rgba(255,255,255,0.5)',
                                                                    marginRight: 8,
                                                                    flexShrink: 0
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/views/Seminaires-pack.tsx",
                                                                lineNumber: 873,
                                                                columnNumber: 34
                                                            }, this),
                                                            p.label
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                                        lineNumber: 870,
                                                        columnNumber: 21
                                                    }, this),
                                                    p.comingSoon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: 8,
                                                            fontWeight: 700,
                                                            color: '#b0a89e',
                                                            background: 'rgba(26,46,26,0.05)',
                                                            padding: '2px 7px',
                                                            borderRadius: 5,
                                                            border: '1px solid rgba(26,46,26,0.07)',
                                                            whiteSpace: 'nowrap',
                                                            flexShrink: 0
                                                        },
                                                        children: "bientôt"
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                                        lineNumber: 877,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, p.id, true, {
                                                fileName: "[project]/views/Seminaires-pack.tsx",
                                                lineNumber: 869,
                                                columnNumber: 19
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                        lineNumber: 864,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: 16,
                                            fontSize: 10,
                                            color: '#d4cec8',
                                            fontWeight: 600,
                                            letterSpacing: '0.04em'
                                        },
                                        children: [
                                            filtered.length,
                                            " expérience",
                                            filtered.length > 1 ? 's' : '',
                                            filtered.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    " · ",
                                                    safeIndex + 1,
                                                    "/",
                                                    filtered.length
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/views/Seminaires-pack.tsx",
                                                lineNumber: 885,
                                                columnNumber: 39
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                        lineNumber: 883,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/views/Seminaires-pack.tsx",
                                lineNumber: 862,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                                style: {
                                    minWidth: 0
                                },
                                children: !hasData ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: '#fff',
                                        borderRadius: 20,
                                        border: '1px solid rgba(26,46,26,0.08)',
                                        padding: 'clamp(2rem,5vw,3rem)',
                                        textAlign: 'center',
                                        boxShadow: '0 4px 24px rgba(26,46,26,0.06)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: 48,
                                                marginBottom: 16
                                            },
                                            children: fetchError ? '⚠️' : '📋'
                                        }, void 0, false, {
                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                            lineNumber: 893,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            style: {
                                                fontStyle: 'italic',
                                                fontSize: 22,
                                                fontWeight: 700,
                                                color: '#1a2e1a',
                                                margin: '0 0 10px'
                                            },
                                            children: fetchError ? 'Impossible de charger les offres' : 'Aucune offre pour le moment'
                                        }, void 0, false, {
                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                            lineNumber: 894,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                color: '#9a9080',
                                                fontSize: 13,
                                                margin: '0 auto',
                                                maxWidth: 400,
                                                lineHeight: 1.6
                                            },
                                            children: fetchError || 'Les offres packagées seront bientôt disponibles.'
                                        }, void 0, false, {
                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                            lineNumber: 897,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setModalOpen(true),
                                            style: {
                                                marginTop: 24,
                                                background: '#1a2e1a',
                                                color: '#fff',
                                                fontSize: 10,
                                                fontWeight: 700,
                                                letterSpacing: '0.1em',
                                                padding: '10px 18px',
                                                borderRadius: 9999,
                                                border: 'none',
                                                textTransform: 'uppercase',
                                                cursor: 'pointer',
                                                fontFamily: 'inherit'
                                            },
                                            children: "Demander un devis →"
                                        }, void 0, false, {
                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                            lineNumber: 900,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                    lineNumber: 892,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        animation: `semSlideIn${direction} 0.36s cubic-bezier(0.22,1,0.36,1) both`,
                                        borderRadius: 24,
                                        overflow: 'hidden',
                                        border: '1px solid rgba(26,46,26,0.08)',
                                        boxShadow: '0 4px 24px rgba(26,46,26,0.06)',
                                        background: '#fff'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageCarousel, {
                                            images: s.images,
                                            titre: fmt.titre,
                                            region: s.region,
                                            bestseller: s.bestseller,
                                            resetKey: animKey
                                        }, void 0, false, {
                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                            lineNumber: 907,
                                            columnNumber: 17
                                        }, this),
                                        filtered.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                gap: 12,
                                                padding: '14px 0 16px',
                                                background: '#fff'
                                            },
                                            children: [
                                                safeIndex > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>navigate('prev'),
                                                    style: {
                                                        width: 48,
                                                        height: 48,
                                                        borderRadius: '50%',
                                                        background: '#fff',
                                                        border: '1px solid rgba(26,46,26,0.1)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        cursor: 'pointer',
                                                        boxShadow: '0 2px 8px rgba(26,46,26,0.08)'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        width: "16",
                                                        height: "16",
                                                        viewBox: "0 0 12 12",
                                                        fill: "none",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            d: "M7.5 2L3.5 6L7.5 10",
                                                            stroke: "#1a2e1a",
                                                            strokeWidth: "1.8",
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round"
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                                            lineNumber: 914,
                                                            columnNumber: 85
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                                        lineNumber: 914,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                                    lineNumber: 913,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        gap: 6,
                                                        alignItems: 'center'
                                                    },
                                                    children: filtered.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>{
                                                                setDirection(i > safeIndex ? 'Right' : 'Left');
                                                                setCurrentIndex(i);
                                                                setAnimKey((k)=>k + 1);
                                                            },
                                                            style: {
                                                                width: i === safeIndex ? 20 : 8,
                                                                height: 8,
                                                                borderRadius: 4,
                                                                background: i === safeIndex ? s.couleur : 'rgba(26,46,26,0.2)',
                                                                border: 'none',
                                                                cursor: 'pointer',
                                                                padding: 0,
                                                                transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)'
                                                            }
                                                        }, i, false, {
                                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                                            lineNumber: 919,
                                                            columnNumber: 25
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                                    lineNumber: 917,
                                                    columnNumber: 21
                                                }, this),
                                                safeIndex < filtered.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>navigate('next'),
                                                    style: {
                                                        width: 48,
                                                        height: 48,
                                                        borderRadius: '50%',
                                                        background: '#fff',
                                                        border: '1px solid rgba(26,46,26,0.1)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        cursor: 'pointer',
                                                        boxShadow: '0 2px 8px rgba(26,46,26,0.08)'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        width: "16",
                                                        height: "16",
                                                        viewBox: "0 0 12 12",
                                                        fill: "none",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            d: "M4.5 2L8.5 6L4.5 10",
                                                            stroke: "#1a2e1a",
                                                            strokeWidth: "1.8",
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round"
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                                            lineNumber: 925,
                                                            columnNumber: 85
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/Seminaires-pack.tsx",
                                                        lineNumber: 925,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                                    lineNumber: 924,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                            lineNumber: 911,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                background: '#fff',
                                                padding: 'clamp(18px, 3vw, 28px)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 10,
                                                        fontWeight: 700,
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.18em',
                                                        color: '#b0a89e',
                                                        marginBottom: 8
                                                    },
                                                    children: s.producteur
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                                    lineNumber: 933,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        marginBottom: 16
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontWeight: 700,
                                                                fontSize: 19,
                                                                color: '#1a2e1a',
                                                                lineHeight: 1.25,
                                                                marginBottom: 4
                                                            },
                                                            children: fmt.titre
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                                            lineNumber: 935,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: 14,
                                                                color: '#9a9080',
                                                                fontStyle: 'italic'
                                                            },
                                                            children: fmt.sous_titre
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                                            lineNumber: 936,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                                    lineNumber: 934,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        gap: 0,
                                                        background: 'rgba(26,46,26,0.05)',
                                                        borderRadius: 10,
                                                        padding: '10px 8px',
                                                        marginBottom: 16
                                                    },
                                                    children: FORMATS.map((f)=>{
                                                        const fActive = activeFormat === f.id;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setActiveFormat(f.id),
                                                            className: "sem-format-tab",
                                                            style: {
                                                                background: fActive ? '#fff' : 'transparent',
                                                                color: fActive ? '#1a2e1a' : '#b0a89e',
                                                                boxShadow: fActive ? '0 1px 4px rgba(26,46,26,0.10)' : 'none'
                                                            },
                                                            children: f.label
                                                        }, f.id, false, {
                                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                                            lineNumber: 944,
                                                            columnNumber: 25
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                                    lineNumber: 940,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        flexWrap: 'wrap',
                                                        gap: 10,
                                                        marginBottom: 14,
                                                        alignItems: 'center'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: 12,
                                                                color: '#7a7060',
                                                                fontWeight: 600
                                                            },
                                                            children: fmt.participants
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                                            lineNumber: 953,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                color: '#d4cec8'
                                                            },
                                                            children: "·"
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                                            lineNumber: 954,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: 12,
                                                                color: '#7a7060',
                                                                fontWeight: 600
                                                            },
                                                            children: fmt.duree
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                                            lineNumber: 955,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                                    lineNumber: 952,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        flexWrap: 'wrap',
                                                        gap: 6,
                                                        marginBottom: 18
                                                    },
                                                    children: fmt.inclus.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                background: `${s.couleur}18`,
                                                                color: s.couleur,
                                                                fontSize: 11,
                                                                fontWeight: 600,
                                                                padding: '4px 11px',
                                                                borderRadius: 9999,
                                                                letterSpacing: '0.04em'
                                                            },
                                                            children: [
                                                                "✓ ",
                                                                item
                                                            ]
                                                        }, item, true, {
                                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                                            lineNumber: 960,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                                    lineNumber: 958,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ProgrammeAccordion, {
                                                    programme: fmt.programme,
                                                    couleur: s.couleur,
                                                    triggerKey: animKey + activeFormat
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                                    lineNumber: 964,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        flexWrap: 'wrap',
                                                        gap: 12,
                                                        borderTop: '1px solid rgba(26,46,26,0.06)',
                                                        paddingTop: 16,
                                                        marginTop: 16
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        fontSize: 10,
                                                                        color: '#b0a89e',
                                                                        fontWeight: 700,
                                                                        textTransform: 'uppercase',
                                                                        letterSpacing: '0.12em',
                                                                        marginBottom: 4
                                                                    },
                                                                    children: "Tarif indicatif"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                                                    lineNumber: 968,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        fontSize: 17,
                                                                        fontWeight: 700,
                                                                        color: '#1a2e1a'
                                                                    },
                                                                    children: fmt.prix
                                                                }, void 0, false, {
                                                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                                                    lineNumber: 969,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                                            lineNumber: 967,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setModalOpen(true),
                                                            style: {
                                                                background: '#1a2e1a',
                                                                color: '#fff',
                                                                fontSize: 11,
                                                                fontWeight: 700,
                                                                letterSpacing: '0.1em',
                                                                padding: '12px 22px',
                                                                borderRadius: 9999,
                                                                border: 'none',
                                                                textTransform: 'uppercase',
                                                                cursor: 'pointer',
                                                                fontFamily: 'inherit',
                                                                transition: 'background 0.2s ease',
                                                                whiteSpace: 'nowrap',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 6
                                                            },
                                                            onMouseOver: (e)=>{
                                                                e.currentTarget.style.background = '#2b3e24';
                                                            },
                                                            onMouseOut: (e)=>{
                                                                e.currentTarget.style.background = '#1a2e1a';
                                                            },
                                                            children: [
                                                                "Demander un devis",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    width: "14",
                                                                    height: "14",
                                                                    viewBox: "0 0 24 24",
                                                                    fill: "none",
                                                                    stroke: "currentColor",
                                                                    strokeWidth: "2.5",
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                                            x1: "22",
                                                                            y1: "2",
                                                                            x2: "11",
                                                                            y2: "13"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                                                            lineNumber: 976,
                                                                            columnNumber: 168
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                                                            points: "22 2 15 22 11 13 2 9 22 2"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                                                            lineNumber: 976,
                                                                            columnNumber: 207
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                                                    lineNumber: 976,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                                            lineNumber: 971,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                                    lineNumber: 966,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                            lineNumber: 932,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, animKey, true, {
                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                    lineNumber: 905,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/views/Seminaires-pack.tsx",
                                lineNumber: 890,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/views/Seminaires-pack.tsx",
                        lineNumber: 860,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 96,
                            paddingTop: 48,
                            borderTop: '1px solid #e5e0d8'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "sem-cta-band",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            style: {
                                                color: '#fff',
                                                margin: '0 0 10px',
                                                lineHeight: 1.3
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontFamily: "'Poppins', sans-serif",
                                                        fontStyle: 'normal',
                                                        fontWeight: 700,
                                                        fontSize: 23
                                                    },
                                                    children: "Votre projet ne rentre pas "
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                                    lineNumber: 990,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontFamily: "'Cormorant Garamond', serif",
                                                        fontStyle: 'italic',
                                                        fontWeight: 700,
                                                        fontSize: 32
                                                    },
                                                    children: "dans une case ?"
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                                    lineNumber: 991,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                            lineNumber: 989,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                color: 'rgba(255,255,255,0.6)',
                                                fontSize: 13,
                                                margin: 0,
                                                lineHeight: 1.6
                                            },
                                            children: "Groupe de 5 à 100+ — on construit votre séminaire engagé sur mesure, chez un producteur choisi avec vous."
                                        }, void 0, false, {
                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                            lineNumber: 993,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                    lineNumber: 988,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "sem-cta-band-btns",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setModalOpen(true),
                                            style: {
                                                background: '#f78d00',
                                                color: '#fff',
                                                padding: '12px 20px',
                                                borderRadius: 12,
                                                fontSize: 11,
                                                fontWeight: 700,
                                                letterSpacing: '0.1em',
                                                textTransform: 'uppercase',
                                                border: 'none',
                                                cursor: 'pointer',
                                                fontFamily: 'inherit',
                                                transition: 'opacity 0.2s'
                                            },
                                            onMouseOver: (e)=>{
                                                e.currentTarget.style.opacity = '0.88';
                                            },
                                            onMouseOut: (e)=>{
                                                e.currentTarget.style.opacity = '1';
                                            },
                                            children: "Discutons de votre projet →"
                                        }, void 0, false, {
                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                            lineNumber: 996,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "/partenaires",
                                            style: {
                                                background: 'rgba(255,255,255,0.1)',
                                                color: '#fff',
                                                padding: '12px 20px',
                                                borderRadius: 12,
                                                fontSize: 11,
                                                fontWeight: 700,
                                                letterSpacing: '0.1em',
                                                textTransform: 'uppercase',
                                                border: '1px solid rgba(255,255,255,0.2)',
                                                textDecoration: 'none',
                                                display: 'inline-block',
                                                transition: 'background 0.2s'
                                            },
                                            onMouseOver: (e)=>{
                                                e.currentTarget.style.background = 'rgba(255,255,255,0.18)';
                                            },
                                            onMouseOut: (e)=>{
                                                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                            },
                                            children: "Voir nos producteurs →"
                                        }, void 0, false, {
                                            fileName: "[project]/views/Seminaires-pack.tsx",
                                            lineNumber: 1002,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/views/Seminaires-pack.tsx",
                                    lineNumber: 995,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/Seminaires-pack.tsx",
                            lineNumber: 987,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/views/Seminaires-pack.tsx",
                        lineNumber: 986,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/views/Seminaires-pack.tsx",
                lineNumber: 842,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/views/Seminaires-pack.tsx",
        lineNumber: 784,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_f7f89e03._.js.map