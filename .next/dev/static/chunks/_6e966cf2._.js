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
"[project]/views/Particuliers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ScrollAnimate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ScrollAnimate.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const CONTACT_EMAIL = 'terragoexperiences@gmail.com';
const UNIVERS_OPTIONS = [
    {
        emoji: '🍷',
        label: 'Vin'
    },
    {
        emoji: '🫒',
        label: 'Olives'
    },
    {
        emoji: '🥃',
        label: 'Cognac'
    },
    {
        emoji: '🍄',
        label: 'Truffe'
    },
    {
        emoji: '🧀',
        label: 'Fromage'
    },
    {
        emoji: '💐',
        label: 'Lavande'
    },
    {
        emoji: '🌰',
        label: 'Noix'
    },
    {
        emoji: '🐿️',
        label: 'Noisettes'
    },
    {
        emoji: '🌶️',
        label: 'Piments'
    },
    {
        emoji: '🦪',
        label: 'Huîtres'
    },
    {
        emoji: '🐮',
        label: 'Élevages'
    },
    {
        emoji: '🍋',
        label: 'Agrumes'
    },
    {
        emoji: '✨',
        label: 'Surprise'
    }
];
const Particuliers = ()=>{
    _s();
    const [nom, setNom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [prenom, setPrenom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [portable, setPortable] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [periode, setPeriode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [univers, setUnivers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [participants, setParticipants] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [precisions, setPrecisions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submitSuccess, setSubmitSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submitError, setSubmitError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const toggleUnivers = (label)=>setUnivers((prev)=>prev.includes(label) ? prev.filter((u)=>u !== label) : [
                ...prev,
                label
            ]);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setSubmitError('');
        setIsSubmitting(true);
        const message = [
            'Bonjour,',
            '',
            'Je suis intéressé(e) par une expérience ou un séjour avec Terrago. Voici les détails de ma demande :',
            '',
            `Nom : ${nom}`,
            `Prénom : ${prenom}`,
            `Email : ${email || '—'}`,
            `Téléphone : ${portable || '—'}`,
            `Période ou date souhaitée : ${periode || '—'}`,
            `Produits / univers intéressants : ${univers.join(', ') || '—'}`,
            `Nombre de personnes : ${participants || '—'}`,
            precisions ? `Précisions : ${precisions}` : '',
            '',
            'Merci pour votre retour.',
            '',
            `${prenom} ${nom}`
        ].filter(Boolean).join('\n');
        try {
            const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    name: `${prenom} ${nom}`,
                    email,
                    subject: `Entre amis - Demande de ${prenom} ${nom}`,
                    message,
                    _captcha: false,
                    _template: 'table'
                })
            });
            if (response.ok) {
                setSubmitSuccess(true);
                setNom('');
                setPrenom('');
                setEmail('');
                setPortable('');
                setPeriode('');
                setUnivers([]);
                setParticipants('');
                setPrecisions('');
            } else throw new Error();
        } catch  {
            setSubmitError('Une erreur est survenue. Veuillez réessayer ou nous contacter à terragoexperiences@gmail.com');
        } finally{
            setIsSubmitting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "font-sans min-h-screen overflow-x-hidden",
        style: {
            background: '#faf8f5'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        .part-i {
          width: 100%;
          background: #faf8f5;
          border: 1px solid rgba(10,44,52,.08);
          border-radius: 12px;
          padding: 12px 16px;
          font-family: inherit;
          font-size: 13px;
          color: #1a2e1a;
          outline: none;
          transition: all .18s ease;
          box-sizing: border-box;
        }
        .part-i:focus {
          border-color: #1a2e1a;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(26,46,26,.06);
        }
        .part-i::placeholder { color: #c4bdb4; }
        @keyframes partSpin { to { transform: rotate(360deg); } }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(6px); opacity: 0.8; }
        }
        .scroll-arrow {
          animation: scrollBounce 2.2s ease-in-out infinite;
        }
        .part-side-images {
          display: flex;
        }
        @media (max-width: 1024px) {
          .part-side-images {
            display: none;
          }
        }
        @media (max-width: 600px) {
          .part-grid-2 { grid-template-columns: 1fr !important; }
        }
      `
            }, void 0, false, {
                fileName: "[project]/views/Particuliers.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    paddingTop: 'calc(84px + clamp(8rem, 13vw, 12rem))',
                    paddingBottom: 'clamp(4rem, 8vw, 7rem)',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                },
                className: "bg-white w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "part-side-images",
                        style: {
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            bottom: 0,
                            pointerEvents: 'none',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            gap: 12,
                            transform: 'translateX(6%) translateY(3cm)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    gap: 12
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: 215,
                                        height: 180,
                                        borderRadius: 16,
                                        overflow: 'hidden',
                                        flexShrink: 0
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: "https://images.unsplash.com/photo-1682996055064-599bec77fc62?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                                        alt: "Séjour groupe terroir – Terrago",
                                        style: {
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/views/Particuliers.tsx",
                                        lineNumber: 152,
                                        columnNumber: 5
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/views/Particuliers.tsx",
                                    lineNumber: 151,
                                    columnNumber: 3
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/views/Particuliers.tsx",
                                lineNumber: 150,
                                columnNumber: 1
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    gap: 12
                                },
                                children: [
                                    {
                                        src: 'https://images.unsplash.com/photo-1767034243078-c6d0dde763d8?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                        alt: 'Expérience gastronomique terroir – Terrago'
                                    },
                                    {
                                        src: 'https://images.unsplash.com/photo-1765966879544-cadc5b2af695?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                        alt: 'Immersion nature en groupe – Terrago'
                                    }
                                ].map(({ src, alt }, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 155,
                                            height: 170,
                                            borderRadius: 16,
                                            overflow: 'hidden',
                                            flexShrink: 0
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: src,
                                            alt: alt,
                                            style: {
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/views/Particuliers.tsx",
                                            lineNumber: 162,
                                            columnNumber: 7
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, i, false, {
                                        fileName: "[project]/views/Particuliers.tsx",
                                        lineNumber: 161,
                                        columnNumber: 5
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/views/Particuliers.tsx",
                                lineNumber: 156,
                                columnNumber: 1
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    gap: 12
                                },
                                children: [
                                    {
                                        src: 'https://images.unsplash.com/photo-1600265360126-aac005b63361?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                        alt: 'Producteur terroir français – Terrago'
                                    },
                                    {
                                        src: 'https://images.unsplash.com/photo-1770453572726-f51592710ca6?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                        alt: 'Séjour immersif entre amis – Terrago'
                                    },
                                    {
                                        src: 'https://images.unsplash.com/photo-1666955546775-f39d76308be7?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                        alt: 'Expérience unique chez un artisan – Terrago'
                                    }
                                ].map(({ src, alt }, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 155,
                                            height: 170,
                                            borderRadius: 16,
                                            overflow: 'hidden',
                                            flexShrink: 0
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: src,
                                            alt: alt,
                                            style: {
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/views/Particuliers.tsx",
                                            lineNumber: 174,
                                            columnNumber: 7
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, i, false, {
                                        fileName: "[project]/views/Particuliers.tsx",
                                        lineNumber: 173,
                                        columnNumber: 5
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/views/Particuliers.tsx",
                                lineNumber: 167,
                                columnNumber: 1
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/views/Particuliers.tsx",
                        lineNumber: 148,
                        columnNumber: 1
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "part-side-images",
                        style: {
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            pointerEvents: 'none',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            gap: 12,
                            transform: 'translateX(-6%) translateY(3cm)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    gap: 12
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: 215,
                                        height: 180,
                                        borderRadius: 16,
                                        overflow: 'hidden',
                                        flexShrink: 0
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: "https://images.unsplash.com/photo-1640957301215-f665baf6ed1d?q=80&w=1289&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                                        alt: "Séjour terroir entre amis France – Terrago",
                                        style: {
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/views/Particuliers.tsx",
                                        lineNumber: 185,
                                        columnNumber: 5
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/views/Particuliers.tsx",
                                    lineNumber: 184,
                                    columnNumber: 3
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/views/Particuliers.tsx",
                                lineNumber: 183,
                                columnNumber: 1
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    gap: 12
                                },
                                children: [
                                    {
                                        src: 'https://images.unsplash.com/photo-1656711695100-d6e39ddd6cb5?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                        alt: 'Expérience immersive chez un producteur – Terrago'
                                    },
                                    {
                                        src: 'https://images.unsplash.com/photo-1662960501707-1892f9b540f5?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                        alt: 'Découverte du terroir en groupe – Terrago'
                                    }
                                ].map(({ src, alt }, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 155,
                                            height: 170,
                                            borderRadius: 16,
                                            overflow: 'hidden',
                                            flexShrink: 0
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: src,
                                            alt: alt,
                                            style: {
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/views/Particuliers.tsx",
                                            lineNumber: 195,
                                            columnNumber: 7
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, i, false, {
                                        fileName: "[project]/views/Particuliers.tsx",
                                        lineNumber: 194,
                                        columnNumber: 5
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/views/Particuliers.tsx",
                                lineNumber: 189,
                                columnNumber: 1
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    gap: 12
                                },
                                children: [
                                    {
                                        src: 'https://images.unsplash.com/photo-1604300721398-3f58fdf81780?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                        alt: 'Activité nature entre amis – Terrago'
                                    },
                                    {
                                        src: 'https://images.unsplash.com/photo-1650964794396-9b9efaccd585?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                        alt: 'Séjour authentique terroir français – Terrago'
                                    },
                                    {
                                        src: 'https://images.unsplash.com/photo-1610055885401-dba0225da39b?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                        alt: 'Week-end chez un producteur – Terrago'
                                    }
                                ].map(({ src, alt }, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 155,
                                            height: 170,
                                            borderRadius: 16,
                                            overflow: 'hidden',
                                            flexShrink: 0
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: src,
                                            alt: alt,
                                            style: {
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/views/Particuliers.tsx",
                                            lineNumber: 207,
                                            columnNumber: 7
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, i, false, {
                                        fileName: "[project]/views/Particuliers.tsx",
                                        lineNumber: 206,
                                        columnNumber: 5
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/views/Particuliers.tsx",
                                lineNumber: 200,
                                columnNumber: 1
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/views/Particuliers.tsx",
                        lineNumber: 181,
                        columnNumber: 1
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center gap-3 mb-10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 20,
                                            height: 1,
                                            background: '#e67e22'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/views/Particuliers.tsx",
                                        lineNumber: 216,
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
                                        children: "Entre amis"
                                    }, void 0, false, {
                                        fileName: "[project]/views/Particuliers.tsx",
                                        lineNumber: 217,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 20,
                                            height: 1,
                                            background: '#e67e22'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/views/Particuliers.tsx",
                                        lineNumber: 220,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/views/Particuliers.tsx",
                                lineNumber: 215,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ScrollAnimate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                delay: 100,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "font-bold text-primary leading-tight mb-10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-sans not-italic text-4xl sm:text-5xl md:text-5xl",
                                            children: [
                                                "Des expériences & séjours uniques - 100% personnalisés,",
                                                ' '
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/views/Particuliers.tsx",
                                            lineNumber: 225,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-display italic text-5xl sm:text-6xl md:text-6xl",
                                            children: "entre amis ou en famille."
                                        }, void 0, false, {
                                            fileName: "[project]/views/Particuliers.tsx",
                                            lineNumber: 228,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/views/Particuliers.tsx",
                                    lineNumber: 224,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/views/Particuliers.tsx",
                                lineNumber: 223,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "sr-only",
                                children: "Séjour immersif terroir entre amis – Expériences chez des producteurs français"
                            }, void 0, false, {
                                fileName: "[project]/views/Particuliers.tsx",
                                lineNumber: 233,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: '#9a9080',
                                    fontSize: 14,
                                    lineHeight: 1.75
                                },
                                className: "max-w-2xl mx-auto",
                                children: "Vous souhaitez vivre un séjour immersif unique au cœur du terroir français, entre amis ou en famille ? Remplissez le formulaire ci-dessous : nous vous recontacterons pour vous proposer nos premières pépites."
                            }, void 0, false, {
                                fileName: "[project]/views/Particuliers.tsx",
                                lineNumber: 237,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/views/Particuliers.tsx",
                        lineNumber: 213,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-center mt-auto pt-16",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>document.getElementById('ce-que-vous-vivrez')?.scrollIntoView({
                                    behavior: 'smooth'
                                }),
                            style: {
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 8
                            },
                            "aria-label": "Voir la suite",
                            className: "scroll-arrow",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "26",
                                height: "26",
                                viewBox: "0 0 26 26",
                                fill: "none",
                                xmlns: "http://www.w3.org/2000/svg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M6 10L13 17L20 10",
                                    stroke: "#1a2e1a",
                                    strokeWidth: "1.5",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round"
                                }, void 0, false, {
                                    fileName: "[project]/views/Particuliers.tsx",
                                    lineNumber: 252,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/views/Particuliers.tsx",
                                lineNumber: 251,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/views/Particuliers.tsx",
                            lineNumber: 245,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/views/Particuliers.tsx",
                        lineNumber: 244,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/views/Particuliers.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "ce-que-vous-vivrez",
                style: {
                    paddingTop: 'calc(84px + clamp(3rem, 6vw, 5rem))',
                    paddingBottom: 'clamp(4rem, 8vw, 7rem)',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                },
                className: "bg-beige-bg w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 w-full",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-16",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 mb-10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: 20,
                                                height: 1,
                                                background: '#e67e22'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/views/Particuliers.tsx",
                                            lineNumber: 274,
                                            columnNumber: 9
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: 9,
                                                letterSpacing: '0.28em',
                                                fontWeight: 700,
                                                textTransform: 'uppercase',
                                                color: '#e67e22'
                                            },
                                            children: "Ce que vous vivrez"
                                        }, void 0, false, {
                                            fileName: "[project]/views/Particuliers.tsx",
                                            lineNumber: 275,
                                            columnNumber: 9
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/views/Particuliers.tsx",
                                    lineNumber: 273,
                                    columnNumber: 7
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
                                                children: "Chaque séjour"
                                            }, void 0, false, {
                                                fileName: "[project]/views/Particuliers.tsx",
                                                lineNumber: 281,
                                                columnNumber: 11
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-display italic text-5xl sm:text-6xl lg:text-6xl",
                                                children: " vous garantit"
                                            }, void 0, false, {
                                                fileName: "[project]/views/Particuliers.tsx",
                                                lineNumber: 282,
                                                columnNumber: 11
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/views/Particuliers.tsx",
                                        lineNumber: 280,
                                        columnNumber: 9
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/views/Particuliers.tsx",
                                    lineNumber: 279,
                                    columnNumber: 7
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/Particuliers.tsx",
                            lineNumber: 272,
                            columnNumber: 5
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/views/Particuliers.tsx",
                        lineNumber: 271,
                        columnNumber: 3
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full px-6 sm:px-8 lg:px-12",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-screen-2xl mx-auto",
                            children: [
                                {
                                    icon: 'nature_people',
                                    label: 'Rencontres authentiques',
                                    text: 'Partez à la rencontre de producteurs passionnés qui vous ouvrent les portes de leur monde avec sincérité.',
                                    image: 'https://images.unsplash.com/photo-1624668430727-dbb92d5244ee?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                    alt: 'Rencontre authentique chez un producteur terroir – Terrago'
                                },
                                {
                                    icon: 'eco',
                                    label: 'Les mains dans la terre',
                                    text: 'Récolter, fabriquer, goûter… Des activités vraies, au rythme des saisons et des savoir-faire locaux.',
                                    image: 'https://images.unsplash.com/photo-1635804368737-4f1db7422422?q=80&w=2531&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                    alt: 'Activité mains dans la terre séjour terroir – Terrago'
                                },
                                {
                                    icon: 'restaurant',
                                    label: 'Repas du terroir',
                                    text: 'Des repas pensés autour des producteurs locaux. Chaque assiette raconte une histoire.',
                                    image: 'https://images.unsplash.com/photo-1646781652500-40015cee4917?q=80&w=2673&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                    alt: 'Repas gastronomique terroir local – Terrago'
                                },
                                {
                                    icon: 'key',
                                    label: 'Clé en main',
                                    text: 'Logement, activités, repas, transport… Une logistique invisible pour une expérience inoubliable.',
                                    image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=2673&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                    alt: 'Séjour clé en main entre amis France – Terrago'
                                }
                            ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "group relative flex flex-col justify-end overflow-hidden rounded-[20px] cursor-pointer transition-all duration-300 min-h-[280px] sm:min-h-[320px]",
                                    style: {
                                        border: '1px solid rgba(26,46,26,0.07)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: item.image,
                                            alt: item.alt ?? item.label,
                                            className: "absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        }, void 0, false, {
                                            fileName: "[project]/views/Particuliers.tsx",
                                            lineNumber: 303,
                                            columnNumber: 11
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10",
                                            style: {
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.4) 40%, transparent)'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/views/Particuliers.tsx",
                                            lineNumber: 309,
                                            columnNumber: 11
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 pointer-events-none z-0",
                                            style: {
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/views/Particuliers.tsx",
                                            lineNumber: 313,
                                            columnNumber: 11
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative z-10 flex flex-col items-center text-center p-6 pb-8 opacity-100 transition-opacity duration-300 group-hover:opacity-0 group-hover:z-0 pointer-events-none",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-12 h-12 rounded-full flex items-center justify-center mb-4 flex-shrink-0 shadow-lg",
                                                    style: {
                                                        background: 'rgba(255,255,255,0.95)',
                                                        color: '#1a2e1a'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "material-symbols-outlined text-2xl",
                                                        children: item.icon
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/Particuliers.tsx",
                                                        lineNumber: 323,
                                                        columnNumber: 15
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Particuliers.tsx",
                                                    lineNumber: 319,
                                                    columnNumber: 13
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-sans font-bold text-white drop-shadow-md",
                                                    style: {
                                                        fontSize: 16
                                                    },
                                                    children: item.label
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Particuliers.tsx",
                                                    lineNumber: 325,
                                                    columnNumber: 13
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/views/Particuliers.tsx",
                                            lineNumber: 318,
                                            columnNumber: 11
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 flex flex-col items-center justify-center text-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20",
                                            style: {
                                                background: 'rgba(0,0,0,0.65)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-12 h-12 rounded-full flex items-center justify-center mb-4 flex-shrink-0",
                                                    style: {
                                                        background: 'rgba(255,255,255,0.2)',
                                                        color: '#fff'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "material-symbols-outlined text-2xl",
                                                        children: item.icon
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/Particuliers.tsx",
                                                        lineNumber: 338,
                                                        columnNumber: 15
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Particuliers.tsx",
                                                    lineNumber: 334,
                                                    columnNumber: 13
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-sans font-bold text-white mb-3",
                                                    style: {
                                                        fontSize: 16
                                                    },
                                                    children: item.label
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Particuliers.tsx",
                                                    lineNumber: 340,
                                                    columnNumber: 13
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-white text-sm leading-relaxed max-w-[260px]",
                                                    style: {
                                                        lineHeight: 1.7
                                                    },
                                                    children: item.text
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Particuliers.tsx",
                                                    lineNumber: 343,
                                                    columnNumber: 13
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/views/Particuliers.tsx",
                                            lineNumber: 330,
                                            columnNumber: 11
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, item.icon, true, {
                                    fileName: "[project]/views/Particuliers.tsx",
                                    lineNumber: 297,
                                    columnNumber: 9
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/views/Particuliers.tsx",
                            lineNumber: 290,
                            columnNumber: 5
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/views/Particuliers.tsx",
                        lineNumber: 289,
                        columnNumber: 3
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-center mt-auto pt-16",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>document.getElementById('projet')?.scrollIntoView({
                                    behavior: 'smooth'
                                }),
                            style: {
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 8
                            },
                            "aria-label": "Voir le formulaire",
                            className: "scroll-arrow",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "26",
                                height: "26",
                                viewBox: "0 0 26 26",
                                fill: "none",
                                xmlns: "http://www.w3.org/2000/svg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M6 10L13 17L20 10",
                                    stroke: "#1a2e1a",
                                    strokeWidth: "1.5",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round"
                                }, void 0, false, {
                                    fileName: "[project]/views/Particuliers.tsx",
                                    lineNumber: 361,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/views/Particuliers.tsx",
                                lineNumber: 360,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/views/Particuliers.tsx",
                            lineNumber: 354,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/views/Particuliers.tsx",
                        lineNumber: 353,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/views/Particuliers.tsx",
                lineNumber: 259,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "projet",
                style: {
                    paddingTop: 'clamp(4rem, 8vw, 7rem)',
                    paddingBottom: 'clamp(4rem, 8vw, 7rem)'
                },
                className: "bg-white scroll-mt-24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto px-6 sm:px-8 lg:px-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-14 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-center gap-3 mb-10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: 20,
                                                height: 1,
                                                background: '#e67e22'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/views/Particuliers.tsx",
                                            lineNumber: 378,
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
                                            children: "Votre projet"
                                        }, void 0, false, {
                                            fileName: "[project]/views/Particuliers.tsx",
                                            lineNumber: 379,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: 20,
                                                height: 1,
                                                background: '#e67e22'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/views/Particuliers.tsx",
                                            lineNumber: 382,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/views/Particuliers.tsx",
                                    lineNumber: 377,
                                    columnNumber: 13
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
                                                className: "font-sans text-4xl sm:text-4xl",
                                                children: "Parlons de"
                                            }, void 0, false, {
                                                fileName: "[project]/views/Particuliers.tsx",
                                                lineNumber: 386,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-display italic text-5xl sm:text-5xl lg:text-5xl",
                                                children: " votre séjour."
                                            }, void 0, false, {
                                                fileName: "[project]/views/Particuliers.tsx",
                                                lineNumber: 387,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/views/Particuliers.tsx",
                                        lineNumber: 385,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/views/Particuliers.tsx",
                                    lineNumber: 384,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-6",
                                    style: {
                                        color: '#9a9080',
                                        fontSize: 14,
                                        lineHeight: 1.75
                                    },
                                    children: "Un message suffit — nous construisons le reste avec vous."
                                }, void 0, false, {
                                    fileName: "[project]/views/Particuliers.tsx",
                                    lineNumber: 390,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/Particuliers.tsx",
                            lineNumber: 376,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ScrollAnimate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            delay: 200,
                            children: submitSuccess ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-w-xl mx-auto text-center",
                                style: {
                                    background: '#faf8f5',
                                    border: '1px solid rgba(26,46,26,0.07)',
                                    borderRadius: 24,
                                    padding: '48px 32px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 64,
                                            height: 64,
                                            borderRadius: '50%',
                                            background: '#1a2e1a',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: '0 auto 20px',
                                            boxShadow: '0 8px 30px rgba(26,46,26,0.25)'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "28",
                                            height: "28",
                                            viewBox: "0 0 34 34",
                                            fill: "none",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M8 17.5L14 23.5L26 11",
                                                stroke: "#fff",
                                                strokeWidth: "2.5",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round"
                                            }, void 0, false, {
                                                fileName: "[project]/views/Particuliers.tsx",
                                                lineNumber: 403,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/views/Particuliers.tsx",
                                            lineNumber: 402,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/views/Particuliers.tsx",
                                        lineNumber: 401,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "font-display italic font-bold text-primary mb-2",
                                        style: {
                                            fontSize: 26
                                        },
                                        children: "Demande envoyée !"
                                    }, void 0, false, {
                                        fileName: "[project]/views/Particuliers.tsx",
                                        lineNumber: 406,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            color: '#9a9080',
                                            fontSize: 13
                                        },
                                        children: "Nous vous recontacterons très prochainement."
                                    }, void 0, false, {
                                        fileName: "[project]/views/Particuliers.tsx",
                                        lineNumber: 407,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/views/Particuliers.tsx",
                                lineNumber: 397,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleSubmit,
                                className: "max-w-xl mx-auto",
                                style: {
                                    background: '#ffffff',
                                    border: '1px solid rgba(26,46,26,0.06)',
                                    borderRadius: 24,
                                    padding: 'clamp(24px, 4vw, 40px)'
                                },
                                children: [
                                    submitError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            background: 'rgba(230,126,34,0.07)',
                                            border: '1px solid rgba(230,126,34,0.2)',
                                            borderRadius: 12,
                                            padding: '10px 16px',
                                            marginBottom: 20,
                                            display: 'flex',
                                            gap: 10,
                                            alignItems: 'center'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 15
                                                },
                                                children: "⚠️"
                                            }, void 0, false, {
                                                fileName: "[project]/views/Particuliers.tsx",
                                                lineNumber: 417,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 11,
                                                    color: '#c0620a',
                                                    fontWeight: 600,
                                                    margin: 0
                                                },
                                                children: submitError
                                            }, void 0, false, {
                                                fileName: "[project]/views/Particuliers.tsx",
                                                lineNumber: 418,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/views/Particuliers.tsx",
                                        lineNumber: 416,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "part-grid-2",
                                        style: {
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr',
                                            gap: 14,
                                            marginBottom: 14
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldBlock, {
                                                label: "Nom",
                                                required: true,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: "part-i",
                                                    placeholder: "Dupont",
                                                    value: nom,
                                                    onChange: (e)=>setNom(e.target.value),
                                                    required: true
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Particuliers.tsx",
                                                    lineNumber: 425,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/views/Particuliers.tsx",
                                                lineNumber: 424,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldBlock, {
                                                label: "Prénom",
                                                required: true,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: "part-i",
                                                    placeholder: "Jean",
                                                    value: prenom,
                                                    onChange: (e)=>setPrenom(e.target.value),
                                                    required: true
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Particuliers.tsx",
                                                    lineNumber: 428,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/views/Particuliers.tsx",
                                                lineNumber: 427,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/views/Particuliers.tsx",
                                        lineNumber: 423,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "part-grid-2",
                                        style: {
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr',
                                            gap: 14,
                                            marginBottom: 14
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldBlock, {
                                                label: "Email",
                                                required: true,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: "part-i",
                                                    type: "email",
                                                    placeholder: "votre@email.fr",
                                                    value: email,
                                                    onChange: (e)=>setEmail(e.target.value),
                                                    required: true
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Particuliers.tsx",
                                                    lineNumber: 435,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/views/Particuliers.tsx",
                                                lineNumber: 434,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldBlock, {
                                                label: "Téléphone",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: "part-i",
                                                    type: "tel",
                                                    placeholder: "06 12 34 56 78",
                                                    value: portable,
                                                    onChange: (e)=>setPortable(e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Particuliers.tsx",
                                                    lineNumber: 438,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/views/Particuliers.tsx",
                                                lineNumber: 437,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/views/Particuliers.tsx",
                                        lineNumber: 433,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: 14
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldBlock, {
                                            label: "Période ou date souhaitée",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "part-i",
                                                placeholder: "Ex. semaine du 15 août, ou dates précises",
                                                value: periode,
                                                onChange: (e)=>setPeriode(e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/views/Particuliers.tsx",
                                                lineNumber: 445,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/views/Particuliers.tsx",
                                            lineNumber: 444,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/views/Particuliers.tsx",
                                        lineNumber: 443,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: 14
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
                                                    marginBottom: 10
                                                },
                                                children: "Nombre de personnes"
                                            }, void 0, false, {
                                                fileName: "[project]/views/Particuliers.tsx",
                                                lineNumber: 451,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    gap: 8
                                                },
                                                children: [
                                                    '5-8',
                                                    '9 – 15',
                                                    '15 – 25',
                                                    '25+'
                                                ].map((opt)=>{
                                                    const active = participants === opt;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>setParticipants(active ? '' : opt),
                                                        style: {
                                                            padding: '6px 14px',
                                                            borderRadius: 9999,
                                                            fontFamily: 'inherit',
                                                            border: `1.5px solid ${active ? '#1a2e1a' : 'rgba(10,44,52,0.1)'}`,
                                                            background: active ? '#1a2e1a' : '#faf8f5',
                                                            color: active ? '#fff' : '#6b7280',
                                                            fontSize: 10,
                                                            fontWeight: 700,
                                                            letterSpacing: '0.06em',
                                                            textTransform: 'uppercase',
                                                            cursor: 'pointer',
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: 5,
                                                            boxShadow: active ? '0 2px 10px rgba(26,46,26,0.15)' : 'none',
                                                            transition: 'all .15s ease'
                                                        },
                                                        children: [
                                                            active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: 8
                                                                },
                                                                children: "✓"
                                                            }, void 0, false, {
                                                                fileName: "[project]/views/Particuliers.tsx",
                                                                lineNumber: 473,
                                                                columnNumber: 38
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            opt
                                                        ]
                                                    }, opt, true, {
                                                        fileName: "[project]/views/Particuliers.tsx",
                                                        lineNumber: 458,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0));
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/views/Particuliers.tsx",
                                                lineNumber: 454,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/views/Particuliers.tsx",
                                        lineNumber: 450,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: 14
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
                                                    marginBottom: 10
                                                },
                                                children: "Produits / univers intéressants"
                                            }, void 0, false, {
                                                fileName: "[project]/views/Particuliers.tsx",
                                                lineNumber: 483,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    gap: 8
                                                },
                                                children: UNIVERS_OPTIONS.map((opt)=>{
                                                    const active = univers.includes(opt.label);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>toggleUnivers(opt.label),
                                                        style: {
                                                            padding: '6px 14px',
                                                            borderRadius: 9999,
                                                            fontFamily: 'inherit',
                                                            border: `1.5px solid ${active ? '#1a2e1a' : 'rgba(10,44,52,0.1)'}`,
                                                            background: active ? '#1a2e1a' : '#fff',
                                                            color: active ? '#fff' : '#6b7280',
                                                            fontSize: 10,
                                                            fontWeight: 700,
                                                            letterSpacing: '0.06em',
                                                            textTransform: 'uppercase',
                                                            cursor: 'pointer',
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: 5,
                                                            boxShadow: active ? '0 2px 10px rgba(26,46,26,0.15)' : 'none',
                                                            transition: 'all .15s ease'
                                                        },
                                                        children: [
                                                            active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: 8
                                                                },
                                                                children: "✓"
                                                            }, void 0, false, {
                                                                fileName: "[project]/views/Particuliers.tsx",
                                                                lineNumber: 505,
                                                                columnNumber: 38
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: opt.emoji
                                                            }, void 0, false, {
                                                                fileName: "[project]/views/Particuliers.tsx",
                                                                lineNumber: 506,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            " ",
                                                            opt.label
                                                        ]
                                                    }, opt.label, true, {
                                                        fileName: "[project]/views/Particuliers.tsx",
                                                        lineNumber: 490,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0));
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/views/Particuliers.tsx",
                                                lineNumber: 486,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/views/Particuliers.tsx",
                                        lineNumber: 482,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: 24
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldBlock, {
                                            label: "Précisions",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                className: "part-i",
                                                rows: 4,
                                                style: {
                                                    resize: 'none',
                                                    lineHeight: 1.6
                                                },
                                                placeholder: "Nombre de personnes, envies particulières, région préférée…",
                                                value: precisions,
                                                onChange: (e)=>setPrecisions(e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/views/Particuliers.tsx",
                                                lineNumber: 516,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/views/Particuliers.tsx",
                                            lineNumber: 515,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/views/Particuliers.tsx",
                                        lineNumber: 514,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        disabled: isSubmitting,
                                        style: {
                                            width: '100%',
                                            padding: '14px 28px',
                                            borderRadius: 9999,
                                            background: '#1a2e1a',
                                            color: '#fff',
                                            border: 'none',
                                            fontFamily: 'inherit',
                                            fontSize: 10,
                                            fontWeight: 700,
                                            letterSpacing: '0.15em',
                                            textTransform: 'uppercase',
                                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                            opacity: isSubmitting ? 0.7 : 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 8,
                                            transition: 'background .2s ease'
                                        },
                                        onMouseOver: (e)=>{
                                            if (!isSubmitting) e.currentTarget.style.background = '#2b3e24';
                                        },
                                        onMouseOut: (e)=>{
                                            e.currentTarget.style.background = '#1a2e1a';
                                        },
                                        children: isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        width: 14,
                                                        height: 14,
                                                        border: '2px solid rgba(255,255,255,.3)',
                                                        borderTopColor: '#fff',
                                                        borderRadius: '50%',
                                                        animation: 'partSpin .7s linear infinite',
                                                        display: 'inline-block'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Particuliers.tsx",
                                                    lineNumber: 546,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Envoi…"
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                "Envoyer ma demande",
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
                                                            fileName: "[project]/views/Particuliers.tsx",
                                                            lineNumber: 553,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                                            points: "22 2 15 22 11 13 2 9 22 2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/Particuliers.tsx",
                                                            lineNumber: 553,
                                                            columnNumber: 64
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/views/Particuliers.tsx",
                                                    lineNumber: 552,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/views/Particuliers.tsx",
                                        lineNumber: 528,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/views/Particuliers.tsx",
                                lineNumber: 410,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/views/Particuliers.tsx",
                            lineNumber: 395,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/views/Particuliers.tsx",
                    lineNumber: 374,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/views/Particuliers.tsx",
                lineNumber: 368,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    paddingTop: 'clamp(3rem, 6vw, 5rem)',
                    paddingBottom: 'clamp(3rem, 6vw, 5rem)'
                },
                className: "bg-beige-bg",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-2xl mx-auto px-6 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                color: '#b0a89e',
                                fontSize: 13,
                                marginBottom: 20
                            },
                            children: "En attendant, découvrez notre offre pour les entreprises et les groupes."
                        }, void 0, false, {
                            fileName: "[project]/views/Particuliers.tsx",
                            lineNumber: 567,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/seminaires-entreprise",
                            style: {
                                fontSize: 10,
                                fontWeight: 700,
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: '#1a2e1a',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 8,
                                transition: 'color .2s'
                            },
                            onMouseEnter: (e)=>e.currentTarget.style.color = '#e67e22',
                            onMouseLeave: (e)=>e.currentTarget.style.color = '#1a2e1a',
                            children: [
                                "Découvrir nos séminaires",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "material-symbols-outlined",
                                    style: {
                                        fontSize: 16
                                    },
                                    children: "arrow_forward"
                                }, void 0, false, {
                                    fileName: "[project]/views/Particuliers.tsx",
                                    lineNumber: 577,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/Particuliers.tsx",
                            lineNumber: 570,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/views/Particuliers.tsx",
                    lineNumber: 566,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/views/Particuliers.tsx",
                lineNumber: 565,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/views/Particuliers.tsx",
        lineNumber: 91,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Particuliers, "G8c11MvxlczpmgK59Z+t1TO2kmw=");
_c = Particuliers;
// ─── Sub-component ─────────────────────────────────────────────────────────────
const FieldBlock = ({ label, required, children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        fileName: "[project]/views/Particuliers.tsx",
                        lineNumber: 590,
                        columnNumber: 27
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/views/Particuliers.tsx",
                lineNumber: 589,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/views/Particuliers.tsx",
        lineNumber: 588,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c1 = FieldBlock;
const __TURBOPACK__default__export__ = Particuliers;
var _c, _c1;
__turbopack_context__.k.register(_c, "Particuliers");
__turbopack_context__.k.register(_c1, "FieldBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_6e966cf2._.js.map