// Copy to clipboard
function copyToClip(toCopy) {
    const elem = document.getElementById(toCopy);

    elem.select();
    elem.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(elem.value);
}
