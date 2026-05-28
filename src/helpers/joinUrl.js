export function joinUrl(...parts) {
    return parts
        .map((part, index) => {
            if (index === 0) {
                return part.replace(/\/+$/, '');
            }

            return part.replace(/^\/+|\/+$/g, '');
        })
        .join('/');
}