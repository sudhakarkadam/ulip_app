import React, { useState, useEffect } from "react";
import PdfThumbnail from "react-native-pdf-thumbnail";
import RNFetch from "rn-fetch-blob";

import { Image } from "./@styled/BaseElements";

const imageUrl = "http://samples.leanpub.com/thereactnativebook-sample.pdf";

const PDFThumbnail = () => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const createThumbnail = async () => {
      const res = await RNFetch.config({ fileCache: true }).fetch(
        "GET",
        imageUrl
      );
      const { uri } = await PdfThumbnail.generate(res.path(), 0);
      setUrl(uri);
    };

    createThumbnail();
  }, []);

  return (
    <Image
      source={{ uri: url }}
      resizeMethod="resize"
      style={{ width: 100, height: 100 }}
    />
  );
};

export default PDFThumbnail;
