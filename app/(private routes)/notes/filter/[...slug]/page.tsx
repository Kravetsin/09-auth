import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Notes from "./Notes.client";
import { fetchServerNotes } from "@/lib/api/serverApi";
import {
  HOME_PAGE,
  OG_IMAGE,
  OG_DESCRIPTION,
  SITE_NAME,
} from "@/config/metaData";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === "All" ? "" : slug[0];

  const title = `${SITE_NAME} | ${tag === "All" ? "All notes" : `Notes filtered by ${slug}`}`;

  return {
    title: title,
    description: OG_DESCRIPTION,
    openGraph: {
      title: title,
      description: OG_DESCRIPTION,
      url: `${HOME_PAGE}/notes/filter/${slug}`,
      siteName: SITE_NAME,
      images: [OG_IMAGE],
      type: "article",
    },
  };
}

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;
  const tag = slug[0] === "All" ? "" : slug[0];

  const queryClient = new QueryClient();
  const search = "";
  const page = 1;

  await queryClient.prefetchQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () =>
      fetchServerNotes({
        page,
        search,
        ...(tag && tag !== "All" ? { tag } : {}),
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes tag={tag} />
    </HydrationBoundary>
  );
}
