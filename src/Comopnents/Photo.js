import "./SearchBar.css";
import SearchBar from "./SearchBar";
function Photo({ url, title }) {
  return (
    <div className="resultBar">
      <div className="photo">
        <img src={url} alt={title} />
        <div className="title">
          <p>{title}</p>
        </div>
      </div>
    </div>
  );
}
export default Photo;
