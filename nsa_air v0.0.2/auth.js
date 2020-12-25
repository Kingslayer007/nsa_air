// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    //console.log(specificReader('utilisateur', user.email));
    gererRole(user);
    db.collection('football_clubs').get().then(snapshot => {
      setupGuides(snapshot.docs);
      //setupUI(user);
    });
  } else {
    setupUI(null,'guest');
    setupGuides([]);
  }
})

//add a a single data to db
function addToDB(collection, document, data){
  db.collection(collection).doc(document).set(data).then(function() {
    console.log("Document successfully written!");
});
}


function gererRole(user){
  db.collection('utilisateur').doc(user.email).get().then((doc) =>{
      if (doc.exists){
        setupUI(user, doc.data().profile_type);
      }
      else{
        setupUI(user, "guest");
        console.log("not a user at all");
      }
  });
}


//read a user data, alert full name and return role
function specificReader(collection, document){
  var docRef = db.collection(collection).doc(document);
  let role;
  var p = docRef.get();
  p.then(function(doc) {
    let roleP = new Promise((resolve, reject) => {
        if (doc.exists) {
            alert("Bienvenue "+ doc.data().first_name +" "+ doc.data().last_name);
            role = doc.data().profile_type;
            resolve(role);
        } else {
            // doc.data() will be undefined in this case
            alert("No such document!");
            reject('Error');
        }
    })
    
  }).catch(function(error) {
      alert("Error getting document:"+ error);
  });

  return p;
}

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
  const fname = signupForm['signup-fname'].value;
  const lname = signupForm['signup-lname'].value;
  const identityCode = signupForm['signup-identity'].value;
  const identityType = signupForm['signup-identity-type'].value;
  const data = {
    first_name : fname,
    last_name : lname,
    login : email,
    identity_code : identityCode,
    identity_type : identityType,
    profile_type : 'user0'
  };
  // sign up the user
  auth.createUserWithEmailAndPassword(email, password)
  .then(cred => {
    
    addToDB('utilisateur',email,data);
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  })
  .catch((e) => {
    alert('There has been an error, please check your info and try again! \n'+e);
  })
});


// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});


// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {

    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  }).catch((e) => {
    alert('There has been an error, please check your info and try again! \n'+e);
  })

});


//gerer utilisateur
const gerer_utilisateur = document.querySelector('#gerer_utilisateur');
gerer_utilisateur.addEventListener('click', (e) => {
  e.preventDefault();
  manageUser();
});


//gerer vol
const gerer_vol = document.querySelector('#gerer_vol');
gerer_vol.addEventListener('click', (e) => {
  e.preventDefault();
  manageVol();
});


const account = document.querySelector('#account');
account.addEventListener('click', (e) => {
  e.preventDefault();
  auth.onAuthStateChanged(user => {
    if (user) {
      db.collection('utilisateur').doc(user.email).get().then((doc) =>{
        if (doc.exists){
          setupProfil(doc);
        }
        else{
          console.log("not a user at all");
        }
    });
    } else {
      
    }
  })
});



