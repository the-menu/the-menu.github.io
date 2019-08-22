!function(){"use strict";window.htmlToElement=function(e){let t=document.createElement("template");return t.innerHTML=e.trim(),t.content.firstChild},window.replaceElement=function(e,t){e.parentNode.replaceChild(t,e)},window.AuxEvent=class{constructor(){this.event=document.createElement("e"),this.aux=new Event("e")}addListener(e,t){let a=this.event;a.addEventListener("e",function n(){document.contains(e)?t():a.removeEventListener("e",n)})}dispatch(){this.event.dispatchEvent(this.aux)}},window.Observable=class{constructor(e){this.variable=e,this.event=new AuxEvent}get value(){return this.variable}set value(e){this.variable=e,this.event.dispatch()}subscribe(e,t){this.event.addListener(e,t)}};let e=new Promise((e,t)=>{let a=new XMLHttpRequest;a.open("GET","data.json"),a.responseType="json",a.onload=()=>{a.status<400?e(a.response):t(a.statusText)},a.onerror=()=>t(a.statusText),a.send()});async function t(e,t=!0,a){let n=(await items)[e],s=n.prices&&t&&n.prices[1]||n.prices&&n.prices[0]||n.price,i=htmlToElement(`<article class="item">\n\t\t<img class="item-img" src="images/items/${n.image}">\n\t\t<a class="item-name" href="#/item/${e}">${n.name}</a>\n\t</article>`);return s&&(s=Number.isInteger(s)&&s.toString()||s.toFixed(2),i.appendChild(htmlToElement(`<div class="price-add">\n\t\t\t<p class="item-price">${s.replace(".",",")}€</p>\n\t\t\t<a><img class="add-item-img" src="images/add-item.png"></a>\n\t\t</div>`)),i.querySelector(".price-add").querySelector("a").onclick=()=>check.addItem(e,!n.prices||t)),t||n.prices||i.querySelector(".item-name").appendChild(htmlToElement(`<span class="only-fullsize">\n(solo ${a})</span>`)),i.querySelector(".item-img").onclick=()=>location.hash="/item/"+e,i}async function a(e){let t=(await items)[e],a=(await filters).value,n=(await allergens).value;return a=Object.keys(a).filter(e=>a[e]),n=Object.keys(n).filter(e=>n[e]),a.every(e=>t.filters.includes(e))&&!n.some(e=>t.allergens.includes(e))}async function n(){let e=htmlToElement('<section class="filters">\n\t\t<div class="filters-content">\n\t\t\t<div class="filters-header">\n\t\t\t\t<a class="filters-close"><i class="fas fa-times"></i></a>\n\t\t\t\t<p class="filters-title">Filtros</p>\n\t\t\t</div>\n\t\t\t<div class="filters-body">\n\t\t\t\t<p class="filters-description">Requisitos dietéticos</p>\n\t\t\t</div>\n\t\t\t<a class="apply-filters">Aplicar filtros</a>\n\t\t</div>\n\t</section>');e.querySelector(".filters-close").onclick=()=>e.parentNode.removeChild(e),e.querySelector(".apply-filters").onclick=()=>e.parentNode.removeChild(e);let t=await window.filters,a=e.querySelector(".filters-body");for(let e of await filtersInfo){let n=htmlToElement(`<article class="filter">\n\t\t\t<label class="filter-info" for="filter-input-${e.name}">\n\t\t\t\t<p class="filter-title">${e.name}</p>\n\t\t\t\t<p class="filter-description">${e.description}</p>\n\t\t\t</label>\n\t\t\t<label class="filter-switch">\n\t\t\t\t<input id="filter-input-${e.name}" type="checkbox" ${t.value[e.id]?"checked":""}>\n\t\t\t\t<div class="filter-slider"></div>\n\t\t\t</label>\n\t\t</article>`),s=n.querySelector("input");s.onchange=()=>t.set(e.id,s.checked),a.appendChild(n)}let n=await window.allergens,s=await window.allergensInfo;for(let e of Object.keys(s)){let t=s[e],i=htmlToElement(`<article class="filter">\n\t\t\t<label class="filter-info" for="filter-input-${t.name}">\n\t\t\t\t<p class="filter-title">${t.name}</p>\n\t\t\t\t<p class="filter-description">${t.description}</p>\n\t\t\t</label>\n\t\t\t<label class="filter-switch">\n\t\t\t\t<input id="filter-input-${t.name}" type="checkbox" ${n.value[e]?"checked":""}>\n\t\t\t\t<div class="filter-slider"></div>\n\t\t\t</label>\n\t\t</article>`),l=i.querySelector("input");l.onchange=()=>n.set(e,l.checked),a.appendChild(i)}document.querySelector("main").appendChild(e)}async function s(){let e=htmlToElement('<a class="filters-button"><i class="fas fa-sliders-h"></i></a>');e.onclick=n;let t=await async function(){let e=(await filters).value,t=(await allergens).value;return Object.keys(e).filter(t=>e[t]).length+Object.keys(t).filter(e=>t[e]).length}();return t&&e.appendChild(htmlToElement(`<span class="count filters-count">${t}</span>`)),(await filters).subscribe(e,async()=>replaceElement(e,await s())),(await allergens).subscribe(e,async()=>replaceElement(e,await s())),e}async function i(e,n){let s=(await sections)[e],l=htmlToElement("<section></section>"),c=s.hasSizes&&s.hasSizes[2];for(let e of s.items)await a(e)&&l.appendChild(await t(e,n,c));return(await filters).subscribe(l,async()=>replaceElement(l,await i(e,n))),(await allergens).subscribe(l,async()=>replaceElement(l,await i(e,n))),l}async function l(){let e=await window.items,t=htmlToElement("<main></main>");for(let[a,n]of check.value)if(a=JSON.parse(a),n){let n=e[a.id],s=htmlToElement(`<div class="item-background">\n\t\t\t\t<article class="check-item">\n\t\t\t\t\t<img class="check-item-img" src="images/items/${n.image}">\n\t\t\t\t\t<div class="check-item-info">\n\t\t\t\t\t\t<div class="check-name-price">\n\t\t\t\t\t\t\t<a class="check-item-name" href="#/item/${a.id}">${n.name}</a>\n\t\t\t\t\t\t\t<span class="check-item-price"></span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<span class="check-count-section">\n\t\t\t\t\t\t\t<a class="check-minus-button"><i class="fas fa-minus-circle"></i></a>\n\t\t\t\t\t\t\t<span class="check-item-count"></span>\n\t\t\t\t\t\t\t<a class="check-plus-button"><i class="fas fa-plus-circle"></i></a>\n\t\t\t\t\t\t\t<span class="check-count-margin"></span>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</div>\n\t\t\t\t</article>\n\t\t\t</div>`),i=function(){let e=check.value.get(JSON.stringify(a)),t=n.prices&&a.isFullSize&&n.prices[1]||n.prices&&n.prices[0]||n.price;t*=e,t=(t=Number.isInteger(t)&&t.toString()||t.toFixed(2)).replace(".",",")+"€",e?(s.querySelector(".check-item-count").textContent=e,s.querySelector(".check-item-price").textContent=t):s.parentNode.removeChild(s)};i(),s.querySelector(".check-minus-button").onclick=function(){check.removeItem(a.id,a.isFullSize),i()},s.querySelector(".check-plus-button").onclick=function(){check.addItem(a.id,a.isFullSize),i()},s.querySelector(".check-item-img").onclick=()=>location.hash="#/item/"+a.id,t.appendChild(s)}let a=htmlToElement('<p class="check-total"></p>'),n=async function(){a.textContent="Total a pagar: "+await async function(){let e=0,t=await window.items;for(let[a,n]of check.value){let s=t[(a=JSON.parse(a)).id];e+=(s.prices&&a.isFullSize&&s.prices[1]||s.prices&&s.prices[0]||s.price)*n}return e.toFixed(2).replace(".",",")+"€"}()};return n(),check.subscribe(a,n),t.appendChild(a),t.appendChild(htmlToElement('<div class="check-total-space"></div>')),t}window.info=e.then(e=>e.info),window.sections=e.then(e=>e.sections),window.items=e.then(e=>e.items),window.filtersInfo=e.then(e=>e.filters),window.allergensInfo=e.then(e=>e.allergens),window.filters=e.then(e=>{let t=new Observable({});for(let a of e.filters)t.value[a.id]=!1;return t.set=function(e,a){t.value[e]=a,t.event.dispatch()},t}),window.allergens=e.then(e=>{let t=new Observable({});for(let a of Object.keys(e.allergens))t.value[a]=!1;return t.set=function(e,a){t.value[e]=a,t.event.dispatch()},t}),info.then(e=>document.title=e.name),window.check=new Observable(new Map),check.addItem=function(e,t=!0){let a=JSON.stringify({id:e,isFullSize:t}),n=check.value.get(a),s=n&&n+1||1;check.value.set(a,s),check.event.dispatch()},check.removeItem=function(e,t=!0){let a=JSON.stringify({id:e,isFullSize:t}),n=check.value.get(a),s=n&&n-1||0;check.value.set(a,s),check.event.dispatch()},replaceElement(document.querySelector(".count-parent"),function e(){let t=htmlToElement('<a class="count-parent" href="#/check"><i class="fas fa-concierge-bell"></i></a>'),a=function(){let e=0;for(let[t,a]of check.value)e+=a;return e}();return a&&t.appendChild(htmlToElement(`<span class="count">${a}</span>`)),check.subscribe(t,()=>replaceElement(t,e())),t}()),check.subscribe(document,()=>location.hash="/check");let c=new Observable("");function r(e){return e.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}async function o(e){let t=r((await items)[e].name);return r(c.value).split(" ").every(e=>t.includes(e))}async function m(){let e=htmlToElement(`<main>\n\t\t<section class="search-section">\n\t\t\t<input class="search-input" type="search" placeholder="Buscar..." value="${c.value}">\n\t\t\t<span class="search-icon"><i class="fas fa-search"></i></span>\n\t\t</section>\n\t</main>`),n=e.querySelector("input");return n.oninput=()=>c.value=n.value,e.appendChild(await async function e(){let n=await window.items,s=htmlToElement("<section></section>");if(c.value)for(let e of Object.keys(n))await o(e)&&await a(e)&&s.appendChild(await t(e));return c.subscribe(s,async()=>replaceElement(s,await e())),(await filters).subscribe(s,async()=>replaceElement(s,await e())),(await allergens).subscribe(s,async()=>replaceElement(s,await e())),s}()),e}async function p(){scrollTo(0,0);let e,t=location.hash;(e=t.match(/#\/section\/([^\/]+)$/))?(replaceElement(document.querySelector("header"),await async function(e){let t=(await sections)[e],a=htmlToElement(`<header>\n\t\t<a class="back-button" href="javascript:history.back()"><i class="fas fa-chevron-left"></i></a>\n\t\t<p class="title">${t.name}</p>\n\t</header>`);return a.appendChild(await s()),a}(e[1])),replaceElement(document.querySelector("main"),await async function(e){let t=(await sections)[e],a=htmlToElement("<main></main>");if(t.info&&a.appendChild(htmlToElement(`<p class="section-info">${t.info}</p>`)),t.hasSizes){a.appendChild(htmlToElement(`<section class="sizes-header">\n\t\t\t<p class="sizes-info">${t.hasSizes[0]}</p>\n\t\t\t<article class="switch-article">\n\t\t\t\t<div class="switch-labels">\n\t\t\t\t\t<p>${t.hasSizes[1]}</p>\n\t\t\t\t\t<p>${t.hasSizes[2]}</p>\n\t\t\t\t</div>\n\t\t\t\t<label class="filter-switch">\n\t\t\t\t\t<input type="checkbox" checked>\n\t\t\t\t\t<div class="filter-slider sizes-slider"></div>\n\t\t\t\t</label>\n\t\t\t</article>\n\t\t</section>`));let n=a.querySelector("input[type=checkbox]");n.onchange=async()=>replaceElement(a.lastChild,await i(e,n.checked))}return a.appendChild(await i(e,!0)),a}(e[1]))):(e=t.match(/#\/check$/))?(replaceElement(document.querySelector("header"),htmlToElement('<header>\n\t\t<a class="back-button" href="javascript:history.back()"><i class="fas fa-chevron-left"></i></a>\n\t\t<p class="title">Cuenta</p>\n\t</header>')),replaceElement(document.querySelector("main"),await l())):(e=t.match(/#\/item\/([^\/]+)$/))?(replaceElement(document.querySelector("header"),await async function(e){let t=(await items)[e];return htmlToElement(`<header>\n\t\t<a class="back-button" href="javascript:history.back()"><i class="fas fa-chevron-left"></i></a>\n\t\t<p class="title">${t.name}</p>\n\t</header>`)}(e[1])),replaceElement(document.querySelector("main"),await async function(e){let t=(await items)[e],a=!0,n=htmlToElement(`<main>\n\t\t<img class="item-big-img" src="images/items/${t.image}">\n\t\t<div class="item-big-title">\n\t\t\t<p class="item-big-name">${t.name}</p>\n\t\t</div>\n\t\t<section class="item-description">\n\t\t\t<article class="big-price">\n\t\t\t\t<p class="big-price-text"></p>\n\t\t\t</article>\n\t\t\t<p>${t.description}</p>\n\t\t</section>\n\t</main>`);(t.price||t.prices)&&(n.querySelector(".item-big-title").appendChild(htmlToElement('<a class="item-big-add"><i class="fas fa-plus-circle"></i></a>')),n.querySelector(".item-big-add").onclick=()=>check.addItem(e,a));let s=function(){let e=t.prices&&a&&t.prices[1]||t.prices&&t.prices[0]||t.price;e&&(e=Number.isInteger(e)&&e.toString()||e.toFixed(2),n.querySelector(".big-price-text").textContent=e.replace(".",",")+"€")};if(s(),t.prices){n.querySelector(".big-price").appendChild(htmlToElement(`<article class="switch-article">\n\t\t\t<div class="switch-labels">\n\t\t\t\t<p>${t.pricesNames[0]}</p>\n\t\t\t\t<p>${t.pricesNames[1]}</p>\n\t\t\t</div>\n\t\t\t<label class="filter-switch">\n\t\t\t\t<input type="checkbox" checked>\n\t\t\t\t<div class="filter-slider sizes-slider"></div>\n\t\t\t</label>\n\t\t</article>`));let e=n.querySelector("input[type=checkbox]");e.onclick=()=>{a=e.checked,s()}}return t.allergens.length&&n.appendChild(htmlToElement(`<a class="item-button" href="#/item/${e}/allergens">Información de alérgenos</a>`)),n}(e[1]))):(e=t.match(/#\/item\/([^\/]+)\/allergens$/))?(replaceElement(document.querySelector("header"),htmlToElement('<header>\n\t\t<a class="back-button" href="javascript:history.back()"><i class="fas fa-chevron-left"></i></a>\n\t\t<p class="title">Alérgenos</p>\n\t</header>')),replaceElement(document.querySelector("main"),await async function(e){let t=(await items)[e],a=await window.allergensInfo,n=htmlToElement(`<main>\n\t\t<a class="allergens-item-name" href="#/item/${e}">${t.name}</a>\n\t\t<p class="allergens-title">ALÉRGENOS\n\t\tCONTENIDOS EN ESTE PRODUCTO</p>\n\t\t<section class="allergens-icons"></section>\n\t\t<p class="allergens-details-title">DETALLES DE LOS ALÉRGENOS</p>\n\t\t<p class="allergens-details">Toda la información sobre alérgenos está basada en datos suministrados por nuestros proveedores. Además de los alérgenos señalados, no se puede excluir totalmente la posible presencia accidental de otros alérgenos durante los procesos de elaboración tanto en la fábrica como en el restaurante. Excepcionalmente y de forma temporal puede haber variaciones en la composición de un determinado producto y por tanto los datos pueden no coincidir con los aquí facilitados.\n\t\t\n\t\t${(await info).name} tiene a su disposición la lista de alérgenos de nuestros productos. Solicítela en el mostrador.</p>\n\t</main>`),s=n.querySelector(".allergens-icons");for(let e of t.allergens)s.appendChild(htmlToElement(`<img src="images/allergens/${a[e].image}">`));return n}(e[1]))):(e=t.match(/#\/search$/))?(replaceElement(document.querySelector("header"),await async function(){let e=htmlToElement('<header>\n\t\t<a class="back-button" href="javascript:history.back()"><i class="fas fa-chevron-left"></i></a>\n\t\t<p class="title">Búsqueda</p>\n\t</header>');return e.appendChild(await s()),e}()),replaceElement(document.querySelector("main"),await m())):(e=t.match(/#\/others$/))?(replaceElement(document.querySelector("header"),htmlToElement('<header>\n\t\t<a class="back-button" href="javascript:history.back()"><i class="fas fa-chevron-left"></i></a>\n\t\t<p class="title">The Menu</p>\n\t</header>')),replaceElement(document.querySelector("main"),htmlToElement('<main>\n\t\t<section>\n\t\t\t<a class="other-section" href="#/hours">\n\t\t\t\t<span>Horarios</span>\n\t\t\t\t<i class="fas fa-angle-right fa-xs"></i>\n\t\t\t</a>\n\t\t\t<a class="other-section" href="#/about-us">\n\t\t\t\t<span>Sobre nosotros</span>\n\t\t\t\t<i class="fas fa-angle-right fa-xs"></i>\n\t\t\t</a>\n\t\t</section>\n\t</main>'))):(e=t.match(/#\/hours$/))?(replaceElement(document.querySelector("header"),htmlToElement('<header>\n\t\t<a class="back-button" href="javascript:history.back()"><i class="fas fa-chevron-left"></i></a>\n\t\t<p class="title">Horarios</p>\n\t</header>')),replaceElement(document.querySelector("main"),await async function(){let e=await window.info,t=htmlToElement(`<main>\n\t\t<p class="hours-bar-name">${e.name}</p>\n\t\t<section class="main-hours">\n\t\t\t<img class="hours-img" src="images/utensils.svg">\n\t\t\t<p class="hours-title">Horario</p>\n\t\t\t<p class="hours-info">${e.hours}</p>\n\t\t</section>\n\t</main>`);return e.hoursDetails&&t.appendChild(htmlToElement(`<p class="hours-details">${e.hoursDetails}</p>`)),t}())):(e=t.match(/#\/about-us$/))?(replaceElement(document.querySelector("header"),htmlToElement('<header>\n\t\t<a class="back-button" href="javascript:history.back()"><i class="fas fa-chevron-left"></i></a>\n\t\t<p class="title">Sobre nosotros</p>\n\t</header>')),replaceElement(document.querySelector("main"),htmlToElement('<main>\n\t\t<p class="about-us">En LD Graphics sabemos que aprovechar la tecnología es clave para ser más eficiente en tu negocio. Por eso hemos formado un equipo especializado en desarrollo de aplicaciones a medida.\n\n\t\tNos esforzamos para darle al cliente exactamente lo quiere, siendo la comunicación gran parte de nuestro riguroso proceso de trabajo. Nos comprometemos a dar lo mejor que tenemos, desde la atención al cliente hasta el diseño y desarrollo del producto.\n\t\t\n\t\tEstaremos encantados de atenderles en <a href="mailto:LDGraphicsSL@gmail.com">LDGraphicsSL@gmail.com</a></p>\n\t</main>'))):(replaceElement(document.querySelector("header"),htmlToElement('<header>\n\t\t<p class="title">Nuestra carta</p>\n\t</header>')),replaceElement(document.querySelector("main"),await async function(){let e=await window.info,t=htmlToElement(`<main>\n\t\t<img class="main-img" src="images/${e.image}">\n\t\t<div class="home">\n\t\t\t<p class="bar-name">${e.name}</p>\n\t\t\t<p class="bar-address">${e.address}</p>\n\t\t\t<section class="section-list">\n\t\t\t</section>\n\t\t</div>\n\t</main>`),a=await window.sections,n=t.querySelector(".section-list");for(let e of Object.keys(a)){let t=a[e];t.hidden||n.appendChild(htmlToElement(`<a class="section-article" href="#/section/${e}">\n\t\t\t\t<img class="section-img" src="images/sections/${t.image}">\n\t\t\t\t<span class="section-name"><p>${t.name}</p></span>\n\t\t\t</a>`))}return t}()))}window.onpopstate=p,p()}();
