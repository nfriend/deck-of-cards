export function originIsAllowed(origin: string) {
    var isAllowed = false;
    allowedOrigins.forEach(function(element, index, array) {
        if (element.test(origin)) {
            isAllowed = true;
        }
    });

    return isAllowed;
}