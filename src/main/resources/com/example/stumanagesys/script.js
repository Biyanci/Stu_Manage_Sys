let isAdministrator = true;

let nowEditing=0;

let tableRows;

let stuData;

//Js to Java: javaConnector
//Java to Js: jsConnector

const jsConnector={

}

function getJsConnector() {
    return jsConnector;
}

function saveAllChanges() {
    javaConnector.saveAllChanges(JSON.stringify(stuData));
    const saveAllBtn=document.getElementById("save-all-btn");
    saveAllBtn.style.backgroundColor="";
    saveAllBtn.style.color="";
}

function changeLoginAs() {
    const loginSignUp = document.getElementById("login-sign-up");
    const loginTitle = document.getElementById("login-title");
    const loginAsBtnLabel = document.getElementById("login-as-btn-label");
    const accountInput=document.getElementById("account-input");
    const passwordInput=document.getElementById("password-input");
    const loginBtn=document.getElementById("login-btn");
    const accountTip=document.getElementById("account-tip");
    const passwordTip=document.getElementById("password-tip");


    isAdministrator = !isAdministrator;
    loginSignUp.style.left = isAdministrator ? "0" : "48%";
    loginTitle.innerText = isAdministrator ? "管理员登录" : "学生登陆";
    loginAsBtnLabel.innerText = isAdministrator ? "以学生身份登录" : "以管理员身份登录";
    loginBtn.onclick=isAdministrator?loginAsAdministrator:loginAsStudent;
    accountInput.value="";
    passwordInput.value="";
    accountTip.style.display="none";
    passwordTip.style.display="none";
}

function loginAsAdministrator() {
    const accountInput=document.getElementById("account-input");
    const passwordInput=document.getElementById("password-input");
    const admin={
      id:accountInput.value,
      password:passwordInput.value
    };
    let check;
    check=javaConnector.isAdmin(JSON.stringify(admin));

    if(check){
        const cache=javaConnector.getStuData();
        stuData=JSON.parse(cache);
        showManageView();
        tableRows=document.getElementsByClassName("body-row");
        for (let i = 0; i < tableRows.length; i++) {
            tableRows.item(i).addEventListener("click",()=>{
                openEditField(i);
            });
        }
    }else if(check!==true){
        const accountTip=document.getElementById("account-tip");
        const passwordTip=document.getElementById("password-tip");

        accountTip.style.display="inline";
        passwordTip.style.display="inline";
    }
}

function loginAsStudent() {
    const accountInput=document.getElementById("account-input");
    const passwordInput=document.getElementById("password-input");
    const student={
        id:accountInput.value,
        password:passwordInput.value
    };
    let check=javaConnector.isStudent(JSON.stringify(student));

    if(check!==-1){
        const stuSelf=JSON.parse(javaConnector.getStuSelf(check));
        accountInput.value=JSON.stringify(stuSelf);
        showStuView(stuSelf);
    }else if(check===-1){
        const accountTip=document.getElementById("account-tip");
        const passwordTip=document.getElementById("password-tip");

        accountTip.style.display="inline";
        passwordTip.style.display="inline";
    }
}

