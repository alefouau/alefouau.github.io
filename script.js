let data;
fetch('./data.json').then((res)=>{
    res.json().then((jsonRes)=>{
        data = jsonRes;
        console.log(data);
        genProjCard(data.projects);
        genPostsCard(data.posts);
        document.getElementById('random_text').innerText = data.rphrases[Math.floor(Math.random()*data.rphrases.length)];
    })
})
function genPostsCard(postsArray){
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
    })
}
function genProjCard(projsArray){
    projsArray.forEach(project => {
        newEl = document.createElement('div');
        newEl.classList = "proj_card"
        let buttons = "";
        if(project.github){
            buttons += `<a href="${project.github}">Source code</a>`;
        }
        if(project.open){
            buttons += `<a href="${project.open}">Open</a>`;
        }
        if(project.download){
            buttons += `<a href="${project.download}">Download</a>`;
        }
        newEl.innerHTML = `
            <img src="${(project.icon) ? project.icon : "img/proj.png"}">
            <div>
                <header>
                    <h4>${project.name}</h4>
                    <code>${project.version}</code>
                </header>
                <main>
                    <p>${project.desc}</p>
                </main>
                <footer>
                    ${buttons}
                </footer>
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