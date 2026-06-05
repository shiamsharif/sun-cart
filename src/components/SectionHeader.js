export default function SectionHeader({ eyebrow, title, children }) {
  return (
    <div className="mx-auto mb-8 max-w-3xl text-center">
      {eyebrow ? (
        <p className="text-sm font-black uppercase tracking-normal text-primary">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-3xl font-black text-neutral md:text-4xl">
        {title}
      </h2>
      {children ? (
        <p className="mt-3 text-base leading-7 text-neutral/65">{children}</p>
      ) : null}
    </div>
  );
}
