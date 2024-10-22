let jsondata;

notify(window.location.href);


const jsondata_default = {
    "settings" : {
        "accentcolor":"crismon", 
        "background":"black",
        "border_radius":24,
        "search_provider":"https://duckduckgo.com/?q="
    },
    "bookmarks" : [
        {
            "name":"facebook",
            "url":"https://facebook.com"
        },
        {
            "name":"twitter",
            "url":"https://twitter.com"
        },
        {
            "name":"google",
            "url":"https://google.com"
        }
    ]
}
/*:::::leitura dos dados::::::*/
if(localStorage.getItem("ntp_data") == undefined){/*se não tiver dados salvos, carrega as config padrao*/
    jsondata = jsondata_default; 
    saveChanges();
}
else{/*se tiver dados salvos, carregue-os*/
    jsondata = JSON.parse(localStorage.getItem("ntp_data"));
    jsondata.bookmarks = jsondata.bookmarks.filter(item => item != undefined);/*filtrar dados invalidos*/

}
for(i=0; i<jsondata.bookmarks.length; i++){/*gerar lista de favoritos no html*/
    addBookmark(jsondata.bookmarks[i].name, jsondata.bookmarks[i].url, i);
}
/*aplica as configuracoes de aparencia*/
document.body.style.setProperty("--accentcolor", jsondata.settings.accentcolor);
document.getElementById("background").src = jsondata.settings.background;
document.body.style.setProperty("--border-radius", jsondata.settings.border_radius);

/*:::::funcoes:::::*/
function contextMenu(bookmarkElement){/*funcao do botao de remover nos favoritos*/
    let btn_delfav = openWindow("window_removefav");
    btn_delfav.addEventListener("click", () => {
        document.body.appendChild(btn_delfav);
        btn_delfav.style.display = "none";
        jsondata.bookmarks[bookmarkElement.getAttribute("bookmark_index")] = null;
        bookmarkElement.remove();
        saveChanges();
        notify("🗑 Favorito deletado!");
    });
    bookmarkElement.appendChild(btn_delfav);
}
function addBookmark(name, url, index){/*funcao para adicionar favorito no html ou salvar*/
    let bookmarkList = document.getElementById("bookmarks");
    let bookmarkElement = document.createElement("a");
    bookmarkElement.className = "btn_bookmark flex collumn center";
    bookmarkElement.href = url;
    let bookmarkElementFavicon = document.createElement("img");
    bookmarkElementFavicon.src = "https://www.google.com/s2/favicons?domain="+url;
    bookmarkElement.innerText = name;
    bookmarkElement.appendChild(bookmarkElementFavicon);
    bookmarkElement.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        contextMenu(e.currentTarget);
    });
    /*
    Se o index for especificado, ele n ira salvar alteracoes no database
    Se nao for especificado (index < 0), ele ira gerar um novo index
    com base nos dados ja existentes e ira salvar o novo favorito
    */
    if(index >= 0){
        bookmarkElement.setAttribute("bookmark_index", index);
    }
    else{
        bookmarkElement.setAttribute("bookmark_index", jsondata.bookmarks.push({"name":name,"url":url})-1);
        closeWindows(); 
        notify("❤ Favorito criado!");
        saveChanges();
    }
    bookmarkList.appendChild(bookmarkElement);/*insere o elemento do favorito no html*/
    bookmarkList.appendChild(document.querySelector("#btn_addfav"));/*coloca o botao Adicionar por ultimo*/
}
function search(search_content){/*funcao do campo de busca*/
    window.location.href = jsondata.settings.search_provider+search_content.replaceAll(" ", "+");
}
function openWindow(x){/*funcao para abrir uma janela ou overlay pelo seu id*/
    let window = document.getElementById(x);
    if(window.style.display == "flex"){
        window.style.display = "none";
    }
    else{
        window.style.display = "flex";
    }
    return window;
}
function closeWindows() {/*fecha todas as janelas/overlays abertas*/
    let all_window = document.querySelectorAll("window-container");
    for(i=0; i < all_window.length; i++){
        all_window[i].style.display = "none";
    }
}
function saveChanges(){/*grava alteraçoes no localstorage*/
    localStorage.setItem("ntp_data", JSON.stringify(jsondata));
}
function notify(x) {/*toast de notificacao simples*/
    let notifyElement = document.createElement("div");
    notifyElement.innerText = x;
    notifyElement.className = "notify"
    document.body.appendChild(notifyElement);
    setTimeout(() => {notifyElement.remove()}, 5000);
}

/*qualquer alteração feita na tela de configuraçoes, ele ira salva-las automaticamente*/
document.querySelector("window-container#settings").addEventListener("change", () => {
    saveChanges();
});
document.querySelector("#i_accentcolor").addEventListener("change", (e) => {
    jsondata.settings.accentcolor = e.target.value;
    document.body.style.setProperty("--accentcolor", e.target.value);
});
document.querySelector("#i_background").addEventListener("change", (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function() {
        document.getElementById("background").src = reader.result;
        jsondata.settings.background = reader.result;
        console.log(reader.result)
        saveChanges();
    }
});
document.querySelector("#i_search_provider").addEventListener("input", (e) => {
    jsondata.settings.search_provider = e.target.value;
});
document.querySelector("#i_border_radius").addEventListener("input", (e) => {
    jsondata.settings.border_radius = e.target.value+"px";
    document.body.style.setProperty("--border-radius", e.target.value+"px");
});