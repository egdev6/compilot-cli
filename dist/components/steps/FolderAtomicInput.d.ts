import { type FC } from 'react';
type FolderAtomicInputProps = {
    next: (name: string, val: string, nextStep: string | null) => void;
};
declare const FolderAtomicInput: FC<FolderAtomicInputProps>;
export default FolderAtomicInput;
