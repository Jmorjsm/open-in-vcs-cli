import Command, {flags} from '@oclif/command'
import simpleGit, {SimpleGit} from 'simple-git'


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

    if(isRepo){
      this.log('is a repo')
      let remotes = await git.getRemotes(true)
      let remoteUrl = remotes[0].refs.fetch

      if(remoteUrl.endsWith(".git")) {
        remoteUrl = remoteUrl.substring(0, remoteUrl.length-4)
      }

      let branchName = (await git.branch()).current

      let relativePath = await git.revparse(['--show-prefix'])

      relativePath = path.join(relativePath, args.fileName)

      let urlToOpen = `${remoteUrl}/tree/${branchName}/${relativePath}?plain=1`

      if(flags.lineNumber != undefined) {
        urlToOpen = `${urlToOpen}#L${flags.lineNumber}`
      }

      this.log(urlToOpen)
      open(urlToOpen)
    }
    else{
      this.log('is not a repo')
    }
  }
}