function showManageView() {
    const mainContent=document.getElementById("main-content");
    const appHeader=document.getElementById("header");
    let manageViewHtml="<div id='table-wrap'><div id='table-header'><span>序号</span><span>学号</span><span>姓名</span><span>数学</span><span>英语</span><span>物理</span></div><table id=\"all-stu-info-table\"><tbody id='table-body'>";
    for (let i = 0; i < stuData.length; i++) {
        const indexTD = "<td>" + i.toString() + "</td>";
        const idTD = "<td>" + stuData[i]["id"] + "</td>";
        const nameTD = "<td>" + stuData[i]["name"] + "</td>";
        const mathTD = "<td>" + stuData[i]["math"] + "</td>";
        const englishTD = "<td>" + stuData[i]["english"] + "</td>";
        const physicsTD = "<td>" + stuData[i]["physics"] + "</td>";
        manageViewHtml += "<tr class=\"body-row\">" + indexTD + idTD + nameTD + mathTD + englishTD + physicsTD + "</tr>";
    }
    manageViewHtml+="</tbody></table></div>" +
        "            <nav id=\"edit-stu-info\">" +
        "                <div id=\"nav-body\">" +
        "                    <div id=\"nav-header\">" +
        "                        <div id=\"close-nav-btn\" onclick=\"closeEditField()\">" +
        "                            <span>关闭</span>" +
        "                        </div>" +
        "                        <span>修改信息</span>" +
        "                    </div>" +
        "                    <div id=\"nav-edit\">" +
        "                        <label>学号<br/>" +
        "                            <input type=\"text\" class=\"edit-field\" id=\"id-edit\">" +
        "                        </label>" +
        "                        <label>姓名<br/>" +
        "                            <input type=\"text\" class=\"edit-field\" id=\"name-edit\">" +
        "                        </label>" +
        "                        <label>高数<br/>" +
        "                            <input type=\"text\" class=\"edit-field\" id=\"math-edit\">" +
        "                        </label>" +
        "                        <label>英语<br/>" +
        "                            <input type=\"text\" class=\"edit-field\" id=\"english-edit\">" +
        "                        </label>" +
        "                        <label>物理<br/>" +
        "                            <input type=\"text\" class=\"edit-field\" id=\"physics-edit\">" +
        "                        </label>" +
        "                        <div id=\"save-change-btn\" onclick=\"saveAndCloseEditField()\">" +
        "                            <span>保存</span>" +
        "                        </div>" +
        "                        <div id=\"delete-self-btn\" onclick=\"deleteSelf()\">" +
        "                            <span>删除</span>" +
        "                        </div>" +
        "                    </div>" +
        "                </div>" +
        "            </nav>" +
        "        </div>";

    manageViewHtml+="<nav id=\"search-view\">" +
        "            <div id=\"search-nav\">" +
        "                <div id=\"search-nav-header\">" +
        "                    <div id=\"close-search-btn\" onclick='closeSearchNav()'><span>关闭</span></div>" +
        "                    <span id=\"search-nav-title\">搜索</span>" +
        "                </div>" +
        "                <div id=\"search-nav-body\">" +
        "                    <label>搜索</br>" +
        "                        <input type=\"text\" id=\"search-text-field\" onkeydown=\"if(event.keyCode===13){searchStu()}\">" +
        "                    </label>" +
        "                    <div id=\"search-result-wrap\">" +
        "                    </div>" +
        "                </div>" +
        "            </div>" +
        "        </nav>";

    manageViewHtml+="<nav id=\"add-view\">" +
        "            <div id=\"add-nav\">" +
        "                <div id=\"add-nav-header\">" +
        "                    <div id=\"close-add-btn\" onclick='closeAddNav()'><span>关闭</span></div>" +
        "                    <span id=\"add-nav-title\">添加</span>" +
        "                </div>" +
        "                <div id=\"add-nav-body\">" +
        "                    <label>学号（账号）</br>" +
        "                        <input type=\"text\" class=\"add-text-field\" id=\"id-text-field\" disabled>" +
        "                    </label>" +
        "                    <label>密码</br>" +
        "                        <input type=\"text\" class=\"add-text-field\" id=\"password-text-field\" disabled>" +
        "                    </label>" +
        "                    <label>姓名</br>" +
        "                        <input type=\"text\" class=\"add-text-field\" id=\"name-text-field\">" +
        "                    </label>" +
        "                    <label>高数</br>" +
        "                        <input type=\"text\" class=\"add-text-field\" id=\"math-text-field\">" +
        "                    </label>" +
        "                    <label>英语</br>" +
        "                        <input type=\"text\" class=\"add-text-field\" id=\"english-text-field\">" +
        "                    </label>" +
        "                    <label>物理</br>" +
        "                        <input type=\"text\" class=\"add-text-field\" id=\"physics-text-field\">" +
        "                    </label>" +
        "                    <div id=\"save-student-btn\" onclick='addStu()'>" +
        "                        <span>添加</span>" +
        "                    </div>" +
        "                </div>" +
        "            </div>" +
        "        </nav>";

    appHeader.innerHTML="<div id=\"back-btn\" onclick='backToLogin()'><span>返回</span></div>"+
        "<span id=\"title\">管理</span>" +
        "<div id=\"open-add-nav-btn\" onclick='openAddNav()'><span>添加</span></div>" +
        "<div id=\"open-search-nav-btn\" onclick='openSearchNav()'><span>搜索</span></div>" +
        "<div id=\"save-all-btn\" onclick='saveAllChanges()'><span>保存</span></div>";
    mainContent.innerHTML=manageViewHtml;
}

