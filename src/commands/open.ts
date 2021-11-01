import Command, {flags} from '@oclif/command'
import simpleGit, {SimpleGit} from 'simple-git'
import GitHubUrlProvider from '../providers/githubUrlProvider'
import AzureDevOpsUrlProvider from '../providers/azureDevOpsUrlProvider'

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
    lineNumber: flags.integer(),
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
    this.log(`fileName: ${args.fileName}`)
    this.log(`lineNumber: ${flags.lineNumber}`)

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

      let urlToOpen = this.buildUrl(remoteUrl, branchName, relativePath, flags)

      this.log(urlToOpen)
      open(urlToOpen)
    } else {
      this.log('is not a repo')
    }
  }

  private buildUrl(remoteUrl: string, branchName: string, relativePath: string, flags: { lineNumber: number | undefined }) : string{
    let providers = [new GitHubUrlProvider(), new AzureDevOpsUrlProvider()]

    providers.forEach(provider => {
      if(provider.isMatch(remoteUrl)) {
        return provider.buildUrl(remoteUrl, relativePath, branchName)
      }
    });

    throw new Error('failed to build url as no url providers matched')
  }
}
