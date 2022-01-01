import { html } from '../../shared';
import styles from './Timer.module.css';

/**
 * @param {{ startingMinutes: number, onFinish: () => void, stopTimer: (fn: Object) => Object }} props
 * @returns {HTMLElement}
 */
function Timer({ startingMinutes, onFinish, stopTimer }) {
  let count = startingMinutes * 60;
  let counting;

  const counter = html`<span class="${styles.counter}">00:00</span>`;

  const formatDuration = (time) => {
    const timeObj = new Date(time * 1000);
    const mm = timeObj.getUTCMinutes().toString().padStart(2, '0');
    const ss = timeObj.getUTCSeconds().toString().padStart(2, '0');

    return `${mm}:${ss}`;
  };

  counter.textContent = formatDuration(count);

  const finishCounting = () => {
    clearInterval(counting);
  };

  const changeDuration = () => {
    count -= 1;
    counter.textContent = formatDuration(count);
    if (count === 0) {
      finishCounting();
      onFinish();
    }
  };

  const processCounting = () => {
    counting = setInterval(changeDuration, 1000);
  };

  processCounting();

  stopTimer(finishCounting);

  const svg = html` <div class="${styles.timerOuterWrapper}">
    ${counter}
    <div class="${styles.timerInnerWrapper}">
      <svg width="200" height="200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="98" cy="98" r="86.5" stroke="#B2FF59" stroke-width="15" />
        <g filter="url(#a)">
          <circle
            class="${styles.circle}"
            cx="98"
            cy="98"
            r="86.5"
            stroke="#fff"
            stroke-width="15"
            shape-rendering="crispEdges"
          />
        </g>
        <defs>
          <filter
            id="a"
            x="0"
            y="0"
            width="200"
            height="200"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_65_277" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow_65_277" result="shape" />
          </filter>
        </defs>
      </svg>
    </div>
  </div>`;

  const displayTimer = html`<div class="${styles.container}">
    <p class="${styles.text}">pozostały</p>
    ${svg}
    <p class="${styles.text}">czas</p>
  </div>`;

  const passAnimationDuration = () => {
    displayTimer.style.setProperty('--animation-time', `${count}s`);
  };

  passAnimationDuration();

  return displayTimer;
}

export { Timer };
