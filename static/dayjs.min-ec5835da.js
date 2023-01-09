import{a0 as e,a5 as t,a9 as r,m as a,T as n,aa as s,R as i,X as l,a4 as o,a8 as u,aB as c,ab as f}from"./index-d685dfc2.js";import{t as h}from"./error-c58402b8.js";import{w as d,P as v,ar as m,i as p,a8 as y,aN as g,aj as $,j as w,b1 as b,b3 as S,m as M,a3 as _,aR as D,a5 as x,l as O,t as z,F as T,aY as k,a2 as H,al as L,ap as E,ac as Y,ai as j,au as C,ax as W,k as N,b8 as A}from"./runtime-core.esm-bundler-42d2bde8.js";var B="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function R(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function P(e){if(e.__esModule)return e;var t=e.default;if("function"==typeof t){var r=function e(){if(this instanceof e){var r=[null];r.push.apply(r,arguments);var a=Function.bind.apply(t,r);return new a}return t.apply(this,arguments)};r.prototype=t.prototype}else r={};return Object.defineProperty(r,"__esModule",{value:!0}),Object.keys(e).forEach((function(t){var a=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(r,t,a.get?a:{enumerable:!0,get:function(){return e[t]}})})),r}const I=Symbol("scrollbarContextKey"),F={vertical:{offset:"offsetHeight",scroll:"scrollTop",scrollSize:"scrollHeight",size:"height",key:"vertical",axis:"Y",client:"clientY",direction:"top"},horizontal:{offset:"offsetWidth",scroll:"scrollLeft",scrollSize:"scrollWidth",size:"width",key:"horizontal",axis:"X",client:"clientX",direction:"left"}},X=e({vertical:Boolean,size:String,move:Number,ratio:{type:Number,required:!0},always:Boolean});var U=s(d({__name:"thumb",props:X,setup(e){const s=e,l=v(I),o=t("scrollbar");l||h("Thumb","can not inject scrollbar context");const u=m(),c=m(),f=m({}),d=m(!1);let O=!1,z=!1,T=i?document.onselectstart:null;const k=p((()=>F[s.vertical?"vertical":"horizontal"])),H=p((()=>(({move:e,size:t,bar:r})=>({[r.size]:t,transform:`translate${r.axis}(${e}%)`}))({size:s.size,move:s.move,bar:k.value}))),L=p((()=>u.value[k.value.offset]**2/l.wrapElement[k.value.scrollSize]/s.ratio/c.value[k.value.offset])),E=e=>{var t;if(e.stopPropagation(),e.ctrlKey||[1,2].includes(e.button))return;null==(t=window.getSelection())||t.removeAllRanges(),j(e);const r=e.currentTarget;r&&(f.value[k.value.axis]=r[k.value.offset]-(e[k.value.client]-r.getBoundingClientRect()[k.value.direction]))},Y=e=>{if(!c.value||!u.value||!l.wrapElement)return;const t=100*(Math.abs(e.target.getBoundingClientRect()[k.value.direction]-e[k.value.client])-c.value[k.value.offset]/2)*L.value/u.value[k.value.offset];l.wrapElement[k.value.scroll]=t*l.wrapElement[k.value.scrollSize]/100},j=e=>{e.stopImmediatePropagation(),O=!0,document.addEventListener("mousemove",C),document.addEventListener("mouseup",W),T=document.onselectstart,document.onselectstart=()=>!1},C=e=>{if(!u.value||!c.value)return;if(!1===O)return;const t=f.value[k.value.axis];if(!t)return;const r=100*(-1*(u.value.getBoundingClientRect()[k.value.direction]-e[k.value.client])-(c.value[k.value.offset]-t))*L.value/u.value[k.value.offset];l.wrapElement[k.value.scroll]=r*l.wrapElement[k.value.scrollSize]/100},W=()=>{O=!1,f.value[k.value.axis]=0,document.removeEventListener("mousemove",C),document.removeEventListener("mouseup",W),N(),z&&(d.value=!1)};y((()=>{N(),document.removeEventListener("mouseup",W)}));const N=()=>{document.onselectstart!==T&&(document.onselectstart=T)};return r(g(l,"scrollbarElement"),"mousemove",(()=>{z=!1,d.value=!!s.size})),r(g(l,"scrollbarElement"),"mouseleave",(()=>{z=!0,d.value=O})),(e,t)=>($(),w(n,{name:D(o).b("fade"),persisted:""},{default:b((()=>[S(M("div",{ref_key:"instance",ref:u,class:_([D(o).e("bar"),D(o).is(D(k).key)]),onMousedown:Y},[M("div",{ref_key:"thumb",ref:c,class:_(D(o).e("thumb")),style:x(D(H)),onMousedown:E},null,38)],34),[[a,e.always||d.value]])])),_:1},8,["name"]))}}),[["__file","/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/thumb.vue"]]);var J=s(d({__name:"bar",props:e({always:{type:Boolean,default:!0},width:String,height:String,ratioX:{type:Number,default:1},ratioY:{type:Number,default:1}}),setup(e,{expose:t}){const r=e,a=m(0),n=m(0);return t({handleScroll:e=>{if(e){const t=e.offsetHeight-4,s=e.offsetWidth-4;n.value=100*e.scrollTop/t*r.ratioY,a.value=100*e.scrollLeft/s*r.ratioX}}}),(e,t)=>($(),O(T,null,[z(U,{move:a.value,ratio:e.ratioX,size:e.width,always:e.always},null,8,["move","ratio","size","always"]),z(U,{move:n.value,ratio:e.ratioY,size:e.height,vertical:"",always:e.always},null,8,["move","ratio","size","always"])],64))}}),[["__file","/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/bar.vue"]]);const Z=e({height:{type:[String,Number],default:""},maxHeight:{type:[String,Number],default:""},native:{type:Boolean,default:!1},wrapStyle:{type:l([String,Object,Array]),default:""},wrapClass:{type:[String,Array],default:""},viewClass:{type:[String,Array],default:""},viewStyle:{type:[String,Array,Object],default:""},noresize:Boolean,tag:{type:String,default:"div"},always:Boolean,minSize:{type:Number,default:20}}),V={scroll:({scrollTop:e,scrollLeft:t})=>[e,t].every(o)},q=d({name:"ElScrollbar"});const K=f(s(d({...q,props:Z,emits:V,setup(e,{expose:a,emit:n}){const s=e,i=t("scrollbar");let l,f;const h=m(),d=m(),v=m(),y=m("0"),g=m("0"),S=m(),z=m(1),T=m(1),B=p((()=>{const e={};return s.height&&(e.height=u(s.height)),s.maxHeight&&(e.maxHeight=u(s.maxHeight)),[s.wrapStyle,e]})),R=p((()=>[s.wrapClass,i.e("wrap"),{[i.em("wrap","hidden-default")]:!s.native}])),P=p((()=>[i.e("view"),s.viewClass])),F=()=>{var e;d.value&&(null==(e=S.value)||e.handleScroll(d.value),n("scroll",{scrollTop:d.value.scrollTop,scrollLeft:d.value.scrollLeft}))};const X=()=>{if(!d.value)return;const e=d.value.offsetHeight-4,t=d.value.offsetWidth-4,r=e**2/d.value.scrollHeight,a=t**2/d.value.scrollWidth,n=Math.max(r,s.minSize),i=Math.max(a,s.minSize);z.value=r/(e-r)/(n/(e-n)),T.value=a/(t-a)/(i/(t-i)),g.value=n+4<e?`${n}px`:"",y.value=i+4<t?`${i}px`:""};return k((()=>s.noresize),(e=>{e?(null==l||l(),null==f||f()):(({stop:l}=c(v,X)),f=r("resize",X))}),{immediate:!0}),k((()=>[s.maxHeight,s.height]),(()=>{s.native||H((()=>{var e;X(),d.value&&(null==(e=S.value)||e.handleScroll(d.value))}))})),L(I,E({scrollbarElement:h,wrapElement:d})),Y((()=>{s.native||H((()=>{X()}))})),j((()=>X())),a({wrapRef:d,update:X,scrollTo:function(e,t){A(e)?d.value.scrollTo(e):o(e)&&o(t)&&d.value.scrollTo(e,t)},setScrollTop:e=>{o(e)&&(d.value.scrollTop=e)},setScrollLeft:e=>{o(e)&&(d.value.scrollLeft=e)},handleScroll:F}),(e,t)=>($(),O("div",{ref_key:"scrollbarRef",ref:h,class:_(D(i).b())},[M("div",{ref_key:"wrapRef",ref:d,class:_(D(R)),style:x(D(B)),onScroll:F},[($(),w(W(e.tag),{ref_key:"resizeRef",ref:v,class:_(D(P)),style:x(e.viewStyle)},{default:b((()=>[C(e.$slots,"default")])),_:3},8,["class","style"]))],38),e.native?N("v-if",!0):($(),w(J,{key:0,ref_key:"barRef",ref:S,height:g.value,width:y.value,always:e.always,"ratio-x":T.value,"ratio-y":z.value},null,8,["height","width","always","ratio-x","ratio-y"]))],2))}}),[["__file","/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/scrollbar.vue"]]));var Q={};({get exports(){return Q},set exports(e){Q=e}}).exports=function(){var e=1e3,t=6e4,r=36e5,a="millisecond",n="second",s="minute",i="hour",l="day",o="week",u="month",c="quarter",f="year",h="date",d="Invalid Date",v=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,m=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,p={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],r=e%100;return"["+e+(t[(r-20)%10]||t[r]||t[0])+"]"}},y=function(e,t,r){var a=String(e);return!a||a.length>=t?e:""+Array(t+1-a.length).join(r)+e},g={s:y,z:function(e){var t=-e.utcOffset(),r=Math.abs(t),a=Math.floor(r/60),n=r%60;return(t<=0?"+":"-")+y(a,2,"0")+":"+y(n,2,"0")},m:function e(t,r){if(t.date()<r.date())return-e(r,t);var a=12*(r.year()-t.year())+(r.month()-t.month()),n=t.clone().add(a,u),s=r-n<0,i=t.clone().add(a+(s?-1:1),u);return+(-(a+(r-n)/(s?n-i:i-n))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:u,y:f,w:o,d:l,D:h,h:i,m:s,s:n,ms:a,Q:c}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},$="en",w={};w[$]=p;var b=function(e){return e instanceof D},S=function e(t,r,a){var n;if(!t)return $;if("string"==typeof t){var s=t.toLowerCase();w[s]&&(n=s),r&&(w[s]=r,n=s);var i=t.split("-");if(!n&&i.length>1)return e(i[0])}else{var l=t.name;w[l]=t,n=l}return!a&&n&&($=n),n||!a&&$},M=function(e,t){if(b(e))return e.clone();var r="object"==typeof t?t:{};return r.date=e,r.args=arguments,new D(r)},_=g;_.l=S,_.i=b,_.w=function(e,t){return M(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var D=function(){function p(e){this.$L=S(e.locale,null,!0),this.parse(e)}var y=p.prototype;return y.parse=function(e){this.$d=function(e){var t=e.date,r=e.utc;if(null===t)return new Date(NaN);if(_.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var a=t.match(v);if(a){var n=a[2]-1||0,s=(a[7]||"0").substring(0,3);return r?new Date(Date.UTC(a[1],n,a[3]||1,a[4]||0,a[5]||0,a[6]||0,s)):new Date(a[1],n,a[3]||1,a[4]||0,a[5]||0,a[6]||0,s)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},y.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},y.$utils=function(){return _},y.isValid=function(){return!(this.$d.toString()===d)},y.isSame=function(e,t){var r=M(e);return this.startOf(t)<=r&&r<=this.endOf(t)},y.isAfter=function(e,t){return M(e)<this.startOf(t)},y.isBefore=function(e,t){return this.endOf(t)<M(e)},y.$g=function(e,t,r){return _.u(e)?this[t]:this.set(r,e)},y.unix=function(){return Math.floor(this.valueOf()/1e3)},y.valueOf=function(){return this.$d.getTime()},y.startOf=function(e,t){var r=this,a=!!_.u(t)||t,c=_.p(e),d=function(e,t){var n=_.w(r.$u?Date.UTC(r.$y,t,e):new Date(r.$y,t,e),r);return a?n:n.endOf(l)},v=function(e,t){return _.w(r.toDate()[e].apply(r.toDate("s"),(a?[0,0,0,0]:[23,59,59,999]).slice(t)),r)},m=this.$W,p=this.$M,y=this.$D,g="set"+(this.$u?"UTC":"");switch(c){case f:return a?d(1,0):d(31,11);case u:return a?d(1,p):d(0,p+1);case o:var $=this.$locale().weekStart||0,w=(m<$?m+7:m)-$;return d(a?y-w:y+(6-w),p);case l:case h:return v(g+"Hours",0);case i:return v(g+"Minutes",1);case s:return v(g+"Seconds",2);case n:return v(g+"Milliseconds",3);default:return this.clone()}},y.endOf=function(e){return this.startOf(e,!1)},y.$set=function(e,t){var r,o=_.p(e),c="set"+(this.$u?"UTC":""),d=(r={},r[l]=c+"Date",r[h]=c+"Date",r[u]=c+"Month",r[f]=c+"FullYear",r[i]=c+"Hours",r[s]=c+"Minutes",r[n]=c+"Seconds",r[a]=c+"Milliseconds",r)[o],v=o===l?this.$D+(t-this.$W):t;if(o===u||o===f){var m=this.clone().set(h,1);m.$d[d](v),m.init(),this.$d=m.set(h,Math.min(this.$D,m.daysInMonth())).$d}else d&&this.$d[d](v);return this.init(),this},y.set=function(e,t){return this.clone().$set(e,t)},y.get=function(e){return this[_.p(e)]()},y.add=function(a,c){var h,d=this;a=Number(a);var v=_.p(c),m=function(e){var t=M(d);return _.w(t.date(t.date()+Math.round(e*a)),d)};if(v===u)return this.set(u,this.$M+a);if(v===f)return this.set(f,this.$y+a);if(v===l)return m(1);if(v===o)return m(7);var p=(h={},h[s]=t,h[i]=r,h[n]=e,h)[v]||1,y=this.$d.getTime()+a*p;return _.w(y,this)},y.subtract=function(e,t){return this.add(-1*e,t)},y.format=function(e){var t=this,r=this.$locale();if(!this.isValid())return r.invalidDate||d;var a=e||"YYYY-MM-DDTHH:mm:ssZ",n=_.z(this),s=this.$H,i=this.$m,l=this.$M,o=r.weekdays,u=r.months,c=function(e,r,n,s){return e&&(e[r]||e(t,a))||n[r].slice(0,s)},f=function(e){return _.s(s%12||12,e,"0")},h=r.meridiem||function(e,t,r){var a=e<12?"AM":"PM";return r?a.toLowerCase():a},v={YY:String(this.$y).slice(-2),YYYY:this.$y,M:l+1,MM:_.s(l+1,2,"0"),MMM:c(r.monthsShort,l,u,3),MMMM:c(u,l),D:this.$D,DD:_.s(this.$D,2,"0"),d:String(this.$W),dd:c(r.weekdaysMin,this.$W,o,2),ddd:c(r.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:_.s(s,2,"0"),h:f(1),hh:f(2),a:h(s,i,!0),A:h(s,i,!1),m:String(i),mm:_.s(i,2,"0"),s:String(this.$s),ss:_.s(this.$s,2,"0"),SSS:_.s(this.$ms,3,"0"),Z:n};return a.replace(m,(function(e,t){return t||v[e]||n.replace(":","")}))},y.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},y.diff=function(a,h,d){var v,m=_.p(h),p=M(a),y=(p.utcOffset()-this.utcOffset())*t,g=this-p,$=_.m(this,p);return $=(v={},v[f]=$/12,v[u]=$,v[c]=$/3,v[o]=(g-y)/6048e5,v[l]=(g-y)/864e5,v[i]=g/r,v[s]=g/t,v[n]=g/e,v)[m]||g,d?$:_.a($)},y.daysInMonth=function(){return this.endOf(u).$D},y.$locale=function(){return w[this.$L]},y.locale=function(e,t){if(!e)return this.$L;var r=this.clone(),a=S(e,t,!0);return a&&(r.$L=a),r},y.clone=function(){return _.w(this.$d,this)},y.toDate=function(){return new Date(this.valueOf())},y.toJSON=function(){return this.isValid()?this.toISOString():null},y.toISOString=function(){return this.$d.toISOString()},y.toString=function(){return this.$d.toUTCString()},p}(),x=D.prototype;return M.prototype=x,[["$ms",a],["$s",n],["$m",s],["$H",i],["$W",l],["$M",u],["$y",f],["$D",h]].forEach((function(e){x[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),M.extend=function(e,t){return e.$i||(e(t,D,M),e.$i=!0),M},M.locale=S,M.isDayjs=b,M.unix=function(e){return M(1e3*e)},M.en=w[$],M.Ls=w,M.p={},M}();const G=Q;export{F as B,K as E,P as a,Q as b,B as c,G as d,R as g};
