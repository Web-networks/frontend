import { MinUserInfoT } from 'types/userTypes';
import { StateFieldT } from 'types/utilityTypes';

export interface ProjectT {
    owner: MinUserInfoT;
    sharedWith: MinUserInfoT[];
    description: string;
    name: string;
    isPublic: boolean;
}

export interface ProjectsStateT extends StateFieldT {
    data: {
        projects: ProjectT[];
        availableProjects: ProjectT[];
    };
}
