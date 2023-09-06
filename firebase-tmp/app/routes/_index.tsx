import type { V2_MetaFunction } from '@remix-run/react';
import { Button } from '../components/ui/button';

export const meta: V2_MetaFunction = () => [{ title: 'Remix Notes' }];

export default function Index() {
  return (
    <div>
      <Button color="" variant="outline" size=''>
        button
      </Button>
    </div>
  );
}
