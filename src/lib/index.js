// Simple libraries
export function toUrl(id) {
    return 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + id.padStart(3, '0') + '.png';
}
export function toId(url) {
    return  url.split('pokemon-species')[1].replaceAll('/', '');
}
export function capitalize(name) {
    name = name.split('-').map(i => i[0].toUpperCase() + i.substring(1).toLowerCase()).join(' ');
    return name;
}
export const api = 'https://pokeapi.co/api/v2/';
export const typeToColor = {
    bug: "#92BC2C",
    dark: "#595761",
    dragon: "#0C69C8",
    electric: "#F2D94E",
    fire: "#FBA54C",
    fairy: "#EE90E6",
    fighting: "#D3425F",
    flying: "#A1BBEC",
    ghost: "#5F6DBC",
    grass: "#5FBD58",
    ground: "#DA7C4D",
    ice: "#75D0C1",
    normal: "#A0A29F",
    poison: "#B763CF",
    psychic: "#FA8581",
    rock: "#C9BB8A",
    steel: "#5695A3",
    water: "#539DDF"
}
export function dimColor(color) {
    return `color-mix(in srgb, ${color} 50%, rgb(130, 130, 130))`;
}

