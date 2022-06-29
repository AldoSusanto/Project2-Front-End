import React, { Fragment } from "react";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const options = [
  "Pelajar",
  "Professional",
  "Gamer",
  "Designer",
  "Editor",
  "Animator",
  "Programmer",
  "Lainnya",
];

function getStyles(name, category, theme) {
  return {
    fontWeight:
      category.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SelectInput(props) {
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    props.setCategory(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Fragment>
      <FormControl className="contact-form-input">
        <InputLabel id="category">Kategori</InputLabel>
        <Select
          labelId="category"
          id="category-multiple"
          multiple
          value={props.category}
          onChange={handleChange}
          input={<OutlinedInput id="category" label="Category" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {options.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, props.category, theme)}
              className="option-input"
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {props.category.includes("Lainnya") && (
        <TextField
          id="alternativeCategory"
          name="alternativeCategory"
          label="Kategori Lainnya"
          variant="outlined"
          onChange={(e) => props.setOtherCategory(e.target.value)}
          value={props.otherCategory}
          className="contact-form-input"
        />
      )}
    </Fragment>
  );
}
