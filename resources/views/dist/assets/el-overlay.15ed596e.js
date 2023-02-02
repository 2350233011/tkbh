import{R as ee,$ as ue,ad as ie,bc as X,C as re,bd as de,A as j,be as ce,D as oe,W as J,x as K,Z as fe,V as me,bf as ve,X as pe,bg as U,av as q,aw as G,d as Z,f as R,a5 as g,Y as ye,aY as be,J as Ce,U as P,bh as Ee,v as H,o as I,e as V,g as _,n as T,u as o,t as ge,w as A,M as W,au as Te,b as Se,a7 as x,a6 as ke,aM as Me,K as te,bi as we,bj as Ae,ao as De,l as Le,b4 as F,q as D,bk as he,bl as Ie,B as Be,s as Oe,bm as Q,as as Ne,bn as Re,a4 as Ye,P as $e,a8 as _e,b1 as ze,bo as He,aS as Ue,aT as Ve,af as Xe}from"./index.bee93a5d.js";import{U as se}from"./event.776e7e11.js";import{a as Ke}from"./scroll.e2a800e5.js";var z=(e=>(e[e.TEXT=1]="TEXT",e[e.CLASS=2]="CLASS",e[e.STYLE=4]="STYLE",e[e.PROPS=8]="PROPS",e[e.FULL_PROPS=16]="FULL_PROPS",e[e.HYDRATE_EVENTS=32]="HYDRATE_EVENTS",e[e.STABLE_FRAGMENT=64]="STABLE_FRAGMENT",e[e.KEYED_FRAGMENT=128]="KEYED_FRAGMENT",e[e.UNKEYED_FRAGMENT=256]="UNKEYED_FRAGMENT",e[e.NEED_PATCH=512]="NEED_PATCH",e[e.DYNAMIC_SLOTS=1024]="DYNAMIC_SLOTS",e[e.HOISTED=-1]="HOISTED",e[e.BAIL=-2]="BAIL",e))(z||{});const ne=Symbol("dialogInjectionKey"),Ge=(e,t,r)=>{let a={offsetX:0,offsetY:0};const i=l=>{const d=l.clientX,v=l.clientY,{offsetX:m,offsetY:p}=a,s=e.value.getBoundingClientRect(),f=s.left,S=s.top,B=s.width,O=s.height,L=document.documentElement.clientWidth,N=document.documentElement.clientHeight,h=-f+m,k=-S+p,M=L-f-B+m,b=N-S-O+p,w=y=>{const C=Math.min(Math.max(m+y.clientX-d,h),M),Y=Math.min(Math.max(p+y.clientY-v,k),b);a={offsetX:C,offsetY:Y},e.value.style.transform=`translate(${X(C)}, ${X(Y)})`},n=()=>{document.removeEventListener("mousemove",w),document.removeEventListener("mouseup",n)};document.addEventListener("mousemove",w),document.addEventListener("mouseup",n)},c=()=>{t.value&&e.value&&t.value.addEventListener("mousedown",i)},u=()=>{t.value&&e.value&&t.value.removeEventListener("mousedown",i)};ee(()=>{ue(()=>{r.value?c():u()})}),ie(()=>{u()})},We=e=>{re(e)||de("[useLockscreen]","You need to pass a ref param to this function");const t=j("popup"),r=ce(()=>t.bm("parent","hidden"));if(!oe||J(document.body,r.value))return;let a=0,i=!1,c="0";const u=()=>{pe(document.body,r.value),i&&(document.body.style.width=c)};K(e,l=>{if(!l){u();return}i=!J(document.body,r.value),i&&(c=document.body.style.width),a=Ke(t.namespace.value);const d=document.documentElement.clientHeight<document.body.scrollHeight,v=fe(document.body,"overflowY");a>0&&(d||v==="scroll")&&i&&(document.body.style.width=`calc(100% - ${a}px)`),me(document.body,r.value)}),ve(()=>u())},le=e=>{if(!e)return{onClick:U,onMousedown:U,onMouseup:U};let t=!1,r=!1;return{onClick:u=>{t&&r&&e(u),t=r=!1},onMousedown:u=>{t=u.target===u.currentTarget},onMouseup:u=>{r=u.target===u.currentTarget}}},xe=q({mask:{type:Boolean,default:!0},customMaskEvent:{type:Boolean,default:!1},overlayClass:{type:G([String,Array,Object])},zIndex:{type:G([String,Number])}}),je={click:e=>e instanceof MouseEvent};var qe=Z({name:"ElOverlay",props:xe,emits:je,setup(e,{slots:t,emit:r}){const a=j("overlay"),i=d=>{r("click",d)},{onClick:c,onMousedown:u,onMouseup:l}=le(e.customMaskEvent?void 0:i);return()=>e.mask?R("div",{class:[a.b(),e.overlayClass],style:{zIndex:e.zIndex},onClick:c,onMousedown:u,onMouseup:l},[g(t,"default")],z.STYLE|z.CLASS|z.PROPS,["onClick","onMouseup","onMousedown"]):ye("div",{class:e.overlayClass,style:{zIndex:e.zIndex,position:"fixed",top:"0px",right:"0px",bottom:"0px",left:"0px"}},[g(t,"default")])}});const Ze=qe,ae=q({center:{type:Boolean,default:!1},closeIcon:{type:be,default:""},customClass:{type:String,default:""},draggable:{type:Boolean,default:!1},fullscreen:{type:Boolean,default:!1},showClose:{type:Boolean,default:!0},title:{type:String,default:""}}),Je={close:()=>!0},Pe=["aria-label"],Fe=["id"],Qe={name:"ElDialogContent"},eo=Z({...Qe,props:ae,emits:Je,setup(e){const t=e,{t:r}=Ce(),{Close:a}=we,{dialogRef:i,headerRef:c,bodyId:u,ns:l,style:d}=P(ne),{focusTrapRef:v}=P(Ee),m=Ae(v,i),p=H(()=>t.draggable);return Ge(i,c,p),(s,f)=>(I(),V("div",{ref:o(m),class:T([o(l).b(),o(l).is("fullscreen",s.fullscreen),o(l).is("draggable",o(p)),{[o(l).m("center")]:s.center},s.customClass]),style:ke(o(d)),tabindex:"-1",onClick:f[1]||(f[1]=Me(()=>{},["stop"]))},[_("header",{ref_key:"headerRef",ref:c,class:T(o(l).e("header"))},[g(s.$slots,"header",{},()=>[_("span",{role:"heading",class:T(o(l).e("title"))},ge(s.title),3)]),s.showClose?(I(),V("button",{key:0,"aria-label":o(r)("el.dialog.close"),class:T(o(l).e("headerbtn")),type:"button",onClick:f[0]||(f[0]=S=>s.$emit("close"))},[R(o(Se),{class:T(o(l).e("close"))},{default:A(()=>[(I(),W(Te(s.closeIcon||o(a))))]),_:1},8,["class"])],10,Pe)):x("v-if",!0)],2),_("div",{id:o(u),class:T(o(l).e("body"))},[g(s.$slots,"default")],10,Fe),s.$slots.footer?(I(),V("footer",{key:0,class:T(o(l).e("footer"))},[g(s.$slots,"footer")],2)):x("v-if",!0)],6))}});var oo=te(eo,[["__file","/home/runner/work/element-plus/element-plus/packages/components/dialog/src/dialog-content.vue"]]);const to=q({...ae,appendToBody:{type:Boolean,default:!1},beforeClose:{type:G(Function)},destroyOnClose:{type:Boolean,default:!1},closeOnClickModal:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0},lockScroll:{type:Boolean,default:!0},modal:{type:Boolean,default:!0},openDelay:{type:Number,default:0},closeDelay:{type:Number,default:0},top:{type:String},modelValue:{type:Boolean,default:!1},modalClass:String,width:{type:[String,Number]},zIndex:{type:Number},trapFocus:{type:Boolean,default:!1}}),so={open:()=>!0,opened:()=>!0,close:()=>!0,closed:()=>!0,[se]:e=>De(e),openAutoFocus:()=>!0,closeAutoFocus:()=>!0},no=(e,t)=>{const a=Oe().emit,{nextZIndex:i}=Le();let c="";const u=F(),l=F(),d=D(!1),v=D(!1),m=D(!1),p=D(e.zIndex||i());let s,f;const S=he("namespace",Ie),B=H(()=>{const E={},$=`--${S.value}-dialog`;return e.fullscreen||(e.top&&(E[`${$}-margin-top`]=e.top),e.width&&(E[`${$}-width`]=X(e.width))),E});function O(){a("opened")}function L(){a("closed"),a(se,!1),e.destroyOnClose&&(m.value=!1)}function N(){a("close")}function h(){f==null||f(),s==null||s(),e.openDelay&&e.openDelay>0?{stop:s}=Q(()=>w(),e.openDelay):w()}function k(){s==null||s(),f==null||f(),e.closeDelay&&e.closeDelay>0?{stop:f}=Q(()=>n(),e.closeDelay):n()}function M(){function E($){$||(v.value=!0,d.value=!1)}e.beforeClose?e.beforeClose(E):k()}function b(){e.closeOnClickModal&&M()}function w(){!oe||(d.value=!0)}function n(){d.value=!1}function y(){a("openAutoFocus")}function C(){a("closeAutoFocus")}e.lockScroll&&We(d);function Y(){e.closeOnPressEscape&&M()}return K(()=>e.modelValue,E=>{E?(v.value=!1,h(),m.value=!0,p.value=e.zIndex?p.value++:i(),Be(()=>{a("open"),t.value&&(t.value.scrollTop=0)})):d.value&&k()}),K(()=>e.fullscreen,E=>{!t.value||(E?(c=t.value.style.transform,t.value.style.transform=""):t.value.style.transform=c)}),ee(()=>{e.modelValue&&(d.value=!0,m.value=!0,h())}),{afterEnter:O,afterLeave:L,beforeLeave:N,handleClose:M,onModalClick:b,close:k,doClose:n,onOpenAutoFocus:y,onCloseAutoFocus:C,onCloseRequested:Y,titleId:u,bodyId:l,closed:v,style:B,rendered:m,visible:d,zIndex:p}},lo=["aria-label","aria-labelledby","aria-describedby"],ao={name:"ElDialog"},uo=Z({...ao,props:to,emits:so,setup(e,{expose:t}){const r=e,a=Ne();Re({scope:"el-dialog",from:"the title slot",replacement:"the header slot",version:"3.0.0",ref:"https://element-plus.org/en-US/component/dialog.html#slots"},H(()=>!!a.title));const i=j("dialog"),c=D(),u=D(),l=D(),{visible:d,titleId:v,bodyId:m,style:p,rendered:s,zIndex:f,afterEnter:S,afterLeave:B,beforeLeave:O,handleClose:L,onModalClick:N,onOpenAutoFocus:h,onCloseAutoFocus:k,onCloseRequested:M}=no(r,c);Ye(ne,{dialogRef:c,headerRef:u,bodyId:m,ns:i,rendered:s,style:p});const b=le(N),w=H(()=>r.draggable&&!r.fullscreen);return t({visible:d,dialogContentRef:l}),(n,y)=>(I(),W(Ve,{to:"body",disabled:!n.appendToBody},[R(Ue,{name:"dialog-fade",onAfterEnter:o(S),onAfterLeave:o(B),onBeforeLeave:o(O),persisted:""},{default:A(()=>[$e(R(o(Ze),{"custom-mask-event":"",mask:n.modal,"overlay-class":n.modalClass,"z-index":o(f)},{default:A(()=>[_("div",{role:"dialog","aria-modal":"true","aria-label":n.title||void 0,"aria-labelledby":n.title?void 0:o(v),"aria-describedby":o(m),class:T(`${o(i).namespace.value}-overlay-dialog`),onClick:y[0]||(y[0]=(...C)=>o(b).onClick&&o(b).onClick(...C)),onMousedown:y[1]||(y[1]=(...C)=>o(b).onMousedown&&o(b).onMousedown(...C)),onMouseup:y[2]||(y[2]=(...C)=>o(b).onMouseup&&o(b).onMouseup(...C))},[R(o(ze),{loop:"",trapped:o(d),"focus-start-el":"container",onFocusAfterTrapped:o(h),onFocusAfterReleased:o(k),onReleaseRequested:o(M)},{default:A(()=>[o(s)?(I(),W(oo,{key:0,ref_key:"dialogContentRef",ref:l,"custom-class":n.customClass,center:n.center,"close-icon":n.closeIcon,draggable:o(w),fullscreen:n.fullscreen,"show-close":n.showClose,title:n.title,onClose:o(L)},He({header:A(()=>[n.$slots.title?g(n.$slots,"title",{key:1}):g(n.$slots,"header",{key:0,close:o(L),titleId:o(v),titleClass:o(i).e("title")})]),default:A(()=>[g(n.$slots,"default")]),_:2},[n.$slots.footer?{name:"footer",fn:A(()=>[g(n.$slots,"footer")])}:void 0]),1032,["custom-class","center","close-icon","draggable","fullscreen","show-close","title","onClose"])):x("v-if",!0)]),_:3},8,["trapped","onFocusAfterTrapped","onFocusAfterReleased","onReleaseRequested"])],42,lo)]),_:3},8,["mask","overlay-class","z-index"]),[[_e,o(d)]])]),_:3},8,["onAfterEnter","onAfterLeave","onBeforeLeave"])],8,["disabled"]))}});var io=te(uo,[["__file","/home/runner/work/element-plus/element-plus/packages/components/dialog/src/dialog.vue"]]);const mo=Xe(io);export{Ze as E,We as a,le as b,mo as c,Ge as u};