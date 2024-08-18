import { SITE_CONFIG } from "@/constants";

export default function AboutPage() {
  return (
    <>
      <h1 className="text-2xl font-extrabold">ChanWu Kim</h1>
      <p className="mt-8">
        Full-stack web developer interested in UI/UX, currently focused on the frontend. <br />I
        like writing code with an iced americano.
      </p>
      <div className="mt-4">
        <a
          target="_blank"
          href={`https://github.com/${SITE_CONFIG.author.name}`}
          rel="noopener noreferrer"
          className="font-medium hover:underline"
        >
          Github
        </a>
      </div>
    </>
  );
}
