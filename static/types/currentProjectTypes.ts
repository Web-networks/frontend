import { ProjectT } from 'types/projectsTypes';
import { StateFieldT } from 'types/utilityTypes';

export type CurrentProjectDataT = ProjectT | null;

export interface CurrentProjectStateT extends StateFieldT {
    data: CurrentProjectDataT;
}
