export default function showWarningOnExit(event) {
    event.returnValue = "Reloading this page can cause exceptions and can result in failure.\nDo you wish to continue?"
}

export function shuffleArray(array) {

    array.sort(() => Math.random() - 0.5);
    return array;
}
