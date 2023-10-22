import torch
model = torch.load('yolo_model.pth')
img = '../data/garbage_classification/paper/paper1.jpg'

# perform inference
results = model(img, size=640)

# inference with test time augmentation
results = model(img, augment=True)

# parse results
predictions = results.pred[0]
boxes = predictions[:, :4].flatten().tolist() # x1, y1, x2, y2
scores = predictions[:, 4].flatten().tolist()
categories = predictions[:, 5].flatten().tolist()


print(boxes)
print(scores)
print(categories)