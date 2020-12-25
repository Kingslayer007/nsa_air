// DOM elements
const sidenav = document.querySelector(".profil");

// setup profil
const setupProfil = (data) => { 
    let html = "";
      const user = data.data();
      const li = `
      <div class="row valign-wrapper">
        <div class="col s2">
          <img src="img/user.png" class="circle responsive-img"> 
        </div>
        <div class="col s10">
          <span class="black-text">
            ${user.first_name} ${user.last_name}
          </span></br>
          <span class="black-text">
            ${user.profile_type}
          </span></br>
          <span class="black-text">
            ${user.login}
          </span>
        </div>
      </div>
      `;
      html += li;
    
    sidenav.innerHTML = html;
  
};
