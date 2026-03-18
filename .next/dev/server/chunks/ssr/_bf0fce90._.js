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
"[project]/lib/producerTypes.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/views/ProducerDetailPage.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$producerTypes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/producerTypes.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const Stars = ({ count })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            color: '#f78d00',
            letterSpacing: 2
        },
        children: [
            '★'.repeat(count),
            '☆'.repeat(5 - count)
        ]
    }, void 0, true, {
        fileName: "[project]/views/ProducerDetailPage.tsx",
        lineNumber: 13,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const ProducerDetailPage = ()=>{
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const producerId = params.producerId;
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [producer, setProducer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeImg, setActiveImg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [contactOpen, setContactOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(window.innerWidth < 768);
    // Formulaire contact producteur
    const [contactNom, setContactNom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [contactEmail, setContactEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [contactParticipants, setContactParticipants] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [contactDates, setContactDates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [contactSubmitting, setContactSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [contactSuccess, setContactSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [contactError, setContactError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleResize = ()=>setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return ()=>window.removeEventListener('resize', handleResize);
    }, []);
    const handleContactSubmit = async (e)=>{
        e.preventDefault();
        if (!producer) return;
        setContactError(null);
        if (!contactNom.trim() || !contactEmail.trim()) {
            setContactError('Merci de renseigner au minimum votre nom et votre email.');
            return;
        }
        setContactSubmitting(true);
        try {
            const response = await fetch('https://formsubmit.co/ajax/terragoexperiences@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: `Demande séminaire - ${producer.name}`,
                    _captcha: false,
                    nom: contactNom.trim(),
                    email: contactEmail.trim(),
                    participants: contactParticipants.trim(),
                    dates: contactDates.trim(),
                    message: `Demande envoyée depuis la fiche producteur ${producer.name} (${producer.location}).`
                })
            });
            if (response.ok) {
                setContactSuccess(true);
                setContactNom('');
                setContactEmail('');
                setContactParticipants('');
                setContactDates('');
            } else {
                setContactError("Une erreur est survenue lors de l'envoi. Merci de réessayer.");
            }
        } catch  {
            setContactError("Une erreur est survenue lors de l'envoi. Merci de réessayer.");
        } finally{
            setContactSubmitting(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!producerId) {
            setProducer(null);
            setLoading(false);
            return;
        }
        let cancelled = false;
        async function fetchProducer() {
            setLoading(true);
            setError(null);
            try {
                const { data, error: err } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('producers').select('*').eq('id', producerId).maybeSingle();
                if (cancelled) return;
                if (err) {
                    setError(err.message);
                    setProducer(null);
                } else {
                    setProducer(data ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$producerTypes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapSupabaseRowToFull"])(data) : null);
                }
            } catch (e) {
                if (!cancelled) {
                    setError(e instanceof Error ? e.message : 'Erreur chargement');
                    setProducer(null);
                }
            } finally{
                if (!cancelled) setLoading(false);
            }
        }
        fetchProducer();
        return ()=>{
            cancelled = true;
        };
    }, [
        producerId
    ]);
    if (loading || !producer) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            fontFamily: "'Poppins', sans-serif",
            background: '#faf8f5',
            minHeight: '100vh'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                height: 500,
                background: 'linear-gradient(135deg, #1e291a, #2d4a2d)',
                animation: 'pulse 1.5s ease-in-out infinite'
            }
        }, void 0, false, {
            fileName: "[project]/views/ProducerDetailPage.tsx",
            lineNumber: 112,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/views/ProducerDetailPage.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
    if (error) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            fontFamily: "'Poppins', sans-serif",
            background: '#faf8f5',
            minHeight: '100vh',
            paddingTop: 120,
            textAlign: 'center'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    fontSize: 18,
                    color: '#b91c1c',
                    marginBottom: 24
                },
                children: error
            }, void 0, false, {
                fileName: "[project]/views/ProducerDetailPage.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>router.push('/partenaires'),
                style: {
                    background: '#1e291a',
                    color: '#fff',
                    padding: '12px 24px',
                    borderRadius: 12,
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer'
                },
                children: "← Retour"
            }, void 0, false, {
                fileName: "[project]/views/ProducerDetailPage.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/views/ProducerDetailPage.tsx",
        lineNumber: 117,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
    if (!producer) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            fontFamily: "'Poppins', sans-serif",
            background: '#faf8f5',
            minHeight: '100vh'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'relative',
                    height: isMobile ? 320 : 500,
                    overflow: 'hidden'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: producer.cover,
                        alt: producer.name,
                        style: {
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }
                    }, void 0, false, {
                        fileName: "[project]/views/ProducerDetailPage.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(30,41,26,0.9) 0%, rgba(30,41,26,0.3) 60%, transparent 100%)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/views/ProducerDetailPage.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>router.push('/partenaires'),
                        style: {
                            position: 'absolute',
                            bottom: 24,
                            left: 24,
                            zIndex: 10,
                            background: 'rgba(255,255,255,0.15)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: '#fff',
                            borderRadius: 12,
                            padding: '8px 16px',
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            fontFamily: 'inherit'
                        },
                        children: "← Tous les producteurs"
                    }, void 0, false, {
                        fileName: "[project]/views/ProducerDetailPage.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            bottom: 70,
                            left: 0,
                            right: 0,
                            padding: isMobile ? '0 20px' : '0 48px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                maxWidth: 1100,
                                margin: '0 auto',
                                display: 'flex',
                                alignItems: 'flex-end',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                                gap: 16
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        flex: 1,
                                        minWidth: 0
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                gap: 8,
                                                marginBottom: 10,
                                                flexWrap: 'wrap'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        background: '#f78d00',
                                                        color: '#fff',
                                                        fontSize: 10,
                                                        fontWeight: 700,
                                                        padding: '4px 12px',
                                                        borderRadius: 20,
                                                        letterSpacing: '0.1em',
                                                        textTransform: 'uppercase'
                                                    },
                                                    children: producer.type
                                                }, void 0, false, {
                                                    fileName: "[project]/views/ProducerDetailPage.tsx",
                                                    lineNumber: 144,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                producer.heroBadge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        background: 'rgba(255,255,255,0.15)',
                                                        backdropFilter: 'blur(8px)',
                                                        color: '#fff',
                                                        fontSize: 10,
                                                        fontWeight: 600,
                                                        padding: '4px 12px',
                                                        borderRadius: 20,
                                                        border: '1px solid rgba(255,255,255,0.2)'
                                                    },
                                                    children: producer.heroBadge
                                                }, void 0, false, {
                                                    fileName: "[project]/views/ProducerDetailPage.tsx",
                                                    lineNumber: 146,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/views/ProducerDetailPage.tsx",
                                            lineNumber: 143,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            style: {
                                                color: '#fff',
                                                fontSize: isMobile ? 22 : 38,
                                                fontWeight: 700,
                                                fontStyle: 'italic',
                                                margin: '0 0 6px',
                                                lineHeight: 1.2
                                            },
                                            children: producer.name
                                        }, void 0, false, {
                                            fileName: "[project]/views/ProducerDetailPage.tsx",
                                            lineNumber: 149,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                color: 'rgba(255,255,255,0.7)',
                                                fontSize: 13,
                                                margin: 0
                                            },
                                            children: [
                                                "📍 ",
                                                producer.location,
                                                " · par ",
                                                producer.owner
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/views/ProducerDetailPage.tsx",
                                            lineNumber: 150,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/views/ProducerDetailPage.tsx",
                                    lineNumber: 142,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                !isMobile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: 'rgba(255,255,255,0.12)',
                                        backdropFilter: 'blur(16px)',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        borderRadius: 16,
                                        padding: '16px 24px',
                                        textAlign: 'center',
                                        flexShrink: 0
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                color: '#f78d00',
                                                fontSize: 24,
                                                fontWeight: 800
                                            },
                                            children: [
                                                "★ ",
                                                producer.rating
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/views/ProducerDetailPage.tsx",
                                            lineNumber: 154,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                color: 'rgba(255,255,255,0.7)',
                                                fontSize: 11,
                                                marginTop: 2
                                            },
                                            children: [
                                                producer.reviewCount,
                                                " expériences organisées"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/views/ProducerDetailPage.tsx",
                                            lineNumber: 155,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/views/ProducerDetailPage.tsx",
                                    lineNumber: 153,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/ProducerDetailPage.tsx",
                            lineNumber: 141,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/views/ProducerDetailPage.tsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/views/ProducerDetailPage.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isMobile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: '#fff',
                    padding: '14px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    borderBottom: '1px solid #f0ebe4'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: '#f78d00',
                            fontSize: 20,
                            fontWeight: 800
                        },
                        children: [
                            "★ ",
                            producer.rating
                        ]
                    }, void 0, true, {
                        fileName: "[project]/views/ProducerDetailPage.tsx",
                        lineNumber: 165,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 12,
                            color: '#9ca3af'
                        },
                        children: [
                            producer.reviewCount,
                            " expériences organisées"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/views/ProducerDetailPage.tsx",
                        lineNumber: 166,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/views/ProducerDetailPage.tsx",
                lineNumber: 164,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: 1100,
                    margin: '0 auto',
                    padding: isMobile ? '24px 16px' : '48px 48px'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '1fr 320px',
                        gap: isMobile ? 32 : 48,
                        alignItems: 'start'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    style: {
                                        marginBottom: 40
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            style: {
                                                fontSize: 22,
                                                fontWeight: 700,
                                                color: '#1e291a',
                                                fontStyle: 'italic',
                                                marginBottom: 14
                                            },
                                            children: "À propos"
                                        }, void 0, false, {
                                            fileName: "[project]/views/ProducerDetailPage.tsx",
                                            lineNumber: 178,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: 14,
                                                color: '#6b7280',
                                                lineHeight: 1.8,
                                                marginBottom: 16
                                            },
                                            children: producer.description
                                        }, void 0, false, {
                                            fileName: "[project]/views/ProducerDetailPage.tsx",
                                            lineNumber: 179,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                gap: 8,
                                                flexWrap: 'wrap'
                                            },
                                            children: producer.tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        background: 'rgba(247,141,0,0.10)',
                                                        color: '#f78d00',
                                                        fontSize: 11,
                                                        fontWeight: 600,
                                                        padding: '4px 12px',
                                                        borderRadius: 20
                                                    },
                                                    children: tag
                                                }, tag, false, {
                                                    fileName: "[project]/views/ProducerDetailPage.tsx",
                                                    lineNumber: 182,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/views/ProducerDetailPage.tsx",
                                            lineNumber: 180,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/views/ProducerDetailPage.tsx",
                                    lineNumber: 177,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    style: {
                                        marginBottom: 40
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            style: {
                                                fontSize: 22,
                                                fontWeight: 700,
                                                color: '#1e291a',
                                                fontStyle: 'italic',
                                                marginBottom: 14
                                            },
                                            children: "Expériences proposées"
                                        }, void 0, false, {
                                            fileName: "[project]/views/ProducerDetailPage.tsx",
                                            lineNumber: 189,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 12
                                            },
                                            children: producer.experiences.map((exp)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        background: '#fff',
                                                        borderRadius: 16,
                                                        padding: '18px 20px',
                                                        border: '1px solid #f0ebe4',
                                                        display: 'flex',
                                                        alignItems: 'flex-start',
                                                        gap: 14
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                width: 40,
                                                                height: 40,
                                                                borderRadius: 10,
                                                                background: '#f5f0ea',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                fontSize: 18,
                                                                flexShrink: 0
                                                            },
                                                            children: exp.icon
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/ProducerDetailPage.tsx",
                                                            lineNumber: 193,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                flex: 1
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        display: 'flex',
                                                                        justifyContent: 'space-between',
                                                                        alignItems: 'flex-start',
                                                                        flexWrap: 'wrap',
                                                                        gap: 4
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                            style: {
                                                                                fontSize: 12,
                                                                                fontFamily: 'poppins',
                                                                                fontWeight: 600,
                                                                                color: '#1e291a',
                                                                                margin: 0
                                                                            },
                                                                            children: exp.title
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/views/ProducerDetailPage.tsx",
                                                                            lineNumber: 196,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            style: {
                                                                                fontSize: 12,
                                                                                fontWeight: 700,
                                                                                color: '#f78d00'
                                                                            },
                                                                            children: exp.price
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/views/ProducerDetailPage.tsx",
                                                                            lineNumber: 197,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/views/ProducerDetailPage.tsx",
                                                                    lineNumber: 195,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    style: {
                                                                        fontSize: 11,
                                                                        color: '#9ca3af',
                                                                        margin: '3px 0 5px'
                                                                    },
                                                                    children: exp.duration
                                                                }, void 0, false, {
                                                                    fileName: "[project]/views/ProducerDetailPage.tsx",
                                                                    lineNumber: 199,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    style: {
                                                                        fontSize: 12,
                                                                        color: '#6b7280',
                                                                        lineHeight: 1.6,
                                                                        margin: 0
                                                                    },
                                                                    children: exp.desc
                                                                }, void 0, false, {
                                                                    fileName: "[project]/views/ProducerDetailPage.tsx",
                                                                    lineNumber: 200,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/views/ProducerDetailPage.tsx",
                                                            lineNumber: 194,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, exp.id, true, {
                                                    fileName: "[project]/views/ProducerDetailPage.tsx",
                                                    lineNumber: 192,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/views/ProducerDetailPage.tsx",
                                            lineNumber: 190,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/views/ProducerDetailPage.tsx",
                                    lineNumber: 188,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    style: {
                                        marginBottom: 40
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            style: {
                                                fontSize: 20,
                                                fontWeight: 700,
                                                color: '#1e291a',
                                                fontStyle: 'italic',
                                                marginBottom: 14
                                            },
                                            children: "Galerie"
                                        }, void 0, false, {
                                            fileName: "[project]/views/ProducerDetailPage.tsx",
                                            lineNumber: 209,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'grid',
                                                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                                                gap: 10
                                            },
                                            children: producer.gallery.map((img, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    onClick: ()=>setActiveImg(i),
                                                    style: {
                                                        borderRadius: 12,
                                                        overflow: 'hidden',
                                                        aspectRatio: '4/3',
                                                        cursor: 'zoom-in'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: img,
                                                        alt: "",
                                                        style: {
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover',
                                                            transition: 'transform 0.4s ease'
                                                        },
                                                        onMouseOver: (e)=>e.currentTarget.style.transform = 'scale(1.05)',
                                                        onMouseOut: (e)=>e.currentTarget.style.transform = 'scale(1)'
                                                    }, void 0, false, {
                                                        fileName: "[project]/views/ProducerDetailPage.tsx",
                                                        lineNumber: 213,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, img, false, {
                                                    fileName: "[project]/views/ProducerDetailPage.tsx",
                                                    lineNumber: 212,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/views/ProducerDetailPage.tsx",
                                            lineNumber: 210,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/views/ProducerDetailPage.tsx",
                                    lineNumber: 208,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            style: {
                                                fontSize: 20,
                                                fontWeight: 700,
                                                color: '#1e291a',
                                                fontStyle: 'italic',
                                                marginBottom: 14
                                            },
                                            children: "Expériences organisées"
                                        }, void 0, false, {
                                            fileName: "[project]/views/ProducerDetailPage.tsx",
                                            lineNumber: 224,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 14
                                            },
                                            children: producer.reviews.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        background: '#fff',
                                                        borderRadius: 16,
                                                        padding: '18px 20px',
                                                        border: '1px solid #f0ebe4'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                marginBottom: 6,
                                                                flexWrap: 'wrap',
                                                                gap: 4
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            style: {
                                                                                fontWeight: 700,
                                                                                fontSize: 13,
                                                                                color: '#1e291a'
                                                                            },
                                                                            children: r.author
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/views/ProducerDetailPage.tsx",
                                                                            lineNumber: 230,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            style: {
                                                                                fontSize: 11,
                                                                                color: '#9ca3af',
                                                                                marginLeft: 8
                                                                            },
                                                                            children: r.company
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/views/ProducerDetailPage.tsx",
                                                                            lineNumber: 231,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/views/ProducerDetailPage.tsx",
                                                                    lineNumber: 229,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        fontSize: 11,
                                                                        color: '#9ca3af'
                                                                    },
                                                                    children: r.date
                                                                }, void 0, false, {
                                                                    fileName: "[project]/views/ProducerDetailPage.tsx",
                                                                    lineNumber: 233,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/views/ProducerDetailPage.tsx",
                                                            lineNumber: 228,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Stars, {
                                                            count: r.rating
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/ProducerDetailPage.tsx",
                                                            lineNumber: 235,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            style: {
                                                                fontSize: 13,
                                                                color: '#6b7280',
                                                                lineHeight: 1.7,
                                                                marginTop: 8,
                                                                fontStyle: 'italic'
                                                            },
                                                            children: [
                                                                '"',
                                                                r.text,
                                                                '"'
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/views/ProducerDetailPage.tsx",
                                                            lineNumber: 236,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, r.author + r.date, true, {
                                                    fileName: "[project]/views/ProducerDetailPage.tsx",
                                                    lineNumber: 227,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/views/ProducerDetailPage.tsx",
                                            lineNumber: 225,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/views/ProducerDetailPage.tsx",
                                    lineNumber: 223,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/ProducerDetailPage.tsx",
                            lineNumber: 175,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 20,
                                position: isMobile ? 'static' : 'sticky',
                                top: 100
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: '#fff',
                                        borderRadius: 20,
                                        border: '1px solid #f0ebe4',
                                        boxShadow: '0 8px 40px rgba(30,41,26,0.08)',
                                        overflow: 'hidden'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                padding: '24px 24px 0',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                gap: 12
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: producer.avatar,
                                                    alt: "",
                                                    style: {
                                                        width: 110,
                                                        height: 110,
                                                        borderRadius: '50%',
                                                        objectFit: 'cover',
                                                        border: '4px solid #f5f0ea',
                                                        boxShadow: '0 4px 20px rgba(30,41,26,0.12)'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/views/ProducerDetailPage.tsx",
                                                    lineNumber: 249,
                                                    columnNumber: 14
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontWeight: 700,
                                                                fontSize: 17,
                                                                color: '#1e291a'
                                                            },
                                                            children: producer.owner
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/ProducerDetailPage.tsx",
                                                            lineNumber: 251,
                                                            columnNumber: 18
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: 12,
                                                                color: '#9ca3af',
                                                                marginTop: 3
                                                            },
                                                            children: [
                                                                producer.type,
                                                                " · ",
                                                                producer.location
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/views/ProducerDetailPage.tsx",
                                                            lineNumber: 252,
                                                            columnNumber: 18
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/views/ProducerDetailPage.tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 16
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/views/ProducerDetailPage.tsx",
                                            lineNumber: 248,
                                            columnNumber: 13
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                padding: '16px 20px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        background: '#f5f0ea',
                                                        borderRadius: 10,
                                                        padding: '10px 14px',
                                                        marginBottom: 14
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: 10,
                                                                color: '#9ca3af',
                                                                marginBottom: 2
                                                            },
                                                            children: "Capacité maximale"
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/ProducerDetailPage.tsx",
                                                            lineNumber: 257,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: 13,
                                                                fontWeight: 600,
                                                                color: '#1e291a'
                                                            },
                                                            children: producer.capacity
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/ProducerDetailPage.tsx",
                                                            lineNumber: 258,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/views/ProducerDetailPage.tsx",
                                                    lineNumber: 256,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setContactOpen(true),
                                                    onMouseOver: (e)=>e.currentTarget.style.background = '#f78d00',
                                                    onMouseOut: (e)=>e.currentTarget.style.background = '#2b3825',
                                                    style: {
                                                        width: '100%',
                                                        background: '#2b3825',
                                                        color: '#fff',
                                                        border: 'none',
                                                        borderRadius: 12,
                                                        padding: '13px',
                                                        fontSize: 11,
                                                        fontWeight: 700,
                                                        letterSpacing: '0.1em',
                                                        textTransform: 'uppercase',
                                                        cursor: 'pointer',
                                                        fontFamily: 'inherit'
                                                    },
                                                    children: "Faire une demande !"
                                                }, void 0, false, {
                                                    fileName: "[project]/views/ProducerDetailPage.tsx",
                                                    lineNumber: 260,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontSize: 10,
                                                        color: '#9ca3af',
                                                        textAlign: 'center',
                                                        marginTop: 10
                                                    },
                                                    children: "Réponse sous 24h · Devis gratuit"
                                                }, void 0, false, {
                                                    fileName: "[project]/views/ProducerDetailPage.tsx",
                                                    lineNumber: 264,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/views/ProducerDetailPage.tsx",
                                            lineNumber: 255,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/views/ProducerDetailPage.tsx",
                                    lineNumber: 247,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                producer.certifications.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: '#fff',
                                        borderRadius: 20,
                                        border: '1px solid #f0ebe4',
                                        padding: '20px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            style: {
                                                fontSize: 14,
                                                fontWeight: 700,
                                                color: '#1e291a',
                                                fontStyle: 'italic',
                                                margin: '0 0 14px'
                                            },
                                            children: "Certifications"
                                        }, void 0, false, {
                                            fileName: "[project]/views/ProducerDetailPage.tsx",
                                            lineNumber: 271,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 10
                                            },
                                            children: producer.certifications.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 10
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                width: 6,
                                                                height: 6,
                                                                borderRadius: '50%',
                                                                background: '#f78d00',
                                                                flexShrink: 0
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/ProducerDetailPage.tsx",
                                                            lineNumber: 275,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: 12,
                                                                color: '#374151',
                                                                fontWeight: 500
                                                            },
                                                            children: c
                                                        }, void 0, false, {
                                                            fileName: "[project]/views/ProducerDetailPage.tsx",
                                                            lineNumber: 276,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, c, true, {
                                                    fileName: "[project]/views/ProducerDetailPage.tsx",
                                                    lineNumber: 274,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/views/ProducerDetailPage.tsx",
                                            lineNumber: 272,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/views/ProducerDetailPage.tsx",
                                    lineNumber: 270,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/ProducerDetailPage.tsx",
                            lineNumber: 244,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/views/ProducerDetailPage.tsx",
                    lineNumber: 172,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/views/ProducerDetailPage.tsx",
                lineNumber: 171,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            activeImg !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: ()=>setActiveImg(null),
                style: {
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.92)',
                    zIndex: 200,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: (e)=>{
                            e.stopPropagation();
                            setActiveImg((activeImg - 1 + producer.gallery.length) % producer.gallery.length);
                        },
                        style: {
                            position: 'absolute',
                            left: isMobile ? 10 : 24,
                            background: 'rgba(255,255,255,0.15)',
                            border: 'none',
                            color: '#fff',
                            borderRadius: '50%',
                            width: 44,
                            height: 44,
                            fontSize: 22,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        },
                        children: "‹"
                    }, void 0, false, {
                        fileName: "[project]/views/ProducerDetailPage.tsx",
                        lineNumber: 290,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: producer.gallery[activeImg],
                        alt: "",
                        onClick: (e)=>e.stopPropagation(),
                        style: {
                            maxWidth: isMobile ? '85vw' : '80vw',
                            maxHeight: '85vh',
                            borderRadius: 12,
                            objectFit: 'contain'
                        }
                    }, void 0, false, {
                        fileName: "[project]/views/ProducerDetailPage.tsx",
                        lineNumber: 292,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: (e)=>{
                            e.stopPropagation();
                            setActiveImg((activeImg + 1) % producer.gallery.length);
                        },
                        style: {
                            position: 'absolute',
                            right: isMobile ? 10 : 24,
                            background: 'rgba(255,255,255,0.15)',
                            border: 'none',
                            color: '#fff',
                            borderRadius: '50%',
                            width: 44,
                            height: 44,
                            fontSize: 22,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        },
                        children: "›"
                    }, void 0, false, {
                        fileName: "[project]/views/ProducerDetailPage.tsx",
                        lineNumber: 293,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setActiveImg(null),
                        style: {
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            background: 'rgba(255,255,255,0.15)',
                            border: 'none',
                            color: '#fff',
                            borderRadius: '50%',
                            width: 36,
                            height: 36,
                            fontSize: 18,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        },
                        children: "×"
                    }, void 0, false, {
                        fileName: "[project]/views/ProducerDetailPage.tsx",
                        lineNumber: 295,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            bottom: 20,
                            color: 'rgba(255,255,255,0.6)',
                            fontSize: 12
                        },
                        children: [
                            activeImg + 1,
                            " / ",
                            producer.gallery.length
                        ]
                    }, void 0, true, {
                        fileName: "[project]/views/ProducerDetailPage.tsx",
                        lineNumber: 297,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/views/ProducerDetailPage.tsx",
                lineNumber: 289,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            contactOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: (e)=>{
                    if (e.target === e.currentTarget) setContactOpen(false);
                },
                style: {
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(30,41,26,0.6)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 200,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 24
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: '#fff',
                        borderRadius: 24,
                        padding: isMobile ? '28px 20px' : '36px',
                        maxWidth: 440,
                        width: '100%',
                        boxShadow: '0 40px 100px rgba(30,41,26,0.3)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            style: {
                                fontSize: 17,
                                fontWeight: 600,
                                fontStyle: 'italic',
                                fontFamily: "'Poppins', sans-serif",
                                color: '#1e291a',
                                marginBottom: 20
                            },
                            children: [
                                "Vivez une expérience unique chez ",
                                producer.owner,
                                " à ",
                                producer.location,
                                "."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/ProducerDetailPage.tsx",
                            lineNumber: 306,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        contactSuccess ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: 'center',
                                padding: '8px 4px 0'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: 38,
                                        height: 38,
                                        borderRadius: '50%',
                                        background: '#1e291a',
                                        color: '#fff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 8px',
                                        fontSize: 20
                                    },
                                    children: "✓"
                                }, void 0, false, {
                                    fileName: "[project]/views/ProducerDetailPage.tsx",
                                    lineNumber: 312,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 13,
                                        fontWeight: 600,
                                        color: '#1e291a',
                                        marginBottom: 4
                                    },
                                    children: "Merci !"
                                }, void 0, false, {
                                    fileName: "[project]/views/ProducerDetailPage.tsx",
                                    lineNumber: 313,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 11,
                                        color: '#6b7280',
                                        margin: 0
                                    },
                                    children: "Votre demande a bien été envoyée. Nous revenons vers vous sous 24h."
                                }, void 0, false, {
                                    fileName: "[project]/views/ProducerDetailPage.tsx",
                                    lineNumber: 314,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/ProducerDetailPage.tsx",
                            lineNumber: 311,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleContactSubmit,
                            children: [
                                [
                                    {
                                        label: 'Votre nom',
                                        name: 'nom',
                                        type: 'text',
                                        placeholder: 'Jean Dupont'
                                    },
                                    {
                                        label: 'Email',
                                        name: 'email',
                                        type: 'email',
                                        placeholder: 'jean@entreprise.fr'
                                    },
                                    {
                                        label: 'Nombre de participants',
                                        name: 'participants',
                                        type: 'number',
                                        placeholder: 'ex: 20'
                                    },
                                    {
                                        label: 'Dates souhaitées',
                                        name: 'dates',
                                        type: 'text',
                                        placeholder: 'ex : 12–13 juin, ou semaine du 7 octobre'
                                    }
                                ].map((field)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: 14
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                style: {
                                                    fontSize: 11,
                                                    fontWeight: 600,
                                                    color: '#374151',
                                                    display: 'block',
                                                    marginBottom: 6
                                                },
                                                children: field.label
                                            }, void 0, false, {
                                                fileName: "[project]/views/ProducerDetailPage.tsx",
                                                lineNumber: 325,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: field.type,
                                                name: field.name,
                                                placeholder: field.placeholder,
                                                value: field.name === 'nom' ? contactNom : field.name === 'email' ? contactEmail : field.name === 'participants' ? contactParticipants : contactDates,
                                                onChange: (e)=>{
                                                    const v = e.target.value;
                                                    if (field.name === 'nom') setContactNom(v);
                                                    else if (field.name === 'email') setContactEmail(v);
                                                    else if (field.name === 'participants') setContactParticipants(v);
                                                    else setContactDates(v);
                                                },
                                                style: {
                                                    width: '100%',
                                                    padding: '10px 14px',
                                                    borderRadius: 10,
                                                    border: '1.5px solid #e5e0d8',
                                                    fontSize: 13,
                                                    fontFamily: 'inherit',
                                                    outline: 'none',
                                                    boxSizing: 'border-box'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/views/ProducerDetailPage.tsx",
                                                lineNumber: 326,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, field.label, true, {
                                        fileName: "[project]/views/ProducerDetailPage.tsx",
                                        lineNumber: 324,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))),
                                contactError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 11,
                                        color: '#b91c1c',
                                        marginBottom: 8
                                    },
                                    children: contactError
                                }, void 0, false, {
                                    fileName: "[project]/views/ProducerDetailPage.tsx",
                                    lineNumber: 352,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: contactSubmitting,
                                    onMouseOver: (e)=>e.currentTarget.style.background = '#f78d00',
                                    onMouseOut: (e)=>e.currentTarget.style.background = '#1e291a',
                                    style: {
                                        width: '100%',
                                        background: '#2b3624',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: 12,
                                        padding: '13px',
                                        fontSize: 11,
                                        fontWeight: 700,
                                        letterSpacing: '0.1em',
                                        textTransform: 'uppercase',
                                        cursor: contactSubmitting ? 'default' : 'pointer',
                                        fontFamily: 'inherit',
                                        marginTop: 8,
                                        transition: 'background 0.2s',
                                        opacity: contactSubmitting ? 0.8 : 1
                                    },
                                    children: contactSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'
                                }, void 0, false, {
                                    fileName: "[project]/views/ProducerDetailPage.tsx",
                                    lineNumber: 355,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/views/ProducerDetailPage.tsx",
                            lineNumber: 317,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setContactOpen(false),
                            style: {
                                width: '100%',
                                background: 'none',
                                border: 'none',
                                color: '#9ca3af',
                                fontSize: 12,
                                marginTop: 12,
                                cursor: 'pointer',
                                fontFamily: 'inherit'
                            },
                            children: "Retour"
                        }, void 0, false, {
                            fileName: "[project]/views/ProducerDetailPage.tsx",
                            lineNumber: 367,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/views/ProducerDetailPage.tsx",
                    lineNumber: 304,
                    columnNumber: 12
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/views/ProducerDetailPage.tsx",
                lineNumber: 303,
                columnNumber: 10
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/views/ProducerDetailPage.tsx",
        lineNumber: 127,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = ProducerDetailPage;
}),
];

//# sourceMappingURL=_bf0fce90._.js.map