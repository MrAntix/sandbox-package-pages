const e=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g"),t=e=>e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1"),r=e=>e.replace(/([=!:$\/()])/g,"\\$1"),n=e=>e&&e.sensitive?"":"i",a=(e,r,a)=>{for(var s=(a=a||{}).strict,i=!1!==a.end,h=t(a.delimiter||"/"),l=a.delimiters||"./",o=[].concat(a.endsWith||[]).map(t).concat("$").join("|"),c="",p=!1,u=0;u<e.length;u++){var f=e[u];if("string"==typeof f)c+=t(f),p=u===e.length-1&&l.indexOf(f[f.length-1])>-1;else{var d=t(f.prefix||""),g=f.repeat?"(?:"+f.pattern+")(?:"+d+"(?:"+f.pattern+"))*":f.pattern;r&&r.push(f),c+=f.optional?f.partial?d+"("+g+")?":"(?:"+d+"("+g+"))?":d+"("+g+")"}}return i?(s||(c+="(?:"+h+")?"),c+="$"===o?"$":"(?="+o+")"):(s||(c+="(?:"+h+"(?="+o+"))?"),p||(c+="(?="+h+"|"+o+")")),new RegExp("^"+c,n(a))},s=(i,h,l)=>i instanceof RegExp?((e,t)=>{if(!t)return e;var r=e.source.match(/\((?!\?)/g);if(r)for(var n=0;n<r.length;n++)t.push({name:n,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,pattern:null});return e})(i,h):Array.isArray(i)?((e,t,r)=>{for(var a=[],i=0;i<e.length;i++)a.push(s(e[i],t,r).source);return new RegExp("(?:"+a.join("|")+")",n(r))})(i,h,l):((n,s,i)=>a(((n,a)=>{for(var s,i=[],h=0,l=0,o="",c=a&&a.delimiter||"/",p=a&&a.delimiters||"./",u=!1;null!==(s=e.exec(n));){var f=s[0],d=s[1],g=s.index;if(o+=n.slice(l,g),l=g+f.length,d)o+=d[1],u=!0;else{var m="",y=n[l],x=s[2],v=s[3],A=s[4],O=s[5];if(!u&&o.length){var b=o.length-1;p.indexOf(o[b])>-1&&(m=o[b],o=o.slice(0,b))}o&&(i.push(o),o="",u=!1);var E=m||c,R=v||A;i.push({name:x||h++,prefix:m,delimiter:E,optional:"?"===O||"*"===O,repeat:"+"===O||"*"===O,partial:""!==m&&void 0!==y&&y!==m,pattern:R?r(R):"[^"+t(E)+"]+?"})}}return(o||l<n.length)&&i.push(o+n.substr(l)),i})(n,i),s,i))(i,h,l),i=(e,t)=>new RegExp("^"+t+"(\\/|\\?|#|$)","i").test(e),h=(e,t)=>i(e,t)?e.substr(t.length):e,l=e=>"/"===e.charAt(e.length-1)?e.slice(0,-1):e,o=e=>"/"===e.charAt(0)?e:"/"+e,c=e=>"/"===e.charAt(0)?e.substr(1):e,p=e=>{const{pathname:t,search:r,hash:n}=e;let a=t||"/";return r&&"?"!==r&&(a+="?"===r.charAt(0)?r:`?${r}`),n&&"#"!==n&&(a+="#"===n.charAt(0)?n:`#${n}`),a},u=e=>"/"===e.charAt(0),f=e=>Math.random().toString(36).substr(2,e),d=(e,t)=>{for(let r=t,n=r+1,a=e.length;n<a;r+=1,n+=1)e[r]=e[n];e.pop()},g=(e,t)=>{if(e===t)return!0;if(null==e||null==t)return!1;if(Array.isArray(e))return Array.isArray(t)&&e.length===t.length&&e.every((e,r)=>g(e,t[r]));const r=typeof e;if(r!==typeof t)return!1;if("object"===r){const r=e.valueOf(),n=t.valueOf();if(r!==e||n!==t)return g(r,n);const a=Object.keys(e),s=Object.keys(t);return a.length===s.length&&a.every(r=>g(e[r],t[r]))}return!1},m=(e,t)=>e.pathname===t.pathname&&e.search===t.search&&e.hash===t.hash&&e.key===t.key&&g(e.state,t.state),y=(e,t,r,n)=>{let a;"string"==typeof e?(a=(e=>{let t=e||"/",r="",n="";const a=t.indexOf("#");-1!==a&&(n=t.substr(a),t=t.substr(0,a));const s=t.indexOf("?");return-1!==s&&(r=t.substr(s),t=t.substr(0,s)),{pathname:t,search:"?"===r?"":r,hash:"#"===n?"":n,query:{},key:""}})(e),void 0!==t&&(a.state=t)):((a=Object.assign({pathname:""},e)).search&&"?"!==a.search.charAt(0)&&(a.search="?"+a.search),a.hash&&"#"!==a.hash.charAt(0)&&(a.hash="#"+a.hash),void 0!==t&&void 0===a.state&&(a.state=t));try{a.pathname=decodeURI(a.pathname)}catch(e){throw e instanceof URIError?new URIError('Pathname "'+a.pathname+'" could not be decoded. This is likely caused by an invalid percent-encoding.'):e}return a.key=r,n?a.pathname?"/"!==a.pathname.charAt(0)&&(a.pathname=((e,t="")=>{let r,n=t&&t.split("/")||[],a=0;const s=e&&e.split("/")||[],i=e&&u(e),h=t&&u(t),l=i||h;if(e&&u(e)?n=s:s.length&&(n.pop(),n=n.concat(s)),!n.length)return"/";if(n.length){const e=n[n.length-1];r="."===e||".."===e||""===e}else r=!1;for(let e=n.length;e>=0;e--){const t=n[e];"."===t?d(n,e):".."===t?(d(n,e),a++):a&&(d(n,e),a--)}if(!l)for(;a--;a)n.unshift("..");!l||""===n[0]||n[0]&&u(n[0])||n.unshift("");let o=n.join("/");return r&&"/"!==o.substr(-1)&&(o+="/"),o})(a.pathname,n.pathname)):a.pathname=n.pathname:a.pathname||(a.pathname="/"),a.query=(e=>e?(/^[?#]/.test(e)?e.slice(1):e).split("&").reduce((e,t)=>{let[r,n]=t.split("=");return e[r]=n?decodeURIComponent(n.replace(/\+/g," ")):"",e},{}):{})(a.search||""),a};let x=0;const v={},A=(e,t={})=>{"string"==typeof t&&(t={path:t});const{path:r="/",exact:n=!1,strict:a=!1}=t,{re:i,keys:h}=((e,t)=>{const r=`${t.end}${t.strict}`,n=v[r]||(v[r]={}),a=JSON.stringify(e);if(n[a])return n[a];const i=[],h={re:s(e,i,t),keys:i};return x<1e4&&(n[a]=h,x+=1),h})(r,{end:n,strict:a}),l=i.exec(e);if(!l)return null;const[o,...c]=l,p=e===o;return n&&!p?null:{path:r,url:"/"===r&&""===o?"/":o,isExact:p,params:h.reduce((e,t,r)=>(e[t.name]=c[r],e),{})}},O=(e,t)=>null==e&&null==t||null!=t&&e&&t&&e.path===t.path&&e.url===t.url&&g(e.params,t.params),b=(e,t,r)=>r(e.confirm(t)),E=e=>e.metaKey||e.altKey||e.ctrlKey||e.shiftKey,R=e=>{const t=e.navigator.userAgent;return(-1===t.indexOf("Android 2.")&&-1===t.indexOf("Android 4.0")||-1===t.indexOf("Mobile Safari")||-1!==t.indexOf("Chrome")||-1!==t.indexOf("Windows Phone"))&&e.history&&"pushState"in e.history},$=e=>-1===e.userAgent.indexOf("Trident"),k=e=>-1===e.userAgent.indexOf("Firefox"),j=(e,t)=>void 0===t.state&&-1===e.userAgent.indexOf("CriOS"),_=(e,t)=>{const r=e[t],n="__storage_test__";try{return r.setItem(n,n),r.removeItem(n),!0}catch(e){return e instanceof DOMException&&(22===e.code||1014===e.code||"QuotaExceededError"===e.name||"NS_ERROR_DOM_QUOTA_REACHED"===e.name)&&0!==r.length}};export{O as a,R as b,$ as c,l as d,y as e,o as f,b as g,h,f as i,p as j,i as k,j as l,A as m,k as n,c as o,m as p,E as q,_ as s};