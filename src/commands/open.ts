import Command, {flags} from '@oclif/command'
import simpleGit, {SimpleGit} from 'simple-git'
import GitHubUrlProvider from '../providers/githubUrlProvider'
import AzureDevOpsUrlProvider from '../providers/azureDevOpsUrlProvider'
import { BuildUrlRequest } from '../models/buildUrlRequest'
import { UrlProviderBase } from '../providers/urlProviderBase'

export default class Open extends Command {
  static description = 'open the line/file/directory/repo in your VCS'

  static examples = [
    `$ oiv open .
    opening https://github.com/jmorjsm/open-in-vcs-cli...
    `,
    `$ oiv open .
    opening https://github.com/jmorjsm/open-in-vcs-cli/...
    `,
  ]

  static args = [
    { name: 'fileName' }
  ]

  static flags = {
    startLineNumber : flags.integer(),
    startColumnNumber : flags.integer(),
    endLineNumber : flags.integer(),
    endColumnNumber : flags.integer(),
  }


  async run(): PromiseLike<any> {
    this.log('open command run in directory ' + process.cwd())
    this.getVcsRepository()
  }

  async getVcsRepository() {
    const git = simpleGit()
    const open = require('open')
    const path = require('path');

    const {args, flags} = this.parse(Open)
    this.log(`fileName          : ${args.fileName}`)
    this.log(`startLineNumber   : ${flags.startLineNumber}`)
    this.log(`startColumnNumber : ${flags.startColumnNumber}`)
    this.log(`endLineNumber     : ${flags.endLineNumber}`)
    this.log(`endColumnNumber   : ${flags.endColumnNumber}`)

    let isRepo = await git.checkIsRepo()

    if(isRepo) {
      this.log('is a repo')
      let remotes = await git.getRemotes(true)
      let remoteUrl = remotes[0].refs.fetch

      if(remoteUrl.endsWith(".git")) {
        remoteUrl = remoteUrl.substring(0, remoteUrl.length-4)
      }

      let branchName = (await git.branch()).current

      let relativePath = await git.revparse(['--show-prefix'])

      relativePath = path.join(relativePath, args.fileName)

      let buildUrlRequest : BuildUrlRequest = new BuildUrlRequest(remoteUrl,
        branchName,
        relativePath,
        flags.startLineNumber,
        flags.startColumnNumber,
        flags.endLineNumber,
        flags.endColumnNumber)

      let urlToOpen = this.buildUrl(buildUrlRequest)

      this.log(urlToOpen)
      open(urlToOpen)
    } else {
      this.log('is not a repo')
    }
  }

  private buildUrl(BuildUrlRequest : BuildUrlRequest) : string{
    let providers : UrlProviderBase[] = [new GitHubUrlProvider(), new AzureDevOpsUrlProvider()]

    for(let i = 0; i < providers.length; ++i){
      let provider = providers[i]
      if(provider.isMatch(BuildUrlRequest.remoteUrl)) {
        this.log(`Using provider of type "${typeof(provider)}"`)
        return provider.buildUrl(BuildUrlRequest)
      }
    }

    throw new Error('Failed to build url as no url providers matched the remote.')
  }
}
