import { useGetTaskList } from '@/services/hooks';
import { useCustomSession } from '@/utils/next-auth-react-query';
import { LinearProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

type TasksPageProps = {};

export default function TasksPage({}: TasksPageProps) {
  const router = useRouter();
  const projectId = router.query?.projectId as string;
  const jobId = router.query?.jobId as string;
  const [session] = useCustomSession({ required: true });

  const getUndoneTasks = useGetTaskList(
    { jobId, status: 'undone' },
    { enabled: Boolean(jobId) && Boolean(session) }
  );

  const getAllTasks = useGetTaskList(
    { jobId, status: 'all' },
    { enabled: Boolean(jobId) && Boolean(session) }
  );

  useEffect(() => {
    if (getUndoneTasks.data) {
      let taskId: string | undefined;
      const undoneTaskId = getUndoneTasks.data?.tasks[0]?.id;
      if (undoneTaskId) {
        taskId = undoneTaskId;
      } else {
        taskId = getAllTasks.data?.tasks[0]?.id;
      }

      if (taskId) {
        router.replace(`/projects/${projectId}/${jobId}/${taskId}`);
      }
    }
  }, [router, getUndoneTasks.data, projectId, jobId, getAllTasks.data?.tasks]);

  return <LinearProgress />;
}
