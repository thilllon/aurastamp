import { type ActionFunction } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { sessionService } from '~/sessions.server';

export const action: ActionFunction = async ({ request }) => {
  return sessionService.destroySessionCookie(request, '/login');
};

export default function Logout() {
  return (
    <div>
      <h1>Logout</h1>
      <p>Press the button below to log out.</p>
      <Form method="post">
        <button type="submit">Logout</button>
      </Form>
    </div>
  );
}
