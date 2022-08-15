import Link from '@/components/Link';
import { getZZZUrls } from '@/utils/utils';
import { useEffect, useState } from 'react';

export const ZZZLinks = () => {
  const [urls, setUrls] = useState<string[]>([]);
  useEffect(() => {
    console.log('ZZZLinks');
    setUrls(getZZZUrls());
  }, []);

  return (
    <div>
      {urls.map((elem, idx) => {
        return (
          <Link href={elem} key={idx}>
            {elem}
          </Link>
        );
      })}
    </div>
  );
};

// 사용방식
// export const ZZZLink = dynamic(
//   async () => {
//     return (await import('src/components/ZZZLinks.server')).ZZZLinks;
//   },
//   {
//     ssr: false,
//   }
// );
