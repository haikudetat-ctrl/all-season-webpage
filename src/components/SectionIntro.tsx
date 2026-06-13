type SectionIntroProps = {
  eyebrow?: string;
  title: string;
  body?: string;
};

export function SectionIntro({ eyebrow, title, body }: SectionIntroProps) {
  return (
    <div className="section-intro">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
    </div>
  );
}
