import React, {Component} from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transcript: ''
        };

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || function(){};

        this.recognition = new SpeechRecognition({interimResults: true, continuous: false});

        this.recognition.onstart = () => {
            // this.setState({transcript: 'Voice recognition activated. Try speaking into the microphone.'});
            console.log('speech start');
        };

        this.recognition.onspeechend = () => {
            // this.setState({transcript: 'You were quiet for a while so voice recognition turned itself off.'});
            console.log('speech end');
            this.startSpeech();
        };

        this.recognition.onend = () => {
            this.startSpeech();
        };

        this.recognition.onerror = (event) => {
            if (event.error === 'no-speech') {
                // this.setState({transcript: 'No speech was detected. Try again.'});
                console.log('speech silent');
            }
            this.startSpeech();
        };

        this.recognition.onresult = (event) => {

            // event is a SpeechRecognitionEvent object.
            // It holds all the lines we have captured so far.
            // We only need the current one.
            // var current = event.resultIndex;

            // Get a transcript of what was said.
            var transcript = event.results[0][0].transcript;

            console.log(event.results);

            // Add the current transcript to the contents of our Note.
            this.setState({transcript: this.state.transcript + ' ' + transcript});
            this.startSpeech();
        }
    }

    startSpeech(){
        setTimeout(() => {
            try {
                this.recognition.start();
            } catch (e) {

            }
        }, 10);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <button onClick={() => this.recognition.start()}>transcribe</button>
                    <button onClick={() => this.recognition.stop()}>stop</button>
                    {this.state.transcript}
                </header>
            </div>
        );
    }
}

export default App;
