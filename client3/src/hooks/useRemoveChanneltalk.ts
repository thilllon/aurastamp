import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useRemoveChanneltalk = () => {
  // FIXME: 특정 페이지에서만 채널톡 버튼을 안보이도록 하기 위함

  const router = useRouter();
  // const removeChanneltalkButton = () => {
  //   // document.querySelector('div#channeltalk')?.remove?.();
  //   const div: HTMLDivElement = document.querySelector('div#ch-plugin');
  //   div.style.display = 'none';
  // };
  // Router.events.on('routeChangeComplete', removeChanneltalkButton);
  // Router.events.on('routeChangeStart', () => {
  //   const div: HTMLDivElement = document.querySelector('div#ch-plugin');
  //   div.style.display = 'block';
  // });

  useEffect(() => {
    router.beforePopState((state) => {
      console.log(state);
      console.log(state);
      const channeltalkButton: HTMLDivElement = document.querySelector('div#ch-plugin');
      if (channeltalkButton) {
        channeltalkButton.style.display = 'block';
      }
      return true;
    });
    if (router.isReady) {
      const channeltalkButton: HTMLDivElement = document.querySelector('div#ch-plugin');
      if (channeltalkButton) {
        channeltalkButton.style.display = 'none';
      }
    }
  }, [router]);

  // useEffect(() => {
  //   // debugger;
  //   const channeltalkButton: HTMLDivElement = document.querySelector('div#ch-plugin');
  //   router.events.on('routeChangeComplete', () => {
  //     if (channeltalkButton) {
  //       channeltalkButton.style.display = 'none';
  //     }
  //   });
  //   return () => {
  //     router.events.off('routeChangeComplete', () => {
  //       debugger;
  //       if (channeltalkButton) {
  //         channeltalkButton.style.display = 'block';
  //       }
  //     });
  //   };
  // }, [router.events]);
};
