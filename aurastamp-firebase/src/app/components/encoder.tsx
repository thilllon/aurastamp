import { Button } from './ui/button';

export const Encoder = () => {
  return (
    <div>
      <div
        className="flex justify-center items-center
      w-20 h-20 border-4 border-black border-dashed borroun"
      >
        <div>{'txt'}</div>
      </div>
      <div>
        <Button>pick an image</Button>
      </div>
    </div>
  );
};
