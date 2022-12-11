import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path
import os
from sklearn.model_selection import train_test_split
import sys

numImg = int(sys.argv[1])

for index in range(numImg):
    def make_noise(n, z):
        return np.random.normal(0, 1, size=(n,z))

    n = 16
    z = 100

    path = os.getcwd() + "./"
    Generator = tf.keras.models.load_model(path + './Generator.h5')
    samples = Generator.predict(make_noise(n,z))
    samples = (samples + 1.0) / 2.0
    plt.figure(figsize=(4,4))
    for i in range(n):
        plt.subplot(4,4, (i+1))
        plt.imshow(samples[i].reshape(64,64,3))
        plt.axis('off')
        plt.savefig(f'./Samples/Sample_From_Loaded_Model_{index}',
               bbox_inches='tight',
               pad_inches = 0,
               transparent = False,
               dpi =400)
    plt.show()
