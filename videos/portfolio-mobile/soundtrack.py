"""Generate this reel's original, deterministic 24-second soundtrack."""
from pathlib import Path
import wave
import numpy as np

RATE = 48000
DURATION = 24
rng = np.random.default_rng(20260915)
audio = np.zeros((RATE * DURATION, 2), dtype=np.float64)

def add(signal, when, gain=1, pan=0):
    start = round(when * RATE)
    n = min(len(signal), len(audio) - start)
    if n <= 0 or start < 0:
        return
    left = np.sqrt((1 - pan) / 2)
    right = np.sqrt((1 + pan) / 2)
    audio[start:start+n, 0] += signal[:n] * gain * left
    audio[start:start+n, 1] += signal[:n] * gain * right

def pluck(frequency, duration=.9):
    t = np.arange(round(duration * RATE)) / RATE
    attack = 1 - np.exp(-t * 600)
    tone = np.sin(2*np.pi*frequency*t) + .18*np.sin(2*np.pi*frequency*2.002*t)
    return tone * attack * np.exp(-t * 6)

for i, f in enumerate([587.33, 659.25, 739.99, 880]):
    add(pluck(f, .35), .12 + i*.38, .045, -.25+i/6)
for f in [146.83, 220, 329.63]:
    add(pluck(f, 1.2), 2.04, .08)

chords = [[146.83,174.61,220,329.63], [130.81,164.81,196,293.66],
          [98,146.83,196,246.94], [110,164.81,220,293.66]]
roots = [73.416,65.406,49,55]
for bar in range(8):
    start = 4.8 + bar*2.4
    chord = chords[bar % 4]
    for j, f in enumerate(chord):
        t = np.arange(round(2.6*RATE)) / RATE
        envelope = (1-np.exp(-t*9))*np.exp(-t*1.35)
        signal = (np.sin(2*np.pi*f*t)+.23*np.sin(2*np.pi*f*1.0016*t))*envelope
        add(signal, start+j*.015, .037, -.5+j/3)
    for step in range(4):
        when = start+step*.6
        t = np.arange(round(.32*RATE))/RATE
        kick = np.sin(2*np.pi*(46*t+1.45*(1-np.exp(-t*31))))*np.exp(-t*18)
        add(kick, when, .20)
        bass = np.sin(2*np.pi*roots[bar%4]*t)*(1-np.exp(-t*120))*np.exp(-t*8)
        add(bass, when+.015, .105)
        if step in [1,3]:
            noise=rng.standard_normal(len(t)); noise=np.concatenate(([0.0],np.diff(noise)))
            add(noise*np.exp(-t*60), when, .012)
        for off in [.0,.3]:
            th=np.arange(round(.055*RATE))/RATE
            noise=rng.standard_normal(len(th)); noise=np.concatenate(([0.0],np.diff(noise)))
            add(noise*np.exp(-th*110),when+off,.008,.35 if off else -.35)
    for j in [0,2,1,3]:
        add(pluck(chord[j]*2,.75),start+.3+j*.45,.047,(-.2 if j%2 else .2))

for when in [6.15, 16.4, 20.3]:
    t=np.arange(round(.42*RATE))/RATE
    noise=rng.standard_normal(len(t))
    soft=np.convolve(noise,np.ones(20)/20,mode='same')
    add(soft*np.sin(np.pi*t/.42)**2,when,.065)

fade = np.clip((DURATION-np.arange(len(audio))/RATE)/1.4,0,1)
audio *= fade[:,None]
peak=float(np.max(np.abs(audio)))
audio *= .46/max(peak,1e-9)
out = Path(__file__).resolve().parent / 'assets/soundtrack.wav'
with wave.open(str(out),'wb') as f:
    f.setnchannels(2); f.setsampwidth(2); f.setframerate(RATE)
    f.writeframes((audio*32767).astype('<i2').tobytes())
print(f'Created {out}: {DURATION}s, {RATE} Hz, stereo')
