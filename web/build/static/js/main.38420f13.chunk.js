(this.webpackJsonpreactapp=this.webpackJsonpreactapp||[]).push([[0],{183:function(e,t,n){},184:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(52),s=n.n(c),i=n(31),o=n(145),l=n(142),u=n(260),j=n(23),b=n(40),d=n(18),x=n.n(d),O=n(22),p=n(9),h=function(){return localStorage.getItem("TOKEN_KEY")},m=function(e){return localStorage.setItem("TOKEN_KEY",e)},f=function(e){return localStorage.setItem("USER",JSON.stringify(e))};function g(e,t){return v.apply(this,arguments)}function v(){return(v=Object(O.a)(x.a.mark((function e(t,n){var a,r,c,s,i=arguments;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=i.length>2&&void 0!==i[2]?i[2]:null,r={Accept:"application/json","Content-Type":"application/json"},(c=h())&&(r.Authorization="Bearer ".concat(c)),e.next=6,fetch("".concat(t),{headers:r,method:n,body:a?JSON.stringify(a):null});case 6:return s=e.sent,e.abrupt("return",s);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var w=n(1),y=Object(a.createContext)({});function S(e){var t=e.children,n=Object(a.useState)(JSON.parse(localStorage.getItem("USER"))),r=Object(p.a)(n,2),c=r[0],s=r[1];function i(){return(i=Object(O.a)(x.a.mark((function e(t){var n,a,r,c,i,o;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.email,a=t.password,e.prev=1,e.next=4,g("/api/v1/login","POST",{email:n,password:a});case 4:if(200!==(r=e.sent).status){e.next=16;break}return e.next=8,r.json();case 8:c=e.sent,i=c.user,o=c.token,f(i),m(o),s(i),e.next=20;break;case 16:return e.next=18,r.json();case 18:throw e.sent.message;case 20:e.next=25;break;case 22:throw e.prev=22,e.t0=e.catch(1),e.t0;case 25:case"end":return e.stop()}}),e,null,[[1,22]])})))).apply(this,arguments)}return Object(w.jsx)(y.Provider,{value:{user:c,signIn:function(e){return i.apply(this,arguments)},logout:function(){localStorage.removeItem("TOKEN_KEY"),localStorage.removeItem("USER"),s(null)}},children:t})}var C=n(252),k=n(264),E=n(258),I=n(262),D=n(250),T=n(251),N=n(271),W=n(125),M=n.n(W),A=n(141),P=n.n(A),Y=n(140),B=n.n(Y),K=n(266),U=n(267),q=n(86),F=n(259),J=n(268),L=n(143),V=n(269),_=n(249),z=n(270),R=n(133),G=n.n(R),H=n(137),Q=n.n(H),X=n(136),Z=n.n(X),$=n(139),ee=n.n($),te=n(138),ne=n.n(te),ae=n(57),re=n(241),ce=n(245),se=n(263),ie=n(255),oe=n(265),le=n(254),ue=n(248),je=n(253),be=n(256),de=n(130),xe=n.n(de);function Oe(e){var t=e.type,n=void 0===t?"error":t,a=e.error,r=e.handleClose;return Object(w.jsx)(be.a,{action:Object(w.jsx)(I.a,{"aria-label":"close",color:"inherit",size:"small",onClick:r,children:Object(w.jsx)(xe.a,{fontSize:"inherit"})}),severity:n,children:a})}var pe=n(144);function he(e){var t=e.open,n=e.handleClose,r=e.reload,c=Object(a.useState)(new Date),s=Object(p.a)(c,2),o=s[0],l=s[1],u=Object(a.useState)(""),j=Object(p.a)(u,2),b=j[0],d=j[1],h=Object(a.useState)(""),m=Object(p.a)(h,2),f=m[0],v=m[1],y=Object(a.useState)(""),S=Object(p.a)(y,2),C=S[0],k=S[1],E=function(){var e=Object(O.a)(x.a.mark((function e(){var t,a,c;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return d(""),t=Object(pe.a)(o,"yyyyMMdd"),e.next=4,g("/api/v1/bills","POST",{expire_date:t,value:f,description:C});case 4:if(200!==(a=e.sent).status){e.next=11;break}I(),n(),r(),e.next=15;break;case 11:return e.next=13,a.json();case 13:c=e.sent,d(c.message);case 15:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),I=function(){v(""),k(""),l(null),d("")};return Object(w.jsx)("div",{children:Object(w.jsxs)(re.a,{open:t,onClose:n,fullWidth:!0,children:[Object(w.jsx)(ce.a,{children:"Create a new bill"}),Object(w.jsxs)(se.a,{children:[Object(w.jsx)(ie.a,{autoFocus:!0,margin:"dense",id:"description",label:"Description",type:"text",fullWidth:!0,variant:"standard",value:C,onChange:function(e){return k(e.target.value)}}),Object(w.jsx)(ie.a,{margin:"dense",id:"value",label:"Value",type:"text",fullWidth:!0,variant:"standard",value:f,onChange:function(e){return v(e.target.value)}}),Object(w.jsx)("br",{}),Object(w.jsx)("br",{}),Object(w.jsx)(ue.b,{dateAdapter:le.a,children:Object(w.jsx)(je.a,{label:"Expire Date",value:o,onChange:function(e){l(e)},renderInput:function(e){return Object(w.jsx)(ie.a,Object(i.a)({},e))}})})]}),Object(w.jsx)("div",{style:{padding:"15px"},children:b&&Object(w.jsx)(Oe,{error:b,handleClose:function(){return d(null)}})}),Object(w.jsxs)(oe.a,{children:[Object(w.jsx)(F.a,{onClick:n,children:"Cancel"}),Object(w.jsx)(F.a,{onClick:E,children:"Create"})]})]})})}function me(e){var t=e.children,n=e.title,r=Object(a.useContext)(y),c=r.logout,s=r.user,i=Object(j.g)(),o=Object(a.useState)(null),l=Object(p.a)(o,2),u=l[0],d=l[1],x=Object(a.useState)(!1),O=Object(p.a)(x,2),h=O[0],m=O[1],f=Boolean(u);document.title="My Expenses "+n;var g=function(){c(),i.push("/sign-in")};return Object(w.jsxs)("div",{children:[Object(w.jsx)(K.a,{position:"static",children:Object(w.jsxs)(U.a,{children:[Object(w.jsxs)(q.a,{variant:"h6",component:"div",sx:{flexGrow:1},children:["My Expenses ",s&&" - ".concat(s.name)]}),Object(w.jsx)(ae.BrowserView,{children:s&&[Object(w.jsx)(F.a,{onClick:function(){return m(!0)},sx:{color:"white",display:"inline-block",mr:1},children:"New"}),Object(w.jsx)(F.a,{onClick:g,sx:{color:"white",display:"inline-block"},children:"Logout"})]})]})}),Object(w.jsxs)(ae.MobileView,{children:[Object(w.jsx)(J.a,{size:"small",color:"primary",style:{margin:0,top:"auto",right:20,bottom:20,left:"auto",position:"fixed"},onClick:function(e){return d(e.currentTarget)},children:Object(w.jsx)(G.a,{})}),Object(w.jsx)(L.a,{id:"basic-menu",anchorEl:u,open:f,onClose:function(e){return d(null)},MenuListProps:{"aria-labelledby":"basic-button"},children:s?[Object(w.jsxs)(V.a,{onClick:function(){return m(!0)},children:[Object(w.jsx)(_.a,{children:Object(w.jsx)(Z.a,{})}),"New"]}),Object(w.jsxs)(V.a,{onClick:g,children:[Object(w.jsx)(_.a,{children:Object(w.jsx)(Q.a,{})}),"Logout"]})]:[Object(w.jsxs)(V.a,{onClick:function(e){return d(null)},children:[Object(w.jsx)(_.a,{children:Object(w.jsx)(ne.a,{})}),Object(w.jsx)(b.b,{to:"/sign-up",style:{textDecoration:"none",color:"inherit"},children:"Sign Up"})]}),Object(w.jsxs)(V.a,{onClick:function(e){return d(null)},children:[Object(w.jsx)(_.a,{children:Object(w.jsx)(ee.a,{})}),Object(w.jsx)(b.b,{to:"/sign-in",style:{textDecoration:"none",color:"inherit"},children:"Sign In"})]})]})]}),Object(w.jsx)(z.a,{component:"main",children:t}),Object(w.jsx)(he,{open:h,handleClose:function(){return m(!1)}})]})}function fe(){var e=Object(a.useContext)(y).user,t=Object(j.g)(),n=Object(a.useState)([]),c=Object(p.a)(n,2),s=c[0],i=c[1],o=Object(a.useState)(null),l=Object(p.a)(o,2),u=l[0],b=l[1];Object(a.useEffect)((function(){e||t.push("/sign-in"),d()}),[t,e]);var d=function(){var e=Object(O.a)(x.a.mark((function e(){var t,n,a;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return b(""),e.next=3,g("/api/v1/bills","GET");case 3:if(200!==(t=e.sent).status){e.next=11;break}return e.next=7,t.json();case 7:n=e.sent,i(n),e.next=15;break;case 11:return e.next=13,t.json();case 13:a=e.sent,b(a.message);case 15:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(w.jsxs)(me,{title:"Index",children:[u&&Object(w.jsx)(Oe,{error:u,handleClose:function(){return b(null)}}),s.length>0?Object(w.jsx)(k.a,{sx:{width:"100%",bgcolor:"background.paper"},children:s.map((function(e){return Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)(E.a,{secondaryAction:[Object(w.jsx)(I.a,{children:Object(w.jsx)(B.a,{})}),Object(w.jsx)(I.a,{children:Object(w.jsx)(P.a,{})})],children:Object(w.jsx)(D.a,{primary:"".concat(M()(e.expire_date).format("DD/MM/YYYY")," - ").concat(e.value," "),secondary:Object(w.jsx)(r.a.Fragment,{children:e.description})})}),Object(w.jsx)(T.a,{variant:"inset",component:"li"})]})}))}):Object(w.jsx)(N.a,{sx:{mt:2},children:"No bills found, create a new now"})]})}var ge=n(272),ve=n(101);function we(){var e=Object(a.useState)(""),t=Object(p.a)(e,2),n=t[0],r=t[1],c=Object(ve.a)(),s=c.register,o=c.handleSubmit,l=Object(a.useContext)(y),u=l.signIn,d=l.user,h=Object(j.g)();function m(){return(m=Object(O.a)(x.a.mark((function e(t){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u(t);case 3:h.push("/"),e.next=10;break;case 6:e.prev=6,e.t0=e.catch(0),console.error(e.t0),r(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,6]])})))).apply(this,arguments)}return Object(a.useEffect)((function(){d&&h.push("/")}),[]),Object(w.jsx)(me,{title:"Login",children:Object(w.jsx)(N.a,{sx:{marginTop:8,display:"flex",flexDirection:"column",alignItems:"center"},children:Object(w.jsxs)(N.a,{component:"form",onSubmit:o((function(e){return m.apply(this,arguments)})),sx:ae.isBrowser?{mt:1,width:"70%"}:{mt:1,width:"90%"},noValidate:!0,children:[Object(w.jsx)(ie.a,Object(i.a)({margin:"normal",required:!0,fullWidth:!0,id:"email",label:"Email Address",name:"email",autoComplete:"email",autoFocus:!0},s("email"))),Object(w.jsx)(ie.a,Object(i.a)(Object(i.a)({},s("password")),{},{margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password"})),Object(w.jsx)(F.a,{type:"submit",fullWidth:!0,variant:"contained",sx:{mt:3,mb:2},children:"Sign In"}),Object(w.jsx)(ge.a,{href:"/sign-up",variant:"body2",children:Object(w.jsx)(b.b,{to:"/sign-up",style:{textDecoration:"none",color:"inherit"},children:"Don't have an account? Sign Up"})}),n&&Object(w.jsx)(Oe,{error:n,handleClose:function(){return r(null)}})]})})})}function ye(){var e=Object(a.useState)(null),t=Object(p.a)(e,2),n=t[0],r=t[1],c=Object(ve.a)(),s=c.register,o=c.handleSubmit,l=Object(j.g)(),u=Object(a.useContext)(y),d=u.user,h=u.signIn;function m(){return(m=Object(O.a)(x.a.mark((function e(t){var n,a,c,s,i;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.name,a=t.email,c=t.password,r(""),e.next=4,g("/api/v1/register","POST",{name:n,email:a,password:c});case 4:if(200!==(s=e.sent).status){e.next=11;break}return e.next=8,h({email:a,password:c});case 8:l.push("/"),e.next=15;break;case 11:return e.next=13,s.json();case 13:i=e.sent,r(i.message);case 15:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(a.useEffect)((function(){d&&l.push("/")}),[]),Object(w.jsx)(me,{title:"Login",children:Object(w.jsx)(N.a,{sx:{marginTop:8,display:"flex",flexDirection:"column",alignItems:"center"},children:Object(w.jsxs)(N.a,{component:"form",onSubmit:o((function(e){return m.apply(this,arguments)})),noValidate:!0,sx:ae.isBrowser?{mt:1,width:"70%"}:{mt:1,width:"90%"},children:[Object(w.jsx)(ie.a,Object(i.a)({margin:"normal",required:!0,fullWidth:!0,id:"name",label:"Name",name:"name",autoComplete:"name",autoFocus:!0},s("name"))),Object(w.jsx)(ie.a,Object(i.a)({margin:"normal",required:!0,fullWidth:!0,id:"email",label:"Email Address",name:"email",autoComplete:"email"},s("email"))),Object(w.jsx)(ie.a,Object(i.a)({margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password"},s("password"))),Object(w.jsx)(F.a,{type:"submit",fullWidth:!0,variant:"contained",sx:{mt:3,mb:2},children:"Sign Up"}),Object(w.jsx)(ge.a,{variant:"body2",children:Object(w.jsx)(b.b,{to:"/sign-in",style:{textDecoration:"none",color:"inherit"},children:"Already have an account? Sign in"})}),n&&Object(w.jsx)(Oe,{error:n,handleClose:function(){return r(null)}})]})})})}n(183);function Se(e){var t=e.component,n=Object(o.a)(e,["component"]),r=Object(a.useContext)(y).user;return Object(w.jsx)(j.b,Object(i.a)(Object(i.a)({},n),{},{render:function(e){return r?Object(w.jsx)(t,Object(i.a)({},e)):Object(w.jsx)(j.a,{to:{pathname:"/sign-in",state:{from:e.location}}})}}))}function Ce(){var e=Object(l.a)({palette:{mode:"dark"}});return Object(w.jsxs)(u.a,{theme:e,children:[Object(w.jsx)(C.a,{}),Object(w.jsx)(S,{children:Object(w.jsx)(b.a,{children:Object(w.jsxs)(j.d,{children:[Object(w.jsx)(Se,{path:"/",component:fe,exact:!0}),Object(w.jsx)(j.b,{path:"/sign-in",component:we,exact:!0}),Object(w.jsx)(j.b,{path:"/sign-up",component:ye,exact:!0})]})})})]})}s.a.render(Object(w.jsx)(r.a.StrictMode,{children:Object(w.jsx)(Ce,{})}),document.getElementById("root"))}},[[184,1,2]]]);
//# sourceMappingURL=main.38420f13.chunk.js.map