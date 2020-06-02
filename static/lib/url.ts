export function makeProjectsUrl(username: string) {
    return `/${username}/projects/`;
}

export function makeProjectUrl(user: string, project: string) {
    return `/${user}/${project}`;
}
