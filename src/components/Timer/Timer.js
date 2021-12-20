import { html } from '../../shared';
import styles from './Timer.module.css';

/**
 * @param {{ ms: number, onElapsed: () => void }} props
 * @returns {HTMLElement}
 */

const startingMinutes = 1;
let time = startingMinutes * 60;

setInterval(Timer, 1000)

function Timer() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    let countdown = '';

    const displayTimer = html`<div class="${styles.container}">
    <p>pozostały</p>
    <svg width="225" height="225" fill="none" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
        <circle class="ellipse5" cx="100" cy="100" r="100" />
        <circle class="ellipse6" cx="100" cy="100" r="100" />
        <text id="${styles.counter}" x="50%" y="50%" text-anchor="middle" dy=".4em">${countdown}</text>
    </svg>
    <p>czas</p>
    </div>`
  
    if (seconds <10) {
      countdown = `${minutes}:0${seconds}`
    }
  
    if (minutes === 0 && String(seconds) === '00') {
        return countdown = '0:00';
    } else {
        countdown = `${minutes}:${seconds}`;
    };
    
    time--;

    // @ts-ignore
    return displayTimer;
  }


export { Timer };
