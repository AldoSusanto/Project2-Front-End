import { Box, TextField } from "@mui/material";
import React from "react";
import SelectInput from "./SelectInput";

export default function ContactForm(props) {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      className="contact-form"
    >
      <TextField
        id="name"
        name="name"
        label="Nama"
        variant="outlined"
        onChange={(e) => props.setName(e.target.value)}
        value={props.name}
        className="contact-form-input"
      />
      <SelectInput
        category={props.category}
        setCategory={props.setCategory}
        otherCategory={props.otherCategory}
        setOtherCategory={props.setOtherCategory}
      />
      <TextField
        id="wa"
        name="wa"
        label="Nomor Whats App"
        variant="outlined"
        onChange={(e) => props.setTelp(e.target.value)}
        className="contact-form-input"
      />
    </Box>
  );
}
