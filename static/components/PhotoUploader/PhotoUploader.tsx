import React, { ChangeEvent } from 'react';
import { Button } from 'react-bootstrap';

import css from './PhotoUploader.module.css';

interface PhotoUploaderProps {
    setImage: (value: string) => void;
    setFile?: (file: File) => void;
}

export function PhotoUploader(props: PhotoUploaderProps): React.ReactElement {
    const { setImage, setFile } = props;
    const onChangeFile = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.item(0);
        if (!file) {
            return;
        }
        if (setFile) {
            setFile(file);
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (reader.result) {
                setImage(reader.result.toString());
            }
        };
    }, []);
    return (
        <form>
            <Button variant='primary'>
                <label className={css.label} htmlFor='file-uploader'>
                    {'Upload file'}
                </label>
            </Button>
            <input id={'file-uploader'} type='file' className={css.fileUploader} onChange={onChangeFile} />
        </form>
    );
}
