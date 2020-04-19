import { MinUserInfo } from 'types/userTypes';

export interface Project {
    owner: MinUserInfo;
    sharedWith: MinUserInfo[];
    description: string;
    name: string;
    isPublic: boolean;
}

export interface ProjectsStateField {
    pending: boolean;
    error: string | null;
    data: {
        projects: Project[];
        availableProjects: Project[];
    };
}
