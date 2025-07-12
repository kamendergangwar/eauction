import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox'; // Import Checkbox
import { Box, Chip, OutlinedInput } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
    FormControl: {
        '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            transform: 'translate(14px, 2px) scale(0.75)'
        }
    }
}))

const MultipleSelectBox = (props) => {
    const { label, name, options, isNone, value, handleChange, handleDelete, ...rest } = props;
    const classes = useStyle();
    const onDeleteClick = (event, item) => {
        event.preventDefault();
        event.stopPropagation();
        handleDelete(item);
    };

    const onDeletePrevent = (event, item) => {
        const isDeleteIconClicked = event.target.closest('.MuiChip-deleteIcon') !== null;
        if (isDeleteIconClicked) {
            event.stopPropagation();
            handleDelete(item);
        }
    };

    return (
        <FormControl variant='outlined' fullWidth className={classes.FormControl}>
            <InputLabel>{label}</InputLabel>
            <Select
                style={{ marginTop: "8px", borderRadius: "8px" }}
                name={name}
                label={label}
                {...rest}
                multiple
                input={
                    <OutlinedInput
                        label={label}
                        name={name}
                        id={`${name}-outlined-input`}
                        labelWidth={60}
                    />
                }
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip style={{ margin: 1, height: 22, fontWeight: 600 }} key={value} label={value} onDelete={(event) => onDeleteClick(event, value)} onMouseDown={(event) => onDeletePrevent(event, value)} />
                        ))}
                    </Box>
                )}
                value={value}
                onChange={handleChange}
            >
                {isNone && (
                    <MenuItem value="None">
                        <em>None</em>
                    </MenuItem>
                )}
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.label}>
                        <Checkbox color='primary' checked={value.includes(option.label)} />
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default MultipleSelectBox;
