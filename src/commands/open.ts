import Command, {flags} from '@oclif/command'
import simpleGit from 'simple-git'
import { BuildUrlRequest } from '../models/buildUrlRequest'
import UrlService from '../services/urlService'

export default class Open extends Command {
  static aliases = ['']
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

  static flags : flags.Input<any> = {
    startLineNumber : flags.integer(),
    startColumnNumber : flags.integer(),
    endLineNumber : flags.integer(),
    endColumnNumber : flags.integer(),
  }

  async run(): Promise<any> {
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

      let urlService = new UrlService()

      let urlToOpen = urlService.buildUrl(buildUrlRequest)

      this.log(urlToOpen)
      open(urlToOpen)
    } else {
      this.log('is not a repo')
    }
  }
}
