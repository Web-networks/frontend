export function getName(displayName: string) {
    return displayName
        .split(/[^\da-z]/ig)
        .filter(Boolean)
        .join('_')
        .toLowerCase();
}
