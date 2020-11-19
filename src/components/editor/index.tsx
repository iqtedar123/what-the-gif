import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Video, Image, Card, CardBody, TextInput, FormField } from "grommet";
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const DEFAULT_START = 0;
const DEFAULT_LENGTH = 6;

const ffmpeg = createFFmpeg();

export const Editor = () => {
    const [start, setStart] = useState(DEFAULT_START);
    const [gifLength, setGifLength] = useState(DEFAULT_LENGTH);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [videoInput, setVideoInput] = useState<File | null>(null);
    const [gif, setGif] = useState("");


    const prepareFfmpeg = async () => {
       if (!ffmpeg.isLoaded() ) {
            await ffmpeg.load();
       }
    }

    useEffect(() => {
        prepareFfmpeg();
    }, []);

    const convertToGif = async (video: File | null) => {
        if (video) {
            // @ts-ignore
            ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video));
    
            // Run the FFMpeg command
            await ffmpeg.run('-i', 'test.mp4', '-t', gifLength.toString(), '-ss', start.toString(), '-f', 'gif', 'out.gif');
        
            // Read the result
            const data = ffmpeg.FS('readFile', 'out.gif');
        
            // Create a URL
            const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));
            setGif(url)
        }
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files?.length > 0) {
            const file = files.item(0);
            setVideoInput(file)
            convertToGif(file);
        }
       
    }

    const openFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    return (
        <Box fill={true}>
            <Card>
                <CardBody pad="medium" align="center">
                    <Box>
                        <FormField label="Gif length (seconds)">
                            <TextInput value={DEFAULT_LENGTH} type="number" onChange={event => setGifLength(parseInt(event.target.value))} />
                        </FormField>
                        <FormField label="Gif Start (seconds)">
                            <TextInput value={DEFAULT_START} type="number" onChange={event => setStart(parseInt(event.target.value))} />
                        </FormField>
                    </Box>
                    <input type="file" onChange={onInputChange} hidden ref={fileInputRef} />
                    <Button primary label="Start Converting" onClick={openFileInput} />
                    <Box width={"medium"} height={"xlarge"} pad={{ top: "16px" }}>
                        {gif && <Box width="medium">
                                <Image fit="contain" src={gif} fill={true} />
                            </Box>}
                        {videoInput && 
                            <Box  pad={{top: "16px" }}>
                                <Video fit="cover">
                                    <source key="video" src={URL.createObjectURL(videoInput)} />
                                </Video>
                            </Box>
                        }
                    </Box>
                </CardBody>
            </Card>
        </Box>
    );
};