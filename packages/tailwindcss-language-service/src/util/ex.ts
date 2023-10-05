import type { Position } from 'vscode-languageserver'
import type { TextDocument } from 'vscode-languageserver-textdocument'
import { State } from './state'
import { exLanguages } from './languages'
import { getLanguageBoundaries } from './getLanguageBoundaries'

export function isExDoc(state: State, doc: TextDocument): boolean {
  const userExLanguages = Object.keys(state.editor.userLanguages).filter((lang) =>
    exLanguages.includes(state.editor.userLanguages[lang])
  )

  return [...exLanguages, ...userExLanguages].indexOf(doc.languageId) !== -1
}

export function isExContext(state: State, doc: TextDocument, position: Position): boolean {
  let str = doc.getText({
    start: { line: 0, character: 0 },
    end: position,
  })

  let boundaries = getLanguageBoundaries(state, doc, str)

  return boundaries ? ['ex'].includes(boundaries[boundaries.length - 1].type) : false
}
