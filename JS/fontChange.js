const fontSelecter = document.getElementById("fontSelect");

fontSelecter.addEventListener("change", () => {
    const font = fontSelecter.value
    const body = document.getElementsByTagName("*");;
    for (var i = 0, len = body.length; i < len; i++) {
        var element = body[i];
        element.style.fontFamily = font
    }
})