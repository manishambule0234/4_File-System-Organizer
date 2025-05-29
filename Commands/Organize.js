const fs = require('fs');
const path = require('path')
let types = {
    media: ["mp4", "mkv", "mp3", "png", "jpeg", "jpg"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
        "docx",
        "doc",
        "pdf",
        "xlsx",
        "xls",
        "odt",
        "ods",
        "odp",
        "odg",
        "odf",
        "txt",
        "ps",
        "tex",
    ],
    app: ["exe", "dmg", "pkg", "deb"],
};
function organizeFn(dirpath) {
    let destpath;
    if (dirpath == undefined) {
        console.log("Please enter a directory path")
        return;
    }
    else {
        let doesexist = fs.existsSync(dirpath)
        // console.log(doesexist)

        if (doesexist == true) {
            destpath = path.join(dirpath, 'organized_files')

            if (fs.existsSync(destpath) == false) {
                fs.mkdirSync(destpath)
            }
            else {
                console.log("This folder already exist")
            }
        }
        else {
            console.log("Please enter valid path")
        }
    }

    organizeHelper(dirpath, destpath);
}

function organizeHelper(src, dest) {
    let childNames = fs.readdirSync(src)
    // console.log(childNames)

    for (let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(src, childNames[i])
        let isFile = fs.lstatSync(childAddress).isFile()
        // console.log(childAddress +"  : "+ isFile)

        if (isFile == true) {
            let filecategory = getCategory(childNames[i])
            console.log(childNames[i] + " belongs to " + filecategory)

            sendFiles(childAddress, dest, filecategory)
        }
    }
}

function getCategory(name) {
    let ext = path.extname(name)
    ext = ext.slice(1)
    // console.log(ext)

    for (let type in types) {
        let cTypeArr = types[type]
        // console.log(cTypeArr)

        for (let i = 0; i < cTypeArr.length; i++) {
            if (ext == cTypeArr[i])//we matched the extension

                return type
        }
    }
    return 'others'
}

function sendFiles(srcFilePath, dest, filecategory) {
    let catpath = path.join(dest, filecategory)// here we are making file categories paths

    if (fs.existsSync(catpath) == false) {
        // checking for category folder path
        fs.mkdirSync(catpath)
    }

    let fileName = path.basename(srcFilePath)// we took out the names of the files
    let destFilepath = path.join(catpath, fileName)// here we created a path for the files in category folders

    fs.copyFileSync(srcFilePath, destFilepath)// copied files from src to dest

    fs.unlinkSync(srcFilePath) // deleted the files from src

    console.log(fileName + " is copied to " + filecategory)
}

module.exports = {
    organizekey: organizeFn
}