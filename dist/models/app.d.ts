export type DataProps = {
    type?: string;
    name?: string;
    http?: string;
    state?: string;
    folder?: string;
    changes?: any[];
    errors?: any[];
    warnings?: any[];
    pascalName?: string;
    kebabName?: string;
    camelName?: string;
    storyGroup?: string;
    config?: any;
};
export type PlopFailure = {
    type: string;
    path: string;
    error: string | {
        name?: string;
        message?: string;
    };
};
