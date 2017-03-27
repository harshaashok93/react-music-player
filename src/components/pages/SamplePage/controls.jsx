import React, { PropTypes } from 'react';

const classnames = (obj) => {
  const css = [];
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      css.push(key);
    }
  });
  return css.join(' ');
};

const Control = (props) => {
  const playerbtn = {
    fa: true,
    'fa-play': !props.is_playing || props.ended,
    'fa-pause': props.is_playing && !props.ended
  };
  const loop = props.loop ? 'loop looped' : 'loop';
  const shuffle = props.shuffle ? 'shuffle shuffled' : 'shuffle';

  return (
    <div className="controls">
      <div className="col" />
      <div className="col">
        <button onClick={props.playPrev} className="previous">
          <i className="fa fa-step-backward" aria-hidden="true" />
        </button>
        <button onClick={props.is_playing ? props.pauseAudio : props.playAudio} className="play-pause">
          <i className={classnames(playerbtn)} aria-hidden="true" />
        </button>
        <button onClick={props.playNext} className="next">
          <i className="fa fa-step-forward" aria-hidden="true" />
        </button>
      </div>
      <div className="col">
        <button onClick={props.toggleLoop} className={loop}><i className="fa fa-retweet" aria-hidden="true" /></button>
        <button onClick={props.toggleShuffle} className={shuffle}><i className="fa fa-random" aria-hidden="true" /></button>
      </div>
    </div>
  );
};

Control.propTypes = {
  playPrev: PropTypes.func,
  is_playing: PropTypes.bool,
  ended: PropTypes.bool,
  pauseAudio: PropTypes.func,
  playAudio: PropTypes.func,
  playNext: PropTypes.func,
  toggleLoop: PropTypes.func,
  toggleShuffle: PropTypes.func,
  loop: PropTypes.bool,
  shuffle: PropTypes.bool
};

export default Control;
