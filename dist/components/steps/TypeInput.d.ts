import { type FC } from 'react';
type TypeInputProps = {
    next: (name: string, val: string, nextStep: string | null) => void;
};
declare const TypeInput: FC<TypeInputProps>;
export default TypeInput;
