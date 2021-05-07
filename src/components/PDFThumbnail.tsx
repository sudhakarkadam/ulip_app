import React, { useState, useEffect } from "react";
import PdfThumbnail from "react-native-pdf-thumbnail";
import RNFetch from "rn-fetch-blob";

import { Image } from "./@styled/BaseElements";

interface PdfThumbnailProps {
  pdfLink: string;
}

const PDFThumbnail = ({ pdfLink }: PdfThumbnailProps) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const createThumbnail = async () => {
      const res = await RNFetch.config({ fileCache: true }).fetch(
        "GET",
        pdfLink
      );
      const { uri } = await PdfThumbnail.generate(res.path(), 0);
      setUrl(uri);
    };

    createThumbnail();
  }, [pdfLink]);

  return (
    <Image
      source={{ uri: url }}
      resizeMethod="resize"
      style={{ width: 95, height: 95 }}
    />
  );
};

export default PDFThumbnail;
