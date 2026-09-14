import { Download, FileText, Library, Link2, Search, ScrollText, VideoOff } from "lucide-react";
import { useMemo, useState } from "react";
import { resources } from "../data/mockData";

const filters = ["All", "Worksheet", "Guide", "Transcript"] as const;

const typeIcons = {
  Worksheet: FileText,
  Guide: Link2,
  Transcript: ScrollText,
};

export function ResourcesScreen() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [query, setQuery] = useState("");
  const visibleResources = useMemo(
    () => resources.filter((resource) =>
      (filter === "All" || resource.type === filter) &&
      `${resource.title} ${resource.description}`.toLowerCase().includes(query.toLowerCase()),
    ),
    [filter, query],
  );

  return (
    <div className="screen">
      <section className="page-intro resources-intro">
        <div>
          <p className="eyebrow eyebrow--teal">USEFUL THINGS, EASY TO FIND</p>
          <h1>Resource library</h1>
          <p className="lead">Worksheets, trusted links, and written class transcripts—organized around what you’re trying to do next.</p>
        </div>
        <span className="resource-hero-icon"><Library size={31} /></span>
      </section>

      <section className="policy-note">
        <span><VideoOff size={20} /></span>
        <div><strong>A note about class materials</strong><p>This library includes worksheets, links, and attendee transcripts. Video and audio replays are not provided.</p></div>
      </section>

      <section className="resource-controls" aria-label="Resource filters">
        <div className="filter-tabs">
          {filters.map((item) => (
            <button key={item} className={filter === item ? "filter-tab filter-tab--active" : "filter-tab"} onClick={() => setFilter(item)}>
              {item}
            </button>
          ))}
        </div>
        <label className="search-field">
          <Search size={18} />
          <span className="sr-only">Search resources</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search resources" />
        </label>
      </section>

      {visibleResources.length > 0 ? (
        <section className="resource-grid" aria-label="Available resources">
          {visibleResources.map((resource, index) => {
            const Icon = typeIcons[resource.type];
            return (
              <article className="resource-card" key={resource.id}>
                <div className="resource-card__top">
                  <span className={`resource-type-icon resource-type-icon--${(index % 3) + 1}`}><Icon size={22} /></span>
                  <span className="resource-type">{resource.type}</span>
                </div>
                <h2>{resource.title}</h2>
                <p>{resource.description}</p>
                <div className="resource-card__footer">
                  <span>{resource.meta}</span>
                  <a className="download-button" href={resource.file} download>
                    <Download size={17} /> Download<span className="sr-only"> {resource.title}</span>
                  </a>
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        <section className="empty-state empty-state--panel">
          <Search size={30} />
          <h2>No resources match that search.</h2>
          <p>Try a shorter phrase or choose All.</p>
          <button className="secondary-button" onClick={() => { setFilter("All"); setQuery(""); }}>Clear search</button>
        </section>
      )}
    </div>
  );
}
