import { FormI } from 'types/formTypes';
import { UserI } from 'types/userTypes';
import { ProjectsStateField } from './projectsTypes';

export interface ApplicationStateT {
    form: FormI;
    userInfo: UserI | null;
    projects: ProjectsStateField;
}
