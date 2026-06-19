export interface OSRMResponse{
    code: string;
    routes: {
        distance: number;
        duration: number;
    }[];
}