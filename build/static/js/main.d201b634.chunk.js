(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,t,n){e.exports=n(37)},36:function(e,t,n){},37:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(13),c=n.n(o),s=n(2),u=function(e){var t=e.filterWord,n=e.setFilterWord;return r.a.createElement("input",{value:t,onChange:function(e){n(e.target.value)}})},i=n(3),l=n.n(i),m="/api/persons",f={getAll:function(){return l.a.get(m).then((function(e){return e.data}))},create:function(e){return l.a.post(m,e).then((function(e){return e.data}))},update:function(e){return l.a.put("".concat(m,"/").concat(e.id),e).then((function(e){return e.data}))},deletePerson:function(e){return l.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))}},d=function(e){return r.a.createElement("form",null,r.a.createElement("div",null,"name:",r.a.createElement("input",{value:e.newName,onChange:function(t){e.setNewName(t.target.value)}}),r.a.createElement("br",null),"number:",r.a.createElement("input",{value:e.newNumber,onChange:function(t){e.setNewNumber(t.target.value)}})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit",onClick:function(t){t.preventDefault();var n=e.persons.find((function(t){return t.name===e.newName}));n?window.confirm("".concat(e.newName," is already added to phonebook, replace the old number with a new one?"))&&f.update({name:n.name,number:e.newNumber,id:n.id}).then((function(t){var a=e.persons.map((function(e){return e.name!==n.name?e:t}));e.setPersons(a),e.setNotificationMessage("Updated ".concat(e.newName)),setTimeout((function(){e.setNotificationMessage(null)}),5e3)})).catch((function(){e.setErrorMessage("Imformation of ".concat(e.newName," has already been removed from server!")),setTimeout((function(){e.setErrorMessage(null)}),5e3);var t=e.persons.filter((function(t){return t.name!==e.newName}));e.setPersons(t)})):f.create({name:e.newName,number:e.newNumber}).then((function(t){e.setPersons(e.persons.concat(t)),e.setNotificationMessage("Added ".concat(t.name)),setTimeout((function(){e.setNotificationMessage(null)}),5e3)})).catch((function(t){var n=t.response.data.error;e.setErrorMessage(n),setTimeout((function(){e.setErrorMessage(null)}),5e3)}))}},"add")))},b=function(e){var t=e.persons,n=e.filterWord,a=e.deletePerson,o=e.setPersons,c=e.setNotificationMessage,s=e.setErrorMessage,u=t.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())}));return u.map((function(e){return r.a.createElement("p",{key:e.name},e.name," ",e.number,r.a.createElement("button",{onClick:function(){!function(e){var n=t.find((function(t){return t.id===e}));if(window.confirm("Delete ".concat(n.name," ?"))){a(e).then((function(e){c("Deleted ".concat(n.name,"."))})).catch((function(t){s("Imformation of ".concat(e," has already been removed from server!")),setTimeout((function(){s(null)}),5e3)}));var r=t.filter((function(t){return t.id!==e}));o(r)}}(e.id)}},"delete"))}))},p=function(e){var t=e.message;return null===t?null:r.a.createElement("div",{className:"notification"},t)},E=function(e){var t=e.message;return null===t?null:r.a.createElement("div",{className:"error"},t)},N=function(){var e=Object(a.useState)([]),t=Object(s.a)(e,2),n=t[0],o=t[1],c=Object(a.useState)(""),i=Object(s.a)(c,2),l=i[0],m=i[1],N=Object(a.useState)(""),g=Object(s.a)(N,2),h=g[0],v=g[1],w=Object(a.useState)(""),M=Object(s.a)(w,2),j=M[0],O=M[1],P=Object(a.useState)(null),k=Object(s.a)(P,2),C=k[0],y=k[1],S=Object(a.useState)(null),W=Object(s.a)(S,2),T=W[0],A=W[1];return Object(a.useEffect)((function(){f.getAll().then((function(e){o(e)}))}),[]),r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(p,{message:C}),r.a.createElement(E,{message:T}),r.a.createElement(u,{filterWord:j,setFilterWord:O}),r.a.createElement("h3",null,"add a new"),r.a.createElement(d,{persons:n,setPersons:o,newName:l,setNewName:m,newNumber:h,setNewNumber:v,setNotificationMessage:y,setErrorMessage:A}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(b,{persons:n,filterWord:j,deletePerson:f.deletePerson,setPersons:o,setNotificationMessage:y,setErrorMessage:A}))};n(36);c.a.render(r.a.createElement(N,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.d201b634.chunk.js.map