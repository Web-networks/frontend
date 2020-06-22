import { StateFieldT } from 'types/utilityTypes';
import { ProjectT } from 'types/projectsTypes';
import { LayerT } from 'types/layersTypes';

export interface ModelT {
    id: string;
    loss: string;
    optimizer?: string;
    metrics?: string;
    project: ProjectT;
    layers: LayerT;
    task?: string;
}

export interface ModelStateT extends StateFieldT {
    data: ModelT | null;
}
