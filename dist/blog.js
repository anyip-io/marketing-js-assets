"use strict";(()=>{var wt=Object.create;var Le=Object.defineProperty;var St=Object.getOwnPropertyDescriptor;var xt=Object.getOwnPropertyNames;var yt=Object.getPrototypeOf,Mt=Object.prototype.hasOwnProperty;var ke=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Ot=(e,t,n,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let u of xt(t))!Mt.call(e,u)&&u!==n&&Le(e,u,{get:()=>t[u],enumerable:!(o=St(t,u))||o.enumerable});return e};var ve=(e,t,n)=>(n=e!=null?wt(yt(e)):{},Ot(t||!e||!e.__esModule?Le(n,"default",{value:e,enumerable:!0}):n,e));var nt=ke((An,tt)=>{function ze(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{let n=e[t],o=typeof n;(o==="object"||o==="function")&&!Object.isFrozen(n)&&ze(n)}),e}var ue=class{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function Ke(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function G(e,...t){let n=Object.create(null);for(let o in e)n[o]=e[o];return t.forEach(function(o){for(let u in o)n[u]=o[u]}),n}var Tt="</span>",He=e=>!!e.scope,At=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){let n=e.split(".");return[`${t}${n.shift()}`,...n.map((o,u)=>`${o}${"_".repeat(u+1)}`)].join(" ")}return`${t}${e}`},me=class{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=Ke(t)}openNode(t){if(!He(t))return;let n=At(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){He(t)&&(this.buffer+=Tt)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}},Pe=(e={})=>{let t={children:[]};return Object.assign(t,e),t},J=class{constructor(){this.rootNode=Pe(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){let n=Pe({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(o=>this._walk(t,o)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{J._collapse(n)}))}},we=class extends J{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){let o=t.root;n&&(o.scope=`language:${n}`),this.add(o)}toHTML(){return new me(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}};function ee(e){return e?typeof e=="string"?e:e.source:null}function je(e){return j("(?=",e,")")}function Nt(e){return j("(?:",e,")*")}function Rt(e){return j("(?:",e,")?")}function j(...e){return e.map(n=>ee(n)).join("")}function It(e){let t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function xe(...e){return"("+(It(e).capture?"":"?:")+e.map(o=>ee(o)).join("|")+")"}function We(e){return new RegExp(e.toString()+"|").exec("").length-1}function Ct(e,t){let n=e&&e.exec(t);return n&&n.index===0}var Lt=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function ye(e,{joinWith:t}){let n=0;return e.map(o=>{n+=1;let u=n,g=ee(o),s="";for(;g.length>0;){let i=Lt.exec(g);if(!i){s+=g;break}s+=g.substring(0,i.index),g=g.substring(i.index+i[0].length),i[0][0]==="\\"&&i[1]?s+="\\"+String(Number(i[1])+u):(s+=i[0],i[0]==="("&&n++)}return s}).map(o=>`(${o})`).join(t)}var kt=/\b\B/,qe="[a-zA-Z]\\w*",Me="[a-zA-Z_]\\w*",Ze="\\b\\d+(\\.\\d+)?",Xe="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Qe="\\b(0b[01]+)",vt="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",Dt=(e={})=>{let t=/^#![ ]*\//;return e.binary&&(e.begin=j(t,/.*\b/,e.binary,/\b.*/)),G({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,o)=>{n.index!==0&&o.ignoreMatch()}},e)},te={begin:"\\\\[\\s\\S]",relevance:0},Bt={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[te]},Ht={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[te]},Pt={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},ge=function(e,t,n={}){let o=G({scope:"comment",begin:e,end:t,contains:[]},n);o.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let u=xe("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return o.contains.push({begin:j(/[ ]+/,"(",u,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),o},Ut=ge("//","$"),$t=ge("/\\*","\\*/"),Gt=ge("#","$"),Ft={scope:"number",begin:Ze,relevance:0},zt={scope:"number",begin:Xe,relevance:0},Kt={scope:"number",begin:Qe,relevance:0},jt={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[te,{begin:/\[/,end:/\]/,relevance:0,contains:[te]}]},Wt={scope:"title",begin:qe,relevance:0},qt={scope:"title",begin:Me,relevance:0},Zt={begin:"\\.\\s*"+Me,relevance:0},Xt=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})},le=Object.freeze({__proto__:null,APOS_STRING_MODE:Bt,BACKSLASH_ESCAPE:te,BINARY_NUMBER_MODE:Kt,BINARY_NUMBER_RE:Qe,COMMENT:ge,C_BLOCK_COMMENT_MODE:$t,C_LINE_COMMENT_MODE:Ut,C_NUMBER_MODE:zt,C_NUMBER_RE:Xe,END_SAME_AS_BEGIN:Xt,HASH_COMMENT_MODE:Gt,IDENT_RE:qe,MATCH_NOTHING_RE:kt,METHOD_GUARD:Zt,NUMBER_MODE:Ft,NUMBER_RE:Ze,PHRASAL_WORDS_MODE:Pt,QUOTE_STRING_MODE:Ht,REGEXP_MODE:jt,RE_STARTERS_RE:vt,SHEBANG:Dt,TITLE_MODE:Wt,UNDERSCORE_IDENT_RE:Me,UNDERSCORE_TITLE_MODE:qt});function Qt(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function Vt(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function Yt(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=Qt,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function Jt(e,t){Array.isArray(e.illegal)&&(e.illegal=xe(...e.illegal))}function en(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function tn(e,t){e.relevance===void 0&&(e.relevance=1)}var nn=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");let n=Object.assign({},e);Object.keys(e).forEach(o=>{delete e[o]}),e.keywords=n.keywords,e.begin=j(n.beforeMatch,je(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},rn=["of","and","for","in","not","or","if","then","parent","list","value"],sn="keyword";function Ve(e,t,n=sn){let o=Object.create(null);return typeof e=="string"?u(n,e.split(" ")):Array.isArray(e)?u(n,e):Object.keys(e).forEach(function(g){Object.assign(o,Ve(e[g],t,g))}),o;function u(g,s){t&&(s=s.map(i=>i.toLowerCase())),s.forEach(function(i){let l=i.split("|");o[l[0]]=[g,on(l[0],l[1])]})}}function on(e,t){return t?Number(t):cn(e)?0:1}function cn(e){return rn.includes(e.toLowerCase())}var Ue={},K=e=>{console.error(e)},$e=(e,...t)=>{console.log(`WARN: ${e}`,...t)},Z=(e,t)=>{Ue[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Ue[`${e}/${t}`]=!0)},fe=new Error;function Ye(e,t,{key:n}){let o=0,u=e[n],g={},s={};for(let i=1;i<=t.length;i++)s[i+o]=u[i],g[i+o]=!0,o+=We(t[i-1]);e[n]=s,e[n]._emit=g,e[n]._multi=!0}function an(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw K("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),fe;if(typeof e.beginScope!="object"||e.beginScope===null)throw K("beginScope must be object"),fe;Ye(e,e.begin,{key:"beginScope"}),e.begin=ye(e.begin,{joinWith:""})}}function ln(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw K("skip, excludeEnd, returnEnd not compatible with endScope: {}"),fe;if(typeof e.endScope!="object"||e.endScope===null)throw K("endScope must be object"),fe;Ye(e,e.end,{key:"endScope"}),e.end=ye(e.end,{joinWith:""})}}function un(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function fn(e){un(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),an(e),ln(e)}function gn(e){function t(s,i){return new RegExp(ee(s),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(i?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(i,l){l.position=this.position++,this.matchIndexes[this.matchAt]=l,this.regexes.push([l,i]),this.matchAt+=We(i)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);let i=this.regexes.map(l=>l[1]);this.matcherRe=t(ye(i,{joinWith:"|"}),!0),this.lastIndex=0}exec(i){this.matcherRe.lastIndex=this.lastIndex;let l=this.matcherRe.exec(i);if(!l)return null;let b=l.findIndex((T,H)=>H>0&&T!==void 0),_=this.matchIndexes[b];return l.splice(0,b),Object.assign(l,_)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(i){if(this.multiRegexes[i])return this.multiRegexes[i];let l=new n;return this.rules.slice(i).forEach(([b,_])=>l.addRule(b,_)),l.compile(),this.multiRegexes[i]=l,l}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(i,l){this.rules.push([i,l]),l.type==="begin"&&this.count++}exec(i){let l=this.getMatcher(this.regexIndex);l.lastIndex=this.lastIndex;let b=l.exec(i);if(this.resumingScanAtSamePosition()&&!(b&&b.index===this.lastIndex)){let _=this.getMatcher(0);_.lastIndex=this.lastIndex+1,b=_.exec(i)}return b&&(this.regexIndex+=b.position+1,this.regexIndex===this.count&&this.considerAll()),b}}function u(s){let i=new o;return s.contains.forEach(l=>i.addRule(l.begin,{rule:l,type:"begin"})),s.terminatorEnd&&i.addRule(s.terminatorEnd,{type:"end"}),s.illegal&&i.addRule(s.illegal,{type:"illegal"}),i}function g(s,i){let l=s;if(s.isCompiled)return l;[Vt,en,fn,nn].forEach(_=>_(s,i)),e.compilerExtensions.forEach(_=>_(s,i)),s.__beforeBegin=null,[Yt,Jt,tn].forEach(_=>_(s,i)),s.isCompiled=!0;let b=null;return typeof s.keywords=="object"&&s.keywords.$pattern&&(s.keywords=Object.assign({},s.keywords),b=s.keywords.$pattern,delete s.keywords.$pattern),b=b||/\w+/,s.keywords&&(s.keywords=Ve(s.keywords,e.case_insensitive)),l.keywordPatternRe=t(b,!0),i&&(s.begin||(s.begin=/\B|\b/),l.beginRe=t(l.begin),!s.end&&!s.endsWithParent&&(s.end=/\B|\b/),s.end&&(l.endRe=t(l.end)),l.terminatorEnd=ee(l.end)||"",s.endsWithParent&&i.terminatorEnd&&(l.terminatorEnd+=(s.end?"|":"")+i.terminatorEnd)),s.illegal&&(l.illegalRe=t(s.illegal)),s.contains||(s.contains=[]),s.contains=[].concat(...s.contains.map(function(_){return dn(_==="self"?s:_)})),s.contains.forEach(function(_){g(_,l)}),s.starts&&g(s.starts,i),l.matcher=u(l),l}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=G(e.classNameAliases||{}),g(e)}function Je(e){return e?e.endsWithParent||Je(e.starts):!1}function dn(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return G(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Je(e)?G(e,{starts:e.starts?G(e.starts):null}):Object.isFrozen(e)?G(e):e}var pn="11.9.0",Se=class extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}},_e=Ke,Ge=G,Fe=Symbol("nomatch"),hn=7,et=function(e){let t=Object.create(null),n=Object.create(null),o=[],u=!0,g="Could not find the language '{}', did you forget to load/include a language module?",s={disableAutodetect:!0,name:"Plain text",contains:[]},i={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:we};function l(r){return i.noHighlightRe.test(r)}function b(r){let f=r.className+" ";f+=r.parentNode?r.parentNode.className:"";let h=i.languageDetectRe.exec(f);if(h){let m=A(h[1]);return m||($e(g.replace("{}",h[1])),$e("Falling back to no-highlight mode for this block.",r)),m?h[1]:"no-highlight"}return f.split(/\s+/).find(m=>l(m)||A(m))}function _(r,f,h){let m="",S="";typeof f=="object"?(m=r,h=f.ignoreIllegals,S=f.language):(Z("10.7.0","highlight(lang, code, ...args) has been deprecated."),Z("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),S=r,m=f),h===void 0&&(h=!0);let N={code:m,language:S};L("before:highlight",N);let $=N.result?N.result:T(N.language,N.code,h);return $.code=N.code,L("after:highlight",$),$}function T(r,f,h,m){let S=Object.create(null);function N(c,a){return c.keywords[a]}function $(){if(!d.keywords){x.addText(w);return}let c=0;d.keywordPatternRe.lastIndex=0;let a=d.keywordPatternRe.exec(w),p="";for(;a;){p+=w.substring(c,a.index);let E=v.case_insensitive?a[0].toLowerCase():a[0],y=N(d,E);if(y){let[B,_t]=y;if(x.addText(p),p="",S[E]=(S[E]||0)+1,S[E]<=hn&&(ae+=_t),B.startsWith("_"))p+=a[0];else{let mt=v.classNameAliases[B]||B;k(a[0],mt)}}else p+=a[0];c=d.keywordPatternRe.lastIndex,a=d.keywordPatternRe.exec(w)}p+=w.substring(c),x.addText(p)}function oe(){if(w==="")return;let c=null;if(typeof d.subLanguage=="string"){if(!t[d.subLanguage]){x.addText(w);return}c=T(d.subLanguage,w,!0,Ce[d.subLanguage]),Ce[d.subLanguage]=c._top}else c=R(w,d.subLanguage.length?d.subLanguage:null);d.relevance>0&&(ae+=c.relevance),x.__addSublanguage(c._emitter,c.language)}function O(){d.subLanguage!=null?oe():$(),w=""}function k(c,a){c!==""&&(x.startScope(a),x.addText(c),x.endScope())}function Ae(c,a){let p=1,E=a.length-1;for(;p<=E;){if(!c._emit[p]){p++;continue}let y=v.classNameAliases[c[p]]||c[p],B=a[p];y?k(B,y):(w=B,$(),w=""),p++}}function Ne(c,a){return c.scope&&typeof c.scope=="string"&&x.openNode(v.classNameAliases[c.scope]||c.scope),c.beginScope&&(c.beginScope._wrap?(k(w,v.classNameAliases[c.beginScope._wrap]||c.beginScope._wrap),w=""):c.beginScope._multi&&(Ae(c.beginScope,a),w="")),d=Object.create(c,{parent:{value:d}}),d}function Re(c,a,p){let E=Ct(c.endRe,p);if(E){if(c["on:end"]){let y=new ue(c);c["on:end"](a,y),y.isMatchIgnored&&(E=!1)}if(E){for(;c.endsParent&&c.parent;)c=c.parent;return c}}if(c.endsWithParent)return Re(c.parent,a,p)}function dt(c){return d.matcher.regexIndex===0?(w+=c[0],1):(be=!0,0)}function pt(c){let a=c[0],p=c.rule,E=new ue(p),y=[p.__beforeBegin,p["on:begin"]];for(let B of y)if(B&&(B(c,E),E.isMatchIgnored))return dt(a);return p.skip?w+=a:(p.excludeBegin&&(w+=a),O(),!p.returnBegin&&!p.excludeBegin&&(w=a)),Ne(p,c),p.returnBegin?0:a.length}function ht(c){let a=c[0],p=f.substring(c.index),E=Re(d,c,p);if(!E)return Fe;let y=d;d.endScope&&d.endScope._wrap?(O(),k(a,d.endScope._wrap)):d.endScope&&d.endScope._multi?(O(),Ae(d.endScope,c)):y.skip?w+=a:(y.returnEnd||y.excludeEnd||(w+=a),O(),y.excludeEnd&&(w=a));do d.scope&&x.closeNode(),!d.skip&&!d.subLanguage&&(ae+=d.relevance),d=d.parent;while(d!==E.parent);return E.starts&&Ne(E.starts,c),y.returnEnd?0:a.length}function Et(){let c=[];for(let a=d;a!==v;a=a.parent)a.scope&&c.unshift(a.scope);c.forEach(a=>x.openNode(a))}let ce={};function Ie(c,a){let p=a&&a[0];if(w+=c,p==null)return O(),0;if(ce.type==="begin"&&a.type==="end"&&ce.index===a.index&&p===""){if(w+=f.slice(a.index,a.index+1),!u){let E=new Error(`0 width match regex (${r})`);throw E.languageName=r,E.badRule=ce.rule,E}return 1}if(ce=a,a.type==="begin")return pt(a);if(a.type==="illegal"&&!h){let E=new Error('Illegal lexeme "'+p+'" for mode "'+(d.scope||"<unnamed>")+'"');throw E.mode=d,E}else if(a.type==="end"){let E=ht(a);if(E!==Fe)return E}if(a.type==="illegal"&&p==="")return 1;if(Ee>1e5&&Ee>a.index*3)throw new Error("potential infinite loop, way more iterations than matches");return w+=p,p.length}let v=A(r);if(!v)throw K(g.replace("{}",r)),new Error('Unknown language: "'+r+'"');let bt=gn(v),he="",d=m||bt,Ce={},x=new i.__emitter(i);Et();let w="",ae=0,z=0,Ee=0,be=!1;try{if(v.__emitTokens)v.__emitTokens(f,x);else{for(d.matcher.considerAll();;){Ee++,be?be=!1:d.matcher.considerAll(),d.matcher.lastIndex=z;let c=d.matcher.exec(f);if(!c)break;let a=f.substring(z,c.index),p=Ie(a,c);z=c.index+p}Ie(f.substring(z))}return x.finalize(),he=x.toHTML(),{language:r,value:he,relevance:ae,illegal:!1,_emitter:x,_top:d}}catch(c){if(c.message&&c.message.includes("Illegal"))return{language:r,value:_e(f),illegal:!0,relevance:0,_illegalBy:{message:c.message,index:z,context:f.slice(z-100,z+100),mode:c.mode,resultSoFar:he},_emitter:x};if(u)return{language:r,value:_e(f),illegal:!1,relevance:0,errorRaised:c,_emitter:x,_top:d};throw c}}function H(r){let f={value:_e(r),illegal:!1,relevance:0,_top:s,_emitter:new i.__emitter(i)};return f._emitter.addText(r),f}function R(r,f){f=f||i.languages||Object.keys(t);let h=H(r),m=f.filter(A).filter(Y).map(O=>T(O,r,!1));m.unshift(h);let S=m.sort((O,k)=>{if(O.relevance!==k.relevance)return k.relevance-O.relevance;if(O.language&&k.language){if(A(O.language).supersetOf===k.language)return 1;if(A(k.language).supersetOf===O.language)return-1}return 0}),[N,$]=S,oe=N;return oe.secondBest=$,oe}function P(r,f,h){let m=f&&n[f]||h;r.classList.add("hljs"),r.classList.add(`language-${m}`)}function D(r){let f=null,h=b(r);if(l(h))return;if(L("before:highlightElement",{el:r,language:h}),r.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",r);return}if(r.children.length>0&&(i.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(r)),i.throwUnescapedHTML))throw new Se("One of your code blocks includes unescaped HTML.",r.innerHTML);f=r;let m=f.textContent,S=h?_(m,{language:h,ignoreIllegals:!0}):R(m);r.innerHTML=S.value,r.dataset.highlighted="yes",P(r,h,S.language),r.result={language:S.language,re:S.relevance,relevance:S.relevance},S.secondBest&&(r.secondBest={language:S.secondBest.language,relevance:S.secondBest.relevance}),L("after:highlightElement",{el:r,result:S,text:m})}function W(r){i=Ge(i,r)}let F=()=>{I(),Z("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function ie(){I(),Z("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let U=!1;function I(){if(document.readyState==="loading"){U=!0;return}document.querySelectorAll(i.cssSelector).forEach(D)}function Q(){U&&I()}typeof window!="undefined"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",Q,!1);function re(r,f){let h=null;try{h=f(e)}catch(m){if(K("Language definition for '{}' could not be registered.".replace("{}",r)),u)K(m);else throw m;h=s}h.name||(h.name=r),t[r]=h,h.rawDefinition=f.bind(null,e),h.aliases&&V(h.aliases,{languageName:r})}function q(r){delete t[r];for(let f of Object.keys(n))n[f]===r&&delete n[f]}function se(){return Object.keys(t)}function A(r){return r=(r||"").toLowerCase(),t[r]||t[n[r]]}function V(r,{languageName:f}){typeof r=="string"&&(r=[r]),r.forEach(h=>{n[h.toLowerCase()]=f})}function Y(r){let f=A(r);return f&&!f.disableAutodetect}function pe(r){r["before:highlightBlock"]&&!r["before:highlightElement"]&&(r["before:highlightElement"]=f=>{r["before:highlightBlock"](Object.assign({block:f.el},f))}),r["after:highlightBlock"]&&!r["after:highlightElement"]&&(r["after:highlightElement"]=f=>{r["after:highlightBlock"](Object.assign({block:f.el},f))})}function C(r){pe(r),o.push(r)}function M(r){let f=o.indexOf(r);f!==-1&&o.splice(f,1)}function L(r,f){let h=r;o.forEach(function(m){m[h]&&m[h](f)})}function gt(r){return Z("10.7.0","highlightBlock will be removed entirely in v12.0"),Z("10.7.0","Please use highlightElement now."),D(r)}Object.assign(e,{highlight:_,highlightAuto:R,highlightAll:I,highlightElement:D,highlightBlock:gt,configure:W,initHighlighting:F,initHighlightingOnLoad:ie,registerLanguage:re,unregisterLanguage:q,listLanguages:se,getLanguage:A,registerAliases:V,autoDetection:Y,inherit:Ge,addPlugin:C,removePlugin:M}),e.debugMode=function(){u=!1},e.safeMode=function(){u=!0},e.versionString=pn,e.regex={concat:j,lookahead:je,either:xe,optional:Rt,anyNumberOfTimes:Nt};for(let r in le)typeof le[r]=="object"&&ze(le[r]);return Object.assign(e,le),e},X=et({});X.newInstance=()=>et({});tt.exports=X;X.HighlightJS=X;X.default=X});var ot=ke((Cn,Te)=>{var Oe=class{constructor(t={}){self.hook=t.hook,self.callback=t.callback,self.lang=t.lang||document.documentElement.lang||"en"}"after:highlightElement"({el:t,text:n}){var u;let o=Object.assign(document.createElement("button"),{innerHTML:((u=de[lang])==null?void 0:u[0])||"Copy",className:"hljs-copy-button"});o.dataset.copied=!1,t.parentElement.classList.add("hljs-copy-wrapper"),t.parentElement.appendChild(o),t.parentElement.style.setProperty("--hljs-theme-background",window.getComputedStyle(t).backgroundColor),o.onclick=function(){if(!navigator.clipboard)return;let g=n;hook&&typeof hook=="function"&&(g=hook(n,t)||n),navigator.clipboard.writeText(g).then(function(){var i,l;o.innerHTML=((i=de[lang])==null?void 0:i[1])||"Copied!",o.dataset.copied=!0;let s=Object.assign(document.createElement("div"),{role:"status",className:"hljs-copy-alert",innerHTML:((l=de[lang])==null?void 0:l[2])||"Copied to clipboard"});t.parentElement.appendChild(s),setTimeout(()=>{var b;o.innerHTML=((b=de[lang])==null?void 0:b[0])||"Copy",o.dataset.copied=!1,t.parentElement.removeChild(s),s=null},2e3)}).then(function(){if(typeof callback=="function")return callback(g,t)})}}};typeof Te!="undefined"&&(Te.exports=Oe);var de={en:["Copy","Copied!","Copied to clipboard"],es:["Copiar","\xA1Copiado!","Copiado al portapapeles"],fr:["Copier","Copi\xE9 !","Copi\xE9 dans le presse-papier"],de:["Kopieren","Kopiert!","In die Zwischenablage kopiert"],ja:["\u30B3\u30D4\u30FC","\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F\uFF01","\u30AF\u30EA\u30C3\u30D7\u30DC\u30FC\u30C9\u306B\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F"],ko:["\uBCF5\uC0AC","\uBCF5\uC0AC\uB428!","\uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uBCF5\uC0AC\uB428"],ru:["\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C","\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E!","\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u0432 \u0431\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430"],zh:["\u590D\u5236","\u5DF2\u590D\u5236!","\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F"],"zh-tw":["\u8907\u88FD","\u5DF2\u8907\u88FD!","\u5DF2\u8907\u88FD\u5230\u526A\u8CBC\u7C3F"]}});var De=()=>{document.querySelectorAll(".limited-text-80").forEach(t=>{let n=t.innerHTML;if(n.length>80){let o=n.substring(0,80)+"...";t.innerHTML=o}})};var Be=()=>{let e=document.getElementById("email-form-3");e.addEventListener("submit",function(t){t.preventDefault();let n=typeof bentoVisitorId!="undefined"?"&bento_uuid="+bentoVisitorId():"";return window.location.href="https://dashboard.anyip.io/account${visitorId}#/register?email="+e.querySelector("#Blog-Email").value,!1},!0)};var it=ve(nt(),1);var ne=it.default;function rt(e){let t=e.regex,n={},o={begin:/\$\{/,end:/\}/,contains:["self",{begin:/:-/,contains:[n]}]};Object.assign(n,{className:"variable",variants:[{begin:t.concat(/\$[\w\d#@][\w\d_]*/,"(?![\\w\\d])(?![$])")},o]});let u={className:"subst",begin:/\$\(/,end:/\)/,contains:[e.BACKSLASH_ESCAPE]},g={begin:/<<-?\s*(?=\w+)/,starts:{contains:[e.END_SAME_AS_BEGIN({begin:/(\w+)/,end:/(\w+)/,className:"string"})]}},s={className:"string",begin:/"/,end:/"/,contains:[e.BACKSLASH_ESCAPE,n,u]};u.contains.push(s);let i={match:/\\"/},l={className:"string",begin:/'/,end:/'/},b={match:/\\'/},_={begin:/\$?\(\(/,end:/\)\)/,contains:[{begin:/\d+#[0-9a-f]+/,className:"number"},e.NUMBER_MODE,n]},T=["fish","bash","zsh","sh","csh","ksh","tcsh","dash","scsh"],H=e.SHEBANG({binary:`(${T.join("|")})`,relevance:10}),R={className:"function",begin:/\w[\w\d_]*\s*\(\s*\)\s*\{/,returnBegin:!0,contains:[e.inherit(e.TITLE_MODE,{begin:/\w[\w\d_]*/})],relevance:0},P=["if","then","else","elif","fi","for","while","until","in","do","done","case","esac","function","select"],D=["true","false"],W={match:/(\/[a-z._-]+)+/},F=["break","cd","continue","eval","exec","exit","export","getopts","hash","pwd","readonly","return","shift","test","times","trap","umask","unset"],ie=["alias","bind","builtin","caller","command","declare","echo","enable","help","let","local","logout","mapfile","printf","read","readarray","source","type","typeset","ulimit","unalias"],U=["autoload","bg","bindkey","bye","cap","chdir","clone","comparguments","compcall","compctl","compdescribe","compfiles","compgroups","compquote","comptags","comptry","compvalues","dirs","disable","disown","echotc","echoti","emulate","fc","fg","float","functions","getcap","getln","history","integer","jobs","kill","limit","log","noglob","popd","print","pushd","pushln","rehash","sched","setcap","setopt","stat","suspend","ttyctl","unfunction","unhash","unlimit","unsetopt","vared","wait","whence","where","which","zcompile","zformat","zftp","zle","zmodload","zparseopts","zprof","zpty","zregexparse","zsocket","zstyle","ztcp"],I=["chcon","chgrp","chown","chmod","cp","dd","df","dir","dircolors","ln","ls","mkdir","mkfifo","mknod","mktemp","mv","realpath","rm","rmdir","shred","sync","touch","truncate","vdir","b2sum","base32","base64","cat","cksum","comm","csplit","cut","expand","fmt","fold","head","join","md5sum","nl","numfmt","od","paste","ptx","pr","sha1sum","sha224sum","sha256sum","sha384sum","sha512sum","shuf","sort","split","sum","tac","tail","tr","tsort","unexpand","uniq","wc","arch","basename","chroot","date","dirname","du","echo","env","expr","factor","groups","hostid","id","link","logname","nice","nohup","nproc","pathchk","pinky","printenv","printf","pwd","readlink","runcon","seq","sleep","stat","stdbuf","stty","tee","test","timeout","tty","uname","unlink","uptime","users","who","whoami","yes"];return{name:"Bash",aliases:["sh"],keywords:{$pattern:/\b[a-z][a-z0-9._-]+\b/,keyword:P,literal:D,built_in:[...F,...ie,"set","shopt",...U,...I]},contains:[H,e.SHEBANG(),R,_,e.HASH_COMMENT_MODE,g,W,s,i,l,b,n]}}function st(e){let t=e.regex,n=/(?![A-Za-z0-9])(?![$])/,o=t.concat(/[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/,n),u=t.concat(/(\\?[A-Z][a-z0-9_\x7f-\xff]+|\\?[A-Z]+(?=[A-Z][a-z0-9_\x7f-\xff])){1,}/,n),g={scope:"variable",match:"\\$+"+o},s={scope:"meta",variants:[{begin:/<\?php/,relevance:10},{begin:/<\?=/},{begin:/<\?/,relevance:.1},{begin:/\?>/}]},i={scope:"subst",variants:[{begin:/\$\w+/},{begin:/\{\$/,end:/\}/}]},l=e.inherit(e.APOS_STRING_MODE,{illegal:null}),b=e.inherit(e.QUOTE_STRING_MODE,{illegal:null,contains:e.QUOTE_STRING_MODE.contains.concat(i)}),_={begin:/<<<[ \t]*(?:(\w+)|"(\w+)")\n/,end:/[ \t]*(\w+)\b/,contains:e.QUOTE_STRING_MODE.contains.concat(i),"on:begin":(C,M)=>{M.data._beginMatch=C[1]||C[2]},"on:end":(C,M)=>{M.data._beginMatch!==C[1]&&M.ignoreMatch()}},T=e.END_SAME_AS_BEGIN({begin:/<<<[ \t]*'(\w+)'\n/,end:/[ \t]*(\w+)\b/}),H=`[ 	
]`,R={scope:"string",variants:[b,l,_,T]},P={scope:"number",variants:[{begin:"\\b0[bB][01]+(?:_[01]+)*\\b"},{begin:"\\b0[oO][0-7]+(?:_[0-7]+)*\\b"},{begin:"\\b0[xX][\\da-fA-F]+(?:_[\\da-fA-F]+)*\\b"},{begin:"(?:\\b\\d+(?:_\\d+)*(\\.(?:\\d+(?:_\\d+)*))?|\\B\\.\\d+)(?:[eE][+-]?\\d+)?"}],relevance:0},D=["false","null","true"],W=["__CLASS__","__DIR__","__FILE__","__FUNCTION__","__COMPILER_HALT_OFFSET__","__LINE__","__METHOD__","__NAMESPACE__","__TRAIT__","die","echo","exit","include","include_once","print","require","require_once","array","abstract","and","as","binary","bool","boolean","break","callable","case","catch","class","clone","const","continue","declare","default","do","double","else","elseif","empty","enddeclare","endfor","endforeach","endif","endswitch","endwhile","enum","eval","extends","final","finally","float","for","foreach","from","global","goto","if","implements","instanceof","insteadof","int","integer","interface","isset","iterable","list","match|0","mixed","new","never","object","or","private","protected","public","readonly","real","return","string","switch","throw","trait","try","unset","use","var","void","while","xor","yield"],F=["Error|0","AppendIterator","ArgumentCountError","ArithmeticError","ArrayIterator","ArrayObject","AssertionError","BadFunctionCallException","BadMethodCallException","CachingIterator","CallbackFilterIterator","CompileError","Countable","DirectoryIterator","DivisionByZeroError","DomainException","EmptyIterator","ErrorException","Exception","FilesystemIterator","FilterIterator","GlobIterator","InfiniteIterator","InvalidArgumentException","IteratorIterator","LengthException","LimitIterator","LogicException","MultipleIterator","NoRewindIterator","OutOfBoundsException","OutOfRangeException","OuterIterator","OverflowException","ParentIterator","ParseError","RangeException","RecursiveArrayIterator","RecursiveCachingIterator","RecursiveCallbackFilterIterator","RecursiveDirectoryIterator","RecursiveFilterIterator","RecursiveIterator","RecursiveIteratorIterator","RecursiveRegexIterator","RecursiveTreeIterator","RegexIterator","RuntimeException","SeekableIterator","SplDoublyLinkedList","SplFileInfo","SplFileObject","SplFixedArray","SplHeap","SplMaxHeap","SplMinHeap","SplObjectStorage","SplObserver","SplPriorityQueue","SplQueue","SplStack","SplSubject","SplTempFileObject","TypeError","UnderflowException","UnexpectedValueException","UnhandledMatchError","ArrayAccess","BackedEnum","Closure","Fiber","Generator","Iterator","IteratorAggregate","Serializable","Stringable","Throwable","Traversable","UnitEnum","WeakReference","WeakMap","Directory","__PHP_Incomplete_Class","parent","php_user_filter","self","static","stdClass"],U={keyword:W,literal:(C=>{let M=[];return C.forEach(L=>{M.push(L),L.toLowerCase()===L?M.push(L.toUpperCase()):M.push(L.toLowerCase())}),M})(D),built_in:F},I=C=>C.map(M=>M.replace(/\|\d+$/,"")),Q={variants:[{match:[/new/,t.concat(H,"+"),t.concat("(?!",I(F).join("\\b|"),"\\b)"),u],scope:{1:"keyword",4:"title.class"}}]},re=t.concat(o,"\\b(?!\\()"),q={variants:[{match:[t.concat(/::/,t.lookahead(/(?!class\b)/)),re],scope:{2:"variable.constant"}},{match:[/::/,/class/],scope:{2:"variable.language"}},{match:[u,t.concat(/::/,t.lookahead(/(?!class\b)/)),re],scope:{1:"title.class",3:"variable.constant"}},{match:[u,t.concat("::",t.lookahead(/(?!class\b)/))],scope:{1:"title.class"}},{match:[u,/::/,/class/],scope:{1:"title.class",3:"variable.language"}}]},se={scope:"attr",match:t.concat(o,t.lookahead(":"),t.lookahead(/(?!::)/))},A={relevance:0,begin:/\(/,end:/\)/,keywords:U,contains:[se,g,q,e.C_BLOCK_COMMENT_MODE,R,P,Q]},V={relevance:0,match:[/\b/,t.concat("(?!fn\\b|function\\b|",I(W).join("\\b|"),"|",I(F).join("\\b|"),"\\b)"),o,t.concat(H,"*"),t.lookahead(/(?=\()/)],scope:{3:"title.function.invoke"},contains:[A]};A.contains.push(V);let Y=[se,q,e.C_BLOCK_COMMENT_MODE,R,P,Q],pe={begin:t.concat(/#\[\s*/,u),beginScope:"meta",end:/]/,endScope:"meta",keywords:{literal:D,keyword:["new","array"]},contains:[{begin:/\[/,end:/]/,keywords:{literal:D,keyword:["new","array"]},contains:["self",...Y]},...Y,{scope:"meta",match:u}]};return{case_insensitive:!1,keywords:U,contains:[pe,e.HASH_COMMENT_MODE,e.COMMENT("//","$"),e.COMMENT("/\\*","\\*/",{contains:[{scope:"doctag",match:"@[A-Za-z]+"}]}),{match:/__halt_compiler\(\);/,keywords:"__halt_compiler",starts:{scope:"comment",end:e.MATCH_NOTHING_RE,contains:[{match:/\?>/,scope:"meta",endsParent:!0}]}},s,{scope:"variable.language",match:/\$this\b/},g,V,q,{match:[/const/,/\s/,o],scope:{1:"keyword",3:"variable.constant"}},Q,{scope:"function",relevance:0,beginKeywords:"fn function",end:/[;{]/,excludeEnd:!0,illegal:"[$%\\[]",contains:[{beginKeywords:"use"},e.UNDERSCORE_TITLE_MODE,{begin:"=>",endsParent:!0},{scope:"params",begin:"\\(",end:"\\)",excludeBegin:!0,excludeEnd:!0,keywords:U,contains:["self",g,q,e.C_BLOCK_COMMENT_MODE,R,P]}]},{scope:"class",variants:[{beginKeywords:"enum",illegal:/[($"]/},{beginKeywords:"class interface trait",illegal:/[:($"]/}],relevance:0,end:/\{/,excludeEnd:!0,contains:[{beginKeywords:"extends implements"},e.UNDERSCORE_TITLE_MODE]},{beginKeywords:"namespace",relevance:0,end:";",illegal:/[.']/,contains:[e.inherit(e.UNDERSCORE_TITLE_MODE,{scope:"title.class"})]},{beginKeywords:"use",relevance:0,end:";",contains:[{match:/\b(as|const|function)\b/,scope:"keyword"},e.UNDERSCORE_TITLE_MODE]},R,P]}}var ct=ve(ot(),1),at=()=>{ne.addPlugin(new ct.default),ne.registerLanguage("bash",rt),ne.registerLanguage("php",st),ne.highlightAll()};var lt=()=>{let e=document.querySelector(".read-content");if(!e)return;let n=(e.textContent||"").replace(/[^\w ]/g,"").split(/\s+/).length,u=Math.floor(n/228)+1+" min",g=document.querySelector(".read-time");g&&(g.innerHTML=u)};var ut=()=>{document.addEventListener("DOMContentLoaded",()=>{let e=document.querySelectorAll("#content h2"),t=null;if(e.forEach(g=>{g.textContent&&g.textContent.trim()==="FAQs"&&(t=g)}),t===null)return;t=t;let n=t.nextElementSibling,o={"@type":"FAQPage",mainEntity:[]};for(;n;){if(n.tagName==="H3"){let g=n.textContent?n.textContent.trim():"",s="",i=n.nextElementSibling;for(;i&&i.tagName!=="H3";)s+=i.textContent?i.textContent.trim()+" ":"",i=i.nextElementSibling;o.mainEntity.push({"@type":"Question",name:g,acceptedAnswer:{"@type":"Answer",text:s.trim()}})}n=n.nextElementSibling}let u=document.querySelector('script[type="application/ld+json"]');if(u&&u.textContent){let g=JSON.parse(u.textContent);g["@graph"].push(o),u.textContent=JSON.stringify(g)}})};var ft=()=>{var n;let e=new IntersectionObserver(o=>{o.forEach(u=>{let g=u.target.getAttribute("id");if(u.isIntersecting){document.querySelectorAll(".active").forEach(i=>{i.classList.remove("active")});let s=document.querySelector(`a[href="#${g}"]`);s&&s.classList.add("active")}})},{rootMargin:"0px 0px -75% 0px"});function t(o){return new DOMParser().parseFromString(o,"text/html").body.textContent||""}(n=document.getElementById("content"))==null||n.querySelectorAll("h2,h3").forEach(o=>{var _;e.observe(o);let u=t(o.innerHTML),g=u.replace(/\s+/g,"-").replace(/[°&\/\\#,+()$~%.'":;*?<>{}]/g,"").toLowerCase();o.setAttribute("id",g);let s=document.createElement("a"),i=u,l=120,b=i.length>l?i.slice(0,l-1)+"\u2026":i;s.innerHTML=b,"h2,h3".split(/[, ]+/).forEach(T=>{o.tagName.toLowerCase()===T&&s.classList.add("toc-item","toc-"+T)}),s.setAttribute("href","#"+g),(_=document.querySelector("#toc"))==null||_.appendChild(s)})};window.Webflow||(window.Webflow=[]);window.Webflow.push(()=>{De(),Be(),at(),ft(),lt(),ut()});})();