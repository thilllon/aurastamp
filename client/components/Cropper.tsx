import React, { ReactNode, useState, useEffect, useContext } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { Box, Typography, Container } from '@mui/material';
import { useRouter } from 'next/router';
import { Link } from '@/components/shared/Link';
import Image from 'next/image';

interface CropperProps{
  cssProps?: SerializedStyles;
}

export const Cropper = ({}:CropperProps) => {
const router = useRouter();

return <Box></Box>;
}
