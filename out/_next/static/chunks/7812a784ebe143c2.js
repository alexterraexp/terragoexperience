(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,78964,e=>{"use strict";var r=e.i(47167),o=e.i(43476),t=e.i(71645);let a="alexso.terrago@gmail.com",i=r.default.env.NEXT_PUBLIC_FORMSPREE_RECOMMEND_ID||void 0,s=({label:e,required:r,children:t})=>(0,o.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:0},children:[(0,o.jsxs)("label",{style:{fontSize:9,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"#b0a89e",display:"block",marginBottom:8},children:[e,r&&(0,o.jsx)("span",{style:{color:"#e67e22",marginLeft:4},children:"*"})]}),t]}),n=["https://images.unsplash.com/photo-1638012858969-fac36ad2ea32?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/general/ostreiculteur.png","https://images.unsplash.com/photo-1678089694013-5a72a8dddab3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1731156693854-3a9363878240?q=80&w=600&auto=format&fit=crop","https://images.unsplash.com/photo-1624806992066-5ffcf7ca186b?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1760795959671-1f6a4fcc80ba?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/general/cueillette.png","https://images.unsplash.com/photo-1686489356497-a44ba8cf997c?q=80&w=2063&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/general/paysageterroir.png","https://lxlvcwwvnujfbqgcfzze.supabase.co/storage/v1/object/public/producers/general/vigneron.jpg","https://images.unsplash.com/photo-1593011951342-8426e949371f?q=80&w=976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],l=[[n[0],n[3],n[10],n[9]],[n[1],n[4],n[7]],[n[2],n[5],n[8],n[6]]],c=[[260,220,200,240],[300,210,260],[230,280,220,200]];e.s(["default",0,()=>{let e=(()=>{let e=()=>window.innerWidth<=860?"mobile":window.innerWidth<=1100?"tablet":"desktop",[r,o]=(0,t.useState)(e);return(0,t.useEffect)(()=>{let r=()=>o(e());return window.addEventListener("resize",r),()=>window.removeEventListener("resize",r)},[]),r})(),[r,d]=(0,t.useState)({producerName:"",yourName:"",yourEmail:"",producerContact:"",message:""}),[p,u]=(0,t.useState)(!1),[m,f]=(0,t.useState)(!1),[x,h]=(0,t.useState)(""),g=async e=>{if(e.preventDefault(),h(""),!r.producerName.trim()||!r.yourName.trim()||!r.yourEmail.trim())return void h("Merci de renseigner au minimum votre nom, votre email, et le nom du producteur ou de son exploitation.");u(!0);let o=["=== RECOMMANDATION PRODUCTEUR ===\n",`Nom du producteur / exploitation : ${r.producerName||"—"}`,`Votre nom : ${r.yourName||"—"}`,`Votre email : ${r.yourEmail||"—"}`,`Contact du producteur : ${r.producerContact||"—"}`,"\nMessage :",r.message||"—","\n---\nEnvoyé depuis le formulaire Recommander un producteur - Terrago"].join("\n");try{if(i){if(!(await fetch(`https://formspree.io/f/${i}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({_replyto:r.yourEmail||void 0,producerName:r.producerName,yourName:r.yourName,yourEmail:r.yourEmail,producerContact:r.producerContact,message:r.message,_subject:`Recommandation producteur : ${r.producerName||"Sans nom"}`,_format:"plain",body:o})})).ok)throw Error("Erreur envoi")}else if(!(await fetch(`https://formsubmit.co/ajax/${a}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({name:r.yourName||"Anonyme",email:r.yourEmail||a,subject:`Recommandation producteur : ${r.producerName||"Sans nom"}`,message:o,_captcha:!1,_template:"table"})})).ok)throw Error("Erreur envoi");f(!0),d({producerName:"",yourName:"",yourEmail:"",producerContact:"",message:""})}catch{h("Une erreur est survenue. Veuillez réessayer ou nous contacter par email.")}finally{u(!1)}};return(0,o.jsxs)("div",{className:"font-sans min-h-screen",style:{background:"#fff",overflowX:"clip"},children:[(0,o.jsx)("style",{children:`
        .rec-i {
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
        .rec-i:focus {
          border-color: #1a2e1a;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(26,46,26,.06);
        }
        .rec-i::placeholder { color: #c4bdb4; }

        @keyframes recSpin { to { transform: rotate(360deg); } }
        @keyframes recPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(1.3); }
        }

        /* Layout principal */
        .rec-split {
          display: grid;
          grid-template-columns: 1fr 42%;
          min-height: 100vh;
        }

        .rec-left {
          padding: calc(84px + 4rem) clamp(2rem, 5vw, 4rem) 5rem calc(max(0px, (100vw - 1180px) / 2) + clamp(1.5rem, 4vw, 3rem));
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* Colonne photos — sticky pour rester en vue */
        .rec-right {
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
        }

        .photo-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          padding: 0 10px;
          height: 100%;
          /* On laisse d\xe9border haut et bas avec un translateY n\xe9gatif sur le container */
        }

        /* Chaque colonne scrolle \xe0 une vitesse diff\xe9rente via translateY */
        .photo-col {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .photo-col-0 {
          /* D\xe9cal\xe9e vers le haut : d\xe9borde en haut */
          transform: translateY(-60px);
        }
        .photo-col-1 {
          /* D\xe9cal\xe9e vers le bas : d\xe9borde en bas */
          transform: translateY(60px);
        }
        .photo-col-2 {
          /* D\xe9cal\xe9e interm\xe9diaire */
          transform: translateY(-20px);
        }

        .photo-item {
          border-radius: 14px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .photo-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Mobile */
        .rec-photos-mobile {
          display: none;
        }

        @media (max-width: 860px) {
          .rec-split {
            grid-template-columns: 1fr;
          }
          .rec-right {
            display: none;
          }
          .rec-left {
            padding: calc(84px + 3rem) clamp(1.5rem, 4vw, 3rem) 2rem clamp(1.5rem, 4vw, 3rem) !important;
          }
          .rec-photos-mobile {
            display: flex;
            flex-direction: row;
            gap: 12px;
            overflow-x: auto;
            padding: 0 clamp(1.5rem, 4vw, 3rem) 3rem;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .rec-photos-mobile::-webkit-scrollbar { display: none; }
        }

        @media (max-width: 600px) {
          .rec-grid-2 { grid-template-columns: 1fr !important; }
        }
      `}),(0,o.jsxs)("div",{className:"rec-split",children:[(0,o.jsxs)("div",{className:"rec-left",children:[(0,o.jsxs)("div",{className:"flex items-center gap-3 mb-8",children:[(0,o.jsx)("div",{style:{width:20,height:1,background:"#e67e22"}}),(0,o.jsx)("span",{style:{fontSize:9,letterSpacing:"0.28em",fontWeight:700,textTransform:"uppercase",color:"#e67e22"},children:"Partagez votre réseau"})]}),(0,o.jsxs)("h1",{className:"font-bold text-primary leading-tight mb-6",style:{letterSpacing:"-0.01em"},children:[(0,o.jsx)("span",{className:"font-sans not-italic text-5xl",style:{display:"block",lineHeight:1,marginBottom:-6},children:"Recommander"}),(0,o.jsx)("span",{className:"font-display italic text-6xl",style:{display:"block",lineHeight:1.05},children:"un producteur"})]}),(0,o.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:12,background:"#f5f2ed",borderRadius:14,padding:"10px 16px",marginBottom:"2rem",width:"fit-content"},children:[(0,o.jsx)("div",{style:{width:8,height:8,background:"#e67e22",borderRadius:"50%",flexShrink:0,animation:"recPulse 2s infinite"}}),(0,o.jsxs)("span",{style:{fontSize:11,color:"#7a6e62"},children:["On a hâte de ",(0,o.jsx)("strong",{style:{color:"#1a2e1a"},children:"découvrir vos pépites !"})]})]}),m?(0,o.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[(0,o.jsx)("div",{style:{width:56,height:56,borderRadius:"50%",background:"#1a2e1a",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 30px rgba(26,46,26,0.2)"},children:(0,o.jsx)("svg",{width:"24",height:"24",viewBox:"0 0 34 34",fill:"none",children:(0,o.jsx)("path",{d:"M8 17.5L14 23.5L26 11",stroke:"#fff",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round"})})}),(0,o.jsx)("h2",{className:"font-display italic font-bold text-primary",style:{fontSize:22},children:"Recommandation envoyée !"}),(0,o.jsxs)("p",{style:{fontSize:13,color:"#7a6e62",lineHeight:1.7},children:["Merci pour votre coup de pouce. On contactera ",(0,o.jsx)("strong",{children:r.producerName||"ce producteur"})," dans les prochains jours pour lui présenter Terrago."]}),(0,o.jsxs)("button",{onClick:()=>f(!1),style:{background:"none",border:"none",fontFamily:"inherit",fontSize:10,fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:"#1a2e1a",cursor:"pointer",display:"flex",alignItems:"center",gap:6,padding:0},onMouseEnter:e=>e.currentTarget.style.color="#e67e22",onMouseLeave:e=>e.currentTarget.style.color="#1a2e1a",children:["Envoyer une autre recommandation",(0,o.jsx)("span",{className:"material-symbols-outlined",style:{fontSize:16},children:"arrow_forward"})]})]}):(0,o.jsxs)("form",{onSubmit:g,style:{display:"flex",flexDirection:"column",gap:14},children:[x&&(0,o.jsxs)("div",{style:{background:"rgba(230,126,34,0.07)",border:"1px solid rgba(230,126,34,0.2)",borderRadius:12,padding:"10px 16px",display:"flex",gap:10,alignItems:"center"},children:[(0,o.jsx)("span",{style:{fontSize:15},children:"⚠️"}),(0,o.jsx)("p",{style:{fontSize:11,color:"#c0620a",fontWeight:600,margin:0},children:x})]}),(0,o.jsx)(s,{label:"Nom du producteur ou de l'exploitation",required:!0,children:(0,o.jsx)("input",{className:"rec-i",placeholder:"ex: Domaine des Oliviers",value:r.producerName,onChange:e=>d(r=>({...r,producerName:e.target.value}))})}),(0,o.jsxs)("div",{className:"rec-grid-2",style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14},children:[(0,o.jsx)(s,{label:"Votre nom",required:!0,children:(0,o.jsx)("input",{className:"rec-i",placeholder:"ex: Marie Dupont",value:r.yourName,onChange:e=>d(r=>({...r,yourName:e.target.value}))})}),(0,o.jsx)(s,{label:"Votre email",required:!0,children:(0,o.jsx)("input",{className:"rec-i",type:"email",placeholder:"votre@email.com",value:r.yourEmail,onChange:e=>d(r=>({...r,yourEmail:e.target.value}))})})]}),(0,o.jsx)(s,{label:"Contact du producteur (email ou téléphone)",children:(0,o.jsx)("input",{className:"rec-i",placeholder:"ex: contact@domaine.fr ou 06 12 34 56 78",value:r.producerContact,onChange:e=>d(r=>({...r,producerContact:e.target.value}))})}),(0,o.jsx)(s,{label:"Quelques mots (secteur, région, pourquoi vous le recommandez)",children:(0,o.jsx)("textarea",{className:"rec-i",rows:4,style:{resize:"none",lineHeight:1.6},placeholder:"ex: Viticulteur en Bourgogne, accueil déjà en place, très investi dans la transmission...",value:r.message,onChange:e=>d(r=>({...r,message:e.target.value}))})}),(0,o.jsx)("button",{type:"submit",disabled:p,style:{marginTop:6,width:"100%",padding:"14px 28px",borderRadius:9999,background:"#1a2e1a",color:"#fff",border:"none",fontFamily:"inherit",fontSize:10,fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",cursor:p?"not-allowed":"pointer",opacity:p?.7:1,display:"flex",alignItems:"center",justifyContent:"center",gap:8,transition:"background .2s ease"},onMouseOver:e=>{p||(e.currentTarget.style.background="#2b3e24")},onMouseOut:e=>{e.currentTarget.style.background="#1a2e1a"},children:p?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("span",{style:{width:14,height:14,border:"2px solid rgba(255,255,255,.3)",borderTopColor:"#fff",borderRadius:"50%",animation:"recSpin .7s linear infinite",display:"inline-block"}}),"Envoi…"]}):(0,o.jsxs)(o.Fragment,{children:["Envoyer la recommandation",(0,o.jsxs)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,o.jsx)("line",{x1:"22",y1:"2",x2:"11",y2:"13"}),(0,o.jsx)("polygon",{points:"22 2 15 22 11 13 2 9 22 2"})]})]})}),(0,o.jsx)("p",{style:{fontSize:9,color:"#b0a89e",lineHeight:1.7,textAlign:"center"},children:"En envoyant ce formulaire, vous acceptez que Terrago utilise ces informations pour contacter le producteur recommandé. Nous ne revendons pas vos données."})]})]}),(0,o.jsx)("div",{className:"rec-right",children:(0,o.jsx)("div",{className:"photo-grid",children:l.map((e,r)=>(0,o.jsx)("div",{className:`photo-col photo-col-${r}`,children:e.map((e,t)=>(0,o.jsx)("div",{className:"photo-item",style:{height:c[r][t]},children:(0,o.jsx)("img",{src:e,alt:"",loading:"lazy"})},t))},r))})})]}),"mobile"===e&&(0,o.jsx)("div",{className:"rec-photos-mobile",children:n.slice(0,10).map((e,r)=>(0,o.jsx)("div",{style:{borderRadius:14,overflow:"hidden",flexShrink:0,width:"72vw",maxWidth:280},children:(0,o.jsx)("img",{src:e,alt:"",style:{width:"100%",height:220,objectFit:"cover",display:"block"}})},r))})]})}])}]);