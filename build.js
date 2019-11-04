!function(){"use strict";window.htmlToElement=function(t){let e=document.createElement("template");return e.innerHTML=t.trim(),e.content.firstChild},window.replaceElement=function(t,e){t.parentNode.replaceChild(e,t)},window.AuxEvent=class{constructor(){this.event=document.createElement("e"),this.aux=new Event("e")}addListener(t,e){let a=this.event;a.addEventListener("e",(function n(){document.contains(t)?e():a.removeEventListener("e",n)}))}dispatch(){this.event.dispatchEvent(this.aux)}},window.Observable=class{constructor(t){this.variable=t,this.event=new AuxEvent}get value(){return this.variable}set value(t){this.variable=t,this.event.dispatch()}subscribe(t,e){this.event.addListener(t,e)}};let t=new Promise((t,e)=>{let a=new XMLHttpRequest;a.open("GET","data.json"),a.responseType="json",a.onload=()=>{a.status<400?t(a.response):e(a.statusText)},a.onerror=()=>e(a.statusText),a.send()});window.info=t.then(t=>t.info),window.sections=t.then(t=>t.sections),window.items=t.then(t=>(async function(t){for(let e of Object.values(await sections))if(e.follows||e.requires){let a;for(let n of e.items)(a=t[n]).follows=e.follows,a.requires=e.requires}return t})(t.items)).then((function(t){for(let[e,a]of Object.entries(t))if(a.template){let n={...t[a.template]};delete n.derives;for(let[t,e]of Object.entries(a))"template"!=t&&(n[t]=e);t[e]=n}return t})),window.filtersInfo=t.then(t=>t.filters),window.allergensInfo=t.then(t=>t.allergens),window.filters=t.then(t=>{let e=new Observable({});for(let a of t.filters)e.value[a.id]=!1;return e.set=function(t,a){e.value[t]=a,e.event.dispatch()},e}),window.allergens=t.then(t=>{let e=new Observable({});for(let a of Object.keys(t.allergens))e.value[a]=!1;return e.set=function(t,a){e.value[t]=a,e.event.dispatch()},e}),info.then(t=>document.title=t.name);let e=new Promise((t,e)=>{let a=new XMLHttpRequest;a.open("GET","i18n.json"),a.responseType="json",a.onload=()=>{a.status<400?t(a.response):e(a.statusText)},a.onerror=()=>e(a.statusText),a.send()});function a(t,e){return t.findIndex(t=>e.startsWith(t))}function n(t,e,a){let n=t.get(e)||0;t.set(e,n+a)}window.langDictionary=e.then(t=>t.languages),window.language=async function(){if(sessionStorage.language)return JSON.parse(sessionStorage.language);let t,e=(await info).languages;for(let n of navigator.languages||[])if(-1!=(t=a(e,n)))return[e[t],t];if(-1!=(t=a(e,navigator.language)))return[e[t],t];let n=(await info).defaultLanguage;return[n,a(e,n)]}(),window.getText=async function(t){return(await e)[t][(await language)[0]]},window.getTranslation=async function(t,e=!1){return(Array.isArray(t)&&!e||Array.isArray(t[0]))&&t[(await language)[1]]||t},window.check=new Observable(new Map),check.addItem=async function(t,e=!0,a=!1){let n=(await items)[t];if(!a&&n.derives)return location.hash=`/section/${n.derives}`;let i=JSON.stringify({id:t,isFullSize:e}),s=check.value.get(i),l=s&&s+1||1;n.min&&(l=Math.max(l,n.min)),check.value.set(i,l),check.event.dispatch(),n.follows?location.hash=`/section/${n.follows}`:location.hash="/check"},check.removeItem=async function(t,e=!0){let a=JSON.stringify({id:t,isFullSize:e}),n=check.value.get(a),i=n&&n-1||0;i<(await items)[t].min&&(i=0),check.value.set(a,i),check.event.dispatch()},check.error=async function(){let t=await async function(){let t,e=await window.items,a=new Map;for(let[i,s]of check.value.entries())(t=e[JSON.parse(i).id]).requires&&n(a,t.requires,s),t.follows&&n(a,t.follows,-s);for(let[t,e]of a.entries())if(e>0)return t}();return t?(await getText("requirementError")).replace("sectionName",(await sections)[t].name.toLowerCase()):(t=await async function(){let t=[...check.value.entries()].filter(t=>t[1]).map(t=>JSON.parse(t[0]).id);for(let[e,a]of Object.entries(await sections))if(a.max){let n=0;for(let i of a.items)if(t.some(t=>t==i)&&n++,n>a.max)return e}}())?(await getText("exceedingError")).replace("sectionName",(await sections)[t].name.toLowerCase()):void 0};const i="909322442:AAHZeTRrkhTA-6tL9cqwFqyKr3yDLdjbFsQ",s="166589969",l="808127354:AAGewx3EDsVCUngoEtFPHom1KW_fVcbE53E";async function c(t,e){const a=(await info).ids;let n=`${t}`,i=await async function(){let t=await window.items;return[...check.value.entries()].filter(t=>t[1]).map(e=>{let a=JSON.parse(e[0]),n=t[a.id],i=n.prices&&a.isFullSize&&n.prices[1]||n.prices&&n.prices[0]||n.price;return i=Number.isInteger(i)&&i.toString()||i.toFixed(2),`${e[1]}x ${Array.isArray(n.name)&&n.name[0]||n.name} (${i.replace(".",",")}€)`}).join("\n")}();return i&&(n+="\n"+i),e&&(n+="\n"+e),Promise.all(a.map(t=>(function(t,e){return new Promise((a,n)=>{let i=new FormData;i.append("chat_id",e),i.append("text",t),i.append("disable_notification",!1);let s=new XMLHttpRequest;s.open("POST",`https://api.telegram.org/bot${l}/sendMessage`),s.onload=()=>{s.status<400?a():n(s.statusText)},s.onerror=()=>n(s.statusText),s.send(i)})})(n,t)))}async function r(t,e,a){let n=htmlToElement(`<div class="missing-img">\n\t\t<img class="item-big-img" src="images/items/${e.missing}">\n\t\t<div class="filter-foreground"></div>\n\t\t<div class="upload-div">\n\t\t\t<p class="upload-msg">${await getText("photoUploading")}</p>\n\t\t\t<article class="uploading-icon"><i class="fas fa-circle-notch fa-spin"></i></i></article>\n\t\t</div>\n\t</div>`);var l,c;a.replaceWith(n),(l=t.target.files[0],c=`${(await info).name} - ${e.name}`,new Promise((t,e)=>{let a=new FormData;a.append("photo",l);let n=new XMLHttpRequest;n.open("POST",`https://api.telegram.org/bot${i}/sendPhoto?chat_id=${s}&caption=${encodeURIComponent(c)}`),n.onload=()=>{n.status<400?t():e(n.statusText)},n.onerror=()=>e(n.statusText),n.send(a)})).then(async()=>{n.replaceWith(htmlToElement(`<div class="missing-img">\n\t\t\t<img class="item-big-img" src="images/items/${e.missing}">\n\t\t\t<div class="filter-foreground"></div>\n\t\t\t<div class="upload-div">\n\t\t\t\t<p class="upload-msg">${await getText("photoSuccess")}</p>\n\t\t\t\t<article class="upload-icon"><i class="fas fa-check-circle"></i></article>\n\t\t\t</div>\n\t\t</div>`))}).catch(async()=>{let t=htmlToElement(`<div class="missing-img">\n\t\t\t<img class="item-big-img" src="images/items/${e.missing}">\n\t\t\t<div class="filter-foreground"></div>\n\t\t\t<div class="upload-div">\n\t\t\t\t<p class="upload-msg">${await getText("photoError")}</p>\n\t\t\t\t<article class="uploading-icon"><i class="fas fa-exclamation-triangle"></i></article>\n\t\t\t\t<label class="upload-input">\n\t\t\t\t\t<input type="file" accept="image/*">\n\t\t\t\t\t<span class="upload-mini-icon"><i class="fas fa-upload"></span></i>&nbsp&nbsp${await getText("photoUpload")}\n\t\t\t\t</label>\n\t\t\t</div>\n\t\t</div>`);t.onchange=a=>r(a,e,t),n.replaceWith(t)})}async function o(t,e=!0,a){let n=(await items)[t],i=n.prices&&e&&n.prices[1]||n.prices&&n.prices[0]||n.price,s=htmlToElement(`<article class="item">\n\t\t<a class="item-name" href="#/item/${t}">${await getTranslation(n.name)}</a>\n\t</article>`);return n.image&&(s.prepend(htmlToElement(`<img class="item-img" src="images/items/${n.image}">`)),s.querySelector(".item-img").onclick=()=>location.hash="/item/"+t),null!=i&&(i=Number.isInteger(i)&&i.toString()||i.toFixed(2),s.appendChild(htmlToElement(`<div class="price-add">\n\t\t\t<p class="item-price">${i.replace(".",",")}€</p>\n\t\t\t<a><img class="add-item-img" src="images/add-item.png"></a>\n\t\t</div>`)),s.querySelector(".price-add").querySelector("a").onclick=()=>check.addItem(t,!n.prices||e)),e||n.prices||s.querySelector(".item-name").appendChild(htmlToElement(`<span class="only-fullsize">\n(${(await getText("fullsizeOnly")).replace("fullSize",a)})</span>`)),s}async function m(t){let e=(await items)[t],a=(await filters).value,n=(await allergens).value;return a=Object.keys(a).filter(t=>a[t]),n=Object.keys(n).filter(t=>n[t]),a.every(t=>e.filters.includes(t))&&!n.some(t=>e.allergens.includes(t))}async function u(t){let e=(await items)[t],a=!0,n=htmlToElement(`<main>\n\t\t<div class="item-big-title">\n\t\t\t<p class="item-big-name">${await getTranslation(e.name)}</p>\n\t\t</div>\n\t\t<section class="item-description">\n\t\t\t<article class="big-price">\n\t\t\t\t<p class="big-price-text"></p>\n\t\t\t</article>\n\t\t\t<p>${await getTranslation(e.description)}</p>\n\t\t</section>\n\t</main>`);n.prepend(e.image&&htmlToElement(`<img class="item-big-img" src="images/items/${e.image}">`)||await async function(t){let e=htmlToElement(`<div class="missing-img">\n\t\t<img class="item-big-img" src="images/items/${t.missing}">\n\t\t<div class="filter-foreground"></div>\n\t\t<div class="upload-div">\n\t\t\t<p class="upload-msg">${await getText("missingImage")}</p>\n\t\t\t<article class="upload-icon"><i class="fas fa-camera-retro"></i></article>\n\t\t\t<label class="upload-input">\n\t\t\t\t<input type="file" accept="image/*">\n\t\t\t\t<span class="upload-mini-icon"><i class="fas fa-upload"></span></i>&nbsp&nbsp${await getText("photoUpload")}\n\t\t\t</label>\n\t\t</div>\n\t</div>`);return e.querySelector("input").onchange=a=>r(a,t,e),e}(e)),(null!=e.price||e.prices)&&(n.querySelector(".item-big-title").appendChild(htmlToElement('<a class="item-big-add"><i class="fas fa-plus-circle"></i></a>')),n.querySelector(".item-big-add").onclick=()=>check.addItem(t,a));let i=function(){let t=e.prices&&a&&e.prices[1]||e.prices&&e.prices[0]||e.price;t&&(t=Number.isInteger(t)&&t.toString()||t.toFixed(2),n.querySelector(".big-price-text").textContent=t.replace(".",",")+"€")};if(i(),e.prices){let t=await getTranslation(e.pricesNames,!0);n.querySelector(".big-price").appendChild(htmlToElement(`<article class="switch-article">\n\t\t\t<div class="switch-labels">\n\t\t\t\t<p>${t[0]}</p>\n\t\t\t\t<p>${t[1]}</p>\n\t\t\t</div>\n\t\t\t<label class="filter-switch">\n\t\t\t\t<input type="checkbox" checked>\n\t\t\t\t<div class="filter-slider sizes-slider"></div>\n\t\t\t</label>\n\t\t</article>`));let s=n.querySelector("input[type=checkbox]");s.onclick=()=>{a=s.checked,i()}}return e.allergens.length&&n.appendChild(htmlToElement(`<a class="item-button" href="#/item/${t}/allergens">${await getText("allergensButton")}</a>`)),n}async function p(){let t=htmlToElement(`<section class="filters">\n\t\t<div class="filters-content">\n\t\t\t<div class="filters-header">\n\t\t\t\t<a class="filters-close"><i class="fas fa-times"></i></a>\n\t\t\t\t<p class="filters-title">${await getText("filtersTitle")}</p>\n\t\t\t</div>\n\t\t\t<div class="filters-body">\n\t\t\t\t<p class="filters-description">${await getText("filtersDetails")}</p>\n\t\t\t</div>\n\t\t\t<a class="apply-filters">${await getText("filtersApply")}</a>\n\t\t</div>\n\t</section>`);t.querySelector(".filters-close").onclick=()=>t.parentNode.removeChild(t),t.querySelector(".apply-filters").onclick=()=>t.parentNode.removeChild(t);let e=await window.filters,a=t.querySelector(".filters-body");for(let t of await filtersInfo){let n=htmlToElement(`<article class="filter">\n\t\t\t<label class="filter-info" for="filter-input-${t.id}">\n\t\t\t\t<p class="filter-title">${await getTranslation(t.name)}</p>\n\t\t\t\t<p class="filter-description">${await getTranslation(t.description)}</p>\n\t\t\t</label>\n\t\t\t<label class="filter-switch">\n\t\t\t\t<input id="filter-input-${t.id}" type="checkbox" ${e.value[t.id]?"checked":""}>\n\t\t\t\t<div class="filter-slider"></div>\n\t\t\t</label>\n\t\t</article>`),i=n.querySelector("input");i.onchange=()=>e.set(t.id,i.checked),a.appendChild(n)}let n=await window.allergens,i=await window.allergensInfo;for(let t of Object.keys(i)){let e=i[t],s=htmlToElement(`<article class="filter">\n\t\t\t<label class="filter-info" for="filter-input-${t}">\n\t\t\t\t<p class="filter-title">${await getTranslation(e.name)}</p>\n\t\t\t\t<p class="filter-description">${await getTranslation(e.description)}</p>\n\t\t\t</label>\n\t\t\t<label class="filter-switch">\n\t\t\t\t<input id="filter-input-${t}" type="checkbox" ${n.value[t]?"checked":""}>\n\t\t\t\t<div class="filter-slider"></div>\n\t\t\t</label>\n\t\t</article>`),l=s.querySelector("input");l.onchange=()=>n.set(t,l.checked),a.appendChild(s)}document.querySelector("main").appendChild(t)}async function d(){let t=htmlToElement('<a class="filters-button"><i class="fas fa-sliders-h"></i></a>');t.onclick=p;let e=await async function(){let t=(await filters).value,e=(await allergens).value;return Object.keys(t).filter(e=>t[e]).length+Object.keys(e).filter(t=>e[t]).length}();return e&&t.appendChild(htmlToElement(`<span class="count filters-count">${e}</span>`)),(await filters).subscribe(t,async()=>replaceElement(t,await d())),(await allergens).subscribe(t,async()=>replaceElement(t,await d())),t}async function h(t,e){let a=(await sections)[t],n=htmlToElement("<section></section>"),i=a.hasSizes&&(await getTranslation(a.hasSizes,!0))[2];if(a.default){let t=htmlToElement(`<article class="item">\n\t\t\t<a class="item-name">${await getText("defaultItem")}</a>\n\t\t</article>`);1==a.default?t.onclick=()=>location.hash="/check":t.onclick=()=>check.addItem(a.default,e,!0),n.appendChild(t)}for(let t of a.items)await m(t)&&n.appendChild(await o(t,e,i));return(await filters).subscribe(n,async()=>replaceElement(n,await h(t,e))),(await allergens).subscribe(n,async()=>replaceElement(n,await h(t,e))),n}async function f(){let t;(await info).ids?(t=await check.error())?alert(t):location.hash="/order":alert(await getText("orderUnavaliable"))}async function g(){let t=await window.items,e=htmlToElement("<main></main>");for(let[n,i]of check.value)if(n=JSON.parse(n),i){let i=t[n.id],s=htmlToElement(`<div class="item-background">\n\t\t\t\t<article class="check-item">\n\t\t\t\t\t${a=i.image,a&&`<img class="check-item-img" src="images/items/${a}">`||""}\n\t\t\t\t\t<div class="check-item-info">\n\t\t\t\t\t\t<div class="check-name-price">\n\t\t\t\t\t\t\t<a class="check-item-name" href="#/item/${n.id}">${await getTranslation(i.name)}</a>\n\t\t\t\t\t\t\t<span class="check-item-price"></span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<span class="check-count-section">\n\t\t\t\t\t\t\t<a class="check-minus-button"><i class="fas fa-minus-circle"></i></a>\n\t\t\t\t\t\t\t<span class="check-item-count"></span>\n\t\t\t\t\t\t\t<a class="check-plus-button"><i class="fas fa-plus-circle"></i></a>\n\t\t\t\t\t\t\t<span class="check-count-margin"></span>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</div>\n\t\t\t\t</article>\n\t\t\t</div>`),l=function(){let t=check.value.get(JSON.stringify(n)),e=i.prices&&n.isFullSize&&i.prices[1]||i.prices&&i.prices[0]||i.price;e*=t,e=(e=Number.isInteger(e)&&e.toString()||e.toFixed(2)).replace(".",",")+"€",t?(s.querySelector(".check-item-count").textContent=t,s.querySelector(".check-item-price").textContent=e):s.parentNode.removeChild(s)};l(),s.querySelector(".check-minus-button").onclick=async function(){await check.removeItem(n.id,n.isFullSize),l()},s.querySelector(".check-plus-button").onclick=async function(){await check.addItem(n.id,n.isFullSize,!0),l()};let c=s.querySelector(".check-item-img");c&&(c.onclick=()=>location.hash="#/item/"+n.id),e.appendChild(s)}var a;let n=htmlToElement('<a class="check-total"></a>');n.onclick=f;let i=async function(){let t=await async function(){let t=0,e=await window.items;for(let[a,n]of check.value){let i=e[(a=JSON.parse(a)).id];t+=(i.prices&&a.isFullSize&&i.prices[1]||i.prices&&i.prices[0]||i.price)*n}if(0==t)return"";let a=Number.isInteger(t)?0:2;return t.toFixed(a).replace(".",",")+"€"}();n.textContent=t&&`${await getText("orderNow")} (${t})`||`${await getText("orderNow")}`};return i(),check.subscribe(n,i),e.appendChild(n),e.appendChild(htmlToElement('<div class="check-total-space"></div>')),e}replaceElement(document.querySelector(".count-parent"),function t(){let e=htmlToElement('<a class="count-parent" href="#/check"><i class="fas fa-concierge-bell"></i></a>'),a=function(){let t=0;for(let[e,a]of check.value)t+=a;return t}();return a&&e.appendChild(htmlToElement(`<span class="count">${a}</span>`)),check.subscribe(e,()=>replaceElement(e,t())),e}());let w=new Observable("");function y(t){return t.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}async function b(t){let e=y(await getTranslation((await items)[t].name));return y(w.value).split(" ").every(t=>e.includes(t))}async function v(){let t=htmlToElement(`<main>\n\t\t<section class="search-section">\n\t\t\t<input class="search-input" type="search" placeholder="${await getText("searchPlaceholder")}" value="${w.value}">\n\t\t\t<span class="search-icon"><i class="fas fa-search"></i></span>\n\t\t</section>\n\t</main>`),e=t.querySelector("input");return e.oninput=()=>w.value=e.value,t.appendChild(await async function t(){let e=await window.items,a=htmlToElement("<section></section>");if(w.value)for(let t of Object.keys(e))await b(t)&&await m(t)&&a.appendChild(await o(t));return w.subscribe(a,async()=>replaceElement(a,await t())),(await filters).subscribe(a,async()=>replaceElement(a,await t())),(await allergens).subscribe(a,async()=>replaceElement(a,await t())),a}()),t}async function T(){return htmlToElement(`<main>\n\t\t<section>\n\t\t\t<a class="other-section" href="#/hours">\n\t\t\t\t<span>${await getText("hoursTitle")}</span>\n\t\t\t\t<i class="fas fa-angle-right fa-xs"></i>\n\t\t\t</a>\n\t\t\t${await async function(){return(await info).languages.length>1?'<a class="other-section" href="#/language">\n\t\t\t<span>Language</span>\n\t\t\t<i class="fas fa-angle-right fa-xs"></i>\n\t\t</a>':""}()}\n\t\t\t<a class="other-section" href="#/about-us">\n\t\t\t\t<span>${await getText("aboutTitle")}</span>\n\t\t\t\t<i class="fas fa-angle-right fa-xs"></i>\n\t\t\t</a>\n\t\t</section>\n\t</main>`)}async function k(){let t=htmlToElement("<main><section></section></main>"),e=await langDictionary;return t.querySelector("section").append(...(await info).languages.map((t,a)=>(function(t,e,a){let n=htmlToElement(`<a class="other-section" href="#">\n\t\t<span>${a[e]}</span>\n\t\t<i class="fas fa-angle-right fa-xs"></i>\n\t</a>`);return n.onclick=()=>{language=new Promise(a=>a([e,t])),sessionStorage.language=JSON.stringify([e,t])},n})(a,t,e))),t}async function $(){let t=htmlToElement(`<main>\n\t\t<form>\n\t\t\t<label class="order-container table-container" for="table-input">\n\t\t\t\t<span>${await getText("tableNumber")}</span>\n\t\t\t\t<article>\n\t\t\t\t\t<input id="table-input" class="table-input" type="number" required>\n\t\t\t\t\t<span><i class="fas fa-angle-right fa-sm"></i></span>\n\t\t\t\t</article>\n\t\t\t</label>\n\t\t\t<article class="order-container">\n\t\t\t\t<p class="comments-title">${await getText("commentsTitle")}:</p>\n\t\t\t\t<textarea class="comments" placeholder="${await getText("commentsPlaceholder")}"></textarea>\n\t\t\t</article>\n\t\t\t<button class="check-total">${await getText("orderNow")}</button>\n\t\t</form>\n\t</main>`),e=t.querySelector(".table-input"),a=t.querySelector(".comments"),n=t.querySelector(".check-total");return t.querySelector("form").onsubmit=function(t){n.disabled=!0,t.preventDefault(),getText("ordering").then(t=>n.textContent=t),async function(t,e){let a;if((await info).ids){if(a=await check.error())throw void alert(a);return c(t,e).catch(async t=>{throw void alert(await getText("orderFailed"))})}throw void alert(await getText("orderUnavaliable"))}(e.value,a.value).then(async()=>{alert(await getText("orderSuccess")),location.hash=""}).catch(async t=>{n.disabled=!1,n.textContent=await getText("orderNow")})},t}async function E(){scrollTo(0,0);let t,e=location.hash;(t=e.match(/#\/section\/([^/]+)$/))?(replaceElement(document.querySelector("header"),await async function(t){let e=(await sections)[t],a=htmlToElement(`<header>\n\t\t<a class="back-button" href="javascript:history.back()"><i class="fas fa-chevron-left"></i></a>\n\t\t<p class="title">${await getTranslation(e.name)}</p>\n\t</header>`);return a.appendChild(await d()),a}(t[1])),replaceElement(document.querySelector("main"),await async function(t){let e=(await sections)[t],a=htmlToElement("<main></main>");if(e.info&&a.appendChild(htmlToElement(`<p class="section-info">${await getTranslation(e.info)}</p>`)),e.hasSizes){let n=await getTranslation(e.hasSizes,!0);a.appendChild(htmlToElement(`<section class="sizes-header">\n\t\t\t<p class="sizes-info">${n[0]}</p>\n\t\t\t<article class="switch-article">\n\t\t\t\t<div class="switch-labels">\n\t\t\t\t\t<p>${n[1]}</p>\n\t\t\t\t\t<p>${n[2]}</p>\n\t\t\t\t</div>\n\t\t\t\t<label class="filter-switch">\n\t\t\t\t\t<input type="checkbox" checked>\n\t\t\t\t\t<div class="filter-slider sizes-slider"></div>\n\t\t\t\t</label>\n\t\t\t</article>\n\t\t</section>`));let i=a.querySelector("input[type=checkbox]");i.onchange=async()=>replaceElement(a.lastChild,await h(t,i.checked))}return a.appendChild(await h(t,!0)),a}(t[1]))):(t=e.match(/#\/check$/))?(replaceElement(document.querySelector("header"),await async function(){return htmlToElement(`<header>\n\t\t<a class="back-button" href="javascript:history.back()"><i class="fas fa-chevron-left"></i></a>\n\t\t<p class="title">${await getText("checkTitle")}</p>\n\t</header>`)}()),replaceElement(document.querySelector("main"),await g())):(t=e.match(/#\/item\/([^/]+)$/))?(replaceElement(document.querySelector("header"),await async function(t){let e=(await items)[t];return htmlToElement(`<header>\n\t\t<a class="back-button" href="javascript:history.back()"><i class="fas fa-chevron-left"></i></a>\n\t\t<p class="title">${await getTranslation(e.name)}</p>\n\t</header>`)}(t[1])),replaceElement(document.querySelector("main"),await u(t[1]))):(t=e.match(/#\/item\/([^/]+)\/allergens$/))?(replaceElement(document.querySelector("header"),await async function(){return htmlToElement(`<header>\n\t\t<a class="back-button" href="javascript:history.back()"><i class="fas fa-chevron-left"></i></a>\n\t\t<p class="title">${await getText("allergensTitle")}</p>\n\t</header>`)}()),replaceElement(document.querySelector("main"),await async function(t){let e=(await items)[t],a=await window.allergensInfo,n=htmlToElement(`<main>\n\t\t<a class="allergens-item-name" href="#/item/${t}">${await getTranslation(e.name)}</a>\n\t\t<p class="allergens-title">${await getText("allergensSecondTitle")}</p>\n\t\t<section class="allergens-icons"></section>\n\t\t<p class="allergens-details-title">${await getText("allergensDetailsTitle")}</p>\n\t\t<p class="allergens-details">${(await getText("allergensDetails")).replace("barName",(await info).name)}</p>\n\t</main>`),i=n.querySelector(".allergens-icons");for(let t of e.allergens)i.appendChild(htmlToElement(`<img src="images/allergens/${a[t].image}">`));return n}(t[1]))):(t=e.match(/#\/search$/))?(replaceElement(document.querySelector("header"),await async function(){let t=htmlToElement(`<header>\n\t\t<a class="back-button" href="javascript:history.back()"><i class="fas fa-chevron-left"></i></a>\n\t\t<p class="title">${await getText("searchTitle")}</p>\n\t</header>`);return t.appendChild(await d()),t}()),replaceElement(document.querySelector("main"),await v())):(t=e.match(/#\/others$/))?(replaceElement(document.querySelector("header"),await htmlToElement('<header>\n\t\t<a class="back-button" href="javascript:history.back()"><i class="fas fa-chevron-left"></i></a>\n\t\t<p class="title">The Menu</p>\n\t</header>')),replaceElement(document.querySelector("main"),await T())):(t=e.match(/#\/hours$/))?(replaceElement(document.querySelector("header"),await async function(){return htmlToElement(`<header>\n\t\t<a class="back-button" href="javascript:history.back()"><i class="fas fa-chevron-left"></i></a>\n\t\t<p class="title">${await getText("hoursTitle")}</p>\n\t</header>`)}()),replaceElement(document.querySelector("main"),await async function(){let t=await window.info,e=htmlToElement(`<main>\n\t\t<p class="hours-bar-name">${t.name}</p>\n\t\t<section class="main-hours">\n\t\t\t<img class="hours-img" src="images/utensils.svg">\n\t\t\t<p class="hours-title">${await getText("hoursSecondary")}</p>\n\t\t\t<p class="hours-info">${await getTranslation(t.hours)}</p>\n\t\t</section>\n\t</main>`);return t.hoursDetails&&e.appendChild(htmlToElement(`<p class="hours-details">${await getTranslation(t.hoursDetails)}</p>`)),e}())):(t=e.match(/#\/about-us$/))?(replaceElement(document.querySelector("header"),await async function(){return htmlToElement(`<header>\n\t\t<a class="back-button" href="javascript:history.back()"><i class="fas fa-chevron-left"></i></a>\n\t\t<p class="title">${await getText("aboutTitle")}</p>\n\t</header>`)}()),replaceElement(document.querySelector("main"),await async function(){return htmlToElement(`<main>\n\t\t<p class="about-us">${await getText("aboutDetails")}</p>\n\t</main>`)}())):(t=e.match(/#\/language$/))?(replaceElement(document.querySelector("header"),await htmlToElement('<header>\n\t\t<a class="back-button" href="javascript:history.back()"><i class="fas fa-chevron-left"></i></a>\n\t\t<p class="title">Language</p>\n\t</header>')),replaceElement(document.querySelector("main"),await k())):(t=e.match(/#\/order$/))?(replaceElement(document.querySelector("header"),await async function(){return htmlToElement(`<header>\n\t\t<a class="back-button" href="javascript:history.back()"><i class="fas fa-chevron-left"></i></a>\n\t\t<p class="title">${await getText("order")}</p>\n\t</header>`)}()),replaceElement(document.querySelector("main"),await $())):(replaceElement(document.querySelector("header"),await async function(){return htmlToElement(`<header>\n\t\t<p class="title">${await getText("defaultTitle")}</p>\n\t</header>`)}()),replaceElement(document.querySelector("main"),await async function(){let t=await window.info,e=htmlToElement(`<main>\n\t\t<img class="main-img" src="images/items/${t.image}">\n\t\t<div class="home">\n\t\t\t<p class="bar-name">${t.name}</p>\n\t\t\t<p class="bar-address">${t.address}</p>\n\t\t\t<section class="section-list">\n\t\t\t</section>\n\t\t</div>\n\t</main>`),a=await window.sections,n=e.querySelector(".section-list");for(let t of Object.keys(a)){let e=a[t];e.hidden||n.appendChild(htmlToElement(`<a class="section-article" href="#/section/${t}">\n\t\t\t\t<img class="section-img" src="images/items/${e.image}">\n\t\t\t\t<span class="section-name"><p>${await getTranslation(e.name)}</p></span>\n\t\t\t</a>`))}return e}()))}window.onpopstate=E,E()}();
