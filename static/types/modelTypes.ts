import { StateFieldT } from 'types/utilityTypes';
import { ProjectT } from 'types/projectsTypes';

export interface ModelT {
    id: string;
    loss: string;
    optimizer?: string;
    metrics?: string;
    project: ProjectT;
    layers: string[];
    task?: string;
}

export interface ModelStateT extends StateFieldT {
    data: ModelT | null;
}
