import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  TextFieldInput,
  TextField,
  IconButton,
} from '@radix-ui/themes';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, Link, useActionData, useFetcher, useLoaderData } from '@remix-run/react';
import type { FunctionComponent } from 'react';
import { useEffect, useRef } from 'react';
import { authService, todoService } from '../lib';
import { UpdateIcon } from '@radix-ui/react-icons';
import { Cropper } from '../components/radix-cropper';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authService.requireAuth(request);
  const todos = await todoService.getTodosByUid(user.uid);
  return json({ message: `Hello ${user.displayName || 'stranger'}!`, todos });
};

export const action: ActionFunction = async ({ request }) => {
  const { uid } = await authService.requireAuth(request);
  const form = await request.formData();
  const intent = form.get('intent');
  if (intent === 'create') {
    const title = form.get('title');
    if (typeof title !== 'string' || title.length === 0) {
      return json({ error: 'title is required' }, { status: 400 });
    }

    await todoService.addTodo(uid, title);
    return redirect('/');
  }
  if (intent === 'delete') {
    const id = form.get('id');
    if (typeof id !== 'string') {
      return json({ error: 'id is required' }, { status: 400 });
    }
    await todoService.removeTodo(uid, id);
    return redirect('/');
  }
  return json({ error: 'unknown method' }, { status: 400 });
};

const TodoComponent: FunctionComponent<{ id: string; title: string }> = ({ id, title }) => {
  const { Form } = useFetcher();

  return (
    <li>
      <Form method="POST">
        <TextFieldInput type="hidden" name="id" value={id} />
        <Box>{title}</Box>
        <Button type="submit" name="intent" value="delete" variant="outline" color="gold">
          delete
        </Button>
      </Form>
    </li>
  );
};

const TodoBoard: FunctionComponent = () => {
  const actionData = useActionData<typeof action>();
  const data = useLoaderData<typeof loader>();

  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, [ref]);
  return (
    <>
      <Heading>{data.message}</Heading>
      <Text>
        Want to <Link to="/logout">log out</Link>?
      </Text>
      {actionData?.error && <p style={{ color: 'red' }}>{actionData.error}</p>}
      <Form method="post">
        <Heading>Create new Todo:</Heading>
        <Flex>
          <TextFieldInput name="title" placeholder="Get milk" />
          <Button type="submit" name="intent" value="create">
            Create
          </Button>
        </Flex>

        <Flex>
          <TextField.Root>
            <TextField.Input placeholder="get milk" />
            <TextField.Slot>
              <IconButton variant="ghost">
                <UpdateIcon />
              </IconButton>
            </TextField.Slot>
          </TextField.Root>
        </Flex>
      </Form>

      <ul>
        {data.todos.map((todo: any) => (
          <TodoComponent key={todo.id} {...todo} />
        ))}
      </ul>
    </>
  );
};

export default function Index() {
  return (
    <div>
      {/* <TodoBoard /> */}
      <Cropper />
    </div>
  );
}
