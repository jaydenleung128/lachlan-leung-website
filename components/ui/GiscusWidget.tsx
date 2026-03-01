'use client'

import Giscus from '@giscus/react'

export function GiscusWidget() {
  return (
    <Giscus
      repo="jaydenleung128/lachlan-leung-website"
      repoId="R_kgDORbHVaQ"
      category="Messages"
      categoryId="DIC_kwDORbHVac4C3ca0"
      mapping="pathname"
      strict="0"
      reactionsEnabled="0"
      emitMetadata="0"
      inputPosition="bottom"
      theme="light"
      lang="en"
      loading="lazy"
    />
  )
}