function backToLogin() {
    const appHeader=document.getElementById("header");
    const mainContent=document.getElementById("main-content");
    appHeader.innerHTML="<span id=\"title\">登录</span>";
    mainContent.innerHTML="<div id=\"login-sign-up\">\n" +
        "            <span id=\"login-title\">管理员登录</span>\n" +
        "            <label>账号<span id=\"account-tip\">账号不存在</span>\n" +
        "                <br/>\n" +
        "                <input type=\"text\" id=\"account-input\">\n" +
        "            </label>\n" +
        "            <label>密码<span id=\"password-tip\">密码错误</span>\n" +
        "                <br/>\n" +
        "                <input type=\"text\" id=\"password-input\">\n" +
        "            </label>\n" +
        "            <div id=\"login-btn\" onclick=\"loginAsAdministrator()\">\n" +
        "                <span>登录</span>\n" +
        "            </div>\n" +
        "            <div id=\"login-as-btn\" onclick=\"changeLoginAs()\">\n" +
        "                <span id=\"login-as-btn-label\">以学生身份登录</span>\n" +
        "            </div>\n" +
        "        </div>";
    isAdministrator=true;
    const accountTip=document.getElementById("account-tip");
    const passwordTip=document.getElementById("password-tip");
    accountTip.style.display="none";
    passwordTip.style.display="none";
}

function showStuView(stuSelf) {
    const mainContent=document.getElementById("main-content");
    const appHeader=document.getElementById("header");

    mainContent.innerHTML="<table id=\"self-info-table\">\n" +
        "            <thead>\n" +
        "            <tr>\n" +
        "                <th scope=\"col\">学号</th>\n" +
        "                <th scope=\"col\">姓名</th>\n" +
        "                <th scope=\"col\">高数</th>\n" +
        "                <th scope=\"col\">英语</th>\n" +
        "                <th scope=\"col\">物理</th>\n" +
        "            </tr>\n" +
        "            </thead>\n" +
        "            <tbody>\n" +
        "            <tr class=\"body-row\">\n" +
        "                <td>"+stuSelf["id"]+"</td>" +
        "                <td>"+stuSelf["name"]+"</td>\n" +
        "                <td>"+stuSelf["math"]+"</td>\n" +
        "                <td>"+stuSelf["english"]+"</td>\n" +
        "                <td>"+stuSelf["physics"]+"</td>\n" +
        "            </tr>\n" +
        "            </tbody>\n" +
        "        </table>";
    appHeader.innerHTML="<div id=\"back-btn\" onclick=\"backToLogin()\"><span>返回</span></div>\n" +
        "        <span id=\"title\">查看</span>";
}

function closeEditField() {
    const editStuInfo = document.getElementById("edit-stu-info");
    editStuInfo.style.display = "none";
}

function saveAndCloseEditField() {
    const idEdit=document.getElementById("id-edit");
    const nameEdit=document.getElementById("name-edit");
    const mathEdit=document.getElementById("math-edit");
    const englishEdit=document.getElementById("english-edit");
    const physicsEdit=document.getElementById("physics-edit");
    stuData[nowEditing]["id"]=idEdit.value;
    stuData[nowEditing]["name"]=nameEdit.value;
    stuData[nowEditing]["math"]=mathEdit.value;
    stuData[nowEditing]["english"]=englishEdit.value;
    stuData[nowEditing]["physics"]=physicsEdit.value;
    tableRows.item(nowEditing).children.item(1).innerHTML="<td>"+idEdit.value+"</td>";
    tableRows.item(nowEditing).children.item(2).innerHTML="<td>"+nameEdit.value+"</td>";
    tableRows.item(nowEditing).children.item(3).innerHTML="<td>"+mathEdit.value+"</td>";
    tableRows.item(nowEditing).children.item(4).innerHTML="<td>"+englishEdit.value+"</td>";
    tableRows.item(nowEditing).children.item(5).innerHTML="<td>"+physicsEdit.value+"</td>";
    const editStuInfo = document.getElementById("edit-stu-info");
    const saveAllBtn=document.getElementById("save-all-btn");
    saveAllBtn.style.backgroundColor="#00639C";
    saveAllBtn.style.color="#ffffff";
    editStuInfo.style.display = "none";
}

function openEditField(i) {
    nowEditing=i;
    const editStuInfo = document.getElementById("edit-stu-info");
    editStuInfo.style.display = "block";
    const idEdit=document.getElementById("id-edit");
    const nameEdit=document.getElementById("name-edit");
    const mathEdit=document.getElementById("math-edit");
    const englishEdit=document.getElementById("english-edit");
    const physicsEdit=document.getElementById("physics-edit");
    idEdit.value=stuData[i]["id"];
    nameEdit.value=stuData[i]["name"];
    mathEdit.value=stuData[i]["math"];
    englishEdit.value=stuData[i]["english"];
    physicsEdit.value=stuData[i]["physics"];
}

