// We will be creating a File System Organizer//
//Features of the Project -
//If you have numerous Files in a folder and they are not Properly arranged
//So you can use this tool to arrange them in specific directory according to their extension
// like text files will go into text File Folder.exe files will go into application folder a
// so at the end you will have-a-arranged set of files in specific folders

//  let input = process.argv[2]

const helpmodule = require('./Commands/help')
const organizemodule = require('./Commands/Organize')
const treemodule = require('./Commands/tree')

let inputArr = process.argv.slice(2)
//  console.log(input)

let command = inputArr[0] //tree,Organize,help

switch (command) {

    case 'tree':
        treemodule.treekey(inputArr[1])
        break;

    case 'organize':
        organizemodule.organizekey(inputArr[1])
        break;
    case 'help':
        helpmodule.helpkey()
        break;

    default:
        console.log("Please Enter Valid Input")
        break;
}
