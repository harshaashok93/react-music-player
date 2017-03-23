import React from 'react';

import music from '../HomePage/music.json';

import '../HomePage/theme.scss';

const classnames = (obj) => {
  const css = [];
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      css.push(key);
    }
  });
  return css.join(' ');
};

const formatTime = (seconds) => {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds) - (min * 60);
  return `${min}:${sec}`;
};

const convertToSeconds = (string) => {
  const val = string.split(':');
  const min = parseInt(val[0], 10) * 60;
  const sec = parseInt(val[1], 10);
  return (min + sec);
};

export default class SamplePage extends React.Component {
  constructor() {
    super();

    this.state = {
      data: music.data,
      length: music.data.length,
      index: 3,
      player: '',
      is_playing: false,
      shuffle: false,
      loop: false,
      el: '',
      duration: '0:0',
      currentTime: '0:0',
      ended: false
    };
  }

  componentDidMount = () => {
    setTimeout(() => {
      const el = document.getElementById('myplayer');
      this.setState({ el });
    }, 1000);
    window.setInterval(() => {
      const currentTime = formatTime(document.getElementById('myplayer').currentTime);
      this.setState({ currentTime });
      document.getElementById('seekRange').value = convertToSeconds(currentTime);
      if (this.state.currentTime === this.state.duration) {
        this.setState({ ended: true });
      }
    }, 500);
  };

  playAudio = () => {
    this.setState({ is_playing: true, ended: false });
    this.state.el.play();
    setTimeout(() => {
      const dur = formatTime(document.getElementById('myplayer').duration);
      this.setState({ duration: dur });
    }, 100);
  };

  pauseAudio = () => {
    this.setState({ is_playing: false });
    this.state.el.pause();
  };

  playNext = () => {
    const index = this.state.index === this.state.length - 1 ? 0 : this.state.index + 1;
    this.setState({ index, is_playing: true, ended: false });
    this.state.el.load();
    this.state.el.play();
    setTimeout(() => {
      const dur = formatTime(document.getElementById('myplayer').duration);
      this.setState({ duration: dur });
    }, 100);
  };

  playPrev = () => {
    const index = this.state.index === 0 ? this.state.length - 1 : this.state.index - 1;
    this.setState({ index, is_playing: true, ended: false });
    this.state.el.load();
    this.state.el.play();
    setTimeout(() => {
      const dur = formatTime(document.getElementById('myplayer').duration);
      this.setState({ duration: dur });
    }, 100);
  };

  toggleLoop = () => {
    this.setState({ loop: !this.state.loop });
    /* eslint-disable */
    console.log(this.state.loop);
    /* eslint-enable */
    this.state.el.loop = this.state.index;
  };

  toggleShuffle = () => {
    /* eslint-disable */
    console.log('Im not ready yet.');
    /* eslint-enable */
  };

  updateTime = () => {
    const currentTime = document.getElementById('seekRange').value;
    this.setState({ currentTime });
    document.getElementById('myplayer').currentTime = currentTime;
  }

  render() {
    const playerbtn = {
      fa: true,
      'fa-play': !this.state.is_playing || this.state.ended,
      'fa-pause': this.state.is_playing && !this.state.ended
    };
    const loop = this.state.loop ? 'loop looped' : 'loop';
    const shuffle = this.state.shuffle ? 'shuffle shuffled' : 'shuffle';
    const md = this.state.data[this.state.index];
    return (
      <div className="music-player">
        <marquee className="title">{md.title}</marquee>
        <img className="masthead-image" src={md.image} alt={md.title} />
        <div className="player-controls">
          <input id="seekRange" type="range" name="points" min="0" max={convertToSeconds(this.state.duration)} step="1" onChange={this.updateTime} />
          <div className="time">
            <p className="current-time">{this.state.currentTime}</p>
            <p className="total-duration">{this.state.duration}</p>
            <div className="clear" />
          </div>
          <div className="controls">
            <div className="col" />
            <div className="col">
              <button onClick={this.playPrev} className="previous">
                <i className="fa fa-step-backward" aria-hidden="true" />
              </button>
              <button onClick={this.state.is_playing ? this.pauseAudio : this.playAudio} className="play-pause">
                <i className={classnames(playerbtn)} aria-hidden="true" />
              </button>
              <button onClick={this.playNext} className="next">
                <i className="fa fa-step-forward" aria-hidden="true" />
              </button>
            </div>
            <div className="col">
              <button onClick={this.toggleLoop} className={loop}><i className="fa fa-retweet" aria-hidden="true" /></button>
              <button onClick={this.toggleShuffle} className={shuffle}><i className="fa fa-random" aria-hidden="true" /></button>
            </div>
          </div>
        </div>
        <audio id="myplayer" controls className="audio-tag">
          <source src={md.audio_url} type="audio/mp3" />
        </audio>
      </div>
    );
  }
}
