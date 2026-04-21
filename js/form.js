// LOADER
window.onload = ()=>{
setTimeout(()=>{
document.getElementById('loader').style.display='none';
},1200);
}

// FORM
document.getElementById('joinForm').addEventListener('submit',function(e){
e.preventDefault();
alert("Thank you for joining Wadada Youth Ambassadors");
this.reset();
});

// NAVBAR
window.addEventListener('scroll',()=>{
let nav=document.getElementById('navbar');
if(window.scrollY > 50){
nav.classList.add('nav-scrolled');
}else{
nav.classList.remove('nav-scrolled');
}
});

// REVEAL
function reveal(){
let reveals=document.querySelectorAll('.reveal');
reveals.forEach(el=>{
let top=el.getBoundingClientRect().top;
if(top < window.innerHeight - 100){
el.classList.add('active');
}
});
}
window.addEventListener('scroll',reveal);


reveal();

// COUNTERS
const counters=document.querySelectorAll('.counter');

counters.forEach(counter=>{
let updateCount=()=>{
let target=+counter.getAttribute('data-target');
let count=+counter.innerText;

let speed=50;
let inc=target/speed;

if(count < target){
counter.innerText=Math.ceil(count + inc);
setTimeout(updateCount,40);
}else{
counter.innerText=target + "+";
}
}
updateCount();
});