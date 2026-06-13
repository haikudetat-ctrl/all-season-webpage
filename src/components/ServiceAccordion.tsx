import { accordionPanels } from "@/content/pages";

export function ServiceAccordion() {
  return (
    <div className="service-accordion">
      {accordionPanels.map((panel) => (
        <article className="accordion-panel" key={panel.title}>
          <div className="accordion-image" style={{ backgroundImage: `url(${panel.image})` }} aria-hidden="true" />
          <div className="accordion-copy">
            <h3>{panel.title}</h3>
            <p>{panel.text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
