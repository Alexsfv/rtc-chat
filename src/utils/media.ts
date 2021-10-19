export const hasTrack = (stream: MediaStream, trackKind: string) => {
    return stream.getTracks().some(t => t.kind === trackKind)
}