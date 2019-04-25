import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Header, Icon, Segment, Message, SemanticCOLORS, Label } from 'semantic-ui-react';
import { evaluateFile } from "../utils/evaluateFile";
import { DeviceQuality } from '../models/types';

export function InputFile() {
    const [result, setResult] = React.useState<Array<DeviceQuality>>([]);
    const [error, setError] = React.useState<string | null>(null);
    const [filePath, setFilePath] = React.useState<string>("");
    const onDrop = React.useCallback((acceptedFiles: Array<File>) => {
        const reader: FileReader = new FileReader();

        reader.onabort = () => setError('file reading was aborted');
        reader.onerror = () => setError('file reading has failed');
        reader.onload = () => {
            const binaryStr = reader.result;
            const [devices, processFileError] = evaluateFile(binaryStr as string);
            if (!processFileError) {
                setResult(devices);
                console.log('result', JSON.stringify(result));
                setError(processFileError);
            } else {
                setResult([]);
                setError(processFileError);
            }
            
        }
        if (acceptedFiles.length !== 1) {
            setError('read one file at a time only');
        }
        const file = acceptedFiles[0];
        reader.readAsBinaryString(file);
        setFilePath(file.name);
    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })
    const colorMessage = (e: string): SemanticCOLORS => {
        switch (e) {
            case 'discard': return 'red';
            case 'keep':
            case 'ultra precise': return 'green';
            default: return 'blue'
        }
    }
    const resultItem = (e: DeviceQuality) => {
        return <div key={e.name} className="device-result">
        <Label color={colorMessage(e.quality)}>{`${
          e.name
        }: ${e.quality}`}</Label>
      </div>
    }
    return (
        <>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Segment placeholder>
                    <Header icon>
                        <Icon name='file outline' />
                        Drop a file or click here to add a file
                    </Header>
                    <Button primary>Add File</Button>
                </Segment>

                {error === "" && <Message info>
                    <Message.Header>
                        {`File ${filePath} has ${result.length} devices`}
                    </Message.Header>
                    <Message.List items={result.map(e => resultItem(e)) } />
                </Message>

                }
                {!!error && <Message negative>
                    <Message.Header>Cannot process the file {filePath}</Message.Header>
                    <p>{error}</p>
                </Message>}

            </div>

        </>
    )
}