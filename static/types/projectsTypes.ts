export interface Project {
    owner: string;
}

export interface ProjectsStateField {
    pending: boolean;
    error: string | null;
    data: Project[];
}
