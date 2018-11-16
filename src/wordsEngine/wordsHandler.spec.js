import WordsHandler from './wordsHandler';

describe('words handler', function () {
    let wh;

    beforeEach(() => {
        wh = new WordsHandler();
    });

    it('should try to run command with given params', (done) => {
        wh.addCommand({
            id: 5, name: 'hello', logic: (a, b) => {
                a === 'bullet' && b === 'try' && done()
            }
        });
        wh.runText('hello bullet try');
    });
});