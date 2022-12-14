import { Image } from "react-native";
import React, { useEffect, useState } from "react";

const ScaleImage = (props) => {
  const { uri, width, height } = props;
  const { imgWidth, setImgWidth } = useState(0);
  const { imgHeight, setImgHeight } = useState(0);

  useEffect(() => {
    Image.getSize(source, (width1, height1) => {
      if (width && !height) {
        setImgWidth(width), setImgHeight(height1 * (width / width));
      } else if (!width && height) {
        setImgWidth(width1 * (height / height));
        setImgHeight(height);
      } else {
        setImgWidth(width1), setImgHeight(height1);
      }
    });
  }, []);

  return (
    <Image
      source={{ uri: uri }}
      style={{ height: imgHeight, width: imgWidth }}
    />
  );
};

export default ScaleImage;
