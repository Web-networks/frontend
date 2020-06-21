import { StateFieldT } from 'types/utilityTypes';

export interface LayerT {
    id: string;
    model: string;
    type: string;
    params: Record<string, any>;
}

export interface LayersStateT extends StateFieldT {
    data: LayerT[] | null;
}
