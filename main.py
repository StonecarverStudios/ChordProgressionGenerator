"""
//////////NOTES//////////////
How will the code "know" what chords to use?
Maybe favor certain "basic" chords? (I V more common than other chords?)
Setting rules, like where it has to 'resolve' to the I (More likley to end on a V or V7)



Key: common notes


^ operator = inversions
* operator = repeating
| operator seems to be sequencing chords


C is a function, chord is a class


chord function syntax (C):
C(chord(str), octave, block duration, arpeg note duration)

"""
from musicpy import *

"""
print("playing guitar Bmaj7")
guitar = C("Bmaj7", 3, 1/4, 1/8)
play(guitar, bpm=100, instrument=25, wait=True)

"""
print("")

#Prints Notes/DATA of C MaJor Scale, chords from that sclae, and more complex chords that dont have explicit definition

key1 = "C"
scales = scale(key1, "major")
print(scale(key1, "major"))

print()

Cmajor_scale = S('C major')
print(Cmajor_scale.get_chord('ii', '7'))

print()

e7sharp9 = get_chord('E', interval=[0, 4, 7, 10, 15])
print(e7sharp9)

#SAMPLE
#---------------------------------------------------------------
# a nylon string guitar plays broken chords on a chord progression
"""
guitar = (C('CM7', 3, 1/4, 1/8)^2 |
          C('G7sus', 2, 1/4, 1/8)^2 |
          C('A7sus', 2, 1/4, 1/8)^2 |
          C('Em7', 2, 1/4, 1/8)^2 | 
          C('FM7', 2, 1/4, 1/8)^2 |
          C('CM7', 3, 1/4, 1/8)@1 |
          C('Ab7', 2, 1/4, 1/8)^2 |
          C('G7sus', 2, 1/4, 1/8)^2) *2

print(C('CM7', 3, 1/4, 1/8) * 2)

play(guitar, bpm=100, instrument=25, wait=True)


"""

# Toby's stuff
"""import random

key = "A"
our_scale = scale(key, "major")
#print(our_scale.notes)
#print(scale(key, "major"))

major_chord_types = ["maj", "min", "min", "maj", "maj", "min", "dim", "maj"]


chords = [
  C(
    our_scale.notes[i].base_name + major_chord_types[i], 4
  )
  for i in range(8)
]

chords_to_play = chords[0]
for i in range(1, 8):
  chords_to_play = chords_to_play | chords[i]


print("major chords playing:")
play(chords_to_play, bpm=100, instrument=25, wait=True)
"""