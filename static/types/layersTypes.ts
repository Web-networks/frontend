import { StateFieldT } from 'types/utilityTypes';
import { ModelT } from 'types/modelTypes';

export interface LayerT {
    id: string;
    model: ModelT;
    type: string;
    params: Record<string, any>;
}

export interface LayersStateT extends StateFieldT {
    data: LayerT[] | null;
}
