import type { Metadata } from "next";
import Breadcrumb from "@/components/shared/Breadcrumb";
import GuestPostForm from "@/components/public/GuestPostForm";
import { getSection } from "@/actions/homepage";
import { metadataFromShell } from "@/lib/cms/pageMetadata";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSection("page-guest-post");
  return metadataFromShell(page, "/guest-post", {
    title: "Write for Us | Guest posts",
    description: "Submit an original article for review. Approved pieces are published as guest posts on our blog.",
  });
}

export default async function GuestPostPage() {
  const page = await getSection("page-guest-post");
  const bc = page?.breadcrumb ?? {
    title: "Write for Us",
    subtitle:
      "Share your expertise with our audience. Submit your draft below and our editorial team will review every pitch.",
  };
  const intro =
    page?.intro ??
    "Guest posts are reviewed within a few business days. If approved, we create a draft blog post you can polish with us before it goes live. Please only send original content you have rights to publish.";

  return (
    <>
      <Breadcrumb
        title={bc.title}
        subtitle={bc.subtitle}
      />
      <section className="py-16 bg-white">
        <div className="container max-w-3xl">
          <p className="text-secondary/80 mb-8 leading-relaxed">
            {intro}
          </p>
          <GuestPostForm />
        </div>
      </section>
    </>
  );
}
