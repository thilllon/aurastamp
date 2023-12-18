import { redirect } from 'next/navigation';

export default function IndexPage() {
  redirect('/encode');

  return <div></div>;
}
