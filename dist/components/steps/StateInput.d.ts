import { type FC } from 'react';
type StateInputProps = {
    next: (name: string, val: string, nextStep: string | null) => void;
};
declare const StateInput: FC<StateInputProps>;
export default StateInput;
