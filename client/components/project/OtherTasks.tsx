import { Link } from '@/components/shared/Link';
import { useGetTask, useGetTaskList } from '@/services/hooks';
import { useCustomSession } from '@/utils/next-auth-react-query';
import { Box, Button, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { MouseEventHandler, useCallback, useEffect, useState } from 'react';

export const OtherTasks = React.memo(() => {
  const take = 60;
  const router = useRouter();
  const [otherTaskId, setOtherTaskId] = useState<string>();
  const [session] = useCustomSession({ required: true });
  const projectId = router.query.projectId as string;
  const jobId = router.query.jobId as string;
  const [skip, setSkip] = useState(0);
  useGetTask(
    { jobId, taskId: otherTaskId as string },
    { enabled: Boolean(jobId) && Boolean(otherTaskId) && Boolean(session) }
  );
  // TODO: background fetch는 prefetch로 변경할것
  const getTaskList = useGetTaskList(
    { jobId, status: 'all', skip, take },
    {
      enabled: Boolean(jobId) && Boolean(session),
      keepPreviousData: true,
    }
  );
  const makeOnMouseEnter = useCallback<(taskId: string) => MouseEventHandler<HTMLAnchorElement>>(
    (taskId: string) => () => {
      console.info('taskId', taskId);
      setOtherTaskId(taskId);
    },
    []
  );

  return (
    <Card sx={{ px: 2, py: 2 }}>
      <CardContent
        sx={{
          p: { xs: 0 },
          minHeight: 160,
          // maxHeight: `calc(100vh - ${127 + 64 + 32 + 16}px)`,
          maxHeight: '20rem',
          overflowY: 'auto',
        }}
      >
        {getTaskList?.data?.tasks.map((task, idx) => {
          const href = `/projects/${projectId}/${jobId}/${task.id}`;
          return (
            <Box key={task.id} sx={{ mt: 2, py: 0, pr: 2 }}>
              <Link href={href} onMouseEnter={makeOnMouseEnter(task.id)}>
                {/* <Button> */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ mr: 'auto' }}>{`Task ${task.order}`}</Typography>
                  <Typography>{task.selected ? '[완료]' : '[미완료]'}</Typography>
                </Box>
                {/* </Button> */}
              </Link>
            </Box>
          );
        })}

        {/* // ****************************** */}
        {/* // ****************************** */}

        <Box
          sx={{
            width: '100%',
            // height: 160,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: 2,
          }}
        >
          <CircularProgress />
        </Box>
      </CardContent>
    </Card>
  );
});
