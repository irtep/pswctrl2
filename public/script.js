import { addNewEntry, copyToClipboardMsg } from './functions.js';
import { firebaseConfig, psws } from './config.js';
const allDivs = document.getElementById('container');
const passInput = document.getElementById('passInput');
const passAsker = document.getElementById('passAsker');
const infoScreen = document.getElementById('infoScreen');
const downLeft = document.getElementById('downLeft');
const downRight = document.getElementById('downRight');
const checkingPass = document.getElementById('passInput').addEventListener("change", checkPass);
const sendNewEntry = document.getElementById('sendNew').addEventListener('click', addNewEntry);
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
let allData = [];

// this copies username
function copyUNF() {
  const unSpace = document.getElementById('userNameHere');
  //console.log('copy un');
  copyToClipboardMsg(unSpace, "msg");
}

// this shows data of the clicked information
function showData(clickedElement) {
  //console.log('clicked: ', clickedElement.target.id);
  // find the data:
  allData.forEach( (dataEntry, idx) => {
    //console.log('comparing: ', dataEntry.id, clickedElement.target.id);
    if (dataEntry.id === clickedElement.target.id) {
      // add data
      const correctEntry = allData[idx];
      console.log('de ', allData[idx]);
      downRight.innerHTML = `${correctEntry.site}<br> <div id= "userNameHere">${correctEntry.userName}</div>
      <input type= "button" value= "copy username" id= "cUn">
      <br><div id= "pswSpace" class= "silverText">${correctEntry.psw}</div>`;
      // event listener for input button
      const listenUNcopier = document.getElementById('cUn').addEventListener('click', copyUNF);
      // copy to clipboard
      copyToClipboardMsg(pswSpace, "msg");
      window.scrollTo(0, 0);
    }
  });
};

function checkPass(pass) {
    // password ok.
    if (pass.target.value === psws) {
      // correct pw
      infoScreen.innerHTML = '';
      passAsker.classList.add('invis');
      allDivs.classList.remove('invis');
      infoScreen.innerHTML = 'odota, että dataBase on valmis...';
      // make db search and add the data
      db.collection("pswFiles").get().then((querySnapshot) => {
        /*
        allData.forEach( data => {
          //data.question
          // add question to page
          downLeft.innerHTML += `<p id= ${data._id} class= "clickable">${data.site}</p>`;
          // add event listener to this
          const elements = document.getElementsByClassName('clickable');
          for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', showData, false);
          }
        });
        */
        querySnapshot.forEach((doc) => {
          //console.log(`${doc.id} => ${doc.data().site} => ${doc.data().userName}`);
          // add entry to allData
          // {site: newQuestion.value, userName: newUsername.value, psw: newResponse.value}
          const newEntry = {id: doc.id, userName: doc.data().userName, psw: doc.data().psw, site: doc.data().site};
          allData.push(newEntry);
          //console.log('allData: ', allData);
          // add question to page
          downLeft.innerHTML += `<p id= ${doc.id} class= "clickable">${doc.data().site}</p>`;
          // add event listener to this
         const elements = document.getElementsByClassName('clickable');
         for (var i = 0; i < elements.length; i++) {
          elements[i].addEventListener('click', showData, false);
         }
        });
        infoScreen.innerHTML = 'database ready!'
        //console.log('allData', allData);
      });
    } else {
      infoScreen.innerHTML = 'wrong password!';
      //console.log('xxx', pass.target.value, psws);
    };

    /* NODE VERSION DISABLED FOR NOW AS I WANT TO USE FIRESTORE
    const passu = pass.target.value;
    const http = new XMLHttpRequest();
    const url = '/showAll';
    let params = 'MSG=' + passu;
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = () => {
      if (http.readyState == 4 && http.status == 200) {
        const records = JSON.parse(http.responseText);
        //console.log('got records', records);
        if (records === 'wrong password') {
          infoScreen.innerHTML = 'wrong password!';
        } else {
          // correct pw
          infoScreen.innerHTML = '';
          passAsker.classList.add('invis');
          allDivs.classList.remove('invis');
          allData = records;
          allData.forEach( data => {
            //data.question
            // add question to page
            downLeft.innerHTML += `<p id= ${data._id} class= "clickable">${data.site}</p>`;
            // add event listener to this
            const elements = document.getElementsByClassName('clickable');
            for (var i = 0; i < elements.length; i++) {
              elements[i].addEventListener('click', showData, false);
            }
          });
        }
      }
    }
    http.send(params);
    */
}
window.onload = (()=> {
  const allDivs = document.getElementById('container');
  allDivs.classList.add('invis');
});
