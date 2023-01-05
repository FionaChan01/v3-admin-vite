import{g as e,d as t}from"./table-51956a81.js";import{a2 as r,a4 as a,k as o,r as l,al as n,W as s,b1 as i,ak as u,aG as d,ay as c,a1 as m}from"./runtime-core.esm-bundler-9099a418.js";import{G as p}from"./index-2fd6989b.js";import{bs as f}from"./user-b84445b8.js";import"./error-c58402b8.js";import"./vue-router-d7411128.js";const g={default:({row:e,column:t})=>{const a=e[t.field];return[r("span",{class:`el-tag el-tag--${"admin"===a?"":"warning"} el-tag--plain`},[a])]}},v={default:({row:e,column:t})=>{let a="danger",o="禁用";return e[t.field]&&(a="success",o="启用"),[r("span",{class:`el-tag el-tag--${a} el-tag--plain`},[o])]}},h={class:"app-container"},y=a({__name:"index",setup(a){const y=o(),b=l({loading:!0,autoResize:!0,pagerConfig:{align:"right"},formConfig:{items:[{field:"username",itemRender:{name:"$input",props:{placeholder:"用户名",clearable:!0}}},{field:"phone",itemRender:{name:"$input",props:{placeholder:"手机号",clearable:!0}}},{itemRender:{name:"$buttons",children:[{props:{type:"submit",content:"查询",status:"primary"}},{props:{type:"reset",content:"重置"}}]}}]},toolbarConfig:{refresh:!0,custom:!0,slots:{buttons:"toolbar-btns"}},customConfig:{checkMethod:({column:e})=>!["username"].includes(e.field)},columns:[{type:"checkbox",width:"50px"},{field:"username",title:"用户名"},{field:"roles",title:"角色",slots:g},{field:"phone",title:"手机号"},{field:"email",title:"邮箱"},{field:"status",title:"状态",slots:v},{field:"createTime",title:"创建时间"},{title:"操作",width:"150px",fixed:"right",showOverflow:!1,slots:{default:"row-operate"}}],proxyConfig:{seq:!0,form:!0,props:{total:"total"},ajax:{query:({page:t,form:r})=>(b.loading=!0,P.clearTable(),new Promise((a=>{let o=0,l=[];const n=e=>{if(e&&e.data){const t=e.data;Number.isInteger(t.total)&&(o=t.total),Array.isArray(t.list)&&(l=t.list)}b.loading=!1,a({total:o,result:l})},s={username:r.username||void 0,phone:r.phone||void 0,size:t.pageSize,currentPage:t.currentPage};e(s).then(n).catch(n)})))}}}),w=o(),x=l({title:"",showClose:!0,escClosable:!0,maskClosable:!0,beforeHideMethod:()=>{var e;return null==(e=k.value)||e.clearValidate(),Promise.resolve()}}),k=o(),C=l({span:24,titleWidth:"100px",loading:!1,titleColon:!1,data:{username:"",password:""},items:[{field:"username",title:"用户名",itemRender:{name:"$input",props:{placeholder:"请输入"}}},{field:"password",title:"密码",itemRender:{name:"$input",props:{placeholder:"请输入"}}},{align:"right",itemRender:{name:"$buttons",children:[{props:{content:"取消"},events:{click:()=>{var e;return null==(e=w.value)?void 0:e.close()}}},{props:{type:"submit",content:"确定",status:"primary"},events:{click:()=>P.onSubmitForm()}}]}}],rules:{username:[{required:!0,validator:({itemValue:e})=>e?e.trim()?void 0:new Error("空格无效"):new Error("请输入")}],password:[{required:!0,validator:({itemValue:e})=>e?e.trim()?void 0:new Error("空格无效"):new Error("请输入")}]}}),P=l({isUpdate:!0,commitQuery:()=>{var e;return null==(e=y.value)?void 0:e.commitProxy("query")},clearTable:()=>{var e;return null==(e=y.value)?void 0:e.reloadData([])},onShowModal:e=>{var t,r,a;e?(P.isUpdate=!0,x.title="修改用户",C.data.username=e.username):(P.isUpdate=!1,x.title="新增用户"),C.items&&(null==(r=null==(t=C.items[0])?void 0:t.itemRender)?void 0:r.props)&&(C.items[0].itemRender.props.disabled=P.isUpdate),null==(a=w.value)||a.open(),n((()=>{var e,t;!P.isUpdate&&(null==(e=k.value)||e.reset()),null==(t=k.value)||t.clearValidate()}))},onSubmitForm:()=>{var e;C.loading||null==(e=k.value)||e.validate((e=>{if(e)return;C.loading=!0;const t=e=>{var t;C.loading=!1,e||(null==(t=w.value)||t.close(),f.success("操作成功"),!P.isUpdate&&P.afterInsert(),P.commitQuery())};P.isUpdate,setTimeout((()=>t()),1e3)}))},afterInsert:()=>{var e,t;const r=null==(t=null==(e=y.value)?void 0:e.getProxyInfo())?void 0:t.pager;if(r){r.currentPage*r.pageSize===r.total&&++r.currentPage}},onDelete:e=>{const r=`确定 <strong style='color:red;'>删除</strong> 用户 <strong style='color:#409eff;'>${e.username}</strong> ？`;p.confirm(r,"提示",{type:"warning",showClose:!0,closeOnClickModal:!0,closeOnPressEscape:!0,cancelButtonText:"取消",confirmButtonText:"确定",dangerouslyUseHTMLString:!0}).then((()=>{t(e.id).then((()=>{f.success("删除成功"),P.afterDelete(),P.commitQuery()})).catch((()=>1))})).catch((()=>1))},afterDelete:()=>{var e,t;const r=y.value.getData(),a=null==(t=null==(e=y.value)?void 0:e.getProxyInfo())?void 0:t.pager;a&&a.currentPage>1&&1===r.length&&--a.currentPage},moreFunc:()=>{}});return(e,t)=>{const a=d("vxe-button"),o=d("el-button"),l=d("vxe-grid"),n=d("vxe-form"),p=d("vxe-modal");return c(),s("div",h,[r(l,u({ref_key:"xGridDom",ref:y},b),{"toolbar-btns":i((()=>[r(a,{status:"primary",icon:"vxe-icon-add",onClick:t[0]||(t[0]=e=>P.onShowModal())},{default:i((()=>[m("新增用户")])),_:1}),r(a,{status:"danger",icon:"vxe-icon-delete"},{default:i((()=>[m("批量删除")])),_:1})])),"row-operate":i((({row:e})=>[r(o,{link:"",type:"primary",onClick:t=>P.onShowModal(e)},{default:i((()=>[m("修改")])),_:2},1032,["onClick"]),r(o,{link:"",type:"danger",onClick:t=>P.onDelete(e)},{default:i((()=>[m("删除")])),_:2},1032,["onClick"])])),_:1},16),r(p,u({ref_key:"xModalDom",ref:w},x),{default:i((()=>[r(n,u({ref_key:"xFormDom",ref:k},C),null,16)])),_:1},16)])}}});export{y as default};