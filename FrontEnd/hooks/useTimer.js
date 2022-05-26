import { useState, useEffect } from "react";
const useTimer = ([H, M, S]) => {
    const [counting, setCounting]= useState(true);
    var [seconds, setSeconds]= useState(S);
    var [minuts, setMinuts]= useState(M);
    var [hours, setHours]= useState(H);

    useEffect(()=>{    
        var timer = setInterval(()=>{
            seconds = seconds == 0 ? 59 : seconds;
            setSeconds(seconds--);
            if(hours != 0 || minuts != 0){
                minuts = minuts == 0 ? 60 : minuts;
                if(seconds == 58 ){
                    minuts--;
                    setMinuts(minuts);         
                }
            }           
            if(hours != 0 && minuts == 59 && seconds == 58){ 
                    hours--;               
                    setHours(hours);
            }
            if(hours == 0 && minuts == 0 && seconds == 0) {
                clearInterval(timer);
                setCounting(false)
            }
        },1000);      
    },[])
    return { hours, minuts, seconds, counting};
}
 
export default useTimer;