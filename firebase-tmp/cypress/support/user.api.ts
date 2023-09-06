// Use this to create a new user and login with that user
// Simply call this with:
// npx ts-node --require tsconfig-paths/register ./cypress/support/create-user.ts username@example.com
// and it will log out the cookie value you can use to interact with the server
// as that new user.

import { installGlobals } from '@remix-run/node';
import { parse } from 'cookie';
import { createUser } from '~/models/user.server';
import { createUserSession } from '~/session.server';
import { installGlobals } from '@remix-run/node';
import { prisma } from '~/db.server';
// Use this to delete a user by their email
// Simply call this with:
// npx ts-node --require tsconfig-paths/register ./cypress/support/delete-user.ts username@example.com
// and that user will get deleted

import { Prisma } from '@prisma/client';
// import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { installGlobals } from '@remix-run/node';
import { prisma } from '~/db.server';

installGlobals();

async function deleteUser(email: string) {
  if (!email) {
    throw new Error('email required for login');
  }
  if (!email.endsWith('@example.com')) {
    throw new Error('All test emails must end in @example.com');
  }

  try {
    await prisma.user.delete({ where: { email } });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      console.log('User not found, so no need to delete');
    } else {
      throw error;
    }
  } finally {
    await prisma.$disconnect();
  }
}

deleteUser(process.argv[2]);

installGlobals();

async function createAndLogin(email: string) {
  if (!email) {
    throw new Error('email required for login');
  }
  if (!email.endsWith('@example.com')) {
    throw new Error('All test emails must end in @example.com');
  }

  const user = await createUser(email, 'myreallystrongpassword');

  const response = await createUserSession({
    request: new Request('test://test'),
    userId: user.id,
    remember: false,
    redirectTo: '/',
  });

  const cookieValue = response.headers.get('Set-Cookie');
  if (!cookieValue) {
    throw new Error('Cookie missing from createUserSession response');
  }
  const parsedCookie = parse(cookieValue);
  // we log it like this so our cypress command can parse it out and set it as
  // the cookie value.
  console.log(
    `
<cookie>
  ${parsedCookie.__session}
</cookie>
  `.trim(),
  );
}

createAndLogin(process.argv[2]);

// --------------------------------
// --------------------------------
// --------------------------------
// --------------------------------

// Use this to delete a user by their email
// Simply call this with:
// npx ts-node --require tsconfig-paths/register ./cypress/support/delete-user.ts username@example.com
// and that user will get deleted

// import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

installGlobals();

async function deleteUser(email: string) {
  if (!email) {
    throw new Error('email required for login');
  }
  if (!email.endsWith('@example.com')) {
    throw new Error('All test emails must end in @example.com');
  }

  try {
    await prisma.user.delete({ where: { email } });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      console.log('User not found, so no need to delete');
    } else {
      throw error;
    }
  } finally {
    await prisma.$disconnect();
  }
}

deleteUser(process.argv[2]);
