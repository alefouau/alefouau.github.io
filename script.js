
function goto(x){
    var tabContent = document.getElementsByClassName('tab_content'); // isso retorna um array com todos os elementos com a classe "tab_content"
    var tabBtn = document.getElementsByClassName('tab_btn');
    //ocuta todos os elementos da classe tabcontent e exibe a aba selecionada (x)
    for (i = 0; i < tabContent.length ; i++){
	tabContent[i].opacity = "0.0";
        tabContent[i].style.display = "none";
        tabBtn[i].id = "inactive";
    }
    tabContent[x].style.display = "block";
    tabContent[x].opacity = "1.0";
    tabBtn[x].id = "active";
}