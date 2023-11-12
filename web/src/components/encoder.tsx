import { Cropper } from './image-cropper';
import RocketCropper from './logrocket-cropper/cropper';

export const Encoder = () => {
  return (
    <div className="border-4 border-slate-800">
      {/* <Cropper /> */}
      <RocketCropper controlAspect />
    </div>
  );
};
