export const stickyHeader = () => {
    let number =
        window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop || 0

    const header = document.getElementById("headerSticky")

    if (header !== null) {
        if (number >= 300) header.classList.add("nav-sticky")
        else header.classList.remove("nav-sticky")
    }
}
