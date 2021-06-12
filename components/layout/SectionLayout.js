import SectionTitle from "../elements/title/SectionTitle"

export default function SectionLayout({ title, url, children }) {
  return (
    <>
      <div div className="pb-4 px-4">
        <div className="bg-white shadow-md">
          <div className="container pb-6">
            <SectionTitle title={title} url={url} />
            {children}
          </div>
        </div>
      </div>
    </>
  )
}