from musicpy import *
import random

#List of supported (and desired) chord extentions
ChordEx = ["maj", "min", "maj7", "m7", "7", 
            "sus", "sus2", "sus", 
            "9", "maj9", "m9", "6", "m6", 
            "11", "maj11", "m11", "add2", 
            "add9", "7sus4", "7sus2", "13", 
            "maj13", "m13", "maj13#11", "dim", "m7b5", 
            "aug","aug6", "aug7"]

'''
#Splits a chord by the root and extension
    -Chordname -> String of the chord name

'''
def splitChord(Chordname):
    #List of all possible roots
    roots = ["C", "C#", "Db", "D", "D#", "Eb", "E", "E#", "Fb", "F", "F#", "Gb", "G","G#", "Ab", "A", "A#", "Bb", "B", "B#", "Cb"]

    for roots in sorted(roots, key=len, reverse=True): #Sorts list from greatest length to least
        if Chordname.startswith(roots):
            chord_type = Chordname[len(roots):]
            return roots, chord_type
        
    #If function fails, return nothing
    return None, None

'''
#Swaps a chord with another. With a chance of either changing the root or the extension
    -Chordname -> String of the chord name
    -key_note -> Key of chord progression
    -mode -> a string specifying which scale or mode you're using
    -chance -> float of chance of whether root or extension changes (0.5 = 50%)

'''
def swapChord(Chordname, key_note, mode, deg, chance: float=0.5):
    #init variables
    new_deg = None
    newChord = None
    returnChord = None
    key = S(f"{key_note} {mode}") #f-string syntax, inserts variables directly as strings nicely.


    root_note, chord_type = splitChord(Chordname)

    #Fallback if splitChord fails
    if root_note is None or chord_type is None:
        return None, Chordname
    
    if random.random() < chance:
        #Chnages chord Type
        new_chord_type = random.choice(ChordEx)
        newChord = get_chord(root_note, new_chord_type)
        new_deg = deg
        print("We Are swaping chord types!!!") #Testing, showing which is being activated
    else:
        #Changes root
        new_deg = random.randint(1, 7)
        newChord = key.get_chord(str(new_deg), chord_type, natural=True)

        print("we are swapping root!!") #Testing, showing which is being activated


    returnChord = alg.detect(newChord)
    return new_deg, returnChord


'''
#Re-formats the names of specific chords to be more precice and look better when displayed
    -Chordname -> String name of a chord

'''
def formatName(Chordname):
    newName = Chordname.replace("half-diminished7", "ø")
    newName = newName.replace("major", "")
    newName = newName.replace("minor", "m")
    return newName

'''
#Defines and maps the roman numeral degree of every mode of the major scale, and the 3 common minor scales
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
        

    return numerals[int(degree) - 1]
    



'''
#Generates a Chord Progression and returns Chord object and List so it can playback progression and list what the progression is in both Roman Numerals and the Chord names in given key
    num -> Number of chords you want in the progression
    key_note -> Key you want the Chord Progresion to be
    mode -> Mode you want chords to be chosen from
    numNotes -> The notes you want in each chord

'''
def GenerateChordPogression(num: int = 4, key_note: str = "C", mode: str = "major", numNotes: int = 3):
    #Define varibles and create inital pattern
    key = scale(key_note, mode)
    degressList = [random.randint(1, 7) for i in range(num)]
    degressList[num-1] = 1 # Makes sure the progression most likely resolves on tonic so it is more likely to make musical sense
    progressionNotes = key.pattern(degressList, num=numNotes) 

    romanDegrees = []
    progressionList = []
    progressionPlay = []

    for i, chord_obj in enumerate(progressionNotes):
        deg = degressList[i]
        
        #Fallback if the getRomanNumeral fails
        if deg is None:
            roman = ""
        else:
            roman = getRomanNumeral(deg, mode)

        name = alg.detect(chord_obj) #Identify and name chords based off of notes given
        name = formatName(name)

        #Checks for duplicate adjacent chords and either changes the root or chord extension
        if i > 0 and deg == degressList[i-1]:
            deg, name = swapChord(name, key_note, mode, deg, 0.5) 

            #Fallback if getRomanNumeral fails if the root changes
            if deg is not None:
                roman = getRomanNumeral(deg, mode)
            else:
                roman = ""


        # Appends data created above to correct lists to order roman numeral degree, the progression itelf and the playable version. 
        romanDegrees.append(roman) #roman numeral degree
        progressionList.append(name) #Chord name in key
        progressionPlay.append(C(name)) #Playable chord object

    lowered = chord(progressionPlay).down(12)#Brings all notes down and octave 

    return concat(lowered), progressionList, romanDegrees


#Test Chord Progression Generator in a nice format that plays it back:)
print()
chordPlay, chordList, romanDegrees = GenerateChordPogression(5, "Db", "phrygian", 4) #unpacks return value
print("Roman Numerals: \n" + ', '.join(romanDegrees))
print()
print("Your Progression: \n" + ', '.join(chordList))
play(chordPlay, bpm=40, instrument=25, wait=True)
