import{av as H,d as R,A as V,v as p,a3 as k,o as m,e as S,a5 as A,f as E,w as N,P as U,a8 as q,u as n,g as B,n as f,t as Z,aS as j,K as G,af as te,aY as oe,aw as _,ax as ae,D as K,bL as re,q as M,b3 as L,R as le,x as ie,a0 as ue,a1 as ce,M as b,a7 as T,b as D,au as de,N as pe,aM as me,a6 as fe,b2 as ge,bm as ye,aG as ve,bM as O,ae as P,b5 as Y,aE as J,l as be,b6 as F,ak as Ce,bN as he}from"./index.bee93a5d.js";const Te=H({value:{type:[String,Number],default:""},max:{type:Number,default:99},isDot:Boolean,hidden:Boolean,type:{type:String,values:["primary","success","warning","info","danger"],default:"danger"}}),Ne=["textContent"],we={name:"ElBadge"},Me=R({...we,props:Te,setup(s,{expose:t}){const e=s,a=V("badge"),o=p(()=>e.isDot?"":k(e.value)&&k(e.max)?e.max<e.value?`${e.max}+`:`${e.value}`:`${e.value}`);return t({content:o}),(l,u)=>(m(),S("div",{class:f(n(a).b())},[A(l.$slots,"default"),E(j,{name:`${n(a).namespace.value}-zoom-in-center`,persisted:""},{default:N(()=>[U(B("sup",{class:f([n(a).e("content"),n(a).em("content",l.type),n(a).is("fixed",!!l.$slots.default),n(a).is("dot",l.isDot)]),textContent:Z(n(o))},null,10,Ne),[[q,!l.hidden&&(n(o)||l.isDot)]])]),_:1},8,["name"])],2))}});var ke=G(Me,[["__file","/home/runner/work/element-plus/element-plus/packages/components/badge/src/badge.vue"]]);const Se=te(ke),Q=["success","info","warning","error"],i=ae({customClass:"",center:!1,dangerouslyUseHTMLString:!1,duration:3e3,icon:"",id:"",message:"",onClose:void 0,showClose:!1,type:"info",offset:16,zIndex:0,grouping:!1,repeatNum:1,appendTo:K?document.body:void 0}),Be=H({customClass:{type:String,default:i.customClass},center:{type:Boolean,default:i.center},dangerouslyUseHTMLString:{type:Boolean,default:i.dangerouslyUseHTMLString},duration:{type:Number,default:i.duration},icon:{type:oe,default:i.icon},id:{type:String,default:i.id},message:{type:_([String,Object,Function]),default:i.message},onClose:{type:_(Function),required:!1},showClose:{type:Boolean,default:i.showClose},type:{type:String,values:Q,default:i.type},offset:{type:Number,default:i.offset},zIndex:{type:Number,default:i.zIndex},grouping:{type:Boolean,default:i.grouping},repeatNum:{type:Number,default:i.repeatNum}}),Ee={destroy:()=>!0},c=re([]),xe=s=>{const t=c.findIndex(o=>o.id===s),e=c[t];let a;return t>0&&(a=c[t-1]),{current:e,prev:a}},ze=s=>{const{prev:t}=xe(s);return t?t.vm.exposeProxy.bottom:0},$e=["id"],Ie=["innerHTML"],_e={name:"ElMessage"},Le=R({..._e,props:Be,emits:Ee,setup(s,{expose:t}){const e=s,{Close:a}=ge,o=V("message"),l=M(),u=M(!1),g=M(0);let d;const C=p(()=>e.type?e.type==="error"?"danger":e.type:"info"),x=p(()=>{const r=e.type;return{[o.bm("icon",r)]:r&&L[r]}}),v=p(()=>e.icon||L[e.type]||""),X=p(()=>ze(e.id)),z=p(()=>e.offset+X.value),ee=p(()=>g.value+z.value),se=p(()=>({top:`${z.value}px`,zIndex:e.zIndex}));function w(){e.duration!==0&&({stop:d}=ye(()=>{h()},e.duration))}function $(){d==null||d()}function h(){u.value=!1}function ne({code:r}){r===ve.esc&&h()}return le(()=>{w(),u.value=!0}),ie(()=>e.repeatNum,()=>{$(),w()}),ue(document,"keydown",ne),ce(l,()=>{g.value=l.value.getBoundingClientRect().height}),t({visible:u,bottom:ee,close:h}),(r,I)=>(m(),b(j,{name:n(o).b("fade"),onBeforeLeave:r.onClose,onAfterLeave:I[0]||(I[0]=Re=>r.$emit("destroy")),persisted:""},{default:N(()=>[U(B("div",{id:r.id,ref_key:"messageRef",ref:l,class:f([n(o).b(),{[n(o).m(r.type)]:r.type&&!r.icon},n(o).is("center",r.center),n(o).is("closable",r.showClose),r.customClass]),style:fe(n(se)),role:"alert",onMouseenter:$,onMouseleave:w},[r.repeatNum>1?(m(),b(n(Se),{key:0,value:r.repeatNum,type:n(C),class:f(n(o).e("badge"))},null,8,["value","type","class"])):T("v-if",!0),n(v)?(m(),b(n(D),{key:1,class:f([n(o).e("icon"),n(x)])},{default:N(()=>[(m(),b(de(n(v))))]),_:1},8,["class"])):T("v-if",!0),A(r.$slots,"default",{},()=>[r.dangerouslyUseHTMLString?(m(),S(pe,{key:1},[T(" Caution here, message could've been compromised, never use user's input as message "),B("p",{class:f(n(o).e("content")),innerHTML:r.message},null,10,Ie)],2112)):(m(),S("p",{key:0,class:f(n(o).e("content"))},Z(r.message),3))]),r.showClose?(m(),b(n(D),{key:2,class:f(n(o).e("closeBtn")),onClick:me(h,["stop"])},{default:N(()=>[E(n(a))]),_:1},8,["class","onClick"])):T("v-if",!0)],46,$e),[[q,u.value]])]),_:3},8,["name","onBeforeLeave"]))}});var De=G(Le,[["__file","/home/runner/work/element-plus/element-plus/packages/components/message/src/message.vue"]]);let Oe=1;const W=s=>{const t=!s||P(s)||Y(s)||J(s)?{message:s}:s,e={...i,...t};if(!e.appendTo)e.appendTo=document.body;else if(P(e.appendTo)){let a=document.querySelector(e.appendTo);Ce(a)||(a=document.body),e.appendTo=a}return e},Pe=s=>{const t=c.indexOf(s);if(t===-1)return;c.splice(t,1);const{handler:e}=s;e.close()},Fe=({appendTo:s,...t},e)=>{const{nextZIndex:a}=be(),o=`message_${Oe++}`,l=t.onClose,u=document.createElement("div"),g={...t,zIndex:a()+t.zIndex,id:o,onClose:()=>{l==null||l(),Pe(v)},onDestroy:()=>{F(null,u)}},d=E(De,g,J(g.message)||Y(g.message)?{default:g.message}:null);d.appContext=e||y._context,F(d,u),s.appendChild(u.firstElementChild);const C=d.component,v={id:o,vnode:d,vm:C,handler:{close:()=>{C.exposeProxy.visible=!1}},props:d.component.props};return v},y=(s={},t)=>{if(!K)return{close:()=>{}};if(k(O.max)&&c.length>=O.max)return{close:()=>{}};const e=W(s);if(e.grouping&&c.length){const o=c.find(({vnode:l})=>{var u;return((u=l.props)==null?void 0:u.message)===e.message});if(o)return o.props.repeatNum+=1,o.props.type=e.type,o.handler}const a=Fe(e,t);return c.push(a),a.handler};Q.forEach(s=>{y[s]=(t={},e)=>{const a=W(t);return y({...a,type:s},e)}});function He(s){for(const t of c)(!s||s===t.props.type)&&t.handler.close()}y.closeAll=He;y._context=null;const Ae=he(y,"$message");export{Ae as E};