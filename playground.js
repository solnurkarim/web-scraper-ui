const data = 'samsung,galaxy,black';
const regex = '.*' + data.split(/,| /g).join('|') + '.*';

console.log(regex);