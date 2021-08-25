export default function showWarningOnExit(event) {
    event.returnValue = "Reloading this page can cause exceptions and can result in failure.\nDo you wish to continue?"
}

export const shuffleArray = (array) => {
    console.log(array)
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}