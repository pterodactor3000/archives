import { topics, type Topic } from "@/content/topics";

export function searchTopics(query: string): Topic[] {
  const needle = query.trim().toLowerCase();
  if (!needle) {
    return topics;
  }

  return topics.filter((topic) => {
    const haystack = [
      topic.name,
      topic.oneLiner,
      ...topic.what,
      ...topic.howSteps,
      ...topic.watch,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(needle);
  });
}
