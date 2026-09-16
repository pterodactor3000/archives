import{n as e}from"./index-Cp843FkZ.js";import{$ as t,A as n,B as r,C as i,D as a,E as o,F as s,G as c,H as l,I as u,J as d,K as f,L as p,M as m,N as h,O as g,P as _,Q as v,R as y,S as b,T as x,U as S,V as C,W as w,X as T,Y as E,Z as D,_ as ee,a as O,at as k,b as A,c as j,ct as M,d as N,et as te,f as ne,g as re,h as ie,i as ae,it as P,j as F,k as I,l as oe,m as se,n as ce,nt as L,o as le,ot as ue,p as R,q as de,r as fe,rt as pe,s as me,st as z,t as he,tt as ge,u as _e,v as ve,w as ye,x as be,y as xe,z as B}from"./RVI7YCPX-jdHCBfkm.js";var Se=`plugin-container`,Ce=`plugin-title-container`;function we(e){return e!==null&&(typeof e==`object`||typeof e==`function`)}var Te=(e,t)=>e===t||e.length===t.length&&e.every((e,n)=>e===t[n]),Ee=e=>typeof e==`function`&&!e.length?e():e,De=e=>Array.isArray(e)?e:e?[e]:[];function V(e,...t){return typeof e==`function`?e(...t):e}var Oe=P;function H(e,t,n,r){return e.addEventListener(t,n,r),Oe(e.removeEventListener.bind(e,t,n,r))}function ke(e,t,n,r){let i=()=>{De(Ee(e)).forEach(e=>{e&&De(Ee(t)).forEach(t=>H(e,t,n,r))})};typeof e==`function`?d(i):T(i)}function Ae(e,t=ge()){let n=0,r,i;return()=>(n++,P(()=>{n--,queueMicrotask(()=>{!n&&i&&(i(),i=r=void 0)})}),i||D(t=>r=e(i=t),t),r)}function je(e,t){for(let n=e.length-1;n>=0;n--){let r=t.slice(0,n+1);if(!Te(e[n],r))return!1}return!0}var Me=Ae(()=>{let[e,t]=v(null);return H(window,`keydown`,e=>{t(e),setTimeout(()=>t(null))}),e}),Ne=Ae(()=>{let[e,t]=v([]),n=()=>t([]),r=Me();return H(window,`keydown`,n=>{if(n.repeat||typeof n.key!=`string`)return;let r=n.key.toUpperCase(),i=e();if(i.includes(r))return;let a=[...i,r];i.length===0&&r!==`ALT`&&r!==`CONTROL`&&r!==`META`&&r!==`SHIFT`&&(n.shiftKey&&a.unshift(`SHIFT`),n.altKey&&a.unshift(`ALT`),n.ctrlKey&&a.unshift(`CONTROL`),n.metaKey&&a.unshift(`META`)),t(a)}),H(window,`keyup`,e=>{if(typeof e.key!=`string`)return;let r=e.key.toUpperCase();r===`META`?n():t(e=>e.filter(e=>e!==r))}),H(window,`blur`,n),H(window,`contextmenu`,e=>{e.defaultPrevented||n()}),e[0]=e,e[1]={event:r},e[Symbol.iterator]=function*(){yield e[0],yield e[1]},e}),Pe=Ae(()=>{let e=Ne();return E(t=>e().length===0?[]:[...t,e()],[])});function Fe(e,t,n={}){if(!e.length)return;e=e.map(e=>e.toUpperCase());let{preventDefault:r=!0}=n,i=Me(),a=Pe(),o=!1;d(pe(a,n.requireReset?n=>{if(!n.length)return o=!1;if(o)return;let a=i();n.length<e.length?je(n,e.slice(0,n.length))?r&&a&&a.preventDefault():o=!0:(o=!0,je(n,e)&&(r&&a&&a.preventDefault(),t(a)))}:n=>{let a=n.at(-1);if(!a)return;let o=i();if(r&&a.length<e.length){Te(a,e.slice(0,e.length-1))&&o&&o.preventDefault();return}if(Te(a,e)){let i=n.at(-2);(!i||Te(i,e.slice(0,e.length-1)))&&(r&&o&&o.preventDefault(),t(o))}}))}var Ie=B(`<span style=display:contents>`),Le=de(void 0),Re=e=>{let[t,n]=v(e.theme);d(()=>{n(e.theme)});let[i,a]=v();return d(()=>{let e=i();e&&o(e.ownerDocument)}),f(Le.Provider,{value:{theme:t,setTheme:n},get children(){var t=Ie();return r(a,t),h(t,()=>e.children),t}})};function ze(){let e=M(Le);if(!e)throw Error(`createTheme must be used within a ThemeContextProvider`);return e}var Be={data:``},Ve=e=>{if(typeof window==`object`){let t=(e?e.querySelector(`#_goober`):window._goober)||Object.assign(document.createElement(`style`),{innerHTML:` `,id:`_goober`});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||Be},He=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,Ue=/\/\*[^]*?\*\/|  +/g,We=/\n+/g,Ge=(e,t)=>{let n=``,r=``,i=``;for(let a in e){let o=e[a];a[0]==`@`?a[1]==`i`?n=a+` `+o+`;`:r+=a[1]==`f`?Ge(o,a):a+`{`+Ge(o,a[1]==`k`?``:t)+`}`:typeof o==`object`?r+=Ge(o,t?t.replace(/([^,])+/g,e=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+` `+t:t)):a):o!=null&&(a=a[1]==`-`?a:a.replace(/[A-Z]/g,`-$&`).toLowerCase(),i+=Ge.p?Ge.p(a,o):a+`:`+o+`;`)}return n+(t&&i?t+`{`+i+`}`:i)+r},U={},Ke=e=>{if(typeof e==`object`){let t=``;for(let n in e)t+=n+Ke(e[n]);return t}return e},qe=(e,t,n,r,i)=>{let a=Ke(e),o=U[a]||(U[a]=(e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return`go`+n})(a));if(!U[o]){let t=a===e?(e=>{let t,n,r=[{}];for(;t=He.exec(e.replace(Ue,``));)t[4]?r.shift():t[3]?(n=t[3].replace(We,` `).trim(),r.unshift(r[0][n]=r[0][n]||{})):r[0][t[1]]=t[2].replace(We,` `).trim();return r[0]})(e):e;U[o]=Ge(i?{[`@keyframes `+o]:t}:t,n?``:`.`+o)}let s=n&&U.g;return n&&(U.g=U[o]),((e,t,n,r)=>{r?t.data=t.data.replace(r,e):t.data.indexOf(e)===-1&&(t.data=n?e+t.data:t.data+e)})(U[o],t,r,s),o},Je=(e,t,n)=>e.reduce((e,r,i)=>{let a=t[i];if(a&&a.call){let e=a(n),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;a=t?`.`+t:e&&typeof e==`object`?e.props?``:Ge(e,``):!1===e?``:e}return e+r+(a??``)},``);function Ye(e){let t=this||{},n=e.call?e(t.p):e;return qe(n.unshift?n.raw?Je(n,[].slice.call(arguments,1),t.p):n.reduce((e,n)=>Object.assign(e,n&&n.call?n(t.p):n),{}):n,Ve(t.target),t.g,t.o,t.k)}Ye.bind({g:1});var Xe=Ye.bind({k:1}),W=Ye,Ze=e=>{let t=a(e),n=(t,n)=>e===`light`?t:n,r=e=>{let n=e===`danger`?`error`:e===`primary`||e===`secondary`?`neutral`:e,r=t.color.status[n],i=r.text,a=r.text,o=r.solidFill,s=r.border,c=r.solidFill,l=r.onFill,u=r.border;return{ghost:W`
        background: transparent;
        color: ${i};
        border-color: transparent;
        &:hover {
          background: ${t.color.state.hover};
          color: ${a};
        }
        &:active {
          background: ${t.color.state.pressed};
          color: ${a};
        }
      `,outline:W`
        background: transparent;
        color: ${i};
        border-color: ${i};
        &:hover {
          background: ${t.color.state.hover};
          color: ${a};
          border-color: ${a};
        }
        &:active {
          background: ${t.color.state.pressed};
          color: ${a};
          border-color: ${a};
        }
      `,solid:W`
        background: ${o};
        color: ${l};
        border-color: ${u};
        &:hover {
          background: ${s};
          border-color: ${s};
          box-shadow: ${t.shadow.xs};
        }
        &:active {
          background: ${c};
          border-color: ${c};
          box-shadow: ${t.shadow.sm};
        }
      `}},i={primary:r(`primary`),secondary:r(`secondary`),info:r(`info`),warning:r(`warning`),danger:r(`danger`),success:r(`success`)},o=e=>{let n=e===`red`?`error`:e===`yellow`?`warning`:e===`green`?`success`:e===`blue`||e===`cyan`||e===`teal`?`info`:`neutral`;return t.color.status[n].solidFill};return{logo:W`
      cursor: pointer;
      display: flex;
      flex-direction: column;
      background-color: transparent;
      border: none;
      width: 48px;
      height: 48px;
      font-family: ${t.font.body};
      gap: ${t.gap.tight};
      padding: 0;
      &:hover {
        opacity: 0.7;
      }
    `,selectWrapper:W`
      width: 100%;
      max-width: ${320}px;
      display: flex;
      flex-direction: column;
      gap: ${t.gap.tight};
    `,selectContainer:W`
      width: 100%;
      &::selection,
      & *::selection {
        background: ${t.color.state.selectionFill};
        color: ${t.color.state.selectionText};
      }
    `,selectLabel:W`
      font: ${t.type.labelSm.weight} ${t.type.labelSm.size} /
        ${t.type.labelSm.lineHeight} ${t.font.body};
      letter-spacing: ${t.type.labelSm.tracking};
      color: ${t.color.text.primary};
      text-align: left;
    `,selectDescription:W`
      font: ${t.type.bodyXs.weight} ${t.type.bodyXs.size} /
        ${t.type.bodyXs.lineHeight} ${t.font.body};
      color: ${t.color.text.secondary};
      margin: 0;
      text-align: left;
    `,select:W`
      /* The platform chevron is drawn in the OS accent, which reads as foreign
         next to the rest of the panel — draw our own from currentColor instead
         so it follows the theme. */
      appearance: none;
      -webkit-appearance: none;
      width: 100%;
      box-sizing: border-box;
      padding: ${t.padding.controlBlock} 28px
        ${t.padding.controlBlock} ${t.padding.controlInline};
      border-radius: ${t.radius.control};
      background-color: ${t.color.surface.elevated};
      background-image:
        linear-gradient(45deg, transparent 50%, currentColor 50%),
        linear-gradient(135deg, currentColor 50%, transparent 50%);
      background-position:
        right 14px center,
        right 9px center;
      background-size:
        5px 5px,
        5px 5px;
      background-repeat: no-repeat;
      color: ${t.color.text.primary};
      border: 1px solid ${t.color.border.control};
      font: ${t.type.bodySm.weight} ${t.type.bodySm.size} /
        ${t.type.bodySm.lineHeight} ${t.font.body};
      transition:
        border-color 0.15s ease,
        background-color 0.15s ease;
      cursor: pointer;

      &:hover {
        border-color: ${t.color.border.focus};
      }

      &:focus-visible {
        outline: 2px solid ${t.color.border.focus};
        outline-offset: 2px;
      }
      /* The custom chevron is decorative; let the platform draw its own when
         the user forces system colours. */
      @media (forced-colors: active) {
        appearance: auto;
        background-image: none;
      }
      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }
    `,inputWrapper:W`
      width: 100%;
      max-width: ${320}px;
      display: flex;
      flex-direction: column;
      gap: ${t.gap.tight};
    `,inputContainer:W`
      width: 100%;
      &::selection,
      & *::selection {
        background: ${t.color.state.selectionFill};
        color: ${t.color.state.selectionText};
      }
    `,inputLabel:W`
      font: ${t.type.labelSm.weight} ${t.type.labelSm.size} /
        ${t.type.labelSm.lineHeight} ${t.font.body};
      letter-spacing: ${t.type.labelSm.tracking};
      color: ${t.color.text.primary};
      text-align: left;
    `,inputDescription:W`
      font: ${t.type.bodyXs.weight} ${t.type.bodyXs.size} /
        ${t.type.bodyXs.lineHeight} ${t.font.body};
      color: ${t.color.text.secondary};
      margin: 0;
      text-align: left;
    `,input:W`
      appearance: none;
      box-sizing: border-box;
      width: 100%;
      padding: ${t.padding.controlBlock}
        ${t.padding.controlInline};
      border-radius: ${t.radius.control};
      background-color: ${t.color.surface.elevated};
      color: ${t.color.text.primary};
      border: 1px solid ${t.color.border.control};
      font: ${t.type.bodySm.weight} ${t.type.bodySm.size} /
        ${t.type.bodySm.lineHeight} ${t.font.body};
      transition: all 0.15s ease;

      &::placeholder {
        color: ${t.color.text.secondary};
      }

      &:hover {
        border-color: ${t.color.border.focus};
      }

      &:focus {
        outline: 2px solid ${t.color.border.focus};
        outline-offset: 2px;
      }
    `,checkboxWrapper:W`
      display: flex;
      align-items: flex-start;
      gap: ${t.gap.control};
      cursor: pointer;
      user-select: none;
      padding: ${t.padding.controlBlock}
        ${t.padding.controlInline};
      border-radius: ${t.radius.control};
      transition: background-color 0.15s ease;

      &:hover {
        background-color: ${t.color.state.hover};
      }
    `,checkboxContainer:W`
      width: 100%;
      &::selection,
      & *::selection {
        background: ${t.color.state.selectionFill};
        color: ${t.color.state.selectionText};
      }
    `,checkboxLabelContainer:W`
      display: flex;
      flex-direction: column;
      gap: ${t.gap.tight};
      flex: 1;
    `,checkbox:W`
      appearance: none;
      width: ${t.space[4]};
      height: ${t.space[4]};
      border: 2px solid ${t.color.border.control};
      border-radius: ${t.radius.control};
      background-color: ${t.color.surface.elevated};
      display: grid;
      place-items: center;
      transition: all 0.15s ease;
      flex-shrink: 0;
      margin-top: ${t.space[1]};

      &:hover {
        border-color: ${t.color.border.focus};
      }

      &:focus-visible {
        outline: 2px solid ${t.color.border.focus};
        outline-offset: 2px;
      }

      &:checked {
        background-color: ${t.color.state.selectionFill};
        border-color: ${t.color.state.selectionFill};
      }

      &:checked::after {
        content: '';
        width: ${t.space[1]};
        height: ${t.space[2]};
        border: solid ${t.color.state.selectionText};
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
        margin-top: -3px;
      }
    `,checkboxLabel:W`
      color: ${t.color.text.primary};
      font: ${t.type.labelSm.weight} ${t.type.labelSm.size} /
        ${t.type.labelSm.lineHeight} ${t.font.body};
      letter-spacing: ${t.type.labelSm.tracking};
      text-align: left;
    `,checkboxDescription:W`
      color: ${t.color.text.secondary};
      font: ${t.type.bodyXs.weight} ${t.type.bodyXs.size} /
        ${t.type.bodyXs.lineHeight} ${t.font.body};
      text-align: left;
    `,button:{base:W`
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-family: ${t.font.body};
        font-size: ${t.type.bodyXs.size};
        line-height: ${t.type.bodyXs.lineHeight};
        font-weight: ${t.type.labelSm.weight};
        border-radius: ${t.radius.control};
        padding: ${t.padding.controlBlock}
          ${t.padding.controlInline};
        cursor: pointer;
        transition:
          background 0.15s,
          color 0.15s,
          border 0.15s,
          box-shadow 0.15s;
        &:focus-visible {
          outline: 2px solid ${t.color.border.focus};
          outline-offset: 2px;
        }
        border-width: 1px;
        border-style: solid;
        &:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }
      `,variant(e,t,n){let r=i[e];return n?r.ghost:t?r.outline:r.solid}},tag:{dot:e=>W`
        width: ${t.space[1]};
        height: ${t.space[1]};
        border-radius: 9999px;
        background-color: ${o(e)};
      `,base:W`
        display: flex;
        gap: ${t.gap.tight};
        box-sizing: border-box;
        background: ${t.color.surface.subtle};
        color: ${t.color.text.primary};
        border-radius: ${t.radius.control};
        font-size: ${t.type.bodyXs.size};
        line-height: ${t.type.bodyXs.lineHeight};
        font-family: ${t.font.body};
        padding: ${t.padding.controlBlock}
          ${t.padding.controlInline};
        align-items: center;
        font-weight: ${t.type.labelSm.weight};
        border: 1px solid ${t.color.border.control};
        user-select: none;
        position: relative;
        &::selection,
        & *::selection {
          background: ${t.color.state.selectionFill};
          color: ${t.color.state.selectionText};
        }
        &:focus-visible {
          outline-offset: 2px;
          outline: 2px solid ${t.color.border.focus};
        }
      `,label:W`
        font-size: ${t.type.bodyXs.size};
        line-height: ${t.type.bodyXs.lineHeight};
        font-family: ${t.font.body};
        letter-spacing: ${t.type.labelSm.tracking};
      `,count:W`
        font-size: ${t.type.bodyXs.size};
        padding: 0 ${t.space[1]};
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${t.color.text.secondary};
        background-color: ${t.color.state.hover};
        border-radius: ${t.radius.control};
        line-height: ${t.type.bodyXs.lineHeight};
        font-family: ${t.font.body};
        font-variant-numeric: tabular-nums;
        min-height: ${t.space[4]};
      `},tree:{info:W`
        color: ${t.color.text.secondary};
        font-size: ${t.type.bodyXs.size};
        margin-right: ${t.space[1]};
      `,actionButton:W`
        background-color: transparent;
        color: ${t.color.text.secondary};
        border: none;
        display: inline-flex;
        padding: 0;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: ${t.space[3]};
        height: ${t.space[3]};
        position: relative;
        z-index: 1;

        &:hover svg {
          color: ${t.color.text.primary};
        }

        &:focus-visible {
          border-radius: ${t.radius.control};
          outline: 2px solid ${t.color.border.focus};
          outline-offset: 2px;
        }
      `,actionSuccess:W`
        color: ${t.color.status.success.text};
      `,actionError:W`
        color: ${t.color.status.error.text};
      `,expanderContainer:W`
        position: relative;
      `,expander:W`
        position: absolute;
        cursor: pointer;
        left: -16px;
        top: 3px;
        & path {
          stroke: ${t.color.text.link};
        }
        & svg {
          width: ${t.space[3]};
          height: ${t.space[3]};
        }

        display: inline-flex;
        align-items: center;
        transition: all 0.1s ease;
        &:focus-visible {
          border-radius: ${t.radius.control};
          outline: 2px solid ${t.color.border.focus};
          outline-offset: 2px;
        }
      `,expandedLine:e=>W`
        display: block;
        padding-left: ${t.space[3]};
        margin-left: -${t.space[3]};
        ${e?`border-left: 1px solid ${t.color.border.decorative};`:``}
      `,collapsible:W`
        cursor: pointer;
        transition: all 0.2s ease;
        &:hover {
          background-color: ${t.color.state.hover};
          border-radius: ${t.radius.control};
          padding: 0 ${t.space[1]};
        }
      `,actions:W`
        display: inline-flex;
        margin-left: ${t.space[2]};
        gap: ${t.gap.control};
        align-items: center;
        & svg {
          height: 12px;
          width: 12px;
        }
      `,valueCollapsed:W`
        color: ${t.color.text.secondary};
      `,valueFunction:W`
        color: ${t.color.syntax.keyword};
      `,valueString:W`
        color: ${t.color.syntax.string};
      `,valueNumber:W`
        color: ${t.color.syntax.number};
      `,valueBoolean:W`
        color: ${t.color.syntax.keyword};
      `,valueNull:W`
        color: ${t.color.syntax.comment};
        font-style: italic;
      `,valueKey:W`
        color: ${t.color.syntax.property};
      `,valueBraces:W`
        color: ${t.color.syntax.punctuation};
      `,valueContainer:e=>W`
        display: block;
        font-family: ${t.font.mono};
        &::selection,
        & *::selection {
          background: ${t.color.state.selectionFill};
          color: ${t.color.state.selectionText};
        }
        & [data-tsd-syntax]::selection {
          background: ${t.color.syntax.selectionFill};
          color: ${t.color.syntax.selectionText};
        }
        margin-left: ${e?`0`:t.space[4]};

        &:not(:hover) .actions {
          display: none;
        }

        &:hover .actions {
          display: inline-flex;
        }
      `},header:{row:W`
        display: flex;
        justify-content: space-between;
        align-items: center;
        &::selection,
        & *::selection {
          background: ${t.color.state.selectionFill};
          color: ${t.color.state.selectionText};
        }
        padding: ${t.space[2]} ${t.space[3]};
        gap: ${t.gap.control};
        background: ${t.color.surface.elevated};
        color: ${t.color.text.primary};
        border-bottom: ${t.color.border.decorative} 1px solid;
        align-items: center;
      `,logoAndToggleContainer:W`
        display: flex;
        gap: ${t.gap.section};
        align-items: center;
        & > button {
          padding: 0;
          background: transparent;
          border: none;
          display: flex;
          gap: ${t.gap.tight};
          flex-direction: column;
        }
      `,logo:W`
        cursor: pointer;
        display: flex;
        flex-direction: column;
        background-color: transparent;
        border: none;
        gap: ${t.gap.tight};
        padding: 0;
        &:hover {
          opacity: 0.7;
        }
        &:focus-visible {
          outline-offset: 2px;
          border-radius: ${t.radius.control};
          outline: 2px solid ${t.color.border.focus};
        }
      `,tanstackLogo:W`
        font-size: ${t.type.headingPane.size};
        line-height: ${t.type.headingPane.lineHeight};
        font-family: ${t.font.display};
        font-weight: ${t.type.headingPane.weight};
        white-space: nowrap;
        color: ${t.color.text.primary};
      `,flavorLogo:(e,r)=>W`
        font-weight: ${t.type.labelSm.weight};
        font-size: ${t.type.labelSm.size};
        line-height: ${t.type.labelSm.lineHeight};
        font-family: ${t.font.body};
        letter-spacing: ${t.type.labelSm.tracking};
        color: ${n(e,r)};
        white-space: nowrap;
      `},section:{main:W`
        margin-bottom: ${t.space[4]};
        padding: ${t.space[4]};
        background-color: ${t.color.surface.subtle};
        border: 1px solid ${t.color.border.decorative};
        border-radius: ${t.radius.overlay};
        box-shadow: ${t.shadow.xs};
        &::selection,
        & *::selection {
          background: ${t.color.state.selectionFill};
          color: ${t.color.state.selectionText};
        }
      `,title:W`
        font-size: ${t.type.headingPane.size};
        line-height: ${t.type.headingPane.lineHeight};
        font-weight: ${t.type.headingPane.weight};
        color: ${t.color.text.primary};
        font-family: ${t.font.display};
        margin: 0 0 ${t.space[3]} 0;
        padding-bottom: ${t.space[2]};
        border-bottom: 1px solid ${t.color.border.decorative};
        display: flex;
        align-items: center;
        gap: ${t.gap.control};
        text-align: left;
      `,icon:W`
        height: 18px;
        width: 18px;
        & > svg {
          height: 100%;
          width: 100%;
        }
        color: ${t.color.text.secondary};
      `,description:W`
        color: ${t.color.text.secondary};
        font: ${t.type.bodyXs.weight} ${t.type.bodyXs.size} /
          ${t.type.bodyXs.lineHeight} ${t.font.body};
        margin: 0 0 ${t.space[4]} 0;
        text-align: left;
      `},mainPanel:{panel:e=>W`
        /* space[4] keeps the panel's own gutter equal to the workbench gutter,
           so a destination's content lines up with the tab strip above it. */
        padding: ${e?t.space[4]:0};
        background: ${t.color.surface.workspace};
        color: ${t.color.text.primary};
        overflow-y: auto;
        /* Keep a scroll gesture inside the devtools instead of chaining it on
           to the host page once this panel hits its end. */
        overscroll-behavior: contain;
        scrollbar-width: thin;
        scrollbar-color: ${t.color.border.control} transparent;
        &::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        &::-webkit-scrollbar-track {
          background: transparent;
        }
        &::-webkit-scrollbar-thumb {
          background-color: ${t.color.border.control};
          border-radius: 999px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        &::-webkit-scrollbar-thumb:hover {
          background-color: ${t.color.text.muted};
        }
        &::-webkit-scrollbar-corner {
          background: transparent;
        }
        height: 100%;
        &::selection,
        & *::selection {
          background: ${t.color.state.selectionFill};
          color: ${t.color.state.selectionText};
        }
      `}}};function G(){let{theme:e}=ze(),[t,n]=v(Ze(e()));return d(()=>{n(Ze(e()))}),t}var Qe=B(`<div><label><input data-tsd-control type=checkbox><div>`),$e=B(`<span>`);function et(e){let n=G(),[r,i]=v(e.checked||!1),a=`${t()}-description`,o=t=>{let n=t.target.checked;i(n),e.onChange?.(n)};return(()=>{var t=Qe(),i=t.firstChild,c=i.firstChild,l=c.nextSibling;return c.$$input=o,h(l,(()=>{var t=_(()=>!!e.label);return()=>t()&&(()=>{var t=$e();return h(t,()=>e.label),T(()=>F(t,n().checkboxLabel)),t})()})(),null),h(l,(()=>{var t=_(()=>!!e.description);return()=>t()&&(()=>{var t=$e();return s(t,`id`,a),h(t,()=>e.description),T(()=>F(t,n().checkboxDescription)),t})()})(),null),T(o=>{var u=n().checkboxContainer,d=n().checkboxWrapper,f=r()?`true`:void 0,p=e.description?a:void 0,m=n().checkbox,h=n().checkboxLabelContainer;return u!==o.e&&F(t,o.e=u),d!==o.t&&F(i,o.t=d),f!==o.a&&s(c,`data-tsd-selected`,o.a=f),p!==o.o&&s(c,`aria-describedby`,o.o=p),m!==o.i&&F(c,o.i=m),h!==o.n&&F(l,o.n=h),o},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0}),T(()=>c.checked=e.checked??r()),t})()}m([`input`]);var tt=B(`<div><div><input data-tsd-control>`),nt=B(`<label>`),rt=B(`<p>`);function it(e){let n=G(),[r,i]=v(e.value||``),a=t(),o=`${a}-description`,c=t=>{let n=t.target.value;i(e=>e===n?e:n),e.onChange?.(n)};return(()=>{var t=tt(),i=t.firstChild,l=i.firstChild;return h(i,(()=>{var t=_(()=>!!e.label);return()=>t()&&(()=>{var t=nt();return s(t,`for`,a),h(t,()=>e.label),T(()=>F(t,n().inputLabel)),t})()})(),l),h(i,(()=>{var t=_(()=>!!e.description);return()=>t()&&(()=>{var t=rt();return s(t,`id`,o),h(t,()=>e.description),T(()=>F(t,n().inputDescription)),t})()})(),l),l.$$input=c,s(l,`id`,a),T(r=>{var a=n().inputContainer,c=n().inputWrapper,u=e.description?o:void 0,d=e.type||`text`,f=n().input,p=e.placeholder;return a!==r.e&&F(t,r.e=a),c!==r.t&&F(i,r.t=c),u!==r.a&&s(l,`aria-describedby`,r.a=u),d!==r.o&&s(l,`type`,r.o=d),f!==r.i&&F(l,r.i=f),p!==r.n&&s(l,`placeholder`,r.n=p),r},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0}),T(()=>l.value=r()),t})()}m([`input`]);var at=B(`<div><div><select data-tsd-control>`),ot=B(`<label>`),st=B(`<p>`),ct=B(`<option>`);function lt(e){let n=G(),[r,i]=v(e.value??e.options[0]?.value),a=t(),o=`${a}-description`;d(()=>{e.value!==void 0&&i(()=>e.value)});let c=t=>{let n=t.target.value,r=e.options.find(e=>String(e.value)===n);r&&(i(()=>r.value),e.onChange?.(r.value))};return(()=>{var t=at(),i=t.firstChild,l=i.firstChild;return h(i,(()=>{var t=_(()=>!!e.label);return()=>t()&&(()=>{var t=ot();return s(t,`for`,a),h(t,()=>e.label),T(()=>F(t,n().selectLabel)),t})()})(),l),h(i,(()=>{var t=_(()=>!!e.description);return()=>t()&&(()=>{var t=st();return s(t,`id`,o),h(t,()=>e.description),T(()=>F(t,n().selectDescription)),t})()})(),l),l.addEventListener(`change`,c),s(l,`id`,a),h(l,()=>e.options.map(e=>(()=>{var t=ct();return h(t,()=>e.label),T(()=>t.value=e.value),t})())),T(r=>{var a=n().selectContainer,c=n().selectWrapper,u=e.description?o:void 0,d=n().select;return a!==r.e&&F(t,r.e=a),c!==r.t&&F(i,r.t=c),u!==r.a&&s(l,`aria-describedby`,r.a=u),d!==r.o&&F(l,r.o=d),r},{e:void 0,t:void 0,a:void 0,o:void 0}),T(()=>l.value=r()),t})()}var ut=B(`<svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path><path d="M12 2v2"></path><path d="M12 22v-2"></path><path d="m17 20.66-1-1.73"></path><path d="M11 10.27 7 3.34"></path><path d="m20.66 17-1.73-1"></path><path d="m3.34 7 1.73 1"></path><path d="M14 12h8"></path><path d="M2 12h2"></path><path d="m20.66 7-1.73 1"></path><path d="m3.34 17 1.73-1"></path><path d="m17 3.34-1 1.73"></path><path d="m11 13.73-4 6.93">`),dt=B(`<svg xmlns=http://www.w3.org/2000/svg width=20 height=20 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="m10 9-3 3 3 3"></path><path d="m14 15 3-3-3-3"></path><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719">`),ft=B(`<svg xmlns=http://www.w3.org/2000/svg width=20 height=20 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M10 8h.01"></path><path d="M12 12h.01"></path><path d="M14 8h.01"></path><path d="M16 12h.01"></path><path d="M18 8h.01"></path><path d="M6 8h.01"></path><path d="M7 16h10"></path><path d="M8 12h.01"></path><rect width=20 height=16 x=2 y=4 rx=2>`),pt=B(`<svg xmlns=http://www.w3.org/2000/svg width=20 height=20 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx=12 cy=10 r=3>`),mt=B(`<svg xmlns=http://www.w3.org/2000/svg width=20 height=20 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M9 17H7A5 5 0 0 1 7 7h2"></path><path d="M15 7h2a5 5 0 1 1 0 10h-2"></path><line x1=8 x2=16 y1=12 y2=12>`),ht=B(`<svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M18 6 6 18"></path><path d="m6 6 12 12">`),gt=B(`<svg width=20 height=20 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M16.5 9.39999L7.5 4.20999M12 17.5L12 3M21 16V7.99999C20.9996 7.64926 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.26999L13 2.26999C12.696 2.09446 12.3511 2.00204 12 2.00204C11.6489 2.00204 11.304 2.09446 11 2.26999L4 6.26999C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64926 3 7.99999V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),_t=B(`<svg width=18 height=18 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7088 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.76489 14.1003 1.98232 16.07 2.85999M22 4L12 14.01L9 11.01"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),vt=B(`<svg width=18 height=18 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),yt=B(`<svg width=20 height=20 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M6 9L12 15L18 9"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),bt=B(`<svg width=18 height=18 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),xt=B(`<svg width=12 height=12 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M21 13V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H11M15 3H21M21 3V9M21 3L10 14"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),St=B(`<svg width=20 height=20 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round></path><path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),Ct=B(`<svg width=20 height=20 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M18 6L6 18M6 6L18 18"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`),wt=B(`<svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M2 10h6V4"></path><path d="m2 4 6 6"></path><path d="M21 10V7a2 2 0 0 0-2-2h-7"></path><path d="M3 14v2a2 2 0 0 0 2 2h3"></path><rect x=12 y=14 width=10 height=7 rx=1>`);function Tt(){return ut()}function Et(){return dt()}function Dt(){return ft()}function Ot(){return pt()}function kt(){return mt()}function At(){return ht()}function jt(){return gt()}function Mt(){return _t()}function Nt(){return vt()}function Pt(){return yt()}function Ft(){return bt()}function It(){return xt()}function Lt(){return St()}function Rt(){return Ct()}function zt(){return wt()}function Bt(e){var t,n,r=``;if(typeof e==`string`||typeof e==`number`)r+=e;else if(typeof e==`object`){if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(n=Bt(e[t]))&&(r&&(r+=` `),r+=n)}else for(n in e)e[n]&&(r&&(r+=` `),r+=n)}return r}function K(){for(var e,t,n=0,r=``,i=arguments.length;n<i;n++)(e=arguments[n])&&(t=Bt(e))&&(r&&(r+=` `),r+=t);return r}var Vt=B(`<button data-tsd-control>`);function Ht(e){let t=G(),n=E(()=>{let n=e.variant||`primary`;return K(t().button.base,t().button.variant(n,e.outline,e.ghost),e.className)});return(()=>{var t=Vt();return p(t,L(e,{get class(){return n()}}),!1,!0),h(t,()=>e.children),t})()}var Ut=B(`<div data-tsd-surface>`),Wt=({className:e,children:t,class:n,withPadding:r})=>{let i=G();return(()=>{var a=Ut();return h(a,t),T(()=>F(a,K(i().mainPanel.panel(!!r),e,n))),a})()},Gt=B(`<section data-tsd-surface>`),Kt=B(`<h3 data-tsd-separator>`),qt=B(`<p>`),Jt=B(`<span>`),Yt=({children:e,...t})=>{let n=G();return(()=>{var r=Gt();return p(r,L({get class(){return K(n().section.main,t.class)}},t),!1,!0),h(r,e),r})()},Xt=({children:e,...t})=>{let n=G();return(()=>{var r=Kt();return p(r,L({get class(){return K(n().section.title,t.class)}},t),!1,!0),h(r,e),r})()},Zt=({children:e,...t})=>{let n=G();return(()=>{var r=qt();return p(r,L({get class(){return K(n().section.description,t.class)}},t),!1,!0),h(r,e),r})()},Qt=({children:e,...t})=>{let n=G();return(()=>{var r=Jt();return p(r,L({get class(){return K(n().section.icon,t.class)}},t),!1,!0),h(r,e),r})()},$t=class{#e;constructor({pluginId:e}){this.#e=e}getPluginId(){return this.#e}createEventPayload(e,t){return{type:`${this.#e}:${e}`,payload:t,pluginId:this.#e}}emit(e,t){}on(e,t,n){return()=>{}}onAll(e){return()=>{}}onAllPluginEvents(e){return()=>{}}},q=new class extends $t{constructor(){super({pluginId:`tanstack-devtools-core`})}},en=de();function tn(){return M(en)}function nn(e){let t=e??tn(),n=null;return{join:(e,r)=>{n=t?.add(e,r)??null},leave:()=>{n?.(),n=null}}}function rn(e,t,n,r){return{shift:e,ctrl:t,alt:n,meta:r}}function an(e){return rn(e.shiftKey,e.ctrlKey,e.altKey,e.metaKey)}function on(e){return rn(e.shiftKey,e.ctrlKey,e.altKey,e.metaKey)}function sn(e,t,n){return{kind:`pointer`,phase:t,clientX:e.clientX,clientY:e.clientY,target:e.target,modifiers:an(e),timestamp:e.timeStamp,delta:n,native:e,pointer:{pointerId:e.pointerId,pointerType:e.pointerType,button:e.button,buttons:e.buttons,pressure:e.pressure}}}function cn(e){let t=e.native??null,n=e.modifiers?{shift:e.modifiers.shift??!1,ctrl:e.modifiers.ctrl??!1,alt:e.modifiers.alt??!1,meta:e.modifiers.meta??!1}:t?on(t):rn(!1,!1,!1,!1);return{kind:`keyboard`,phase:e.phase,clientX:e.clientX,clientY:e.clientY,target:e.target??t?.target??null,modifiers:n,timestamp:e.timestamp??t?.timeStamp??performance.now(),delta:e.delta,native:t,keyboard:{key:e.key,code:e.code??t?.code??e.key,repeat:e.repeat??t?.repeat??!1},pointerId:e.pointerId??-1}}function ln(e){return e.kind===`pointer`}function un(e){return e.kind===`pointer`?e.pointer.pointerId:e.pointerId}function J(e,t,n,r){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)}var dn=0;function fn(e){return`${e}-${++dn}`}var pn=new Set;function mn(e,t){pn.has(e)||(pn.add(e),console.warn(t))}var hn=typeof SVGTransform<`u`?SVGTransform.SVG_TRANSFORM_TRANSLATE:2,gn=Symbol(`neodrag.translate.default`),_n=new WeakMap,vn=new WeakMap;function Y(e,t,n,r=gn){let i=_n.get(e);i||(i=new Map,_n.set(e,i));let a=i.get(r);if(a){if(a.x===t&&a.y===n)return;a.x=t,a.y=n}else i.set(r,{x:t,y:n});bn(e,i)}function yn(e,t){let n=_n.get(e);if(n){if(t!==void 0&&n.size>1){if(!n.delete(t))return;bn(e,n);return}_n.delete(e),vn.delete(e),xn(e,0,0,!0)}}function bn(e,t){let n=0,r=0;for(let e of t.values())n+=e.x,r+=e.y;let i=vn.get(e);i&&i.x===n&&i.y===r||(i?(i.x=n,i.y=r):vn.set(e,{x:n,y:r}),xn(e,n,r,!1))}function xn(e,t,n,r){if(e instanceof SVGElement){let i=e,a=i.transform?.baseVal;if(!a)return;if(r){for(let e=a.numberOfItems-1;e>=0;e--)a.getItem(e).type===hn&&a.removeItem(e);return}let o=i.ownerSVGElement;if(!o)return;for(let e=0;e<a.numberOfItems;e++)if(a.getItem(e).type===hn){a.getItem(e).setTranslate(t,n);return}let s=o.createSVGTransform();s.setTranslate(t,n),a.insertItemBefore(s,0);return}e.style.translate=r?``:`${t}px ${n}px`}var Sn=new WeakMap,Cn=0;function X(e){if(typeof e==`object`&&e){let t=e;if(`id`in t)return String(t.id);if(`key`in t)return String(t.key);let n=Sn.get(t);return n===void 0&&Sn.set(t,n=`⁣${Cn+=1}`),n}return String(e)}function wn(e,t){let n=e.find(e=>X(e)===t.itemId);if(!n)return e.slice();let r=e.filter(e=>X(e)!==t.itemId);if(t.afterId===null)return[n,...r];let i=r.findIndex(e=>X(e)===t.afterId);return i===-1?[...r,n]:[...r.slice(0,i+1),n,...r.slice(i+1)]}function Tn(e,t,n){let r=e[t],i=e.filter((e,n)=>n!==t);return{itemId:r,afterId:n<=0?null:i[n-1]??null}}function En(e,t){let n=[];for(let r=0;r<e.length;r++){let i=e[r],a=t===`x`?(i.left+i.right)/2:(i.top+i.bottom)/2;n.push({key:i.key,mid:a,index:r})}return n.sort((e,t)=>e.mid-t.mid),n}function Dn(e,t,n,r,i={}){if(e.length===0)return 0;let a=i.edgeThresholdPx??0,o=(n?e.find(e=>e.key===n):void 0)?.index??-1;if(!i.skipDragDeadZone&&i.dragFootprint&&o>=0){let{start:e,end:n}=i.dragFootprint;if(t>=e&&t<=n)return o}let s=0;for(let r of e)r.key!==n&&t>r.mid+a&&s++;return Math.min(Math.max(s,0),r)}function On(e,t,n,r,i){if(e<0||e===t||Math.abs(t-e)!==1)return t;if(t>e){let t=r[e];if(t!==void 0&&n<t+i)return e}else{let a=r[t];if(a!==void 0&&n>a-i)return e}return t}function kn(e,t,n,r,i){if(e<0||e===t||Math.abs(t-e)!==1||r.length===0)return t;if(r.length===1){let a=r[0].mid,o=Math.max(24,i*2);return t>e&&n<a+o||t<e&&n>a-o?e:t}if(t>e){if(n<(r[e].mid+r[e+1].mid)/2+i)return e}else if(n>(r[t].mid+r[t+1].mid)/2-i)return e;return t}function An(e){return{x:(e.left+e.right)/2,y:(e.top+e.bottom)/2}}function jn(e,t,n){return t>=e.left&&t<=e.right&&n>=e.top&&n<=e.bottom}function Mn(e,t,n,r=`closestCenter`){if(e.length===0)return 0;if(r===`pointerWithin`){for(let r=0;r<e.length;r++)if(jn(e[r],t,n))return r}let i=0,a=1/0;for(let r=0;r<e.length;r++){let o=An(e[r]),s=t-o.x,c=n-o.y,l=s*s+c*c;l<a&&(a=l,i=r)}return i}function Nn(e,t,n){let r=new Map;if(t===n)return r;let i=t=>({x:e[t].left,y:e[t].top});if(n>t)for(let a=t+1;a<=n&&a<e.length;a++){let e=i(a),t=i(a-1);r.set(a,{x:t.x-e.x,y:t.y-e.y})}else for(let e=n;e<t&&e>=0;e++){let t=i(e),n=i(e+1);r.set(e,{x:n.x-t.x,y:n.y-t.y})}return r}var Pn=`cubic-bezier(0.22, 1, 0.36, 1)`;function Fn(e){return typeof e.animate==`function`}function In(e){if(typeof e.getAnimations==`function`)for(let t of e.getAnimations())t.cancel()}function Ln(e){typeof requestAnimationFrame==`function`?requestAnimationFrame(e):e()}function Rn(e){let t=new Map;for(let n of e)t.set(n,n.getBoundingClientRect());return t}async function zn(e,t,n){if(n<=0)return;let r=[...e],i=[];for(let e of r){let r=t.get(e);if(!r)continue;let a=e.getBoundingClientRect(),o=r.left-a.left,s=r.top-a.top;if(Math.abs(o)<2&&Math.abs(s)<2||!Fn(e))continue;let c=e.animate({transform:[`translate(${o}px, ${s}px)`,`translate(0px, 0px)`]},{duration:n,easing:Pn,fill:`none`});i.push(c)}if(i.length!==0){await Promise.all(i.map(e=>e.finished.catch(()=>{e.cancel()})));for(let e of r)In(e)}}function Bn(e){return e===void 0||e===!0?200:e===!1?0:Math.max(0,e)}var Vn=`data-neodrag-sortable-lifted`,Hn=`data-neodrag-sortable-placeholder`;function Un(e){if(e.transform&&e.transform!==`none`||e.translate&&e.translate!==`none`||e.perspective&&e.perspective!==`none`||e.filter&&e.filter!==`none`||e.backdropFilter&&e.backdropFilter!==`none`)return!0;let t=e.willChange;if(!t||t===`auto`)return!1;for(let e of t.split(`,`)){let t=e.trim();if(t===`transform`||t===`perspective`)return!0}return!1}function Wn(e){let t=e.parentElement,n=e.ownerDocument?.documentElement??document.documentElement;for(;t&&t!==n;){if(Un(getComputedStyle(t)))return t;t=t.parentElement}return n}function Gn(e,t){let n=Wn(e);if(n===(e.ownerDocument?.documentElement??document.documentElement))return{left:t.left,top:t.top};let r=n.getBoundingClientRect();return{left:t.left-r.left,top:t.top-r.top}}function Kn(e){let t=e.getBoundingClientRect(),n=e.style,r={position:n.position,left:n.left,top:n.top,width:n.width,height:n.height,margin:n.margin,zIndex:n.zIndex,translate:n.translate,placeholder:null},i=e.parentElement;if(i){let n=e.ownerDocument.createElement(e.tagName);n.setAttribute(Hn,``),n.style.minWidth=`${t.width}px`,n.style.minHeight=`${t.height}px`,n.style.flexShrink=`0`,n.style.visibility=`hidden`,n.style.pointerEvents=`none`,i.insertBefore(n,e),r.placeholder={node:n,minWidth:n.style.minWidth,minHeight:n.style.minHeight,flexShrink:n.style.flexShrink}}let{left:a,top:o}=Gn(e,t);return n.position=`fixed`,n.left=`${a}px`,n.top=`${o}px`,n.width=`${t.width}px`,n.height=`${t.height}px`,n.margin=`0`,n.zIndex=`1000`,n.translate=``,e.setAttribute(Vn,``),r}function qn(e,t,n){e.style.translate=`${t}px ${n}px`}function Jn(e,t){for(let t of e.getAnimations())t.cancel();let n=e.style;n.position=t.position,n.left=t.left,n.top=t.top,n.width=t.width,n.height=t.height,n.margin=t.margin,n.zIndex=t.zIndex,n.translate=t.translate,e.removeAttribute(Vn),t.placeholder&&t.placeholder.node.remove()}var Yn=0,Xn=1e3,Zn=2e3,Qn=3e3;function $n(e){if(!e.length)return null;let t=1/0,n=1/0,r=-1/0,i=-1/0;for(let a of e)t=Math.min(t,a.left),n=Math.min(n,a.top),r=Math.max(r,a.right),i=Math.max(i,a.bottom);return{left:t,top:n,right:r,bottom:i}}function er(e,t,n){let r=(n.left+n.right)/2,i=(n.top+n.bottom)/2;return Math.hypot(e-r,t-i)}function tr(e,t,n,r){return r===`x`?Math.max(n.left-e,0,e-n.right):Math.max(n.top-t,0,t-n.bottom)}function nr(e,t,n,r){return r===`x`?t>=n.top&&t<=n.bottom:e>=n.left&&e<=n.right}function rr(e,t,n){return e>=n.left&&e<=n.right&&t>=n.top&&t<=n.bottom}function ir(e,t,n){let r=e.rect();return rr(t,n,r)&&nr(t,n,r,e.axis)}function ar(e,t,n,r,i,a,o,s){if(!nr(e,t,n,r))return null;let c=tr(e,t,n,r);return c===0?o+er(e,t,n):!a||c>i?null:s+c}function or(e,t,n,r,i,a){let o=e.rects(),s=o.length>0,c=$n(o)??e.rect(),l=e.axis,u=ir(e,t,n),d=ir(e,r,i);if(!u&&!d)return null;let f=ar(t,n,c,l,a,s,Yn,Zn)??1/0,p=ar(r,i,c,l,a,s,Xn,Qn)??1/0,m=f;if(Number.isFinite(m)||(m=p),!Number.isFinite(m)){if(u)m=Yn+tr(t,n,c,l)+er(t,n,c);else if(d)m=Xn+tr(r,i,c,l)+er(r,i,c);else return null}return m}var sr=class{#e=new Map;register(e){this.#e.set(e.id,e)}unregister(e){this.#e.delete(e)}get(e){return this.#e.get(e)}pickBestForeignTarget(e,t,n,r,i,a,o){if(!e.group)return null;let s=null,c=1/0;for(let l of this.#e.values()){if(l.id===e.id||l.group!==e.group||o&&!o(l))continue;let u=or(l,t,n,r,i,a);u==null||u>=c||(c=u,s=l)}return s}findByContainerPointer(e,t,n,r){if(!e.group)return null;for(let i of this.#e.values())if(i.id!==e.id&&i.group===e.group&&(!r||r(i))&&ir(i,t,n))return i;return null}};function cr(e,t,n){let r=e.rects(),i=r.length;if(i===0)return 0;let a=e.axis,o=$n(r);if(a===`x`?t>o.right:n>o.bottom)return i;let s=a===`x`?t:n,c=0;for(let e=0;e<i;e++){let t=r[e];if(s>(a===`x`?(t.left+t.right)/2:(t.top+t.bottom)/2))c=e+1;else break}return Math.min(Math.max(c,0),i)}function lr(){return{stickyTargetId:null}}function ur(e,t,n,r,i,a,o,s,c){let l=e.pickBestForeignTarget(n,r,i,a,o,s,c);if(l||(l=e.findByContainerPointer(n,r,i,c),l))return t.stickyTargetId=l.id,l;if(t.stickyTargetId){let n=e.get(t.stickyTargetId)??null;if(n&&(!c||c(n))&&ir(n,r,i))return n;t.stickyTargetId=null}return null}var Z=`data-neodrag-sortable-key`,dr=`data-neodrag-sortable-dragging`,fr=`9999`,pr=`data-neodrag-sortable-elevated-source`,mr=`data-neodrag-sortable-indicator`,hr=`data-neodrag-sortable-ghost`,gr=`data-neodrag-sortable-remote-ghost`;function _r(e){return ln(e)?e.native.composedPath():e.target?[e.target]:[]}var vr=0,yr=class{container;options;id=Symbol(`sortable-${vr++}`);auto_target_id=fn(`sortable`);commit_subscribers=new Set;presence_subscribers=new Set;remote_ghosts=new Map;constructor(e,t){this.container=e,this.options=t}get axis(){return this.options.axis??`y`}get strategy(){return this.options.strategy??`list`}get targetId(){return this.options.id??this.auto_target_id}get hasExplicitId(){return this.options.id!=null}keys(){return this.options.items.map(e=>X(e))}},br=class{context;items;from_index;axis;slot;to_index;applied_to;lift=null;foreign_target=null;transfer_state=lr();boundaries;mids;footprint={start:0,end:0};constructor(e,t,n,r,i,a){this.context=e,this.items=t,this.from_index=n,this.axis=r,this.slot=i,this.to_index=n,this.applied_to=n,this.mids=a;let o=t[n]?.key;this.boundaries=a.filter(e=>e.key!==o).sort((e,t)=>e.mid-t.mid).map(e=>e.mid)}},xr=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}update(e){Object.assign(this.#t.options,e)}get targetId(){return this.#t.targetId}get hasExplicitId(){return this.#t.hasExplicitId}keys(){return this.#t.keys()}onCommit(e){return this.#t.commit_subscribers.add(e),()=>this.#t.commit_subscribers.delete(e)}onPresence(e){return this.#t.presence_subscribers.add(e),()=>this.#t.presence_subscribers.delete(e)}applyExternal(e){if(!(`type`in e)){let t=wn(this.#t.options.items,e);this.#t.options.onReorder(t,e);return}this.#e.applyExternalOp(this.#t,e)}showRemotePresence(e,t){e.type===`sortable`&&this.#e.showRemotePresence(this.#t,e,t)}clearRemotePresence(e,t){this.#e.clearRemotePresence(this.#t,e,t)}presence(){return this.#e.presenceFor(this.#t)}destroy(){this.#e._unbind(this.#t)}},Sr=Symbol(`neodrag.sortable`),Cr=class{key=Sr;name=`sortable`;priority=0;#e=new Map;#t=new sr;#n=null;#r=null;#i=-1;#a=new Set;#o=null;#s=``;#c=``;#l=null;#u=``;#d=``;#f=null;#p=new Map;#m=new Map;#h=()=>{this.#p.clear(),this.#m.clear()};#g=[];bind(e,t){let n=new yr(e,t);return t.onCommit&&t.id==null&&mn(`sortable:id`,"this sortable uses onCommit but has no `id` — auto ids are peer-local and will not match across collaborating clients. Give it a stable `id`."),this.#e.set(e,n),this.#t.register(this.#D(n)),new xr(this,n)}_unbind(e){this.#e.delete(e.container),this.#t.unregister(e.id)}resolve(e){for(let t of _r(e)){if(!(t instanceof HTMLElement)){if(t===document)break;continue}if(!t.hasAttribute(`data-neodrag-sortable-key`))continue;let e=t.parentElement;for(;e;){let n=this.#e.get(e);if(n)return n.options.disabled?null:{node:t,data:{ctx:n,key:t.getAttribute(Z)}};e=e.parentElement}}return null}start(e){let{ctx:t,key:n}=e.target.data,r=this.#R(t),i=r.findIndex(e=>e.key===n);if(i===-1)return;let a=this.#B(r,i,t.axis),o=En(this.#z(r),t.axis);this.#n=new br(t,r,i,t.axis,a,o);let s=r[i].node;s.setAttribute(dr,``);let c=t.options.indicator===`line`;this.#S(),(t.options.lift||c)&&(this.#n.lift=Kn(s)),c&&this.#n.lift&&this.#b(s,this.#n.lift),this.#v(s,t,!!this.#n.lift);let l=Bn(t.options.animation);if(!c&&l>0){let e=`translate ${l}ms ${Pn}`;for(let t=0;t<r.length;t++)t!==i&&(r[t].node.style.transition=e)}this.#r=null,this.#i=-1,this.#a.clear(),t.options.group&&(this.#p.clear(),this.#m.clear(),this.#O())}move(e){let t=this.#n;if(!t)return;let n=e.input.clientX-e.startInput.clientX,r=e.input.clientY-e.startInput.clientY,i=t.items[t.from_index].node,a=this.#A(t,e.input);if(a){t.foreign_target!==a&&(this.#G(t),this.#E(!0),t.foreign_target=a),this.#T(a,t,e.input),this.#_(i,t,n,r),this.#I(t);return}t.foreign_target&&(t.foreign_target=null,this.#E(!0),this.#W(t));let o=this.#V(t,e.input);o!==t.to_index&&(t.to_index=o,this.#H(t)),this.#_(i,t,n,r),this.#I(t)}end(e,t){let n=this.#n;if(!n)return;this.#n=null,this.#k(),this.#p.clear(),this.#m.clear();let r=n.context;for(let e of r.presence_subscribers)e(null);let i=n.items[n.from_index].node,a=Bn(r.options.animation),o=Math.min(n.from_index,n.to_index,n.applied_to),s=Math.max(n.from_index,n.to_index,n.applied_to),c=[];for(let e=o;e<=s;e++)c.push(n.items[e].node);let l=a>0?Rn(c):null,u=null;if(a>0&&t!==`cancel`&&n.foreign_target){let e=this.#N(n.foreign_target.id),t=r.options.items[n.from_index];e&&t!==void 0&&(u={key:X(t),drop_rect:i.getBoundingClientRect(),target_ctx:e,foreign_before:Rn(this.#w(e))})}let d=t!==`cancel`&&n.foreign_target?this.#M(n,e.input):!1;for(let e of n.items)e.node.style.transition=``;for(let e of this.#a)e.style.transition=``;if(this.#a.clear(),this.#E(!1),this.#W(n),this.#S(),this.#y(),n.lift?(Jn(i,n.lift),n.lift=null):yn(i),i.removeAttribute(dr),d){if(u){let e=u;Ln(()=>{zn([...e.foreign_before.keys()],e.foreign_before,a);let t=this.#w(e.target_ctx).find(t=>t.getAttribute(Z)===e.key);if(t){let n=t.style.zIndex,r=t.style.position;getComputedStyle(t).position===`static`&&(t.style.position=`relative`),t.style.zIndex=fr,zn([t],new Map([[t,e.drop_rect]]),a).then(()=>{t.style.zIndex=n,t.style.position=r})}})}return}if(t===`cancel`||n.to_index===n.from_index){l&&Ln(()=>void zn(c,l,a));return}let f=Tn(n.items.map(e=>e.key),n.from_index,n.to_index),p=wn(r.options.items,f);r.options.onReorder(p,f),r.options.onCommit?.(f),this.#F(r,{type:`move`,target:r.targetId,itemId:f.itemId,afterId:f.afterId}),l&&Ln(()=>void zn(c,l,a))}presenceFor(e){let t=this.#n;return!t||t.context!==e?null:{dragKey:t.items[t.from_index].key,fromIndex:t.from_index,toIndex:t.to_index}}#_(e,t,n,r){t.lift?qn(e,n,r):Y(e,n,r)}#v(e,t,n){if(n||(this.#o=e,this.#s=e.style.zIndex,this.#c=e.style.position,getComputedStyle(e).position===`static`&&(e.style.position=`relative`),e.style.zIndex=fr),t.options.group){let e=t.container;this.#l=e,this.#u=e.style.zIndex,this.#d=e.style.position,getComputedStyle(e).position===`static`&&(e.style.position=`relative`),e.style.zIndex=fr,e.setAttribute(pr,``)}}#y(){this.#o&&=(this.#o.style.zIndex=this.#s,this.#o.style.position=this.#c,null),this.#l&&=(this.#l.style.zIndex=this.#u,this.#l.style.position=this.#d,this.#l.removeAttribute(pr),null)}#b(e,t){let n=t.placeholder?.node;n&&(n.setAttribute(hr,``),n.className=e.className,n.innerHTML=e.innerHTML,n.style.visibility=``,n.style.opacity=n.style.opacity||`0.4`,n.style.pointerEvents=`none`)}#x(){if(this.#f)return this.#f;let e=document.createElement(`div`);return e.setAttribute(mr,``),Object.assign(e.style,{position:`fixed`,zIndex:fr,background:`currentColor`,borderRadius:`2px`,pointerEvents:`none`}),document.body.appendChild(e),this.#f=e,e}#S(){this.#f?.remove(),this.#f=null}#C(e,t,n,r,i){let a=this.#x(),o=r===`x`||i===`grid`;if(t.length===0){let t=e.getBoundingClientRect();Object.assign(a.style,o?{left:`${t.left}px`,top:`${t.top+4}px`,width:`2px`,height:`${Math.max(t.height-8,8)}px`}:{left:`${t.left+4}px`,top:`${t.top}px`,width:`${Math.max(t.width-8,8)}px`,height:`2px`});return}let s=n<t.length,c=s?t[n]:t[t.length-1];if(o){let e=s?c.left:c.right,n=Math.min(...t.map(e=>e.top)),r=Math.max(...t.map(e=>e.bottom));Object.assign(a.style,{left:`${e-1}px`,top:`${n}px`,width:`2px`,height:`${r-n}px`})}else{let e=s?c.top:c.bottom,n=Math.min(...t.map(e=>e.left)),r=Math.max(...t.map(e=>e.right));Object.assign(a.style,{left:`${n}px`,top:`${e-1}px`,width:`${r-n}px`,height:`2px`})}}#w(e){return Array.from(e.container.querySelectorAll(`[${Z}]`))}#T(e,t,n){let r=this.#N(e.id);if(!r)return;let i=e.axis,a=cr(e,n.clientX,n.clientY),o=e.id===this.#r?this.#i:-1,s=i===`x`?n.clientX:n.clientY,c=r.options.hysteresis??3,l=kn(o,a,s,En(e.rects(),i),c);if(e.id===this.#r&&l===this.#i)return;if(this.#r=e.id,this.#i=l,t.context.options.indicator===`line`){this.#C(r.container,e.rects(),l,i,r.strategy);return}let u=t.items[t.from_index].node.getBoundingClientRect(),d=i===`x`?u.width:u.height,f=Bn(r.options.animation),p=f>0?`translate ${f}ms ${Pn}`:``,m=this.#w(r);for(let e=0;e<m.length;e++){let t=m[e];p&&(t.style.transition=p,this.#a.add(t));let n=e>=l?d:0;i===`x`?Y(t,n,0):Y(t,0,n)}}#E(e){if(this.#r==null)return;let t=this.#N(this.#r);if(t)for(let n of this.#w(t))e||(n.style.transition=``),yn(n);this.#r=null,this.#i=-1}#D(e){let t=this;return{id:e.id,get group(){return e.options.group},node:e.container,get axis(){return e.axis},rects(){let n=t.#p.get(e.id);return n||(n=t.#z(t.#R(e)),t.#p.set(e.id,n)),n},rect(){let n=t.#m.get(e.id);return n||(n=e.container.getBoundingClientRect(),t.#m.set(e.id,n)),n},accepts(t,n){let r=e.options.accepts;if(!r)return!0;try{return r(t,{from:n,to:e.container})}catch{return!1}}}}#O(){typeof window>`u`||this.#g.push(J(window,`scroll`,this.#h,{capture:!0,passive:!0}),J(window,`resize`,this.#h,{passive:!0}))}#k(){for(let e of this.#g)e();this.#g.length=0}#A(e,t){let n=e.context;if(!n.options.group)return null;let r=this.#t.get(n.id);if(!r)return null;let i=e.items[e.from_index].node,a=i.getBoundingClientRect(),o=(a.left+a.right)/2,s=(a.top+a.bottom)/2,c=n.options.foreignProximity??this.#j(a),l=n.options.items[e.from_index];return ur(this.#t,e.transfer_state,r,t.clientX,t.clientY,o,s,c,e=>e.accepts(l,i))}#j(e){return Math.max(24,Math.min(e.width,e.height)*.35)}#M(e,t){let n=e.foreign_target;if(!n)return!1;let r=e.context,i=this.#N(n.id);if(!i)return!1;let a=r.options.items[e.from_index];if(a===void 0)return!1;let o=cr(n,t.clientX,t.clientY),s=o>0?X(i.options.items[o-1]):null,c={item:a,fromContainer:r.id,toContainer:i.id,from:e.from_index,to:o},l=r.options.items.filter((t,n)=>n!==e.from_index),u=Tn(e.items.map(e=>e.key),e.from_index,e.from_index);if(r.options.onReorder(l,u),i.options.onTransfer)i.options.onTransfer(c);else{let e=i.options.items.slice();e.splice(o,0,a);let t=o>0?X(e[o-1]):null;i.options.onReorder(e,{itemId:X(a),afterId:t})}return this.#F(r,{type:`transfer`,target:i.targetId,from:r.targetId,itemId:X(a),afterId:s}),!0}#N(e){for(let t of this.#e.values())if(t.id===e)return t}#P(e){for(let t of this.#e.values())if(t.targetId===e)return t}#F(e,t){for(let n of e.commit_subscribers)n(t)}#I(e){let t=e.context;if(t.presence_subscribers.size===0)return;let n=e.items[e.from_index]?.key;if(n==null)return;let r={type:`sortable`,target:((e.foreign_target?this.#N(e.foreign_target.id):t)??t).targetId,fromTarget:t.targetId,itemId:n,insertIndex:e.to_index,rel:null};for(let e of t.presence_subscribers)e(r)}applyExternalOp(e,t){if(t.type===`move`){if(t.target!==e.targetId)return;let n={itemId:t.itemId,afterId:t.afterId},r=wn(e.options.items,n);e.options.onReorder(r,n)}else t.type===`transfer`&&this.#L(t)}#L(e){let t=this.#P(e.from),n=this.#P(e.target);if(!t||!n)return;let r=t.options.items.findIndex(t=>X(t)===e.itemId);if(r===-1)return;let i=t.options.items[r],a=n.options.items.filter(t=>X(t)!==e.itemId),o=e.afterId===null?0:(()=>{let t=a.findIndex(t=>X(t)===e.afterId);return t===-1?a.length:t+1})(),s=t.options.items.filter((e,t)=>t!==r);t.options.onReorder(s,{itemId:e.itemId,afterId:null});let c={item:i,fromContainer:t.id,toContainer:n.id,from:r,to:o};if(n.options.onTransfer)n.options.onTransfer(c);else{let t=n.options.items.slice();t.splice(o,0,i),n.options.onReorder(t,{itemId:e.itemId,afterId:e.afterId})}}showRemotePresence(e,t,n){if(t.target!==e.targetId){this.clearRemotePresence(e,t.peerId);return}let r=e.remote_ghosts.get(t.peerId);r||(r=document.createElement(`li`),r.setAttribute(gr,t.peerId),r.style.pointerEvents=`none`,e.remote_ghosts.set(t.peerId,r));let i=Array.from(e.container.children).filter(e=>e.hasAttribute(`data-neodrag-sortable-key`))[t.insertIndex]??null;e.container.insertBefore(r,i)}clearRemotePresence(e,t,n){if(t){let n=e.remote_ghosts.get(t);n&&(n.remove(),e.remote_ghosts.delete(t));return}for(let t of e.remote_ghosts.values())t.remove();e.remote_ghosts.clear()}#R(e){let t=e.container.querySelectorAll(`[${Z}]`);return Array.from(t,e=>({key:e.getAttribute(Z),node:e,rect:e.getBoundingClientRect()}))}#z(e){return e.map(e=>({key:e.key,left:e.rect.left,top:e.rect.top,right:e.rect.right,bottom:e.rect.bottom}))}#B(e,t,n){let r=e=>n===`y`?e.top:e.left;if(t+1<e.length)return r(e[t+1].rect)-r(e[t].rect);if(t>0)return r(e[t].rect)-r(e[t-1].rect);let i=e[t].rect;return n===`y`?i.height:i.width}#V(e,t){if(e.context.strategy===`grid`)return Mn(this.#z(e.items),t.clientX,t.clientY,`closestCenter`);let n=e.axis===`y`?t.clientY:t.clientX,r=e.items[e.from_index].rect,i=e.items[e.from_index].key,a=e.footprint;e.axis===`y`?(a.start=r.top,a.end=r.bottom):(a.start=r.left,a.end=r.right);let o=Dn(e.mids,n,i,e.items.length,{dragFootprint:e.lift?null:a,skipDragDeadZone:!!e.lift}),s=e.context.options.hysteresis??3;return On(e.to_index,o,n,e.boundaries,s)}#H(e){if(e.context.options.indicator===`line`){this.#C(e.context.container,e.items.map(e=>e.rect),e.to_index,e.axis,e.context.strategy);return}if(e.context.strategy===`grid`){this.#U(e);return}let{items:t,from_index:n,to_index:r,axis:i,slot:a}=e,o=Math.min(n,e.applied_to,r),s=Math.max(n,e.applied_to,r);for(let e=o;e<=s;e++){if(e===n)continue;let o=0;r>n&&e>n&&e<=r?o=-a:r<n&&e>=r&&e<n&&(o=a),i===`y`?Y(t[e].node,0,o):Y(t[e].node,o,0)}e.applied_to=r}#U(e){let t=Nn(this.#z(e.items),e.from_index,e.to_index),n=Math.min(e.from_index,e.applied_to,e.to_index),r=Math.max(e.from_index,e.applied_to,e.to_index);for(let i=n;i<=r;i++){if(i===e.from_index)continue;let n=t.get(i);n?Y(e.items[i].node,n.x,n.y):yn(e.items[i].node)}e.applied_to=e.to_index}#W(e){let t=Math.min(e.from_index,e.applied_to),n=Math.max(e.from_index,e.applied_to);for(let r=t;r<=n;r++)r!==e.from_index&&yn(e.items[r].node);e.applied_to=e.from_index}#G(e){if(e.context.options.indicator===`line`)return;let{items:t,from_index:n,axis:r,slot:i}=e;for(let e=0;e<t.length;e++){if(e===n)continue;let a=e>n?-i:0;r===`y`?Y(t[e].node,0,a):Y(t[e].node,a,0)}e.applied_to=Math.max(n,t.length-1)}},wr=class{setup(e){return this.attach(e)}},Tr=new WeakMap;function Er(e){return Tr.get(e)}function Dr(e){let t=e instanceof Element?e:e instanceof Node?e.parentElement:null;for(;t;){if(Tr.has(t))return t;t=t.parentElement}let n=document.activeElement;return n instanceof HTMLElement&&Tr.has(n)?n:null}function Or(e){let t=0,n=0,r=0,i=!1,a=!1,o=s=>{if(i)return;r||=s;let c=a?e.fastInterval:e.slowInterval;!a&&s-r>=e.speedupDelay&&(a=!0,n=s),s-n>=c&&(n=s,e.onTick(a)),t=requestAnimationFrame(o)};return t=requestAnimationFrame(o),{stop(){i=!0,t&&cancelAnimationFrame(t)}}}var kr=Symbol(`neodrag.sensor.keyboard`),Ar=class e extends wr{static key=kr;key=e.key;#e;constructor(e={}){super(),this.#e=new Set(e?.cancelKeys??[`Escape`])}attach(e){return J(e.getDelegate(),`keydown`,t=>{this.#e.has(t.key)&&e.cancelActive(`cancel`)},{passive:!0})}},jr=Symbol(`neodrag.sensor.keyboardMove`),Mr=new Set([`ArrowUp`,`ArrowDown`,`ArrowLeft`,`ArrowRight`]);function Nr(e,t,n){let r=0,i=0;if(e===`ArrowLeft`)r=-t;else if(e===`ArrowRight`)r=t;else if(e===`ArrowUp`)i=-t;else if(e===`ArrowDown`)i=t;else return null;return n===`x`&&(i=0),n===`y`&&(r=0),{x:r,y:i}}function Pr(e){let t=e.getBoundingClientRect();return{x:t.left+t.width/2,y:t.top+t.height/2}}function Fr(e,t){return e===t||t===`Space`&&e===` `}var Ir=class e extends wr{static key=jr;key=e.key;attach(e){let t=e.getDelegate(),n=null,r=()=>{n?.repeat?.stop(),n&&(n.repeat=null)},i=(t,n,r)=>{let i=Nr(n,r?t.config.fastStep:t.config.step,t.config.axis);i&&(t.clientX+=i.x,t.clientY+=i.y,e.onInteractionMove(cn({phase:`move`,clientX:t.clientX,clientY:t.clientY,key:n,delta:i,target:t.node,repeat:!0})))},a=()=>{n&&=(r(),e.onInteractionEnd(cn({phase:`end`,clientX:n.clientX,clientY:n.clientY,key:n.config.grabKey,target:n.node})),null)},o=t=>{if(t.defaultPrevented)return;if(t.key===`Escape`&&n){t.preventDefault(),r(),n=null,e.cancelActive(`cancel`);return}let o=Dr(t.target);if(!o){n&&Fr(t.key,n.config.grabKey)&&(t.preventDefault(),a());return}let s=Er(o);if(Fr(t.key,s.grabKey)){if(t.preventDefault(),n?.node===o){a();return}n&&a();let r=Pr(o);n={node:o,clientX:r.x,clientY:r.y,config:s,repeat:null,last_key:s.grabKey},e.onInteractionStart(cn({phase:`start`,clientX:n.clientX,clientY:n.clientY,key:t.key,target:o,native:t}));return}if(n&&n.node===o&&Mr.has(t.key)){if(t.preventDefault(),n.last_key=t.key,r(),!t.repeat){i(n,t.key,!1);return}n.repeat=Or({slowInterval:s.slowInterval,speedupDelay:s.speedupDelay,fastInterval:s.fastInterval,onTick:e=>{n&&i(n,n.last_key,e)}})}},s=()=>{n&&a()},c=J(t,`keydown`,o,{passive:!1}),l=J(t,`blur`,s,{passive:!0,capture:!0});return()=>{r(),n=null,c(),l()}}},Lr=Symbol(`neodrag.sensor.pointer`),Rr=class e extends wr{static key=Lr;key=e.key;#e;constructor(e={}){super(),this.#e=e?.buttons??[0]}attach(e){let t=e.getDelegate(),n=!1,r=null,i=()=>{r?.abort(),r=null,n=!1};e.setPointerDisarm(i);let a=()=>{if(n)return;n=!0;let a=(r=new AbortController).signal;J(t,`pointermove`,t=>e.onInteractionMove(sn(t,`move`)),{passive:!1,capture:!0,signal:a});let o=t=>{i(),e.onInteractionEnd(sn(t,`end`))};J(t,`pointerup`,o,{passive:!0,capture:!0,signal:a}),J(t,`pointercancel`,o,{passive:!0,capture:!0,signal:a})},o=J(t,`pointerdown`,t=>{this.#e.includes(t.button)&&(e.onInteractionStart(sn(t,`start`)),a())},{passive:!0,capture:!0});return()=>{e.setPointerDisarm(null),i(),o()}}};function zr(e){e(new Rr),e(new Ar),e(new Ir)}var Br=new class{#e=0;#t=``;apply(){if(!(typeof document>`u`)){if(this.#e===0){let e=document.body;this.#t=e.style.userSelect,e.style.userSelect=`none`,e.style.setProperty(`-webkit-user-select`,`none`)}this.#e+=1}}release(){if(!(typeof document>`u`||this.#e===0)&&(--this.#e,this.#e===0)){let e=document.body;e.style.userSelect=this.#t,e.style.removeProperty(`-webkit-user-select`)}}},Vr=()=>document.documentElement,Hr=class{#e=[];#t=[];#n=new Map;#r;#i;host;#a=[];#o=!1;#s=null;#c=null;#l=null;#u=null;#d=-1;constructor(e={}){this.#r=e.delegate??Vr,this.#i=e.defaultSensors!==!1,this.host={getDelegate:()=>this.#r(),setPointerDisarm:e=>{this.#s=e},onInteractionStart:e=>this.#p(e),onInteractionMove:e=>this.#m(e),onInteractionEnd:e=>this.#h(e),cancelActive:e=>{this.#c&&this.#g(e)}}}get session(){return this.#c}use(...e){for(let t of e)this.#e.push(t);return this.#e.sort((e,t)=>(t.priority??0)-(e.priority??0)),this.#a=this.#e.filter(e=>typeof e.observe==`function`),this.#f(),this}registerSensor(e){return this.#t.some(t=>t.key===e.key)||this.#t.push(e),this.#o&&!this.#n.has(e.key)&&this.#n.set(e.key,e.setup(this.host)),this}dispose(){this.#c&&this.#g(`cancel`);for(let e of this.#n.values())e();this.#n.clear(),this.#o=!1,this.#s=null}#f(){if(!this.#o){this.#o=!0,this.#i&&this.#t.length===0&&zr(e=>this.#t.push(e));for(let e of this.#t)this.#n.has(e.key)||this.#n.set(e.key,e.setup(this.host))}}#p(e){if(!this.#c&&!(ln(e)&&e.pointer.button===2))for(let t of this.#e){let n=t.resolve(e);if(n){this.#l=un(e),this.#c={capability:t,target:n,pointerId:this.#l,startInput:e,input:e,started:!1,end:e=>this.#g(e)};return}}}#m(e){let t=this.#c;if(t&&(this.#l===null||un(e)===this.#l)){if(t.input=e,!t.started){if(!(t.capability.shouldStart?.(t)??!0))return;if(t.started=!0,t.capability.start(t),t.userSelect!==!1&&Br.apply(),ln(e))try{let n=t.target.node;n.setPointerCapture?.(e.pointer.pointerId),this.#u=n,this.#d=e.pointer.pointerId}catch{}this.#v(t,`start`)}t.capability.move(t),this.#v(t,`move`)}}#h(e){let t=this.#c;t&&(this.#l===null||un(e)===this.#l)&&(t.input=e,this.#g(`no-target`))}#g(e){let t=this.#c;t&&(this.#c=null,this.#l=null,this.#_(),t.started&&(t.capability.end(t,e),t.userSelect!==!1&&Br.release(),this.#v(t,`end`,e)),this.#s?.())}#_(){let e=this.#u;if(!e)return;let t=this.#d;this.#u=null,this.#d=-1;try{e.hasPointerCapture?.(t)&&e.releasePointerCapture?.(t)}catch{}}#v(e,t,n){if(this.#a.length!==0)for(let r of this.#a)r!==e.capability&&r.observe?.(e,t,n)}},Ur=null,Wr=new Map;function Gr(){return Ur??=new Hr}function Kr(e,t){let n=Wr.get(e);return n||(n=t(),Wr.set(e,n),Gr().use(n)),n}var qr=class{#e;constructor(e,t){this.#e=Kr(Cr,()=>new Cr).bind(e,t)}row(e){return{[Z]:X(e)}}registerRow(e,t){return e.setAttribute(Z,t),()=>e.removeAttribute(Z)}update(e){this.#e.update(e)}presence(){return this.#e.presence()}get targetId(){return this.#e.targetId}get hasExplicitId(){return this.#e.hasExplicitId}keys(){return this.#e.keys()}onCommit(e){return this.#e.onCommit(e)}onPresence(e){return this.#e.onPresence(e)}applyExternal(e){this.#e.applyExternal(e)}showRemotePresence(e,t){this.#e.showRemotePresence(e,t)}clearRemotePresence(e,t){this.#e.clearRemotePresence(e,t)}destroy(){this.#e.destroy()}};function Jr(e){let t=null,{join:n,leave:r}=nn(e.room);return d(()=>{let n={...e};t?.update(n)}),{ref:i=>{r(),t?.destroy(),t=new qr(i,{...e}),n(t,e.id),P(()=>{r(),t?.destroy(),t=null})},row:e=>({[Z]:e})}}function Yr(e){let t={...e},n={...e},r={},i=e=>{let n=r[e];if(!n){if(!te())return t[e];r[e]=n=v(t[e],{internal:!0}),delete t[e]}return n[0]()};for(let t in e)Object.defineProperty(n,t,{get:()=>i(t),enumerable:!0});let a=(e,n)=>{let i=r[e];if(i)return i[1](n);e in t&&(t[e]=V(n,t[e]))};return[n,(e,t)=>{if(we(e)){let t=z(()=>Object.entries(V(e,n)));c(()=>{for(let[e,n]of t)a(e,()=>n)})}else a(e,t);return n}]}var Xr={width:null,height:null,clientWidth:null,clientHeight:null};function Zr(e){if(!e)return{...Xr};let{width:t,height:n}=e.getBoundingClientRect(),{clientWidth:r,clientHeight:i}=e;return{width:t,height:n,clientWidth:r,clientHeight:i}}function Qr(e){let t=typeof e==`function`,[n,r]=Yr(ue.context||t?Xr:Zr(e)),i=new ResizeObserver(([e])=>r(Zr(e.target)));return P(()=>i.disconnect()),t?d(()=>{let t=e();t&&(r(Zr(t)),i.observe(t),P(()=>i.unobserve(t)))}):(i.observe(e),P(()=>i.unobserve(e))),n}var $r=()=>{let e=M(he);if(e===void 0)throw Error(`createDevtoolsContext must be used within a ShellContextProvider`);return e};function ei(){let{settings:e,setSettings:t}=Q();return{theme:E(()=>e().theme),setTheme:e=>t({theme:e})}}var ti=()=>{let{store:e,setStore:t}=$r(),n=E(()=>e.plugins),r=E(()=>R(e.state.layout),[],{equals:(e,t)=>e.length===t.length&&e.every((e,n)=>e===t[n])}),i=E(()=>e.state.layout),a=e=>{t(t=>({...t,state:{...t.state,layout:e}}))};return{plugins:n,toggleActivePlugins:t=>{let n=e.state.layout;if(R(n).includes(t)){a(_e(n,t));return}R(n).length>=18||a(j(n,t))},activePlugins:r,layout:i,setLayout:a}},ni=()=>{let{store:e,setStore:t}=$r();return{state:E(()=>e.state),setState:e=>{t(t=>({...t,state:{...t.state,...e}}))}}},Q=()=>{let{store:e,setStore:t}=$r();return{setSettings:e=>{t(t=>({...t,settings:{...t.settings,...e}}))},settings:E(()=>e.settings)}},ri=()=>{let{state:e,setState:t}=ni();return{persistOpen:E(()=>e().persistOpen),setPersistOpen:e=>{t({persistOpen:e})}}},ii=()=>{let{state:e,setState:t}=ni(),n=E(()=>e().subheaderCollapsed),r=n=>{let r=typeof n==`function`?n(e().subheaderCollapsed):n;t({subheaderCollapsed:r})};return{isCollapsed:n,toggleCollapsed:()=>r(e=>!e),setCollapsed:r}},ai=()=>{let{paneDragBridge:e}=$r();return{acceptStripDrags:t=>{e.handler=t,P(()=>{e.handler===t&&(e.handler=null)})},beginStripDrag:(t,n)=>e.handler?.(t,n)}},oi=()=>{let{state:e,setState:t}=ni();return{height:E(()=>e().height),setHeight:e=>{t({height:e})}}},si=(e,t=!0)=>{t?e.setAttribute(`tabIndex`,`-1`):e.removeAttribute(`tabIndex`);for(let n of e.children)si(n,t)},ci=e=>{d(()=>{let t=document.getElementById(O);t&&si(t,!e())})},li=e=>e.includes(`CtrlOrMeta`)?[e.map(e=>e===`CtrlOrMeta`?`Control`:e),e.map(e=>e===`CtrlOrMeta`?`Meta`:e)]:[e],ui=t=>li(t).flatMap(t=>{let n=t.filter(t=>e.includes(t)),r=t.filter(t=>!e.includes(t));return n.length===0?[r]:se(n).map(e=>[...e,...r])}),di=(e,t)=>{let n=ui(t),r=e.map(e=>e.toUpperCase());return n.some(e=>e.every(e=>r.includes(String(e).toUpperCase()))&&r.every(t=>e.map(e=>String(e).toUpperCase()).includes(t)))},fi=`tanstack-devtools-workbench-geometry`,pi=e=>{if(e.getElementById(fi))return;let t=e.createElement(`style`);t.id=fi,t.textContent=`
@media (max-width: 360px) {
  .tsd-workbench-wordmark { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .tsd-workbench-secondary-tabs, .tsd-workbench-secondary-tabs > * { transition: none !important; }
  .tsd-motion-safe { animation: none !important; transition: none !important; transform: none !important; }
  /* Core controls and surfaces animate on hover/active by default; drop all of
     it in one place. Both markers are stamped by core only, so this never
     reaches inside a plugin's own markup. */
  [data-tsd-control], [data-tsd-surface] { transition: none !important; }
}`,e.head.appendChild(t)},mi=Xe`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`,hi=Xe`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`,gi=Xe`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`,_i=Xe`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`,vi=Xe`
  to {
    transform: rotate(360deg);
  }
`,yi=e=>{let t=a(e),n=Ye,r=`
    scrollbar-width: thin;
    scrollbar-color: ${t.color.border.control} transparent;
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${t.color.border.control};
      border-radius: 999px;
      border: 2px solid transparent;
      background-clip: padding-box;
    }
    &::-webkit-scrollbar-thumb:hover {
      background-color: ${t.color.text.muted};
    }
    &::-webkit-scrollbar-corner {
      background: transparent;
    }
  `;return{seoWorkspace:n`
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-width: 0;
      min-height: 0;
      overflow: hidden;
    `,seoContent:n`
      flex: 1 1 auto;
      height: auto;
      min-height: 0;
      overflow-y: auto;
      overscroll-behavior: contain;
      ${r}
    `,seoPreviewSection:n`
      display: flex;
      flex-direction: row;
      gap: 16px;
      margin-bottom: 0;
      justify-content: flex-start;
      align-items: flex-start;
      overflow-x: auto;
      flex-wrap: wrap;
      padding-bottom: 0.5rem;
    `,seoPreviewCard:n`
      border: 1px solid ${t.color.border.decorative};
      border-radius: ${t.radius.overlay};
      padding: 12px;
      background: ${t.color.surface.elevated};
      margin-bottom: 0;
      box-shadow: ${t.shadow.xs};
      display: flex;
      flex-direction: column;
      align-items: stretch;
      min-width: 200px;
      max-width: 240px;
      font-size: ${t.type.bodySm.size};
      gap: ${t.gap.tight};
    `,seoPreviewHeader:n`
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: ${t.type.bodyXs.size};
      font-weight: 600;
      letter-spacing: ${t.type.labelSm.tracking};
      text-transform: uppercase;
      margin-bottom: 0;
      color: ${t.color.text.secondary};
    `,seoPreviewNetworkDot:n`
      width: 8px;
      height: 8px;
      flex: 0 0 8px;
      border-radius: 50%;
      box-shadow: inset 0 0 0 1px ${t.color.state.hover};
      @media (forced-colors: active) {
        forced-color-adjust: none;
      }
    `,seoPreviewImage:n`
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      border-radius: ${t.radius.group};
      margin-bottom: 6px;
      background: ${t.color.surface.subtle};
      height: 120px;
      object-fit: cover;
    `,seoPreviewImagePlaceholder:n`
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${t.color.text.muted};
      font-size: ${t.type.bodyXs.size};
      border: 1px dashed ${t.color.border.decorative};
    `,seoPreviewTitle:n`
      font-family: ${t.font.display};
      font-size: ${t.type.bodySm.size};
      line-height: ${t.type.bodySm.lineHeight};
      font-weight: 700;
      margin-bottom: 2px;
      color: ${t.color.text.primary};
    `,seoPreviewDesc:n`
      color: ${t.color.text.secondary};
      margin-bottom: 4px;
      font-size: ${t.type.bodyXs.size};
      line-height: ${t.type.bodyXs.lineHeight};
    `,seoPreviewUrl:n`
      color: ${t.color.text.muted};
      font-family: ${t.font.mono};
      font-size: 11px;
      margin-bottom: 0;
      word-break: break-all;
    `,seoMissingTagsSection:n`
      margin-top: 6px;
      font-size: ${t.type.bodyXs.size};
      line-height: ${t.type.bodyXs.lineHeight};
      color: ${t.color.status.error.text};
    `,seoMissingTagsList:n`
      margin: 4px 0 0 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      max-width: 240px;
    `,seoMissingTag:n`
      background: ${t.color.status.error.subtleFill};
      color: ${t.color.status.error.text};
      border-radius: ${t.radius.control};
      padding: 2px 6px;
      font-family: ${t.font.mono};
      font-size: 11px;
      font-weight: 500;
    `,serpPreviewBlock:n`
      margin-bottom: ${16}px;
      &:last-child {
        margin-bottom: 0;
      }
    `,serpPreviewLabel:n`
      font-size: ${t.type.bodyXs.size};
      font-weight: 600;
      letter-spacing: ${t.type.labelSm.tracking};
      text-transform: uppercase;
      margin-bottom: 6px;
      color: ${t.color.text.secondary};
    `,serpSnippet:n`
      border: 1px solid ${t.color.border.decorative};
      border-radius: 8px;
      padding: 1rem 1.25rem;
      background: ${t.color.surface.elevated};
      max-width: 600px;
      font-family: ${t.font.body};
      box-shadow: ${t.shadow.xs};
    `,serpSnippetMobile:n`
      border: 1px solid ${t.color.border.decorative};
      border-radius: 8px;
      padding: 1rem 1.25rem;
      background: ${t.color.surface.elevated};
      max-width: 380px;
      font-family: ${t.font.body};
      box-shadow: ${t.shadow.xs};
    `,serpSnippetDescMobile:n`
      font-size: 0.875rem;
      color: ${t.color.text.secondary};
      margin: 0;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    `,serpSnippetTopRow:n`
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    `,serpSnippetFavicon:n`
      width: 28px;
      height: 28px;
      border-radius: 50%;
      flex-shrink: 0;
      object-fit: contain;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    `,serpSnippetDefaultFavicon:n`
      width: 28px;
      height: 28px;
      background-color: ${t.color.surface.subtle};
      border-radius: 50%;
      flex-shrink: 0;
      object-fit: contain;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    `,serpSnippetSiteColumn:n`
      display: flex;
      flex-direction: column;
      gap: 0;
      min-width: 0;
    `,serpSnippetSiteName:n`
      font-size: 0.875rem;
      color: ${t.color.text.primary};
      line-height: 1.4;
      margin: 0;
    `,serpSnippetSiteUrl:n`
      font-size: 0.75rem;
      color: ${t.color.text.muted};
      line-height: 1.4;
      margin: 0;
    `,serpSnippetTitle:n`
      font-size: 1.25rem;
      font-weight: 400;
      color: ${t.color.text.link};
      margin: 0 0 4px 0;
      line-height: 1.3;
    `,serpSnippetDesc:n`
      font-size: 0.875rem;
      color: ${t.color.text.secondary};
      margin: 0;
      line-height: 1.5;
    `,serpErrorList:n`
      margin: 4px 0 0 0;
      padding-left: 1.25rem;
      list-style-type: disc;
    `,serpReportItem:n`
      margin-top: 0.25rem;
      color: ${t.color.status.error.text};
      font-size: 0.875rem;
    `,devtoolsPanelContainer:(e,t)=>n`
      direction: ltr;
      position: fixed;
      overflow: visible;
      ${e}: 0;
      inset-inline: 0;
      z-index: 99999;
      inline-size: 100%;
      max-inline-size: 100%;
      box-sizing: border-box;
      ${t?``:`max-height: 90%;`}
      border: 0;
      box-shadow: none;
      transition: transform 160ms ease-out;
      @media (prefers-reduced-motion: reduce) {
        transition-duration: 0ms;
      }
    `,devtoolsPanelContainerVisibility:e=>n`
        visibility: ${e?`visible`:`hidden`};
        height: ${e?`auto`:`0`};
      `,devtoolsPanelContainerResizing:e=>e()?n`
          transition: none;
        `:n`
        transition: transform 160ms ease-out;
        @media (prefers-reduced-motion: reduce) {
          transition-duration: 0ms;
        }
      `,devtoolsDrawerContent:n`
      width: 100%;
      height: 100%;
      min-width: 0;
      min-height: 0;
      overflow: hidden;
    `,devtoolsPanel:n`
      display: grid;
      font-size: ${t.type.bodySm.size};
      font-family: ${t.font.body};
      background-color: ${t.color.surface.workspace};
      color: ${t.color.text.primary};
      width: 100%;
      max-width: 100%;
      min-width: 0;
      box-sizing: border-box;
      grid-template-rows: ${36}px minmax(0, 1fr);
      /* The strip row is auto-sized so the strip's own animated height drives
         it — a fixed 44px row would snap instead of sliding. */
      &:has([data-testid='plugins-strip']) {
        grid-template-rows: ${36}px auto minmax(0, 1fr);
      }
      overflow-x: hidden;
      overflow-y: hidden;
      height: 100%;
    `,workbenchHeader:n`
      display: flex;
      align-items: center;
      gap: ${t.gap.control};
      min-width: 0;
      height: ${36}px;
      /* No trailing gutter: the action icons run to the panel edge. */
      padding: 0 0 0 ${16}px;
      box-sizing: border-box;
      background: ${t.color.surface.brand};
      color: ${t.color.text.mutedOnBrand};
      /* A translucent ink rule, not border.decorative — decorative *is* the
         cream brand surface, so it disappears on the chrome band itself. */
      border-bottom: 1px solid ${t.color.state.pressed};
      & button {
        min-width: 28px;
        height: 100%;
        box-sizing: border-box;
        border: 0;
        border-radius: 0;
        background: transparent;
        color: inherit;
        font: inherit;
        cursor: pointer;
      }
      & button {
        transition: all 0.3s ease;
      }
      & button:hover:not([data-tsd-selected='true']) {
        background: ${t.color.state.hover};
      }
      @media (prefers-reduced-motion: reduce) {
        & button {
          transition: none;
        }
      }
      & button:focus-visible {
        outline: 2px solid ${t.color.border.focus};
        outline-offset: 2px;
      }
      @media (max-width: 430px) {
        gap: ${t.gap.tight};
        padding-inline-start: ${12}px;
        & button {
          min-width: 24px;
        }
      }
      @media (max-width: 360px) {
        gap: 2px;
        padding-inline-start: 4px;
        & button {
          padding-inline: 3px;
          font-size: 11px;
        }
      }
    `,workbenchLogo:n`
      display: inline-flex;
      align-items: center;
      width: 16px;
      height: 21px;
      flex: 0 0 16px;
      color: ${t.color.text.primary};
      & > svg {
        width: 100%;
        height: 100%;
      }
      @media (max-width: 360px) {
        width: 14px;
        height: 18px;
        flex-basis: 14px;
      }
    `,workbenchDestinations:n`
      display: inline-flex;
      align-items: stretch;
      align-self: stretch;
      gap: 0;
      /* The destinations are the part that must survive a narrow panel: let
         them scroll rather than letting flex squeeze the labels together. */
      min-width: 0;
      flex: 0 1 auto;
      overflow-x: auto;
      overflow-y: hidden;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
      margin: 0;
      padding: 0;
      & > button {
        flex: 0 0 auto;
      }
    `,workbenchNavButton:n`
      margin: 0;
      padding-inline: 10px;
      font-size: ${t.type.bodyXs.size};
      font-weight: ${t.type.labelSm.weight};
      letter-spacing: ${t.type.labelSm.tracking};
      color: ${t.color.text.mutedOnBrand};
      &[data-tsd-selected='true'] {
        background: ${t.color.state.pressed};
        color: ${t.color.text.primary};
        font-weight: 700;
      }
      @media (max-width: 361px) {
        padding-inline: 4px;
      }
    `,workbenchActions:n`
      display: inline-flex;
      align-items: center;
      gap: ${t.gap.tight};
      height: 100%;
      margin-left: auto;
      @media (max-width: 360px) {
        gap: 0;
      }
    `,workbenchActionButton:n`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: ${36}px;
      min-width: ${36}px;
      height: ${36}px;
      flex: 0 0 ${36}px;
      padding: 0;
      color: ${t.color.text.mutedOnBrand};
      & svg {
        width: 20px;
        height: 20px;
      }
      &[data-tsd-selected='true'] {
        background: ${t.color.state.pressed};
        color: ${t.color.text.primary};
      }
      @media (max-width: 360px) {
        width: 32px;
        min-width: 32px;
        flex-basis: 32px;
      }
    `,workbenchCollapseToggle:e=>n`
      position: absolute;
      top: ${e?36:80}px;
      inset-inline-end: 7%;
      z-index: 10;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 20px;
      box-sizing: border-box;
      padding: 0;
      /* Open at the top so it reads as attached to the band above it. */
      border: 1px solid ${t.color.state.pressed};
      border-top: 0;
      border-radius: 0 0 ${t.radius.group} ${t.radius.group};
      background: ${t.color.surface.brand};
      color: ${t.color.text.mutedOnBrand};
      cursor: pointer;
      transition: all 0.3s ease;
      &:hover {
        height: 24px;
        color: ${t.color.text.primary};
        background: ${t.color.surface.subtle};
      }
      &:focus-visible {
        outline: 2px solid ${t.color.border.focus};
        outline-offset: 2px;
      }
      @media (prefers-reduced-motion: reduce) {
        transition: none;
        &:hover {
          height: 20px;
        }
      }
    `,workbenchCollapseIcon:n`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      transition: transform 0.3s ease;
      & svg {
        width: 18px;
        height: 18px;
      }
      @media (prefers-reduced-motion: reduce) {
        transition-duration: 0ms;
      }
    `,workbenchWordmark:n`
      white-space: nowrap;
      /* A wordmark is display type, not body copy. */
      font-family: ${t.font.display};
      font-size: ${t.type.headingCompact.size};
      font-weight: ${t.type.headingCompact.weight};
      line-height: ${t.type.headingCompact.lineHeight};
      letter-spacing: -0.01em;
      color: ${t.color.text.primary};
      margin-inline-end: ${t.space[2]};
      /* Give up the wordmark before the destination labels start colliding —
         the emblem still carries the branding. */
      @media (max-width: 560px) {
        display: none;
      }
    `,workbenchSecondaryTabs:e=>n`
      display: flex;
      align-items: center;
      gap: ${t.gap.control};
      min-width: 0;
      box-sizing: border-box;
      padding-block: ${e?`0px`:`6px`};
      padding-inline-start: ${16}px;
      padding-inline-end: ${16}px;
      scroll-padding-inline-start: ${16}px;
      scroll-padding-inline-end: ${16}px;
      height: ${e?0:44}px;
      min-height: 0;
      flex: 0 0 auto;
      opacity: ${+!e};
      /* Chrome band: the strip belongs to the header, not to the canvas. */
      background: ${t.color.surface.brand};
      border-bottom: ${e?`0`:`1px`} solid
        ${t.color.state.pressed};
      overflow-x: ${e?`hidden`:`auto`};
      overflow-y: hidden;
      white-space: nowrap;
      ${r}
      transition: opacity 0.3s ease, height 0.3s ease, padding 0.3s ease,
        border-color 0.3s ease;
      /* Tabs must not shift as the strip scrolls, but they still animate their
         own hover and selected states. */
      & > * {
        transform: none;
      }
      & > :last-child {
        scroll-margin-inline-end: ${16}px;
      }
      @media (max-width: 430px) {
        padding-inline: ${12}px;
      }
      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }
    `,workbenchSecondaryTab:n`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      /* A plugin entry can be dragged down into the workspace to place its pane,
         so it advertises that rather than looking like a plain button. */
      &[data-plugin-title-control] {
        cursor: grab;
      }
      min-height: 32px;
      padding: ${t.padding.controlBlock}
        ${t.padding.controlInline};
      border: 1px solid transparent;
      border-radius: ${t.radius.control};
      background: transparent;
      color: ${t.color.text.secondary};
      font-family: ${t.font.body};
      font-size: ${t.type.labelSm.size};
      font-weight: ${t.type.labelSm.weight};
      line-height: ${t.type.labelSm.lineHeight};
      letter-spacing: ${t.type.labelSm.tracking};
      cursor: pointer;
      flex: 0 0 auto;
      appearance: none;
      transition: all 0.3s ease;
      &:hover {
        background: ${t.color.state.hover};
        color: ${t.color.text.primary};
      }
      &[data-tsd-selected='true'] {
        background: ${t.color.state.selectionFill};
        border-color: ${t.color.state.selectionFill};
        color: ${t.color.state.selectionText};
      }
      &:focus-visible {
        outline: 2px solid ${t.color.border.focus};
        outline-offset: 2px;
      }
    `,pluginTitleText:n`
      margin: 0;
      color: inherit;
      font-family: ${t.font.body};
      font-size: inherit;
      font-weight: inherit;
      line-height: inherit;
      letter-spacing: inherit;
    `,dragHandle:e=>n`
      position: absolute;
      left: 0;
      ${e===`bottom`?`top`:`bottom`}: 0;
      width: 100%;
      height: 5px;
      cursor: row-resize;
      user-select: none;
      touch-action: none;
      z-index: 100000;
      background-color: transparent;
      transition: all 0.3s ease;
      &:hover,
      &:focus-visible {
        background-color: ${t.color.border.control};
      }
      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }
    `,mainCloseBtn:n`
      background: transparent;
      position: fixed;
      z-index: 99999;
      display: inline-flex;
      width: fit-content;
      cursor: pointer;
      appearance: none;
      border: 0;
      align-items: center;
      padding: 0;
      font-size: ${t.type.bodyXs.size};
      cursor: pointer;
      transition: opacity 0.25s ease-out;
      &:hide-until-hover {
        opacity: 0;
        pointer-events: none;
        visibility: hidden;
      }
      &:hide-until-hover:hover {
        opacity: 1;
        pointer-events: auto;
        visibility: visible;
      }
    `,mainCloseBtnDefault:n`
      /* The rainbow mark paints its own circle. Keep the button transparent
         so a theme fill does not frame or wash over it. 56px matches the
         trigger size before the square chip. */
      background: transparent;
      width: 56px;
      height: 56px;
      justify-content: center;
      border-radius: 50%;
      box-shadow:
        inset 0 0 0 1px transparent,
        ${t.shadow.sm};
      /* Never transition left/top: floating mode writes those inline on every
         pointer move, and animating them makes the mark lag then overshoot. */
      transition:
        opacity 0.3s ease,
        box-shadow 0.3s ease,
        scale 0.3s ease;
      & > svg {
        display: block;
        width: 100%;
        height: 100%;
        outline: none;
      }
      /*
       * Hover keeps the rainbow fill: this chip floats over the user's page,
       * so a translucent overlay would muddy the gradient. Hover brings in
       * the edge ring and scales the chip up a touch.
       *
       * It animates the scale property rather than a transform: floating mode
       * sets transform inline to drive the drag, so a transform here would be
       * overridden and never apply.
       */
      &:hover {
        box-shadow:
          inset 0 0 0 1px ${t.color.border.control},
          ${t.shadow.overlay};
        scale: 1.06;
      }
      &:active {
        scale: 0.98;
      }
      @media (prefers-reduced-motion: reduce) {
        transition-property: opacity;
        &:hover,
        &:active {
          scale: 1;
        }
      }
      &:focus-visible {
        outline: 2px solid ${t.color.border.focus};
        outline-offset: 2px;
      }
    `,mainCloseBtnFloating:n`
      /* Floating placement is driven by inline left/top, so don't animate
         position (would fight the drag/throw rAF loop). The hover treatment
         uses box-shadow and scale, both of which are safe to keep. */
      transition:
        opacity 0.3s ease,
        box-shadow 0.3s ease,
        scale 0.3s ease,
        background-color 0.3s ease,
        color 0.3s ease;
      /* Stays a pointer even though it is draggable: the trigger reads as a
         button first, and a grab cursor made it look like a handle. */
      cursor: pointer;
      touch-action: none;
      user-select: none;
    `,mainCloseBtnPosition:e=>n`
        ${e===`top-left`?`top: ${t.space[2]}; left: ${t.space[2]};`:``}
        ${e===`top-right`?`top: ${t.space[2]}; right: ${t.space[2]};`:``}
        ${e===`middle-left`?`top: 50%; left: ${t.space[2]}; transform: translateY(-50%);`:``}
        ${e===`middle-right`?`top: 50%; right: ${t.space[2]}; transform: translateY(-50%);`:``}
        ${e===`bottom-left`?`bottom: ${t.space[2]}; left: ${t.space[2]};`:``}
        ${e===`bottom-right`?`bottom: ${t.space[2]}; right: ${t.space[2]};`:``}
      `,mainCloseBtnAnimation:(e,t)=>e?n`
        opacity: 0;
        pointer-events: none;
        visibility: hidden;
      `:t?n`
              opacity: 0;

              &:hover {
                opacity: 1;
                pointer-events: auto;
                visibility: visible;
              }
            `:n`
              opacity: 1;
              pointer-events: auto;
              visibility: visible;
            `,tabContent:n`
      transition: all 0.2s ease-in-out;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      height: 100%;
      box-sizing: border-box;
      overflow-x: hidden;
    `,pluginsTabContent:n`
      /*
       * A positioning context per pane. Plugins position their own chrome
       * absolutely and assume their own root is the containing block, but a
       * plugin root is often statically positioned — without this, a top-zero
       * offset resolves against the whole Workbench and the plugin paints its
       * controls over our header. With three panes open they would all pile
       * into the same corner.
       */
      position: relative;
      width: 100%;
      height: 100%;
      min-width: 0;
      min-height: 0;
      overflow-y: auto;
      overflow-x: hidden;
      overscroll-behavior: contain;
      ${r}
      background: ${t.color.surface.workspace};
      border-radius: 0 0 ${t.radius.overlay} ${t.radius.overlay};
    `,pluginsEmptyState:n`
      display: flex;
      flex: 1 1 auto;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: ${t.gap.control};
      min-width: 0;
      padding: ${16}px;
      text-align: center;
      background: ${t.color.surface.workspace};
    `,pluginsEmptyStateIcon:n`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      margin-bottom: ${t.space[1]};
      border-radius: 50%;
      background: ${t.color.surface.subtle};
      color: ${t.color.text.muted};
      & svg {
        width: 22px;
        height: 22px;
      }
    `,pluginsEmptyStateTitle:n`
      margin: 0;
      font-family: ${t.font.display};
      font-size: ${t.type.headingPane.size};
      font-weight: ${t.type.headingPane.weight};
      line-height: ${t.type.headingPane.lineHeight};
      color: ${t.color.text.primary};
    `,pluginsEmptyStateHint:n`
      margin: 0;
      max-width: 42ch;
      font-size: ${t.type.bodySm.size};
      font-weight: ${t.type.bodySm.weight};
      line-height: ${t.type.bodySm.lineHeight};
      color: ${t.color.text.secondary};
    `,pluginWorkspace:n`
      position: relative;
      width: 100%;
      height: 100%;
      min-width: 0;
      min-height: 0;
      overflow: hidden;
      background: ${t.color.surface.brand};
    `,pluginSrOnly:n`
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
      border: 0;
    `,pluginGroupTabs:n`
      display: flex;
      align-items: stretch;
      gap: ${t.gap.tight};
      height: ${32}px;
      min-width: 0;
      padding: ${t.space[1]};
      box-sizing: border-box;
      overflow-x: auto;
      overflow-y: hidden;
      white-space: nowrap;
      ${r}
      background: ${t.color.surface.workspace};
      border-radius: ${t.radius.overlay} ${t.radius.overlay} 0 0;
    `,pluginGroupTabItem:n`
      position: relative;
      display: inline-flex;
      align-items: stretch;
      flex: 0 0 auto;
      max-width: 200px;
      background: transparent;
      border: 0;
      border-radius: ${t.radius.control};
      box-sizing: border-box;
      transition: background 0.2s ease;
      &[data-tsd-selected='true'] {
        background: ${t.color.surface.brand};
      }
      &:hover:not([data-tsd-selected='true']) {
        background: ${t.color.state.hover};
      }
      &[data-tsd-held='true'] {
        outline: 2px solid ${t.color.border.focus};
        outline-offset: -2px;
      }
      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }
    `,pluginGroupTabRow:n`
      display: inline-flex;
      align-items: stretch;
      min-width: 0;
    `,pluginGroupTab:n`
      display: inline-flex;
      align-items: center;
      min-width: 0;
      /* Room at the end for the close button, which sits over this one. */
      padding-inline: 8px 28px;
      border: 0;
      border-radius: 0;
      background: transparent;
      color: ${t.color.text.mutedOnBrand};
      font-family: ${t.font.body};
      font-size: ${t.type.bodyXs.size};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: grab;
      &[aria-pressed='true'] {
        color: ${t.color.text.primary};
        cursor: default;
      }
    `,pluginGroupTabClose:n`
      position: absolute;
      inset-inline-end: 2px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      padding: 0;
      border: 0;
      border-radius: 2px;
      background: transparent;
      color: ${t.color.text.mutedOnBrand};
      cursor: pointer;
      &:hover {
        background: ${t.color.state.pressed};
      }
      & svg {
        width: 10px;
        height: 10px;
      }
    `,pluginSplitter:e=>n`
      position: absolute;
      z-index: 20;
      box-sizing: border-box;
      background: transparent;
      cursor: ${e===`row`?`col-resize`:`row-resize`};
      touch-action: none;
      user-select: none;
      pointer-events: auto;
      &::after {
        content: '';
        position: absolute;
        pointer-events: none;
        background: transparent;
        border-radius: 999px;
        transition: background-color 0.15s ease;
        ${e===`row`?`top: 8px; bottom: 8px; left: 50%; width: 4px; transform: translateX(-50%);`:`left: 8px; right: 8px; top: 50%; height: 4px; transform: translateY(-50%);`}
      }
      &:hover::after,
      &:focus-visible::after {
        background: ${t.color.border.focus};
      }
      @media (prefers-reduced-motion: reduce) {
        &::after {
          transition: none;
        }
      }
      @media (forced-colors: active) {
        &:hover::after,
        &:focus-visible::after {
          background: Highlight;
        }
      }
    `,pluginDragPreview:n`
      position: fixed;
      z-index: 2147483646;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      max-width: 220px;
      height: ${32}px;
      padding-inline: 10px;
      box-sizing: border-box;
      pointer-events: none;
      border: 1px solid ${t.color.border.focus};
      border-radius: 3px;
      background: ${t.color.surface.brand};
      color: ${t.color.text.primary};
      font-family: ${t.font.body};
      font-size: ${t.type.bodyXs.size};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      opacity: 0.95;
      /* Sits just off the cursor so it never covers the pointer itself. */
      transform: translate(12px, 12px);
      @media (forced-colors: active) {
        border-color: Highlight;
      }
    `,pluginDraggingCursor:n`
      &,
      & * {
        cursor: grabbing !important;
      }
    `,pluginDropOverlay:n`
      position: absolute;
      z-index: 3;
      pointer-events: none;
      box-sizing: border-box;
      border: 2px solid ${t.color.border.focus};
      background: ${t.color.state.hover};
      @media (forced-colors: active) {
        border-color: Highlight;
      }
    `,pluginPaneSeparator:n`
      flex: 0 0 1px;
      align-self: stretch;
      /* Plugins paint their own surface, which may be lighter or darker than
         ours, so this rule needs a mid tone that shows against both. */
      background: ${t.color.border.control};
      @media (forced-colors: active) {
        background: CanvasText;
      }
    `,settingsGroup:n`
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    `,conditionalSetting:n`
      margin-top: ${t.space[2]};
      margin-inline-start: ${16}px;
      padding: ${t.space[3]};
      border-inline-start: 2px solid ${t.color.border.decorative};
      background-color: ${t.color.surface.subtle};
      border-start-end-radius: ${t.radius.group};
      border-end-end-radius: ${t.radius.group};
    `,settingRow:n`
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    `,settingsModifiers:n`
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    `,hotkeyTitle:n`
      margin: 0;
      font-family: ${t.font.display};
      font-size: ${t.type.headingCompact.size};
      line-height: ${t.type.headingCompact.lineHeight};
      font-weight: ${t.type.headingCompact.weight};
      color: ${t.color.text.primary};
    `,hotkeyDescription:n`
      margin: 0;
      font-size: ${t.type.bodyXs.size};
      line-height: ${t.type.bodyXs.lineHeight};
      color: ${t.color.text.secondary};
    `,hotkeyResult:n`
      display: flex;
      align-items: center;
      gap: 6px;
      margin: 0;
      font-size: ${t.type.bodyXs.size};
      color: ${t.color.text.secondary};
    `,hotkeyResultKeys:n`
      padding: 1px 6px;
      border: 1px solid ${t.color.border.decorative};
      border-radius: ${t.radius.control};
      background: ${t.color.surface.subtle};
      color: ${t.color.text.primary};
      font-family: ${t.font.mono};
      font-size: 11px;
    `,settingsStack:n`
      display: flex;
      flex-direction: column;
      gap: 1rem;
    `,pluginMarketplace:n`
      position: relative;
      display: flex;
      flex-direction: column;
      font-family: ${t.font.body};
      color: ${t.color.text.primary};
      width: 100%;
      min-width: 0;
      max-width: 100%;
      box-sizing: border-box;
      height: 100%;
      min-height: 0;
      overflow: hidden;
      background: ${t.color.surface.workspace};
      animation: ${mi} 0.3s ease;
      @media (prefers-reduced-motion: reduce) {
        animation: none;
      }
    `,pluginMarketplaceScroll:n`
      flex: 1 1 auto;
      min-height: 0;
      min-width: 0;
      box-sizing: border-box;
      overflow-y: auto;
      overscroll-behavior: contain;
      ${r}
      padding: ${16}px;
      @media (max-width: 430px) {
        padding: ${12}px;
      }
    `,pluginMarketplaceHeader:n`
      margin-bottom: ${16}px;
      padding-bottom: ${t.space[3]};
      border-bottom: 1px solid ${t.color.border.decorative};
    `,pluginMarketplaceTitleRow:n`
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: ${16}px;
      margin-bottom: 0;
      flex-wrap: wrap;
    `,pluginMarketplaceTitleBlock:n`
      display: flex;
      flex-direction: column;
      gap: ${t.gap.tight};
      min-width: 0;
    `,pluginMarketplaceControls:n`
      display: flex;
      align-items: center;
      flex: 1 1 320px;
      width: 100%;
      max-width: 448px;
      min-width: 0;
      margin-left: auto;
    `,pluginMarketplaceTitle:n`
      font-family: ${t.font.display};
      font-size: 1.125rem;
      line-height: 1.3;
      font-weight: 700;
      color: ${t.color.text.primary};
      margin: 0;
      letter-spacing: -0.02em;
    `,pluginMarketplaceDescription:n`
      font-size: ${t.type.bodyXs.size};
      line-height: ${t.type.bodyXs.lineHeight};
      color: ${t.color.text.secondary};
      margin: 0;
      max-width: 72ch;
    `,pluginMarketplaceSearchWrapper:n`
      position: relative;
      display: flex;
      align-items: center;
      flex: 1 1 0%;
      width: auto;
      max-width: 400px;
      min-width: 0;
      @media (max-width: 430px) {
        width: 100%;
        max-width: none;
      }

      svg {
        position: absolute;
        left: 8px;
        width: 14px;
        height: 14px;
        color: ${t.color.text.muted};
        pointer-events: none;
      }
    `,pluginMarketplaceSearch:n`
      width: 100%;
      box-sizing: border-box;
      padding: 5px 10px 5px 28px;
      background: ${t.color.surface.app};
      border: 1px solid ${t.color.border.decorative};
      border-radius: ${t.radius.control};
      color: ${t.color.text.primary};
      font-size: ${t.type.bodyXs.size};
      line-height: ${t.type.bodyXs.lineHeight};
      font-family: ${t.font.body};
      transition: all 0.3s ease;

      &::placeholder {
        color: ${t.color.text.muted};
      }

      &:hover {
        border-color: ${t.color.border.control};
      }

      &:focus {
        outline: none;
        border-color: ${t.color.border.focus};
        background: ${t.color.surface.elevated};
        box-shadow: 0 0 0 2px ${t.color.state.pressed};
      }
      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }
    `,pluginMarketplaceTagsContainer:n`
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: ${t.space[3]};
      padding: 0;
      background: transparent;
      border: 0;
    `,pluginMarketplaceTagButton:n`
      padding: 3px 10px;
      font-size: ${t.type.bodyXs.size};
      line-height: ${t.type.bodyXs.lineHeight};
      font-weight: 500;
      background: ${t.color.surface.subtle};
      border: 1px solid ${t.color.border.decorative};
      border-radius: 999px;
      color: ${t.color.text.secondary};
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: ${t.color.state.hover};
        border-color: ${t.color.border.control};
        color: ${t.color.text.primary};
      }
      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }
    `,pluginMarketplaceTagButtonActive:n`
      background: ${t.color.state.selectionFill} !important;
      border-color: ${t.color.state.selectionFill} !important;
      color: ${t.color.state.selectionText} !important;

      &:hover {
        background: ${t.color.state.selectionFill} !important;
        border-color: ${t.color.border.focus} !important;
      }
    `,pluginMarketplaceSettingsButton:n`
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 auto;
      padding: 5px;
      background: ${t.color.surface.subtle};
      border: 1px solid ${t.color.border.decorative};
      border-radius: ${t.radius.control};
      color: ${t.color.text.secondary};
      cursor: pointer;
      transition: all 0.3s ease;
      margin-left: 6px;

      & svg {
        width: 14px;
        height: 14px;
      }

      &:hover {
        background: ${t.color.state.hover};
        border-color: ${t.color.border.control};
        color: ${t.color.text.primary};
      }
      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }
    `,pluginMarketplaceSettingsPanel:n`
      position: absolute;
      inset-block: 0;
      inset-inline-end: 0;
      width: 320px;
      max-width: 100%;
      box-sizing: border-box;
      background: ${t.color.surface.elevated};
      border-inline-start: 1px solid ${t.color.border.decorative};
      box-shadow: ${t.shadow.overlay};
      z-index: 2;
      display: flex;
      flex-direction: column;
      animation: ${hi} 0.3s ease;
      @media (prefers-reduced-motion: reduce) {
        animation: none;
      }
    `,pluginMarketplaceSettingsPanelHeader:n`
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: ${t.gap.control};
      padding: ${t.space[3]} ${16}px;
      border-bottom: 1px solid ${t.color.border.decorative};
    `,pluginMarketplaceSettingsPanelTitle:n`
      font-family: ${t.font.display};
      font-size: ${t.type.headingCompact.size};
      line-height: ${t.type.headingCompact.lineHeight};
      font-weight: 700;
      color: ${t.color.text.primary};
      margin: 0;
    `,pluginMarketplaceSettingsPanelClose:n`
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem;
      background: transparent;
      border: none;
      color: ${t.color.text.secondary};
      cursor: pointer;
      border-radius: 0.375rem;
      transition: all 0.3s ease;

      &:hover {
        background: ${t.color.state.hover};
        color: ${t.color.text.primary};
      }
    `,pluginMarketplaceSettingsPanelContent:n`
      flex: 1;
      min-height: 0;
      padding: ${16}px;
      overflow-y: auto;
      overscroll-behavior: contain;
      ${r}
    `,pluginMarketplaceGrid:n`
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr));
      gap: ${t.gap.section};
      animation: ${gi} 0.4s ease;
      @media (prefers-reduced-motion: reduce) {
        animation: none;
      }
    `,pluginMarketplaceCard:n`
      background: ${t.color.surface.elevated};
      border: 1px solid ${t.color.border.decorative};
      border-radius: ${t.radius.overlay};
      padding: ${16}px;
      display: flex;
      flex-direction: column;
      gap: ${t.gap.section};
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;

      /* Cards stay grounded: hover raises the shadow a step instead of lifting
         the card off the page. */
      &:hover {
        border-color: ${t.color.border.control};
        box-shadow: ${t.shadow.sm};
      }
      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }
    `,pluginMarketplaceCardIcon:n`
      width: 32px;
      height: 32px;
      flex: 0 0 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${t.color.surface.subtle};
      border: 1px solid ${t.color.border.decorative};
      border-radius: ${t.radius.group};
      color: ${t.color.text.secondary};

      svg {
        width: 16px;
        height: 16px;
      }
    `,pluginMarketplaceCardHeader:n`
      flex: 1;
    `,pluginMarketplaceCardTitle:n`
      font-family: ${t.font.display};
      font-size: ${t.type.bodySm.size};
      line-height: ${t.type.bodySm.lineHeight};
      font-weight: 700;
      color: ${t.color.text.primary};
      /* Room on the trailing side so a long name never runs under the badge. */
      margin: 0 72px 4px 0;
    `,pluginMarketplaceCardPackageBadge:n`
      margin-top: 4px;
      margin-bottom: 8px;
      font-size: 0.6875rem;
      font-family: ${t.font.mono};
      color: ${t.color.text.muted};
      padding: 0;
      word-break: break-all;
      display: inline-block;
    `,pluginMarketplaceCardDescriptionText:n`
      margin-top: 0;
      font-size: ${t.type.bodyXs.size};
      line-height: ${t.type.bodySm.lineHeight};
      color: ${t.color.text.secondary};
    `,pluginMarketplaceCardVersionInfo:n`
      margin-top: 8px;
      font-size: 0.6875rem;
      font-family: ${t.font.mono};
    `,pluginMarketplaceCardVersionSatisfied:n`
      color: ${t.color.status.success.text};
    `,pluginMarketplaceCardVersionUnsatisfied:n`
      color: ${t.color.status.error.text};
    `,pluginMarketplaceCardDocsLink:n`
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.75rem;
      color: ${t.color.text.link};
      text-decoration: none;
      margin-top: 0.5rem;
      transition: all 0.3s ease;

      &:hover {
        color: ${t.color.text.link};
        text-decoration: underline;
      }

      svg {
        width: 12px;
        height: 12px;
      }
    `,pluginMarketplaceCardTags:n`
      display: flex;
      flex-wrap: wrap;
      gap: 0.375rem;
      margin-top: 0.75rem;
    `,pluginMarketplaceCardTag:n`
      font-size: 0.6875rem;
      font-weight: 500;
      padding: 0.25rem 0.5rem;
      background: ${t.color.surface.subtle};
      border: 1px solid ${t.color.border.decorative};
      border-radius: 999px;
      color: ${t.color.text.secondary};
    `,pluginMarketplaceCardImage:n`
      width: 28px;
      height: 28px;
      object-fit: contain;
    `,pluginMarketplaceNewBanner:n`
      display: inline-block;
      vertical-align: middle;
      margin-inline-start: 6px;
      background-color: ${t.color.status.success.subtleFill};
      color: ${t.color.status.success.text};
      padding: 1px 6px;
      font-family: ${t.font.body};
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      border-radius: 999px;
      letter-spacing: 0.05em;
    `,pluginMarketplaceCardFeatured:n`
      border-color: ${t.color.border.control};
    `,pluginMarketplaceCardActive:n`
      border-inline-start: 3px solid ${t.color.status.success.border};
    `,pluginMarketplaceCardStatus:n`
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: ${t.color.status.success.text};
      animation: ${_i} 0.3s ease;

      svg {
        width: 18px;
        height: 18px;
        animation: ${_i} 120ms ease-out;
      }
    `,pluginMarketplaceCardSpinner:n`
      width: 18px;
      height: 18px;
      border: 2px solid ${t.color.border.decorative};
      border-top-color: ${t.color.status.info.border};
      border-radius: 50%;
      animation: ${vi} 0.8s linear infinite;
    `,pluginMarketplaceCardStatusText:n`
      font-size: 0.875rem;
      font-weight: 600;
    `,pluginMarketplaceCardStatusTextError:n`
      font-size: 0.875rem;
      font-weight: 600;
      color: ${t.color.status.error.text};
    `,pluginMarketplaceEmpty:n`
      padding: 3rem 2rem;
      text-align: center;
      background: ${t.color.surface.elevated};
      border: 2px dashed ${t.color.border.control};
      border-radius: 0.75rem;
      animation: ${mi} 0.3s ease;
    `,pluginMarketplaceEmptyText:n`
      font-size: 0.95rem;
      color: ${t.color.text.secondary};
      margin: 0;
      line-height: 1.6;
    `,pluginMarketplaceSection:n`
      margin-bottom: ${24}px;

      &:last-child {
        margin-bottom: 0;
      }
    `,pluginMarketplaceSectionHeader:n`
      margin-bottom: ${t.gap.section};
      padding: 0 0 6px;
      display: flex;
      align-items: center;
      gap: ${t.gap.tight};
      cursor: pointer;
      user-select: none;
      background: transparent;
      border: 0;
      border-bottom: 1px solid ${t.color.border.decorative};
      border-radius: 0;
      transition: all 0.3s ease;

      &:hover {
        border-bottom-color: ${t.color.border.control};
      }
      &:hover h3 {
        color: ${t.color.text.primary};
      }
      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }
    `,pluginMarketplaceSectionContent:n`
      display: flex;
      flex-direction: column;
      gap: ${t.gap.sectionLarge};
    `,pluginMarketplaceSectionHeaderLeft:n`
      display: flex;
      align-items: center;
      gap: 0.5rem;
    `,pluginMarketplaceSectionChevron:n`
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${t.color.text.secondary};
      transition: transform 0.2s ease;
    `,pluginMarketplaceSectionChevronCollapsed:n`
      transform: rotate(-90deg);
    `,pluginMarketplaceSectionTitle:n`
      font-family: ${t.font.display};
      font-size: ${t.type.headingPane.size};
      line-height: ${t.type.headingPane.lineHeight};
      font-weight: 700;
      color: ${t.color.text.secondary};
      margin: 0;
      display: flex;
      align-items: center;
      gap: ${t.gap.control};
      transition: all 0.3s ease;
      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }
    `,pluginMarketplaceFeatureBanner:n`
      margin-top: 0;
      padding: ${t.space[3]} ${16}px;
      background: ${t.color.surface.brand};
      border-radius: ${t.radius.overlay};
      border: 1px solid ${t.color.border.decorative};
      border-inline-start: 3px solid ${t.color.state.selectionFill};
      box-shadow: none;
    `,pluginMarketplaceFeatureBannerContent:n`
      display: flex;
      flex-direction: column;
      gap: ${t.gap.control};
      align-items: flex-start;
    `,pluginMarketplaceFeatureBannerTitle:n`
      font-family: ${t.font.display};
      font-size: ${t.type.headingCompact.size};
      line-height: ${t.type.headingCompact.lineHeight};
      font-weight: 700;
      color: ${t.color.text.primary};
      margin: 0;
      display: flex;
      align-items: center;
      gap: 6px;
    `,pluginMarketplaceFeatureBannerIcon:n`
      width: 14px;
      height: 14px;
      display: inline-flex;
      color: ${t.color.text.secondary};
    `,pluginMarketplaceFeatureBannerText:n`
      font-size: ${t.type.bodyXs.size};
      color: ${t.color.text.mutedOnBrand};
      line-height: ${t.type.bodySm.lineHeight};
      max-width: 78ch;
      margin: 0;
    `,pluginMarketplaceFeatureBannerButton:n`
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 12px;
      background: ${t.color.state.selectionFill};
      color: ${t.color.state.selectionText};
      font-weight: 600;
      font-size: ${t.type.bodyXs.size};
      border-radius: ${t.radius.control};
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      align-self: flex-start;
      box-shadow: none;

      &:hover {
        opacity: 0.85;
      }
      &:focus-visible {
        outline: 2px solid ${t.color.border.focus};
        outline-offset: 2px;
      }
      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }
    `,pluginMarketplaceFeatureBannerButtonIcon:n`
      width: 14px;
      height: 14px;
    `,pluginMarketplaceCardDisabled:n`
      opacity: 0.6;
      filter: grayscale(0.3);
      cursor: not-allowed;

      &:hover {
        transform: none;
        box-shadow: none;
      }
    `,pluginMarketplaceCardBadge:n`
      position: absolute;
      top: ${16}px;
      right: ${16}px;
      padding: 1px 6px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      border-radius: 999px;
      letter-spacing: 0.05em;
    `,pluginMarketplaceCardBadgeInstall:n`
      background: ${t.color.status.success.subtleFill};
      color: ${t.color.status.success.text};
    `,pluginMarketplaceCardBadgeActive:n`
      background: ${t.color.status.success.subtleFill};
      color: ${t.color.status.success.text};
    `,pluginMarketplaceCardBadgeAdd:n`
      background: ${t.color.status.info.subtleFill};
      color: ${t.color.status.info.text};
    `,pluginMarketplaceCardBadgeBlocked:n`
      background: ${t.color.status.warning.subtleFill};
      color: ${t.color.status.warning.text};
    `,pluginMarketplaceCardBadgeRequires:n`
      background: ${t.color.status.neutral.subtleFill};
      color: ${t.color.status.neutral.text};
    `,pluginMarketplaceButtonInstalled:n`
      opacity: 0.5;
    `}};function $(){let{theme:e}=ei(),[t,n]=v(yi(e()));return d(()=>{n(yi(e()))}),t}var bi=B(`<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 18 18"fill=none aria-hidden=true width=18 height=18><circle cx=9 cy=9 r=9 fill-opacity=0.99></circle><path d="M11.223 13.665C10.5529 13.665 10.1862 13.8488 9.89289 13.9958C9.63954 14.1227 9.43953 14.2229 8.99949 14.2229C8.55946 14.2229 8.35944 14.1227 8.10609 13.9958C7.81274 13.8488 7.44604 13.665 6.77599 13.665C6.10594 13.665 5.73925 13.8488 5.44589 13.9958C5.19254 14.1227 4.99252 14.2229 4.55249 14.2229V15.1984C5.22254 15.1984 5.58924 15.0146 5.88259 14.8677C6.13594 14.7407 6.33596 14.6405 6.77599 14.6405C7.21602 14.6405 7.41604 14.7407 7.66939 14.8677C7.96275 15.0146 8.32944 15.1984 8.99949 15.1984C9.66954 15.1984 10.0362 15.0146 10.3296 14.8677C10.5829 14.7407 10.783 14.6405 11.223 14.6405C11.663 14.6405 11.863 14.7407 12.1164 14.8677C12.4097 15.0146 12.7764 15.1984 13.4465 15.1984V14.2229C13.0065 14.2229 12.8064 14.1227 12.5531 13.9958C12.2597 13.8488 11.893 13.665 11.223 13.665Z"fill=#171717></path><path d="M12.5534 12.1082C12.26 11.9612 11.8933 11.7775 11.2233 11.7775C10.5532 11.7775 10.1865 11.9612 9.89316 12.1082C9.81648 12.1449 9.74648 12.1817 9.67314 12.2117C9.61647 12.1616 9.58313 12.0982 9.5798 12.0313L9.42312 6.80995L11.5433 8.72747C12.05 9.18513 12.82 8.59718 12.5067 7.98919C12.3333 7.65513 12.1 7.34445 11.8066 7.08054C11.3533 6.66964 10.8132 6.4191 10.2398 6.30886H12.83C13.5168 6.30886 13.6934 5.33674 13.0434 5.11292C12.6567 4.98263 12.2433 4.90914 11.8133 4.90914C11.0266 4.90914 10.2965 5.153 9.68647 5.5639L11.5433 3.88357C12.05 3.4259 11.5433 2.59743 10.9099 2.84798C10.5599 2.98828 10.2298 3.18872 9.93649 3.45597C9.47646 3.87355 9.16643 4.39802 8.99975 4.96927C8.83308 4.39802 8.52305 3.87355 8.06302 3.45597C7.76966 3.19206 7.43964 2.98828 7.08961 2.84798C6.45623 2.59743 5.94952 3.4259 6.45623 3.88357L8.31304 5.5639C7.70632 5.153 6.97627 4.90914 6.18621 4.90914C5.75618 4.90914 5.34281 4.97929 4.95612 5.11292C4.30607 5.3334 4.48608 6.30886 5.16947 6.30886H7.75966C7.18962 6.4191 6.64624 6.67298 6.19288 7.08054C5.89952 7.34445 5.66617 7.65179 5.49282 7.98919C5.17947 8.59384 5.94952 9.18179 6.45623 8.72747L8.54639 6.84002L8.38971 12.0347C8.38971 12.0982 8.35304 12.1583 8.30637 12.2084C8.2397 12.1783 8.17636 12.1483 8.10635 12.1115C7.813 11.9645 7.4463 11.7808 6.77625 11.7808C6.1062 11.7808 5.73951 11.9645 5.44615 12.1115C5.1928 12.2385 4.99279 12.3387 4.55275 12.3387V13.3141C5.2228 13.3141 5.5895 13.1304 5.88285 12.9834C6.13621 12.8565 6.33622 12.7563 6.77625 12.7563C7.21629 12.7563 7.4163 12.8565 7.66965 12.9834C7.96301 13.1304 8.3297 13.3141 8.99975 13.3141C9.66981 13.3141 10.0365 13.1304 10.3299 12.9834C10.5832 12.8565 10.7832 12.7563 11.2233 12.7563C11.6633 12.7563 11.8633 12.8565 12.1167 12.9834C12.41 13.1304 12.7767 13.3141 13.4468 13.3141V12.3387C13.0067 12.3387 12.8067 12.2385 12.5534 12.1115V12.1082Z"fill=#171717></path><defs><linearGradient x1=8 y1=0 x2=8 y2=18 gradientUnits=userSpaceOnUse><stop stop-color=#FF5F5F></stop><stop offset=0.344449 stop-color=#FFA05C></stop><stop offset=0.733354 stop-color=#FFF27C></stop><stop offset=1 stop-color=#74DCFF>`),xi=()=>{let e=`tsd-trigger-mark-${t()}`;return(()=>{var t=bi(),n=t.firstChild,r=n.nextSibling.nextSibling.nextSibling.firstChild;return r.firstChild.nextSibling.nextSibling.nextSibling,s(n,`fill`,`url(#${e})`),s(r,`id`,e),t})()},Si=B(`<div>`),Ci=B(`<button type=button data-tsd-control aria-label="Open TanStack Devtools">`),wi=.95,Ti=.5,Ei=.1,Di=4,Oi=.5,ki=(e,t,n)=>Math.max(t,Math.min(n,e)),Ai=(e,t,n,r)=>{let i=e+t,a=t*wi;return i<=n?(i=n,a=-a*Ti):i>=r&&(i=r,a=-a*Ti),{pos:i,vel:a}},ji=e=>{let{settings:t,setSettings:n}=Q(),[i,a]=v(),[o,s]=v(),[c,l]=v(t().triggerCoords??null),u=$(),p=E(()=>t().triggerMode===`floating`),m=E(()=>K(u().mainCloseBtn,(!p()||!c())&&u().mainCloseBtnPosition(t().position),!t().customTrigger&&u().mainCloseBtnDefault,u().mainCloseBtnAnimation(e.isOpen(),t().hideUntilHover),p()&&u().mainCloseBtnFloating)),g=e=>{let t=parseFloat(getComputedStyle(e).getPropertyValue(`--tsrd-font-size`));return(Number.isFinite(t)?t:16)*Oi},_=e=>{let t=g(e),n=e.getBoundingClientRect();return{minX:t,minY:t,maxX:window.innerWidth-n.width-t,maxY:window.innerHeight-n.height-t}},b=!1,x=!1,S=0,C=0,D=0,ee=0,O=0,k=0,A=0,j=0,M=0,N,te=()=>{N!==void 0&&(cancelAnimationFrame(N),N=void 0)},ne=()=>n({triggerCoords:c()??void 0}),re=()=>{te();let e=()=>{let t=o(),n=c();if(!t||!n){N=void 0;return}let r=_(t),i=Ai(n.x,j,r.minX,r.maxX),a=Ai(n.y,M,r.minY,r.maxY);j=i.vel,M=a.vel,l({x:i.pos,y:a.pos}),Math.hypot(j,M)>Ei?N=requestAnimationFrame(e):(N=void 0,ne())};N=requestAnimationFrame(e)},ie=e=>{if(!p()||e.button!==0)return;let t=o(),n=c();t&&n&&(te(),b=!0,x=!1,t.setPointerCapture(e.pointerId),S=e.clientX,C=e.clientY,D=n.x,ee=n.y,O=e.clientX,k=e.clientY,A=e.timeStamp,j=0,M=0,e.preventDefault())},ae=e=>{if(!b)return;e.preventDefault();let t=o();if(!t)return;let n=e.clientX-S,r=e.clientY-C;Math.hypot(n,r)>Di&&(x=!0);let i=_(t);l({x:ki(D+n,i.minX,i.maxX),y:ki(ee+r,i.minY,i.maxY)});let a=e.timeStamp-A;a>0&&(j=(e.clientX-O)/a*16,M=(e.clientY-k)/a*16),O=e.clientX,k=e.clientY,A=e.timeStamp},I=(e,t)=>{if(!b)return;b=!1;let n=o();n?.hasPointerCapture(e.pointerId)&&n.releasePointerCapture(e.pointerId),e.timeStamp-A>50&&(j=0,M=0),t&&x&&Math.hypot(j,M)>Ei?re():ne()},oe=e=>I(e,!0),se=e=>I(e,!1),ce=()=>{if(x){x=!1;return}e.setIsOpen(!e.isOpen())};return d(()=>{if(!p())return;let e=o();e&&z(()=>{let t=c();if(!t){let t=e.getBoundingClientRect();l({x:t.left,y:t.top});return}let n=_(e);l({x:ki(t.x,n.minX,n.maxX),y:ki(t.y,n.minY,n.maxY)})})}),d(()=>{if(!p())return;let e=()=>{let e=o(),t=c();if(!e||!t)return;let n=_(e);l({x:ki(t.x,n.minX,n.maxX),y:ki(t.y,n.minY,n.maxY)}),ne()};window.addEventListener(`resize`,e),P(()=>window.removeEventListener(`resize`,e))}),P(te),d(()=>{let e=t().customTrigger,n=i();e&&n&&e(n,{theme:t().theme})}),f(w,{get when(){return!t().triggerHidden},get children(){var e=Ci();return e.addEventListener(`pointercancel`,se),e.$$pointerup=oe,e.$$pointermove=ae,e.$$pointerdown=ie,e.$$click=ce,r(s,e),h(e,f(w,{get when(){return t().customTrigger},get fallback(){return f(xi,{})},get children(){var e=Si();return r(a,e),e}})),T(t=>{var n=m(),r=p()&&c()?{left:`${c().x}px`,top:`${c().y}px`,right:`auto`,bottom:`auto`,transform:`none`}:void 0;return n!==t.e&&F(e,t.e=n),t.t=y(e,r,t.t),t},{e:void 0,t:void 0}),e}})};m([`click`,`pointerdown`,`pointermove`,`pointerup`]);var Mi=B(`<nav data-workbench-secondary-tabs data-tsd-surface>`),Ni=B(`<button type=button data-testid=workbench-collapse-toggle data-tsd-control><span aria-hidden=true>`),Pi=B(`<button type=button data-workbench-secondary-tab data-tsd-control>`),Fi=e=>{let t=$(),{isCollapsed:n}=ii();return(()=>{var r=Mi();return h(r,()=>e.children),T(i=>{var a=e.ariaLabel,o=e.dataTestId,c=n()?`true`:void 0,l=n()||void 0,u=n()?`true`:void 0,d=`${t().workbenchSecondaryTabs(n())} tsd-workbench-secondary-tabs`;return a!==i.e&&s(r,`aria-label`,i.e=a),o!==i.t&&s(r,`data-testid`,i.t=o),c!==i.a&&s(r,`data-collapsed`,i.a=c),l!==i.o&&(r.inert=i.o=l),u!==i.i&&s(r,`aria-hidden`,i.i=u),d!==i.n&&F(r,i.n=d),i},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0}),r})()},Ii=()=>{let e=$(),{isCollapsed:t,toggleCollapsed:n}=ii(),r=()=>`${t()?`Show`:`Hide`} the plugin and section tabs`;return(()=>{var i=Ni(),a=i.firstChild;return I(i,`click`,n,!0),h(a,f(Pt,{})),T(n=>{var o=r(),c=r(),l=!t(),d=e().workbenchCollapseToggle(t()),f=e().workbenchCollapseIcon,p=t()?`rotate(0deg)`:`rotate(180deg)`;return o!==n.e&&s(i,`aria-label`,n.e=o),c!==n.t&&s(i,`title`,n.t=c),l!==n.a&&s(i,`aria-expanded`,n.a=l),d!==n.o&&F(i,n.o=d),f!==n.i&&F(a,n.i=f),p!==n.n&&u(a,`transform`,n.n=p),n},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0}),i})()},Li=e=>{let t=$();return(()=>{var n=Pi();return I(n,`click`,e.onClick,!0),n.$$pointerdown=t=>e.onPointerDown?.(t),n.addEventListener(`focus`,e=>e.currentTarget.scrollIntoView({block:`nearest`,inline:`nearest`})),h(n,()=>e.children),T(r=>{var i=e.ariaCurrent,a=e.ariaPressed,o=e.ariaLabelledBy,c=e.pluginTitleControl?``:void 0,l=e.selected?`true`:void 0,u=t().workbenchSecondaryTab;return i!==r.e&&s(n,`aria-current`,r.e=i),a!==r.t&&s(n,`aria-pressed`,r.t=a),o!==r.a&&s(n,`aria-labelledby`,r.a=o),c!==r.o&&s(n,`data-plugin-title-control`,r.o=c),l!==r.i&&s(n,`data-tsd-selected`,r.i=l),u!==r.n&&F(n,r.n=u),r},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0}),n})()};m([`click`,`pointerdown`]);var Ri=B(`<div data-testid=tanstack-devtools-panel data-tsd-surface style=max-inline-size:100%;inset-inline:0px;box-sizing:border-box><div data-testid=devtools-drawer-content>`),zi=e=>{let t=$(),{height:n}=oi(),{settings:r}=Q(),i=N(),a=()=>i().pipWindow??(typeof window>`u`?null:window),[o,c]=v((()=>{let e=a();return e?e.document.documentElement.clientWidth||e.innerWidth:0})());d(()=>{let e=a();if(!e)return;let t=e.document.documentElement,n=()=>{c(t.clientWidth||e.innerWidth)};n(),e.addEventListener(`resize`,n);let r=e.ResizeObserver??globalThis.ResizeObserver,i=r?new r(n):null;i?.observe(t),P(()=>{e.removeEventListener(`resize`,n),i?.disconnect()})});let l=()=>i().pipWindow===null,p=()=>i().pipWindow?`100vh`:`${n()}px`,m=()=>!l()||e.isOpen()?`translateY(0px)`:r().panelLocation===`top`?`translateY(-100%)`:`translateY(100%)`;return(()=>{var n=Ri(),a=n.firstChild;return s(n,`id`,O),h(a,()=>e.children),h(n,(()=>{var t=_(()=>!!e.hasSubheader());return()=>t()?f(Ii,{}):null})(),null),T(c=>{var d=String(e.isOpen()),f=String(e.isCollapsed()),h=p(),g=l()&&o()>0?`${o()}px`:`100%`,_=m(),v=p(),y=K(t().devtoolsPanelContainer(r().panelLocation,!!i().pipWindow),t().devtoolsPanelContainerVisibility(e.isOpen()),t().devtoolsPanelContainerResizing(e.isResizing)),b=t().devtoolsDrawerContent;return d!==c.e&&s(n,`data-open`,c.e=d),f!==c.t&&s(n,`data-subheader-collapsed`,c.t=f),h!==c.a&&u(n,`height`,c.a=h),g!==c.o&&u(n,`inline-size`,c.o=g),_!==c.i&&u(n,`transform`,c.i=_),v!==c.n&&u(n,`--tsd-main-panel-height`,c.n=v),y!==c.s&&F(n,c.s=y),b!==c.h&&F(a,c.h=b),c},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0}),n})()},Bi=B(`<div data-testid=tanstack-devtools-content-panel data-tsd-surface style=flex-direction:column>`),Vi=B(`<div data-testid=tsd-resize-handle data-tsd-control data-tsd-separator=resize role=separator aria-orientation=horizontal aria-label="Resize TanStack Devtools panel"tabindex=0>`),Hi=e=>{let t=$(),{settings:n}=Q(),{height:i}=oi(),a=N(),o=()=>Math.floor(window.innerHeight*fe),c=()=>Math.min(o(),Math.max(70,Math.round(i()))),l=t=>{let r=t.shiftKey?50:10,i=n().panelLocation===`bottom`&&t.key===`ArrowUp`||n().panelLocation===`top`&&t.key===`ArrowDown`,a=n().panelLocation===`bottom`&&t.key===`ArrowDown`||n().panelLocation===`top`&&t.key===`ArrowUp`,s;i&&(s=c()+r),a&&(s=c()-r),t.key===`Home`&&(s=70),t.key===`End`&&(s=o()),s!==void 0&&(t.preventDefault(),e.handleHeightChange?.(Math.min(o(),s)))};return(()=>{var i=Bi(),u=e.ref;return typeof u==`function`?r(u,i):e.ref=i,h(i,(()=>{var r=_(()=>!!(e.handleDragStart&&a().pipWindow===null));return()=>r()?(()=>{var r=Vi();return r.$$keydown=l,I(r,`mousedown`,e.handleDragStart,!0),s(r,`aria-valuemin`,70),T(e=>{var i=t().dragHandle(n().panelLocation),a=o(),l=c();return i!==e.e&&F(r,e.e=i),a!==e.t&&s(r,`aria-valuemax`,e.t=a),l!==e.a&&s(r,`aria-valuenow`,e.a=l),e},{e:void 0,t:void 0,a:void 0}),r})():null})(),null),h(i,()=>e.children,null),T(()=>F(i,t().devtoolsPanel)),i})()};m([`mousedown`,`keydown`]);var Ui=B(`<div><h4></h4><p></p><div></div><p>Final shortcut is <kbd>`),Wi={Shift:`Shift`,Alt:`Alt`,Meta:`Meta`,Control:`Control`,CtrlOrMeta:`Ctrl Or Meta`},Gi=e=>{let t=$(),n=t=>{if(e.hotkey.includes(t))e.onHotkeyChange(e.hotkey.filter(e=>e!==t));else{let n=e.hotkey.filter(t=>e.modifiers.includes(t)),r=e.hotkey.filter(t=>!e.modifiers.includes(t));e.onHotkeyChange([...n,t,...r])}},r=()=>e.hotkey.filter(t=>!e.modifiers.includes(t)).join(`+`),i=t=>{let n=e=>{if(e.length===1)return[ye(e)];let t=[];for(let n of e){let e=ye(n);t.includes(e)||t.push(e)}return t},r=e.hotkey.filter(t=>e.modifiers.includes(t)),i=t.split(`+`).flatMap(e=>n(e)).filter(Boolean);e.onHotkeyChange([...r,...i])},a=()=>e.hotkey.join(` + `);return(()=>{var o=Ui(),s=o.firstChild,c=s.nextSibling,l=c.nextSibling,u=l.nextSibling,d=u.firstChild.nextSibling;return h(s,()=>e.title),h(c,()=>e.description),h(l,f(w,{keyed:!0,get when(){return e.hotkey},get children(){return e.modifiers.map(t=>{let r=e.hotkey.includes(t);return f(Ht,{variant:`secondary`,"aria-pressed":r,onclick:()=>n(t),outline:!r,get children(){return Wi[t]||t}})})}})),h(o,f(it,{label:`Key`,description:`Use '+' to combine keys (e.g., 'a+b' or 'd'). This will be used with the enabled modifiers from above`,placeholder:`a`,get value(){return r()},onChange:i}),u),h(d,a),T(e=>{var n=t().settingsGroup,r=t().hotkeyTitle,i=t().hotkeyDescription,a=t().settingsModifiers,f=t().hotkeyResult,p=t().hotkeyResultKeys;return n!==e.e&&F(o,e.e=n),r!==e.t&&F(s,e.t=r),i!==e.a&&F(c,e.a=i),a!==e.o&&F(l,e.o=a),f!==e.i&&F(u,e.i=f),p!==e.n&&F(d,e.n=p),e},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0}),o})()},Ki=B(`<div>`),qi=B(`<div><div>`),Ji=B(`<div data-testid=settings-workspace data-tsd-surface style=height:100%;min-height:0px>`),Yi=()=>{let{setSettings:e,settings:t}=Q(),n=$(),r=[`CtrlOrMeta`,`Alt`,`Shift`];return(()=>{var i=Ji();return h(i,f(Wt,{withPadding:!0,get children(){return[f(Yt,{get children(){return[f(Xt,{get children(){return[f(Qt,{get children(){return f(Et,{})}}),`General`]}}),f(Zt,{children:`Configure general behavior of the devtools panel.`}),(()=>{var r=Ki();return h(r,f(et,{label:`Default open`,description:`Automatically open the devtools panel when the page loads`,onChange:()=>e({defaultOpen:!t().defaultOpen}),get checked(){return t().defaultOpen}}),null),h(r,f(et,{label:`Hide trigger until hovered`,description:`Keep the devtools trigger button hidden until you hover over its area`,onChange:()=>e({hideUntilHover:!t().hideUntilHover}),get checked(){return t().hideUntilHover}}),null),h(r,f(et,{label:`Completely hide trigger`,description:`Completely removes the trigger from the DOM (you can still open it with the hotkey)`,onChange:()=>e({triggerHidden:!t().triggerHidden}),get checked(){return t().triggerHidden}}),null),h(r,f(lt,{label:`Theme`,options:[{label:`Dark`,value:`dark`},{label:`Light`,value:`light`}],get value(){return t().theme},onChange:t=>e({theme:t})}),null),T(()=>F(r,n().settingsGroup)),r})()]}}),f(Yt,{get children(){return[f(Xt,{get children(){return[f(Qt,{get children(){return f(kt,{})}}),`URL Configuration`]}}),f(Zt,{children:`Control when devtools are available based on URL parameters.`}),(()=>{var r=Ki();return h(r,f(et,{label:`Require URL Flag`,description:`Only show devtools when a specific URL parameter is present`,get checked(){return t().requireUrlFlag},onChange:t=>e({requireUrlFlag:t})}),null),h(r,f(w,{get when(){return t().requireUrlFlag},get children(){var r=Ki();return h(r,f(it,{label:`URL flag`,description:`Enter the URL parameter name (for example, 'debug' for ?debug=true)`,placeholder:`debug`,get value(){return t().urlFlag},onChange:t=>e({urlFlag:t})})),T(()=>F(r,n().conditionalSetting)),r}}),null),T(()=>F(r,n().settingsGroup)),r})()]}}),f(Yt,{get children(){return[f(Xt,{get children(){return[f(Qt,{get children(){return f(Dt,{})}}),`Keyboard`]}}),f(Zt,{children:`Customize keyboard shortcuts for quick access.`}),(()=>{var i=Ki();return h(i,f(Gi,{title:`Open/Close Devtools`,description:`Hotkey to open/close devtools`,get hotkey(){return t().openHotkey},modifiers:r,onHotkeyChange:t=>e({openHotkey:t})}),null),h(i,f(Gi,{title:`Source Inspector`,description:`Hotkey to open source inspector`,get hotkey(){return t().inspectHotkey},modifiers:r,onHotkeyChange:t=>e({inspectHotkey:t})}),null),T(()=>F(i,n().settingsStack)),i})()]}}),f(Yt,{get children(){return[f(Xt,{get children(){return[f(Qt,{get children(){return f(Ot,{})}}),`Position`]}}),f(Zt,{children:`Adjust the position of the trigger button and devtools panel.`}),(()=>{var r=qi(),i=r.firstChild;return h(r,f(lt,{label:`Trigger Mode`,description:`Fixed anchors the trigger to a corner. Floating lets you drag and throw it.`,get value(){return t().triggerMode},options:[{label:`Fixed`,value:`fixed`},{label:`Floating`,value:`floating`}],onChange:t=>e({triggerMode:t})}),i),h(i,f(w,{get when(){return t().triggerMode===`fixed`},get children(){return f(lt,{label:`Trigger Position`,options:[{label:`Bottom Right`,value:`bottom-right`},{label:`Bottom Left`,value:`bottom-left`},{label:`Top Right`,value:`top-right`},{label:`Top Left`,value:`top-left`},{label:`Middle Right`,value:`middle-right`},{label:`Middle Left`,value:`middle-left`}],get value(){return t().position},onChange:t=>e({position:t})})}}),null),h(i,f(lt,{label:`Panel Position`,get value(){return t().panelLocation},options:[{label:`Top`,value:`top`},{label:`Bottom`,value:`bottom`}],onChange:t=>e({panelLocation:t})}),null),T(e=>{var t=n().settingsGroup,a=n().settingRow;return t!==e.e&&F(r,e.e=t),a!==e.t&&F(i,e.t=a),e},{e:void 0,t:void 0}),r})()]}})]}})),i})()},Xi=e=>{if(e.status===`installing`)return`Installing...`;if(e.status===`success`)return`Installed!`;if(e.status===`error`)return`Error`;switch(e.actionType){case`install`:return`Install`;case`install-devtools`:return`Install Devtools`;case`add-to-devtools`:return`Add to Devtools`;case`requires-package`:return`Requires ${e.requiredPackageName}`;case`wrong-framework`:return`Different Framework`;case`already-installed`:return`Already Installed`;case`bump-version`:return`Bump Version`;case`version-mismatch`:return`Version Mismatch`;default:return`Install`}},Zi=e=>e.actionType===`requires-package`||e.actionType===`wrong-framework`||e.actionType===`version-mismatch`?`danger`:e.actionType===`bump-version`?`warning`:e.actionType===`already-installed`?`secondary`:`primary`,Qi=(e,t)=>{let n=t(),r=n.pluginMarketplaceCardBadge;switch(e.actionType){case`install`:case`install-devtools`:return`${r} ${n.pluginMarketplaceCardBadgeInstall}`;case`add-to-devtools`:return`${r} ${n.pluginMarketplaceCardBadgeAdd}`;case`already-installed`:return`${r} ${n.pluginMarketplaceCardBadgeActive}`;case`bump-version`:case`version-mismatch`:return`${r} ${n.pluginMarketplaceCardBadgeBlocked}`;case`requires-package`:case`wrong-framework`:return`${r} ${n.pluginMarketplaceCardBadgeRequires}`;default:return r}},$i=e=>{switch(e.actionType){case`install`:case`install-devtools`:return`Available`;case`add-to-devtools`:return`Installed`;case`already-installed`:return`Active`;case`version-mismatch`:return`Incompatible`;case`requires-package`:return`Unavailable`;case`wrong-framework`:return`Other Framework`;default:return``}},ea=B(`<img>`),ta=B(`<span>New`),na=B(`<span>v<!> • min v`),ra=B(`<p>`),ia=B(`<a target=_blank rel="noopener noreferrer">Documentation `),aa=B(`<div>`),oa=B(`<div data-tsd-surface style=position:relative><span></span><div></div><div><h3></h3><p></p><p>`),sa=B(`<span>v<!> • requires v<!>+`),ca=B(`<span>`),la=B(`<span>Installing...`),ua=B(`<span>Installed!`),da=B(`<div role=status>`),fa=e=>{let t=$(),{card:r}=e;return(()=>{var i=oa(),a=i.firstChild,o=a.nextSibling,c=o.nextSibling,u=c.firstChild,d=u.nextSibling,p=d.nextSibling;return h(a,()=>$i(r)),h(o,f(w,{get when(){return r.metadata?.logoUrl},get fallback(){return f(jt,{})},get children(){var e=ea();return T(n=>{var i=r.metadata?.logoUrl,a=r.metadata?.title||r.devtoolsPackage,o=t().pluginMarketplaceCardImage;return i!==n.e&&s(e,`src`,n.e=i),a!==n.t&&s(e,`alt`,n.t=a),o!==n.a&&F(e,n.a=o),n},{e:void 0,t:void 0,a:void 0}),e}})),h(u,()=>r.metadata?.title||r.devtoolsPackage,null),h(u,f(w,{get when(){return r.metadata?.isNew},get children(){var e=ta();return T(()=>F(e,t().pluginMarketplaceNewBanner)),e}}),null),h(d,()=>r.devtoolsPackage),h(p,(()=>{var e=_(()=>r.actionType===`requires-package`);return()=>e()?`Requires ${r.requiredPackageName}`:_(()=>r.actionType===`wrong-framework`)()?`For different framework projects`:_(()=>r.actionType===`already-installed`)()?`Active in your devtools`:_(()=>r.actionType===`version-mismatch`)()?r.versionInfo?.reason||`Version incompatible`:r.metadata?.description||`For ${r.requiredPackageName}`})()),h(c,f(w,{get when(){return r.versionInfo},get children(){var e=ra();return h(e,f(w,{get when(){return r.versionInfo?.satisfied},get fallback(){return(()=>{var e=sa(),n=e.firstChild.nextSibling,i=n.nextSibling.nextSibling;return i.nextSibling,h(e,()=>r.versionInfo?.current,n),h(e,()=>r.versionInfo?.required,i),T(()=>F(e,t().pluginMarketplaceCardVersionUnsatisfied)),e})()},get children(){var e=na(),n=e.firstChild.nextSibling;return n.nextSibling,h(e,()=>r.versionInfo?.current,n),h(e,()=>r.versionInfo?.required,null),T(()=>F(e,t().pluginMarketplaceCardVersionSatisfied)),e}})),T(()=>F(e,t().pluginMarketplaceCardVersionInfo)),e}}),null),h(c,f(w,{get when(){return r.metadata?.docsUrl},get children(){var e=ia();return e.firstChild,h(e,f(It,{}),null),T(n=>{var i=r.metadata?.docsUrl,a=t().pluginMarketplaceCardDocsLink;return i!==n.e&&s(e,`href`,n.e=i),a!==n.t&&F(e,n.t=a),n},{e:void 0,t:void 0}),e}}),null),h(c,f(w,{get when(){return _(()=>!!r.metadata?.tags)()&&r.metadata.tags.length>0},get children(){var e=aa();return h(e,f(l,{get each(){return r.metadata?.tags},children:e=>(()=>{var n=ca();return h(n,e),T(()=>F(n,t().pluginMarketplaceCardTag)),n})()})),T(()=>F(e,t().pluginMarketplaceCardTags)),e}}),null),h(i,f(w,{get when(){return r.status===`idle`},get fallback(){return(()=>{var e=da();return h(e,f(w,{get when(){return r.status===`installing`},get children(){return[(()=>{var e=aa();return T(()=>F(e,t().pluginMarketplaceCardSpinner)),e})(),(()=>{var e=la();return T(()=>F(e,t().pluginMarketplaceCardStatusText)),e})()]}}),null),h(e,f(w,{get when(){return r.status===`success`},get children(){return[f(Mt,{}),(()=>{var e=ua();return T(()=>F(e,t().pluginMarketplaceCardStatusText)),e})()]}}),null),h(e,f(w,{get when(){return r.status===`error`},get children(){return[f(Nt,{}),(()=>{var e=ca();return h(e,()=>r.error||`Failed to install`),T(()=>F(e,t().pluginMarketplaceCardStatusTextError)),e})()]}}),null),T(()=>F(e,t().pluginMarketplaceCardStatus)),e})()},get children(){return f(Ht,{get variant(){return Zi(r)},onClick:()=>e.onAction(r),get disabled(){return r.status!==`idle`||r.actionType===`requires-package`||r.actionType===`wrong-framework`||r.actionType===`already-installed`||r.actionType===`version-mismatch`},get class(){return _(()=>r.actionType===`already-installed`)()?t().pluginMarketplaceButtonInstalled:``},get children(){return Xi(r)}})}}),null),T(e=>{var s=t().pluginMarketplaceCard,l={[t().pluginMarketplaceCardDisabled]:!r.isCurrentFramework&&r.actionType!==`already-installed`,[t().pluginMarketplaceCardFeatured]:!!r.metadata?.featured&&r.actionType!==`already-installed`,[t().pluginMarketplaceCardActive]:r.actionType===`already-installed`},f=Qi(r,t),m=t().pluginMarketplaceCardIcon,h=!!r.metadata?.logoUrl,g=t().pluginMarketplaceCardHeader,_=t().pluginMarketplaceCardTitle,v=t().pluginMarketplaceCardPackageBadge,y=t().pluginMarketplaceCardDescriptionText;return s!==e.e&&F(i,e.e=s),e.t=n(i,l,e.t),f!==e.a&&F(a,e.a=f),m!==e.o&&F(o,e.o=m),h!==e.i&&o.classList.toggle(`custom-logo`,e.i=h),g!==e.n&&F(c,e.n=g),_!==e.s&&F(u,e.s=_),v!==e.h&&F(d,e.h=v),y!==e.r&&F(p,e.r=y),e},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0}),i})()},pa=B(`<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"fill=currentColor><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">`),ma=B(`<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><rect x=2 y=4 width=20 height=16 rx=2></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7">`),ha=B(`<div><div><h4><span></span>Want to be featured here?</h4><p>If you've built a plugin for TanStack Devtools and would like to showcase it in the featured section, we'd love to hear from you! Reach out to us to discuss partnership opportunities.</p><a href="mailto:partners+devtools@tanstack.com?subject=Featured%20Plugin%20Partnership%20Inquiry"><span></span>Contact Us`),ga=B(`<div><div>`),_a=B(`<div><div role=button tabindex=0 data-tsd-control><div><div></div><h3>`),va=()=>pa(),ya=()=>ma(),ba=e=>{let t=$();return(()=>{var r=_a(),i=r.firstChild,a=i.firstChild,o=a.firstChild,c=o.nextSibling;return i.$$keydown=t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),e.onToggleCollapse())},I(i,`click`,e.onToggleCollapse,!0),h(o,f(Pt,{})),h(c,()=>e.section.displayName),h(r,f(w,{get when(){return!e.isCollapsed()},get children(){var n=ga(),r=n.firstChild;return h(n,f(w,{get when(){return e.section.id===`featured`},get children(){var e=ha(),n=e.firstChild,r=n.firstChild,i=r.firstChild,a=r.nextSibling,o=a.nextSibling,s=o.firstChild;return h(i,f(va,{})),h(s,f(ya,{})),T(c=>{var l=t().pluginMarketplaceFeatureBanner,u=t().pluginMarketplaceFeatureBannerContent,d=t().pluginMarketplaceFeatureBannerTitle,f=t().pluginMarketplaceFeatureBannerIcon,p=t().pluginMarketplaceFeatureBannerText,m=t().pluginMarketplaceFeatureBannerButton,h=t().pluginMarketplaceFeatureBannerButtonIcon;return l!==c.e&&F(e,c.e=l),u!==c.t&&F(n,c.t=u),d!==c.a&&F(r,c.a=d),f!==c.o&&F(i,c.o=f),p!==c.i&&F(a,c.i=p),m!==c.n&&F(o,c.n=m),h!==c.s&&F(s,c.s=h),c},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0}),e}}),r),h(r,f(l,{get each(){return e.section.cards},children:t=>f(fa,{card:t,get onAction(){return e.onCardAction}})})),T(e=>{var i=t().pluginMarketplaceSectionContent,a=t().pluginMarketplaceGrid;return i!==e.e&&F(n,e.e=i),a!==e.t&&F(r,e.t=a),e},{e:void 0,t:void 0}),n}}),null),T(l=>{var u=t().pluginMarketplaceSection,d=!e.isCollapsed(),f=t().pluginMarketplaceSectionHeader,p=t().pluginMarketplaceSectionHeaderLeft,m=t().pluginMarketplaceSectionChevron,h={[t().pluginMarketplaceSectionChevronCollapsed]:e.isCollapsed()},g=t().pluginMarketplaceSectionTitle;return u!==l.e&&F(r,l.e=u),d!==l.t&&s(i,`aria-expanded`,l.t=d),f!==l.a&&F(i,l.a=f),p!==l.o&&F(a,l.o=p),m!==l.i&&F(o,l.i=m),l.n=n(o,h,l.n),g!==l.s&&F(c,l.s=g),l},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0}),r})()};m([`click`,`keydown`]);var xa=B(`<div data-tsd-surface role=dialog aria-label="Marketplace settings"><div><h3>Marketplace Settings</h3><button type=button aria-label="Close marketplace settings"data-tsd-control></button></div><div>`),Sa=e=>{let t=$();return f(w,{get when(){return e.isOpen()},get children(){var n=xa(),r=n.firstChild,i=r.firstChild,a=i.nextSibling,o=r.nextSibling;return I(a,`click`,e.onClose,!0),h(a,f(Rt,{})),h(o,f(et,{label:`Show active plugins`,description:`Display installed plugins in a separate section`,get checked(){return e.showActivePlugins()},onChange:t=>e.setShowActivePlugins(t)})),T(e=>{var s=t().pluginMarketplaceSettingsPanel,c=t().pluginMarketplaceSettingsPanelHeader,l=t().pluginMarketplaceSettingsPanelTitle,u=t().pluginMarketplaceSettingsPanelClose,d=t().pluginMarketplaceSettingsPanelContent;return s!==e.e&&F(n,e.e=s),c!==e.t&&F(r,e.t=c),l!==e.a&&F(i,e.a=l),u!==e.o&&F(a,e.o=u),d!==e.i&&F(o,e.i=d),e},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),n}})};m([`click`]);var Ca=B(`<div>`),wa=B(`<button type=button data-tsd-control>`),Ta=e=>{let t=$();return f(w,{get when(){return e.tags().length>0},get children(){var r=Ca();return h(r,f(l,{get each(){return e.tags()},children:r=>(()=>{var i=wa();return i.$$click=()=>e.onToggleTag(r),h(i,r),T(a=>{var o=e.selectedTags().has(r),c=e.selectedTags().has(r),l=t().pluginMarketplaceTagButton,u={[t().pluginMarketplaceTagButtonActive]:e.selectedTags().has(r)};return o!==a.e&&s(i,`data-tsd-selected`,a.e=o),c!==a.t&&s(i,`aria-pressed`,a.t=c),l!==a.a&&F(i,a.a=l),a.o=n(i,u,a.o),a},{e:void 0,t:void 0,a:void 0,o:void 0}),i})()})),T(()=>F(r,t().pluginMarketplaceTagsContainer)),r}})};m([`click`]);var Ea=B(`<div><div><div><h2>Plugin Marketplace</h2><p>Discover and install devtools for TanStack Query, Router, Form, and Pacer</p></div><div data-testid=marketplace-controls><div><input type=text aria-label="Search plugins"data-tsd-control placeholder="Search plugins..."></div><button type=button aria-label="Marketplace settings"data-tsd-control>`),Da=e=>{let t=$();return(()=>{var n=Ea(),r=n.firstChild,i=r.firstChild,a=i.firstChild,o=a.nextSibling,s=i.nextSibling,c=s.firstChild,l=c.firstChild,u=c.nextSibling;return h(c,f(Ft,{}),l),l.$$input=t=>e.onSearchInput(t.currentTarget.value),I(u,`click`,e.onSettingsClick,!0),h(u,f(Lt,{})),h(n,f(Ta,{get tags(){return e.tags},get selectedTags(){return e.selectedTags},get onToggleTag(){return e.onToggleTag}}),null),T(e=>{var d=t().pluginMarketplaceHeader,f=t().pluginMarketplaceTitleRow,p=t().pluginMarketplaceTitleBlock,m=t().pluginMarketplaceTitle,h=t().pluginMarketplaceDescription,g=t().pluginMarketplaceControls,_=t().pluginMarketplaceSearchWrapper,v=t().pluginMarketplaceSearch,y=t().pluginMarketplaceSettingsButton;return d!==e.e&&F(n,e.e=d),f!==e.t&&F(r,e.t=f),p!==e.a&&F(i,e.a=p),m!==e.o&&F(a,e.o=m),h!==e.i&&F(o,e.i=h),g!==e.n&&F(s,e.n=g),_!==e.s&&F(c,e.s=_),v!==e.h&&F(l,e.h=v),y!==e.r&&F(u,e.r=y),e},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0}),T(()=>l.value=e.searchInput()),n})()};m([`input`,`click`]);var Oa=[`react`,`solid`,`vue`,`svelte`,`angular`],ka={"@tanstack/react-query-devtools":{packageName:`@tanstack/react-query-devtools`,title:`TanStack Query Devtools`,description:`Powerful devtools for TanStack Query - inspect queries, mutations, and cache`,requires:{packageName:`@tanstack/react-query`,minVersion:`5.0.0`},pluginId:`tanstack-query`,docsUrl:`https://tanstack.com/query/latest/docs/devtools`,author:`TanStack`,framework:`react`,featured:!0,tags:[`TanStack`,`data-fetching`,`caching`,`state-management`]},"@tanstack/solid-query-devtools":{packageName:`@tanstack/solid-query-devtools`,title:`TanStack Query Devtools`,description:`Powerful devtools for TanStack Query - inspect queries, mutations, and cache`,requires:{packageName:`@tanstack/solid-query`,minVersion:`5.0.0`},pluginId:`tanstack-query`,docsUrl:`https://tanstack.com/query/latest/docs/devtools`,author:`TanStack`,framework:`solid`,tags:[`TanStack`,`data-fetching`,`caching`,`state-management`]},"@tanstack/react-router-devtools":{packageName:`@tanstack/react-router-devtools`,title:`TanStack Router Devtools`,description:`Inspect routes, navigation, and router state in real-time`,requires:{packageName:`@tanstack/react-router`,minVersion:`1.0.0`},pluginId:`tanstack-router`,docsUrl:`https://tanstack.com/router/latest/docs/devtools`,author:`TanStack`,framework:`react`,featured:!0,tags:[`TanStack`,`routing`,`navigation`]},"@tanstack/solid-router-devtools":{packageName:`@tanstack/solid-router-devtools`,title:`TanStack Router Devtools`,description:`Inspect routes, navigation, and router state in real-time`,requires:{packageName:`@tanstack/solid-router`,minVersion:`1.0.0`},pluginId:`tanstack-router`,docsUrl:`https://tanstack.com/router/latest/docs/devtools`,author:`TanStack`,framework:`solid`,tags:[`TanStack`,`routing`,`navigation`]},"@tanstack/react-form-devtools":{packageName:`@tanstack/react-form-devtools`,title:`TanStack Form Devtools`,description:`Debug form state, validation, and field values`,requires:{packageName:`@tanstack/react-form`,minVersion:`1.23.0`},pluginImport:{importName:`FormDevtoolsPlugin`,type:`function`},pluginId:`tanstack-form`,docsUrl:`https://tanstack.com/form/latest/docs/devtools`,author:`TanStack`,framework:`react`,isNew:!0,tags:[`TanStack`,`forms`,`validation`]},"@tanstack/solid-form-devtools":{packageName:`@tanstack/solid-form-devtools`,title:`TanStack Form Devtools`,description:`Debug form state, validation, and field values`,requires:{packageName:`@tanstack/solid-form`,minVersion:`1.23.0`},pluginImport:{importName:`FormDevtoolsPlugin`,type:`function`},pluginId:`tanstack-form`,docsUrl:`https://tanstack.com/form/latest/docs/devtools`,author:`TanStack`,isNew:!0,framework:`solid`,tags:[`TanStack`,`forms`,`validation`]},"@tanstack/react-pacer-devtools":{packageName:`@tanstack/react-pacer-devtools`,title:`Pacer Devtools`,description:`Monitor and debug your Pacer animations and transitions`,requires:{packageName:`@tanstack/react-pacer`,minVersion:`0.16.4`},author:`TanStack`,framework:`react`,isNew:!0,tags:[`TanStack`]},"@tanstack/solid-pacer-devtools":{packageName:`@tanstack/solid-pacer-devtools`,title:`Pacer Devtools`,description:`Monitor and debug your Pacer animations and transitions`,requires:{packageName:`@tanstack/solid-pacer`,minVersion:`0.14.4`},author:`TanStack`,framework:`solid`,isNew:!0,tags:[`TanStack`]},"@tanstack/devtools-a11y":{packageName:`@tanstack/devtools-a11y`,title:`Accessibility Devtools`,description:`Audit accessibility issues in real-time with axe-core. Supports WCAG 2.1/2.2, live monitoring, and visual overlays.`,pluginImport:{importName:`createA11yPlugin`,type:`function`},pluginId:`devtools-a11y`,docsUrl:`https://tanstack.com/devtools/latest/docs/plugins/a11y`,author:`TanStack`,framework:`react`,isNew:!0,tags:[`TanStack`,`a11y`]},"@tanstack/react-ai-devtools":{packageName:`@tanstack/react-ai-devtools`,title:`TanStack AI Devtools`,description:`Debug TanStack AI - inspect messages, token usage, streaming chunks, tool calls, and reasoning.`,requires:{packageName:`@tanstack/ai-react`,minVersion:`0.8.0`},pluginImport:{importName:`aiDevtoolsPlugin`,type:`function`},pluginId:`tanstack-ai`,docsUrl:`https://tanstack.com/ai`,repoUrl:`https://github.com/TanStack/ai`,author:`TanStack`,framework:`react`,isNew:!0,tags:[`TanStack`,`AI`,`streaming`]},"@dimano/ts-devtools-plugin-prefetch-heatmap":{packageName:`@dimano/ts-devtools-plugin-prefetch-heatmap`,title:`Prefetch Heatmap`,description:`Visualize TanStack Router prefetch intent, hits, and waste with a color overlay and a live metrics panel.`,requires:{packageName:`@tanstack/react-router`,minVersion:`1.0.0`},pluginImport:{importName:`registerPrefetchHeatmapPlugin`,type:`function`},pluginId:`prefetch-heatmap`,logoUrl:`https://raw.githubusercontent.com/dimitrianoudi/tanstack-prefetch-heatmap/main/assets/prefetch-heatmap-card.png`,docsUrl:`https://github.com/dimitrianoudi/tanstack-prefetch-heatmap#prefetch-heatmap-devtools-plugin`,repoUrl:`https://github.com/dimitrianoudi/tanstack-prefetch-heatmap`,author:`Dimitris Anoudis (@dimitrianoudi)`,framework:`react`,isNew:!0,tags:[`Router`,`Prefetch`,`Analytics`,`Overlay`,`TanStack`]},"@santosvilanculos/bevor-react":{packageName:`@santosvilanculos/bevor-react`,title:`Inertia 3 Devtools`,description:`Inertia 3 devtools built on top of TanStack DevTools`,pluginImport:{importName:`inertiaDevtoolsPlugin`,type:`function`},pluginId:`inertia-devtools`,logoUrl:`https://raw.githubusercontent.com/santosvilanculos/bevor/main/logo.png`,docsUrl:`https://github.com/SantosVilanculos/bevor/tree/main/packages/react`,repoUrl:`https://github.com/SantosVilanculos/bevor`,author:`Santos Vilanculos (santosvilanculos@yahoo.com)`,framework:`react`,isNew:!0,tags:[`TanStack`,`React`,`Inertia`,`Laravel`]}};function Aa(){return Object.values(ka)}function ja(e){if(!e)return null;let t=e.replace(/^[v^~]/,``).split(`-`)[0]?.split(`+`)[0];if(!t)return null;let n=t.split(`.`);if(n.length<2)return null;let r=parseInt(n[0]??`0`,10),i=parseInt(n[1]??`0`,10),a=parseInt(n[2]??`0`,10);return isNaN(r)||isNaN(i)||isNaN(a)?null:{major:r,minor:i,patch:a,raw:e}}function Ma(e,t){return e.major===t.major?e.minor===t.minor?e.patch-t.patch:e.minor-t.minor:e.major-t.major}function Na(e,t){let n=ja(e),r=ja(t);return!n||!r||Ma(n,r)>=0}function Pa(e,t){let n=ja(e),r=ja(t);return!n||!r||Ma(n,r)<=0}function Fa(e,t,n){return!t&&!n?{satisfied:!0}:t&&!Na(e,t)?{satisfied:!1,reason:`Requires v${t} or higher (current: v${e})`}:n&&!Pa(e,n)?{satisfied:!1,reason:`Requires v${n} or lower (current: v${e})`}:{satisfied:!0}}var Ia=(e,t)=>{let n={...e.dependencies,...e.devDependencies},r={react:[`react`,`react-dom`],vue:[`vue`,`@vue/core`],solid:[`solid-js`],svelte:[`svelte`],angular:[`@angular/core`]};for(let e of t){let t=r[e];if(t&&t.some(e=>n[e]))return e}return`unknown`},La=(e,t,n,r,i)=>{if(i)return Array.from(e).some(e=>{let t=e.toLowerCase(),n=i.toLowerCase();return t.startsWith(n)||t.includes(n)});if(e.has(t))return!0;let a=n.toLowerCase().split(/[-_/@]/).filter(e=>e.length>0),o=r.toLowerCase();return Array.from(e).some(e=>{let t=e.toLowerCase();if(t.includes(n.toLowerCase()))return!0;let r=a.filter(e=>t.includes(e));return!!(r.length>=2||t.includes(o)&&r.length>=1)})},Ra=(e,t,n,r)=>{let i={...e.dependencies,...e.devDependencies},a=[];return Aa().forEach(e=>{let o=e.packageName,s=e.framework===t||e.framework===`other`,c=e.requires?.packageName,l=c?!!i[c]:!1,u=!!i[o],d;if(l&&e.requires){let t=c?i[c]:void 0;if(t){let n=Fa(t,e.requires.minVersion,e.requires.maxVersion);d={current:t,required:e.requires.minVersion,satisfied:n.satisfied,reason:n.reason}}}let f=La(n,o,e.packageName,e.framework,e.pluginId),p;p=s?e.requires&&!l?`requires-package`:d&&!d.satisfied?`bump-version`:u&&f?`already-installed`:u&&!f?`add-to-devtools`:!u&&e.requires&&l?`install-devtools`:`install`:`wrong-framework`;let m=r.find(e=>e.devtoolsPackage===o);a.push({requiredPackageName:c||``,devtoolsPackage:o,framework:e.framework,hasPackage:l,hasDevtools:u,isRegistered:f,actionType:p,status:m?.status||`idle`,error:m?.error,isCurrentFramework:s,metadata:e,versionInfo:d})}),a},za=e=>{let t=[],n=e.filter(e=>e.metadata?.featured&&e.actionType!==`already-installed`&&e.isCurrentFramework);t.push({id:`featured`,displayName:`Featured`,cards:n});let r=e.filter(e=>e.actionType===`already-installed`&&e.isRegistered);r.length>0&&t.push({id:`active`,displayName:`Active Plugins`,cards:r});let i=e.filter(e=>e.isCurrentFramework&&e.actionType!==`already-installed`&&!e.metadata?.featured);return i.length>0&&t.push({id:`available`,displayName:`Available Plugins`,cards:i}),t},Ba=B(`<div><p>`),Va=B(`<div data-testid=plugin-marketplace data-tsd-surface><div>`),Ha=()=>{let e=$(),{plugins:t}=ti(),[n,r]=v([]),[i,a]=v(null),[o,s]=v(``),[c,u]=v(``),[d,p]=v(new Set),[m,g]=v(!0),[y,b]=v(new Set),[x,S]=v(!1),C,E=e=>{s(e),C&&clearTimeout(C),C=setTimeout(()=>{u(e)},300)},D=e=>{p(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})},ee=(e,t)=>{if(!t)return!0;let n=t.toLowerCase();return e.devtoolsPackage.toLowerCase().includes(n)||e.requiredPackageName.toLowerCase().includes(n)||e.framework.toLowerCase().includes(n)},O=()=>{let e=c(),r=m(),a=y(),o=i();if(!o)return[];let s=za(Ra(o,Ia(o,Oa),new Set(t()?.map(e=>e.id||``)||[]),n().flatMap(e=>e.cards)));return r||(s=s.filter(e=>e.id!==`active`)),a.size>0&&(s=s.map(e=>({...e,cards:e.cards.filter(e=>e.metadata?.tags?e.metadata.tags.some(e=>a.has(e)):!1)})).filter(e=>e.cards.length>0)),e?s.map(t=>({...t,cards:t.cards.filter(t=>ee(t,e))})).filter(e=>e.cards.length>0):s};k(()=>{let e=q.on(`package-json-read`,e=>{a(e.payload.packageJson),A(e.payload.packageJson)}),t=q.on(`package-json-updated`,e=>{a(e.payload.packageJson),A(e.payload.packageJson)}),n=q.on(`devtools-installed`,e=>{r(t=>t.map(t=>({...t,cards:t.cards.map(t=>t.devtoolsPackage===e.payload.packageName?{...t,status:e.payload.success?`success`:`error`,error:e.payload.error}:t)})))}),o=q.on(`plugin-added`,e=>{if(r(t=>t.map(t=>({...t,cards:t.cards.map(t=>t.devtoolsPackage===e.payload.packageName?{...t,status:e.payload.success?`success`:`error`,error:e.payload.error}:t)}))),e.payload.success){let e=i();e&&A(e)}}),s=()=>q.emit(`mounted`,void 0),c=0,l=setInterval(()=>{if(i()||c>=10){clearInterval(l);return}c++,s()},400);P(()=>{e(),t(),n(),o(),clearInterval(l)}),s()});let A=e=>{if(!e)return;let i=za(Ra(e,Ia(e,Oa),new Set(t()?.map(e=>e.id||``)||[]),n().flatMap(e=>e.cards)));r(i)},j=e=>{if(e.actionType!==`requires-package`&&e.actionType!==`wrong-framework`&&e.actionType!==`already-installed`&&e.actionType!==`version-mismatch`){if(r(t=>t.map(t=>({...t,cards:t.cards.map(t=>t.devtoolsPackage===e.devtoolsPackage?{...t,status:`installing`}:t)}))),e.actionType===`bump-version`){q.emit(`bump-package-version`,{packageName:e.requiredPackageName,devtoolsPackage:e.devtoolsPackage,pluginName:e.metadata?.title||e.devtoolsPackage,minVersion:e.metadata?.requires?.minVersion,pluginImport:e.metadata?.pluginImport});return}if(e.actionType===`add-to-devtools`){q.emit(`add-plugin-to-devtools`,{packageName:e.devtoolsPackage,pluginName:e.metadata?.title??e.devtoolsPackage,pluginImport:e.metadata?.pluginImport});return}q.emit(`install-devtools`,{packageName:e.devtoolsPackage,pluginName:e.metadata?.title??e.devtoolsPackage,pluginImport:e.metadata?.pluginImport})}},M=()=>{let e=new Set;return n().forEach(t=>{(t.id===`featured`||t.id===`available`)&&t.cards.forEach(t=>{t.metadata?.tags&&t.metadata.tags.forEach(t=>e.add(t))})}),Array.from(e).sort()},N=e=>{b(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})};return(()=>{var t=Va(),n=t.firstChild;return h(n,f(Da,{searchInput:o,onSearchInput:E,onSettingsClick:()=>S(!x()),tags:M,selectedTags:y,onToggleTag:N}),null),h(n,f(w,{get when(){return O().length>0},get children(){return f(l,{get each(){return O()},children:e=>f(ba,{section:e,isCollapsed:()=>d().has(e.id),onToggleCollapse:()=>D(e.id),onCardAction:j})})}}),null),h(n,f(w,{get when(){return O().length===0},get children(){var t=Ba(),n=t.firstChild;return h(n,(()=>{var e=_(()=>!!c());return()=>e()?`No plugins found matching "${c()}"`:`No additional plugins available. You have all compatible devtools installed and registered!`})()),T(r=>{var i=e().pluginMarketplaceEmpty,a=e().pluginMarketplaceEmptyText;return i!==r.e&&F(t,r.e=i),a!==r.t&&F(n,r.t=a),r},{e:void 0,t:void 0}),t}}),null),h(t,f(Sa,{isOpen:x,onClose:()=>S(!1),showActivePlugins:m,setShowActivePlugins:g}),null),T(r=>{var i=e().pluginMarketplace,a=e().pluginMarketplaceScroll;return i!==r.e&&F(t,r.e=i),a!==r.t&&F(n,r.t=a),r},{e:void 0,t:void 0}),t})()},Ua=B(`<div data-tsd-surface>`),Wa=()=>{let{plugins:e}=ti(),t=$();return f(w,{get when(){return(e()?.length??0)===0},get children(){var e=Ua();return h(e,f(Ha,{})),T(()=>F(e,t().pluginsTabContent)),e}})},Ga=e=>(e.nodeType===3?e.parentNode:e)?.nodeName===`STYLE`;function Ka(e,t={}){let{attributes:n=!0,childList:r=!0,subtree:i=!0,observeTitle:a=!0}=t;k(()=>{let t=new MutationObserver(t=>{for(let n of t)if(n.type===`childList`)n.addedNodes.forEach(t=>{Ga(t)||e({kind:`added`,node:t},n)}),n.removedNodes.forEach(t=>{Ga(t)||e({kind:`removed`,node:t},n)});else if(n.type===`attributes`){if(Ga(n.target))continue;let t=n.target;e({kind:`attr`,target:t,name:n.attributeName,oldValue:n.oldValue??null},n)}else n.target.parentNode&&n.target.parentNode.tagName.toLowerCase()===`title`&&e({kind:`title`,title:document.title},n)});t.observe(document.head,{childList:r,attributes:n,subtree:i,attributeOldValue:n,characterData:!0,characterDataOldValue:!1});let o;if(a){let t=document.head.querySelector(`title`)||document.head.appendChild(document.createElement(`title`));o=new MutationObserver(()=>{e({kind:`title`,title:document.title})}),o.observe(t,{childList:!0,characterData:!0,subtree:!0})}P(()=>{t.disconnect(),o?.disconnect()})})}var qa=B(`<div><div data-testid=social-preview-heading><span aria-hidden=true></span> Preview</div><div data-testid=social-preview-title></div><div></div><div>`),Ja=B(`<img alt=Preview>`),Ya=B(`<div>No image`),Xa=B(`<div>`),Za=B(`<div><strong>Missing tags for <!>:</strong><ul>`),Qa=B(`<li>`),$a=[{network:`Facebook`,tags:[{key:`og:title`,prop:`title`},{key:`og:description`,prop:`description`},{key:`og:image`,prop:`image`},{key:`og:url`,prop:`url`}],color:`#4267B2`},{network:`X/Twitter`,tags:[{key:`twitter:title`,prop:`title`},{key:`twitter:description`,prop:`description`},{key:`twitter:image`,prop:`image`},{key:`twitter:url`,prop:`url`}],color:`#1DA1F2`},{network:`LinkedIn`,tags:[{key:`og:title`,prop:`title`},{key:`og:description`,prop:`description`},{key:`og:image`,prop:`image`},{key:`og:url`,prop:`url`}],color:`#0077B5`},{network:`Discord`,tags:[{key:`og:title`,prop:`title`},{key:`og:description`,prop:`description`},{key:`og:image`,prop:`image`},{key:`og:url`,prop:`url`}],color:`#5865F2`},{network:`Slack`,tags:[{key:`og:title`,prop:`title`},{key:`og:description`,prop:`description`},{key:`og:image`,prop:`image`},{key:`og:url`,prop:`url`}],color:`#4A154B`},{network:`Mastodon`,tags:[{key:`og:title`,prop:`title`},{key:`og:description`,prop:`description`},{key:`og:image`,prop:`image`},{key:`og:url`,prop:`url`}],color:`#6364FF`},{network:`Bluesky`,tags:[{key:`og:title`,prop:`title`},{key:`og:description`,prop:`description`},{key:`og:image`,prop:`image`},{key:`og:url`,prop:`url`}],color:`#1185FE`}];function eo(e){let t=$();return(()=>{var n=qa(),r=n.firstChild,i=r.firstChild,a=i.nextSibling,o=r.nextSibling,c=o.nextSibling,l=c.nextSibling;return h(r,()=>e.network,a),h(n,(()=>{var n=_(()=>!!e.meta.image);return()=>n()?(()=>{var n=Ja();return T(r=>{var i=e.meta.image,a=t().seoPreviewImage;return i!==r.e&&s(n,`src`,r.e=i),a!==r.t&&F(n,r.t=a),r},{e:void 0,t:void 0}),n})():(()=>{var e=Ya();return T(()=>F(e,`${t().seoPreviewImage} ${t().seoPreviewImagePlaceholder}`)),e})()})(),o),h(o,()=>e.meta.title||`No Title`),h(c,()=>e.meta.description||`No Description`),h(l,()=>e.meta.url||window.location.href),T(a=>{var s=t().seoPreviewCard,d=t().seoPreviewHeader,f=t().seoPreviewNetworkDot,p=e.color,m=t().seoPreviewTitle,h=t().seoPreviewDesc,g=t().seoPreviewUrl;return s!==a.e&&F(n,a.e=s),d!==a.t&&F(r,a.t=d),f!==a.a&&F(i,a.a=f),p!==a.o&&u(i,`background`,a.o=p),m!==a.i&&F(o,a.i=m),h!==a.n&&F(c,a.n=h),g!==a.s&&F(l,a.s=g),a},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0}),n})()}function to(){let[e,t]=v(r()),n=$();function r(){let e=Array.from(document.head.querySelectorAll(`meta`)),t=[];for(let n of $a){let r={},i=[];for(let t of n.tags){let n=e.find(e=>!t.key.includes(`twitter:`)&&e.getAttribute(`property`)===t.key||e.getAttribute(`name`)===t.key);n&&n.getAttribute(`content`)?r[t.prop]=n.getAttribute(`content`)||void 0:i.push(t.key)}t.push({network:n.network,found:r,missing:i})}return t}return Ka(()=>{t(r())}),f(Yt,{get children(){return[f(Zt,{children:`See how your current page will look when shared on popular social networks. The tool checks for essential meta tags and highlights any that are missing.`}),(()=>{var t=Xa();return h(t,f(l,{get each(){return e()},children:(e,t)=>{let r=$a[t()];return(()=>{var t=Xa();return h(t,f(eo,{get meta(){return e.found},get color(){return r.color},get network(){return r.network}}),null),h(t,(()=>{var t=_(()=>e.missing.length>0);return()=>t()?(()=>{var t=Za(),i=t.firstChild,a=i.firstChild.nextSibling;a.nextSibling;var o=i.nextSibling;return h(i,()=>r?.network,a),h(o,f(l,{get each(){return e.missing},children:e=>(()=>{var t=Qa();return h(t,e),T(()=>F(t,n().seoMissingTag)),t})()})),T(e=>{var r=n().seoMissingTagsSection,i=n().seoMissingTagsList;return r!==e.e&&F(t,e.e=r),i!==e.t&&F(o,e.t=i),e},{e:void 0,t:void 0}),t})():null})(),null),t})()}})),T(()=>F(t,n().seoPreviewSection)),t})()]}})}var no=B(`<div><div data-testid=serp-preview-label></div><div><div><div><span data-testid=serp-preview-site-name></span><span></span></div></div><div data-testid=serp-preview-title>`),ro=B(`<img alt="favicon icon">`),io=B(`<div>`),ao=B(`<div><strong>Issues for <!>:</strong><ul>`),oo=B(`<li>`),so=60,co=158,lo=120,uo=`...`,fo=[{message:`No favicon or icon set on the page.`,hasIssue:e=>!e.favicon},{message:`No title tag set on the page.`,hasIssue:e=>!e.title.trim()},{message:`No meta description set on the page.`,hasIssue:e=>!e.description.trim()},{message:`The title is wider than 600px and it may not be displayed in full length.`,hasIssue:(e,t)=>t.titleOverflow}],po=[{label:`Desktop preview`,isMobile:!1,extraChecks:[{message:`The meta description may get trimmed at ~960 pixels on desktop and at ~680px on mobile. Keep it below ~158 characters.`,hasIssue:(e,t)=>t.descriptionOverflow}]},{label:`Mobile preview`,isMobile:!0,extraChecks:[{message:`Description exceeds the 3-line limit for mobile view. Please shorten your text to fit within 3 lines.`,hasIssue:(e,t)=>t.descriptionOverflowMobile}]}];function mo(e,t){return e.length<=t?e:t<=uo.length?uo:e.slice(0,t-uo.length)+uo}function ho(){let e=document.title||``,t=typeof window<`u`?window.location.href:``,n=Array.from(document.head.querySelectorAll(`meta`)),r=n.find(e=>e.getAttribute(`name`)?.toLowerCase()===`description`)?.getAttribute(`content`)?.trim()||``,i=n.find(e=>e.getAttribute(`property`)===`og:site_name`)?.getAttribute(`content`)?.trim()||(typeof window<`u`?window.location.hostname.replace(/^www\./,``):``),a=Array.from(document.head.querySelectorAll(`link`)).find(e=>e.getAttribute(`rel`)?.toLowerCase().split(/\s+/).includes(`icon`))?.getAttribute(`href`)||null;if(a&&typeof window<`u`)try{a=new URL(a,t).href}catch{a=null}return{title:e,description:r,siteName:i,favicon:a,url:t}}function go(e,t,n){return n.filter(n=>n.hasIssue(e,t)).map(e=>e.message)}function _o(e){let t=$();return(()=>{var n=no(),r=n.firstChild,i=r.nextSibling,a=i.firstChild,o=a.firstChild,c=o.firstChild,u=c.nextSibling,d=a.nextSibling;return h(r,()=>e.label),h(a,(()=>{var n=_(()=>!!e.data.favicon);return()=>n()?(()=>{var n=ro();return T(r=>{var i=e.data.favicon,a=t().serpSnippetFavicon;return i!==r.e&&s(n,`src`,r.e=i),a!==r.t&&F(n,r.t=a),r},{e:void 0,t:void 0}),n})():(()=>{var e=io();return T(()=>F(e,t().serpSnippetDefaultFavicon)),e})()})(),o),h(c,()=>e.data.siteName||e.data.url),h(u,()=>e.data.url),h(d,()=>e.displayTitle||e.data.title||`No title`),h(i,(()=>{var n=_(()=>!e.isMobile);return()=>n()&&(()=>{var n=io();return h(n,()=>e.displayDescription||e.data.description||`No meta description.`),T(()=>F(n,t().serpSnippetDesc)),n})()})(),null),h(i,(()=>{var n=_(()=>!!e.isMobile);return()=>n()&&(()=>{var n=io();return h(n,()=>e.displayDescription||e.data.description||`No meta description.`),T(()=>F(n,t().serpSnippetDescMobile)),n})()})(),null),h(n,(()=>{var n=_(()=>e.issues.length>0);return()=>n()?(()=>{var n=ao(),r=n.firstChild,i=r.firstChild.nextSibling;i.nextSibling;var a=r.nextSibling;return h(r,()=>e.label,i),h(a,f(l,{get each(){return e.issues},children:e=>(()=>{var n=oo();return h(n,e),T(()=>F(n,t().serpReportItem)),n})()})),T(e=>{var r=t().seoMissingTagsSection,i=t().serpErrorList;return r!==e.e&&F(n,e.e=r),i!==e.t&&F(a,e.t=i),e},{e:void 0,t:void 0}),n})():null})(),null),T(s=>{var l=t().serpPreviewBlock,f=t().serpPreviewLabel,p=e.isMobile?t().serpSnippetMobile:t().serpSnippet,m=t().serpSnippetTopRow,h=t().serpSnippetSiteColumn,g=t().serpSnippetSiteName,_=t().serpSnippetSiteUrl,v=t().serpSnippetTitle;return l!==s.e&&F(n,s.e=l),f!==s.t&&F(r,s.t=f),p!==s.a&&F(i,s.a=p),m!==s.o&&F(a,s.o=m),h!==s.i&&F(o,s.i=h),g!==s.n&&F(c,s.n=g),_!==s.s&&F(u,s.s=_),v!==s.h&&F(d,s.h=v),s},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0}),n})()}function vo(){let[e,t]=v(ho());Ka(()=>{t(ho())});let n=E(()=>{let t=e(),n=t.title||`No title`,r=t.description||`No meta description.`;return{displayTitle:mo(n,so),displayDescription:mo(r,co),overflow:{titleOverflow:n.length>so,descriptionOverflow:r.length>co,descriptionOverflowMobile:r.length>lo}}});return f(Yt,{get children(){return[f(Zt,{children:`See how your title tag and meta description may look in Google search results. Data is read from the current page.`}),f(l,{each:po,children:t=>{let r=E(()=>go(e(),n().overflow,[...fo,...t.extraChecks]));return f(_o,{get data(){return e()},get displayTitle(){return n().displayTitle},get displayDescription(){return n().displayDescription},get isMobile(){return t.isMobile},get label(){return t.label},get issues(){return r()}})}})]}})}var yo=B(`<div data-testid=seo-workspace data-tsd-surface>`),bo=()=>{let[e,t]=v(`social-previews`),n=$();return(()=>{var r=yo();return h(r,f(Fi,{ariaLabel:`SEO sections`,get children(){return[f(Li,{get selected(){return e()===`social-previews`},get ariaCurrent(){return e()===`social-previews`?`page`:void 0},onClick:()=>t(`social-previews`),children:`Social previews`}),f(Li,{get selected(){return e()===`serp-preview`},get ariaCurrent(){return e()===`serp-preview`?`page`:void 0},onClick:()=>t(`serp-preview`),children:`SERP preview`})]}}),null),h(r,f(Wt,{withPadding:!0,get class(){return n().seoContent},get children(){return[f(w,{get when(){return e()===`social-previews`},get children(){return f(to,{})}}),f(w,{get when(){return e()===`serp-preview`},get children(){return f(vo,{})}})]}}),null),T(()=>F(r,n().seoWorkspace)),r})()},xo=[{name:`Plugins`,id:`plugins`,component:()=>f(Wa,{})},{name:`SEO`,id:`seo`,component:()=>f(bo,{})},{name:`Settings`,id:`settings`,component:()=>f(Yi,{})}],So=B(`<div role=group aria-label="Panes in this group"style=position:absolute>`),Co=B(`<span><span><button type=button data-tsd-group-tab data-tsd-control></button></span><button type=button data-tsd-control>`),wo=B(`<div data-testid=plugins-empty-state data-tsd-surface style=position:absolute;inset:0><span aria-hidden=true></span><p>No plugin open</p><p>Pick a plugin from the strip above to open its panel. You can keep up to <!> open, split side by side or stacked as tabs.`),To=B(`<div data-testid=plugins-workspace data-tsd-surface><p aria-live=polite data-testid=plugin-workspace-status></p><p id=tsd-pane-move-hint>Press Enter to pick this pane up and move it with the arrow keys.`),Eo=B(`<div data-plugin-mount data-tsd-surface style=position:absolute>`),Do=B(`<div role=separator tabindex=0 data-tsd-control data-tsd-separator=plugin-pane data-testid=plugin-splitter aria-label="Resize plugin panes"aria-valuemin=0 aria-valuemax=100>`),Oo=B(`<div data-testid=plugin-drop-overlay>`),ko=B(`<span aria-hidden=true data-testid=plugin-drag-preview>`),Ao=(e,t)=>({left:e.left+t,top:e.top+t,width:Math.max(e.width-t*2,0),height:Math.max(e.height-t*2,0)}),jo=(e,t)=>e.dir===`row`?{...e.rect,left:e.rect.left-t,width:e.rect.width+t*2}:{...e.rect,top:e.rect.top-t,height:e.rect.height+t*2},Mo=.02,No=.1,Po=500,Fo=e=>{let t=$(),n=Jr({get items(){return e.tabs},group:`tsd-plugin-panes`,axis:`x`,onReorder:t=>e.onReorder(t),onTransfer:({item:t,to:n})=>e.onTransfer(t,n)});return(()=>{var i=So(),a=n.ref;return typeof a==`function`?r(a,i):n.ref=i,h(i,f(l,{get each(){return e.tabs},children:(r,i)=>(()=>{var a=Co(),o=a.firstChild,c=o.firstChild,l=o.nextSibling;return p(o,L(()=>n.row(r),{get class(){return t().pluginGroupTabRow}}),!1,!0),c.$$click=()=>e.onSelect(r),c.$$keydown=t=>e.onKeyDown(r,t),c.$$pointerdown=t=>e.onPointerDown(r,t),s(c,`data-testid`,`plugin-tab-${r}`),h(c,()=>e.titleOf(r)),l.$$click=()=>e.onClose(r),l.$$pointerup=()=>e.onClose(r),s(l,`data-testid`,`plugin-tab-close-${r}`),h(l,f(At,{"aria-hidden":`true`})),T(n=>{var o=t().pluginGroupTabItem,u=i()===e.activeIndex?`true`:void 0,d=e.heldTabId===r?`true`:void 0,f=i()===e.activeIndex,p=e.moveHintId,m=t().pluginGroupTab,h=`Close ${e.titleOf(r)}`,g=t().pluginGroupTabClose;return o!==n.e&&F(a,n.e=o),u!==n.t&&s(a,`data-tsd-selected`,n.t=u),d!==n.a&&s(a,`data-tsd-held`,n.a=d),f!==n.o&&s(c,`aria-pressed`,n.o=f),p!==n.i&&s(c,`aria-describedby`,n.i=p),m!==n.n&&F(c,n.n=m),h!==n.s&&s(l,`aria-label`,n.s=h),g!==n.h&&F(l,n.h=g),n},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0}),a})()})),T(n=>{var r=e.groupId,a=`plugin-group-tabs-${e.groupId}`,o=t().pluginGroupTabs,c=`${e.rect?.left??0}px`,l=`${e.rect?.top??0}px`,d=`${e.rect?.width??0}px`;return r!==n.e&&s(i,`data-tsd-group-tabs`,n.e=r),a!==n.t&&s(i,`data-testid`,n.t=a),o!==n.a&&F(i,n.a=o),c!==n.o&&u(i,`left`,n.o=c),l!==n.i&&u(i,`top`,n.i=l),d!==n.n&&u(i,`width`,n.n=d),n},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0}),i})()},Io=e=>{let{plugins:t,activePlugins:n,layout:a,setLayout:o}=ti(),{acceptStripDrags:c}=ai(),{theme:p}=ei(),m=$(),[_,y]=v(new Map),[C,D]=v({w:0,h:0}),[k,j]=v(null),[M,N]=v(null),[te,I]=v(``),[se,L]=v(null),ue,R=()=>{if(!ue)return;let e=ue.getBoundingClientRect();(e.width!==0||e.height!==0)&&D({w:e.width,h:e.height})},de=e=>{ue=e,R();let t=globalThis.ResizeObserver;if(!t)return;let n=new t(R);n.observe(e),P(()=>n.disconnect())};d(()=>{e.visible,e.isOpen,R()});let fe=E(()=>({w:Math.max(C().w-16,0),h:Math.max(C().h-16,0)})),pe=e=>({...e,left:e.left+8,top:e.top+8}),z=E(()=>{let e=ie(a(),fe(),8);return Object.fromEntries(Object.entries(e).map(([e,t])=>[e,pe(t)]))}),he=E(()=>b(a(),fe(),8).map(e=>({...e,rect:pe(e.rect)}))),ge=E(()=>me(a())),ye=E(()=>[...n()].sort(),[],{equals:(e,t)=>e.length===t.length&&e.every((e,n)=>e===t[n])}),B=e=>z()[e]??null,Ce=e=>{let t=B(e);return t?{...t,height:32}:null},we=e=>{let t=B(e);return t?{left:t.left,top:t.top+32,width:t.width,height:Math.max(t.height-32,0)}:null},Te=e=>ne(a(),e),Ee=e=>{let t=Te(e);return t!==null&&t.tabs[t.active]===e},De=e=>t()?.find(t=>t.id===e),V=e=>{let t=De(e);return t===void 0?e:typeof t.name==`string`?t.name:e};d(()=>{for(let t of n()){let n=De(t),r=_().get(t);n&&r&&n.render(r,{theme:p(),devtoolsOpen:e.isOpen})}});let Oe=()=>{j(null),N(null),L(null)};d(()=>{let e=ue?.closest(`#${O}`);if(!e)return;let t=m().pluginDraggingCursor;if(se()===null){e.classList.remove(t);return}e.classList.add(t),P(()=>e.classList.remove(t))});let H=e=>I(e),ke=(e,t)=>{let n=z()[e];if(!n)return null;if(t.y<=n.top+32)return{groupId:e,zone:`center`,willStack:!0};let r=x(t,we(e)??n,ae);return{groupId:e,zone:r,willStack:r===`center`||!oe(a(),e,r,ce,fe(),8)}},Ae=(e,t)=>{if(e===null)return;if(e.groupId===null){o(A([t]));return}let n=e.willStack?i(a(),e.groupId,t):be(a(),e.groupId,e.zone,t);o(n)},je=e=>{let t=ue?.getBoundingClientRect();return{x:e.x-(t?.left??0),y:e.y-(t?.top??0)}},Me=e=>je({x:e.clientX,y:e.clientY}),Ne=(e,t)=>{if(t.button!==0)return;R();let n=!1,r={x:t.clientX,y:t.clientY},i=window.setTimeout(()=>{n=!0,j({tabId:e}),L(r),N(Ie(je(r)))},Po),a=e=>{r={x:e.clientX,y:e.clientY},n&&(L(r),N(Ie(Me(e))))},o=()=>{window.clearTimeout(i),document.removeEventListener(`pointermove`,a),document.removeEventListener(`pointerup`,o),n&&Ae(M(),e),Oe()};document.addEventListener(`pointermove`,a),document.addEventListener(`pointerup`,o)},Pe=e=>ge().find(t=>{let n=z()[t.id];return n!==void 0&&e.x>=n.left&&e.x<=n.left+n.width&&e.y>=n.top&&e.y<=n.top+n.height}),Fe=e=>e.x>=0&&e.y>=0&&e.x<=C().w&&e.y<=C().h,Ie=e=>{if(a()===null)return Fe(e)?{groupId:null,zone:`center`,willStack:!0}:null;let t=Pe(e);return t?ke(t.id,e):null};c((e,t)=>{let r=n().includes(e);if(!r&&n().length>=18){H(`Already at the limit of 18 open plugins`);return}R(),j({tabId:e}),L(t);let i=e=>N(Ie(e));i(je(t));let a=e=>{L({x:e.clientX,y:e.clientY}),i(Me(e))},o=()=>{document.removeEventListener(`pointermove`,a),document.removeEventListener(`pointerup`,o);let t=M();t===null?r||H(`${V(e)} was not placed`):(Ae(t,e),H(`${V(e)} ${t.willStack?`stacked as a tab`:`split to the ${t.zone}`}`)),Oe()};document.addEventListener(`pointermove`,a),document.addEventListener(`pointerup`,o)});let Le=(e,t)=>{if(t.button!==0)return;t.preventDefault();let n=t.currentTarget;n instanceof HTMLElement&&n.setPointerCapture(t.pointerId);let r=e.dir===`row`?t.clientX:t.clientY,i=a(),s=e.extent>0?(e.dir===`row`?ce.w:ce.h)/e.extent:0,c=document.body.style.userSelect;document.body.style.userSelect=`none`;let l=t=>{t.preventDefault();let n=e.dir===`row`?t.clientX:t.clientY;o(ve(i,e.path,e.gutterIndex,n-r,e.extent,s))},u=e=>{n instanceof HTMLElement&&n.hasPointerCapture(e.pointerId)&&n.releasePointerCapture(e.pointerId),document.body.style.userSelect=c,document.removeEventListener(`pointermove`,l),document.removeEventListener(`pointerup`,u)};document.addEventListener(`pointermove`,l),document.addEventListener(`pointerup`,u)},Re=(e,t)=>{let n=t.shiftKey?No:Mo,r=e.dir===`row`?t.key===`ArrowRight`:t.key===`ArrowDown`,i=e.dir===`row`?t.key===`ArrowLeft`:t.key===`ArrowUp`,s;if(r&&(s=n),i&&(s=-n),t.key===`Home`&&(s=-1),t.key===`End`&&(s=1),s===void 0)return;t.preventDefault();let c=e.extent>0?(e.dir===`row`?ce.w:ce.h)/e.extent:0;o(ee(a(),e.path,e.gutterIndex,s,c))},ze=(e,t)=>{let n=k()?.tabId===e;if(t.key===`Escape`&&n){t.preventDefault(),Oe(),H(`${V(e)} left where it was`);return}if(t.key===`Enter`||t.key===` `){if(t.preventDefault(),!n){j({tabId:e}),N(null),H(`${V(e)} picked up. Use the arrow keys to choose a place, Enter to drop, Escape to cancel.`);return}let r=M();r===null?(Oe(),H(`${V(e)} left where it was`)):(Ae(r,e),Oe(),H(`${V(e)} ${r.willStack?`stacked as a tab`:`split to the ${r.zone}`}`));return}if(!n)return;let r={ArrowLeft:`left`,ArrowRight:`right`,ArrowUp:`top`,ArrowDown:`bottom`}[t.key];if(r===void 0)return;t.preventDefault();let i=Te(e);if(i===null)return;let a=z()[i.id],o=ge().find(e=>{if(e.id===i.id)return!1;let t=z()[e.id];return!t||!a?!1:r===`left`?t.left+t.width<=a.left+1:r===`right`?t.left>=a.left+a.width-1:r===`top`?t.top+t.height<=a.top+1:t.top>=a.top+a.height-1});N(o?{groupId:o.id,zone:`center`,willStack:!0}:ke(i.id,{x:(a?.left??0)+(r===`left`?1:r===`right`?(a?.width??0)-1:(a?.width??0)/2),y:(a?.top??0)+(r===`top`?1:r===`bottom`?(a?.height??0)-1:(a?.height??0)/2)}))},Be=E(()=>{let e=M();if(e===null)return null;if(e.groupId===null)return Ao({left:0,top:0,width:C().w,height:C().h},8);let t=B(e.groupId);if(!t)return null;if(e.willStack)return t;let n=e=>e/2;return e.zone===`left`?{...t,width:n(t.width)}:e.zone===`right`?{left:t.left+n(t.width),top:t.top,width:n(t.width),height:t.height}:e.zone===`top`?{...t,height:n(t.height)}:{left:t.left,top:t.top+n(t.height),width:t.width,height:n(t.height)}});return(()=>{var t=To(),i=t.firstChild,c=i.nextSibling;return r(de,t),h(t,f(w,{get when(){return n().length>0},get children(){return[f(l,{get each(){return ge()},children:e=>f(Fo,{get groupId(){return e.id},get tabs(){return e.tabs},get activeIndex(){return e.active},get rect(){return Ce(e.id)},get heldTabId(){return k()?.tabId??null},titleOf:V,moveHintId:`tsd-pane-move-hint`,onReorder:t=>o(xe(a(),e.id,t)),onTransfer:(t,n)=>o(re(a(),t,e.id,n)),onSelect:e=>o(le(a(),e)),onClose:e=>o(_e(a(),e)),onPointerDown:Ne,onKeyDown:ze})}),f(l,{get each(){return ye()},children:e=>{P(()=>{De(e)?.destroy?.(e),y(t=>{let n=new Map(t);return n.delete(e),n})});let t=()=>we(Te(e)?.id??``);return(()=>{var n=Eo();return r(t=>{y(n=>{let r=new Map(n);return r.set(e,t),r})},n),s(n,`id`,`${Se}-${e}`),s(n,`data-testid`,`plugin-pane-${e}`),T(r=>{var i=m().pluginsTabContent,a=`${t()?.left??0}px`,o=`${t()?.top??0}px`,s=`${t()?.width??0}px`,c=`${t()?.height??0}px`,l=Ee(e)?`block`:`none`;return i!==r.e&&F(n,r.e=i),a!==r.t&&u(n,`left`,r.t=a),o!==r.a&&u(n,`top`,r.a=o),s!==r.o&&u(n,`width`,r.o=s),c!==r.i&&u(n,`height`,r.i=c),l!==r.n&&u(n,`display`,r.n=l),r},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0}),n})()}}),f(S,{get each(){return he()},children:e=>{let t=()=>jo(e(),8);return(()=>{var n=Do();return n.$$keydown=t=>Re(e(),t),n.$$pointerdown=t=>Le(e(),t),T(r=>{var i=e().dir===`row`?`vertical`:`horizontal`,a=Math.round((e().dir===`row`?e().rect.left:e().rect.top)/Math.max(e().extent,1)*100),o=m().pluginSplitter(e().dir),c=`${t().left}px`,l=`${t().top}px`,d=`${t().width}px`,f=`${t().height}px`;return i!==r.e&&s(n,`aria-orientation`,r.e=i),a!==r.t&&s(n,`aria-valuenow`,r.t=a),o!==r.a&&F(n,r.a=o),c!==r.o&&u(n,`left`,r.o=c),l!==r.i&&u(n,`top`,r.i=l),d!==r.n&&u(n,`width`,r.n=d),f!==r.s&&u(n,`height`,r.s=f),r},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0}),n})()}})]}}),i),h(t,f(w,{get when(){return Be()},children:e=>(()=>{var t=Oo();return T(n=>{var r=M()?.willStack?`stack`:`split`,i=m().pluginDropOverlay,a=`${e().left}px`,o=`${e().top}px`,c=`${e().width}px`,l=`${e().height}px`;return r!==n.e&&s(t,`data-tsd-drop-intent`,n.e=r),i!==n.t&&F(t,n.t=i),a!==n.a&&u(t,`left`,n.a=a),o!==n.o&&u(t,`top`,n.o=o),c!==n.i&&u(t,`width`,n.i=c),l!==n.n&&u(t,`height`,n.n=l),n},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0}),t})()}),i),h(t,f(w,{get when(){return se()},children:e=>f(g,{get mount(){return document.body},get children(){var t=ko();return h(t,()=>V(k()?.tabId??``)),T(n=>{var r=m().pluginDragPreview,i=`${e().x}px`,a=`${e().y}px`;return r!==n.e&&F(t,n.e=r),i!==n.t&&u(t,`left`,n.t=i),a!==n.a&&u(t,`top`,n.a=a),n},{e:void 0,t:void 0,a:void 0}),t}})}),i),h(i,te),h(t,f(w,{get when(){return n().length===0},get children(){var e=wo(),t=e.firstChild,n=t.nextSibling,r=n.nextSibling,i=r.firstChild.nextSibling;return i.nextSibling,h(t,f(jt,{})),h(r,18,i),T(i=>{var a=m().pluginsEmptyState,o=m().pluginsEmptyStateIcon,s=m().pluginsEmptyStateTitle,c=m().pluginsEmptyStateHint;return a!==i.e&&F(e,i.e=a),o!==i.t&&F(t,i.t=o),s!==i.a&&F(n,i.a=s),c!==i.o&&F(r,i.o=c),i},{e:void 0,t:void 0,a:void 0,o:void 0}),e}}),null),T(n=>{var r=k()?`true`:void 0,a=m().pluginWorkspace,o=e.visible?`block`:`none`,l=m().pluginSrOnly,d=m().pluginSrOnly;return r!==n.e&&s(t,`data-tsd-dragging`,n.e=r),a!==n.t&&F(t,n.t=a),o!==n.a&&u(t,`display`,n.a=o),l!==n.o&&F(i,n.o=l),d!==n.i&&F(c,n.i=d),n},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),t})()};m([`pointerdown`,`keydown`,`click`,`pointerup`]);var Lo=B(`<div data-tsd-surface style="flex:1 1 0;min-height:0;position:relative">`),Ro=e=>{let{state:t}=ni(),n=$(),r=E(()=>xo.find(e=>e.id===t().activeTab)?.component||null),i=()=>!e.showMarketplace&&t().activeTab===`plugins`;return(()=>{var t=Lo();return h(t,f(Io,{get isOpen(){return e.isOpen},get visible(){return i()}}),null),h(t,(()=>{var t=_(()=>!!e.showMarketplace);return()=>t()?f(Ha,{}):r()?.({isOpen:e.isOpen})})(),null),T(()=>F(t,n().tabContent)),t})()},zo=B(`<div style=pointer-events:none>`),Bo=()=>{let{settings:e}=Q(),t=()=>({element:null,bounding:{width:0,height:0,left:0,top:0},dataSource:``}),[n,i]=C(t()),a=()=>{i(t())},[o,s]=v(null),c=Qr(()=>o()),[l,u]=C({x:0,y:0});ke(document,`mousemove`,e=>{u({x:e.clientX,y:e.clientY})});let f=Ne(),[p,m]=v(!1),g=E(()=>di(f(),e().inspectHotkey));d(()=>{g()||m(!1)});let _=E(()=>g()&&!p());d(()=>{_()?document.body.style.cursor=`pointer`:document.body.style.cursor=``}),d(()=>{if(!_()){a();return}let e=document.elementFromPoint(l.x,l.y);if(!(e instanceof HTMLElement)){a();return}if(e===n.element)return;let t=e.getAttribute(`data-tsd-source`);if(!t){a();return}let r=e.getBoundingClientRect(),o={width:r.width,height:r.height,left:r.left,top:r.top};i({element:e,bounding:o,dataSource:t})}),ke(document,`click`,t=>{if(!n.element)return;let r=n.dataSource;if(window.getSelection()?.removeAllRanges(),t.preventDefault(),t.stopPropagation(),m(!0),e().sourceAction===`copy-path`){navigator.clipboard.writeText(r).catch(()=>{});return}let i=new URL(`/archives/apps/remote-learning/react-vite/`,location.origin),a=new URL(`__tsd/open-source?source=${encodeURIComponent(r)}`,i);fetch(a).catch(()=>{})});let b=E(()=>n.element?{display:`block`,width:`${n.bounding.width}px`,height:`${n.bounding.height}px`,left:`${n.bounding.left}px`,top:`${n.bounding.top}px`,"background-color":`oklch(55.4% 0.046 257.417 /0.25)`,transition:`all 0.05s linear`,position:`fixed`,"z-index":9999}:{display:`none`}),x=E(()=>{if(n.element&&o()){let e=window.innerWidth,t=c.height||26,r=c.width||0,i=n.bounding.left,a=n.bounding.top-t-4;return a<0&&(a=n.bounding.top+n.bounding.height+4),i+r>e&&(i=e-r-4),i<0&&(i=4),{position:`fixed`,left:`${i}px`,top:`${a}px`,"background-color":`oklch(55.4% 0.046 257.417 /0.80)`,color:`white`,padding:`2px 4px`,fontSize:`12px`,"border-radius":`2px`,"z-index":1e4,visibility:`visible`,transition:`all 0.05s linear`}}return{display:`none`}});return[(()=>{var e=zo();return r(s,e),h(e,()=>n.dataSource),T(t=>y(e,{...x()},t)),e})(),(()=>{var e=zo();return T(t=>y(e,{...b()},t)),e})()]},Vo=B(`<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 64.04 83.84"fill=currentColor><path d=M32.02,0c23.15,0,32.02,14.33,32.02,41.92s-8.87,41.92-32.02,41.92S0,69.53,0,41.92C0,14.33,8.87,0,32.02,0ZM42.61,61.08c-3.01,0-4.65.82-5.97,1.48-1.14.57-2.03,1.02-4.01,1.02s-2.87-.45-4.01-1.02c-1.32-.66-2.96-1.48-5.97-1.48s-4.65.82-5.97,1.48c-1.14.57-2.03,1.02-4.01,1.02v4.37c3.01,0,4.65-.82,5.97-1.48,1.14-.57,2.03-1.02,4.01-1.02s2.87.45,4.01,1.02c1.32.66,2.96,1.48,5.97,1.48s4.65-.82,5.97-1.48c1.14-.57,2.03-1.02,4.01-1.02s2.87.45,4.01,1.02c1.32.66,2.96,1.48,5.97,1.48v-4.37c-1.97,0-2.87-.45-4.01-1.02-1.32-.66-2.96-1.48-5.97-1.48ZM44.04,17.29c2.27-2.05,0-5.76-2.84-4.64-1.57.63-3.05,1.53-4.37,2.72-2.06,1.87-3.45,4.22-4.2,6.78-.75-2.56-2.14-4.91-4.2-6.78-1.32-1.18-2.8-2.09-4.37-2.72-2.84-1.12-5.11,2.59-2.84,4.64l8.33,7.52c-2.72-1.84-6-2.93-9.54-2.93-1.93,0-3.78.31-5.52.91-2.92.99-2.11,5.35.96,5.35h11.62c-2.56.49-4.99,1.63-7.03,3.45-1.32,1.18-2.36,2.56-3.14,4.07-1.41,2.71,2.05,5.34,4.32,3.31l9.38-8.45-.7,23.25c0,.28-.16.55-.37.78-.3-.13-.58-.27-.9-.43-1.32-.66-2.96-1.48-5.97-1.48s-4.65.82-5.97,1.48c-1.14.57-2.03,1.02-4.01,1.02v4.37c3.01,0,4.65-.82,5.97-1.48,1.14-.57,2.03-1.02,4.01-1.02s2.87.45,4.01,1.02c1.32.66,2.96,1.48,5.97,1.48s4.65-.82,5.97-1.48c1.14-.57,2.03-1.02,4.01-1.02s2.87.45,4.01,1.02c1.32.66,2.96,1.48,5.97,1.48v-4.37c-1.97,0-2.87-.45-4.01-1.02v-.02c-1.32-.66-2.96-1.48-5.97-1.48s-4.65.82-5.97,1.48c-.34.16-.66.33-.99.46-.25-.22-.4-.51-.42-.81l-.7-23.37,9.51,8.58c2.27,2.05,5.73-.58,4.32-3.31-.78-1.5-1.82-2.89-3.14-4.07-2.03-1.84-4.46-2.96-7.03-3.45h11.62c3.08,0,3.87-4.35.96-5.35-1.73-.58-3.59-.91-5.52-.91-3.53,0-6.8,1.09-9.54,2.93l8.33-7.52Z>`),Ho=B(`<title>`),Uo=e=>(()=>{var t=Vo(),n=t.firstChild;return h(t,(()=>{var t=_(()=>!!e.title);return()=>t()?(()=>{var t=Ho();return h(t,()=>e.title),t})():null})(),n),T(n=>{var r=e.title?void 0:`true`,i=e.title?`img`:void 0;return r!==n.e&&s(t,`aria-hidden`,n.e=r),i!==n.t&&s(t,`role`,n.t=i),n},{e:void 0,t:void 0}),t})(),Wo=B(`<header aria-label="TanStack Devtools"data-testid=workbench-header data-tsd-surface><span data-testid=workbench-logo aria-hidden=true></span><strong data-testid=workbench-wordmark>TanStack Devtools</strong><nav aria-label="Workbench destinations"data-testid=workbench-destinations></nav><span><button type=button aria-label=Settings title=Settings data-testid=tsd-tab-settings data-tsd-control data-icon=cogs>`),Go=B(`<button type=button data-tsd-control>`),Ko=B(`<button type=button aria-label="Detach TanStack Devtools"title="Detach into its own window"data-testid=tsd-pip-button data-tsd-control>`),qo=B(`<button type=button aria-label="Close TanStack Devtools"title="Close TanStack Devtools"data-testid=tsd-close-button data-tsd-control>`),Jo=e=>{let{state:t,setState:n}=ni(),r=N(),i=$();pi(document);let a=t=>{if(t===`marketplace`){n({activeTab:`plugins`}),e.setShowMarketplace(!0);return}e.setShowMarketplace(!1),n({activeTab:t})},o=n=>n===`marketplace`?e.showMarketplace():!e.showMarketplace()&&t().activeTab===n,c=()=>{r().requestPipWindow(`width=${window.innerWidth},height=${t().height},top=${window.screen.height},left=${window.screenLeft}`)};return(()=>{var t=Wo(),n=t.firstChild,l=n.nextSibling,u=l.nextSibling,d=u.nextSibling,p=d.firstChild;return h(n,f(Uo,{})),h(u,()=>[`plugins`,`marketplace`,`seo`].map(e=>{let t=e===`seo`?`SEO`:e[0].toUpperCase()+e.slice(1);return(()=>{var n=Go();return n.$$click=()=>a(e),s(n,`data-testid`,`tsd-tab-${e}`),h(n,t),T(t=>{var r=i().workbenchNavButton,a=o(e)?`true`:void 0,c=o(e)?`page`:void 0;return r!==t.e&&F(n,t.e=r),a!==t.t&&s(n,`data-tsd-selected`,t.t=a),c!==t.a&&s(n,`aria-current`,t.a=c),t},{e:void 0,t:void 0,a:void 0}),n})()})),p.$$click=()=>a(`settings`),h(p,f(Tt,{})),h(d,(()=>{var t=_(()=>r().pipWindow===null);return()=>t()?[(()=>{var e=Ko();return e.$$click=c,h(e,f(zt,{})),T(()=>F(e,i().workbenchActionButton)),e})(),(()=>{var t=qo();return I(t,`click`,e.toggleOpen,!0),h(t,f(At,{})),T(()=>F(t,i().workbenchActionButton)),t})()]:null})(),null),T(e=>{var r=i().workbenchHeader,a=i().workbenchLogo,c=`${i().workbenchWordmark} tsd-workbench-wordmark`,f=i().workbenchDestinations,m=i().workbenchActions,h=i().workbenchActionButton,g=o(`settings`)?`true`:void 0,_=o(`settings`)?`page`:void 0;return r!==e.e&&F(t,e.e=r),a!==e.t&&F(n,e.t=a),c!==e.a&&F(l,e.a=c),f!==e.o&&F(u,e.o=f),m!==e.i&&F(d,e.i=m),h!==e.n&&F(p,e.n=h),g!==e.s&&s(p,`data-tsd-selected`,e.s=g),_!==e.h&&s(p,`aria-current`,e.h=_),e},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0}),t})()};m([`click`]);var Yo=B(`<h3>`),Xo=500,Zo=e=>{let{plugins:t,activePlugins:n,toggleActivePlugins:i}=ti(),{setState:a}=ni(),{beginStripDrag:o}=ai(),{setCollapsed:c}=ii(),{theme:u}=ei(),p=$(),m=!1,h=e=>{a({activeTab:`plugins`}),i(e)},g=(e,t)=>{if(t.button!==0)return;m=!1;let n={x:t.clientX,y:t.clientY},r=window.setTimeout(()=>{m=!0,document.removeEventListener(`pointermove`,i),o(e,n)},Xo),i=e=>{n={x:e.clientX,y:e.clientY}},a=()=>{window.clearTimeout(r),document.removeEventListener(`pointermove`,i),document.removeEventListener(`pointerup`,a)};document.addEventListener(`pointermove`,i),document.addEventListener(`pointerup`,a)},_=E(()=>(t()??[]).filter(e=>!n().includes(e.id)));return d(e=>{let t=_().length===0;return t&&e===!1&&c(!0),!t&&e===!0&&c(!1),t}),f(Fi,{ariaLabel:`Plugin panels`,dataTestId:`plugins-strip`,get children(){return f(l,{get each(){return _()},children:t=>{let n,i=()=>{n&&(typeof t.name==`string`?n.textContent=t.name:t.name(n,{theme:u(),devtoolsOpen:e.isOpen()}))},a=!1;return d(()=>{if(u(),e.isOpen(),!a){a=!0;return}i()}),f(Li,{get ariaLabelledBy(){return`${Ce}-${t.id}`},pluginTitleControl:!0,selected:!1,onPointerDown:e=>g(t.id,e),onClick:()=>{m||h(t.id)},get children(){var e=Yo();return r(e=>{n=e,i()},e),T(n=>{var r=`${Ce}-${t.id}`,i=typeof t.name==`function`?{all:`initial`}:void 0,a=typeof t.name==`string`?p().pluginTitleText:void 0;return r!==n.e&&s(e,`id`,n.e=r),n.t=y(e,i,n.t),a!==n.a&&F(e,n.a=a),n},{e:void 0,t:void 0,a:void 0}),e}})}})}})},Qo=B(`<div>`),$o=new WeakMap,es=new WeakMap,ts=(e,t,n)=>{let r=$o.get(e);r||(r=new Map,$o.set(e,r),es.set(e,e.documentElement.getAttribute(`data-tanstack-devtools-theme`))),r.delete(t),r.set(t,n),e.documentElement.dataset.tanstackDevtoolsTheme=n},ns=(e,t)=>{let n=$o.get(e);if(!n)return;n.delete(t);let r=[...n.values()],i=r[r.length-1];if(i){e.documentElement.dataset.tanstackDevtoolsTheme=i;return}let a=es.get(e);a==null?delete e.documentElement.dataset.tanstackDevtoolsTheme:e.documentElement.dataset.tanstackDevtoolsTheme=a,$o.delete(e),es.delete(e)};function rs(){let{settings:e}=Q(),{state:t}=ni(),{setHeight:n}=oi(),{persistOpen:i,setPersistOpen:a}=ri(),[o,c]=v(),[l,u]=v(e().defaultOpen||i()),p=N(),m,[y,b]=v(!1),{isCollapsed:x}=ii(),[S,C]=v(!1),T=Symbol(`tanstack-devtools-theme`),E=e=>{n(e),u(e>=70)},D=()=>{if(p().pipWindow)return;let e=!l();u(e),a(e),q.emit(`trigger-toggled`,{isOpen:e})};d(()=>{let e=q.on(`trigger-toggled`,e=>{if(p().pipWindow)return;let t=e.payload;t.isOpen!==l()&&(u(t.isOpen),a(t.isOpen))});P(e)});let ee=()=>t().activeTab===`plugins`&&!S(),k=()=>t().activeTab===`seo`&&!S(),A=()=>ee()||k(),j=(t,n)=>{if(n.button!==0||!t)return;n.preventDefault(),b(!0);let r=t.getBoundingClientRect().height,i=n.clientY,a=document.body.style.userSelect;document.body.style.userSelect=`none`;let o=t=>{t.preventDefault();let n=i-t.clientY,a=e().panelLocation===`bottom`?r+n:r-n;E(a)},s=()=>{document.body.style.userSelect=a,b(!1),document.removeEventListener(`mousemove`,o),document.removeEventListener(`mouseup`,s)};document.addEventListener(`mousemove`,o),document.addEventListener(`mouseup`,s)};d(()=>{let e=e=>{e.key===`Escape`&&l()&&D()};window.addEventListener(`keydown`,e),P(()=>window.removeEventListener(`keydown`,e))}),ci(l),d(()=>{let e=o();e&&e.style.setProperty(`--tsrd-font-size`,getComputedStyle(e).fontSize)}),d(()=>{let t=e=>!e||!(e instanceof HTMLElement)?!1:e.isContentEditable||[`INPUT`,`TEXTAREA`,`SELECT`].includes(e.tagName)?!0:e.getAttribute(`role`)===`textbox`;for(let n of ui(e().openHotkey))Fe(n,()=>{t(document.activeElement)||D()})});let{theme:M}=ei();return d(()=>{let e=p().pipWindow?.document??document;ts(e,T,M()),P(()=>ns(e,T))}),f(Re,{get theme(){return M()},get children(){return f(g,{get mount(){return(p().pipWindow??window).document.body},get children(){var t=Qo();return r(c,t),s(t,`data-testid`,O),h(t,f(w,{get when(){return _(()=>p().pipWindow!==null)()?!0:!_(()=>!!e().requireUrlFlag)()||window.location.search.includes(e().urlFlag)},get children(){return[f(ji,{isOpen:l,setIsOpen:D}),f(zi,{isResizing:y,isOpen:l,isCollapsed:x,hasSubheader:A,get children(){return f(Hi,{ref:e=>m=e,handleDragStart:e=>j(m,e),handleHeightChange:E,get children(){return[f(Jo,{showMarketplace:S,setShowMarketplace:C,toggleOpen:D}),f(w,{get when(){return ee()},get children(){return f(Zo,{isOpen:l})}}),f(Ro,{get isOpen(){return l()},get showMarketplace(){return S()}})]}})}})]}}),null),h(t,f(Bo,{}),null),t}})}})}export{rs as default};