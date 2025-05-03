import type { DataProps } from '../../models/app.js';
import { type FC } from 'react';
type HttpInputProps = {
    next: (name: string, val: string, nextStep: string | null) => void;
    data: DataProps;
};
declare const HttpInput: FC<HttpInputProps>;
export default HttpInput;
