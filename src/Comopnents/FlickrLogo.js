import "./FlickrLogo.css";
import flickr from "./flickr.png";
import React, { Component } from "react";
function FlickrLogo() {
  return (
    <div className="flickrLogo">
      <img src={flickr} alt="flickr logo" />
    </div>
  );
}
export default FlickrLogo;
