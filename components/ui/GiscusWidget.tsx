'use client'

import Giscus from '@giscus/react'

export function GiscusWidget() {
  return (
    <Giscus
      repo="jaydenleung128/lachlan-leung-website"
      repoId="R_kgDORbHVaQ"
      category="Tributes"
      categoryId="DIC_kwDORbHVac4C3aCD"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="dark_dimmed"
      lang="en"
      loading="lazy"
    />
  )
}
