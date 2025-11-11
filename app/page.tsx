import { redirect, RedirectType } from "next/navigation";

/**
 * Root page that redirects to /playground
 *
 *
 */
export default function RootPage() {
  redirect("/playground", RedirectType.replace);
}
