(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();class i{element;constructor(e){this.element=document.createElement(e.tag??"div"),this.createElement(e)}createElement(e){this.setTextContent(e.text),this.addCSSClasses(e.classes),this.setHidden(e.hidden),e.parent instanceof HTMLElement&&this.appendElement(e.parent)}getElement(){return this.element}setTextContent(e=""){this.element.textContent=e}addCSSClasses(e=[]){this.element.classList.add(...e)}setHidden(e=!1){this.element.hidden=e}appendElement(e){e.append(this.element)}}class te extends i{constructor(e){super({...e,tag:"footer"})}getElement(){if(this.element instanceof HTMLElement)return this.element;throw new Error("Element is not HTMLElement")}}class M extends i{constructor(e){super({...e,tag:"p"})}getElement(){if(this.element instanceof HTMLParagraphElement)return this.element;throw new Error("Element is not HTMLParagraphElement")}}class U extends i{constructor(e){super({...e,tag:"a"}),this.setHref(e.href),this.setTarget(e.target)}getElement(){if(this.element instanceof HTMLAnchorElement)return this.element;throw new Error("Element is not HTMLAnchorElement")}setHref(e){this.element instanceof HTMLAnchorElement&&(this.element.href=e)}setTarget(e){this.element instanceof HTMLAnchorElement&&(this.element.target=e)}}function ne(){const a=new te({classes:["footer"]}),e=new M({parent:a.getElement()}).getElement();e.textContent="© 2026";const t=new U({parent:a.getElement(),href:"https://rs.school/",target:"_blank"}).getElement();t.textContent="The Rolling Scopes School";const n=new U({parent:a.getElement(),href:"https://github.com/Atikin132",target:"_blank"}).getElement();return n.textContent="Atikin132",a.getElement()}class ae extends i{constructor(e){super({...e,tag:"header"})}getElement(){if(this.element instanceof HTMLElement)return this.element;throw new Error("Element is not HTMLElement")}}class re extends i{constructor(e){super({...e,tag:"nav"})}getElement(){if(this.element instanceof HTMLElement)return this.element;throw new Error("Element is not HTMLElement")}}class se extends i{constructor(e){super({...e,tag:"ul"})}getElement(){if(this.element instanceof HTMLUListElement)return this.element;throw new Error("Element is not HTMLUListElement")}}class D extends i{constructor(e){super({...e,tag:"li"})}getElement(){if(this.element instanceof HTMLLIElement)return this.element;throw new Error("Element is not HTMLLIElement")}}class g extends i{constructor(e){super({...e,tag:"button"})}getElement(){if(this.element instanceof HTMLButtonElement)return this.element;throw new Error("Element is not HTMLButtonElement")}}class k extends i{constructor(e,t){super({...t,tag:`h${e}`})}getElement(){if(this.element instanceof HTMLHeadingElement)return this.element;throw new Error("Element is not HTMLHeadingElement")}}const oe=1;function G(a){const e=new ae({classes:["header"]}),t=new M({parent:e.getElement(),classes:["page-title"]}).getElement();t.textContent=a==="garage"?"Garage":"Winners";const n=new k(oe,{parent:e.getElement(),classes:["app-title"]}).getElement();n.textContent="Async Race";const r=new re({parent:e.getElement(),classes:["nav"]}).getElement(),s=new se({parent:r,classes:["header-menu"]}).getElement(),o=new D({parent:s}).getElement(),l=new D({parent:s}).getElement(),c=new g({parent:o,classes:["garage-button","button"]}).getElement();c.dataset.route="garage";const m=new g({parent:l,classes:["winners-button","button"]}).getElement();return m.dataset.route="winners",e.getElement()}class ie extends i{constructor(e){super({...e,tag:"main"})}getElement(){if(this.element instanceof HTMLElement)return this.element;throw new Error("Element is not HTMLElement")}}class ce{pages=new Map;current;root;headerElement;main;footer;constructor(e){this.root=e}init(e){this.headerElement=G(e),this.main=new ie({classes:["main"]}).getElement(),this.footer=ne(),this.root.append(this.headerElement),this.root.append(this.main),this.root.append(this.footer)}register(e,t){this.pages.set(e,t),this.main&&t.create(this.main),t.hide()}navigate(e){this.current?.hide();const t=this.pages.get(e);t&&(this.current=t,t.show(),this.updateHeader(e))}updateHeader(e){if(!this.headerElement)return;const t=G(e);this.headerElement.replaceWith(t),this.headerElement=t}}function le(a){return a==="garage"||a==="winners"}class de{constructor(e){this.app=e}init(){document.addEventListener("click",e=>{const t=e.target;if(!(t instanceof HTMLElement))return;const n=t.dataset.route;n!==void 0&&le(n)&&this.app.navigate(n)})}}class $ extends i{constructor(e){super({...e,tag:"input"}),this.setPlaceholder(e.placeholder)}getElement(){if(this.element instanceof HTMLInputElement)return this.element;throw new Error("Element is not HTMLInputElement")}setPlaceholder(e=""){this.element instanceof HTMLInputElement&&(this.element.placeholder=e)}}const he=20;function pe(a){const e=new i({classes:["create-car-component-container"]}).getElement();e.addEventListener("click",l=>{const c=l.target;c instanceof HTMLElement&&c.closest(".create-button")&&a()});const t=new M({parent:e,text:"Create car"}).getElement();t.className="create-title";const n=new i({parent:e,classes:["create-container"]}).getElement(),r=new $({parent:n,classes:["input-text"],placeholder:"Input the name of the car"}).getElement();r.name="Input Text",r.maxLength=he;const s=new $({parent:n,classes:["input-color"],placeholder:""}).getElement();s.type="color";const o=new g({parent:n,classes:["create-button","button"]}).getElement();return o.textContent="Create",e}function ue(a,e,t){const n=new i({classes:["garage-control-buttons-container"]}).getElement();n.addEventListener("click",l=>{const c=l.target;c instanceof HTMLElement&&(c.closest(".start-race-btn")?a():c.closest(".reset-all-cars-btn")?e():c.closest(".generate-cars-btn")&&t())});const r=new g({parent:n,classes:["start-race-btn","button"]}).getElement();r.textContent="Race";const s=new g({parent:n,classes:["reset-all-cars-btn","button"]}).getElement();s.textContent="Reset";const o=new g({parent:n,classes:["generate-cars-btn","button"]}).getElement();return o.textContent="Generate Cars",n}const ge=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -640 1280 450" width="90" height="45">
  <g transform="scale(0.1, -0.1)" fill="currentColor" stroke="black" stroke-width="100">
<path d="M3565 5336 c-106 -30 -101 -26 -108 -111 -4 -42 -9 -80 -12 -85 -6
-10 -246 -105 -590 -234 -448 -167 -1052 -415 -1173 -483 -78 -43 -193 -91
-250 -104 -23 -5 -98 -14 -165 -19 -67 -6 -167 -19 -222 -30 -154 -31 -340
-49 -563 -57 l-203 -6 -43 -66 c-59 -91 -60 -95 -26 -130 37 -37 38 -65 3
-150 -25 -62 -27 -78 -31 -256 l-4 -190 -38 -32 c-91 -78 -133 -209 -134 -418
0 -194 11 -396 26 -482 13 -71 14 -74 72 -122 69 -58 130 -129 158 -184 64
-126 534 -211 1384 -250 l92 -4 -6 119 c-6 142 8 256 49 383 112 352 394 622
756 722 90 26 112 28 278 28 165 0 188 -2 278 -27 201 -56 361 -152 504 -302
140 -145 222 -293 274 -492 21 -79 24 -109 23 -279 -1 -127 -6 -214 -16 -263
l-15 -73 3006 7 c1653 4 3007 8 3009 9 1 1 -8 37 -20 81 -19 67 -22 105 -22
259 -1 166 1 187 27 279 117 421 467 736 885 797 119 17 325 7 432 -21 239
-63 453 -205 601 -399 70 -92 154 -267 185 -386 24 -88 27 -119 27 -260 1
-116 -4 -181 -16 -234 -10 -41 -16 -75 -15 -76 2 -1 62 2 133 6 266 16 458 45
525 79 48 24 97 81 127 146 l24 52 -16 157 c-15 152 -15 163 4 284 63 388 50
680 -35 802 -134 193 -526 336 -1429 519 -737 149 -1322 209 -2033 210 -228 0
-226 0 -347 85 -187 131 -1045 607 -1471 815 -383 187 -788 281 -1439 332
-208 17 -1106 16 -1400 0 -121 -7 -314 -19 -430 -27 -302 -22 -286 -22 -341
10 -140 81 -187 94 -269 71z m1885 -333 c6 -37 38 -238 71 -446 32 -209 66
-422 75 -474 9 -52 15 -96 13 -97 -11 -9 -1699 29 -1951 44 -206 13 -417 36
-485 54 -98 26 -198 119 -249 231 -35 75 -36 172 -5 255 17 45 30 61 68 86 83
54 135 80 253 127 341 136 858 230 1460 267 269 16 270 16 511 18 l227 2 12
-67z m630 47 c264 -18 777 -110 1029 -186 186 -56 445 -188 756 -387 211 -134
274 -181 250 -185 -75 -12 -133 -50 -162 -106 -19 -35 -21 -136 -4 -179 l11
-27 -907 2 -906 3 -59 160 c-110 302 -298 878 -298 916 0 6 95 2 290 -11z"/>
<path d="M2633 3125 c-223 -40 -410 -141 -568 -306 -132 -138 -213 -283 -262
-467 -22 -83 -26 -119 -26 -247 -1 -169 10 -236 65 -382 87 -230 271 -436 493
-551 85 -44 178 -78 271 -98 107 -23 312 -23 419 1 392 84 699 375 802 761 23
86 26 120 27 254 1 158 -5 199 -46 330 -98 310 -355 567 -668 669 -150 50
-354 64 -507 36z m350 -301 c249 -56 457 -247 543 -499 25 -72 28 -95 28 -220
1 -153 -15 -228 -74 -345 -94 -186 -283 -337 -485 -386 -96 -24 -268 -24 -360
0 -320 84 -544 355 -562 681 -20 359 209 673 558 765 94 24 253 26 352 4z"/>
<path d="M2600 2697 c-36 -13 -85 -36 -109 -51 l-44 -28 116 -115 c81 -82 120
-114 131 -110 14 6 16 29 16 167 0 186 6 178 -110 137z"/>
<path d="M2920 2561 c0 -139 2 -162 16 -168 11 -4 50 28 130 108 l115 114 -28
22 c-34 28 -138 70 -193 79 l-40 7 0 -162z"/>
<path d="M2282 2448 c-28 -36 -92 -191 -92 -225 0 -10 34 -13 165 -13 151 0
165 1 165 18 0 15 -206 232 -221 232 -4 0 -11 -6 -17 -12z"/>
<path d="M3222 2351 c-62 -59 -112 -115 -112 -124 0 -15 17 -17 165 -17 131 0
165 3 165 13 0 40 -69 205 -95 227 -7 6 -48 -27 -123 -99z"/>
<path d="M2781 2332 c-12 -22 11 -62 34 -62 8 0 21 10 29 22 20 28 4 58 -29
58 -13 0 -29 -8 -34 -18z"/>
<path d="M2749 2161 c-32 -33 -37 -67 -14 -110 29 -57 104 -64 151 -14 53 57
9 153 -71 153 -27 0 -44 -8 -66 -29z"/>
<path d="M2570 2125 c-26 -32 13 -81 48 -59 24 16 27 45 6 61 -23 17 -39 16
-54 -2z"/>
<path d="M3006 2124 c-20 -19 -20 -38 -2 -54 23 -19 61 -8 64 18 7 44 -32 67
-62 36z"/>
<path d="M2190 1975 c0 -29 41 -140 72 -194 l31 -53 117 117 c71 71 116 123
113 131 -4 11 -40 14 -169 14 -141 0 -164 -2 -164 -15z"/>
<path d="M3110 1972 c0 -9 51 -68 114 -131 l114 -114 31 54 c30 51 71 165 71
195 0 11 -31 14 -165 14 -151 0 -165 -1 -165 -18z"/>
<path d="M2780 1901 c-7 -15 -5 -24 8 -41 32 -40 85 -4 62 41 -14 25 -56 25
-70 0z"/>
<path d="M2562 1697 c-61 -62 -112 -115 -112 -119 0 -18 208 -108 249 -108 7
0 11 54 11 164 0 140 -2 165 -16 170 -9 3 -16 6 -17 6 -1 0 -53 -51 -115 -113z"/>
<path d="M2933 1803 c-15 -6 -19 -333 -4 -333 46 0 251 88 251 108 0 9 -223
232 -230 231 -3 0 -11 -3 -17 -6z"/>
<path d="M10700 3119 c-390 -84 -696 -376 -797 -759 -31 -117 -41 -292 -24
-411 33 -227 150 -453 318 -609 267 -250 643 -344 993 -249 117 32 283 118
380 196 487 396 518 1128 67 1560 -97 93 -166 140 -290 198 -137 64 -235 86
-407 91 -120 3 -162 0 -240 -17z m445 -313 c238 -81 409 -258 486 -506 30 -96
33 -289 5 -388 -110 -400 -513 -637 -911 -536 -149 38 -313 147 -402 267 -176
238 -203 533 -71 797 34 69 60 103 138 180 77 78 111 104 181 139 129 65 207
81 364 77 109 -3 143 -7 210 -30z"/>
<path d="M10703 2700 c-54 -19 -153 -71 -153 -80 0 -3 51 -57 114 -119 80 -80
119 -112 130 -108 14 5 16 29 16 167 l0 160 -27 -1 c-16 0 -52 -9 -80 -19z"/>
<path d="M11020 2561 c0 -139 2 -162 16 -168 22 -8 247 216 234 232 -17 20
-163 84 -207 91 l-43 7 0 -162z"/>
<path d="M10366 2424 c-29 -44 -76 -165 -76 -194 0 -19 7 -20 165 -20 126 0
165 3 165 13 0 7 -51 63 -114 126 l-114 114 -26 -39z"/>
<path d="M11313 2348 c-61 -62 -109 -119 -106 -125 6 -15 333 -19 333 -4 0 45
-88 241 -108 241 -4 0 -57 -51 -119 -112z"/>
<path d="M10882 2338 c-17 -17 -15 -32 7 -52 16 -14 23 -15 41 -6 31 17 24 64
-10 68 -14 2 -31 -3 -38 -10z"/>
<path d="M10846 2159 c-68 -81 17 -194 110 -144 89 48 56 175 -46 175 -30 0
-44 -6 -64 -31z"/>
<path d="M10670 2126 c-19 -23 -8 -61 18 -64 44 -7 67 32 36 62 -19 20 -38 20
-54 2z"/>
<path d="M11106 2127 c-21 -16 -18 -45 7 -61 37 -23 77 35 41 61 -10 7 -21 13
-24 13 -3 0 -14 -6 -24 -13z"/>
<path d="M10290 1970 c0 -29 43 -141 74 -195 l28 -48 116 116 c81 81 113 120
109 131 -6 14 -29 16 -167 16 -152 0 -160 -1 -160 -20z"/>
<path d="M11207 1978 c-3 -7 47 -66 111 -130 l116 -118 27 43 c27 44 79 177
79 203 0 12 -28 14 -164 14 -122 0 -166 -3 -169 -12z"/>
<path d="M10881 1901 c-14 -25 -5 -48 20 -56 27 -9 51 13 47 44 -4 34 -51 43
-67 12z"/>
<path d="M10662 1697 c-61 -62 -112 -115 -112 -119 0 -20 201 -108 247 -108
10 0 13 34 13 164 0 140 -2 165 -16 170 -9 3 -16 6 -17 6 -1 0 -53 -51 -115
-113z"/>
<path d="M11033 1803 c-10 -3 -13 -47 -13 -169 0 -90 4 -164 8 -164 36 0 186
61 239 98 16 10 -216 242 -234 235z"/>
  </g>
</svg>`;function q(a,e){return typeof a=="object"&&a!==null&&e in a&&typeof a[e]=="string"}function S(a,e){return typeof a=="object"&&a!==null&&e in a&&typeof a[e]=="number"}function me(a,e){return typeof a=="object"&&a!==null&&e in a&&typeof a[e]=="boolean"}const E="http://127.0.0.1:3000";function A(a){return typeof a=="object"&&a!==null&&q(a,"name")&&q(a,"color")}function we(a){return typeof a=="object"&&a!==null&&Array.isArray(a)&&a.every(e=>A(e))}function fe(a){return typeof a=="object"&&a!==null&&S(a,"velocity")&&S(a,"distance")}function Ce(a){return typeof a=="object"&&a!==null&&me(a,"success")}class Ee{abortControllers=new Map;async getCars(e,t,n){const r=new URLSearchParams;e!==void 0&&r.append("_page",e.toString()),t!==void 0&&r.append("_limit",t.toString());const s=`getCars-${e}-${t}`;this.abortControllers.get(s)?.abort();const o=new AbortController;this.abortControllers.set(s,o);const l=n||o.signal;try{const c=await fetch(`${E}/garage?${r.toString()}`,{signal:l}),m=await c.json();if(!we(m))return;const h=m,p=Number(c.headers.get("X-Total-Count"))||0;return{cars:h,totalCount:p}}catch(c){if(c instanceof Error&&c.name==="AbortError")return;throw c}finally{this.abortControllers.delete(s)}}async getCar(e){const t=await fetch(`${E}/garage/${e}`);if(!t.ok)return;const n=await t.json();if(A(n))return n}async createCar(e,t){const r=await(await fetch(`${E}/garage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,color:t})})).json();if(A(r))return r}async updateCar(e,t,n){const r=await fetch(`${E}/garage/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,color:n})});if(!r.ok)return;const s=await r.json();if(A(s))return s}async deleteCar(e){(await fetch(`${E}/garage/${e}`,{method:"DELETE"})).ok}async setEngineStatus(e,t){const n=await fetch(`${E}/engine?id=${e}&status=${t}`,{method:"PATCH"});if(!n.ok)return;const r=await n.json();if(!(!fe(r)&&!Ce(r)))return r}}const f=new Ee;var W=(a=>(a.Started="started",a.Stopped="stopped",a.Drive="drive",a))(W||{});const Te=2,Me=3;function Z(a,e,t){const n=new i({classes:["info-page-container"]}).getElement(),r=new k(Te,{parent:n}).getElement();r.textContent=`${a} (${e})`;const s=new k(Me,{parent:n}).getElement();return s.textContent=`Page #${t}`,n}class j{container=document.createElement("div");show(){this.container.style.display="flex"}hide(){this.container.style.display="none"}updatePaginationButtons(e,t,n,r=1){const s=document.querySelector(`${e} .prev-button`),o=document.querySelector(`${e} .next-button`);if(s){const l=t===r;s.classList.toggle("no-active",l),s.disabled=l}if(o){const l=t===n;o.classList.toggle("no-active",l),o.disabled=l}}}function ee(a,e){const t=new i({classes:["next-prev-container"]}).getElement();t.addEventListener("click",s=>{const o=s.target;o instanceof HTMLElement&&(o.closest(".prev-button")?a():o.closest(".next-button")&&e())});const n=new g({parent:t,classes:["prev-button","no-active","button"]}).getElement();n.disabled=!0,n.textContent="Prev";const r=new g({parent:t,classes:["next-button","no-active","button"]}).getElement();return r.disabled=!0,r.textContent="Next",t}const x="http://127.0.0.1:3000";function N(a){return typeof a=="object"&&a!==null&&S(a,"id")&&S(a,"wins")&&S(a,"time")}function be(a){return typeof a=="object"&&a!==null&&Array.isArray(a)&&a.every(e=>N(e))}class ve{abortControllers=new Map;async getWinners(e,t,n,r,s){const o=new URLSearchParams;e!==void 0&&o.append("_page",e.toString()),t!==void 0&&o.append("_limit",t.toString()),n!==void 0&&o.append("_sort",n),r!==void 0&&o.append("_order",r);const l=`getWinners-${e}-${t}`;this.abortControllers.get(l)?.abort();const c=new AbortController;this.abortControllers.set(l,c);const m=s||c.signal;try{const h=await fetch(`${x}/winners?${o.toString()}`,{signal:m}),p=await h.json();if(!be(p))return;const C=p,b=Number(h.headers.get("X-Total-Count"))||0;return{winners:C,totalCount:b}}catch(h){if(h instanceof Error&&h.name==="AbortError")return;throw h}finally{this.abortControllers.delete(l)}}async getWinner(e){const t=await fetch(`${x}/winners/${e}`);if(!t.ok)return;const n=await t.json();if(N(n))return n}async createWinner(e,t,n){const r=await fetch(`${x}/winners`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e,wins:t,time:n})});if(!r.ok)return;const s=await r.json();if(N(s))return s}async updateWinner(e,t,n){const r=await fetch(`${x}/winners/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e,wins:t,time:n})});if(!r.ok)return;const s=await r.json();if(N(s))return s}async deleteWinner(e){(await fetch(`${x}/winners/${e}`,{method:"DELETE"})).ok}}const L=new ve,X=10,P=1;class ye{page=P;winners=[];totalWinnersCount=0;_sortField;_sortOrder="ASC";get sortField(){return this._sortField}get sortOrder(){return this._sortOrder}async loadWinners(){const e=await L.getWinners(this.currentPage,X,this._sortField,this._sortOrder);if(!e){this.winners=[],this.totalWinnersCount=0;return}this.winners=e.winners,this.totalWinnersCount=e.totalCount}async createWinner(e,t,n){const r=await L.createWinner(e,t,n);if(r)return r}async updateWinner(e,t,n){const r=await L.updateWinner(e,t,n);if(r)return r}async deleteWinner(e){await L.deleteWinner(e)}get currentPage(){return this.page}get totalPages(){return Math.max(P,Math.ceil(this.totalWinnersCount/X))}async nextPage(){this.page<this.totalPages&&(this.page+=1,await this.loadWinners())}async prevPage(){this.page>P&&(this.page-=1,await this.loadWinners())}setSort(e){this._sortField===e?this._sortOrder=this._sortOrder==="ASC"?"DESC":"ASC":(this._sortField=e,this._sortOrder="ASC"),this.page=P}}const u=new ye;class T extends i{constructor(e){super({...e,tag:e.cellType??"td"})}getElement(){if(this.element instanceof HTMLTableCellElement)return this.element;throw new Error("Element is not HTMLTableCellElement")}}class xe extends i{constructor(e){super({...e,tag:"table"})}getElement(){if(this.element instanceof HTMLTableElement)return this.element;throw new Error("Element is not HTMLTableElement")}}class J extends i{constructor(e){super({...e,tag:"tr"})}getElement(){if(this.element instanceof HTMLTableRowElement)return this.element;throw new Error("Element is not HTMLTableRowElement")}}class K extends i{constructor(e){super({...e,tag:e.section})}getElement(){if(this.element instanceof HTMLTableSectionElement)return this.element;throw new Error("Element is not HTMLTableSectionElement")}}const Le=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -640 1280 450" width="50" height="25">
  <g transform="scale(0.1, -0.1)" fill="currentColor" stroke="black" stroke-width="100">
<path d="M3565 5336 c-106 -30 -101 -26 -108 -111 -4 -42 -9 -80 -12 -85 -6
-10 -246 -105 -590 -234 -448 -167 -1052 -415 -1173 -483 -78 -43 -193 -91
-250 -104 -23 -5 -98 -14 -165 -19 -67 -6 -167 -19 -222 -30 -154 -31 -340
-49 -563 -57 l-203 -6 -43 -66 c-59 -91 -60 -95 -26 -130 37 -37 38 -65 3
-150 -25 -62 -27 -78 -31 -256 l-4 -190 -38 -32 c-91 -78 -133 -209 -134 -418
0 -194 11 -396 26 -482 13 -71 14 -74 72 -122 69 -58 130 -129 158 -184 64
-126 534 -211 1384 -250 l92 -4 -6 119 c-6 142 8 256 49 383 112 352 394 622
756 722 90 26 112 28 278 28 165 0 188 -2 278 -27 201 -56 361 -152 504 -302
140 -145 222 -293 274 -492 21 -79 24 -109 23 -279 -1 -127 -6 -214 -16 -263
l-15 -73 3006 7 c1653 4 3007 8 3009 9 1 1 -8 37 -20 81 -19 67 -22 105 -22
259 -1 166 1 187 27 279 117 421 467 736 885 797 119 17 325 7 432 -21 239
-63 453 -205 601 -399 70 -92 154 -267 185 -386 24 -88 27 -119 27 -260 1
-116 -4 -181 -16 -234 -10 -41 -16 -75 -15 -76 2 -1 62 2 133 6 266 16 458 45
525 79 48 24 97 81 127 146 l24 52 -16 157 c-15 152 -15 163 4 284 63 388 50
680 -35 802 -134 193 -526 336 -1429 519 -737 149 -1322 209 -2033 210 -228 0
-226 0 -347 85 -187 131 -1045 607 -1471 815 -383 187 -788 281 -1439 332
-208 17 -1106 16 -1400 0 -121 -7 -314 -19 -430 -27 -302 -22 -286 -22 -341
10 -140 81 -187 94 -269 71z m1885 -333 c6 -37 38 -238 71 -446 32 -209 66
-422 75 -474 9 -52 15 -96 13 -97 -11 -9 -1699 29 -1951 44 -206 13 -417 36
-485 54 -98 26 -198 119 -249 231 -35 75 -36 172 -5 255 17 45 30 61 68 86 83
54 135 80 253 127 341 136 858 230 1460 267 269 16 270 16 511 18 l227 2 12
-67z m630 47 c264 -18 777 -110 1029 -186 186 -56 445 -188 756 -387 211 -134
274 -181 250 -185 -75 -12 -133 -50 -162 -106 -19 -35 -21 -136 -4 -179 l11
-27 -907 2 -906 3 -59 160 c-110 302 -298 878 -298 916 0 6 95 2 290 -11z"/>
<path d="M2633 3125 c-223 -40 -410 -141 -568 -306 -132 -138 -213 -283 -262
-467 -22 -83 -26 -119 -26 -247 -1 -169 10 -236 65 -382 87 -230 271 -436 493
-551 85 -44 178 -78 271 -98 107 -23 312 -23 419 1 392 84 699 375 802 761 23
86 26 120 27 254 1 158 -5 199 -46 330 -98 310 -355 567 -668 669 -150 50
-354 64 -507 36z m350 -301 c249 -56 457 -247 543 -499 25 -72 28 -95 28 -220
1 -153 -15 -228 -74 -345 -94 -186 -283 -337 -485 -386 -96 -24 -268 -24 -360
0 -320 84 -544 355 -562 681 -20 359 209 673 558 765 94 24 253 26 352 4z"/>
<path d="M2600 2697 c-36 -13 -85 -36 -109 -51 l-44 -28 116 -115 c81 -82 120
-114 131 -110 14 6 16 29 16 167 0 186 6 178 -110 137z"/>
<path d="M2920 2561 c0 -139 2 -162 16 -168 11 -4 50 28 130 108 l115 114 -28
22 c-34 28 -138 70 -193 79 l-40 7 0 -162z"/>
<path d="M2282 2448 c-28 -36 -92 -191 -92 -225 0 -10 34 -13 165 -13 151 0
165 1 165 18 0 15 -206 232 -221 232 -4 0 -11 -6 -17 -12z"/>
<path d="M3222 2351 c-62 -59 -112 -115 -112 -124 0 -15 17 -17 165 -17 131 0
165 3 165 13 0 40 -69 205 -95 227 -7 6 -48 -27 -123 -99z"/>
<path d="M2781 2332 c-12 -22 11 -62 34 -62 8 0 21 10 29 22 20 28 4 58 -29
58 -13 0 -29 -8 -34 -18z"/>
<path d="M2749 2161 c-32 -33 -37 -67 -14 -110 29 -57 104 -64 151 -14 53 57
9 153 -71 153 -27 0 -44 -8 -66 -29z"/>
<path d="M2570 2125 c-26 -32 13 -81 48 -59 24 16 27 45 6 61 -23 17 -39 16
-54 -2z"/>
<path d="M3006 2124 c-20 -19 -20 -38 -2 -54 23 -19 61 -8 64 18 7 44 -32 67
-62 36z"/>
<path d="M2190 1975 c0 -29 41 -140 72 -194 l31 -53 117 117 c71 71 116 123
113 131 -4 11 -40 14 -169 14 -141 0 -164 -2 -164 -15z"/>
<path d="M3110 1972 c0 -9 51 -68 114 -131 l114 -114 31 54 c30 51 71 165 71
195 0 11 -31 14 -165 14 -151 0 -165 -1 -165 -18z"/>
<path d="M2780 1901 c-7 -15 -5 -24 8 -41 32 -40 85 -4 62 41 -14 25 -56 25
-70 0z"/>
<path d="M2562 1697 c-61 -62 -112 -115 -112 -119 0 -18 208 -108 249 -108 7
0 11 54 11 164 0 140 -2 165 -16 170 -9 3 -16 6 -17 6 -1 0 -53 -51 -115 -113z"/>
<path d="M2933 1803 c-15 -6 -19 -333 -4 -333 46 0 251 88 251 108 0 9 -223
232 -230 231 -3 0 -11 -3 -17 -6z"/>
<path d="M10700 3119 c-390 -84 -696 -376 -797 -759 -31 -117 -41 -292 -24
-411 33 -227 150 -453 318 -609 267 -250 643 -344 993 -249 117 32 283 118
380 196 487 396 518 1128 67 1560 -97 93 -166 140 -290 198 -137 64 -235 86
-407 91 -120 3 -162 0 -240 -17z m445 -313 c238 -81 409 -258 486 -506 30 -96
33 -289 5 -388 -110 -400 -513 -637 -911 -536 -149 38 -313 147 -402 267 -176
238 -203 533 -71 797 34 69 60 103 138 180 77 78 111 104 181 139 129 65 207
81 364 77 109 -3 143 -7 210 -30z"/>
<path d="M10703 2700 c-54 -19 -153 -71 -153 -80 0 -3 51 -57 114 -119 80 -80
119 -112 130 -108 14 5 16 29 16 167 l0 160 -27 -1 c-16 0 -52 -9 -80 -19z"/>
<path d="M11020 2561 c0 -139 2 -162 16 -168 22 -8 247 216 234 232 -17 20
-163 84 -207 91 l-43 7 0 -162z"/>
<path d="M10366 2424 c-29 -44 -76 -165 -76 -194 0 -19 7 -20 165 -20 126 0
165 3 165 13 0 7 -51 63 -114 126 l-114 114 -26 -39z"/>
<path d="M11313 2348 c-61 -62 -109 -119 -106 -125 6 -15 333 -19 333 -4 0 45
-88 241 -108 241 -4 0 -57 -51 -119 -112z"/>
<path d="M10882 2338 c-17 -17 -15 -32 7 -52 16 -14 23 -15 41 -6 31 17 24 64
-10 68 -14 2 -31 -3 -38 -10z"/>
<path d="M10846 2159 c-68 -81 17 -194 110 -144 89 48 56 175 -46 175 -30 0
-44 -6 -64 -31z"/>
<path d="M10670 2126 c-19 -23 -8 -61 18 -64 44 -7 67 32 36 62 -19 20 -38 20
-54 2z"/>
<path d="M11106 2127 c-21 -16 -18 -45 7 -61 37 -23 77 35 41 61 -10 7 -21 13
-24 13 -3 0 -14 -6 -24 -13z"/>
<path d="M10290 1970 c0 -29 43 -141 74 -195 l28 -48 116 116 c81 81 113 120
109 131 -6 14 -29 16 -167 16 -152 0 -160 -1 -160 -20z"/>
<path d="M11207 1978 c-3 -7 47 -66 111 -130 l116 -118 27 43 c27 44 79 177
79 203 0 12 -28 14 -164 14 -122 0 -166 -3 -169 -12z"/>
<path d="M10881 1901 c-14 -25 -5 -48 20 -56 27 -9 51 13 47 44 -4 34 -51 43
-67 12z"/>
<path d="M10662 1697 c-61 -62 -112 -115 -112 -119 0 -20 201 -108 247 -108
10 0 13 34 13 164 0 140 -2 165 -16 170 -9 3 -16 6 -17 6 -1 0 -53 -51 -115
-113z"/>
<path d="M11033 1803 c-10 -3 -13 -47 -13 -169 0 -90 4 -164 8 -164 36 0 186
61 239 98 16 10 -216 242 -234 235z"/>
  </g>
</svg>`,Se=10,_e=9;function Ie(a,e,t){const n=new xe({classes:["winners-table"]}).getElement(),r=new K({section:"thead",parent:n}).getElement(),s=new J({parent:r}).getElement(),o=[{title:"Number"},{title:"Car"},{title:"Name"},{title:"Wins",sort:"wins"},{title:"Best time (seconds)",sort:"time"}];for(const h of o){const p=new T({text:h.title,cellType:"th",classes:["theader"],parent:s}).getElement();if(h.sort){p.classList.add("sortable"),p.dataset.sort=h.sort;const C=h.sort;p.addEventListener("click",()=>{t(C)})}}const l=new K({section:"tbody",classes:["tbody"],parent:n}).getElement(),c=`winners-table-${Date.now()}`;n.dataset.tableId=c;let m=e*Se-_e;for(const h of a){const p=new J({parent:l,classes:["trow"]}).getElement(),C=new T({parent:p,classes:["tcell"]}).getElement();C.textContent=m.toString();const b=new T({parent:p,classes:["tcell"]}).getElement(),I=new i({parent:b}).getElement();I.innerHTML=Le;const v=new T({parent:p,classes:["tcell"]}).getElement(),y=new T({parent:p,classes:["tcell"]}).getElement();y.textContent=h.wins.toString();const B=new T({parent:p,classes:["tcell"]}).getElement();B.textContent=h.time.toFixed(2),m+=1,(async()=>{if(n.dataset.tableId!==c)return;const w=await d.getCar(h.id);n.dataset.tableId===c&&w&&(I.style.color=w.color,v.textContent=w.name)})()}return n}class ze extends j{_winnersInfoTableContainer;_winnersTable;get winnersInfoTableContainer(){if(!this._winnersInfoTableContainer)throw new Error("winnersInfoTableContainer is not initialized");return this._winnersInfoTableContainer}get winnersTable(){if(!this._winnersTable)throw new Error("winnersTable is not initialized");return this._winnersTable}renderInfoContainer(){this.winnersInfoTableContainer.querySelector(".info-page-container")?.remove(),this.winnersInfoTableContainer.prepend(Z("Winners",u.totalWinnersCount,u.currentPage))}renderTable(){this.winnersTable.innerHTML="",this.winnersTable.append(Ie(u.winners,u.currentPage,async e=>{u.setSort(e),await this.update()}))}async update(){await u.loadWinners(),this.renderInfoContainer(),this.renderTable(),this.updatePaginationButtons(".winners",u.currentPage,u.totalPages),this.updateSortIndicators()}updateSortIndicators(){const e=this.container.querySelectorAll("th.sortable");for(const t of e){const n=t.dataset.sort;t.classList.remove("ASC","DESC"),n===u.sortField&&t.classList.add(u.sortOrder)}}create(e){e.append(this.container),this.container.className="winners",this._winnersInfoTableContainer=new i({parent:this.container,classes:["winners-info-table-container"]}).getElement(),this._winnersTable=new i({parent:this._winnersInfoTableContainer,classes:["winners-table-container"]}).getElement(),this.container.append(ee(async()=>{await u.prevPage(),await this.update()},async()=>{await u.nextPage(),await this.update()})),this.update().catch(()=>{throw new Error("Error loading winners")})}}const R=new ze,V=7,O=1,F=100,He=Number.parseInt("ffffff",16),Q="#000000",Pe="Car name",Y=1,Ae=1e3;class We{page=O;cars=[];totalCarCount=0;selectedCar={name:"",color:""};carControllers=[];winnerDetermined=!1;isRaceStart=!1;createInputText;createInputColor;updateInputText;updateInputColor;winnerText;initFormElements(e,t,n,r,s){this.createInputText=e,this.createInputColor=t,this.updateInputText=n,this.updateInputColor=r,this.winnerText=s}async loadCars(){const e=await f.getCars(this.page,V);if(!e){this.cars=[],this.totalCarCount=0;return}this.cars=e.cars,this.totalCarCount=e.totalCount}async getCar(e){return await f.getCar(e)}async createCar(){const e=this.createInputText?.value??"",t=this.createInputColor?.value??"";await f.createCar(e,t)}async updateCar(){const e=this.updateInputText,t=this.updateInputColor;this.selectedCar.id!==void 0&&e&&t&&(await f.updateCar(this.selectedCar.id,e.value,t.value),await R.update()),this.toggleUpdateElement(".update-container .input-text","",!1),this.toggleUpdateElement(".update-container .input-color",Q,!1),this.toggleUpdateElement(".update-container .update-button","",!1)}async deleteCar(e){await f.deleteCar(e),await u.deleteWinner(e),await R.update()}get currentPage(){return this.page}get totalPages(){return Math.max(O,Math.ceil(this.totalCarCount/V))}async nextPage(){this.page<this.totalPages&&(this.page+=1,await this.loadCars())}async prevPage(){this.page>O&&(this.page-=1,await this.loadCars())}selectCar(e,t,n){this.selectedCar.id=e,this.selectedCar.name=t,this.selectedCar.color=n,this.toggleUpdateElement(".update-container .input-text",t,!0),this.toggleUpdateElement(".update-container .input-color",n,!0),this.toggleUpdateElement(".update-container .update-button","",!0)}toggleUpdateElement(e,t,n){const r=document.querySelector(e);r&&(r.classList.toggle("no-active",!n),r.disabled=!n,r.value=n?t:"")}getCarBrands(){return["Toyota","Lexus","Volkswagen","Audi","Porsche","Bentley","Lamborghini","Dodge","Tesla","Maserati","Renault","Mitsubishi","Chevrolet","Ford","Volvo"]}getCarModels(){return["Camry","RX","Jetta","A5","911","Bentayga","Huracan","Challenger","Model S","MCPura","Scenic","Pajero","Silverado","Mustang","XC90"]}generateCarsName(){const e=[],t=this.getCarBrands(),n=this.getCarModels();for(let r=0;r<F;r+=1){const s=t[Math.floor(Math.random()*t.length)],o=n[Math.floor(Math.random()*n.length)];e.push(`${s} ${o}`)}return e}generateCarsColors(){const e=[];for(let t=0;t<F;t+=1){const n=`#${Math.floor(Math.random()*He).toString(16).padStart(6,"0")}`;e.push(n)}return e}async generateCars(){const e=this.generateCarsName(),t=this.generateCarsColors();for(let n=0;n<F;n+=1)await f.createCar(e[n]??Pe,t[n]??Q)}async startRace(){this.winnerDetermined=!1,this.isRaceStart=!0,await Promise.all(this.carControllers.map(e=>e.start()))}async onCarFinish(e,t){if(!d.winnerDetermined&&this.isRaceStart){d.winnerDetermined=!0;const n=Number(e),r=await L.getWinner(n),s=await this.getCar(n),o=Number((t/Ae).toFixed(2));if(r){const l=r.time<o?r.time:o;await u.updateWinner(n,r.wins+Y,l)}else await u.createWinner(n,Y,o);s!==void 0&&this.updateWinnerText(!0,`Winner is ${s.name}[${o.toFixed(2)}]`),await R.update()}}updateWinnerText(e,t=""){this.winnerText&&(this.winnerText.textContent=e?t:"",this.winnerText.classList.toggle("no-active",!e))}async resetAllCars(){this.updateWinnerText(!1),await Promise.all(this.carControllers.map(e=>e.reset()))}}const d=new We;class Ne{constructor(e,t,n,r,s,o){this.carId=e,this.carElement=t,this.roadElement=n,this.startButton=r,this.resetButton=s,this.onFinishCallback=o}animationId=void 0;onFinishCallback;setBtnsStatus(e){this.startButton.disabled=e,this.startButton.classList.toggle("no-active",e),this.resetButton.disabled=!e,this.resetButton.classList.toggle("no-active",!e)}async start(){this.setBtnsStatus(!0);const e=await f.setEngineStatus(this.carId,W.Started);if(!e||!("velocity"in e)){this.startButton.disabled=!1,this.startButton.classList.remove("no-active");return}const t=e.distance/e.velocity;this.startAnimation(t);const n=await f.setEngineStatus(this.carId,W.Drive);(!n||"success"in n&&!n.success)&&this.stopAnimation()}async reset(){this.stopAnimation(),d.isRaceStart=!1,await f.setEngineStatus(this.carId,W.Stopped),this.carElement.style.transform="translateX(0)",this.setBtnsStatus(!1)}startAnimation(e){const t=this.roadElement.clientWidth-this.carElement.clientWidth,n=performance.now(),r=s=>{const o=Math.min((s-n)/e,1);this.carElement.style.transform=`translateX(${o*t}px)`,o<1?this.animationId=requestAnimationFrame(r):this.onFinishCallback&&this.onFinishCallback(e)};this.animationId=requestAnimationFrame(r)}stopAnimation(){this.animationId!==void 0&&(cancelAnimationFrame(this.animationId),this.animationId=void 0)}}const Re="Car name",$e="#000000";function Be(a=Re,e=$e,t,n,r){const s=new i({classes:["race-container"]}).getElement();s.dataset.id=t,s.addEventListener("click",H=>{const w=H.target;w instanceof HTMLElement&&(w.closest(".edit-btns__select")?n():w.closest(".edit-btns__remove")?r(t):w.closest(".control-btns__start")?z.start():w.closest(".control-btns__reset")&&z.reset())});const o=new i({parent:s,classes:["edit-name-container"]}).getElement(),l=new i({parent:o,classes:["edit-btns"]}).getElement(),c=new g({parent:l,classes:["edit-btns__select","button"]}).getElement();c.textContent="Select";const m=new g({parent:l,classes:["edit-btns__remove","button"]}).getElement();m.textContent="Remove";const h=new M({parent:o,classes:["car-name"]}).getElement();h.textContent=a;const p=new i({parent:s,classes:["track-container"]}).getElement(),C=new i({parent:p,classes:["control-btns"]}).getElement(),b=new g({parent:C,classes:["control-btns__start","button"]}).getElement(),I=new g({parent:C,classes:["control-btns__reset","no-active","button"]}).getElement(),v=new i({parent:p,classes:["race-road-container"]}).getElement(),y=new i({parent:v,classes:["race-road-container__car"]}).getElement();y.style.color=e,y.innerHTML=ge;const B=new i({parent:v,classes:["race-road-container__finish"]}).getElement();B.textContent="";const z=new Ne(Number(t),y,v,b,I,async H=>{await d.onCarFinish(t,H)});return d.carControllers.push(z),s}const Oe=20;function Fe(a){const e=new i({classes:["update-car-component-container"]}).getElement();e.addEventListener("click",l=>{const c=l.target;c instanceof HTMLElement&&c.closest(".update-button")&&a()});const t=new M({parent:e,text:"Update car"}).getElement();t.className="update-title";const n=new i({parent:e,classes:["update-container"]}).getElement(),r=new $({parent:n,classes:["input-text","no-active"],placeholder:""}).getElement();r.name="Input Text",r.maxLength=Oe,r.disabled=!0;const s=new $({parent:n,classes:["input-color","no-active"],placeholder:""}).getElement();s.type="color",s.disabled=!0;const o=new g({parent:n,classes:["update-button","no-active","button"]}).getElement();return o.textContent="Update",e}class ke extends j{_carsContainer;_pageWinnerContainer;get carsContainer(){if(!this._carsContainer)throw new Error("carsContainer is not initialized");return this._carsContainer}get pageWinnerContainer(){if(!this._pageWinnerContainer)throw new Error("pageWinnerContainer is not initialized");return this._pageWinnerContainer}renderCars(){this.carsContainer.innerHTML="";for(const e of d.cars)e.id!==void 0&&this.carsContainer.append(Be(e.name,e.color,e.id.toString(),()=>{e.id!==void 0&&d.selectCar(e.id,e.name,e.color)},async()=>{e.id!==void 0&&await d.deleteCar(e.id),await this.update()}))}renderInfoContainer(){this.pageWinnerContainer.querySelector(".info-page-container")?.remove(),this.pageWinnerContainer.prepend(Z("Garage",d.totalCarCount,d.currentPage))}async update(){await d.loadCars(),d.carControllers.length=0,d.updateWinnerText(!1),this.renderInfoContainer(),this.renderCars(),this.updatePaginationButtons(".garage",d.currentPage,d.totalPages)}create(e){e.append(this.container),this.container.className="garage";const t=new i({parent:this.container,classes:["garage-control-container"]}).getElement();t.append(pe(async()=>{await d.createCar(),await this.update()})),t.append(Fe(async()=>{d.selectedCar.id!==void 0&&(await d.updateCar(),await this.update())})),t.append(ue(async()=>{await d.startRace()},async()=>{await d.resetAllCars()},async()=>{await d.generateCars(),await this.update()}));const n=new i({parent:this.container,classes:["garage-info-car-container"]}).getElement();this._pageWinnerContainer=new i({parent:n,classes:["page-winner-container"]}).getElement();const r=new M({parent:this._pageWinnerContainer,classes:["winner-text"]}).getElement();r.classList.add("no-active");const s=t.querySelector(".create-container .input-text"),o=t.querySelector(".create-container .input-color"),l=t.querySelector(".update-container .input-text"),c=t.querySelector(".update-container .input-color");s&&o&&l&&c&&d.initFormElements(s,o,l,c,r),this._carsContainer=new i({parent:n,classes:["garage-car-container"]}).getElement(),this.container.append(ee(async()=>{await d.prevPage(),await this.update()},async()=>{await d.nextPage(),await this.update()})),this.update().catch(()=>{throw new Error("Error loading garage")})}}const _=new ce(document.body);_.init("garage");_.register("garage",new ke);_.register("winners",R);const Ue=new de(_);Ue.init();_.navigate("garage");
