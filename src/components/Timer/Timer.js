import { html } from '../../shared';
import styles from './Timer.module.css';

/**
 * @param {{ startingMinutes: number, onFinish: () => void }} props
 * @returns {HTMLElement}
 */

function Timer({ startingMinutes, onFinish }) {

  let count = startingMinutes * 60,
    counting;

  const counter = html`<span class="${styles.counter}">00:00</span>`;

  let formatDuration = (time) => {
    let timeObj = new Date(time * 1000);

    function checkIfLessThan10(timeUnit) {
      return timeUnit < 10 ? `0${timeUnit}` : timeUnit;
    }

    let mm = checkIfLessThan10(timeObj.getUTCMinutes());
    let ss = checkIfLessThan10(timeObj.getUTCSeconds());
    return `${mm}:${ss}`;
  }

  counter.textContent = formatDuration(count);

  let changeDuration = () => {
    count -= 1;
    counter.textContent = formatDuration(count);
    if (count == 0) {
      finishCounting();
      onFinish();
    }
  }

  let processCounting = () => {
    counting = setInterval(changeDuration, 1000);
  }

  let finishCounting = () => {
    clearInterval(counting);
  }

  processCounting();

  const svg = html`
  <div class="${styles.timerOuterWrapper}">
  ${counter}
    <div class="${styles.timerInnerWrapper}">
      <svg width="200" height="200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="98" cy="98" r="86.5" stroke="#B2FF59" stroke-width="15"/>
        <g filter="url(#a)">
          <circle class="${styles.circle}" cx="98" cy="98" r="86.5" stroke="#fff" stroke-width="15" shape-rendering="crispEdges"/>
        </g>
        <defs>
          <filter id="a" x="0" y="0" width="200" height="200" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_65_277"/>
            <feBlend in="SourceGraphic" in2="effect1_dropShadow_65_277" result="shape"/>
          </filter>
        </defs>
      </svg>
    </div>
  </div>`;

  const displayTimer = html`<div class="${styles.container}">
    <p class="${styles.text}">pozostały</p>
      ${svg}
    <p class="${styles.text}">czas</p>
  </div>`


  const passAnimationDuration = () => {
    const root = document.querySelector(':root');
    root.style.setProperty('--animation-time', `${count}s`);
  }

  passAnimationDuration();

  return displayTimer;
}


export { Timer };
