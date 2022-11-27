

export const getFileFromElId = (id) => {
    files.forEach((fileEl) => {
        if (fileEl.id == id) {
            console.log(fileEl)
            setFile(fileEl.name)
        }
    })
}