export declare const templates: {
    folder: string;
    initialize: boolean;
    name: string;
    assets: {
        name: string;
        path: string;
    }[];
    template: {
        recipe: string;
        engine: string;
        content: string;
        helpers: string;
        chrome: {
            launchOptions: {
                args: string[];
            };
            printBackground: boolean;
            marginTop: string;
            marginRight: string;
            marginBottom: string;
            marginLeft: string;
            displayHeaderFooter: boolean;
            headerTemplate: string;
            footerTemplate: string;
        };
    };
}[];
