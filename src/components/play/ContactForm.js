import { Box, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { FaUser } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
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
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment sx={{ borderRadius: "30px" }} position="end">
              <FaUser className="icon-account" />
            </InputAdornment>
          ),
        }}
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
        label="Nomor Whatsapp"
        variant="outlined"
        onChange={(e) => props.setTelp(e.target.value)}
        className="contact-form-input"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment sx={{ borderRadius: "30px" }} position="end">
              <IoLogoWhatsapp className="icon-whatsapp" />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
