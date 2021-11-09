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
    const {args, flags} = this.parse(Open)

    const open = require('open')
    const path = require('path');

    let fileDirPath = path.dirname(args.fileName)

    const git = simpleGit(fileDirPath)
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

      let buildUrlRequest : BuildUrlRequest = new BuildUrlRequest(remoteUrl,
        branchName,
        relativePath,
        flags.startLineNumber,
        flags.startColumnNumber,
        flags.endLineNumber,
        flags.endColumnNumber)

        this.log(`remoteUrl         : ${buildUrlRequest.remoteUrl}`)
        this.log(`branchName        : ${buildUrlRequest.branchName}`)
        this.log(`filePath          : ${buildUrlRequest.filePath}`)
        if(buildUrlRequest.startLineNumber != undefined) {
          this.log(`startLineNumber   : ${buildUrlRequest.startLineNumber}`)
        }
        if(buildUrlRequest.startColumnNumber != undefined) {
          this.log(`startColumnNumber : ${buildUrlRequest.startColumnNumber}`)
        }
        if(buildUrlRequest.endLineNumber != undefined) {
          this.log(`endLineNumber     : ${buildUrlRequest.endLineNumber}`)
        }
        if(buildUrlRequest.endColumnNumber != undefined) {
          this.log(`endColumnNumber   : ${buildUrlRequest.endColumnNumber}`)
        }

      let urlService = new UrlService()

      let urlToOpen = urlService.buildUrl(buildUrlRequest)

      this.log(urlToOpen)
      open(urlToOpen)
    } else {
      this.log('is not a repo')
    }
  }
}
