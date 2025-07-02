from musicpy import *
import random

'''
#Defines and maps the roman numeral degree of every mode of the major scale, and the 3 common minor scales#
    -degree -> an integer (from 1 to 7) indicating the scale degree.
    -mode -> a string specifying which scale or mode you're using (default is 'major').

'''
def getRomanNumeral(degree, mode='major'):
    if mode == 'major':
        numerals = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°']
    elif mode == 'harmonic minor':
        numerals = ['i', 'ii°', '♭IIIaug', 'iv', 'V', '♭VI', 'vii°']
    elif mode == 'melodic minor':
        numerals = ['i', 'ii', '♭IIIaug', 'IV', 'V', 'vi°', 'vii°']
    elif mode == "dorian":
        numerals = ['i', 'ii', '♭III', 'IV', 'v', 'vi°', '♭VII']
    elif mode == "phrygian":
        numerals = ['i', '♭II', '♭III', 'iv', 'v°', '♭VI', '♭vii']
    elif mode == "lydian":
        numerals = ['I', 'II', 'iii', '♯iv°', 'V', 'vi', 'vii']
    elif mode == "mixolydian":
        numerals = ['I', 'ii', 'iii°', 'IV', 'v', 'vi', '♭VII']
    elif mode == "minor":
        numerals = ['i', 'ii°', '♭III', 'iv', 'v', '♭VI', '♭VII']
    elif mode == "locrian":
        numerals = ['i°', '♭II', '♭iii', 'iv', '♭V', '♭VI', '♭vii']    
    else:
        raise ValueError("Unsupported mode")
    
    return numerals[degree - 1]



'''
# Generates a Chord Progression and returns Chord object and List so it can playback progression and list what the progression is #
    num -> Number of chords you want in the progression
    key_note -> Key you want the Chord Progresion to be
    mode -> Mode you want chords to be chosen from
    numNotes -> The notes you want in each chord

'''
def GenerateChordPogression(num: int = 4, key_note: str = "C", mode: str = "major", numNotes: int = 3):
    #define varibles and create inital pattern
    key = scale(key_note, mode)
    degressList = [random.randint(1, 7) for i in range(num)]
    degressList[num-1] = 1 # Makes sure the progression resolves on tonic so it is more likley to make musical sense
    progressionNotes = key.pattern(degressList, num=numNotes)

    romanDegrees = []
    progressionList = []
    progressionPlay = []

    for i, chord_obj in enumerate(progressionNotes):
        deg = degressList[i]
        roman = getRomanNumeral(deg, mode)
        name = alg.detect(chord_obj)#Identify and name chords based off of notes given

        romanDegrees.append(roman)
        progressionList.append(name)
        progressionPlay.append(C(name))

    lowered = chord(progressionPlay).down(12)#Brings all notes down and octave 


    return concat(lowered), progressionList, romanDegrees


#Test Function in a nice format :)
print()
chordPlay, chordList, romanDegrees = GenerateChordPogression(5, "F#", "major", 4) #unpacks return value
print("Roman Numerals: \n" + ', '.join(romanDegrees))
print()
print("Your Progression: \n" + ', '.join(chordList))
play(chordPlay, bpm=40, instrument=25, wait=True)

