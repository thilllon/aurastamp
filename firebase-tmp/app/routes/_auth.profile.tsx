import { getAuth } from 'firebase/auth';

export default function ProfileRoute() {
  return (
    <div>
      <pre>{JSON.stringify(getAuth().currentUser ?? {}, null, 2)}</pre>
    </div>
  );
}
