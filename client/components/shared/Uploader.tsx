import { Link } from '@/components/shared/Link';
import { toReadableSize } from '@/utils/common';
import { SerializedStyles } from '@emotion/react';
import { Delete } from '@mui/icons-material';
import {
  Box,
  ButtonBase,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { v4 as uuid } from 'uuid';

export type ExtendedFile = {
  id: string;
  file: File;
};

type UploaderProps = {
  cssProps?: SerializedStyles;
  defaultFiles?: ExtendedFile[];
  onChange?: (ev: any, files: ExtendedFile[]) => void;
  dropzoneOptions?: DropzoneOptions;
} & Record<string, any>;

export const Uploader = ({ onChange, defaultFiles = [], dropzoneOptions }: UploaderProps) => {
  const {
    acceptedFiles,
    fileRejections,
    isFocused,
    isFileDialogActive,
    getRootProps,
    getInputProps,
    draggedFiles,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({ ...dropzoneOptions });

  const [files, setFiles] = useState<ExtendedFile[]>(defaultFiles);

  const onClickRemove: MouseEventHandler<HTMLButtonElement> = (ev) => {
    const id = ev.currentTarget.id;
    setFiles(files.filter((file) => file.id !== id));
  };

  useEffect(() => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles.map((file) => ({ id: uuid(), file }))]);
  }, [acceptedFiles]);

  useEffect(() => {
    onChange?.(null, files);
  }, [files, onChange]);

  return (
    <Box>
      <CardActionArea
        sx={{
          py: 6,
          my: 2,
          display: 'flex',
          flexFlow: 'column nowrap',
          borderRadius: 1,
          backgroundColor: (theme) => theme.palette.grey[100],
          border: '2px dashed',
          borderColor: (theme) => theme.palette.grey[400],
        }}
        {...getRootProps({})}
      >
        <Box component='input' {...getInputProps()} />
        <Typography>{`Drag and drop some files here, or click to select files`}</Typography>
      </CardActionArea>

      <Box>
        {files.map(({ id, file }: ExtendedFile, idx) => {
          return (
            <Card key={idx} sx={{ mt: 2 }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', p: '8px !important' }}>
                <Typography variant='subtitle1' sx={{ ml: 1 }}>
                  {file.name}
                </Typography>
                {/* <Typography variant='subtitle2' sx={{ ml: 1 }}>
                  {file.type}
                </Typography> */}
                <Typography variant='subtitle2' sx={{ ml: 'auto' }}>
                  {toReadableSize(file.size)}
                </Typography>
                <IconButton id={id} name={file.name} sx={{ ml: 1 }} onClick={onClickRemove}>
                  <Delete />
                </IconButton>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};
