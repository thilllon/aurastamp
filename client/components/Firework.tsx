import { Fireworks } from 'fireworks/lib/react';
import React from 'react';

export const Firework2 = () => {
  const fxProps: any = {
    count: 5,
    interval: 500,
    colors: ['#cc3333', '#4CAF50', '#81C784'],
    calc: (props: any, i: any) => ({
      ...props,
      x: (i + 1) * (window.innerWidth / 3) - (i + 1) * 100,
      y: 200 + Math.random() * 100 - 50 + (i === 2 ? -80 : 0),
    }),
    particleTimeout: 300,
    bubbleSizeMinimum: 1,
    bubbleSizeMaximum: 10,
    // bubbleSpeedMinimum:,
    // bubbleSpeedMaximum:,
    // canvasLeftOffset: 0,
    // canvasTopOffset: 50,
  };

  return <Fireworks {...fxProps} />;
};
