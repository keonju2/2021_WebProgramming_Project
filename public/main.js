
let target=document.querySelector("#dynamic");

function randomString(){
    let stringArr="우리가 만들어가는 우리 둘만의 이야기"
    let selectStringArr=stringArr.split(""); 

    return selectStringArr
}

function resetTyping(){
    target.textContent="";

    dynamic(randomString());
}

function dynamic(randomArr){
    if(randomArr.length>0){
        target.textContent+=randomArr.shift();
        setTimeout(function(){
            dynamic(randomArr);
        },80);
    }else{
        setTimeout(resetTyping,3000);
    }
}

dynamic(randomString());

function blink(){
    target.classList.toggle("active");
}

setInterval(blink,500);

function newPage() {
    window.location.href='login.html'
}
