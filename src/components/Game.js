import React, { useState } from 'react'
import "./Game.css";
import pngSchere from '../assets/icons8-scissors-100.png';
import pngStein from '../assets/icons8-rock-100.png';
import pngPapier from '../assets/icons8-toilet-paper-100.png';
import pngVersus from '../assets/versus.png';

const TYPE = {
    SCHERE: 1,
    STEIN: 2,
    PAPIER: 3
}
const RESULT = {
    WIN: true,
    LOSS: false,
    DRAW: -1
}

export const Game = () => {
    const [display, setDisplay] = useState(false);
    const [AIpick, setAIpick] = useState();
    const [pPick, setPPick] = useState();
    const [result, setResult] = useState();

    const [pCount, setPCount] = useState(0);
    const [aiCount, setAICount] = useState(0);

    let playerPick = (playerPick) => {
        setDisplay(true);
        setPPick(playerPick);
        let result = validateResult(playerPick, pickAI());
        setResult(result);

        if (result === RESULT.WIN) {
            console.log('player won')
            setPCount(pCount + 1)
        } else if(result === RESULT.LOSS){
            console.log('ai won')
            setAICount(aiCount + 1);
        }else {
            console.log('DRAW')
        }
        console.log(`Stand ${pCount}:${aiCount}`)
    }

    let pickAI = () => {
        let ai = Math.floor(Math.random() * 3) + 1;
        setAIpick(ai);
        return ai;
    }

    let validateResult = (player, ai) => {
        console.log('player picked: ', player, 'ai picked: ', ai)
        if(player === ai ) return RESULT.DRAW;
        if (player === TYPE.STEIN && ai === TYPE.SCHERE) return RESULT.WIN;
        if (player === TYPE.PAPIER && ai === TYPE.STEIN) return RESULT.WIN;
        if (player === TYPE.SCHERE && ai === TYPE.PAPIER) return RESULT.WIN;
        return RESULT.LOSS;
    }

    return (
        <div>
            <h1>Schere Stein Papier <br /></h1>
            <div className="row">
                <button onClick={() => playerPick(TYPE.SCHERE)}>
                    <img src={pngSchere} alt="Schere" />
                </button>
                <div className="divider"></div>
                <button onClick={() => playerPick(TYPE.STEIN)}>
                    <img src={pngStein} alt="Schere" height="100" width="100" />
                </button>
            </div>
            <div className="divider"></div>
            <button className="btnCenter" onClick={() => playerPick(TYPE.PAPIER)}>
                <img src={pngPapier} alt="Schere" height="100" width="100" />
            </button>
            {display ?
                <ResultBox result={result} AIpick={AIpick} pPick={pPick} />
                : null
            }
            {display ?
                <p className="big"> <b>{pCount} : {aiCount} </b></p>
                : null
            }
        </div>
    )
}

const ResultBox = (props) => {
    let aiImage = pngPapier;
    let playerImage = pngPapier;
    let text;
    let animateWinLoss;
    

    if (props.pPick === props.AIpick) {
        text = 'Unentschieden!';
        animateWinLoss="";
    } else if (props.result) {
        text = 'Spieler hat Gewonnen!';
        animateWinLoss="heartbeat"
    } else {
        text = 'Spieler hat Verloren!';
        animateWinLoss="shake-horizontal"
    }

    if (props.AIpick === TYPE.SCHERE) {
        aiImage = pngSchere;
    } else if (props.AIpick === TYPE.STEIN) {
        aiImage = pngStein;
    }

    if (props.pPick === TYPE.SCHERE) {
        playerImage = pngSchere;
    } else if (props.pPick === TYPE.STEIN) {
        playerImage = pngStein;
    }

    return (
        <div className={animateWinLoss}>
            <hr />
            <button><img src={playerImage} alt={playerImage} height="100" width="100" /></button>
            <img src={pngVersus} alt="versus" hight="80px" width="80px" />
            <button className='ai'><img src={aiImage} alt={aiImage} height="100" width="100" /></button>
            <div className="divider"></div>
            <h1>{text}</h1>
            <hr />
        </div>
    )
}