from tensorflow import keras
import matplotlib.pyplot as plt
(x_train,y_train),(x_test,y_test)=keras.datasets.cifar10.load_data()
print(x_train.shape,y_train.shape)

ann=keras.Sequential([
    # keras.layers.Flatten(input_shape=(32,32,3)),
    keras.layers.Dense(3000,activation='relu'),
    keras.layers.Dense(1000,activation="relu"),
    keras.layers.Dense(500,activation='relu'),
    keras.layers.Dense(10,activation='sigmoid')
])
ann.compile(
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"],
    optimizer="adam"
)
ann.fit(x_train,y_train,epochs=5)
