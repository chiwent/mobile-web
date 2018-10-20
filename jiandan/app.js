//import "./src/style.scss";
//import "./src/reset.css";
require('./src/style.scss');
//require('./src/reset.css');


let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
let htmlDOM = document.getElementsByTagName('html')[0];
htmlDOM.style.fontSize = htmlWidth / 10 + 'px';

window.addEventListener('resize', (e) => {
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;

  htmlDOM.style.fontSize = htmlWidth / 10 + 'px';

})

