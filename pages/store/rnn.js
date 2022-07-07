import * as music_rnn from '@magenta/music';
import * as Tone from 'tone'

let improvRNN = new music_rnn.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/drum_kit_rnn');
// let improvRNN = new music_rnn.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/chord_pitches_improv');

let improvRNNLoaded = improvRNN.initialize();

// const getGeneratedSamples = (orginalPart) => {
// 	let test = [];
// 	generateSamples(orginalPart).then(
// 	val => {return val})
	
// 	// console.log("test sadfds", test)
// 	return test;
// }

const generateSamples = async (orginalPart) => {
    await improvRNNLoaded;
	
	let original = {
        notes: orginalPart.map(([time, note]) => ({
            pitch: Tone.Frequency(note).toMidi(),
            quantizedStartStep: time,
            quantizedEndStep: time + 0.3
        })),
        totalQuantizedSteps: 32,
        quantizationInfo: { stepsPerQuarter: 4 }
    }

    let steps = 5;
    let temperature = 2;
	//console.log(original);
	
    let result = await improvRNN.continueSequence(
	original, steps, temperature
	);
	
	let newPart = []
	for (let i = 0; i < result.notes.length; i++) {
	    let toneTime = Tone.Time(result.notes[i].quantizedStartStep).toSeconds();
	    let toneNote = Tone.Frequency(result.notes[i].pitch, 'midi').toNote();
	    newPart.push([toneTime, toneNote]);
	}

	//console.log("what we want: ", newPart);
    return newPart;
}


export default generateSamples