function openSearchNav() {
    const searchView=document.getElementById("search-view");
    searchView.style.display="block";
}

function closeSearchNav() {
    const searchResultWrap=document.getElementById("search-result-wrap");
    const searchView=document.getElementById("search-view");
    const searchTextField=document.getElementById("search-text-field");
    searchResultWrap.innerHTML="";
    searchTextField.value="";
    searchView.style.display="none";
}

function searchStu() {
    const searchTextField=document.getElementById("search-text-field");
    const searchResultWrap=document.getElementById("search-result-wrap");
    const text=searchTextField.value;
    searchResultWrap.innerHTML="";
    for (let i = 0; i < stuData.length; i++) {
        if (text===stuData[i]["name"]){
            searchResultWrap.innerHTML+="<div class=\"search-result\">" +
                "                            <div class=\"info\">" +
                "                                <span class=\"name\">"+stuData[i]["name"]+"</span>" +
                "                                <span class=\"id\">"+stuData[i]["id"]+"</span>" +
                "                            </div>" +
                "                            <div class=\"score\">" +
                "                                <span>数学：</span><span class=\"math\">"+stuData[i]["math"]+"</span></br>" +
                "                                <span>英语：</span><span class=\"english\">"+stuData[i]["english"]+"</span></br>" +
                "                                <span>物理：</span><span class=\"physics\">"+stuData[i]["physics"]+"</span></br>" +
                "                            </div>" +
                "                        </div>";
        }

    }
}

function deleteSelf() {
    closeEditField();
    stuData.splice(nowEditing,1);
    const toDelete=document.getElementsByClassName("body-row")[nowEditing];
    toDelete.remove();
    const saveAllBtn=document.getElementById("save-all-btn");
    saveAllBtn.style.backgroundColor="#00639C";
    saveAllBtn.style.color="#ffffff";
    for (let i = 0; i < tableRows.length; i++) {
        tableRows.item(i).addEventListener("click",()=>{
            openEditField(i);
        });
    }
}

function openAddNav() {
    const lastStu=stuData[stuData.length-1]
    const newStuID=lastStu["id"]+1;
    const newStuPassword="stu"+newStuID;

    const idTextField=document.getElementById("id-text-field");
    const passwordTextField=document.getElementById("password-text-field");

    idTextField.value=newStuID;
    passwordTextField.value=newStuPassword;

    const addView=document.getElementById("add-view");
    addView.style.display="block";
}

function closeAddNav() {
    const addView=document.getElementById("add-view");
    addView.style.display="none";
}

function addStu() {
    const lastStu=stuData[stuData.length-1]
    const newStuID=lastStu["id"]+1;
    const newStuPassword="stu"+newStuID;

    const nameTextField=document.getElementById("name-text-field");
    const mathTextField=document.getElementById("math-text-field");
    const englishTextField=document.getElementById("english-text-field");
    const physicsTextField=document.getElementById("physics-text-field");

    const newStu={
        id:newStuID,
        password:newStuPassword,
        name:nameTextField.value,
        math:parseFloat(mathTextField.value),
        english:parseFloat(englishTextField.value),
        physics:parseFloat(physicsTextField.value)
    }

    stuData.push(newStu)

    const indexTD = "<td>" + (stuData.length-1).toString() + "</td>";
    const idTD = "<td>" + newStu["id"] + "</td>";
    const nameTD = "<td>" + newStu["name"] + "</td>";
    const mathTD = "<td>" + newStu["math"] + "</td>";
    const englishTD = "<td>" + newStu["english"] + "</td>";
    const physicsTD = "<td>" + newStu["physics"] + "</td>";

    const newStuTable="<tr class=\"body-row\">" + indexTD + idTD + nameTD + mathTD + englishTD + physicsTD + "</tr>";


    const bodyRow=document.getElementById("table-body");
    bodyRow.innerHTML+=newStuTable;

    tableRows.item(tableRows.length-1).addEventListener("click",()=>{
        openEditField(tableRows.length-1);
    });

    const addView=document.getElementById("add-view");
    addView.style.display="none";

    const saveAllBtn=document.getElementById("save-all-btn");
    saveAllBtn.style.backgroundColor="#00639C";
    saveAllBtn.style.color="#ffffff";
}