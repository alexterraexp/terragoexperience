(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/blog/[slug]/TableOfContents.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TableOfContents
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function TableOfContents({ headings }) {
    _s();
    const [activeId, setActiveId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(headings[0]?.id ?? null);
    const ticking = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TableOfContents.useEffect": ()=>{
            if (headings.length === 0) return;
            const handleScroll = {
                "TableOfContents.useEffect.handleScroll": ()=>{
                    if (ticking.current) return;
                    ticking.current = true;
                    requestAnimationFrame({
                        "TableOfContents.useEffect.handleScroll": ()=>{
                            const scrollY = window.scrollY + 120;
                            let current = headings[0].id;
                            for (const { id } of headings){
                                const el = document.getElementById(id);
                                if (el && el.offsetTop <= scrollY) {
                                    current = id;
                                }
                            }
                            setActiveId(current);
                            ticking.current = false;
                        }
                    }["TableOfContents.useEffect.handleScroll"]);
                }
            }["TableOfContents.useEffect.handleScroll"];
            window.addEventListener('scroll', handleScroll, {
                passive: true
            });
            handleScroll();
            return ({
                "TableOfContents.useEffect": ()=>window.removeEventListener('scroll', handleScroll)
            })["TableOfContents.useEffect"];
        }
    }["TableOfContents.useEffect"], [
        headings
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#9a9080',
                    marginBottom: '0.75rem'
                },
                children: "Dans cet article"
            }, void 0, false, {
                fileName: "[project]/app/blog/[slug]/TableOfContents.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                children: headings.map(({ text, id })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: `#${id}`,
                        onClick: (e)=>{
                            e.preventDefault();
                            document.getElementById(id)?.scrollIntoView({
                                behavior: 'smooth'
                            });
                        },
                        style: {
                            display: 'block',
                            padding: '6px 10px',
                            borderRadius: 8,
                            marginBottom: 2,
                            fontSize: 12,
                            fontWeight: activeId === id ? 700 : 500,
                            color: activeId === id ? '#1a2e1a' : '#9a9080',
                            background: activeId === id ? 'rgba(26,46,26,0.06)' : 'transparent',
                            textDecoration: 'none',
                            lineHeight: 1.45,
                            transition: 'all 0.2s'
                        },
                        children: text
                    }, id, false, {
                        fileName: "[project]/app/blog/[slug]/TableOfContents.tsx",
                        lineNumber: 49,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/blog/[slug]/TableOfContents.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/blog/[slug]/TableOfContents.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_s(TableOfContents, "6tXE0pf21w/c8If6nY2UFwi/2pk=");
_c = TableOfContents;
var _c;
__turbopack_context__.k.register(_c, "TableOfContents");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_blog_%5Bslug%5D_TableOfContents_tsx_f050215d._.js.map