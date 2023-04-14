import React, { useState } from 'react';
import { Card, CardContent, FormControlLabel, Radio, Stack, Typography } from '@mui/material';
import Private from './private';
import Company from './company';


interface TypeOption {
    value: string;
    label: string;
}
const radio: TypeOption[] = [
    {
        value: 'private',
        label: 'Private Individual/Self-Employed',
    },
    {
        value: 'company',
        label: 'Company',
    },
];

const Fascal = () => {
    const [category, setCategory] = useState('private');

    const handlechange = (event: any) => {
        setCategory(event.target.value)
    }

    return (
        <Stack spacing={4}>
            <Card>
                <CardContent>
                    <div>
                        {radio.map((item) => (
                            <FormControlLabel
                                control={<Radio checked={item.value === category} />}
                                key={item.value}
                                label={(
                                    <Typography variant="body1">
                                        {item.label}
                                    </Typography>
                                )}
                                value={item.value}
                                onClick={(event) => handlechange(event)}
                            />
                        ))}
                    </div>
                    {category === 'private' ? <Private /> : <Company />}
                </CardContent>
            </Card>
        </Stack>
    )
}

export default Fascal