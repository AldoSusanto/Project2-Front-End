import React from "react";

const EmailFeatured = (props) => {
  return (
    <div className="emailFeatured">
      <h5 className="emailFeatured-title">Simpan rekomendasi ini ke emailmu</h5>
      <form onSubmit={props.handleSubmit} className="email-form">
        <input
          type="email"
          name="email"
          required
          className="form-control email-field"
          placeholder="emailKamu@gmail.com"
          onChange={props.handleChange}
        />
        <button type="submit" className="email-form-btn">
          Kirim
        </button>
      </form>
    </div>
  );
};

export default EmailFeatured;
