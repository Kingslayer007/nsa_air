// DOM elements
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const loggedInOutLinks = document.querySelectorAll('.logged-in-out');
const loggedInAdminLinks = document.querySelectorAll('.logged-in-admin');
const loggedInEmpLinks = document.querySelectorAll('.logged-in-emp');
const loggedInUserLinks = document.querySelectorAll('.logged-in-user');

const setupUI = (user,role) => {
  if (user) {
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
    if (role == "admin"){
      loggedInAdminLinks.forEach(item => item.style.display = 'block');
      loggedInOutLinks.forEach(item => item.style.display = 'none');
    }
    else if (role == "emp"){
      loggedInEmpLinks.forEach(item => item.style.display = 'block');
      loggedInOutLinks.forEach(item => item.style.display = 'none');
    }
    else if (role == "user"){
      loggedInUserLinks.forEach(item => item.style.display = 'block');
      loggedInOutLinks.forEach(item => item.style.display = 'block');
    }
    else if (role == "guest"){
      loggedInOutLinks.forEach(item => item.style.display = 'block');
      
    }
  } else {
    // toggle user elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
    loggedInAdminLinks.forEach(item => item.style.display = 'none');
    loggedInEmpLinks.forEach(item => item.style.display = 'none');
    loggedInUserLinks.forEach(item => item.style.display = 'none');
    loggedInOutLinks.forEach(item => item.style.display = 'block');

  }
};



// setup guides
const setupGuides = (data) => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const guide = doc.data();
      const li = `
        <li>
          <div class="collapsible-header grey lighten-4"> ${guide.club_name} </div>
          <div class="collapsible-body white"> 
            <b>Nationality: </b>${guide.nationality}</br> 
            <b>League: </b>${guide.current_league}</br>
            <b>Total local trophies: </b>${guide.total_local_trophies}</br>
            <b>Total International trophies: </b>${guide.total_international_trophies}</br>
            <b>Top scorer: </b>${guide.top_scorer}</br>
          </div>
        </li>
      `;
      html += li;
    });
    guideList.innerHTML = html
  } else {
    guideList.innerHTML = '<h5 class="center-align">Login to view guides</h5>';
  }
  

};



document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });