import {expect, test} from '@oclif/test'

describe('open', () => {
  test
  .stdout()
  .command(['open'])
  .it('runs open', ctx => {
    expect(ctx.stdout).to.contain('is a git repository')
  })

  test
  .stdout()
  .command(['open', '--startLineNumber', '10'])
  .it('runs open --startLineNumber 10', ctx => {
    expect(ctx.stdout).to.contain('L10')
  })
})
