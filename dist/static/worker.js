//可以使用xhr 也可以使用WebSocket
addEventListener('message',(e)=>{
    var s = e.data;
    var timer = setInterval(()=>{
       s--;
       postMessage(s);
       if(s==0){
           clearInterval(timer);
           close();
       }
   },1000)
});