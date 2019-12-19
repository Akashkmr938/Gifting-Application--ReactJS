import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

export default function SortFilter(props) {
    const classes = useStyles();

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="grouped-select">Sort By:</InputLabel>
                <Select onChange={(event) => props.sortHandler(event.target.value)} defaultValue="" input={<Input id="grouped-select" />}>
                    <ListSubheader>Name</ListSubheader>
                    <MenuItem value={1}>A-Z</MenuItem>
                    <MenuItem value={2}>Z-A</MenuItem>
                    <ListSubheader>Price</ListSubheader>
                    <MenuItem value={3}>High to Low</MenuItem>
                    <MenuItem value={4}>Low to High</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

