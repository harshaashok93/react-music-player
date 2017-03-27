import React from 'react';

import { Heading, Image } from 'components';
import Control from './controls';
import Duration from './duration';
import music from './music.json';

import './theme.scss';

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
    const md = this.state.data[this.state.index];

    return (
      <div className="music-player">
        <Heading as={'h1'} className="title">{md.title}</Heading>
        <Image
          classname="masthead-image"
          image={md.image}
          title={md.title}
        />
        <div className="player-controls">
          <input id="seekRange" type="range" name="points" min="0" max={convertToSeconds(this.state.duration)} step="1" onChange={this.updateTime} />
          <Duration
            currentTime={this.state.currentTime}
            duration={this.state.duration}
          />
          <Control
            playPrev={this.playPrev}
            is_playing={this.state.is_playing}
            ended={this.state.ended}
            pauseAudio={this.pauseAudio}
            playAudio={this.playAudio}
            playNext={this.playNext}
            toggleLoop={this.toggleLoop}
            toggleShuffle={this.toggleShuffle}
          />
        </div>
        <audio id="myplayer" className="audio-tag">
          <source src={md.audio_url} type="audio/mp3" />
        </audio>
      </div>
    );
  }
}
