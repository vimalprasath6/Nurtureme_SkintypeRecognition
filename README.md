# Skin Type Recognition System

This project implements a **Skin Type Recognition System** that classifies human skin types into three categories:

- **Oily**  
- **Normal**  
- **Dry**  

The system is built using **Convolutional Neural Networks (CNNs)** trained on a labeled dataset of facial skin images. The CNN model is capable of learning skin texture and color features to accurately classify skin type.

---

## Project Overview

The project consists of the following components:

1. **ML Model**: A CNN-based architecture trained to classify skin types. The trained model is stored as a `.h5` file.
2. **Input Features**: Images of the face, along with optional numeric skin data.
3. **Prediction**: The model predicts the skin type category (Oily, Normal, or Dry).
4. **Future Plans**: Integration of a **Recommendation Engine** to suggest skincare products based on predicted skin type.

---

## Dataset

- The dataset contains images of various skin types labeled as **Oily**, **Normal**, or **Dry**.
- Images were preprocessed and resized to a uniform shape to be suitable for CNN training.
- The dataset is not included in this repository due to size and privacy concerns, but instructions to prepare your own dataset can be added in the future.

---

## Model Architecture

The CNN model consists of:

- **Input layer** for images of shape `(height, width, 3)`.
- **Convolutional layers** to extract spatial features.
- **Pooling layers** to reduce dimensionality.
- **Dense layers** with ReLU activations.
- **Output layer** with softmax activation for three-class classification.

The model is trained using **categorical cross-entropy loss** and **Adam optimizer**.

---

## Installation

1. Clone this repository:
```
git clone https://github.com/vimalprasath6/Nurtureme_SkintypeRecognition
```
2.Create a virtual environment:
```
python -m venv .venv
```
3.Activate the virtual environment:
Windows:
```
.venv\Scripts\activate
```
Linux/macOS:
```
source .venv/bin/activate
```
4.Install dependencies:
```
pip install -r requirements.txt
```
## Future Work

Build a Recommendation Engine to suggest skincare products based on predicted skin type.

Include more image augmentation and preprocessing to improve CNN model accuracy.

Deploy the model as a web application for user-friendly skin type detection.

## Contributing

Contributions are welcome! You can:

Improve the CNN model architecture.

Add support for additional skin types.

Implement the Recommendation Engine.

Improve dataset preprocessing and augmentation.

Feel free to fork the repo and submit a pull request.
