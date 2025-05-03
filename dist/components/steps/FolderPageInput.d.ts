import type { DataProps } from '../../models/app.js';
import { type FC } from 'react';
type FolderPageInputProps = {
    next: (name: string, val: string, nextStep: string | null) => void;
    data: DataProps;
    setData: (data: DataProps) => any;
    config: any;
};
declare const FolderPageInput: FC<FolderPageInputProps>;
export default FolderPageInput;
