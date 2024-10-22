let tab_content = document.querySelectorAll("tab-content"); /*pega a lista com todas as abas*/
let tab_btn = document.querySelectorAll("nav>button"); /*pega todos os botoes de aba*/
let banner_title = document.querySelector("banner-text>h1");
let banner_subtitle = document.querySelector("banner-text>h2");
let banner_img = document.querySelector("header>img");
tab(0);
function tab(sel){
    for(i = 0 ; i < tab_content.length; i++){
        tab_content[i].style.display = "none";
        tab_btn[i].id = "";
    }
    banner_title.innerText = tab_content[sel].getAttribute("tab-title");
    banner_subtitle.innerText = tab_content[sel].getAttribute("tab-desc");
    banner_img.src = tab_content[sel].getAttribute("banner-image");
    tab_content[sel].style.display = "flex";
    tab_btn[sel].id = "active";
}