const fs = require('fs');
const path = require('path')

function treeFn(dirpath) {
    if (dirpath == undefined) {
        console.log("Please enter valid path")
        return;
    }

    else {
        let doesExist = fs.existsSync(dirpath)
        if (doesExist == true) {
            treeHelper(dirpath, " ")
        }
    }
}

function treeHelper(targetpath, indent) {
    let isFile = fs.lstatSync(targetpath).isFile()

    if (isFile == true) {
        let fileName = path.basename(targetpath);
        console.log(indent + "├──" + fileName);
    }
    else {
        let dirName = path.basename(targetpath);
        console.log(indent + "└──" + dirName);

        let children = fs.readdirSync(targetpath)
        // console.log(children)
        // here we took out all the children of test folder

        for (let i = 0; i < children.length; i++) {
            let childpath = path.join(targetpath, children[i])
            treeHelper(childpath, indent + '\t')
        }
    }
}

module.exports = {
    treekey: treeFn
}