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
    throw new Error('Method not implemented.')
  }

  getVcsRepository(){
    const git = simpleGit()
    git.checkIsRepo().then(isRepo => {
      if(isRepo){
        this.log('is a repo')
        git.revparse(['--show-prefix']).then(prefix=>
          this.log('prefix: ' + prefix)
        )

      }
      else{
        this.log('is not a repo')
      }
    })
  }
}
