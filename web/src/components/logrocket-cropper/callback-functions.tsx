import { ChangeEventHandler, MouseEventHandler } from 'react';
import { centerCrop, makeAspectCrop } from 'react-image-crop';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';

export function ControlRotate({
  disabled,
  rotate,
  onChange,
}: {
  disabled?: boolean;
  rotate?: number;
  onChange: ChangeEventHandler;
}) {
  return (
    <div>
      <label htmlFor='rotate-input'>Rotate: </label>
      <input
        id='rotate-input'
        type='number'
        value={rotate}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
}

export function ControlFixingAspect({
  fixed,
  onClick,
}: {
  fixed?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div>
      <Checkbox />
      <Button onClick={onClick} variant={fixed ? 'default' : 'secondary'}>
        {fixed ? 'fixed' : 'not fixed'}
      </Button>
    </div>
  );
}

export function ControlScale({
  disabled,
  scale,
  onChange,
}: {
  disabled?: boolean;
  scale?: number;
  onChange: ChangeEventHandler;
}) {
  return (
    <div>
      <label htmlFor='scale-input'>Scale: </label>
      <input
        id='scale-input'
        type='number'
        step='0.1'
        value={scale}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
}

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
export function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
  ratio: number,
) {
  return centerCrop(
    makeAspectCrop({ unit: '%', width: ratio * 100 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight,
  );
}
