import {Command, flags} from '@oclif/command'
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

  run(): PromiseLike<any> {
    this.log('open command run in directory ' + process.cwd())
    this.getVcsRepository()
  }

  async getVcsRepository(){
    const git = simpleGit()
    let isRepo = await git.checkIsRepo()

    if(isRepo){
      this.log('is a repo')
      let remotes = await git.getRemotes(true)
      let remoteUrl = remotes[0].refs.fetch

      if(remoteUrl.endsWith(".git")){
        remoteUrl = remoteUrl.substring(0, remoteUrl.length-4)
      }

      let branchName = (await git.branch()).current

      let relativePath = await git.revparse(['--show-prefix'])

      let urlToOpen = `${remoteUrl}/tree/${branchName}/${relativePath}`

      this.log(urlToOpen)
    }
    else{
      this.log('is not a repo')
    }
  }
}
