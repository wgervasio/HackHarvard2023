import yolov5

# load model
model = yolov5.load('keremberke/yolov5m-garbage')
  
# set model parameters
model.conf = 0.25  # NMS confidence threshold
model.iou = 0.45  # NMS IoU threshold
model.agnostic = False  # NMS class-agnostic
model.multi_label = False  # NMS multiple labels per box
model.max_det = 1000  # maximum number of detections per image

import torch
torch.save(model, 'model_weights.pth')