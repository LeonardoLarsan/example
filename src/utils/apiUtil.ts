export const getBearerToken = (rawHeaders:Array<string>): string => {
    const bearerToken = rawHeaders.find(header=>header.includes('Bearer'))
    if(!bearerToken) return ''
    return bearerToken.split(' ')[1]
}