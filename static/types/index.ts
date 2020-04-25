import { StateFieldT } from 'types/utilityTypes';
import { FormStateT } from 'types/formTypes';
import { UserStateT } from 'types/userTypes';
import { ProjectsStateT } from 'types/projectsTypes';

export type StateFieldKeyT = 'form' | 'user' | 'projects';

type BaseApplicationStateT = Record<StateFieldKeyT, StateFieldT>;

export interface ApplicationStateT extends BaseApplicationStateT {
    form: FormStateT;
    user: UserStateT ;
    projects: ProjectsStateT;
}
