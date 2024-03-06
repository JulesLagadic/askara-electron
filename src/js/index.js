
console.log('👋 This message is being logged by "renderer.js", included via webpack');

const readButton = document.getElementById('readButton')
const writeButton = document.getElementById('writeButton')
readButton.addEventListener('click', () => {
    window.electronAPI.readFile()
})
writeButton.addEventListener('click', () => {
    window.electronAPI.writeFile()
})