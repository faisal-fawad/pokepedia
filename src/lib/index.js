// Simple libraries
export function toUrl(id) {
    return 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + id.padStart(3, '0') + '.png';
}
export const api = 'https://pokeapi.co/api/v2/';
