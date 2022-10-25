import tensorflow as tf
import numpy as np
import tensorflow_datasets as tfds
import matplotlib.pyplot as plt
import pathlib
import os
from sklearn.model_selection import train_test_split

def make_noise(n, z):
    return np.random.normal(0, 1, size=(n,z))

n = 5
z = 100
Generator = tf.keras.models.load_model('Generator_Faces.h5')
samples = Generator.predict(make_noise(n,z))
plt.figure(figsize=(15,6))
for i in range(n):
    plt.subplot(1,n, (i+1))
    plt.imshow(samples[i].reshape(128,128,3))
    plt.axis('off')
plt.savefig("Sample_From_Loaded_Model",
           bbox_inches='tight',
           pad_inches = 0.5,
           transparent = False,
           dpi =400)
plt.show()