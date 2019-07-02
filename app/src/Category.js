import React from "react";
import { Link } from "react-router-dom";

import CategoryInstructions from "./CategoryInstructions";
import CategoryRow from "./CategoryRow";


export default function Category(props) {
  const tree = props.tree;
  const data = props.data;
  const k = props.k;
  const v = props.v;
  const kv = `${k}/${v}`;
  const entries = data.dict && data.dict[k] && data.dict[k][v];

  let message;
  if (data.isLoading()) {
    message = "Loading, please wait...";
  } else if (!entries) {
    message = `No entries for ${k}/${v}.`;
  }

  if (message) {
    return (
      <>
      <h2>{tree}/{k}/{v}</h2>
      <Link to="index.html">↑ Back to top</Link>
      <CategoryInstructions />
      <div className="summary">
      {message}
      </div>
      </>
    );
  }

  // pick an icon for this category
  let icon_url = data.icons[kv];
  if (!icon_url) {   // fallback to key only
    icon_url = data.icons[k];
  }
  if (!icon_url) {   // fallback to shop icon
    icon_url = data.icons.shop;
  }

  const rows = Object.keys(entries).map(kvnd => {
    const entry = entries[kvnd];
    return (
      <CategoryRow key={kvnd} {...props} entry={entry} kvnd={kvnd} k={k} v={v} />
    );
  });

  return (
    <>
    <h2><img className="icon" src={icon_url} />{tree}/{k}/{v}</h2>
    <Link to="index.html">↑ Back to top</Link>
    <CategoryInstructions />

    <table className="summary">
    <thead>
    <tr>
    <th>Name<br/>ID<br/>Countries</th>
    <th>Count</th>
    <th>OpenStreetMap Tags</th>
    <th>Wikidata Name/Description<br/>Official Website<br/>Social Links</th>
    <th className="logo">Commons Logo</th>
    <th className="logo">Facebook Logo</th>
    <th className="logo">Twitter Logo</th>
    </tr>
    </thead>

    <tbody>
    {rows}
    </tbody>

    </table>
    </>
  );
};