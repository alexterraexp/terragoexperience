(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/views/Host.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const HOST_FORM_EMAIL = 'alexso.terrago@gmail.com';
const SECTEURS = [
    'Viticulture',
    'Oléiculture',
    'Horticulture',
    'Maraîchage',
    'Apiculture',
    'Élevage',
    'Ostréiculture',
    'Trufficulture',
    'Fromagerie / Crèmerie',
    'Charcuterie artisanale',
    'Distillation',
    'Autre'
];
// ─── Custom Select ─────────────────────────────────────────────────────────────
const CustomSelect = ({ value, onChange, placeholder = 'Sélectionnez', options })=>{
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CustomSelect.useEffect": ()=>{
            const handler = {
                "CustomSelect.useEffect.handler": (e)=>{
                    if (ref.current && !ref.current.contains(e.target)) setOpen(false);
                }
            }["CustomSelect.useEffect.handler"];
            document.addEventListener('mousedown', handler);
            return ({
                "CustomSelect.useEffect": ()=>document.removeEventListener('mousedown', handler)
            })["CustomSelect.useEffect"];
        }
    }["CustomSelect.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        style: {
            position: 'relative',
            userSelect: 'none'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: ()=>setOpen((o)=>!o),
                style: {
                    width: '100%',
                    background: open ? '#fff' : '#faf8f5',
                    border: `1px solid ${open ? '#1a2e1a' : 'rgba(10,44,52,.08)'}`,
                    borderRadius: open ? '12px 12px 0 0' : 12,
                    padding: '12px 40px 12px 16px',
                    fontFamily: 'inherit',
                    fontSize: 13,
                    color: value ? '#1a2e1a' : '#c4bdb4',
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                    boxShadow: open ? '0 0 0 3px rgba(26,46,26,.06)' : 'none',
                    transition: 'all .18s ease'
                },
                children: value || placeholder
            }, void 0, false, {
                fileName: "[project]/views/Host.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "material-symbols-outlined",
                style: {
                    position: 'absolute',
                    right: 14,
                    top: 14,
                    fontSize: 16,
                    color: '#c4bdb4',
                    pointerEvents: 'none',
                    transition: 'transform .2s ease',
                    transform: open ? 'rotate(180deg)' : 'rotate(0deg)'
                },
                children: "expand_more"
            }, void 0, false, {
                fileName: "[project]/views/Host.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    zIndex: 50,
                    background: '#fff',
                    border: '1px solid rgba(26,46,26,0.12)',
                    borderTop: '1px solid rgba(26,46,26,0.05)',
                    borderRadius: '0 0 12px 12px',
                    boxShadow: '0 8px 24px rgba(26,46,26,0.1)',
                    maxHeight: 220,
                    overflowY: 'auto'
                },
                children: options.map((opt, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: ()=>{
                            onChange(opt);
                            setOpen(false);
                        },
                        style: {
                            padding: '10px 16px',
                            fontSize: 13,
                            fontFamily: 'inherit',
                            color: value === opt ? '#1a2e1a' : '#7a7060',
                            fontWeight: value === opt ? 700 : 400,
                            background: value === opt ? 'rgba(26,46,26,0.04)' : 'transparent',
                            cursor: 'pointer',
                            borderBottom: i < options.length - 1 ? '1px solid rgba(26,46,26,0.04)' : 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'background .12s ease'
                        },
                        onMouseEnter: (e)=>{
                            if (value !== opt) e.currentTarget.style.background = 'rgba(26,46,26,0.03)';
                        },
                        onMouseLeave: (e)=>{
                            if (value !== opt) e.currentTarget.style.background = value === opt ? 'rgba(26,46,26,0.04)' : 'transparent';
                        },
                        children: [
                            opt,
                            value === opt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "12",
                                height: "12",
                                viewBox: "0 0 16 16",
                                fill: "none",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M3 8.5L6.5 12L13 5",
                                    stroke: "#e67e22",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round"
                                }, void 0, false, {
                                    fileName: "[project]/views/Host.tsx",
                                    lineNumber: 82,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/views/Host.tsx",
                                lineNumber: 81,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, opt, true, {
                        fileName: "[project]/views/Host.tsx",
                        lineNumber: 62,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/views/Host.tsx",
                lineNumber: 53,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/views/Host.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CustomSelect, "wl9VvfhnMVWQ+kCekFjcRPEi3/0=");
_c = CustomSelect;
// ─── Sub-components ────────────────────────────────────────────────────────────
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
                        fileName: "[project]/views/Host.tsx",
                        lineNumber: 98,
                        columnNumber: 27
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/views/Host.tsx",
                lineNumber: 97,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/views/Host.tsx",
        lineNumber: 96,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c1 = FieldBlock;
const TabButton = ({ label, isActive, onClick })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        style: {
            paddingBottom: 14,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: isActive ? '#e67e22' : '#c4bdb4',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
            transition: 'color .2s',
            fontFamily: 'inherit'
        },
        onMouseEnter: (e)=>{
            if (!isActive) e.currentTarget.style.color = '#9a9080';
        },
        onMouseLeave: (e)=>{
            if (!isActive) e.currentTarget.style.color = '#c4bdb4';
        },
        children: [
            label,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: 2,
                    background: '#e67e22',
                    width: isActive ? '100%' : '0%',
                    transition: 'width .3s ease'
                }
            }, void 0, false, {
                fileName: "[project]/views/Host.tsx",
                lineNumber: 117,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/views/Host.tsx",
        lineNumber: 105,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c2 = TabButton;
const BenefitItem = ({ icon, title, points })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'flex',
            flexDirection: 'column',
            gap: 12
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            background: 'rgba(26,46,26,0.06)',
                            color: '#1a2e1a',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "material-symbols-outlined",
                            style: {
                                fontSize: 16
                            },
                            children: icon
                        }, void 0, false, {
                            fileName: "[project]/views/Host.tsx",
                            lineNumber: 125,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/views/Host.tsx",
                        lineNumber: 124,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-sans",
                        style: {
                            fontSize: 13,
                            fontWeight: 700,
                            color: '#1a2e1a',
                            margin: 0,
                            letterSpacing: '-0.01em'
                        },
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/views/Host.tsx",
                        lineNumber: 127,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/views/Host.tsx",
                lineNumber: 123,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    paddingLeft: 0,
                    margin: 0,
                    listStyle: 'none'
                },
                children: points.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        style: {
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 10,
                            fontSize: 12,
                            color: '#9a9080',
                            lineHeight: 1.7
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    width: 4,
                                    height: 4,
                                    borderRadius: '50%',
                                    background: 'rgba(230,126,34,0.4)',
                                    flexShrink: 0,
                                    marginTop: 7
                                }
                            }, void 0, false, {
                                fileName: "[project]/views/Host.tsx",
                                lineNumber: 137,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            p
                        ]
                    }, i, true, {
                        fileName: "[project]/views/Host.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/views/Host.tsx",
                lineNumber: 134,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/views/Host.tsx",
        lineNumber: 122,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c3 = BenefitItem;
// ─── Decorative Center Medallion ───────────────────────────────────────────────
const CenterMedallion = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'absolute',
            left: '60%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            pointerEvents: 'none'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: 88,
                height: 88,
                borderRadius: '50%',
                border: '1px solid rgba(230,126,34,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'medallionPulse 3s ease-in-out infinite'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: 68,
                    height: 68,
                    borderRadius: '50%',
                    border: '1px solid rgba(230,126,34,0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: '#fff',
                        border: '1px solid rgba(230,126,34,0.15)',
                        boxShadow: '0 4px 24px rgba(26,46,26,0.12), 0 0 0 1px rgba(255,255,255,0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        width: "20",
                        height: "20",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M12 3C12 3 5 7 5 13C5 16.866 8.134 20 12 20C15.866 20 19 16.866 19 13C19 7 12 3 12 3Z",
                                fill: "rgba(26,46,26,0.08)",
                                stroke: "#1a2e1a",
                                strokeWidth: "1.2",
                                strokeLinejoin: "round"
                            }, void 0, false, {
                                fileName: "[project]/views/Host.tsx",
                                lineNumber: 179,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M12 20V10",
                                stroke: "#e67e22",
                                strokeWidth: "1.2",
                                strokeLinecap: "round"
                            }, void 0, false, {
                                fileName: "[project]/views/Host.tsx",
                                lineNumber: 180,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M12 14C12 14 9 12 9 9.5",
                                stroke: "#1a2e1a",
                                strokeWidth: "1",
                                strokeLinecap: "round",
                                opacity: "0.4"
                            }, void 0, false, {
                                fileName: "[project]/views/Host.tsx",
                                lineNumber: 181,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/views/Host.tsx",
                        lineNumber: 177,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/views/Host.tsx",
                    lineNumber: 170,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/views/Host.tsx",
                lineNumber: 164,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/views/Host.tsx",
            lineNumber: 157,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/views/Host.tsx",
        lineNumber: 148,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c4 = CenterMedallion;
// ─── Main Component ────────────────────────────────────────────────────────────
const Host = ()=>{
    _s1();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('benefices');
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        responsable: '',
        exploitation: '',
        secteur: '',
        email: '',
        telephone: ''
    });
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submitSuccess, setSubmitSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submitError, setSubmitError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setSubmitError('');
        const exploitation = formData.exploitation.trim();
        const email = formData.email.trim();
        const telephone = formData.telephone.trim();
        if (!exploitation) {
            setSubmitError("Le nom de l'exploitation est obligatoire.");
            return;
        }
        if (!email) {
            setSubmitError("L'email professionnel est obligatoire.");
            return;
        }
        if (!telephone) {
            setSubmitError("Le numéro de téléphone est obligatoire.");
            return;
        }
        setIsSubmitting(true);
        const body = [
            '=== CANDIDATURE NOUS REJOINDRE ===',
            '',
            `Responsable: ${formData.responsable || '—'}`,
            `Exploitation: ${exploitation}`,
            `Secteur: ${formData.secteur || '—'}`,
            `Email: ${email}`,
            `Téléphone: ${telephone}`,
            '',
            '---',
            'Envoyé depuis la page Nous rejoindre - Terrago'
        ].join('\n');
        try {
            const res = await fetch(`https://formsubmit.co/ajax/${HOST_FORM_EMAIL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    name: formData.responsable || 'Candidature',
                    email: formData.email || HOST_FORM_EMAIL,
                    subject: `Candidature Nous rejoindre - ${formData.exploitation || 'Sans nom'}`,
                    message: body,
                    _captcha: false,
                    _template: 'table'
                })
            });
            if (!res.ok) throw new Error();
            setSubmitSuccess(true);
            setFormData({
                responsable: '',
                exploitation: '',
                secteur: '',
                email: '',
                telephone: ''
            });
        } catch  {
            setSubmitError('Une erreur est survenue. Veuillez réessayer ou nous contacter par email.');
        } finally{
            setIsSubmitting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "font-sans min-h-screen",
        style: {
            background: '#faf8f5'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        .host-i {
          width: 100%; background: #faf8f5;
          border: 1px solid rgba(10,44,52,.08); border-radius: 12px;
          padding: 12px 16px; font-family: inherit; font-size: 13px; color: #1a2e1a;
          outline: none; transition: all .18s ease; box-sizing: border-box;
          appearance: none; -webkit-appearance: none;
        }
        .host-i:focus { border-color: #1a2e1a; background: #fff; box-shadow: 0 0 0 3px rgba(26,46,26,.06); }
        .host-i::placeholder { color: #c4bdb4; }
        .host-i option { color: #1a2e1a; background: #fff; }
        .host-i option[value=""] { color: #c4bdb4; }
        select.host-i:invalid,
        select.host-i.placeholder { color: #c4bdb4; }
        select.host-i { color: #1a2e1a; }
        select.host-i.is-placeholder { color: #c4bdb4; }
        @keyframes hostSpin { to { transform: rotate(360deg); } }
        @keyframes medallionPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.06); opacity: 0.8; }
        }
        .host-split {
          display: grid;
          grid-template-columns: 60fr 40fr;
          min-height: 100vh;
          position: relative;
        }
        /* Même marge gauche que la page Offres packagées séminaires (conteneur centré 1080px) */
        .host-left {
          padding-left: calc(max(0px, (100vw - 1080px) / 2) + clamp(1.5rem, 4vw, 3rem)) !important;
        }
        .host-right {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .host-right::-webkit-scrollbar {
          display: none;
        }
        /* Divider line between panels */
        .host-split::after {
          content: '';
          position: absolute;
          left: 60%;
          top: 0; bottom: 0;
          width: 1px;
          background: rgba(26,46,26,0.06);
          pointer-events: none;
        }
        @media (max-width: 960px) {
          .host-split { grid-template-columns: 1fr; }
          .host-split::after { display: none; }
          .host-right { border-top: 1px solid rgba(26,46,26,0.06); }
          .host-left, .host-right { padding-left: clamp(1.5rem, 4vw, 3rem) !important; padding-right: clamp(1.5rem, 4vw, 3rem) !important; }
          .host-medallion { display: none !important; }
        }
      `
            }, void 0, false, {
                fileName: "[project]/views/Host.tsx",
                lineNumber: 229,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "host-split",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "host-left",
                        style: {
                            background: '#faf8f5',
                            padding: 'calc(84px + 4rem) clamp(2.5rem, 5vw, 5rem) 5rem 0',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12,
                                    marginBottom: 24
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 20,
                                            height: 1,
                                            background: '#e67e22'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/views/Host.tsx",
                                        lineNumber: 298,
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
                                        children: "Programme Partenaires — Terrago"
                                    }, void 0, false, {
                                        fileName: "[project]/views/Host.tsx",
                                        lineNumber: 299,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/views/Host.tsx",
                                lineNumber: 297,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "font-bold text-primary leading-tight mb-6",
                                style: {
                                    letterSpacing: '-0.01em'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-sans not-italic text-4xl",
                                        style: {
                                            lineHeight: 1
                                        },
                                        children: "Partagez votre passion, "
                                    }, void 0, false, {
                                        fileName: "[project]/views/Host.tsx",
                                        lineNumber: 305,
                                        columnNumber: 3
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-display italic text-5xl",
                                        style: {
                                            lineHeight: 1.05
                                        },
                                        children: "et votre savoir-faire."
                                    }, void 0, false, {
                                        fileName: "[project]/views/Host.tsx",
                                        lineNumber: 306,
                                        columnNumber: 3
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/views/Host.tsx",
                                lineNumber: 304,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: '#9a9080',
                                    fontSize: 13,
                                    lineHeight: 1.75,
                                    marginBottom: 40,
                                    maxWidth: 520
                                },
                                children: "Rejoignez le réseau Terrago, dédié au tourisme du terroir français. Accueillez du public, transmettez votre passion et votre savoir-faire, en toute liberté."
                            }, void 0, false, {
                                fileName: "[project]/views/Host.tsx",
                                lineNumber: 309,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    borderBottom: '1px solid rgba(26,46,26,0.07)',
                                    display: 'flex',
                                    gap: 28,
                                    marginBottom: 36
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TabButton, {
                                        label: "Bénéfices",
                                        isActive: activeTab === 'benefices',
                                        onClick: ()=>setActiveTab('benefices')
                                    }, void 0, false, {
                                        fileName: "[project]/views/Host.tsx",
                                        lineNumber: 314,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TabButton, {
                                        label: "Processus",
                                        isActive: activeTab === 'processus',
                                        onClick: ()=>setActiveTab('processus')
                                    }, void 0, false, {
                                        fileName: "[project]/views/Host.tsx",
                                        lineNumber: 315,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/views/Host.tsx",
                                lineNumber: 313,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            activeTab === 'benefices' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '32px 40px',
                                    maxWidth: 600
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BenefitItem, {
                                        icon: "trending_up",
                                        title: "Diversification des revenus",
                                        points: [
                                            "Développez une nouvelle source de revenus liée aux expériences",
                                            "Ventes additionnelles (boutique physique & e-com)"
                                        ]
                                    }, void 0, false, {
                                        fileName: "[project]/views/Host.tsx",
                                        lineNumber: 320,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BenefitItem, {
                                        icon: "verified_user",
                                        title: "Gestion Risque & Assurance",
                                        points: [
                                            "Accompagnement pour l'accueil de public",
                                            "Gestion des litiges par nos conseillers dédiés"
                                        ]
                                    }, void 0, false, {
                                        fileName: "[project]/views/Host.tsx",
                                        lineNumber: 321,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BenefitItem, {
                                        icon: "auto_awesome",
                                        title: "Image de Marque",
                                        points: [
                                            "Reportage photo & vidéo professionnel sur demande",
                                            "Visibilité sur les réseaux sociaux",
                                            "Aide à la création de contenu"
                                        ]
                                    }, void 0, false, {
                                        fileName: "[project]/views/Host.tsx",
                                        lineNumber: 322,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BenefitItem, {
                                        icon: "hub",
                                        title: "Efficacité Opérationnelle",
                                        points: [
                                            "Gestion de votre calendrier",
                                            "Facturation et reporting automatisés",
                                            "Support technique 7j/7"
                                        ]
                                    }, void 0, false, {
                                        fileName: "[project]/views/Host.tsx",
                                        lineNumber: 323,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/views/Host.tsx",
                                lineNumber: 319,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            activeTab === 'processus' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    maxWidth: 560
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 12,
                                            fontStyle: 'italic',
                                            color: '#b0a89e',
                                            lineHeight: 1.75,
                                            marginBottom: 20,
                                            paddingBottom: 16,
                                            borderBottom: '1px solid rgba(26,46,26,0.06)'
                                        },
                                        children: "Notre processus garantit l'excellence du réseau. Nous vous accompagnons de l'audit initial à la gestion de votre première expérience."
                                    }, void 0, false, {
                                        fileName: "[project]/views/Host.tsx",
                                        lineNumber: 329,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    [
                                        "Vous nous contactez pour présenter votre activité et votre projet.",
                                        "Nous venons vous rencontrer sur votre domaine.",
                                        "Nous vous aidons à développer une offre d'accueil d'expériences.",
                                        "Nous amenons des clients sur votre domaine pour découvrir vos produits et savoir-faire.",
                                        "Vous faites pleinement partie du réseau et en devenez un ambassadeur."
                                    ].map((text, i, arr)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: 14,
                                                padding: '14px 0',
                                                borderBottom: i < arr.length - 1 ? '1px solid rgba(26,46,26,0.05)' : 'none'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        flexShrink: 0,
                                                        width: 26,
                                                        height: 26,
                                                        borderRadius: '50%',
                                                        background: 'linear-gradient(135deg, #e67e22, #f5a352)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: '#fff',
                                                        fontSize: 10,
                                                        fontWeight: 700,
                                                        boxShadow: '0 2px 8px rgba(230,126,34,0.25)'
                                                    },
                                                    children: i + 1
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Host.tsx",
                                                    lineNumber: 340,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontSize: 13,
                                                        color: '#7a7060',
                                                        lineHeight: 1.75,
                                                        margin: 0
                                                    },
                                                    children: text
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Host.tsx",
                                                    lineNumber: 343,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/views/Host.tsx",
                                            lineNumber: 339,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/views/Host.tsx",
                                lineNumber: 328,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/views/Host.tsx",
                        lineNumber: 289,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "host-medallion",
                        style: {
                            position: 'absolute',
                            left: '60%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 10,
                            pointerEvents: 'none'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: 88,
                                height: 88,
                                borderRadius: '50%',
                                border: '1px solid rgba(230,126,34,0.18)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                animation: 'medallionPulse 3s ease-in-out infinite'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 68,
                                    height: 68,
                                    borderRadius: '50%',
                                    border: '1px solid rgba(230,126,34,0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: 46,
                                        height: 46,
                                        borderRadius: '50%',
                                        background: '#fff',
                                        boxShadow: '0 4px 20px rgba(26,46,26,0.12)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '1px solid rgba(26,46,26,0.06)'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "18",
                                        height: "18",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M12 3C12 3 5 7 5 13C5 16.866 8.134 20 12 20C15.866 20 19 16.866 19 13C19 7 12 3 12 3Z",
                                                fill: "rgba(26,46,26,0.07)",
                                                stroke: "#1a2e1a",
                                                strokeWidth: "1.2",
                                                strokeLinejoin: "round"
                                            }, void 0, false, {
                                                fileName: "[project]/views/Host.tsx",
                                                lineNumber: 356,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M12 20V10",
                                                stroke: "#e67e22",
                                                strokeWidth: "1.3",
                                                strokeLinecap: "round"
                                            }, void 0, false, {
                                                fileName: "[project]/views/Host.tsx",
                                                lineNumber: 357,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M12 14C12 14 9.5 12.5 9 10",
                                                stroke: "#1a2e1a",
                                                strokeWidth: "1",
                                                strokeLinecap: "round",
                                                opacity: "0.35"
                                            }, void 0, false, {
                                                fileName: "[project]/views/Host.tsx",
                                                lineNumber: 358,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/views/Host.tsx",
                                        lineNumber: 355,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/views/Host.tsx",
                                    lineNumber: 354,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/views/Host.tsx",
                                lineNumber: 353,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/views/Host.tsx",
                            lineNumber: 352,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/views/Host.tsx",
                        lineNumber: 351,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "host-right",
                        style: {
                            background: '#fff',
                            padding: 'calc(84px + 10rem) clamp(2rem, 4vw, 4rem) 5rem clamp(2.5rem, 4vw, 4rem)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            position: 'sticky',
                            top: 0,
                            height: '100vh',
                            overflowY: 'auto'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: 28
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 10,
                                            marginBottom: 14
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    width: 16,
                                                    height: 1,
                                                    background: '#e67e22'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/views/Host.tsx",
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
                                                children: "Nous rejoindre"
                                            }, void 0, false, {
                                                fileName: "[project]/views/Host.tsx",
                                                lineNumber: 379,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/views/Host.tsx",
                                        lineNumber: 377,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "font-bold text-primary",
                                        style: {
                                            letterSpacing: '-0.01em',
                                            marginBottom: 0
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-sans not-italic",
                                                style: {
                                                    fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
                                                    color: '#9a9080',
                                                    fontWeight: 400
                                                },
                                                children: [
                                                    "Contactez-nous pour",
                                                    ' '
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/views/Host.tsx",
                                                lineNumber: 384,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-display italic",
                                                style: {
                                                    fontSize: 'clamp(1.6rem, 2.4vw, 2rem)'
                                                },
                                                children: "rejoindre l'aventure"
                                            }, void 0, false, {
                                                fileName: "[project]/views/Host.tsx",
                                                lineNumber: 387,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/views/Host.tsx",
                                        lineNumber: 383,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/views/Host.tsx",
                                lineNumber: 376,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            submitSuccess ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 56,
                                            height: 56,
                                            borderRadius: '50%',
                                            background: '#1a2e1a',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: 20,
                                            boxShadow: '0 8px 30px rgba(26,46,26,0.2)'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "24",
                                            height: "24",
                                            viewBox: "0 0 34 34",
                                            fill: "none",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M8 17.5L14 23.5L26 11",
                                                stroke: "#fff",
                                                strokeWidth: "2.5",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round"
                                            }, void 0, false, {
                                                fileName: "[project]/views/Host.tsx",
                                                lineNumber: 397,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/views/Host.tsx",
                                            lineNumber: 396,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/views/Host.tsx",
                                        lineNumber: 395,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-display italic font-bold text-primary",
                                        style: {
                                            fontSize: 20,
                                            marginBottom: 8
                                        },
                                        children: "Demande envoyée !"
                                    }, void 0, false, {
                                        fileName: "[project]/views/Host.tsx",
                                        lineNumber: 400,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            color: '#9a9080',
                                            fontSize: 13,
                                            marginBottom: 24,
                                            lineHeight: 1.7
                                        },
                                        children: "Nous vous recontacterons sous 72h."
                                    }, void 0, false, {
                                        fileName: "[project]/views/Host.tsx",
                                        lineNumber: 401,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setSubmitSuccess(false),
                                        style: {
                                            fontSize: 10,
                                            fontWeight: 700,
                                            letterSpacing: '0.2em',
                                            textTransform: 'uppercase',
                                            color: '#1a2e1a',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: 6,
                                            padding: 0,
                                            transition: 'color .2s'
                                        },
                                        onMouseEnter: (e)=>e.currentTarget.style.color = '#e67e22',
                                        onMouseLeave: (e)=>e.currentTarget.style.color = '#1a2e1a',
                                        children: [
                                            "Envoyer une autre candidature",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-symbols-outlined",
                                                style: {
                                                    fontSize: 16
                                                },
                                                children: "arrow_forward"
                                            }, void 0, false, {
                                                fileName: "[project]/views/Host.tsx",
                                                lineNumber: 410,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/views/Host.tsx",
                                        lineNumber: 402,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/views/Host.tsx",
                                lineNumber: 394,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleSubmit,
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 13
                                },
                                children: [
                                    submitError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            background: 'rgba(230,126,34,0.07)',
                                            border: '1px solid rgba(230,126,34,0.2)',
                                            borderRadius: 12,
                                            padding: '10px 16px',
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
                                                fileName: "[project]/views/Host.tsx",
                                                lineNumber: 417,
                                                columnNumber: 19
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
                                                fileName: "[project]/views/Host.tsx",
                                                lineNumber: 418,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/views/Host.tsx",
                                        lineNumber: 416,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldBlock, {
                                        label: "Nom du responsable",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            className: "host-i",
                                            placeholder: "ex: Marc Dumont",
                                            value: formData.responsable,
                                            onChange: (e)=>setFormData((d)=>({
                                                        ...d,
                                                        responsable: e.target.value
                                                    }))
                                        }, void 0, false, {
                                            fileName: "[project]/views/Host.tsx",
                                            lineNumber: 423,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/views/Host.tsx",
                                        lineNumber: 422,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldBlock, {
                                        label: "Nom de l'exploitation",
                                        required: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            className: "host-i",
                                            placeholder: "ex: Château de la Roche",
                                            value: formData.exploitation,
                                            onChange: (e)=>setFormData((d)=>({
                                                        ...d,
                                                        exploitation: e.target.value
                                                    })),
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/views/Host.tsx",
                                            lineNumber: 427,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/views/Host.tsx",
                                        lineNumber: 426,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldBlock, {
                                        label: "Secteur d'activité",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomSelect, {
                                            value: formData.secteur,
                                            onChange: (v)=>setFormData((d)=>({
                                                        ...d,
                                                        secteur: v
                                                    })),
                                            placeholder: "Sélectionnez un secteur",
                                            options: SECTEURS
                                        }, void 0, false, {
                                            fileName: "[project]/views/Host.tsx",
                                            lineNumber: 431,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/views/Host.tsx",
                                        lineNumber: 430,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldBlock, {
                                        label: "Email professionnel",
                                        required: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            className: "host-i",
                                            type: "email",
                                            placeholder: "contact@domaine.fr",
                                            value: formData.email,
                                            onChange: (e)=>setFormData((d)=>({
                                                        ...d,
                                                        email: e.target.value
                                                    })),
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/views/Host.tsx",
                                            lineNumber: 440,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/views/Host.tsx",
                                        lineNumber: 439,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldBlock, {
                                        label: "Téléphone",
                                        required: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            className: "host-i",
                                            type: "tel",
                                            placeholder: "ex: 06 12 34 56 78",
                                            value: formData.telephone,
                                            onChange: (e)=>setFormData((d)=>({
                                                        ...d,
                                                        telephone: e.target.value
                                                    })),
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/views/Host.tsx",
                                            lineNumber: 444,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/views/Host.tsx",
                                        lineNumber: 443,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        disabled: isSubmitting,
                                        style: {
                                            marginTop: 6,
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
                                                        animation: 'hostSpin .7s linear infinite',
                                                        display: 'inline-block'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/views/Host.tsx",
                                                    lineNumber: 464,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Envoi…"
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                "Soumettre ma candidature",
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
                                                            fileName: "[project]/views/Host.tsx",
                                                            lineNumber: 471,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                                            points: "22 2 15 22 11 13 2 9 22 2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/Host.tsx",
                                                            lineNumber: 471,
                                                            columnNumber: 62
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/views/Host.tsx",
                                                    lineNumber: 470,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/views/Host.tsx",
                                        lineNumber: 447,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 9,
                                            color: '#b0a89e',
                                            lineHeight: 1.7,
                                            textAlign: 'center'
                                        },
                                        children: "En soumettant ce formulaire, vous acceptez d'être recontacté par téléphone. Vos données ne seront utilisées qu'à cette fin."
                                    }, void 0, false, {
                                        fileName: "[project]/views/Host.tsx",
                                        lineNumber: 477,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/views/Host.tsx",
                                lineNumber: 414,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: 24,
                                    paddingTop: 20,
                                    borderTop: '1px solid rgba(26,46,26,0.05)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: 9,
                                            fontWeight: 700,
                                            letterSpacing: '0.2em',
                                            textTransform: 'uppercase',
                                            color: '#d4cec8',
                                            textAlign: 'center',
                                            marginBottom: 14
                                        },
                                        children: "Ils nous font confiance"
                                    }, void 0, false, {
                                        fileName: "[project]/views/Host.tsx",
                                        lineNumber: 485,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 24,
                                            opacity: 0.2,
                                            filter: 'grayscale(1)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    height: 18,
                                                    width: 64,
                                                    background: '#9a9080',
                                                    borderRadius: 5
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/views/Host.tsx",
                                                lineNumber: 489,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    height: 18,
                                                    width: 64,
                                                    background: '#9a9080',
                                                    borderRadius: 5
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/views/Host.tsx",
                                                lineNumber: 490,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/views/Host.tsx",
                                        lineNumber: 488,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/views/Host.tsx",
                                lineNumber: 484,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/views/Host.tsx",
                        lineNumber: 366,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/views/Host.tsx",
                lineNumber: 286,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/views/Host.tsx",
        lineNumber: 228,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(Host, "v3xNM0sqHiuFDL5xGKyGXAQQjio=");
_c5 = Host;
const __TURBOPACK__default__export__ = Host;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "CustomSelect");
__turbopack_context__.k.register(_c1, "FieldBlock");
__turbopack_context__.k.register(_c2, "TabButton");
__turbopack_context__.k.register(_c3, "BenefitItem");
__turbopack_context__.k.register(_c4, "CenterMedallion");
__turbopack_context__.k.register(_c5, "Host");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=views_Host_tsx_749a6757._.js.map