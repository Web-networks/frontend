import React from 'react';
import { Image, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import DataUploaderImage from './icons/data.svg';
import css from './DataPage.module.css';

interface DataPageConnectProps {
}

interface DataPageDispatchProps {
}

interface DataPageOwnProps {
}

type DataPageProps = DataPageConnectProps & DataPageDispatchProps & DataPageOwnProps;

function DataPageComponent(): React.ReactElement {
    return (
        <div className={css.root}>
            <Image
                src={DataUploaderImage}
                width={80}
                height={80}
                className={css.dataUploaderImage}
            />
            <Button variant='success'>{'Upload your data'}</Button>
        </div>
    );
}

export const DataPage = connect<DataPageConnectProps, DataPageDispatchProps, DataPageOwnProps>(
    null,
)(DataPageComponent);
