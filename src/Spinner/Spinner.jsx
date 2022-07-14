import React, {useState, useEffect} from 'react'
import RewardModal from '../Modal/RewardModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Example from '../Modal/RewardModal';

const Spinner = ({ timer, playClicked, resetSpinner, num, finishHandler, setResetSpinner, gameStateResponse }) => {

    const [spinner, setSpinner] = useState({
      position: 0,   //+230 ki distance pe hai sb items 
      timeRemaining: timer //kitne time bad the spinner will stop
    });
    const [checkTick, setCheckTick] = useState(0)
    const [checkAck, setCheckAck] = useState(false)
  
    const iconHeight = 230;
    
    // can change multiplier ki value -> accordingly moved items bhi track krne honge
    let multiplier = 1
    const speed = iconHeight * multiplier;

    useEffect(() => {
      if(playClicked > 0 && playClicked<= 3){
        reset()
        setCheckAck(false)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playClicked])

  
    const reset = () => {
      setSpinner({
        position: 0,
        timeRemaining: timer
      });
  
      if( spinner.timeRemaining > 0) {
        setInterval(() => {  
            setCheckTick(prev => prev+1) 
        }, 100);
      }
    };

    const moveBackground = () => {
      setSpinner(prev => { return {
        position :  Math.abs((prev.position + parseInt(speed))%2300),
        timeRemaining : prev.timeRemaining - 230
      }
      });
    };
  
    const startPos = () => {
      clearInterval()
      setResetSpinner(prev => false)
      setSpinner(prev => { return {
        position : 0,
        timeRemaining : 0
      }
      });
    }


    const getSymbolFromPosition = () => {        
      if( num === 3 && spinner.timeRemaining === 0 ) {
        if(checkAck === false){
          setCheckAck(true)
          setTimeout(()=> {
            setResetSpinner(prev => true)
          },2000)
          finishHandler()
        }
      }
    };
    

    useEffect(() => {
      if(checkTick > 0) {
        if (spinner.timeRemaining <= 0) {
          getSymbolFromPosition();
          // clearInterval(checkTick)
        } else {
          moveBackground();
        }
      } else return
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkTick]);


    useEffect(()=>{
      setTimeout(() => {
          startPos()
        }, 5000)
    },[resetSpinner])


    
    let { position } = spinner;  
    
    return (
     <>
        <div
          style={{ backgroundPosition: "0px " + position + "px" }}
          className={`icons`}
        ></div>
        <ToastContainer />
     </>
    );
  };

export default Spinner
