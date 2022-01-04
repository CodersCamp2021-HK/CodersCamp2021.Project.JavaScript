var he=Object.defineProperty,ge=Object.defineProperties;var fe=Object.getOwnPropertyDescriptors;var A=Object.getOwnPropertySymbols;var K=Object.prototype.hasOwnProperty,Z=Object.prototype.propertyIsEnumerable;var V=(t,e,n)=>e in t?he(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,F=(t,e)=>{for(var n in e||(e={}))K.call(e,n)&&V(t,n,e[n]);if(A)for(var n of A(e))Z.call(e,n)&&V(t,n,e[n]);return t},X=(t,e)=>ge(t,fe(e));var Y=(t,e)=>{var n={};for(var o in t)K.call(t,o)&&e.indexOf(o)<0&&(n[o]=t[o]);if(t!=null&&A)for(var o of A(t))e.indexOf(o)<0&&Z.call(t,o)&&(n[o]=t[o]);return n};var ee=(t,e,n)=>{if(!e.has(t))throw TypeError("Cannot "+n)};var f=(t,e,n)=>(ee(t,e,"read from private field"),n?n.call(t):e.get(t)),N=(t,e,n)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,n)},Q=(t,e,n,o)=>(ee(t,e,"write to private field"),o?o.call(t,n):e.set(t,n),n);import{_ as m}from"./vendor.37e44902.js";const $e=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}};$e();function te({html:t}){if(!m.isString(t))throw new Error('Invalid argument "html", expected string');const e=document.createElement("div");e.innerHTML=t.trim();const n=e.firstElementChild;if(n===null)throw new Error(`Invalid "html" format: ${t.trim()}`);return n}function H({element:t,on:e,selector:n}){if(!m.isElement(t))throw new Error('Invalid argument "element", expected HTMLElement');const o=n!==void 0?e.querySelector(n):e;if(!m.isElement(o))throw new Error(`Not found element in "${e}" using selector "${n}"`);if(!m.isElement(o.parentNode))throw new Error("Expected selected element to have parent node");return o.parentNode.replaceChild(t,o),t}function we({html:t,on:e,selector:n}){const o=te({html:t});return H({element:o,on:e,selector:n})}function ve({factory:t,on:e,selector:n}){const o=n!==void 0?[...e.querySelectorAll(n)]:[e];if(o.length===0)throw new Error(`Not found element in "${e}" using selector "${n}"`);return o.map(s=>H({element:t(),on:s}))}const L=({html:t,element:e,factory:n,on:o,selector:s})=>{if(!m.isElement(o))throw new Error('Invalid argument "on", expected HTMLElement');if(s!==void 0&&!m.isString(s))throw new Error('Invalid argument "selector", expected string');const r=[[t,()=>we({html:t,on:o,selector:s})],[e,()=>H({element:e,on:o,selector:s})],[n,()=>ve({factory:n,on:o,selector:s})]];let c,i=0;for(const[u,p]of r)u!==void 0&&(i+=1,c=p);if(i!==1)throw new Error('Invalid overload, expected one of ["html","element","factory"]');return c()},be=Symbol("UNSAFE_TAG"),ye={cond:m.isArray,parse:(t,e)=>t.reduce((n,o)=>[...n,e.parse(o)],[]).join(" ")},xe={cond:t=>t&&t[be]===!0,parse:t=>t.code},Ce={cond:m.isElement,parse:(t,e)=>e.emplace(t)},ke={cond:m.isObjectLike,parse:t=>m.escape(`${JSON.stringify(t)}`)},Be=[ye,xe,Ce,ke],ne="___HTML_LITERAL_PARSER_CONTEXT_TOKEN___";var T;class ze{constructor(){N(this,T,[])}parse(e){for(const n of Be)if(n.cond(e))return n.parse(e,this);return m.escape(`${e}`)}emplace(e){return f(this,T).push(e),`<slot id="${ne}"></slot>`}render(e){if(f(this,T).length===0)return e;let n=0;return L({factory:()=>f(this,T)[n++],on:e,selector:`#${ne}`}),e}}T=new WeakMap;function l(t,...e){const{raw:n}=t,o=new ze,s=`${e.reduce((c,i,u)=>`${c}${n[u]}${o.parse(i)}`,"")}${n[n.length-1]}`,r=te({html:s});return o.render(r)}var x,I;class Ee{constructor(e,n){N(this,x,void 0);N(this,I,void 0);Q(this,x,e),Q(this,I,n)}goto(e){var o;if(!(e.page in f(this,x)))throw new Error(`Invalid props.page argument ${e.page}, expected: one of [${Object.keys(f(this,x)).join(",")}]`);const n=f(this,x)[e.page](X(F({},(o=e==null?void 0:e.data)!=null?o:{}),{router:this}));f(this,I).innerHTML="<div></div>",L({element:n,on:f(this,I).firstElementChild})}}x=new WeakMap,I=new WeakMap;const Te="_Button_uqiwy_1",Ie="_ButtonNormal_uqiwy_16 _Button_uqiwy_1",Se="_ButtonMain_uqiwy_29 _Button_uqiwy_1",Le="_ButtonOutlined_uqiwy_38 _Button_uqiwy_1",qe="_ButtonNextQuestion_uqiwy_47 _Button_uqiwy_1",je="_ButtonGameMode_uqiwy_62 _Button_uqiwy_1";var q={Button:Te,ButtonNormal:Ie,ButtonMain:Se,ButtonOutlined:Le,ButtonNextQuestion:qe,ButtonGameMode:je};function $({text:t,onClick:e,variant:n="normal",disabled:o=!1,id:s}){const r={normal:q.ButtonNormal,main:q.ButtonMain,outlined:q.ButtonOutlined,nextQuestion:q.ButtonNextQuestion,gameMode:q.ButtonGameMode},c=n==="nextQuestion"?l`<span>${t} &#8594</span>`:t,i=l`<button
      class="${r[n]}"
      type="${e==="submit"?"submit":"button"}"
      ${o?" disabled":""}
      ${s?`id=${s}`:""}
    >
      ${c}
    </button>`;return e!=="submit"&&i.addEventListener("click",e),i}const Ae="_heading_jhr6q_1",Ne="_container_jhr6q_9",Pe="_containerFullWidth_jhr6q_14",We="_containerHalfWidth_jhr6q_18",Re="_selectedType_jhr6q_27";var k={heading:Ae,container:Ne,containerFullWidth:Pe,containerHalfWidth:We,selectedType:Re};function oe({onSelect:t,heading:e,categories:n,layout:o="default"}){const s={default:k.containerFullWidth,halfWidth:k.containerHalfWidth},r=i=>{const p=i.target.parentElement.querySelectorAll("button");i.target.matches("button")&&([...p].forEach(a=>{a.classList.remove(k.selectedType)}),i.target.classList.add(k.selectedType),t(i.target))},c=()=>n.map(i=>$({onClick:u=>{r(u)},text:i.text,variant:"gameMode",id:i.id}));return l`<div>
    <h3 class="${k.heading}">${e}</h3>
    <div class="${k.container} ${s[o]}">${c()}</div>
  </div>`}const Oe="_box_b3vq0_1",De="_boxRulesText_b3vq0_33";var G={box:Oe,boxRulesText:De};const Me=Object.freeze({character:"Musisz wskaza\u0107, kt\xF3ra posta\u0107 jest przedstawiona na obrazie. Pytania jednokrotnego wyboru.",episode:"Musisz wskaza\u0107 postacie, kt\xF3re wyst\u0119powa\u0142y w danym odcinku. Pytania wielokrotnego wyboru.",location:"Musisz wskaza\u0107 postacie, kt\xF3re mieszkaj\u0105 w danej lokacji. Pytania wielokrotnego wyboru.",mixed:"Pytania z ka\u017Cdej kategorii."}),Fe=Object.freeze({easy:"Dwie odpowiedzi na ka\u017Cde pytanie. Za poprawn\u0105 odpowied\u017A otrzymujesz 1 punkt.",hard:"Cztery odpowiedzi na ka\u017Cde pytanie. Za poprawn\u0105 odpowied\u017A otrzymujesz 2 punkty."});function se({category:t,difficulty:e}={}){return l`<div class="${G.box}">
    ${t?l`<section>
          <h3>O kategorii</h3>
          <p class="${G.boxRulesText}">${Me[t]}</p>
        </section>`:""}
    ${e?l`<section>
          <h3>O poziomie trudności</h3>
          <p class="${G.boxRulesText}">${Fe[e]}</p>
        </section>`:""}
  </div>`}const Qe="_container_akq8x_1",He="_timerOuterWrapper_akq8x_9",Ge="_timerInnerWrapper_akq8x_13",Je="_text_akq8x_17",Ue="_counter_akq8x_23",Ke="_circle_akq8x_34",Ze="_countdown_akq8x_1";var b={container:Qe,timerOuterWrapper:He,timerInnerWrapper:Ge,text:Je,counter:Ue,circle:Ke,countdown:Ze};function Ve({startingMinutes:t,onFinish:e,stopTimer:n}){let o=t*60,s;const r=l`<span class="${b.counter}">00:00</span>`,c=C=>{const S=new Date(C*1e3),D=S.getUTCMinutes().toString().padStart(2,"0"),M=S.getUTCSeconds().toString().padStart(2,"0");return`${D}:${M}`};r.textContent=c(o);const i=()=>{clearInterval(s)},u=()=>{o-=1,r.textContent=c(o),o===0&&(i(),e())};(()=>{s=setInterval(u,1e3)})(),n(i);const a=l` <div class="${b.timerOuterWrapper}">
    ${r}
    <div class="${b.timerInnerWrapper}">
      <svg width="100%" height="auto" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="98" cy="98" r="86.5" stroke="#B2FF59" stroke-width="15" />
        <g filter="url(#a)">
          <circle
            class="${b.circle}"
            cx="98"
            cy="98"
            r="86.5"
            stroke="#fff"
            stroke-width="15"
            shape-rendering="crispEdges"
          />
        </g>
        <defs>
          <filter
            id="a"
            x="0"
            y="0"
            width="200"
            height="200"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_65_277" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow_65_277" result="shape" />
          </filter>
        </defs>
      </svg>
    </div>
  </div>`,d=l`<div class="${b.container}">
    <p class="${b.text}">pozostały</p>
    ${a}
    <p class="${b.text}">czas</p>
  </div>`;return(()=>{d.style.setProperty("--animation-time",`${o}s`)})(),d}const Xe="_questionContainer_80312_1",Ye="_questionText_80312_15",et="_content_80312_29",tt="_characterImageDiv_80312_45",nt="_answersContainer_80312_69",ot="_answer_80312_69",st="_answerItem_80312_123",rt="_answerText_80312_167",at="_selected_80312_183";var _={questionContainer:Xe,questionText:Ye,content:et,characterImageDiv:tt,answersContainer:nt,answer:ot,answerItem:st,answerText:rt,selected:at};function re(t){const{category:e}=t,n=a=>a.category==="character"?"Co to za posta\u0107?":a.category==="episode"?`Kto gra\u0142 w odcinku ${a.name}?`:`Kt\xF3re postaci mieszkaj\u0105 w miejscu ${a.name}?`,o=["A","B","C","D"],s=e==="character"?t.answers.map((a,d)=>l`<div id="${d}" class="${_.answer}" title="${a.name}">
            <div class="${_.answerItem}">${o[d]}</div>
            <p class="${_.answerText}">${a.name}</p>
          </div>`):t.answers.map((a,d)=>l`<div id="${d}" class="${_.answer}" title="${a.name}">
            <div class="${_.answerItem}"><img src="${a.image}" alt="${a.name}" /></div>
            <p class="${_.answerText}">${a.name}</p>
          </div>`),r=e==="character"?l`<div id="question" class="${_.questionContainer}">
          <p class="${_.questionText}">${n(t)}</p>
          <div class="${_.content}">
            <div class="${_.characterImageDiv}">
              <img src="${t.image}" alt="Zdjęcie postaci" />
            </div>
            <div class="${_.answersContainer}">${s}</div>
          </div>
        </div>`:l`<div id="question" class="${_.questionContainer}">
          <p class="${_.questionText}">${n(t)}</p>
          <div class="${_.answersContainer}">${s}</div>
        </div>`;s.forEach(a=>{a.addEventListener("click",()=>{e==="character"?(s.forEach(d=>d.classList.remove(`${_.selected}`)),a.classList.add(`${_.selected}`)):a.classList.toggle(`${_.selected}`)})});const c=()=>t.answers.filter(a=>a.correct),i=()=>s.filter(a=>a.classList.contains(`${_.selected}`)).map(a=>t.answers[`${a.id}`]),u=()=>s.every(a=>a.classList.contains(`${_.selected}`)===t.answers[`${a.id}`].correct);return{question:r,getFullAnswer:()=>({category:e,whatIsQuestionAbout:e==="character"?t.image:t.name,correctAnswers:c(),userAnswers:i(),correct:u()})}}var ct="/CodersCamp2021.Project.JavaScript/assets/RickAndMortyLogo.1ac536b4.png";const it="_bgDecoration_ttcpo_25",lt="_float_ttcpo_1",dt="_bgDecoration1_ttcpo_37 _bgDecoration_ttcpo_25",ut="_bgDecoration2_ttcpo_49 _bgDecoration_ttcpo_25",pt="_bgDecoration3_ttcpo_67 _bgDecoration_ttcpo_25",mt="_bgDecoration4_ttcpo_87 _bgDecoration_ttcpo_25";var P={bgDecoration:it,float:lt,bgDecoration1:dt,bgDecoration2:ut,bgDecoration3:pt,bgDecoration4:mt},_t="/CodersCamp2021.Project.JavaScript/assets/ellipse.6fb4d33e.svg";function ht(){const t=e=>l`<div class="${e}">
      <img src="${_t}" alt="" />
    </div>`;return l`<div>
    ${t(P.bgDecoration1)} ${t(P.bgDecoration2)}
    ${t(P.bgDecoration3)} ${t(P.bgDecoration4)}
  </div>`}const gt="_blobBox_hi6nu_1",ft="_count_hi6nu_13";var ae={blobBox:gt,count:ft},J="/CodersCamp2021.Project.JavaScript/assets/blob.5f1326be.svg";function $t({initialCount:t=1}={}){let e=t;const n=l`<span class="${ae.count}">${e}</span>`,o=()=>{e+=1,n.textContent=e.toString()},s=()=>e;return{element:l`<div class="${ae.blobBox}">
    <img src="${J}" alt="" />
    ${n}
  </div>`,increment:o,getCount:s}}const wt="_input_sygne_1";var vt={input:wt};function bt({id:t,minCharacters:e,maxCharacters:n=20,onChange:o}){const s=l`<input
      class="${vt.input}"
      type="text"
      minlength="${e||1}"
      maxlength="${n}"
      placeholder="Nazwa gracza"
      required
    />`;return t&&(s.id=t,s.name=t),s.addEventListener("input",o),s}const yt="_blobBox_1mpo0_1",xt="_crossIcon_1mpo0_13";var ce={blobBox:yt,crossIcon:xt};const Ct=l`<svg class="${ce.crossIcon}" viewBox="0 0 45 38" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M44.0715 3.82361L39.6329 0L22.0357 15.1588L4.43863 0L0 3.82361L17.5971 18.9824L0 34.1413L4.43863 37.9649L22.0357 22.8061L39.6329 37.9649L44.0715 34.1413L26.4744 18.9824L44.0715 3.82361Z"
  />
</svg>`;function ie({onClick:t}){const e=l`<button type="button" class="${ce.blobBox}" aria-label="Zamknij">
    <img src="${J}" alt="" />
    ${Ct}
  </button>`;return e.addEventListener("click",t),e}function le(t){const e=JSON.parse(localStorage.getItem(t));return e!=null?e:{category:t,userData:[]}}function kt(t,e,n,o){const s=le(n);return s.userData.push({username:t,points:e,id:o}),window.localStorage.setItem(n,JSON.stringify(s)),s}var Bt="/CodersCamp2021.Project.JavaScript/assets/RicksHead.583a37a3.png";const zt="_wrapper_17bww_1",Et="_panel_17bww_14",Tt="_panelWithAttachment_17bww_29 _panel_17bww_14",It="_content_17bww_35",St="_logoWrapper_17bww_41",Lt="_headWrapper_17bww_53",qt="_topLeft_17bww_67",jt="_topRight_17bww_68",At="_botRight_17bww_69",Nt="_topAttachment_17bww_101";var g={wrapper:zt,panel:Et,panelWithAttachment:Tt,content:It,logoWrapper:St,headWrapper:Lt,topLeft:qt,topRight:jt,botRight:At,topAttachment:Nt};const Pt=l`<div class="${g.headWrapper}"><img src="${Bt}" alt="Głowa Ricka." /></div>`,Wt=l`<div class="${g.logoWrapper}"><img src="${ct}" alt="Logo serialu." /></div>`;function W({hasHead:t=!1,hasLogo:e=!1,hasBgDecoration:n=!1,topLeft:o,topRight:s,botRight:r,topAttachment:c,content:i}){const a=`
  margin-top: ${t||o||s||c?"var(--panel-padding)":"0"};
  margin-bottom: ${e||r?"var(--panel-padding)":"0"};
  `;return l`<div class="${g.wrapper}">
      ${n?ht():""}
      <section class="${c?g.panelWithAttachment:g.panel}" style="${a}">
        ${o?l`<div class="${g.topLeft}">${o}</div>`:""} ${t?Pt:""}
        ${s?l`<div class="${g.topRight}">${s}</div>`:""}
        ${c?l`<div class="${g.topAttachment}">${c}</div>`:""}
        <main class="${g.content}">${i}</main>
        ${e?Wt:""} ${r?l`<div class="${g.botRight}">${r}</div>`:""}
      </section>
    </div>`}const Rt="_mainBox_1e007_1",Ot="_image_1e007_10",Dt="_column_1e007_15",Mt="_heading_1e007_23",Ft="_questionText_1e007_30",Qt="_form_1e007_36";var B={mainBox:Rt,image:Ot,column:Dt,heading:Mt,questionText:Ft,form:Qt},Ht="/CodersCamp2021.Project.JavaScript/assets/CharactersCelebration.8e4cdbbc.png";function Gt({correctAnswers:t,close:e,category:n,difficulty:o,timeStamp:s}){const r=o==="hard"?2:1,c=t*r;let i="";const u=bt({id:"player-name",minCharacters:3,onChange:h=>{i=h.target.value}}),p=$({text:"Zapisz do rankingu",onClick:"submit"}),a=l`<form class="${B.form}">
      <label for="player-name" class="${B.questionText}">Wpisz swój nick:</label>
      ${u} ${p}
    </form>`;a.addEventListener("submit",h=>{h.preventDefault(),p.disabled=!0,u.disabled=!0,p.blur(),u.blur(),kt(i,c,n,s),e(s)});const d=r===1?`Tw\xF3j wynik to ${c} punkt\xF3w.`:`Odpowiedzia\u0142e\u015B poprawnie na ${t} pyta\u0144, co daje Ci ${c} punkt\xF3w.`;return W({topRight:ie({onClick:()=>e(null)}),content:l`<div class="${B.mainBox}">
      <img class="${B.image}" src="${Ht}" alt="Characters from the show dancing." />
      <div class=${B.column}>
        <header>
          <h3 class="${B.heading}">Gratulacje!</h3>
          <p>${d}</p>
        </header>
        ${a}
      </div>
    </div>`})}const Jt="_rankingContainer_1u4gx_1",Ut="_userScore_1u4gx_24",Kt="_blobBox_1u4gx_29",Zt="_userPosition_1u4gx_41";var j={rankingContainer:Jt,userScore:Ut,blobBox:Kt,userPosition:Zt};function de({id:t,category:e}){const n=le(e).userData;n.sort(function(d,h){return h.points-d.points});const o=document.createElement("div");o.className=j.rankingContainer;const s=document.createElement("table"),r=l`<table>
    <thead>
      <th>Nr</th>
      <th>Nazwa gracza</th>
      <th>Punkty</th>
    </thead>
  </table>`.firstElementChild;s.appendChild(r);const c=n.map(a=>a.username),i=n.map(a=>a.points),u=n.map(a=>a.id);let p=null;for(let a=0;a<n.length;a+=1){const d=document.createElement("tr"),h=document.createElement("td"),C=document.createElement("td"),S=document.createElement("td"),D=document.createTextNode(`${a+1}`),M=document.createTextNode(c[a]),_e=document.createTextNode(`${i[a]}`);u[a]===t?(d.className=j.userScore,h.className=j.blobBox,p=l`<div class="${j.blobBox}">
        <img src="${J}" alt="" />
        <span class="${j.userPosition}">${a+1}</span>
      </div>`,h.appendChild(p)):h.appendChild(D),C.appendChild(M),S.appendChild(_e),d.appendChild(h),d.appendChild(C),d.appendChild(S),s.appendChild(d)}return p!==null&&setTimeout(()=>{p.scrollIntoView({behavior:"smooth",block:"center"})},0),o.appendChild(s),o}const Vt="_answersWrapper_15z4z_1",Xt="_answersTable_15z4z_21",Yt="_tableCell_15z4z_53",en="_characterImage_15z4z_111",tn="_answerImagesContainer_15z4z_127",nn="_answerImage_15z4z_127",on="_correctIcon_15z4z_159";var w={answersWrapper:Vt,answersTable:Xt,tableCell:Yt,characterImage:en,answerImagesContainer:tn,answerImage:nn,correctIcon:on},sn="/CodersCamp2021.Project.JavaScript/assets/check.d70aa6f6.svg",rn="/CodersCamp2021.Project.JavaScript/assets/x.1db4bd65.svg";const ue=t=>{const e=document.createElement("img");return e.className=w.correctIcon,e.src=t?sn:rn,e.alt="",e},pe=(t,e)=>{t.forEach(n=>{const o=document.createElement("img");o.src=n.image,o.alt=n.name,o.title=n.name,o.className=w.answerImage,e.appendChild(o)})},an=(t,e)=>{const n=document.createTextNode(`${t}`),o=document.createElement("img"),s=document.createTextNode(`${e.correctAnswers[0].name}`),r=document.createTextNode(`${e.userAnswers[0]?e.userAnswers[0].name:""}`),c=ue(e.correct);return o.src=e.whatIsQuestionAbout,o.alt=e.correctAnswers[0].name,o.title=e.correctAnswers[0].name,o.className=w.characterImage,[n,o,s,r,c]},cn=(t,e)=>{const n=document.createTextNode(`${t}`),o=document.createTextNode(`${e.whatIsQuestionAbout}`),s=document.createElement("div"),r=document.createElement("div"),c=ue(e.correct);return s.className=w.answerImagesContainer,r.className=w.answerImagesContainer,pe(e.correctAnswers,s),pe(e.userAnswers,r),[n,o,s,r,c]};function ln(t){let e=1;const n=document.createElement("div");n.className=w.answersWrapper;const o=document.createElement("table");o.className=w.answersTable;const s=l`<table>
    <thead>
      <th>Nr</th>
      <th>Pytanie</th>
      <th>Poprawna odpowiedź</th>
      <th>Twoja odpowiedź</th>
      <th></th>
    </thead>
  </table>`.firstElementChild;o.appendChild(s);const r=document.createElement("tbody");return o.appendChild(r),t.forEach(c=>{const i=document.createElement("tr");i.className=w.tableRow;const u=[0,1,2,3,4].map(()=>document.createElement("td")),p=c.category==="character"?an(e,c):cn(e,c);u.forEach((a,d)=>{a.className=w.tableCell,a.appendChild(p[d]),i.appendChild(a)}),r.appendChild(i),e+=1}),n.appendChild(o),n}var dn="/CodersCamp2021.Project.JavaScript/assets/HomeRickAndMorty.8c4693a2.png";const un="_homeSection_ar3yj_1",pn="_optionsPanel_ar3yj_12",mn="_featuredButtons_ar3yj_19",_n="_centered_ar3yj_29",hn="_image_ar3yj_34",gn="_hide_ar3yj_42",fn="_show_ar3yj_46";var z={homeSection:un,optionsPanel:pn,featuredButtons:mn,centered:_n,image:hn,hide:gn,show:fn};function $n({router:t}){let e=null,n=null;const o=l`<div class="${z.hide}">${se()}</div>`,s=$({text:"Rozpocznij quiz",variant:"main",disabled:!0,onClick:()=>{t.goto({page:"loading",data:{selectedCategory:e,selectedDifficulty:n}})}}),r=()=>{const c=e===null||n===null;s.disabled=c,o.className=z.show,L({element:se({category:e,difficulty:n}),on:o.firstElementChild})};return l` <section class="${z.homeSection}">
    <div class="${z.image}">
      <img src="${dn}" alt="Rick and Morty" />
      ${o}
    </div>
    <div class="${z.optionsPanel}">
      ${oe({onSelect:c=>{e=c.id,r()},heading:"Wybierz kategori\u0119",categories:[{id:"character",text:"Co to za posta\u0107"},{id:"episode",text:"Bohaterowie odcinka"},{id:"location",text:"Kto tu mieszka"},{id:"mixed",text:"Mieszane"}]})}
      ${oe({onSelect:c=>{n=c.id,r()},heading:"Wybierz poziom",categories:[{id:"easy",text:"\u0141atwy"},{id:"hard",text:"Trudny"}],layout:"halfWidth"})}

      <div class="${z.featuredButtons}">
        ${s}
        ${$({text:"Ranking",onClick:()=>{t.goto({page:"ranking",data:{category:"character"}})},variant:"outlined"})}
      </div>
    </div>
  </section>`}const wn="_wrapper_krzwy_1",vn="_column_krzwy_8",bn="_header_krzwy_18",yn="_info_krzwy_23",xn="_minorInfo_krzwy_28",Cn="_portalWrapper_krzwy_32",kn="_portal_krzwy_32",Bn="_portalSpin_krzwy_1";var v={wrapper:wn,column:vn,header:bn,info:yn,minorInfo:xn,portalWrapper:Cn,portal:kn,portalSpin:Bn},zn="/CodersCamp2021.Project.JavaScript/assets/portal.3a771970.png";const En="https://rickandmortyapi.com/api",Tn=t=>fetch(t,{cache:"force-cache"}).then(e=>e.json()),U=async(t,e)=>{const n=m.range(1,1+e).map(s=>`${En+t}?page=${s}`);return(await Promise.all(n.map(Tn))).flatMap(s=>s.error?[]:s.results)},In=t=>U("/character",t),Sn=t=>U("/location",t),Ln=t=>U("/episode",t);function me(t,e){const n=m.sample(e),o={category:"character",image:n.image,answers:[{name:n.name,correct:!0}]};return m.sampleSize(e.filter(r=>r.id!==n.id),t-1).forEach(r=>{o.answers.push({name:r.name,correct:!1})}),o.answers=m.shuffle(o.answers),o}function R(t,e,n){const o=m.sample(n);let s,r;"characters"in o?(s=o.characters,r="episode"):(s=o.residents,r="location");const c={category:r,name:o.name,answers:[]};let i;if(s.length===0)i=0;else{const a=Math.min(s.length,t);i=m.random(1,a)}return m.sampleSize(s,i).forEach(a=>{const d=parseInt(/[^/]+$/.exec(a)[0],10),h=e.find(C=>C.id===d);c.answers.push({name:h.name,image:h.image,correct:!0})}),m.sampleSize(e.filter(a=>!s.includes(a.url)),t-i).forEach(a=>c.answers.push({name:a.name,image:a.image,correct:!1})),c.answers=m.shuffle(c.answers),c}function qn(t,e,n,o){const s=m.sample(["character","episode","location"]);return s==="character"?me(t,e):s==="episode"?R(t,e,n):R(t,e,o)}function*jn(t,e,n=null,o=null){for(;;)n?o?yield qn(t,e,n,o):yield R(t,e,n):o?yield R(t,e,o):yield me(t,e)}const An=3,Nn=Object.freeze({character:"bohaterowie",location:"bohaterowie z lokacji",episode:"bohaterowie odcinka",mixed:"mieszane"}),Pn=Object.freeze({easy:"\u0142atwy",hard:"trudny"}),Wn=async(t,e)=>{const n=e==="easy"?2:4,o=Object.freeze({characters:42,locations:7,episodes:3}),s=await In(o.characters),r=t==="episode"||t==="mixed"?await Ln(o.episodes):null,c=t==="location"||t==="mixed"?await Sn(o.locations):null;return jn(n,s,r,c)},Rn=async(t,e)=>{const n=new Promise(s=>{setTimeout(s,e*1e3)}),[o]=await Promise.all([t,n]);return o};function On({router:t,selectedCategory:e,selectedDifficulty:n}){return Rn(Wn(e,n),An).then(o=>{t.goto({page:"quiz",data:{generator:o,selectedCategory:e,selectedDifficulty:n}})}),l`<div class="${v.wrapper}">
    <section class="${v.column}">
      <header><h1 class="${v.header}">Wybrałeś:</h1></header>
      <div class="${v.info}">Kategoria: ${Nn[e]}</div>
      <div class="${v.portalWrapper}">
        <img class="${v.portal}" src="${zn}" alt="A portal from the show." />
        <div class="${v.minorInfo}">ładowanie...</div>
      </div>
      <div class="${v.info}">Poziom: ${Pn[n]}</div>
    </section>
  </div>`}const Dn="_quizContainer_13k0e_1";var Mn={quizContainer:Dn};function Fn(o){var s=o,{generator:t,router:e}=s,n=Y(s,["generator","router"]);const r=[],{element:c,increment:i}=$t();let u;const p=()=>{u(),e.goto({page:"answers",data:F({allAnswers:r},n)})};let a=re(t.next().value);return W({hasHead:!0,hasLogo:!0,hasBgDecoration:!0,topLeft:c,topRight:ie({onClick:p}),botRight:Ve({startingMinutes:2,onFinish:p,stopTimer:d=>{u=d}}),content:l`<div class="${Mn.quizContainer}">
      ${a.question}
      ${$({onClick:d=>{d.preventDefault(),r.push(a.getFullAnswer()),a=re(t.next().value),i(),L({on:document.getElementById("question"),element:a.question})},text:"dalej",variant:"nextQuestion"})}
    </div>`})}const Qn="_wrapper_1bu1q_1",Hn="_popupOverlay_1bu1q_10",Gn="_container_1bu1q_17",Jn="_heading_1bu1q_24",Un="_score_1bu1q_31",Kn="_buttonRow_1bu1q_35";var E={wrapper:Qn,popupOverlay:Hn,container:Gn,heading:Jn,score:Un,buttonRow:Kn};function Zn({router:t,allAnswers:e,selectedCategory:n,selectedDifficulty:o}){const s=e.length,r=e.filter(p=>p.correct).length,c=l`<div class="${E.popupOverlay}"></div>`,i=Date.now(),u=()=>{const p=parseFloat(getComputedStyle(c).getPropertyValue("transition-duration"));c.style.opacity="0",setInterval(()=>{c.style.display="none"},p*1e3)};return c.appendChild(Gt({correctAnswers:r,difficulty:o,category:n,close:u,timeStamp:i})),l`<div class="${E.wrapper}">
    ${W({hasLogo:!0,content:l`<div class="${E.container}">
        <h3 class="${E.heading}">
          Poprawne odpowiedzi: <span class="${E.score}">${r}/${s}</span>
        </h3>
        ${ln(e)}
        <div class="${E.buttonRow}">
          ${$({text:"Spr\xF3buj jeszcze raz",onClick:()=>{t.goto({page:"loading",data:{selectedCategory:n,selectedDifficulty:o}})}})}
          ${$({text:"Wr\xF3\u0107 do ekranu startowego",onClick:()=>{t.goto({page:"home"})}})}
          ${$({text:"Ranking",disabled:!1,onClick:()=>{t.goto({page:"ranking",data:{id:i,category:n}})}})}
        </div>
      </div>`})}
    ${c}
  </div>`}const Vn="_flexContainer_1h77o_1",Xn="_flexBtn_1h77o_11",Yn="_flexBtnFocus_1h77o_30",eo="_rectangle_1h77o_36",to="_text_1h77o_43";var y={flexContainer:Vn,flexBtn:Xn,flexBtnFocus:Yn,rectangle:eo,text:to};function O({text:t,onClick:e,id:n,selectedCategory:o}){const s=l`<button class="${y.flexBtn}" type="button" id="${n}">${t}</button>`;return o===n&&s.classList.add(y.flexBtnFocus),s.addEventListener("click",e),s}function no({router:t,id:e,category:n}){let o=de({id:e,category:n}),s=n;const r=i=>{document.getElementById(s).classList.remove(y.flexBtnFocus),s=i,document.getElementById(s).classList.add(y.flexBtnFocus),o=L({element:de({category:i}),on:o})},c=$({text:"Wr\xF3\u0107 do ekranu startowego",variant:"normal",onClick:()=>{t.goto({page:"home"})}});return W({hasLogo:!0,topAttachment:l`<div class=${y.flexContainer}>
      ${O({text:"Co to za posta\u0107",onClick:()=>{r("character")},id:"character",selectedCategory:n})}
      ${O({text:"Bohaterowie odcinka",onClick:()=>{r("episode")},id:"episode",selectedCategory:n})}
      ${O({text:"Kto tu mieszka",onClick:()=>{r("location")},id:"location",selectedCategory:n})}
      ${O({text:"Mieszane",onClick:()=>{r("mixed")},id:"mixed",selectedCategory:n})}
    </div>`,content:l`<div class=${y.rectangle}>
      <h1 class=${y.text}>Ranking</h1>
      ${o} ${c}
    </div>`})}const oo=Object.freeze({home:$n,loading:On,quiz:Fn,answers:Zn,ranking:no}),so=document.querySelector("#app"),ro=new Ee(oo,so);ro.goto({page:"home"});
