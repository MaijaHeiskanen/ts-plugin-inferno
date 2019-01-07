import * as ts from 'typescript'
import { sync as globSync } from 'glob'
import transform from '../src'
import { resolve, basename } from 'path'
import { readFileSync, writeFileSync } from 'fs'
import { mkdirpSync } from 'fs-extra'

const config = {
  experimentalDecorators: true,
  jsx: ts.JsxEmit.Preserve,
  module: ts.ModuleKind.UMD,
  moduleResolution: ts.ModuleResolutionKind.NodeJs,
  noEmitOnError: false,
  noUnusedLocals: true,
  noUnusedParameters: true,
  stripInternal: true,
  target: ts.ScriptTarget.ES5,
}

function compile(path: string, callback) {
  const files = globSync(path)
  const compilerHost = ts.createCompilerHost(config)
  const program = ts.createProgram(files, config, compilerHost)

  program.emit(undefined, compare, undefined, undefined, {
    before: [transform()],
  })

  callback(files)
}

let failedTests = []
mkdirpSync(resolve(__dirname, 'temp/'))

function compare(filePath: string, output: string) {
  const fileBasename = basename(filePath)
  const referenceFilePath = resolve(__dirname, 'references/' + fileBasename)

  const tempFilePath = resolve(__dirname, 'temp/' + fileBasename)

  try {
    const fileData = readFileSync(referenceFilePath, 'utf8')
    if (fileData !== output) {
      writeFileSync(tempFilePath, output, 'utf8')
      failedTests.push(fileBasename)
    }
  } catch (error) {
    writeFileSync(tempFilePath, output, 'utf8')
    failedTests.push(fileBasename)
  }
}

function printFinalResult(files: string[]) {
  if (failedTests.length) {
    console.log(
      `${files.length - failedTests.length}/${files.length} cases passed`
    )
    console.log('Following tests failed:')
    failedTests.map(test => console.log(test))
    console.log('Please look in the test/temp folder and verify output')
    console.log('When verified use the command: npm run overwrite-references')
    throw 'Failed tests...'
  } else {
    console.log(`All cases (${files.length}) successfully passed`)
  }
}
console.time('compile time')
compile(resolve(__dirname, 'cases/*.tsx'), printFinalResult)
console.timeEnd('compile time')
