export declare const defaultFolders: {
    config: {
        language: string;
        generatedFiles: boolean;
        openFiles: boolean;
    };
    components: {
        base: string;
        atomic: boolean;
        naming: {
            folder: string;
        };
        files: {
            types: string;
            stories: boolean;
            test: boolean;
        };
    };
    pages: {
        base: string;
        routes: string;
        files: {
            types: string;
            lazy: boolean;
        };
    };
    hooks: {
        base: string;
        context: {
            file: string;
            mode: string;
        };
    };
    services: {
        base: string;
        axios: string;
        types: string;
        mocks: {
            data: string;
            server: string;
        };
    };
};
