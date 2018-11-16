import _ from 'lodash';

export default class WordsHandler{
    commandsById = new Map();
    commandsByName = new Map();

    constructor(initialCommands = []){
        initialCommands.forEach(this.addCommand.bind(this))
    }

    addCommand(command){
        this.commandsById.set(command.id, command);
        this.commandsByName.set(command.name, command);
    }

    runText(text){
        const words = text.split(' ');
        try{
            this.commandsByName.get(words[0]).logic(...words.slice(1))
        } catch (e) {
            console.error(e);
        }
    }
}