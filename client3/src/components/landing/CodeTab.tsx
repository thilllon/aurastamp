import { CopyAll } from '@mui/icons-material';
import { Box, IconButton, SxProps, Tab, Tabs, Tooltip } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import 'prismjs';
import 'prismjs/components/prism-jsx.min';
import 'prismjs/themes/prism-okaidia.css';
import { ReactNode, SyntheticEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PrismCode from 'react-prism';
import { useCopyToClipboard } from 'react-use';

export const CodeTab = () => {
  const [value, setValue] = useState(0);

  const onChangeTab = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs value={value} onChange={onChangeTab} variant='fullWidth'>
        <Tab label={'React.js'} />
        <Tab label={'.net'} />
        <Tab label={'Kotlin Spring'} />
      </Tabs>

      <Box sx={{}}>
        <PrismWrapper className='language-jsx' value={value} index={0}>
          {sampleCode.jsx}
        </PrismWrapper>

        <PrismWrapper className='language-jsx' value={value} index={1}>
          {sampleCode.dotnet}
        </PrismWrapper>

        <PrismWrapper className='language-kt' value={value} index={2}>
          {sampleCode.kotlin}
        </PrismWrapper>
      </Box>
    </Box>
  );
};

const sampleCode = {
  jsx: `import create from 'zustand'

const useStore = create(set => ({
  count: 1,
  inc: () => set(state => ({ count: state.count + 1 })),
}))

function Controls() {
  const inc = useStore(state => state.inc)
  return <button onClick={inc}>one up</button>
)

function Counter() {
  const count = useStore(state => state.count)
  return <h1>{count}</h1>  
}`,
  kotlin: `import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.time.format.FormatStyle

fun main(args: Array<String>) {

    val current = LocalDateTime.now()

    val formatter = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM)
    val formatted = current.format(formatter)

    println("Current Date is: $formatted")
}`,
  dotnet: `asdfasdfasdfasdfasdfasdfasdf`,
};

const PrismWrapper = ({
  children,
  sx,
  className,
  index,
  value,
}: {
  children: ReactNode;
  sx?: SxProps<Theme>;
  className: string;
  index: number;
  value: number;
}) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [{ value: copiedValue, error, noUserInteraction }, copyToClipboard] = useCopyToClipboard();

  const onClickCopy = (ev) => {
    copyToClipboard(children.toString());
    enqueueSnackbar(t('클립보드에 복사되었습니다'), { variant: 'success' });
  };

  return (
    <>
      {value === index && (
        <Box sx={{ position: 'relative', display: 'grid', minHeight: 400 }}>
          <Box
            component='pre'
            sx={{
              padding: 10,
              position: 'relative',
              width: '100%',
              minHeight: '100%',
              ...sx,
            }}
          >
            <PrismCode className={className}>{children}</PrismCode>
          </Box>

          <Tooltip title='Copy'>
            <IconButton
              disableRipple={false}
              onClick={onClickCopy}
              sx={{ position: 'absolute', top: 20, right: 10 }}
              color='success'
            >
              <CopyAll />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </>
  );
};
