export function autoProto(url) {
    if (_.isString(url) && _.startsWith(url, '//')) {
        // currently SSL
        let urlWithProto = `https:${url}`;

        try {
            return new URL(urlWithProto).href;
        } catch (e) {
            return url;
        }
    }

    return url;
}
