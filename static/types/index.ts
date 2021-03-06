import { StateFieldT } from 'types/utilityTypes';
import { FormStateT } from 'types/formTypes';
import { UserStateT } from 'types/userTypes';
import { ProjectsStateT } from 'types/projectsTypes';
import { ModelStateT } from 'types/modelTypes';
import { LayersStateT } from 'types/layersTypes';
import { CurrentProjectStateT } from 'types/currentProjectTypes';
import { ConfirmDialogStateT } from 'types/confirmDialogTypes';
import { NotificationsT } from 'types/notificationsTypes';
import { LearningTaskStateT } from 'types/learningTaskTypes';

export type StateFieldKeyT =
    'form' |
    'user' |
    'projects' |
    'currentProject' |
    'model' |
    'layers' |
    'learningTask';

type BaseApplicationStateT = Record<StateFieldKeyT, StateFieldT>;

export interface ApplicationStateT extends BaseApplicationStateT {
    form: FormStateT;
    user: UserStateT ;
    projects: ProjectsStateT;
    currentProject: CurrentProjectStateT;
    model: ModelStateT;
    layers: LayersStateT;
    confirmDialog: ConfirmDialogStateT;
    notifications: NotificationsT;
    learningTask: LearningTaskStateT;
}
