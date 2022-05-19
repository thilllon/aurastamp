import React, { ReactNode, useState, useEffect, useContext } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { Box, Typography, Container } from '@mui/material';
import { useRouter } from 'next/router';
import { Link } from '@/components/shared/Link';
import Image from 'next/image';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { frncc } from '@/utils/styles';


export default function TmpPage() {

  return (
    <Container>
      
    </Container>
  );
}
