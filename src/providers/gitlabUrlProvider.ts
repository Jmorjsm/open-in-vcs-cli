import { BuildUrlRequest } from "../models/buildUrlRequest"
import { UrlProviderBase } from "./urlProviderBase"

export default class GitLabUrlProvider implements UrlProviderBase {
  constructor(){}
  name: string = GitLabUrlProvider.name

  isMatch(remoteUrl: string): boolean {
    return remoteUrl.includes('gitlab.')
  }

  buildUrl(buildUrlRequest : BuildUrlRequest): string {
    let urlToOpen = this.formatRepositoryBaseUrl(buildUrlRequest.remoteUrl, buildUrlRequest.branchName, buildUrlRequest.filePath)
    urlToOpen += this.formatLineNumbers(buildUrlRequest.startLineNumber, buildUrlRequest.startColumnNumber, buildUrlRequest.endLineNumber, buildUrlRequest.endColumnNumber)

    return urlToOpen
  }

  formatRepositoryBaseUrl(remoteUrl : string, branchName : string, filePath? : string): string {
    let repoBaseUrl = `${remoteUrl}/-/blob/${branchName}/`;
    if(filePath != undefined){
      repoBaseUrl += `${filePath}`
    }

    return repoBaseUrl
  }

  formatLineNumbers(startLineNumber?: number, startColumnNumber?: number, endLineNumber?: number, endColumnNumber?: number): string {
    let lineNumbers = ''
    if(startLineNumber != undefined){
      lineNumbers += this.formatStartLineNumber(startLineNumber)

      if(endLineNumber != undefined){
        lineNumbers += this.formatEndLineNumber(endLineNumber)
      }
    }
    return lineNumbers
  }

  formatStartLineNumber(startLineNumber?: number): string {
    return `#L${startLineNumber}`
  }

  formatEndLineNumber(endLineNumber?: number): string {
    return `-${endLineNumber}`
  }

  formatStartColumnNumber(startColumnNumber?: number): string {
    throw new Error("Method not implemented.");
  }

  formatEndColumnNumber(endColumnNumber?: number): string {
    throw new Error("Method not implemented.");
  }
}
