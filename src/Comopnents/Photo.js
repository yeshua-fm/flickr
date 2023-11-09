import "./SearchBar.css";
import SearchBar from "./SearchBar";
function Photo({ url, title, newurl }) {
  return (
    <div className="resultBar">
      <div className="photo">
        {/* Sets photo link, title, and alt */}
        <a href={newurl}>
          <img src={url} alt={title} />
        </a>
        <div className="title">
          <p>{title}</p>
        </div>
      </div>
    </div>
  );
}
export default Photo;
