import { enterpriseBento } from "@/content/pages";

export function EnterpriseBento() {
  return (
    <div className="enterprise-bento">
      {enterpriseBento.map((item) => (
        <article className={`bento-card ${item.className}`} key={item.title}>
          {"image" in item ? (
            <div className="bento-image" style={{ backgroundImage: `url(${item.image})` }} aria-hidden="true" />
          ) : null}
          <div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
