export const loadSDK = ({ id, src }: { id: string; src: string }): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const tags = document.querySelectorAll(`script#${id}`);
    tags?.forEach((tag) => tag.remove());

    const scriptTag: HTMLScriptElement = document.createElement('script');
    scriptTag.id = id;
    scriptTag.src = src;
    scriptTag.onload = resolve;
    document.body.append(scriptTag);
  });
};
