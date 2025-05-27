let data;
fetch('./data.json').then((res)=>{
    res.json().then((jsonRes)=>{
        data = jsonRes;
        genProjCard(data.projects);
        //genPostsCard(data.posts);
        document.getElementById('random_text').innerText = data.rphrases[Math.floor(Math.random()*data.rphrases.length)];
    })
})
function genPostsCard(postsArray){
    if(postsArray.length > 0) {
        postsArray.forEach(post => {
            let fulldate = new Date(Date.parse(post.date+" "+post.time.replaceAll('-',':'))).toLocaleTimeString("pt-br",{year:"numeric", month:"long",day:"numeric"});
            newEl = document.createElement('div');
            newEl.classList = "post_card";
            newEl.innerHTML = `
                <a href="posts/${post.date}_${post.time}/">
                <img src="posts/${post.date}_${post.time}/banner.webp">
                <div>
                    <h3>${post.title}</h3>
                    <p>${post.desc}</p>
                    <code>${fulldate}</code>
                </div>
                </a>
            `
            document.getElementById("post_list").appendChild(newEl);
        });
        document.querySelector("#post_list > .loading").remove();
    }
    else {
        
    }

}
function genProjCard(projsArray){
    projsArray.forEach(project => {
        newEl = document.createElement('div');
        newEl.classList = "proj_card";
        let buttons = "";
        project.buttons.forEach(e=>{
            buttons+=`<a href="${e.link}">${e.label}</a>`
        })
        newEl.innerHTML = `
            <div class="proj_header">
                <img src="${project.icon}">
                <div>
                    <h3>${project.name}</h3>
                    <span class="proj_card_version">${project.version}</span>
                </div>
            </div>
            <div class="proj_main">
                <p>${project.desc}</p>
            </div>
            <div class="proj_footer">
                ${buttons}
            </div>
        `;
        document.getElementById('proj_list').appendChild(newEl);
        
    });
}
function wanumber(){
    dialog = document.createElement('dialog');
    dialog.innerHTML = `
    <form action="https://api.whatsapp.com/send/">
    <input type="phone" name='phone' placeholder="Country + DDD + Phone Number">
    <input type="text" name='text' placeholder="Message text">
    <input type="password" name="psswd" id="">
    <button type="submit">Ok</button>
    </form>`;

    document.body.appendChild(dialog);
    dialog.showModal();
}