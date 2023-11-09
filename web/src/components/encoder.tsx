import { Cross2Icon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import { Cropper } from './image-cropper';

export const Encoder = () => {
  return (
    <div>
      <Cropper />

      <hr />
      <hr />
      <hr />
      <hr />
      <Button className="gap-2">
        <Cross2Icon />
        dfsdfdfsdfsd
      </Button>
      <div
        className="flex justify-center items-center
      w-80 h-80 p-2 border-4 border-black border-dashed borroun hover:cursor-pointer bg-slate-200 hover:bg-slate-600"
      >
        <div className="flex justify-center items-center border-2 m-0 border-slate-700 w-full h-full">
          <input type="file" className="" />
          <div className="flex justify-center items-center border-red-500 w-full h-full border-2">
            <span className="border-4">{'txt'}</span>
          </div>
        </div>
      </div>
      <div>
        {/* --- */}

        <form>
          <label>upload image</label>
          <input type="file" />
        </form>

        <Button>pick an image</Button>
      </div>
    </div>
  );
};
