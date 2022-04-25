import React, { ReactNode, useState, useEffect, useContext } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { Box, Typography, Container } from '@mui/material';
import { useRouter } from 'next/router';
import { Link } from '@/components/shared/Link';
import Image from 'next/image';
import { Fireworks } from 'fireworks/lib/react';
import { FireworksInput } from 'fireworks';

interface FireworkProps {
  cssProps?: SerializedStyles;
}

export const Firework = ({}: FireworkProps) => {
  return (
    <Box
      css={css`
        border: 5px solid blue;
        // height: 400px;
        // width: 400px;

        $particles: 50;
        $width: 500;
        $height: 500;

        // Create the explosion...
        $box-shadow: ();
        $box-shadow2: ();
        @for $i from 0 through $particles {
          $box-shadow: $box-shadow,
            random($width)-$width /
              2 +
              px
              random($height)-$height /
              1.2 +
              px
              hsl(random(360), 100, 50);
          $box-shadow2: $box-shadow2, 0 0 #fff;
        }
        @mixin keyframes($animationName) {
          @-webkit-keyframes #{$animationName} {
            @content;
          }

          @-moz-keyframes #{$animationName} {
            @content;
          }

          @-o-keyframes #{$animationName} {
            @content;
          }

          @-ms-keyframes #{$animationName} {
            @content;
          }

          @keyframes #{$animationName} {
            @content;
          }
        }

        @mixin animation-delay($settings) {
          -moz-animation-delay: $settings;
          -webkit-animation-delay: $settings;
          -o-animation-delay: $settings;
          -ms-animation-delay: $settings;
          animation-delay: $settings;
        }

        @mixin animation-duration($settings) {
          -moz-animation-duration: $settings;
          -webkit-animation-duration: $settings;
          -o-animation-duration: $settings;
          -ms-animation-duration: $settings;
          animation-duration: $settings;
        }

        @mixin animation($settings) {
          -moz-animation: $settings;
          -webkit-animation: $settings;
          -o-animation: $settings;
          -ms-animation: $settings;
          animation: $settings;
        }

        @mixin transform($settings) {
          transform: $settings;
          -moz-transform: $settings;
          -webkit-transform: $settings;
          -o-transform: $settings;
          -ms-transform: $settings;
        }

        body {
          margin: 0;
          padding: 0;
          background: #000;
          overflow: hidden;
        }

        .pyro > .before,
        .pyro > .after {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          box-shadow: $box-shadow2;
          @include animation(
            (
              1s bang ease-out infinite backwards,
              1s gravity ease-in infinite backwards,
              5s position linear infinite backwards
            )
          );
        }

        .pyro > .after {
          @include animation-delay((1.25s, 1.25s, 1.25s));
          @include animation-duration((1.25s, 1.25s, 6.25s));
        }

        @include keyframes(bang) {
          to {
            box-shadow: $box-shadow;
          }
        }

        @include keyframes(gravity) {
          to {
            @include transform(translateY(200px));
            opacity: 0;
          }
        }

        @include keyframes(position) {
          0%,
          19.9% {
            margin-top: 10%;
            margin-left: 40%;
          }
          20%,
          39.9% {
            margin-top: 40%;
            margin-left: 30%;
          }
          40%,
          59.9% {
            margin-top: 20%;
            margin-left: 70%;
          }
          60%,
          79.9% {
            margin-top: 30%;
            margin-left: 20%;
          }
          80%,
          99.9% {
            margin-top: 30%;
            margin-left: 80%;
          }
        }
      `}
    >
      <div class='pyro'>
        <div class='before'></div>
        <div class='after'></div>
      </div>
    </Box>
  );
};

export const Firework2 = ({}: FireworkProps) => {
  const fxProps: FireworksInput = {
    count: 5,
    interval: 500,
    colors: ['#cc3333', '#4CAF50', '#81C784'],
    calc: (props, i) => ({
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
