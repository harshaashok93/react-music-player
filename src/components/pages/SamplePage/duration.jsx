import React, { PropTypes } from 'react';

const Duration = (props) => {
  return (
    <div className="time">
      <p className="current-time">{props.currentTime}</p>
      <p className="total-duration">{props.duration}</p>
      <div className="clear" />
    </div>
  );
};

Duration.propTypes = {
  currentTime: PropTypes.string,
  duration: PropTypes.string
};

export default Duration;
