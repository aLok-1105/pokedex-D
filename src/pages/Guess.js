import React, { useState } from 'react'
import Typewriter from 'typewriter-effect';

import LOADER from '../gif/loader.gif'
import WIN from '../gif/win.gif'
import NEXT from '../gif/next.gif'
import WRONG from '../gif/wrong.gif'


export default function Guess() {

    const v = Math.floor(Math.random() * (1000 - 1)) + 1;


    const [img, setImg] = useState(`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${v < 10
    ? '00' + v
    : v < 100
    ? '0' +v
    : +v}.png`);
    const [name, setName] = useState('');

    const [input, setInput] = useState('');
    const [check, setCheck] = useState(-1);
    const [loading, setLoading] = useState(false);


    const reset = ()=>{
        setLoading(true);
        setImg(`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${v < 10
            ? '00' + v
            : v < 100
            ? '0' +v
            : +v}.png`);
            
            fetch(`https://pokeapi.co/api/v2/pokemon/${v}`).then((res)=>res.json()).then((result)=>{
                // console.log(result);
                setLoading(false);
                setName(result.name)});
                setCheck(-1);
                setInput('');
            }

    const handleClick = (()=>{
        setLoading(true);
        if(name === input.toLocaleLowerCase() && input.length >0){
            setCheck(1);
            setTimeout(() => {
                    setCheck(-1);
                }, 10000);
        }
        else{
            setCheck(0);
            if ("vibrate" in navigator) {
                // vibration API supported
              navigator.vibrate(5000);
            }
            setTimeout(() => {
                setCheck(-1);
            }, 10000);
        }
        setLoading(false);

    })


    const handleKeyDown = (e)=>{
        if(e.key === 'Enter'){
            handleClick();
        }
    }

    const bgImg = (()=>{
        if(check === 1){
            return WIN
        }
        else if(check===0){
           return WRONG
        }
        else{
           return ''
        }
    })

    console.log(bgImg());


  return (
    <>  
        {
            !loading ?
          
        <div className='guess-cont position-relative' style={{backgroundImage: `url(${bgImg()})`, backgroundPosition: 'center'}}>
        <div>
            <h1>
                Guess the Pokemon&#160;
                <Typewriter
                    options={{
                        strings: ['Bulbasaur', 'Charizard', 'Pikachu', 'Mewtwo'],
                        autoStart: true,
                        loop: true,
                    }}
/>
            </h1>
        </div>

        <div className='search-home guess-form mt-0'>
					<img style={{ width: '61px', marginLeft: '-5px'}} className='search-icon' src='https://i.pinimg.com/originals/43/f8/7b/43f87bf85fd8ec237f5ce8af1634692f.gif' alt='pokeball'/>
					<input
						className='home-search-bar'
						type='text'
						value={input}
						onChange={(e)=>(setInput(e.target.value))}
                        onKeyDown={handleKeyDown} 
						placeholder='Guess the name'
                        style={{paddingLeft: '50px'}}
					/>
                    
		</div>
                

                <div className='action-btn'>
                <div className='check-btn-cont'>
                    <button className='check-btn' type='button' onClick={handleClick}>CHECK</button>
                </div>
                <div className='reset-btn'>
                    <button type='button' className='next-btn' onClick={reset}>NEXT </button>
                    <img src={NEXT} className='next-img' alt='next'/>
                </div>
                </div>

                <div className='guess-img-cont'>
                    <img src={img} alt='img' className='guess-img' style={{filter: check===1 ?  'brightness(1)' :'brightness(0)'}} />
                </div>
                </div>
            :
            <>
            <div className='loader-cont'>
                <img src={LOADER} alt='Loading...' style={{width: '50px'}}/>
            </div>

            </>
        }

        
    </>
  )
}
