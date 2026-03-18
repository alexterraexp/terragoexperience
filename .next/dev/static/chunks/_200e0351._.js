(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/ScrollAnimate.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const ScrollAnimate = ({ children, className = '', delay = 0, direction = 'up' })=>{
    _s();
    const elementRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScrollAnimate.useEffect": ()=>{
            const element = elementRef.current;
            if (!element) return;
            const observer = new IntersectionObserver({
                "ScrollAnimate.useEffect": ([entry])=>{
                    if (entry.isIntersecting) {
                        setTimeout({
                            "ScrollAnimate.useEffect": ()=>{
                                setIsVisible(true);
                            }
                        }["ScrollAnimate.useEffect"], delay);
                    }
                }
            }["ScrollAnimate.useEffect"], {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            observer.observe(element);
            return ({
                "ScrollAnimate.useEffect": ()=>{
                    observer.disconnect();
                }
            })["ScrollAnimate.useEffect"];
        }
    }["ScrollAnimate.useEffect"], [
        delay
    ]);
    const directionClasses = {
        up: 'translateY(40px)',
        down: 'translateY(-40px)',
        left: 'translateX(40px)',
        right: 'translateX(-40px)'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: elementRef,
        className: `scroll-animate ${className}`,
        style: {
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0) translateX(0)' : directionClasses[direction],
            transition: `opacity 0.8s ease-out ${delay}ms, transform 0.8s ease-out ${delay}ms`
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/ScrollAnimate.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ScrollAnimate, "kj0+AkzNuhJENTgfnnAkIQJQPhA=");
_c = ScrollAnimate;
const __TURBOPACK__default__export__ = ScrollAnimate;
var _c;
__turbopack_context__.k.register(_c, "ScrollAnimate");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/views/Seminaires.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ScrollAnimate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ScrollAnimate.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
// ─── Hero images ──────────────────────────────────────────────────────────────
const heroImages = [
    'https://images.unsplash.com/photo-1646781652500-40015cee4917?q=80&w=2673&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1761839259494-71caddcdd6b3?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1622647713877-62a390a414aa?q=80&w=2675&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1586973831237-7d8dd03a996f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1605673348944-faca4794801b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];
const UNIVERS_DATA = {
    cognac: {
        id: 'cognac',
        label: 'AUTOUR DU COGNAC',
        badge: "COGNAC • 40 MIN D'ANGOULÊME TGV",
        description: "Des vignes aux alambics de cuivre, vivez la magie de la double distillation dans les chais centenaires de la Charente.",
        activites: [
            'Participation aux vendanges',
            'Fabrication de son propre pineau',
            'Visite des chais et alambics',
            'Golf entre les vignes'
        ],
        saison: "Toute l'année",
        couleur: 'rgb(92,42,9)'
    },
    olive: {
        id: 'olive',
        label: "AUTOUR DE L'OLIVE",
        badge: "VALENSOLE • 45 MIN D'AIX EN PROVENCE TGV",
        description: "Sous les oliviers centenaires de Provence, découvrez comment naît une huile d'exception, entre lavande et soleil.",
        activites: [
            'Apprentissage et récolte des olives',
            'Fabrication de son huile',
            'Récolte de lavandes fines',
            "Distillation de son parfum d'ambiance"
        ],
        saison: 'Octobre – Décembre',
        couleur: 'rgb(72,107,9)'
    },
    noix: {
        id: 'noix',
        label: "AUTOUR DE LA NOIX",
        badge: "Romans-sur-Isère • 15 MIN De VALENCE TGV",
        description: "Parmi les noyers centenaires, apprenez la récolte et la fabrication d'une huile de noix artisanale d'une finesse rare.",
        activites: [
            'Apprentissage et récolte des noix',
            'Fabrication de son huile/vin de noix',
            'Repas typique en pleine nature',
            'Session Trail dans un cadre magnifique'
        ],
        saison: 'Septembre – Novembre',
        couleur: 'rgb(161,68,7)'
    },
    truffe: {
        id: 'truffe',
        label: "AUTOUR DE LA TRUFFE",
        badge: "CHINON • 1H DE TOURS TGV",
        description: "Partez à la découverte du champignon le plus mystérieux de France avec un trufficulteur passionné au cœur du Périgord.",
        activites: [
            'Cavage et découverte de la truffe',
            'Atelier cuisine autour de la truffe',
            'Ferme florale et potager',
            'Dégustation de produits truffés'
        ],
        saison: 'Décembre – Mars',
        couleur: 'rgb(104,102,42)'
    },
    fromage: {
        id: 'fromage',
        label: "AUTOUR DU FROMAGE DE CHÈVRE",
        badge: "1H D'AIX-EN-PROVENCE TGV",
        description: "Vivez une journée complète dans une ferme caprine : soins aux bêtes, fabrication de son propre fromage et dégustation en plein air.",
        activites: [
            'Soins aux chèvres',
            'Fabrication du fromage',
            'Dégustation à la ferme',
            'Visite de cave'
        ],
        saison: "Toute l'année",
        couleur: 'rgb(177,146,7)'
    },
    vin: {
        id: 'vin',
        label: "AUTOUR DU VIN AOC VENTOUX",
        badge: "Bédoin • 1H D'AVIGNON TGV",
        description: "Les mains dans la terre, entre vignes et ciel provençal, vivez l'aventure viticole au pied du Mont Ventoux.",
        activites: [
            'Les mains dans la terre',
            'Activité autour de la vigne',
            'Soirée soleil et guinguette',
            'Excursion vélo au Mont Ventoux'
        ],
        saison: 'Avril – Octobre',
        couleur: 'rgb(106,13,13)'
    },
    piment: {
        id: 'piment',
        label: "AUTOUR DU PIMENT",
        badge: "Souraïde • 25 MIN DE BAYONNE TGV",
        description: "Dans les terres basques, découvrez le cycle complet du piment d'Espelette : de la cueillette à la fabrication de votre propre poudre et confiture de piment.",
        activites: [
            'Récolte des piments rouges',
            'Fabrication de sa propre poudre de piment',
            'Atelier confiture & conserves',
            'Initiation à la pelote basque'
        ],
        saison: 'Septembre – Octobre',
        couleur: 'rgb(180,40,20)'
    },
    noisette: {
        id: 'noisette',
        label: "AUTOUR DE LA NOISETTE",
        badge: "Gien • 1h30 de Paris",
        description: "Parmi les noisetiers, vivez la récolte et découvrez comment naîssent les différents produits à base de noisettes.",
        activites: [
            'Récolte des noisettes',
            'Fabrication de son huile de noisette',
            'Atelier pâtisserie autour de la noisette',
            'Yoga en pleine nature'
        ],
        saison: 'Septembre – Novembre',
        couleur: 'rgb(120,80,30)'
    }
};
const UNIVERS_TO_FILTER = {
    cognac: 'Spiritueux',
    olive: 'Olives',
    noix: 'Noix',
    truffe: 'Truffes',
    fromage: 'Élevages',
    vin: 'Vins',
    piment: 'Piments',
    noisette: 'Noisettes'
};
// ─── Modal constants ──────────────────────────────────────────────────────────
const MODAL_MONTHS = [
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
const MODAL_REGIONS = [
    {
        name: 'Nouvelle-Aquitaine',
        icon: '⛵'
    },
    {
        name: 'Auvergne-Rhône-Alpes',
        icon: '🏔'
    },
    {
        name: "Provence-Alpes-Côte d'Azur",
        icon: '☀️'
    }
];
const MODAL_TERROIR = [
    {
        label: 'Olives',
        emoji: '🫒'
    },
    {
        label: 'Piments',
        emoji: '🌶️'
    },
    {
        label: 'Truffe',
        emoji: '🍄'
    },
    {
        label: 'Fromages',
        emoji: '🧀'
    },
    {
        label: 'Huîtres',
        emoji: '🦪'
    },
    {
        label: 'Élevages',
        emoji: '🐄'
    },
    {
        label: 'Agrumes',
        emoji: '🍊'
    },
    {
        label: 'Vins',
        emoji: '🍷'
    },
    {
        label: 'Spiritueux',
        emoji: '🥃'
    },
    {
        label: 'Noisettes',
        emoji: '🌰'
    }
];
// Mapping univers modal → label "Quel produit du terroir découvrir ?" pour présélection au devis
const UNIVERS_ID_TO_TERROIR_LABEL = {
    cognac: 'Spiritueux',
    olive: 'Olives',
    truffe: 'Truffe',
    fromage: 'Fromages',
    vin: 'Vins',
    piment: 'Piments',
    noisette: 'Noisettes'
};
const MODAL_ACC = [
    'Chambres seules',
    'Chambres partagées'
];
const MODAL_TRANS = [
    'De porte à porte',
    'Depuis gare SNCF proche'
];
const MODAL_PARTS = [
    'Moins de 10',
    '10 – 20',
    '20 – 40',
    '40 – 80',
    '80 – 150',
    '150+'
];
const MODAL_STEPS = [
    {
        label: 'Coordonnées'
    },
    {
        label: 'Destination'
    },
    {
        label: 'Logistique'
    },
    {
        label: 'Récapitulatif'
    }
];
// ─── Modal sub-components ─────────────────────────────────────────────────────
const Field = ({ label, required, children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'flex',
            flexDirection: 'column',
            gap: 0
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                style: {
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#b0a89e',
                    display: 'block',
                    marginBottom: 8
                },
                children: [
                    label,
                    required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: '#e67e22',
                            marginLeft: 4
                        },
                        children: "*"
                    }, void 0, false, {
                        fileName: "[project]/views/Seminaires.tsx",
                        lineNumber: 70,
                        columnNumber: 27
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/views/Seminaires.tsx",
                lineNumber: 69,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/views/Seminaires.tsx",
        lineNumber: 68,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = Field;
const Pill = ({ active, onClick, children, small })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        style: {
            padding: small ? '5px 12px' : '7px 14px',
            borderRadius: 9999,
            border: `1.5px solid ${active ? '#1a2e1a' : 'rgba(10,44,52,0.1)'}`,
            background: active ? '#1a2e1a' : '#faf8f5',
            color: active ? '#fff' : '#6b7280',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontFamily: 'inherit',
            boxShadow: active ? '0 2px 10px rgba(26,46,26,0.15)' : 'none',
            transition: 'all .15s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5
        },
        children: [
            active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontSize: 8
                },
                children: "✓"
            }, void 0, false, {
                fileName: "[project]/views/Seminaires.tsx",
                lineNumber: 91,
                columnNumber: 16
            }, ("TURBOPACK compile-time value", void 0)),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/views/Seminaires.tsx",
        lineNumber: 77,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c1 = Pill;
const ModeBtn = ({ active, onClick, children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        style: {
            padding: '7px 18px',
            borderRadius: 9999,
            border: `1.5px solid ${active ? '#1a2e1a' : 'rgba(10,44,52,0.12)'}`,
            background: active ? '#1a2e1a' : '#fff',
            color: active ? '#fff' : '#9ca3af',
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'all .15s ease'
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/views/Seminaires.tsx",
        lineNumber: 97,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c2 = ModeBtn;
const ToggleCard = ({ icon, label, active, onToggle, children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: '18px',
            borderRadius: 16,
            border: `1.5px solid ${active ? '#1a2e1a' : 'rgba(10,44,52,0.08)'}`,
            background: active ? 'rgba(26,46,26,0.03)' : '#fff',
            transition: 'all .2s ease'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 20
                                },
                                children: icon
                            }, void 0, false, {
                                fileName: "[project]/views/Seminaires.tsx",
                                lineNumber: 114,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 10,
                                    fontWeight: 700,
                                    color: '#1a2e1a',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em'
                                },
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/views/Seminaires.tsx",
                                lineNumber: 115,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/views/Seminaires.tsx",
                        lineNumber: 113,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        style: {
                            position: 'relative',
                            display: 'inline-flex',
                            alignItems: 'center',
                            cursor: 'pointer'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                fileName: "[project]/views/Seminaires.tsx",
                                lineNumber: 118,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 44,
                                    height: 24,
                                    borderRadius: 12,
                                    background: active ? '#1a2e1a' : '#e5e0d8',
                                    transition: 'background .2s ease',
                                    position: 'relative'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        position: 'absolute',
                                        top: 4,
                                        left: active ? 24 : 4,
                                        width: 16,
                                        height: 16,
                                        borderRadius: '50%',
                                        background: '#fff',
                                        boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                                        transition: 'left .2s ease'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 120,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/views/Seminaires.tsx",
                                lineNumber: 119,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/views/Seminaires.tsx",
                        lineNumber: 117,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/views/Seminaires.tsx",
                lineNumber: 112,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/views/Seminaires.tsx",
        lineNumber: 111,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c3 = ToggleCard;
const RecapRow = ({ label, value })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 12,
            padding: '9px 0',
            borderBottom: '1px solid rgba(10,44,52,0.05)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#b0a89e',
                    flexShrink: 0,
                    marginTop: 2
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/views/Seminaires.tsx",
                lineNumber: 130,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#1a2e1a',
                    textAlign: 'right'
                },
                children: value || '—'
            }, void 0, false, {
                fileName: "[project]/views/Seminaires.tsx",
                lineNumber: 131,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/views/Seminaires.tsx",
        lineNumber: 129,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c4 = RecapRow;
// ─── DateRangePicker ─────────────────────────────────────────────────────────
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
    _s();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [viewYear, setViewYear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(today.getFullYear());
    const [viewMonth, setViewMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(today.getMonth());
    const [selecting, setSelecting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('start');
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const sd = startDate ? new Date(startDate + 'T00:00:00') : null;
    const ed = endDate ? new Date(endDate + 'T00:00:00') : null;
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: '#faf8f5',
            borderRadius: 16,
            border: '1px solid rgba(10,44,52,0.08)',
            overflow: 'hidden'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    borderBottom: '1px solid rgba(10,44,52,0.06)'
                },
                children: [
                    {
                        label: 'Arrivée',
                        val: startDate,
                        key: 'start'
                    },
                    {
                        label: 'Départ',
                        val: endDate,
                        key: 'end'
                    }
                ].map(({ label, val, key })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 8,
                                    fontWeight: 700,
                                    letterSpacing: '0.18em',
                                    textTransform: 'uppercase',
                                    color: selecting === key ? '#e67e22' : '#b0a89e',
                                    marginBottom: 3
                                },
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/views/Seminaires.tsx",
                                lineNumber: 207,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 12,
                                    fontWeight: 600,
                                    color: val ? '#1a2e1a' : '#c4bdb4'
                                },
                                children: val ? fmtDisplay(val) : 'Choisir...'
                            }, void 0, false, {
                                fileName: "[project]/views/Seminaires.tsx",
                                lineNumber: 208,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, key, true, {
                        fileName: "[project]/views/Seminaires.tsx",
                        lineNumber: 197,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/views/Seminaires.tsx",
                lineNumber: 192,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px 8px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                            fontSize: 12,
                            transition: 'background .15s'
                        },
                        onMouseOver: (e)=>e.currentTarget.style.background = 'rgba(10,44,52,0.12)',
                        onMouseOut: (e)=>e.currentTarget.style.background = 'rgba(10,44,52,0.06)',
                        children: "‹"
                    }, void 0, false, {
                        fileName: "[project]/views/Seminaires.tsx",
                        lineNumber: 214,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                        fileName: "[project]/views/Seminaires.tsx",
                        lineNumber: 218,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                            fontSize: 12,
                            transition: 'background .15s'
                        },
                        onMouseOver: (e)=>e.currentTarget.style.background = 'rgba(10,44,52,0.12)',
                        onMouseOut: (e)=>e.currentTarget.style.background = 'rgba(10,44,52,0.06)',
                        children: "›"
                    }, void 0, false, {
                        fileName: "[project]/views/Seminaires.tsx",
                        lineNumber: 221,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/views/Seminaires.tsx",
                lineNumber: 213,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7,1fr)',
                    padding: '0 12px',
                    marginBottom: 4
                },
                children: DAYS_FR.map((d, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        fileName: "[project]/views/Seminaires.tsx",
                        lineNumber: 229,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/views/Seminaires.tsx",
                lineNumber: 227,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7,1fr)',
                    padding: '0 12px 14px',
                    gap: 2
                },
                children: cells.map((d, i)=>{
                    if (!d) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, i, false, {
                        fileName: "[project]/views/Seminaires.tsx",
                        lineNumber: 235,
                        columnNumber: 26
                    }, ("TURBOPACK compile-time value", void 0));
                    const start = isStart(d), end = isEnd(d), inRange = isInRange(d), past = isPast(d);
                    const isToday = toStr(d) === toStr(today);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                            transition: 'all .12s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        },
                        children: d.getDate()
                    }, i, false, {
                        fileName: "[project]/views/Seminaires.tsx",
                        lineNumber: 239,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0));
                })
            }, void 0, false, {
                fileName: "[project]/views/Seminaires.tsx",
                lineNumber: 233,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: '8px 16px 12px',
                    borderTop: '1px solid rgba(10,44,52,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: '#e67e22',
                            flexShrink: 0
                        }
                    }, void 0, false, {
                        fileName: "[project]/views/Seminaires.tsx",
                        lineNumber: 263,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 9,
                            color: '#b0a89e',
                            fontWeight: 600,
                            letterSpacing: '0.08em'
                        },
                        children: selecting === 'start' ? "Sélectionnez la date d'arrivée" : "Sélectionnez la date de départ"
                    }, void 0, false, {
                        fileName: "[project]/views/Seminaires.tsx",
                        lineNumber: 264,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/views/Seminaires.tsx",
                lineNumber: 262,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/views/Seminaires.tsx",
        lineNumber: 191,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(DateRangePicker, "yCyA126A/HwgvFFa/6t8HDAfePo=");
_c5 = DateRangePicker;
// ─── SeminaireModal ───────────────────────────────────────────────────────────
const SeminaireModal = ({ isOpen, onClose, preselectedTerroirLabels })=>{
    _s1();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [closing, setClosing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [trans, setTrans] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [ok, setOk] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [err, setErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        prenom: '',
        nom: '',
        email: '',
        entreprise: '',
        participants: '',
        message: ''
    });
    const [regions, setReg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [terroir, setTer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [autre, setAutre] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [ville, setVille] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [acc, setAcc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [trans2, setTr2] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [months, setMo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [pMode, setPMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('dates');
    const [sd, setSd] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [ed, setEd] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [heb, setHeb] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [wt, setWt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const scrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "SeminaireModal.useState": ()=>("TURBOPACK compile-time value", "object") !== 'undefined' && window.innerWidth <= 600
    }["SeminaireModal.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SeminaireModal.useEffect": ()=>{
            const check = {
                "SeminaireModal.useEffect.check": ()=>setIsMobile(window.innerWidth <= 600)
            }["SeminaireModal.useEffect.check"];
            check();
            window.addEventListener('resize', check);
            return ({
                "SeminaireModal.useEffect": ()=>window.removeEventListener('resize', check)
            })["SeminaireModal.useEffect"];
        }
    }["SeminaireModal.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SeminaireModal.useEffect": ()=>{
            if (scrollRef.current) scrollRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }["SeminaireModal.useEffect"], [
        step
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SeminaireModal.useEffect": ()=>{
            if (!isOpen) return;
            const h = {
                "SeminaireModal.useEffect.h": (e)=>{
                    if (e.key === 'Escape') handleClose();
                }
            }["SeminaireModal.useEffect.h"];
            document.addEventListener('keydown', h);
            return ({
                "SeminaireModal.useEffect": ()=>document.removeEventListener('keydown', h)
            })["SeminaireModal.useEffect"];
        }
    }["SeminaireModal.useEffect"], [
        isOpen
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SeminaireModal.useEffect": ()=>{
            document.body.style.overflow = isOpen ? 'hidden' : '';
            return ({
                "SeminaireModal.useEffect": ()=>{
                    document.body.style.overflow = '';
                }
            })["SeminaireModal.useEffect"];
        }
    }["SeminaireModal.useEffect"], [
        isOpen
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SeminaireModal.useEffect": ()=>{
            if (isOpen && preselectedTerroirLabels?.length) setTer(preselectedTerroirLabels);
        }
    }["SeminaireModal.useEffect"], [
        isOpen,
        preselectedTerroirLabels
    ]);
    const handleClose = ()=>{
        setClosing(true);
        setTimeout(()=>{
            setClosing(false);
            setStep(1);
            setOk(false);
            setErr('');
            setForm({
                prenom: '',
                nom: '',
                email: '',
                entreprise: '',
                participants: '',
                message: ''
            });
            setReg([]);
            setTer([]);
            setAcc([]);
            setTr2('');
            setMo([]);
            setHeb(false);
            setWt(false);
            setAutre('');
            setVille('');
            setPMode('dates');
            setSd('');
            setEd('');
            onClose();
        }, 280);
    };
    const tog = (list, setL, item)=>setL(list.includes(item) ? list.filter((i)=>i !== item) : [
            ...list,
            item
        ]);
    const goNext = ()=>{
        setErr('');
        if (step === 1) {
            const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
            const perOk = pMode === 'months' ? months.length > 0 : !!sd && !!ed;
            if (!form.prenom || !form.nom || !form.email || !emailOk || !form.entreprise || !form.participants || !perOk) {
                setErr('Certains champs obligatoires sont manquants ou invalides.');
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
    const handleSubmit = async ()=>{
        setBusy(true);
        const perStr = pMode === 'dates' ? sd && ed ? `Du ${new Date(sd).toLocaleDateString('fr-FR')} au ${new Date(ed).toLocaleDateString('fr-FR')}` : 'Dates non renseignées' : months.length > 0 ? months.join(', ') : 'Aucun mois';
        const body = `
Nouvelle demande de séminaire - Terrago

=== INFORMATIONS CLIENT ===
Prénom: ${form.prenom} | Nom: ${form.nom}
Email: ${form.email} | Entreprise: ${form.entreprise}
Participants: ${form.participants}
Période: ${perStr}

=== DESTINATION & TERROIR ===
Région(s): ${[
            ...regions,
            autre
        ].filter(Boolean).join(', ') || 'Non précisée'}
${ville ? `Ville: ${ville}` : ''}
Produits du terroir: ${terroir.join(', ') || 'Non précisé'}

=== LOGISTIQUE ===
Hébergement: ${heb ? acc.join(', ') || 'Oui' : 'Non'}
Transport: ${wt ? trans2 || 'Oui' : 'Non'}
Message: ${form.message || 'Aucun'}
    `.trim();
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
                    subject: `Nouvelle demande de séminaire - ${form.entreprise}`,
                    message: body,
                    _captcha: false,
                    _template: 'table'
                })
            });
            if (res.ok) {
                setOk(true);
                setTimeout(handleClose, 2400);
            } else throw new Error();
        } catch  {
            alert("Erreur lors de l'envoi. Veuillez réessayer.");
        } finally{
            setBusy(false);
        }
    };
    if (!isOpen) return null;
    const perStr = pMode === 'dates' ? sd && ed ? `${new Date(sd).toLocaleDateString('fr-FR')} → ${new Date(ed).toLocaleDateString('fr-FR')}` : '' : months.join(', ');
    const STEP_TITLE = {
        1: 'Commençons par vous.',
        2: 'Destination & terroir.',
        3: 'Logistique & sur-mesure.',
        4: 'Votre récapitulatif.'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes semIn  { from { opacity:0; transform:translateY(28px) scale(0.97) } to { opacity:1; transform:translateY(0) scale(1) } }
        @keyframes semOut { from { opacity:1; transform:translateY(0) scale(1) } to { opacity:0; transform:translateY(28px) scale(0.97) } }
        @keyframes semFd  { from { opacity:0; transform:translateY(6px) } to { opacity:1; transform:translateY(0) } }
        @keyframes semSp  { to { transform:rotate(360deg) } }
        .sem-sc::-webkit-scrollbar { display:none } .sem-sc { scrollbar-width:none }
        .sem-i {
          width:100%; background:#faf8f5;
          border:1px solid rgba(10,44,52,.08); border-radius:12px;
          padding:12px 16px; font-family:inherit; font-size:13px; color:#1a2e1a;
          outline:none; transition:all .18s ease; box-sizing:border-box;
        }
        .sem-i:focus { border-color:#1a2e1a; background:#fff; box-shadow:0 0 0 3px rgba(26,46,26,.06); }
        .sem-i::placeholder { color:#c4bdb4; }
        @media(max-width:600px) {
          .sg2 { grid-template-columns:1fr!important }
          .sg3 { grid-template-columns:1fr!important }
          .sg4 { grid-template-columns:1fr 1fr!important }
          .ssl { display:none!important }
          .sem-wrapper { align-items:stretch!important; justify-content:stretch!important; padding:0!important }
          .sem-panel {  border-radius:0!important; max-height:100dvh!important; height:100dvh!important; min-height:0!important; display:flex!important; flex-direction:column!important; overflow:hidden!important; }
          .sem-header { padding-top:max(20px, env(safe-area-inset-top))!important; flex-shrink:0!important; }
          .sem-body  { padding:16px 16px 0!important; min-height:0!important; flex:1!important; overflow-y:auto!important; }
          .sem-footer { padding:12px 16px max(12px, env(safe-area-inset-bottom))!important; flex-shrink:0!important; }
        }
      `
            }, void 0, false, {
                fileName: "[project]/views/Seminaires.tsx",
                lineNumber: 408,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: handleClose,
                style: {
                    position: 'fixed',
                    inset: 0,
                    zIndex: 999,
                    background: 'rgba(10,20,10,0.72)',
                    backdropFilter: 'blur(8px)',
                    opacity: closing ? 0 : 1,
                    transition: 'opacity .28s ease'
                }
            }, void 0, false, {
                fileName: "[project]/views/Seminaires.tsx",
                lineNumber: 435,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sem-wrapper",
                style: {
                    position: 'fixed',
                    inset: 0,
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: isMobile ? 'stretch' : 'center',
                    justifyContent: isMobile ? 'stretch' : 'center',
                    padding: isMobile ? 0 : 16,
                    pointerEvents: 'none'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "sem-panel",
                    onClick: (e)=>e.stopPropagation(),
                    style: {
                        pointerEvents: 'auto',
                        ...isMobile ? {
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            maxWidth: 'none',
                            height: '100dvh',
                            maxHeight: '100dvh',
                            minHeight: 0,
                            borderRadius: 0,
                            boxShadow: 'none'
                        } : {
                            width: '100%',
                            maxWidth: 780,
                            maxHeight: '94vh',
                            minHeight: 0,
                            borderRadius: 28,
                            boxShadow: '0 8px 48px rgba(0,0,0,0.14), 0 0 0 1px rgba(10,44,52,0.05)'
                        },
                        background: '#fff',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        animation: `${closing ? 'semOut' : 'semIn'} .32s cubic-bezier(.22,1,.36,1) both`,
                        fontFamily: "'Poppins',sans-serif"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "sem-header",
                            style: {
                                padding: '20px 28px 0',
                                background: '#fff',
                                flexShrink: 0,
                                borderBottom: '1px solid rgba(10,44,52,0.06)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginBottom: 16
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 8
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        width: 16,
                                                        height: 1,
                                                        background: '#e67e22'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires.tsx",
                                                    lineNumber: 477,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 9,
                                                        fontWeight: 700,
                                                        letterSpacing: '0.28em',
                                                        textTransform: 'uppercase',
                                                        color: '#e67e22'
                                                    },
                                                    children: "Votre projet de séminaire"
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires.tsx",
                                                    lineNumber: 478,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/views/Seminaires.tsx",
                                            lineNumber: 476,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                                justifyContent: 'center',
                                                transition: 'background .2s ease'
                                            },
                                            onMouseOver: (e)=>e.currentTarget.style.background = '#e8e2d9',
                                            onMouseOut: (e)=>e.currentTarget.style.background = '#f4f1ec',
                                            children: "×"
                                        }, void 0, false, {
                                            fileName: "[project]/views/Seminaires.tsx",
                                            lineNumber: 482,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 475,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: 6,
                                        paddingBottom: 14
                                    },
                                    children: MODAL_STEPS.map((s, i)=>{
                                        const idx = i + 1, done = step > idx, active = step === idx;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                flex: 1,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 5
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        height: 2,
                                                        borderRadius: 2,
                                                        background: done ? '#e67e22' : active ? '#1a2e1a' : 'rgba(10,44,52,0.08)',
                                                        transition: 'background .4s ease'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires.tsx",
                                                    lineNumber: 495,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ssl",
                                                    style: {
                                                        fontSize: 8.5,
                                                        fontWeight: 700,
                                                        letterSpacing: '0.1em',
                                                        textTransform: 'uppercase',
                                                        color: active ? '#1a2e1a' : done ? '#e67e22' : 'rgba(10,44,52,0.28)',
                                                        transition: 'color .3s ease'
                                                    },
                                                    children: [
                                                        idx,
                                                        ". ",
                                                        s.label
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/views/Seminaires.tsx",
                                                    lineNumber: 496,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, s.label, true, {
                                            fileName: "[project]/views/Seminaires.tsx",
                                            lineNumber: 494,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0));
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 490,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/Seminaires.tsx",
                            lineNumber: 474,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        err && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                background: 'rgba(230,126,34,0.07)',
                                borderBottom: '1px solid rgba(230,126,34,0.18)',
                                padding: '10px 28px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                flexShrink: 0
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 15
                                    },
                                    children: "⚠️"
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 507,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 11,
                                        color: '#c0620a',
                                        fontWeight: 600,
                                        margin: 0,
                                        flex: 1
                                    },
                                    children: err
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 508,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setErr(''),
                                    style: {
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#c0620a',
                                        fontSize: 16
                                    },
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 509,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/Seminaires.tsx",
                            lineNumber: 506,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        ok && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: 'absolute',
                                inset: 0,
                                zIndex: 20,
                                background: 'rgba(255,255,255,0.97)',
                                backdropFilter: 'blur(4px)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 28,
                                animation: 'semFd .3s ease'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: 72,
                                        height: 72,
                                        borderRadius: '50%',
                                        background: '#1a2e1a',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: 24,
                                        boxShadow: '0 8px 30px rgba(26,46,26,0.25)'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "34",
                                        height: "34",
                                        viewBox: "0 0 34 34",
                                        fill: "none",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M8 17.5L14 23.5L26 11",
                                            stroke: "#fff",
                                            strokeWidth: "2.5",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round"
                                        }, void 0, false, {
                                            fileName: "[project]/views/Seminaires.tsx",
                                            lineNumber: 517,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/views/Seminaires.tsx",
                                        lineNumber: 516,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 515,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    style: {
                                        fontWeight: 700,
                                        fontStyle: 'italic',
                                        fontSize: 26,
                                        color: '#1a2e1a',
                                        margin: '0 0 8px',
                                        fontFamily: "'Poppins',sans-serif"
                                    },
                                    children: "Demande envoyée !"
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 520,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        color: '#9ca3af',
                                        fontSize: 13,
                                        margin: 0
                                    },
                                    children: "Nous vous recontacterons sous 48h."
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 521,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/Seminaires.tsx",
                            lineNumber: 514,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: scrollRef,
                            className: "sem-sc sem-body",
                            style: {
                                flex: 1,
                                minHeight: 0,
                                overflowY: 'auto',
                                padding: '28px 28px 0'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        opacity: trans ? 0 : 1,
                                        transform: trans ? 'translateY(5px)' : 'translateY(0)',
                                        transition: 'all .18s ease'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            style: {
                                                fontFamily: "'Poppins',sans-serif",
                                                fontStyle: 'italic',
                                                fontWeight: 700,
                                                fontSize: 22,
                                                color: '#1a2e1a',
                                                margin: '0 0 22px'
                                            },
                                            children: STEP_TITLE[step]
                                        }, void 0, false, {
                                            fileName: "[project]/views/Seminaires.tsx",
                                            lineNumber: 528,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        step === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 18
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "sg2",
                                                    style: {
                                                        display: 'grid',
                                                        gridTemplateColumns: '1fr 1fr',
                                                        gap: 14
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "Prénom",
                                                            required: true,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                className: "sem-i",
                                                                placeholder: "Jean",
                                                                value: form.prenom,
                                                                onChange: (e)=>setForm({
                                                                        ...form,
                                                                        prenom: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/views/Seminaires.tsx",
                                                                lineNumber: 535,
                                                                columnNumber: 52
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/Seminaires.tsx",
                                                            lineNumber: 535,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "Nom",
                                                            required: true,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                className: "sem-i",
                                                                placeholder: "Dupont",
                                                                value: form.nom,
                                                                onChange: (e)=>setForm({
                                                                        ...form,
                                                                        nom: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/views/Seminaires.tsx",
                                                                lineNumber: 536,
                                                                columnNumber: 49
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/Seminaires.tsx",
                                                            lineNumber: 536,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "Email professionnel",
                                                            required: true,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                className: "sem-i",
                                                                type: "email",
                                                                placeholder: "contact@entreprise.fr",
                                                                value: form.email,
                                                                onChange: (e)=>setForm({
                                                                        ...form,
                                                                        email: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/views/Seminaires.tsx",
                                                                lineNumber: 537,
                                                                columnNumber: 65
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/Seminaires.tsx",
                                                            lineNumber: 537,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "Entreprise",
                                                            required: true,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                className: "sem-i",
                                                                placeholder: "Terroir SAS",
                                                                value: form.entreprise,
                                                                onChange: (e)=>setForm({
                                                                        ...form,
                                                                        entreprise: e.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/views/Seminaires.tsx",
                                                                lineNumber: 538,
                                                                columnNumber: 56
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/Seminaires.tsx",
                                                            lineNumber: 538,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/views/Seminaires.tsx",
                                                    lineNumber: 534,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                    label: "Nombre de participants",
                                                    required: true,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            flexWrap: 'wrap',
                                                            gap: 8
                                                        },
                                                        children: MODAL_PARTS.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                                active: form.participants === p,
                                                                onClick: ()=>setForm({
                                                                        ...form,
                                                                        participants: p
                                                                    }),
                                                                children: p
                                                            }, p, false, {
                                                                fileName: "[project]/views/Seminaires.tsx",
                                                                lineNumber: 543,
                                                                columnNumber: 45
                                                            }, ("TURBOPACK compile-time value", void 0)))
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/Seminaires.tsx",
                                                        lineNumber: 542,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires.tsx",
                                                    lineNumber: 541,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                    label: "Période souhaitée",
                                                    required: true,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'flex',
                                                                gap: 8,
                                                                marginBottom: 12,
                                                                flexWrap: 'wrap'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ModeBtn, {
                                                                    active: pMode === 'dates',
                                                                    onClick: ()=>{
                                                                        setPMode('dates');
                                                                        setMo([]);
                                                                    },
                                                                    children: "Dates précises"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/views/Seminaires.tsx",
                                                                    lineNumber: 549,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ModeBtn, {
                                                                    active: pMode === 'months',
                                                                    onClick: ()=>{
                                                                        setPMode('months');
                                                                        setSd('');
                                                                        setEd('');
                                                                    },
                                                                    children: "Choisir des mois"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/views/Seminaires.tsx",
                                                                    lineNumber: 550,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/views/Seminaires.tsx",
                                                            lineNumber: 548,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        pMode === 'dates' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DateRangePicker, {
                                                            startDate: sd,
                                                            endDate: ed,
                                                            onStartChange: setSd,
                                                            onEndChange: setEd
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/Seminaires.tsx",
                                                            lineNumber: 553,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'flex',
                                                                flexWrap: 'wrap',
                                                                gap: 7
                                                            },
                                                            children: MODAL_MONTHS.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                                    active: months.includes(m),
                                                                    onClick: ()=>tog(months, setMo, m),
                                                                    children: m
                                                                }, m, false, {
                                                                    fileName: "[project]/views/Seminaires.tsx",
                                                                    lineNumber: 556,
                                                                    columnNumber: 48
                                                                }, ("TURBOPACK compile-time value", void 0)))
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/Seminaires.tsx",
                                                            lineNumber: 555,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/views/Seminaires.tsx",
                                                    lineNumber: 547,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/views/Seminaires.tsx",
                                            lineNumber: 533,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 20
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                    label: "Région(s) souhaitée(s)",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "sg3",
                                                        style: {
                                                            display: 'grid',
                                                            gridTemplateColumns: 'repeat(3,1fr)',
                                                            gap: 12
                                                        },
                                                        children: MODAL_REGIONS.map((r)=>{
                                                            const a = regions.includes(r.name);
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>tog(regions, setReg, r.name),
                                                                style: {
                                                                    padding: '18px 12px',
                                                                    borderRadius: 20,
                                                                    fontFamily: 'inherit',
                                                                    border: `1.5px solid ${a ? '#1a2e1a' : 'rgba(10,44,52,0.08)'}`,
                                                                    background: a ? '#1a2e1a' : '#faf8f5',
                                                                    cursor: 'pointer',
                                                                    textAlign: 'center',
                                                                    transition: 'all .2s ease',
                                                                    transform: a ? 'translateY(-2px)' : 'none',
                                                                    boxShadow: a ? '0 6px 20px rgba(26,46,26,.16)' : 'none'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            fontSize: 24,
                                                                            marginBottom: 8
                                                                        },
                                                                        children: r.icon
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/views/Seminaires.tsx",
                                                                        lineNumber: 582,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            fontSize: 10,
                                                                            fontWeight: 700,
                                                                            color: a ? '#fff' : '#1a2e1a',
                                                                            lineHeight: 1.3
                                                                        },
                                                                        children: r.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/views/Seminaires.tsx",
                                                                        lineNumber: 583,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    a && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            width: 6,
                                                                            height: 6,
                                                                            borderRadius: '50%',
                                                                            background: '#e67e22',
                                                                            margin: '8px auto 0'
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/views/Seminaires.tsx",
                                                                        lineNumber: 584,
                                                                        columnNumber: 35
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, r.name, true, {
                                                                fileName: "[project]/views/Seminaires.tsx",
                                                                lineNumber: 570,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0));
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/Seminaires.tsx",
                                                        lineNumber: 566,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires.tsx",
                                                    lineNumber: 565,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "sg2",
                                                    style: {
                                                        display: 'grid',
                                                        gridTemplateColumns: '1fr 1fr',
                                                        gap: 14
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "Autre région",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                className: "sem-i",
                                                                placeholder: "Ex : Bretagne, Occitanie…",
                                                                value: autre,
                                                                onChange: (e)=>setAutre(e.target.value)
                                                            }, void 0, false, {
                                                                fileName: "[project]/views/Seminaires.tsx",
                                                                lineNumber: 592,
                                                                columnNumber: 49
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/Seminaires.tsx",
                                                            lineNumber: 592,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                            label: "Ville",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                className: "sem-i",
                                                                placeholder: "Ex : Bordeaux, Lyon…",
                                                                value: ville,
                                                                onChange: (e)=>setVille(e.target.value)
                                                            }, void 0, false, {
                                                                fileName: "[project]/views/Seminaires.tsx",
                                                                lineNumber: 593,
                                                                columnNumber: 42
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/Seminaires.tsx",
                                                            lineNumber: 593,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/views/Seminaires.tsx",
                                                    lineNumber: 591,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                    label: "Quel produit du terroir découvrir ?",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "sg4",
                                                        style: {
                                                            display: 'grid',
                                                            gridTemplateColumns: 'repeat(3,1fr)',
                                                            gap: 9
                                                        },
                                                        children: MODAL_TERROIR.map((p)=>{
                                                            const a = terroir.includes(p.label);
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>tog(terroir, setTer, p.label),
                                                                style: {
                                                                    padding: '12px 8px',
                                                                    borderRadius: 16,
                                                                    fontFamily: 'inherit',
                                                                    border: `1.5px solid ${a ? '#1a2e1a' : 'rgba(10,44,52,0.08)'}`,
                                                                    background: a ? '#1a2e1a' : '#faf8f5',
                                                                    cursor: 'pointer',
                                                                    textAlign: 'center',
                                                                    transition: 'all .2s ease',
                                                                    boxShadow: a ? '0 4px 14px rgba(26,46,26,.14)' : 'none',
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    alignItems: 'center',
                                                                    gap: 5
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontSize: 22
                                                                        },
                                                                        children: p.emoji
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/views/Seminaires.tsx",
                                                                        lineNumber: 613,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontSize: 9.5,
                                                                            fontWeight: 700,
                                                                            letterSpacing: '0.08em',
                                                                            textTransform: 'uppercase',
                                                                            color: a ? '#fff' : '#4b5563'
                                                                        },
                                                                        children: p.label
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/views/Seminaires.tsx",
                                                                        lineNumber: 614,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    a && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            width: 5,
                                                                            height: 5,
                                                                            borderRadius: '50%',
                                                                            background: '#e67e22',
                                                                            display: 'inline-block'
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/views/Seminaires.tsx",
                                                                        lineNumber: 615,
                                                                        columnNumber: 35
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, p.label, true, {
                                                                fileName: "[project]/views/Seminaires.tsx",
                                                                lineNumber: 601,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0));
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/Seminaires.tsx",
                                                        lineNumber: 597,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires.tsx",
                                                    lineNumber: 596,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/views/Seminaires.tsx",
                                            lineNumber: 564,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        step === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 16
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "sg2",
                                                    style: {
                                                        display: 'grid',
                                                        gridTemplateColumns: '1fr 1fr',
                                                        gap: 14
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToggleCard, {
                                                            icon: "🏠",
                                                            label: "Hébergement",
                                                            active: heb,
                                                            onToggle: ()=>setHeb((v)=>!v),
                                                            children: heb && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    flexWrap: 'wrap',
                                                                    gap: 8,
                                                                    marginTop: 12
                                                                },
                                                                children: MODAL_ACC.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                                        active: acc.includes(t),
                                                                        onClick: ()=>tog(acc, setAcc, t),
                                                                        small: true,
                                                                        children: t
                                                                    }, t, false, {
                                                                        fileName: "[project]/views/Seminaires.tsx",
                                                                        lineNumber: 628,
                                                                        columnNumber: 125
                                                                    }, ("TURBOPACK compile-time value", void 0)))
                                                            }, void 0, false, {
                                                                fileName: "[project]/views/Seminaires.tsx",
                                                                lineNumber: 628,
                                                                columnNumber: 31
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/Seminaires.tsx",
                                                            lineNumber: 627,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToggleCard, {
                                                            icon: "🚗",
                                                            label: "Transport",
                                                            active: wt,
                                                            onToggle: ()=>setWt((v)=>!v),
                                                            children: wt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    gap: 8,
                                                                    marginTop: 12
                                                                },
                                                                children: MODAL_TRANS.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Pill, {
                                                                        active: trans2 === t,
                                                                        onClick: ()=>setTr2(t),
                                                                        small: true,
                                                                        children: t
                                                                    }, t, false, {
                                                                        fileName: "[project]/views/Seminaires.tsx",
                                                                        lineNumber: 631,
                                                                        columnNumber: 133
                                                                    }, ("TURBOPACK compile-time value", void 0)))
                                                            }, void 0, false, {
                                                                fileName: "[project]/views/Seminaires.tsx",
                                                                lineNumber: 631,
                                                                columnNumber: 30
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/Seminaires.tsx",
                                                            lineNumber: 630,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/views/Seminaires.tsx",
                                                    lineNumber: 626,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                                    label: "Un message particulier ?",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                        className: "sem-i",
                                                        rows: 4,
                                                        style: {
                                                            resize: 'none',
                                                            lineHeight: 1.6
                                                        },
                                                        placeholder: "Salles de réunion, pauses gourmandes, activités team building particulières…",
                                                        value: form.message,
                                                        onChange: (e)=>setForm({
                                                                ...form,
                                                                message: e.target.value
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/Seminaires.tsx",
                                                        lineNumber: 635,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires.tsx",
                                                    lineNumber: 634,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/views/Seminaires.tsx",
                                            lineNumber: 625,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        step === 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 14
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        color: '#b0a89e',
                                                        fontSize: 12,
                                                        margin: '0 0 4px'
                                                    },
                                                    children: "Vérifiez vos informations avant d'envoyer."
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires.tsx",
                                                    lineNumber: 642,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                [
                                                    {
                                                        title: '01 — Coordonnées',
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
                                                                value: perStr
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        title: '02 — Destination & Terroir',
                                                        rows: [
                                                            {
                                                                label: 'Région(s)',
                                                                value: [
                                                                    ...regions,
                                                                    autre
                                                                ].filter(Boolean).join(', ')
                                                            },
                                                            {
                                                                label: 'Produits',
                                                                value: terroir.join(', ')
                                                            },
                                                            ...ville ? [
                                                                {
                                                                    label: 'Ville',
                                                                    value: ville
                                                                }
                                                            ] : []
                                                        ]
                                                    },
                                                    {
                                                        title: '03 — Logistique',
                                                        rows: [
                                                            {
                                                                label: 'Hébergement',
                                                                value: heb ? acc.length > 0 ? acc.join(', ') : 'Oui' : 'Non'
                                                            },
                                                            {
                                                                label: 'Transport',
                                                                value: wt ? trans2 || 'Oui' : 'Non'
                                                            },
                                                            ...form.message ? [
                                                                {
                                                                    label: 'Message',
                                                                    value: form.message
                                                                }
                                                            ] : []
                                                        ]
                                                    }
                                                ].map((block)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            background: '#faf8f5',
                                                            borderRadius: 16,
                                                            padding: '14px 18px'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontSize: 9,
                                                                    fontWeight: 700,
                                                                    letterSpacing: '0.18em',
                                                                    textTransform: 'uppercase',
                                                                    color: '#e67e22',
                                                                    marginBottom: 10
                                                                },
                                                                children: block.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/views/Seminaires.tsx",
                                                                lineNumber: 649,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            block.rows.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RecapRow, {
                                                                    label: r.label,
                                                                    value: r.value
                                                                }, r.label, false, {
                                                                    fileName: "[project]/views/Seminaires.tsx",
                                                                    lineNumber: 650,
                                                                    columnNumber: 44
                                                                }, ("TURBOPACK compile-time value", void 0)))
                                                        ]
                                                    }, block.title, true, {
                                                        fileName: "[project]/views/Seminaires.tsx",
                                                        lineNumber: 648,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontSize: 11,
                                                        color: '#b0a89e',
                                                        textAlign: 'center',
                                                        margin: '4px 0 0'
                                                    },
                                                    children: [
                                                        "Tout est correct ? Cliquez sur ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            style: {
                                                                color: '#1a2e1a'
                                                            },
                                                            children: "Envoyer le brief"
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/Seminaires.tsx",
                                                            lineNumber: 654,
                                                            columnNumber: 52
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        " pour nous le transmettre."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/views/Seminaires.tsx",
                                                    lineNumber: 653,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/views/Seminaires.tsx",
                                            lineNumber: 641,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 526,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        height: 28
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 659,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/Seminaires.tsx",
                            lineNumber: 525,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "sem-footer",
                            style: {
                                padding: '14px 28px',
                                borderTop: '1px solid rgba(10,44,52,0.06)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: 12,
                                flexShrink: 0,
                                background: '#fff',
                                flexWrap: 'wrap'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: goPrev,
                                    disabled: step === 1,
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6,
                                        background: 'none',
                                        border: 'none',
                                        cursor: step === 1 ? 'default' : 'pointer',
                                        color: step === 1 ? 'transparent' : '#9ca3af',
                                        fontFamily: 'inherit',
                                        fontSize: 10,
                                        fontWeight: 700,
                                        letterSpacing: '0.12em',
                                        textTransform: 'uppercase',
                                        padding: '8px 0',
                                        transition: 'color .2s ease'
                                    },
                                    onMouseOver: (e)=>{
                                        if (step > 1) e.currentTarget.style.color = '#1a2e1a';
                                    },
                                    onMouseOut: (e)=>{
                                        if (step > 1) e.currentTarget.style.color = '#9ca3af';
                                    },
                                    children: "← Précédent"
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 666,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: 10
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleClose,
                                            style: {
                                                padding: '10px 20px',
                                                borderRadius: 9999,
                                                border: '1.5px solid rgba(10,44,52,0.1)',
                                                background: '#faf8f5',
                                                fontFamily: 'inherit',
                                                fontSize: 10,
                                                fontWeight: 700,
                                                letterSpacing: '0.1em',
                                                textTransform: 'uppercase',
                                                color: '#9ca3af',
                                                cursor: 'pointer',
                                                transition: 'all .15s ease'
                                            },
                                            onMouseOver: (e)=>{
                                                e.currentTarget.style.borderColor = '#1a2e1a';
                                                e.currentTarget.style.color = '#1a2e1a';
                                            },
                                            onMouseOut: (e)=>{
                                                e.currentTarget.style.borderColor = 'rgba(10,44,52,0.1)';
                                                e.currentTarget.style.color = '#9ca3af';
                                            },
                                            children: "Annuler"
                                        }, void 0, false, {
                                            fileName: "[project]/views/Seminaires.tsx",
                                            lineNumber: 674,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: step < 4 ? goNext : handleSubmit,
                                            disabled: busy,
                                            style: {
                                                padding: '10px 28px',
                                                borderRadius: 9999,
                                                background: '#1a2e1a',
                                                color: '#fff',
                                                border: 'none',
                                                fontFamily: 'inherit',
                                                fontSize: 10,
                                                fontWeight: 700,
                                                letterSpacing: '0.1em',
                                                textTransform: 'uppercase',
                                                cursor: busy ? 'not-allowed' : 'pointer',
                                                opacity: busy ? 0.7 : 1,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 8,
                                                transition: 'background .2s ease',
                                                minWidth: 170
                                            },
                                            onMouseOver: (e)=>{
                                                if (!busy) e.currentTarget.style.background = '#2b3e24';
                                            },
                                            onMouseOut: (e)=>{
                                                e.currentTarget.style.background = '#1a2e1a';
                                            },
                                            children: busy ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            width: 14,
                                                            height: 14,
                                                            border: '2px solid rgba(255,255,255,.3)',
                                                            borderTopColor: '#fff',
                                                            borderRadius: '50%',
                                                            animation: 'semSp .7s linear infinite',
                                                            display: 'inline-block'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/Seminaires.tsx",
                                                        lineNumber: 688,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    "Envoi…"
                                                ]
                                            }, void 0, true) : step < 4 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    "Continuer ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: 14
                                                        },
                                                        children: "→"
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/Seminaires.tsx",
                                                        lineNumber: 690,
                                                        columnNumber: 31
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 8
                                                },
                                                children: [
                                                    "Envoyer le brief",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        width: "14",
                                                        height: "14",
                                                        viewBox: "0 0 24 24",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        strokeWidth: "2.5",
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                                x1: "22",
                                                                y1: "2",
                                                                x2: "11",
                                                                y2: "13"
                                                            }, void 0, false, {
                                                                fileName: "[project]/views/Seminaires.tsx",
                                                                lineNumber: 695,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                                                points: "22 2 15 22 11 13 2 9 22 2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/views/Seminaires.tsx",
                                                                lineNumber: 695,
                                                                columnNumber: 62
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/views/Seminaires.tsx",
                                                        lineNumber: 694,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/views/Seminaires.tsx",
                                                lineNumber: 692,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/views/Seminaires.tsx",
                                            lineNumber: 681,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 673,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/Seminaires.tsx",
                            lineNumber: 662,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/views/Seminaires.tsx",
                    lineNumber: 450,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/views/Seminaires.tsx",
                lineNumber: 440,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
_s1(SeminaireModal, "V0EsA+ptJHoFkagFmKSizFVR750=");
_c6 = SeminaireModal;
// ─── Main page ────────────────────────────────────────────────────────────────
const Seminaires = ()=>{
    _s2();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedUniversModal, setSelectedUniversModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isUniversModalClosing, setIsUniversModalClosing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentImageIndex, setCurrentImageIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [plaquetteEmail, setPlaquetteEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [plaquetteSubmitting, setPlaquetteSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [plaquetteSuccess, setPlaquetteSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [plaquetteEmailError, setPlaquetteEmailError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const examplesCarouselRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const examplesScrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [examplesCardWidthPx, setExamplesCardWidthPx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [selectedUniverse, setSelectedUniverse] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeCardIndex, setActiveCardIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const CAROUSEL_GAP_PX = 32;
    const CARD_MIN_WIDTH_PX = 280;
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(("TURBOPACK compile-time truthy", 1) ? window.innerWidth < 640 : "TURBOPACK unreachable");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Seminaires.useEffect": ()=>{
            const h = {
                "Seminaires.useEffect.h": ()=>setIsMobile(window.innerWidth < 640)
            }["Seminaires.useEffect.h"];
            window.addEventListener('resize', h);
            return ({
                "Seminaires.useEffect": ()=>window.removeEventListener('resize', h)
            })["Seminaires.useEffect"];
        }
    }["Seminaires.useEffect"], []);
    const cardWidthPx = examplesCardWidthPx > 0 ? examplesCardWidthPx : CARD_MIN_WIDTH_PX;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Seminaires.useEffect": ()=>{
            const el = examplesCarouselRef.current;
            if (!el) return;
            const upd = {
                "Seminaires.useEffect.upd": ()=>{
                    const w = el.offsetWidth;
                    if (w <= 0) return;
                    const winW = window.innerWidth;
                    if (winW < 640) {
                        setExamplesCardWidthPx(Math.max(CARD_MIN_WIDTH_PX, w * 0.70));
                    } else {
                        let v = winW < 768 ? 2 : winW < 1024 ? 2.5 : winW < 1280 ? 3.5 : 4;
                        setExamplesCardWidthPx(Math.max(CARD_MIN_WIDTH_PX, (w - (v - 1) * CAROUSEL_GAP_PX) / v));
                    }
                }
            }["Seminaires.useEffect.upd"];
            upd();
            const ro = new ResizeObserver(upd);
            window.addEventListener('resize', upd);
            ro.observe(el);
            return ({
                "Seminaires.useEffect": ()=>{
                    ro.disconnect();
                    window.removeEventListener('resize', upd);
                }
            })["Seminaires.useEffect"];
        }
    }["Seminaires.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Seminaires.useEffect": ()=>{
            const el = examplesScrollRef.current;
            if (!el) return;
            const h = {
                "Seminaires.useEffect.h": ()=>{
                    const g = window.innerWidth < 640 ? 16 : CAROUSEL_GAP_PX;
                    setActiveCardIndex(Math.round(el.scrollLeft / (cardWidthPx + g)));
                }
            }["Seminaires.useEffect.h"];
            el.addEventListener('scroll', h, {
                passive: true
            });
            return ({
                "Seminaires.useEffect": ()=>el.removeEventListener('scroll', h)
            })["Seminaires.useEffect"];
        }
    }["Seminaires.useEffect"], [
        cardWidthPx
    ]);
    const scrollExamples = (dir)=>{
        const el = examplesScrollRef.current;
        if (!el) return;
        el.scrollBy({
            left: dir === 'left' ? -(cardWidthPx + CAROUSEL_GAP_PX) : cardWidthPx + CAROUSEL_GAP_PX,
            behavior: 'smooth'
        });
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Seminaires.useEffect": ()=>{
            if (searchParams.get('scroll') === 'nos-univers') {
                const el = document.getElementById('nos-univers');
                if (el) {
                    const t = setTimeout({
                        "Seminaires.useEffect.t": ()=>el.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            })
                    }["Seminaires.useEffect.t"], 100);
                    return ({
                        "Seminaires.useEffect": ()=>clearTimeout(t)
                    })["Seminaires.useEffect"];
                }
            }
        }
    }["Seminaires.useEffect"], [
        searchParams
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Seminaires.useEffect": ()=>{
            if (searchParams.get('openModal') === 'true') {
                setIsModalOpen(true);
                router.replace('/entreprises');
            }
        }
    }["Seminaires.useEffect"], [
        searchParams,
        router
    ]);
    const rotatingTexts = [
        'humains',
        'simples',
        'inspirants',
        'captivants',
        'authentiques',
        'engagés',
        'gourmands',
        'durables',
        'sensoriels'
    ];
    const [currentTextIndex, setCurrentTextIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [displayedText, setDisplayedText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isTyping, setIsTyping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Seminaires.useEffect": ()=>{
            const txt = rotatingTexts[currentTextIndex];
            setDisplayedText('');
            setIsTyping(true);
            let i = 0;
            const id = setInterval({
                "Seminaires.useEffect.id": ()=>{
                    if (i < txt.length) {
                        setDisplayedText(txt.slice(0, ++i));
                    } else {
                        setIsTyping(false);
                        clearInterval(id);
                    }
                }
            }["Seminaires.useEffect.id"], 50);
            return ({
                "Seminaires.useEffect": ()=>clearInterval(id)
            })["Seminaires.useEffect"];
        }
    }["Seminaires.useEffect"], [
        currentTextIndex
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Seminaires.useEffect": ()=>{
            const id = setInterval({
                "Seminaires.useEffect.id": ()=>setCurrentTextIndex({
                        "Seminaires.useEffect.id": (p)=>(p + 1) % rotatingTexts.length
                    }["Seminaires.useEffect.id"])
            }["Seminaires.useEffect.id"], 3000);
            return ({
                "Seminaires.useEffect": ()=>clearInterval(id)
            })["Seminaires.useEffect"];
        }
    }["Seminaires.useEffect"], [
        rotatingTexts.length
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Seminaires.useEffect": ()=>{
            heroImages.forEach({
                "Seminaires.useEffect": (src)=>{
                    const img = new Image();
                    img.src = src;
                }
            }["Seminaires.useEffect"]);
        }
    }["Seminaires.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Seminaires.useEffect": ()=>{
            const id = setInterval({
                "Seminaires.useEffect.id": ()=>setCurrentImageIndex({
                        "Seminaires.useEffect.id": (p)=>(p + 1) % heroImages.length
                    }["Seminaires.useEffect.id"])
            }["Seminaires.useEffect.id"], 3000);
            return ({
                "Seminaires.useEffect": ()=>clearInterval(id)
            })["Seminaires.useEffect"];
        }
    }["Seminaires.useEffect"], []);
    const [preselectedTerroirForModal, setPreselectedTerroirForModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const openModal = (universId)=>{
        if (universId) {
            const label = UNIVERS_ID_TO_TERROIR_LABEL[universId];
            setPreselectedTerroirForModal(label ? [
                label
            ] : []);
        } else setPreselectedTerroirForModal([]);
        setIsModalOpen(true);
    };
    const closeModal = ()=>{
        setIsModalOpen(false);
        setPreselectedTerroirForModal([]);
    };
    const openUniversModal = (id)=>{
        const d = UNIVERS_DATA[id];
        if (!d) return;
        setSelectedUniversModal(d);
        setIsUniversModalClosing(false);
        document.body.style.overflow = 'hidden';
    };
    const closeUniversModal = ()=>{
        setIsUniversModalClosing(true);
        setTimeout(()=>{
            setSelectedUniversModal(null);
            setIsUniversModalClosing(false);
            document.body.style.overflow = '';
        }, 250);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Seminaires.useEffect": ()=>{
            const h = {
                "Seminaires.useEffect.h": (e)=>{
                    if (e.key === 'Escape' && selectedUniversModal) closeUniversModal();
                }
            }["Seminaires.useEffect.h"];
            document.addEventListener('keydown', h);
            return ({
                "Seminaires.useEffect": ()=>document.removeEventListener('keydown', h)
            })["Seminaires.useEffect"];
        }
    }["Seminaires.useEffect"], [
        selectedUniversModal
    ]);
    const handlePlaquetteSubmit = async (e)=>{
        e.preventDefault();
        setPlaquetteEmailError('');
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!plaquetteEmail.trim() || !re.test(plaquetteEmail.trim())) {
            setPlaquetteEmailError('Veuillez renseigner une adresse mail valide');
            return;
        }
        setPlaquetteSubmitting(true);
        try {
            const r = await fetch('https://formsubmit.co/ajax/alexso.terrago@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    email: plaquetteEmail.trim(),
                    subject: 'Demande plaquette offres 2026 - Terrago',
                    message: `Demande plaquette.\nEmail: ${plaquetteEmail.trim()}`,
                    _captcha: false
                })
            });
            if (r.ok) {
                setPlaquetteSuccess(true);
                setPlaquetteEmail('');
            } else throw new Error();
        } catch  {
            alert('Une erreur est survenue.');
        } finally{
            setPlaquetteSubmitting(false);
        }
    };
    const exampleCards = [
        {
            image: "https://images.unsplash.com/photo-1671572953796-4c05a6ac5fa1?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Cognac & Pineau",
            desc: "Proche de Cognac",
            tags: [
                "Participation aux vendanges",
                "Fabrication de son propre pineau",
                "Golf entre les vignes"
            ],
            producerImage: "/images/producteurs/cognacJF.png",
            universes: [
                "le cognac"
            ],
            universId: "cognac",
            boldLabel: "AUTOUR DU COGNAC"
        },
        {
            image: "https://images.unsplash.com/photo-1663178405985-25074d8e72f4?q=80&w=1026&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Olives & lavande",
            desc: "Proche d'Aix-en-Provence",
            tags: [
                "Apprentissage et récolte des olives",
                "Fabrication de son huile",
                "Récolte de lavandes fines",
                "Distillation de son parfum d'ambiance"
            ],
            producerImage: "https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/OLIVEPAOLO/PAOLO1.jpg",
            universes: [
                "les olives",
                "la lavande"
            ],
            universId: "olive",
            boldLabel: "AUTOUR DE L'OLIVE"
        },
        {
            image: "https://images.unsplash.com/photo-1728147370558-0b71818d240e?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Noix & compagnie",
            desc: "Proche de Valence",
            tags: [
                "Apprentissage et récolte des noix",
                "Fabrication de son huile/vin de noix",
                "Repas en pleine nature",
                "Récolte de lavande fine"
            ],
            producerImage: "/images/producteurs/noixsabinemarie.jpeg",
            universes: [
                "les noix"
            ],
            universId: "noix",
            boldLabel: "AUTOUR DE LA NOIX"
        },
        {
            image: "https://images.unsplash.com/photo-1589208310452-7cf38ba4d109?q=80&w=2531&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Truffe & terroir",
            desc: "Proche de Tours",
            tags: [
                "Cavage et découverte de la truffe",
                "Atelier cuisine",
                "Ferme florale et potager"
            ],
            producerImage: "/images/producteurs/truffeprod.png",
            universes: [
                "la truffe"
            ],
            universId: "truffe",
            boldLabel: "AUTOUR DE LA TRUFFE"
        },
        {
            image: "https://images.unsplash.com/photo-1630440886325-ccbd65b70d29?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Chèvres & fromage",
            desc: "Proche d'Aix-en-Provence",
            tags: [
                "Soins aux chèvres",
                "Fabrication de son propre fromage",
                "Dégustation à la ferme",
                "Visite de cave"
            ],
            producerImage: "/images/producteurs/chevre-bebe.jpg",
            universes: [
                "le fromage de chèvre"
            ],
            universId: "fromage",
            boldLabel: "AUTOUR DU FROMAGE"
        },
        {
            image: "https://images.unsplash.com/photo-1767034232356-1874e4a36cd7?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Vin & Ventoux",
            desc: "Proche de Valence",
            tags: [
                "Les mains dans la terre",
                "Activité autour de la vigne",
                "Soirée soleil et guinguette",
                "Excursion vélo au Mont Ventoux"
            ],
            producerImage: "/images/producteurs/vincombeaumas.png",
            universes: [
                "le vin"
            ],
            universId: "vin",
            boldLabel: "AUTOUR DU VIN"
        },
        {
            image: "https://images.unsplash.com/photo-1720420866056-07fe15991f16?q=80&w=2531&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Piments & Pays Basque",
            desc: "Proche de Biarrtiz",
            tags: [
                "Récolte des piments rouges",
                "Fabrication de sa propre corde de piments",
                "Atelier confiture & conserves",
                "Dégustation de spécialités basques"
            ],
            producerImage: "https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/pimentsbaptiste/b5.png",
            universes: [
                "les piments"
            ],
            universId: "piment",
            boldLabel: "AUTOUR DU PIMENT"
        },
        {
            image: "https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/general/VERGERS.jpg",
            title: "Noisette & fruits à coque",
            desc: "Proche de Orléans",
            tags: [
                "Récolte des noisettes",
                "Fabrication de son huile de noisette",
                "Atelier pâtisserie autour de la noisette",
                "Yoga en pleine nature"
            ],
            producerImage: "https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/general/solproducteurs.png",
            universes: [
                "les noisettes"
            ],
            universId: "noisette",
            boldLabel: "AUTOUR DE LA NOISETTE"
        }
    ];
    const filteredCards = selectedUniverse ? exampleCards.filter((c)=>c.universes.includes(selectedUniverse)) : exampleCards;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "font-sans bg-beige-bg min-h-screen overflow-x-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SeminaireModal, {
                isOpen: isModalOpen,
                onClose: closeModal,
                preselectedTerroirLabels: preselectedTerroirForModal
            }, void 0, false, {
                fileName: "[project]/views/Seminaires.tsx",
                lineNumber: 827,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "relative w-full overflow-hidden min-h-screen flex items-center justify-center",
                children: [
                    heroImages.map((image, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out",
                            style: {
                                backgroundImage: `url('${image}')`,
                                opacity: index === currentImageIndex ? 1 : 0,
                                zIndex: index === currentImageIndex ? 0 : -1
                            }
                        }, index, false, {
                            fileName: "[project]/views/Seminaires.tsx",
                            lineNumber: 832,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0",
                        style: {
                            background: 'linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.32) 60%, rgba(0,0,0,0.55) 100%)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/views/Seminaires.tsx",
                        lineNumber: 834,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center gap-3 mb-10 sm:mb-7",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 28,
                                            height: 1,
                                            background: 'rgba(255,255,255,0.40)'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/views/Seminaires.tsx",
                                        lineNumber: 838,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: 'rgba(255,255,255,0.60)',
                                            fontSize: 10,
                                            letterSpacing: '0.28em',
                                            fontWeight: 700,
                                            textTransform: 'uppercase'
                                        },
                                        children: "Immersion & Cohésion"
                                    }, void 0, false, {
                                        fileName: "[project]/views/Seminaires.tsx",
                                        lineNumber: 839,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 28,
                                            height: 1,
                                            background: 'rgba(255,255,255,0.40)'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/views/Seminaires.tsx",
                                        lineNumber: 840,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/views/Seminaires.tsx",
                                lineNumber: 837,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-white font-bold leading-[1.06] mb-12 sm:mb-7 drop-shadow-lg",
                                style: {
                                    letterSpacing: '-0.01em'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "block font-display italic text-5xl md:text-5xl lg:text-6xl mb-1",
                                        children: "Optez pour des séminaires"
                                    }, void 0, false, {
                                        fileName: "[project]/views/Seminaires.tsx",
                                        lineNumber: 844,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "block font-sans font-bold text-5xl md:text-4xl lg:text-5xl",
                                        style: {
                                            letterSpacing: '-0.01em'
                                        },
                                        children: [
                                            "plus",
                                            ' ',
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: 'rgb(255,223,202)'
                                                },
                                                children: [
                                                    displayedText,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            opacity: isTyping ? 1 : 0,
                                                            transition: 'opacity 0.1s'
                                                        },
                                                        children: "|"
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/Seminaires.tsx",
                                                        lineNumber: 849,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/views/Seminaires.tsx",
                                                lineNumber: 847,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/views/Seminaires.tsx",
                                        lineNumber: 845,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/views/Seminaires.tsx",
                                lineNumber: 843,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "sr-only",
                                children: "Séminaire au vert & nature engagé chez des producteurs français"
                            }, void 0, false, {
                                fileName: "[project]/views/Seminaires.tsx",
                                lineNumber: 853,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "hidden sm:block text-sm max-w-sm mx-auto mb-10 leading-relaxed",
                                style: {
                                    color: 'rgba(255,255,255,0.50)',
                                    fontStyle: 'italic'
                                },
                                children: "Moins de slides. Plus de sens."
                            }, void 0, false, {
                                fileName: "[project]/views/Seminaires.tsx",
                                lineNumber: 857,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>openModal(),
                                        className: "text-white border border-white/100 hover:border-white/70 px-7 py-3 text-[10px] uppercase tracking-[0.22em] font-bold transition-all duration-300 hover:bg-white/25 rounded-full",
                                        children: "Organiser votre séminaire"
                                    }, void 0, false, {
                                        fileName: "[project]/views/Seminaires.tsx",
                                        lineNumber: 862,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/entreprises?scroll=nos-univers",
                                        className: "text-[10px] uppercase tracking-[0.22em] font-bold transition-all duration-300 px-4 py-3",
                                        style: {
                                            color: 'rgba(255, 255, 255, 0.8)'
                                        },
                                        onMouseEnter: (e)=>e.currentTarget.style.color = 'rgba(255,255,255)',
                                        onMouseLeave: (e)=>e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)',
                                        children: "Découvrir nos univers →"
                                    }, void 0, false, {
                                        fileName: "[project]/views/Seminaires.tsx",
                                        lineNumber: 868,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/views/Seminaires.tsx",
                                lineNumber: 861,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/views/Seminaires.tsx",
                        lineNumber: 836,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>document.getElementById('etoiles')?.scrollIntoView({
                                    behavior: 'smooth'
                                }),
                            style: {
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 8
                            },
                            "aria-label": "Voir la suite",
                            className: "scroll-arrow-sem",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "26",
                                height: "26",
                                viewBox: "0 0 26 26",
                                fill: "none",
                                xmlns: "http://www.w3.org/2000/svg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M6 10L13 17L20 10",
                                    stroke: "rgba(255,255,255,0.9)",
                                    strokeWidth: "1.5",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round"
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 889,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/views/Seminaires.tsx",
                                lineNumber: 888,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/views/Seminaires.tsx",
                            lineNumber: 882,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/views/Seminaires.tsx",
                        lineNumber: 881,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                        children: `
          @keyframes scrollBounce {
            0%, 100% { transform: translateY(0); opacity: 0.5; }
            50% { transform: translateY(6px); opacity: 1; }
          }
          .scroll-arrow-sem { animation: scrollBounce 2.2s ease-in-out infinite; }
          .seminaires-section-after-hero { padding-top: clamp(5rem, 10vw, 9rem); }
          @media (min-width: 1024px) { .seminaires-section-after-hero { padding-top: calc(9rem + 84px); } }
          .univers-modal-box { scrollbar-width: none; -ms-overflow-style: none; }
          .univers-modal-box::-webkit-scrollbar { display: none; }
        `
                    }, void 0, false, {
                        fileName: "[project]/views/Seminaires.tsx",
                        lineNumber: 893,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/views/Seminaires.tsx",
                lineNumber: 830,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    paddingBottom: 'clamp(5rem, 10vw, 9rem)'
                },
                className: "bg-white seminaires-section-after-hero",
                id: "etoiles",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 mb-14",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 20,
                                            height: 1,
                                            background: '#e67e22'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/views/Seminaires.tsx",
                                        lineNumber: 910,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 9,
                                            letterSpacing: '0.28em',
                                            fontWeight: 700,
                                            textTransform: 'uppercase',
                                            color: '#e67e22'
                                        },
                                        children: "5 étoiles"
                                    }, void 0, false, {
                                        fileName: "[project]/views/Seminaires.tsx",
                                        lineNumber: 911,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/views/Seminaires.tsx",
                                lineNumber: 909,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: '#e67e22',
                                    fontSize: 14,
                                    marginBottom: 12,
                                    letterSpacing: '0.3em'
                                },
                                children: "⭐⭐⭐⭐⭐"
                            }, void 0, false, {
                                fileName: "[project]/views/Seminaires.tsx",
                                lineNumber: 913,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ScrollAnimate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                delay: 150,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "font-bold text-primary leading-[1.06]",
                                    style: {
                                        letterSpacing: '-0.01em'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-sans text-4xl sm:text-5xl",
                                            children: "Des séminaires nature & terroir,"
                                        }, void 0, false, {
                                            fileName: "[project]/views/Seminaires.tsx",
                                            lineNumber: 916,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-display italic text-5xl sm:text-5xl lg:text-6xl",
                                            children: " 5 étoiles."
                                        }, void 0, false, {
                                            fileName: "[project]/views/Seminaires.tsx",
                                            lineNumber: 917,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 915,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/views/Seminaires.tsx",
                                lineNumber: 914,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 max-w-2xl",
                                style: {
                                    color: '#9a9080',
                                    fontSize: 14,
                                    lineHeight: 1.75
                                },
                                children: 'Nos "5 étoiles" ne se mesurent pas au luxe, mais aux liens humains, au contact de la terre et à l\'engagement des producteurs. Des expériences sincères qui renforcent la cohésion et laissent une trace durable.'
                            }, void 0, false, {
                                fileName: "[project]/views/Seminaires.tsx",
                                lineNumber: 920,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/views/Seminaires.tsx",
                        lineNumber: 908,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-6",
                            children: [
                                {
                                    icon: 'diversity_3',
                                    title: 'Humain',
                                    text: 'Décrochez et découvrez la richesse de vos équipes par des échanges vrais en rencontrant ceux qui nous nourrissent.',
                                    image: 'https://images.unsplash.com/photo-1624720114692-037e42acec41?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                                },
                                {
                                    icon: 'handyman',
                                    title: 'Immersif',
                                    text: 'Sortez de votre zone de confort et exprimez-vous en mettant les mains dans la Terre. Vous allez vous en souvenir !',
                                    image: 'https://images.unsplash.com/photo-1720420865912-2bbd6bfa1e85?q=80&w=3131&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                                },
                                {
                                    icon: 'flare',
                                    title: 'Authentique',
                                    text: "Retrouvez le sens de l'essentiel au contact de producteurs qui incarnent la vérité et l'exigence du terrain.",
                                    image: 'https://images.unsplash.com/photo-1594928357228-3075ba0e4674?q=80&w=1293&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                                },
                                {
                                    icon: 'eco',
                                    title: 'Engagé',
                                    text: 'Transformez votre séminaire en acte managérial fort en soutenant directement ceux qui agissent pour la Terre.',
                                    image: 'https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/general/VERGERS.jpg'
                                },
                                {
                                    icon: 'handshake',
                                    title: 'Passionnant',
                                    text: "Utilisez le terroir comme fondation pour reconstruire une cohésion d'équipe naturelle et durable.",
                                    image: 'https://images.unsplash.com/photo-1662558739852-613841d6b834?q=80&w=1348&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                                }
                            ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "group relative flex flex-col justify-end overflow-hidden rounded-[22px] cursor-pointer transition-all duration-300 min-h-[260px] sm:min-h-[300px]",
                                    style: {
                                        border: '1px solid rgba(26,46,26,0.07)',
                                        boxShadow: '0 2px 14px rgba(0,0,0,0.06)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: item.image,
                                            alt: "",
                                            className: "absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        }, void 0, false, {
                                            fileName: "[project]/views/Seminaires.tsx",
                                            lineNumber: 938,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10",
                                            style: {
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.4) 40%, transparent)'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/views/Seminaires.tsx",
                                            lineNumber: 943,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 pointer-events-none z-0",
                                            style: {
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/views/Seminaires.tsx",
                                            lineNumber: 947,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative z-10 flex flex-col items-center text-center p-6 pb-8 opacity-100 transition-opacity duration-300 group-hover:opacity-0 group-hover:z-0 pointer-events-none",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-11 h-11 rounded-full flex items-center justify-center mb-4 flex-shrink-0 shadow-lg",
                                                    style: {
                                                        background: 'rgba(255,255,255,0.95)',
                                                        color: '#1a2e1a'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "material-symbols-outlined",
                                                        style: {
                                                            fontSize: 22
                                                        },
                                                        children: item.icon
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/Seminaires.tsx",
                                                        lineNumber: 953,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires.tsx",
                                                    lineNumber: 952,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-sans font-bold text-white drop-shadow-md",
                                                    style: {
                                                        fontSize: 15,
                                                        fontWeight: 500
                                                    },
                                                    children: item.title
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires.tsx",
                                                    lineNumber: 955,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/views/Seminaires.tsx",
                                            lineNumber: 951,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 flex flex-col items-center justify-center text-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20",
                                            style: {
                                                background: 'rgba(0,0,0,0.65)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-11 h-11 rounded-full flex items-center justify-center mb-4 flex-shrink-0",
                                                    style: {
                                                        background: 'rgba(255,255,255,0.2)',
                                                        color: '#fff'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "material-symbols-outlined",
                                                        style: {
                                                            fontSize: 22
                                                        },
                                                        children: item.icon
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/Seminaires.tsx",
                                                        lineNumber: 962,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires.tsx",
                                                    lineNumber: 961,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-sans font-bold text-white mb-3",
                                                    style: {
                                                        fontSize: 15,
                                                        fontWeight: 500
                                                    },
                                                    children: item.title
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires.tsx",
                                                    lineNumber: 964,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-white text-sm leading-relaxed max-w-[240px]",
                                                    style: {
                                                        lineHeight: 1.7
                                                    },
                                                    children: item.text
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires.tsx",
                                                    lineNumber: 965,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/views/Seminaires.tsx",
                                            lineNumber: 957,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, item.title, true, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 933,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/views/Seminaires.tsx",
                            lineNumber: 925,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/views/Seminaires.tsx",
                        lineNumber: 924,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/views/Seminaires.tsx",
                lineNumber: 907,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    paddingTop: 'clamp(5rem, 10vw, 9rem)',
                    paddingBottom: 'clamp(5rem, 10vw, 9rem)'
                },
                className: "bg-beige-bg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-6xl mx-auto px-6 sm:px-8 lg:px-12",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-14",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 mb-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: 20,
                                                height: 1,
                                                background: '#e67e22'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/views/Seminaires.tsx",
                                            lineNumber: 978,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 9,
                                                letterSpacing: '0.28em',
                                                fontWeight: 700,
                                                textTransform: 'uppercase',
                                                color: '#e67e22'
                                            },
                                            children: "Nos garanties"
                                        }, void 0, false, {
                                            fileName: "[project]/views/Seminaires.tsx",
                                            lineNumber: 979,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 977,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ScrollAnimate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    delay: 200,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "font-bold text-primary leading-[1.06]",
                                        style: {
                                            letterSpacing: '-0.01em'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-sans text-4xl sm:text-5xl",
                                                children: "Chaque séminaire au vert"
                                            }, void 0, false, {
                                                fileName: "[project]/views/Seminaires.tsx",
                                                lineNumber: 983,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-display italic text-5xl sm:text-5xl lg:text-6xl",
                                                children: " vous garantit."
                                            }, void 0, false, {
                                                fileName: "[project]/views/Seminaires.tsx",
                                                lineNumber: 984,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/views/Seminaires.tsx",
                                        lineNumber: 982,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 981,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/Seminaires.tsx",
                            lineNumber: 976,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/views/Seminaires.tsx",
                        lineNumber: 975,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
                            children: [
                                {
                                    icon: 'groups',
                                    label: 'Rencontres authentiques',
                                    text: 'Partez à la rencontre de producteurs et artisans passionnés, qui vous partageront leur quotidien, et leur savoir-faire avec authenticité.'
                                },
                                {
                                    icon: 'eco',
                                    label: 'Activité les mains dans la terre',
                                    text: 'Récolter, tailler, planter, fabriquer… dans la peau de celles et ceux qui font le terroir, au rythme des saisons et des savoir-faire locaux.'
                                },
                                {
                                    icon: 'restaurant',
                                    label: 'Tissu local',
                                    text: 'Savourez le vrai : des repas pensés autour des producteurs locaux, de saison et engagés. Chaque assiette raconte une histoire.'
                                },
                                {
                                    icon: 'nature',
                                    label: 'Cadre ressourçant',
                                    text: 'Nos séminaires se déroulent dans des lieux naturels soigneusement choisis pour leur authenticité — fermes, domaines agricoles, espaces verdoyants.'
                                },
                                {
                                    icon: 'diversity_3',
                                    label: 'Cohésion sur mesure',
                                    text: 'Des activités ludiques et même sportives, pensées sur-mesure pour renforcer les liens, et créer de vrais moments de complicité.'
                                },
                                {
                                    icon: 'key',
                                    label: 'Clé en main',
                                    text: 'Logement, activités, repas, espaces et matériel de réunion, transport... Une logistique invisible pour des expériences inoubliables.'
                                }
                            ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "group flex items-start gap-5 transition-all duration-300 cursor-pointer",
                                    style: {
                                        background: '#fff',
                                        border: '1px solid rgba(26,46,26,0.07)',
                                        borderRadius: '20px',
                                        padding: '28px 32px'
                                    },
                                    onMouseEnter: (e)=>{
                                        e.currentTarget.style.borderColor = 'rgba(26,46,26,0.18)';
                                    },
                                    onMouseLeave: (e)=>{
                                        e.currentTarget.style.borderColor = 'rgba(26,46,26,0.07)';
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300",
                                            style: {
                                                background: 'rgba(26,46,26,0.06)',
                                                color: '#1a2e1a'
                                            },
                                            ref: (el)=>{
                                                if (!el) return;
                                                const parent = el.closest('.group');
                                                if (!parent) return;
                                                parent.addEventListener('mouseenter', ()=>{
                                                    el.style.color = '#e67e22';
                                                });
                                                parent.addEventListener('mouseleave', ()=>{
                                                    el.style.color = '#1a2e1a';
                                                });
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-symbols-outlined text-xl",
                                                children: item.icon
                                            }, void 0, false, {
                                                fileName: "[project]/views/Seminaires.tsx",
                                                lineNumber: 1017,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/views/Seminaires.tsx",
                                            lineNumber: 1006,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-sans font-bold text-primary mb-1.5 group-hover:text-orange transition-colors",
                                                    style: {
                                                        fontSize: 16
                                                    },
                                                    children: item.label
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires.tsx",
                                                    lineNumber: 1020,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        color: '#7a7060',
                                                        fontSize: 13,
                                                        lineHeight: 1.7
                                                    },
                                                    children: item.text
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires.tsx",
                                                    lineNumber: 1021,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/views/Seminaires.tsx",
                                            lineNumber: 1019,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, item.icon, true, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 999,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/views/Seminaires.tsx",
                            lineNumber: 990,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/views/Seminaires.tsx",
                        lineNumber: 989,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/views/Seminaires.tsx",
                lineNumber: 974,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    paddingTop: 'clamp(5rem, 10vw, 9rem)',
                    paddingBottom: 'clamp(5rem, 10vw, 9rem)',
                    backgroundColor: '#0d1a0d'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto px-6 sm:px-8 lg:px-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-14",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 mb-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: 20,
                                                height: 1,
                                                background: '#e67e22'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/views/Seminaires.tsx",
                                            lineNumber: 1034,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 9,
                                                letterSpacing: '0.28em',
                                                fontWeight: 700,
                                                textTransform: 'uppercase',
                                                color: '#e67e22'
                                            },
                                            children: "Nos formats"
                                        }, void 0, false, {
                                            fileName: "[project]/views/Seminaires.tsx",
                                            lineNumber: 1035,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 1033,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ScrollAnimate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    delay: 200,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "font-bold text-white leading-[1.06]",
                                        style: {
                                            letterSpacing: '-0.01em'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-sans text-4xl sm:text-5xl",
                                                children: "Des formats de séminaire engagé"
                                            }, void 0, false, {
                                                fileName: "[project]/views/Seminaires.tsx",
                                                lineNumber: 1039,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-display italic text-5xl sm:text-5xl lg:text-6xl",
                                                children: " adaptés à chaque équipe."
                                            }, void 0, false, {
                                                fileName: "[project]/views/Seminaires.tsx",
                                                lineNumber: 1040,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/views/Seminaires.tsx",
                                        lineNumber: 1038,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 1037,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/Seminaires.tsx",
                            lineNumber: 1032,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                            children: [
                                {
                                    icon: 'calendar_today',
                                    tag: 'Format court',
                                    label: 'À la journée',
                                    text: 'Un format concentré pour (re)mettre du sens dans une journée hors du bureau, au contact direct du terroir.',
                                    duration: '1 jour',
                                    people: 'dès 6 pers.'
                                },
                                {
                                    icon: 'event',
                                    tag: 'Format immersif',
                                    label: 'Sur 2 jours',
                                    text: 'Deux jours pour alterner temps de travail, immersion dans les exploitations et moments de cohésion en équipe.',
                                    duration: '2 jours',
                                    people: 'dès 6 pers.'
                                },
                                {
                                    icon: 'design_services',
                                    tag: 'Format plus',
                                    label: 'Sur mesure',
                                    text: 'Un séminaire entièrement construit avec vous : rythme, intensité, thématique, et producteurs partenaires.',
                                    duration: 'Durée libre',
                                    people: 'tout effectif'
                                }
                            ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-4 transition-all duration-300",
                                    style: {
                                        background: 'rgba(255,255,255,0.04)',
                                        border: '1px solid rgba(255,255,255,0.07)',
                                        borderRadius: '20px',
                                        padding: '24px'
                                    },
                                    onMouseEnter: (e)=>{
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                                    },
                                    onMouseLeave: (e)=>{
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-10 h-10 rounded-full flex items-center justify-center",
                                            style: {
                                                background: 'rgba(230,126,34,0.12)',
                                                color: '#e67e22'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-symbols-outlined text-xl",
                                                children: item.icon
                                            }, void 0, false, {
                                                fileName: "[project]/views/Seminaires.tsx",
                                                lineNumber: 1058,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/views/Seminaires.tsx",
                                            lineNumber: 1057,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 9,
                                                        fontWeight: 700,
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.22em',
                                                        color: '#e67e22',
                                                        marginBottom: 6
                                                    },
                                                    children: item.tag
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires.tsx",
                                                    lineNumber: 1061,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-sans font-bold text-white",
                                                    style: {
                                                        fontSize: 16,
                                                        marginBottom: 8
                                                    },
                                                    children: item.label
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires.tsx",
                                                    lineNumber: 1062,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        color: 'rgba(255,255,255,0.40)',
                                                        fontSize: 13,
                                                        lineHeight: 1.75
                                                    },
                                                    children: item.text
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires.tsx",
                                                    lineNumber: 1063,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/views/Seminaires.tsx",
                                            lineNumber: 1060,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-auto pt-4 flex items-center gap-2",
                                            style: {
                                                borderTop: '1px solid rgba(255,255,255,0.07)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "material-symbols-outlined",
                                                    style: {
                                                        fontSize: 14,
                                                        color: 'rgba(255,255,255,0.25)'
                                                    },
                                                    children: "schedule"
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires.tsx",
                                                    lineNumber: 1066,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: 9,
                                                        fontWeight: 700,
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.15em',
                                                        color: 'rgba(255,255,255,0.25)'
                                                    },
                                                    children: [
                                                        item.duration,
                                                        " · ",
                                                        item.people
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/views/Seminaires.tsx",
                                                    lineNumber: 1067,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/views/Seminaires.tsx",
                                            lineNumber: 1065,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, item.label, true, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 1050,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/views/Seminaires.tsx",
                            lineNumber: 1044,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/views/Seminaires.tsx",
                    lineNumber: 1031,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/views/Seminaires.tsx",
                lineNumber: 1030,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    paddingTop: 'clamp(5rem, 10vw, 9rem)',
                    paddingBottom: 'clamp(5rem, 10vw, 9rem)'
                },
                className: "bg-white",
                id: "nos-univers",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 mb-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 mb-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            width: 20,
                                                            height: 1,
                                                            background: '#e67e22'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/Seminaires.tsx",
                                                        lineNumber: 1081,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: 9,
                                                            letterSpacing: '0.28em',
                                                            fontWeight: 700,
                                                            textTransform: 'uppercase',
                                                            color: '#e67e22'
                                                        },
                                                        children: "Univers"
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/Seminaires.tsx",
                                                        lineNumber: 1082,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/views/Seminaires.tsx",
                                                lineNumber: 1080,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ScrollAnimate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                delay: 150,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "font-bold text-primary leading-[1.06]",
                                                    style: {
                                                        letterSpacing: '-0.01em'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-sans text-4xl sm:text-5xl",
                                                            children: "Nos univers terroir"
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/Seminaires.tsx",
                                                            lineNumber: 1086,
                                                            columnNumber: 15
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-display italic text-5xl sm:text-5xl lg:text-6xl",
                                                            children: " en France."
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/Seminaires.tsx",
                                                            lineNumber: 1087,
                                                            columnNumber: 15
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/views/Seminaires.tsx",
                                                    lineNumber: 1085,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/views/Seminaires.tsx",
                                                lineNumber: 1084,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-4 max-w-2xl",
                                                style: {
                                                    color: '#9a9080',
                                                    fontSize: 14,
                                                    lineHeight: 1.75
                                                },
                                                children: "De la Provence au Pays Basque, découvrez nos expériences immersives chez des producteurs locaux — vignerons, fromagers, oléiculteurs et bien d'autres."
                                            }, void 0, false, {
                                                fileName: "[project]/views/Seminaires.tsx",
                                                lineNumber: 1090,
                                                columnNumber: 11
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/views/Seminaires.tsx",
                                        lineNumber: 1079,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hidden sm:flex gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>scrollExamples('left'),
                                                className: "w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300",
                                                style: {
                                                    background: '#fff',
                                                    border: '1px solid rgba(26,46,26,0.12)',
                                                    color: '#1a2e1a'
                                                },
                                                onMouseEnter: (e)=>{
                                                    e.currentTarget.style.background = '#1a2e1a';
                                                    e.currentTarget.style.color = '#fff';
                                                },
                                                onMouseLeave: (e)=>{
                                                    e.currentTarget.style.background = '#fff';
                                                    e.currentTarget.style.color = '#1a2e1a';
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "material-symbols-outlined text-xl",
                                                    children: "chevron_left"
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires.tsx",
                                                    lineNumber: 1096,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/views/Seminaires.tsx",
                                                lineNumber: 1095,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>scrollExamples('right'),
                                                className: "w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300",
                                                style: {
                                                    background: '#fff',
                                                    border: '1px solid rgba(26,46,26,0.12)',
                                                    color: '#1a2e1a'
                                                },
                                                onMouseEnter: (e)=>{
                                                    e.currentTarget.style.background = '#1a2e1a';
                                                    e.currentTarget.style.color = '#fff';
                                                },
                                                onMouseLeave: (e)=>{
                                                    e.currentTarget.style.background = '#fff';
                                                    e.currentTarget.style.color = '#1a2e1a';
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "material-symbols-outlined text-xl",
                                                    children: "chevron_right"
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Seminaires.tsx",
                                                    lineNumber: 1099,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/views/Seminaires.tsx",
                                                lineNumber: 1098,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/views/Seminaires.tsx",
                                        lineNumber: 1094,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/views/Seminaires.tsx",
                                lineNumber: 1078,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2 mt-8",
                                children: [
                                    'le vin',
                                    'la truffe',
                                    'les olives',
                                    'la lavande',
                                    'le fromage de chèvre',
                                    'les noix',
                                    'le cognac',
                                    'les piments',
                                    'les noisettes'
                                ].map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setSelectedUniverse(selectedUniverse === product ? null : product),
                                        className: "transition-all duration-300",
                                        style: {
                                            padding: '6px 16px',
                                            borderRadius: 9999,
                                            fontSize: 10,
                                            fontWeight: 700,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.12em',
                                            border: `1.5px solid ${selectedUniverse === product ? '#e67e22' : 'rgba(26,46,26,0.12)'}`,
                                            background: selectedUniverse === product ? '#e67e22' : 'transparent',
                                            color: selectedUniverse === product ? '#fff' : '#7a7060',
                                            cursor: 'pointer'
                                        },
                                        children: product
                                    }, product, false, {
                                        fileName: "[project]/views/Seminaires.tsx",
                                        lineNumber: 1107,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/views/Seminaires.tsx",
                                lineNumber: 1105,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/views/Seminaires.tsx",
                        lineNumber: 1077,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-screen left-1/2 -translate-x-1/2 pb-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: examplesCarouselRef,
                            className: "w-screen py-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: examplesScrollRef,
                                className: "no-scrollbar flex overflow-x-scroll overflow-y-visible py-2 pb-6 scroll-smooth",
                                style: {
                                    gap: isMobile ? 16 : CAROUSEL_GAP_PX,
                                    paddingLeft: isMobile ? (window.innerWidth - examplesCardWidthPx) / 2 : 48,
                                    paddingRight: isMobile ? (window.innerWidth - examplesCardWidthPx) / 2 : 48,
                                    scrollbarWidth: 'none',
                                    msOverflowStyle: 'none',
                                    WebkitOverflowScrolling: 'touch',
                                    touchAction: 'pan-x',
                                    overscrollBehaviorX: 'contain',
                                    WebkitUserSelect: 'none',
                                    userSelect: 'none',
                                    cursor: 'grab'
                                },
                                onMouseDown: (e)=>{
                                    const el = examplesScrollRef.current;
                                    if (!el) return;
                                    el.style.cursor = 'grabbing';
                                    const startX = e.pageX - el.offsetLeft, sl = el.scrollLeft;
                                    const onMove = (e)=>{
                                        e.preventDefault();
                                        el.scrollLeft = sl - (e.pageX - el.offsetLeft - startX) * 1.5;
                                    };
                                    const onUp = ()=>{
                                        el.style.cursor = 'grab';
                                        document.removeEventListener('mousemove', onMove);
                                        document.removeEventListener('mouseup', onUp);
                                        document.removeEventListener('mouseleave', onUp);
                                    };
                                    document.addEventListener('mousemove', onMove);
                                    document.addEventListener('mouseup', onUp);
                                    document.addEventListener('mouseleave', onUp);
                                },
                                children: filteredCards.length > 0 ? filteredCards.map((card)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-shrink-0",
                                        style: {
                                            width: cardWidthPx
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UniverseCard, {
                                            ...card,
                                            onOpenModal: ()=>openUniversModal(card.universId)
                                        }, void 0, false, {
                                            fileName: "[project]/views/Seminaires.tsx",
                                            lineNumber: 1133,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, `${card.title}-${card.desc}`, false, {
                                        fileName: "[project]/views/Seminaires.tsx",
                                        lineNumber: 1132,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-shrink-0 w-full text-center py-8",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            color: '#9a9080',
                                            fontSize: 14
                                        },
                                        children: "Aucune carte disponible pour cet univers."
                                    }, void 0, false, {
                                        fileName: "[project]/views/Seminaires.tsx",
                                        lineNumber: 1136,
                                        columnNumber: 72
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 1136,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/views/Seminaires.tsx",
                                lineNumber: 1119,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/views/Seminaires.tsx",
                            lineNumber: 1118,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/views/Seminaires.tsx",
                        lineNumber: 1117,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sm:hidden flex justify-center items-center gap-1.5 pt-2 pb-4",
                        children: filteredCards.map((_, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "transition-all duration-300 rounded-full",
                                style: {
                                    width: idx === activeCardIndex ? 20 : 6,
                                    height: 6,
                                    background: idx === activeCardIndex ? '#e67e22' : 'rgba(0,0,0,0.12)'
                                }
                            }, idx, false, {
                                fileName: "[project]/views/Seminaires.tsx",
                                lineNumber: 1145,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/views/Seminaires.tsx",
                        lineNumber: 1143,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/views/Seminaires.tsx",
                lineNumber: 1076,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    paddingTop: 'clamp(5rem, 10vw, 9rem)',
                    paddingBottom: 'clamp(5rem, 10vw, 9rem)'
                },
                className: "bg-beige-bg",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-4xl mx-auto px-2 sm:px-4 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center gap-3 mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: 20,
                                        height: 1,
                                        background: '#e67e22'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 1154,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 9,
                                        letterSpacing: '0.28em',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        color: '#e67e22'
                                    },
                                    children: "Nos offres"
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 1155,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: 20,
                                        height: 1,
                                        background: '#e67e22'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 1156,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/Seminaires.tsx",
                            lineNumber: 1153,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-bold text-primary leading-[1.06] mb-4",
                            style: {
                                letterSpacing: '-0.01em'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-sans text-3xl sm:text-4xl",
                                    children: "Recevez notre"
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 1159,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-display italic text-[2.65rem] sm:text-[3rem]",
                                    children: " plaquette 2026."
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 1160,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/Seminaires.tsx",
                            lineNumber: 1158,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mb-10",
                            style: {
                                color: '#9a9080',
                                fontSize: 14,
                                lineHeight: 1.7
                            },
                            children: "Laissez-nous votre email et recevez notre plaquette regroupant toutes nos offres. Sous 24h, promis ! Séminaires clé en main, team building terroir, incentive nature — toutes nos offres détaillées dans un seul document."
                        }, void 0, false, {
                            fileName: "[project]/views/Seminaires.tsx",
                            lineNumber: 1162,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        plaquetteSuccess ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                background: 'rgba(26,46,26,0.06)',
                                borderRadius: '9999px',
                                padding: '14px 28px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 10
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: 28,
                                        height: 28,
                                        borderRadius: '50%',
                                        background: '#1a2e1a',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "material-symbols-outlined text-white",
                                        style: {
                                            fontSize: 14
                                        },
                                        children: "check"
                                    }, void 0, false, {
                                        fileName: "[project]/views/Seminaires.tsx",
                                        lineNumber: 1169,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 1168,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        color: '#1a2e1a',
                                        fontWeight: 700,
                                        fontSize: 12,
                                        margin: 0,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.12em'
                                    },
                                    children: "Envoyée sous 24h !"
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 1171,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/Seminaires.tsx",
                            lineNumber: 1167,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handlePlaquetteSubmit,
                            className: "w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col sm:flex-row gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "email",
                                            required: true,
                                            placeholder: "jeveuxlaplaquette@email.fr",
                                            value: plaquetteEmail,
                                            onChange: (e)=>{
                                                setPlaquetteEmail(e.target.value);
                                                setPlaquetteEmailError('');
                                            },
                                            className: "flex-1 bg-white px-6 py-4 focus:outline-none transition-all",
                                            style: {
                                                border: `1px solid ${plaquetteEmailError ? '#e67e22' : 'rgba(26,46,26,0.09)'}`,
                                                borderRadius: '9999px',
                                                color: '#1a2e1a',
                                                fontSize: 13
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/views/Seminaires.tsx",
                                            lineNumber: 1176,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            disabled: plaquetteSubmitting,
                                            className: "px-7 py-4 text-white font-bold uppercase transition-all duration-300",
                                            style: {
                                                background: '#1a2e1a',
                                                borderRadius: '9999px',
                                                fontSize: 9,
                                                letterSpacing: '0.22em',
                                                opacity: plaquetteSubmitting ? 0.7 : 1
                                            },
                                            onMouseEnter: (e)=>e.currentTarget.style.background = '#e67e22',
                                            onMouseLeave: (e)=>e.currentTarget.style.background = '#1a2e1a',
                                            children: plaquetteSubmitting ? '…' : 'Recevoir'
                                        }, void 0, false, {
                                            fileName: "[project]/views/Seminaires.tsx",
                                            lineNumber: 1182,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 1175,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                plaquetteEmailError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        color: '#e67e22',
                                        fontSize: 10,
                                        marginTop: 8
                                    },
                                    children: plaquetteEmailError
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 1192,
                                    columnNumber: 39
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-5",
                                    style: {
                                        fontSize: 9,
                                        color: '#b8ad9e',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.2em',
                                        fontWeight: 700
                                    },
                                    children: "100% français & authentique · Pas de spam"
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 1193,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/Seminaires.tsx",
                            lineNumber: 1174,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/views/Seminaires.tsx",
                    lineNumber: 1152,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/views/Seminaires.tsx",
                lineNumber: 1151,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            selectedUniversModal && (()=>{
                const card = exampleCards.find((c)=>c.universId === selectedUniversModal.id);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: closeUniversModal,
                    style: {
                        position: 'fixed',
                        inset: 0,
                        zIndex: 200,
                        background: 'rgba(10,20,10,0.78)',
                        backdropFilter: 'blur(10px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '24px',
                        opacity: isUniversModalClosing ? 0 : 1,
                        transition: 'opacity 0.25s ease'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: (e)=>e.stopPropagation(),
                        className: "bg-white univers-modal-box",
                        style: {
                            borderRadius: 24,
                            maxWidth: 620,
                            width: '100%',
                            overflow: 'hidden',
                            boxShadow: '0 40px 100px rgba(0,0,0,0.25)',
                            transform: isUniversModalClosing ? 'translateY(20px) scale(0.97)' : 'translateY(0) scale(1)',
                            transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            border: '1px solid rgba(26,46,26,0.08)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: 'relative',
                                    paddingTop: '34%',
                                    overflow: 'visible'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: card?.image ?? '',
                                        alt: selectedUniversModal.label,
                                        style: {
                                            position: 'absolute',
                                            inset: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/views/Seminaires.tsx",
                                        lineNumber: 1209,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: 'absolute',
                                            inset: 0,
                                            background: `linear-gradient(to top, ${selectedUniversModal.couleur}99 0%, transparent 50%)`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/views/Seminaires.tsx",
                                        lineNumber: 1210,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: closeUniversModal,
                                        className: "flex items-center justify-center",
                                        style: {
                                            position: 'absolute',
                                            top: 16,
                                            right: 16,
                                            width: 40,
                                            height: 40,
                                            borderRadius: '50%',
                                            background: 'rgba(255,255,255,0.95)',
                                            border: '1px solid rgba(26,46,26,0.08)',
                                            cursor: 'pointer',
                                            color: '#1a2e1a',
                                            fontSize: 20,
                                            fontWeight: 400
                                        },
                                        children: "×"
                                    }, void 0, false, {
                                        fileName: "[project]/views/Seminaires.tsx",
                                        lineNumber: 1211,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: 'absolute',
                                            top: 16,
                                            left: 16,
                                            padding: '6px 14px',
                                            borderRadius: 9999,
                                            background: 'rgba(255,255,255,0.2)',
                                            backdropFilter: 'blur(8px)',
                                            fontSize: 9,
                                            fontWeight: 700,
                                            color: '#fff',
                                            letterSpacing: '0.12em',
                                            textTransform: 'uppercase'
                                        },
                                        children: selectedUniversModal.badge
                                    }, void 0, false, {
                                        fileName: "[project]/views/Seminaires.tsx",
                                        lineNumber: 1212,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    card?.producerImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: 'absolute',
                                            left: '50%',
                                            bottom: -56,
                                            transform: 'translateX(-50%)',
                                            width: 130,
                                            height: 130,
                                            borderRadius: '50%',
                                            overflow: 'hidden',
                                            border: '5px solid #fff',
                                            boxShadow: '0 12px 40px rgba(0,0,0,0.2)'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: card.producerImage,
                                            alt: "",
                                            className: "w-full h-full object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/views/Seminaires.tsx",
                                            lineNumber: 1215,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/views/Seminaires.tsx",
                                        lineNumber: 1214,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/views/Seminaires.tsx",
                                lineNumber: 1208,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-6 pb-8",
                                style: {
                                    marginTop: -28,
                                    paddingTop: card?.producerImage ? 72 : 14,
                                    background: '#fff'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 mb-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    width: 20,
                                                    height: 1,
                                                    background: '#e67e22'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/views/Seminaires.tsx",
                                                lineNumber: 1222,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 9,
                                                    letterSpacing: '0.28em',
                                                    fontWeight: 700,
                                                    textTransform: 'uppercase',
                                                    color: '#e67e22'
                                                },
                                                children: "Univers"
                                            }, void 0, false, {
                                                fileName: "[project]/views/Seminaires.tsx",
                                                lineNumber: 1223,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/views/Seminaires.tsx",
                                        lineNumber: 1221,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-sans font-bold not-italic text-primary leading-tight mb-1",
                                        style: {
                                            fontSize: 'clamp(22px,4vw,28px)',
                                            fontFamily: "'Poppins', sans-serif"
                                        },
                                        children: exampleCards.find((c)=>c.universId === selectedUniversModal.id)?.title
                                    }, void 0, false, {
                                        fileName: "[project]/views/Seminaires.tsx",
                                        lineNumber: 1225,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 16,
                                            color: '#7a7060',
                                            lineHeight: 1.75,
                                            marginBottom: 26
                                        },
                                        children: selectedUniversModal.description
                                    }, void 0, false, {
                                        fileName: "[project]/views/Seminaires.tsx",
                                        lineNumber: 1226,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: 28
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    display: 'block',
                                                    fontSize: 10,
                                                    fontWeight: 700,
                                                    letterSpacing: '0.18em',
                                                    color: '#b8ad9e',
                                                    textTransform: 'uppercase',
                                                    marginBottom: 12
                                                },
                                                children: "Exemple d'activités"
                                            }, void 0, false, {
                                                fileName: "[project]/views/Seminaires.tsx",
                                                lineNumber: 1228,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                style: {
                                                    listStyle: 'none',
                                                    margin: 0,
                                                    padding: 0,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 12
                                                },
                                                children: selectedUniversModal.activites.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        className: "flex items-start gap-3",
                                                        style: {
                                                            fontSize: 15,
                                                            color: '#1a2e1a',
                                                            lineHeight: 1.55
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    width: 6,
                                                                    height: 6,
                                                                    borderRadius: '50%',
                                                                    background: '#e67e22',
                                                                    flexShrink: 0,
                                                                    marginTop: 7
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/views/Seminaires.tsx",
                                                                lineNumber: 1232,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            a
                                                        ]
                                                    }, a, true, {
                                                        fileName: "[project]/views/Seminaires.tsx",
                                                        lineNumber: 1231,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/views/Seminaires.tsx",
                                                lineNumber: 1229,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/views/Seminaires.tsx",
                                        lineNumber: 1227,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-3 items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    closeUniversModal();
                                                    openModal(selectedUniversModal?.id);
                                                },
                                                className: "py-4 rounded-full font-bold uppercase transition-colors duration-300",
                                                style: {
                                                    width: '92%',
                                                    maxWidth: 380,
                                                    background: '#1a2e1a',
                                                    color: '#fff',
                                                    border: 'none',
                                                    fontSize: 10,
                                                    letterSpacing: '0.15em',
                                                    cursor: 'pointer'
                                                },
                                                onMouseEnter: (e)=>{
                                                    e.currentTarget.style.background = '#e67e22';
                                                },
                                                onMouseLeave: (e)=>{
                                                    e.currentTarget.style.background = '#1a2e1a';
                                                },
                                                children: "Demander un devis pour cet univers →"
                                            }, void 0, false, {
                                                fileName: "[project]/views/Seminaires.tsx",
                                                lineNumber: 1238,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    closeUniversModal();
                                                    router.push(`/entreprises/offres${selectedUniversModal?.id ? `?univers=${selectedUniversModal.id}` : ''}`);
                                                },
                                                className: "py-3.5 rounded-full font-bold uppercase transition-all duration-300",
                                                style: {
                                                    width: '92%',
                                                    maxWidth: 380,
                                                    background: 'transparent',
                                                    color: '#e67e22',
                                                    border: '1.5px solid rgba(230,126,34,0.4)',
                                                    cursor: 'pointer',
                                                    fontSize: 10,
                                                    letterSpacing: '0.15em'
                                                },
                                                onMouseEnter: (e)=>{
                                                    e.currentTarget.style.background = '#e67e22';
                                                    e.currentTarget.style.color = '#fff';
                                                },
                                                onMouseLeave: (e)=>{
                                                    e.currentTarget.style.background = 'transparent';
                                                    e.currentTarget.style.color = '#e67e22';
                                                },
                                                children: "Découvrir nos offres packagées →"
                                            }, void 0, false, {
                                                fileName: "[project]/views/Seminaires.tsx",
                                                lineNumber: 1247,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/views/Seminaires.tsx",
                                        lineNumber: 1237,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/views/Seminaires.tsx",
                                lineNumber: 1220,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/views/Seminaires.tsx",
                        lineNumber: 1206,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/views/Seminaires.tsx",
                    lineNumber: 1205,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            })()
        ]
    }, void 0, true, {
        fileName: "[project]/views/Seminaires.tsx",
        lineNumber: 826,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s2(Seminaires, "wYiOP+Ai9Lh3bxclSsNiVo1nsX4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c7 = Seminaires;
// ─── Sub-components ───────────────────────────────────────────────────────────
const UniverseCard = ({ image, title, onOpenModal })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "group relative bg-white transition-all duration-500 flex flex-col cursor-pointer overflow-hidden",
        style: {
            height: 480,
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
            border: '1px solid rgba(26,46,26,0.06)'
        },
        onClick: onOpenModal,
        onMouseEnter: (e)=>{
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.13)';
            e.currentTarget.style.borderColor = 'rgba(26,46,26,0.12)';
        },
        onMouseLeave: (e)=>{
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.07)';
            e.currentTarget.style.borderColor = 'rgba(26,46,26,0.06)';
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative flex-1 flex flex-col overflow-hidden",
            style: {
                borderRadius: '20px'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: image,
                    className: "absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105",
                    alt: title
                }, void 0, false, {
                    fileName: "[project]/views/Seminaires.tsx",
                    lineNumber: 1277,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                }, void 0, false, {
                    fileName: "[project]/views/Seminaires.tsx",
                    lineNumber: 1278,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative flex flex-col justify-end flex-1 px-5 pb-6 pt-20",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-sans font-bold not-italic leading-tight mb-3 inline-block w-fit rounded-full px-4 py-2.5 transition-all duration-300 border-[3px] border-transparent group-hover:border-white/70 text-white group-hover:text-white/90",
                            style: {
                                fontSize: 'clamp(16px,2.2vw,20px)',
                                textShadow: '0 2px 12px rgba(0,0,0,0.4)'
                            },
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/views/Seminaires.tsx",
                            lineNumber: 1280,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "inline-flex items-center gap-2 pl-4 text-white font-semibold",
                            style: {
                                fontSize: 14,
                                letterSpacing: '0.02em'
                            },
                            children: [
                                "En savoir plus",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "material-symbols-outlined text-white group-hover:translate-x-0.5 transition-transform duration-300",
                                    style: {
                                        fontSize: 18
                                    },
                                    children: "arrow_forward"
                                }, void 0, false, {
                                    fileName: "[project]/views/Seminaires.tsx",
                                    lineNumber: 1288,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/Seminaires.tsx",
                            lineNumber: 1286,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/views/Seminaires.tsx",
                    lineNumber: 1279,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/views/Seminaires.tsx",
            lineNumber: 1276,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/views/Seminaires.tsx",
        lineNumber: 1269,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c8 = UniverseCard;
const __TURBOPACK__default__export__ = Seminaires;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
__turbopack_context__.k.register(_c, "Field");
__turbopack_context__.k.register(_c1, "Pill");
__turbopack_context__.k.register(_c2, "ModeBtn");
__turbopack_context__.k.register(_c3, "ToggleCard");
__turbopack_context__.k.register(_c4, "RecapRow");
__turbopack_context__.k.register(_c5, "DateRangePicker");
__turbopack_context__.k.register(_c6, "SeminaireModal");
__turbopack_context__.k.register(_c7, "Seminaires");
__turbopack_context__.k.register(_c8, "UniverseCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_200e0351._.js.map