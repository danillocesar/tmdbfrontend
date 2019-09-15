export function joinGenres(genres:Genre[]):string{
    return genres.map(u => u.name).join(', ');
}