import Markdown from 'markdown-it/lib/index'
import katex from 'markdown-it-katex'

export const unTokeniseMarkdown = description =>
  reduceTokenList(initMarkdown().parse(description))
    .join(' ')
    .replace(/-\w+/g, '')
    .replace(/[*.?!%:]/g, '')
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .trim()

const initMarkdown = () => new Markdown({}).use(katex)

const reduceTokenList = tokenList =>
  tokenList.reduce((acc, i) => {
    if (i.type === 'text') return acc.concat(i.content)
    if (i.type === 'inline') return acc.concat(reduceTokenList(i.children))
    return acc
  }, [])
