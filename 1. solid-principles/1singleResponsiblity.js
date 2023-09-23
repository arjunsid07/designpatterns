/**
 * A Class/Module should have single primary responsibility. 
 * And it should be modified according to modification in that responsibility. 
 */

const fs = require("fs");

/**
 * The responsibility of class Journal is to add/remove entries
 */
class Journal{
    constructor(){
        this.entries={};
    }

    addEntry(text){
        let c = ++Journal.count;
        let entry = `${c}: ${text}`;
        this.entries[c] = entry;
        return c;
    }

    removeEntry(index){
        delete this.entries[index];
    }

    toString(){
        return Object.values(this.entries).join("\n");
    }

    /**
     * All These three methods are related to serialization instead of managing Journal entries
     * So, These methods should be removed from Journal class to maintain single Responsibility Principle 
     * Also, Serialization could be needed by other classes as well, so there should be a single responsibilty class
     * to manage serialization of data.
     * Moved these methods to new class as PersistanceManager
     */
    // save(fileName){
    //     fs.writeFileSync(fileName,this.toString());
    // }

    // load(fileName){
    //         //
    // }

    // loadFromURL(url){
    //         //
    // }

}
Journal.count = 0;

class PersistanceManager{

    preprocess(){
        /**
         * Action to be performed on data before saving to a file or 
         * after fetching from a file
         */
    }

    saveToFile(journal,fileName){
        fs.writeFileSync(fileName,journal.toString());
    }
}

let j = new Journal();

j.addEntry("Entry 1");
j.addEntry("Entry 2");

console.log(j.toString());

let p = new PersistanceManager();
let fileName = "journal.txt";
p.saveToFile(j,fileName);

