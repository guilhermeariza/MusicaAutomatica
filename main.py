from transformers import pipeline

cls = pipeline("automatic-speech-recognition")

res = cls("Gravando.m4a")