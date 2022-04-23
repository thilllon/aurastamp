import { Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { mod } from 'react-swipeable-views-core';
import { virtualize } from 'react-swipeable-views-utils';

interface IndexPageProps {}

const VirtualizeSwipeableViews1 = virtualize(SwipeableViews);

const slideRenderer2 = ({ key, index }: any) => {
  return <div key={key}>{`slide n°${index + 1}`}</div>;
};

const slideRenderer1 = ({ index, key }: any) => {
  switch (mod(index, 3)) {
    case 0:
      return (
        <div key={key} style={Object.assign({}, styles.slide, styles.slide1)}>
          slide n°1
        </div>
      );

    case 1:
      return (
        <div key={key} style={Object.assign({}, styles.slide, styles.slide2)}>
          slide n°2
        </div>
      );

    case 2:
      return (
        <div key={key} style={Object.assign({}, styles.slide, styles.slide3)}>
          slide n°3
        </div>
      );

    default:
      return null;
  }
};

export default function IndexPage({}: IndexPageProps) {
  const router = useRouter();

  return (
    <Container>
      <VirtualizeSwipeableViews1
        slideRenderer={slideRenderer1}
        index={1}
        onChangeIndex={(idx: number, indexLatest: number) => {}}
      />

      {/* <VirtualizeSwipeableViews slideRenderer={slideRenderer} index={1} /> */}
    </Container>
  );
}

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

const styles = {
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
  slide1: {
    backgroundColor: '#FEA900',
  },
  slide2: {
    backgroundColor: '#B3DC4A',
  },
  slide3: {
    backgroundColor: '#6AC0FF',
  },
};
