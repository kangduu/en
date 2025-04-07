"use client";

import React from "react";
import Card from "./Card";
import Link from "next/link";

export default function Lexical() {
  return (
    <Card>
      <h2>Word Formation</h2>
      <h3>
        <Link href="#">0. Root Creation</Link>
      </h3>

      <h3>1. Derivation (Prefixes & Suffixes)</h3>
      <i>
        Adding affixes to a base word to change its meaning or grammatical
        category.
      </i>
      <ul>
        <li>Prefixes (change meaning, not word class.)</li>
        <ol>
          <li>
            un-(negative): happy → <strong>un</strong>happy
          </li>
          <li>
            re-(again): write → <strong>re</strong>write
          </li>
        </ol>
        <li>Suffixes (often change word class)</li>
        <ol>
          <li>
            -ness(adj. → noun): kind → kind<strong>ness</strong>
          </li>
          <li>
            -ize(noun → verb): modern → modern<strong>ize</strong>
          </li>
        </ol>
      </ul>

      <h3>2. Compounding</h3>
      <h3>3. Conversion</h3>
      <h3>4. Abbreviation</h3>
      <h3>5. Blending</h3>
      <h3>6. Back-formation</h3>
      <h3>7. Borrowing</h3>
      <h3>8. Onomatopoeia</h3>
      <h3>9. Reduplication</h3>
    </Card>
  );
}
