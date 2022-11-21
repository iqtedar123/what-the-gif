import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Video,
  Image,
  Card,
  CardBody,
  TextInput,
  FormField,
} from "grommet";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { Spinner } from "grommet";
import { Heading } from "grommet/components/Heading";
import { v4 as uuidv4 } from "uuid";
import Poll from "../poll/Poll";
import { CardHeader } from "grommet";

const DEFAULT_START = 0;
const DEFAULT_LENGTH = 6;

const ffmpeg = createFFmpeg();

export const Editor = () => {
  const [start, setStart] = useState(DEFAULT_START);
  const [gifLength, setGifLength] = useState(DEFAULT_LENGTH);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [videoInput, setVideoInput] = useState<File | null>(null);
  const [gif, setGif] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const prepareFfmpeg = async () => {
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }
  };

  useEffect(() => {
    prepareFfmpeg();
  }, []);

  const convertToGif = async (video: File | null) => {
    setIsLoading(true);
    if (video) {
      // @ts-ignore
      ffmpeg.FS("writeFile", "test.mp4", await fetchFile(video));

      // Run the FFMpeg command
      await ffmpeg.run(
        "-i",
        "test.mp4",
        "-t",
        gifLength.toString(),
        "-ss",
        start.toString(),
        "-f",
        "gif",
        "out.gif"
      );

      // Read the result
      const data = ffmpeg.FS("readFile", "out.gif");

      // Create a URL
      const url = URL.createObjectURL(
        new Blob([data.buffer], { type: "image/gif" })
      );
      setGif(url);
    }
    setIsLoading(false);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files?.length > 0) {
      const file = files.item(0);
      setVideoInput(file);
      convertToGif(file);
    }
  };

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Card align="center">
      <CardHeader>
        <Heading level={1}>Let the magic happen!</Heading>
      </CardHeader>
      <CardHeader>
        <Heading level={4} color="red">
          Disclaimer: Max file size is 2GB!
        </Heading>
      </CardHeader>
      <CardBody align="center">
        <FormField label="Gif length (seconds)">
          <TextInput
            value={DEFAULT_LENGTH}
            type="number"
            onChange={(event) => setGifLength(parseInt(event.target.value))}
          />
        </FormField>
        <FormField label="Gif Start (seconds)">
          <TextInput
            value={DEFAULT_START}
            type="number"
            onChange={(event) => setStart(parseInt(event.target.value))}
          />
        </FormField>
        <input type="file" onChange={onInputChange} hidden ref={fileInputRef} />
        <Button primary label="Start Converting" onClick={openFileInput} />
        <Box
          width={"medium"}
          pad={{ top: "16px", bottom: "8px" }}
          align={"center"}
        >
          {videoInput && (
            <>
              <Heading level={3} weight={"bold"} color={"accent-1"}>
                Source:
              </Heading>
              <Box pad={{ top: "16px" }} round margin={{ top: "8px" }}>
                <Video fit="cover">
                  <source key="video" src={URL.createObjectURL(videoInput)} />
                </Video>
              </Box>
            </>
          )}
          {isLoading && (
            <Spinner
              size={"large"}
              color={"accent-1"}
              margin={{ top: "8px" }}
            />
          )}
          {gif && (
            <>
              <Heading level={3} weight={"bold"} color={"accent-1"}>
                YOUR GIF/JIF:
              </Heading>
              <Box width="medium" round margin={{ top: "8px" }}>
                <Image fit="contain" src={gif} fill={true} />
              </Box>
              <Button
                primary
                label="Download GIF/JIF"
                href={gif}
                download={`${uuidv4()}.gif`}
                margin={{ top: "8px" }}
              />
            </>
          )}
        </Box>
      </CardBody>
    </Card>
  );
};
